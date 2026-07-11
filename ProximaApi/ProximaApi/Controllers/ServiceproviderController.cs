using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProximaApi.Data;
using ProximaApi.DTOs;
using ProximaApi.Enums;
using ProximaApi.Models;

namespace ProximaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "ServiceProvider")]
    public class ServiceproviderController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public ServiceproviderController(ApplicationDbContext context)
        {
            this._context = context;
        }



        [HttpPost]
        public async Task<IActionResult> CreateService([FromForm] ServiceDto serviceDto)
        {
            try
            {

                if (serviceDto.Image == null)
                {
                    return BadRequest("IMAGE IS NULL");
                }

                int userId = int.Parse(
                    User.FindFirst(ClaimTypes.NameIdentifier).Value);

                var provider = await _context.ServiceProviders
                    .FirstOrDefaultAsync(x => x.UserId == userId);

                if (provider == null || !provider.IsApproved)
                    return Unauthorized("Not approved");

                string? imagePath = null;

                // 🔥 SAVE IMAGE
                var fileName =
                    Guid.NewGuid().ToString()
                    + Path.GetExtension(serviceDto.Image.FileName);

                var folder = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot",
                    "uploads"
                );

                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                var fullPath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await serviceDto.Image.CopyToAsync(stream);
                }

                imagePath = "uploads/" + fileName;

                var service = new Service
                {
                    ServiceName = serviceDto.ServiceName,
                    Description = serviceDto.Description,
                    Price = serviceDto.Price,
                    ServiceCategoryId = serviceDto.ServiceCategoryId,
                    ServiceProviderId = provider.Id,
                    ImageUrl = imagePath
                };

                _context.Services.Add(service);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    service.Id,
                    service.ServiceName,
                    service.Description,
                    service.Price,
                    service.ImageUrl,
                    CategoryName = _context.ServicesCategories
                        .Where(c => c.Id == service.ServiceCategoryId)
                        .Select(c => c.CategoryName)
                        .FirstOrDefault()
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetMyservice()
        {
            int userid = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var provider = await _context.ServiceProviders
                .FirstOrDefaultAsync(s => s.UserId == userid);
            if (provider == null) return Unauthorized();
            var services = await _context.Services
        .Include(s => s.ServiceCategory)
        .Where(s => s.ServiceProviderId == provider.Id)
        .Select(s => new
        {
            s.Id,
            s.ServiceName,
            s.Description,
            s.Price,
            s.ImageUrl,
            CategoryName = s.ServiceCategory.CategoryName
        })
        .ToListAsync();

            return Ok(services);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteService(int id)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var provider = await _context.ServiceProviders
                .FirstOrDefaultAsync(s => s.UserId == userId);

            if (provider == null)
                return Unauthorized();

            var service = await _context.Services
                .FirstOrDefaultAsync(s => s.Id == id && s.ServiceProviderId == provider.Id);

            if (service == null)
                return NotFound("Service not found");

            _context.Services.Remove(service);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Service deleted successfully" });
        }
        [HttpPut("{id}")]
        public async Task<IActionResult>UpdateService(int id,[FromForm] ServiceDto dto)
        {
               try
                 {
                int userId = int.Parse( User.FindFirst(ClaimTypes.NameIdentifier).Value);

                var provider =await _context.ServiceProviders.FirstOrDefaultAsync( s => s.UserId == userId);
                if (provider == null)
                    return Unauthorized();

                var service =await _context.Services .FirstOrDefaultAsync(
                s =>s.Id == id && s.ServiceProviderId ==provider.Id );

                if (service == null)
                    return NotFound();
                service.ServiceName =
string.IsNullOrWhiteSpace(dto.ServiceName)
? service.ServiceName
: dto.ServiceName;

                service.Description =
                dto.Description ?? service.Description;

                service.Price =
                dto.Price;

                service.ServiceCategoryId =
                dto.ServiceCategoryId;

                /* IMAGE UPDATE */

                if (
                dto.Image != null
                )
                {

                    var fileName =Guid.NewGuid() +Path.GetExtension( dto.Image.FileName);

                    var uploadFolder =
 Path.Combine(
 Directory.GetCurrentDirectory(),
 "wwwroot",
 "uploads"
 );

                    if (
                    !Directory.Exists(
                    uploadFolder
                    ))
                    {

                        Directory.CreateDirectory(
                        uploadFolder
                        );

                    }

                    var filePath =
                    Path.Combine(
                    uploadFolder,
                    fileName
                    );

                    using var stream =
                    new FileStream(
                    filePath,
                    FileMode.Create
                    );

                    await dto.Image
                    .CopyToAsync(
                    stream
                    );

                    service.ImageUrl =
                    $"uploads/{fileName}";

                }

                Console.WriteLine(service.Description);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    service.Id,
                    service.ServiceName,
                    service.Description,
                    service.Price
                });

            }

            catch (Exception ex)
            {

                return StatusCode(
                500,
                ex.Message
                );

            }

        }

       

        [HttpGet("Provider-bookings")]
        public async Task<IActionResult> ProviderBookings()
        {
            int userid = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var provider = await _context.ServiceProviders
                .FirstOrDefaultAsync(s => s.UserId == userid);
            if (provider == null) return Unauthorized();
            // 👇 ADD HERE
            Console.WriteLine("User Id = " + userid);
            Console.WriteLine("Provider Id = " + provider.Id);
            var bookings = await _context.Bookings
                .Include(s => s.Service)
                .Include(s => s.User)
                .Where(s => s.Service.ServiceProviderId == provider.Id)
                .Select(s => new
                {
                    s.Id,
                    UserId = s.UserId,
                    s.BookingDate,
                    Status = s.Status.ToString(),
                    CustomerName = s.User.FullName,
                    s.Service.ServiceName,

                }).ToListAsync();
            Console.WriteLine("Booking Count = " + bookings.Count);
            return Ok(bookings);
        }
        //update booking status
        [HttpPut("booking/{bookingid}/status")]
        public async Task<IActionResult> UpdateStatus(int bookingid, BookingStatusDto bookingSatusDto)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            string role = User.FindFirst(ClaimTypes.Role)?.Value;
            if (role == "Admin")
                return Unauthorized("Admin can not update");

            var booking = await _context.Bookings
               .Include(s => s.Service)

               .ThenInclude(s => s.ServiceProvider)
               .FirstOrDefaultAsync(b => b.Id == bookingid);

            if (booking == null)
                return NotFound("Booking not found");


            if (booking.Service.ServiceProvider.UserId != userId)
            {
                return Unauthorized("Not allowed to update this booking");
            }
            if (!Enum.TryParse<BookingStatus>(
               bookingSatusDto.Status, true, out var status))
            {
                return BadRequest("Invalid Status");
            }

            booking.Status = status;

            // CREATE NOTIFICATION

            string msg = "";

            if (status == BookingStatus.Approved)
            {
                msg =
                $"Your booking for {booking.Service.ServiceName} was approved ✅";
            }

            else if (status == BookingStatus.Rejected)
            {
                msg =
                $"Your booking for {booking.Service.ServiceName} was rejected ❌";
            }

            else if (status == BookingStatus.Completed)
            {
                msg =
                $"Your service {booking.Service.ServiceName} completed 🎉";
            }

            if (!string.IsNullOrWhiteSpace(msg))
            {
                _context.Notifications.Add(

                new Notification
                {
                    UserId =
                booking.UserId,

                    Message =
                msg,

                    CreatedAt =
                DateTime.Now,

                    IsRead =
                false
                }

                );
            }

            await _context.SaveChangesAsync();

            return Ok(
            new
            {
                message =
            "Booking status updated"
            });
        }

        [HttpGet("bookings")]
        public async Task<IActionResult> AllBookings()
        {
            try
            {
                int userId = int.Parse(
                    User.FindFirst(ClaimTypes.NameIdentifier).Value);

                var provider = await _context.ServiceProviders
                    .FirstOrDefaultAsync(s => s.UserId == userId);

                if (provider == null)
                    return Unauthorized("Not approved");
                var bookings = await _context.Bookings
     .Include(b => b.Service)
     .Include(b => b.User)
     .Where(b => b.Service.ServiceProviderId == provider.Id)
     .Select(b => new
     {
         b.Id,
         UserId = b.UserId,
         ServiceName = b.Service.ServiceName,
         CustomerName = b.User.FullName,
         b.BookingDate,
         Status = b.Status.ToString()
     })
     .ToListAsync();
                return Ok(bookings);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }
        [HttpGet("category")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _context.ServicesCategories.ToListAsync();
            return Ok(categories);
        }

        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            int userId =
                int.Parse(
                    User.FindFirst(ClaimTypes.NameIdentifier).Value
                );

            var provider =
                await _context.ServiceProviders
                .FirstOrDefaultAsync(p => p.UserId == userId);

            if (provider == null)
                return Unauthorized();

            var serviceIds =
                await _context.Services
                .Where(s => s.ServiceProviderId == provider.Id)
                .Select(s => s.Id)
                .ToListAsync();

            var bookings =
                await _context.Bookings
                .Where(b => serviceIds.Contains(b.ServiceId))
                .ToListAsync();

            var stats = new ProviderStatsDto
            {
                TotalServices = serviceIds.Count,

                TotalBookings = bookings.Count,

                PendingBookings =
                    bookings.Count(b =>
                        b.Status == BookingStatus.Pending),

                ApprovedBookings =
                    bookings.Count(b =>
                        b.Status == BookingStatus.Approved),

                RejectedBookings =
                    bookings.Count(b =>
                        b.Status == BookingStatus.Rejected),
                CompletedBookings =
    bookings.Count(b =>
        b.Status == BookingStatus.Completed),
            };

            return Ok(stats);
        }
        [HttpGet("reviews")]
        public async Task<IActionResult> GetReviews()
        {
            int userId =
                int.Parse(
                    User.FindFirst(
                        ClaimTypes.NameIdentifier
                    ).Value
                );

            var provider =
                await _context.ServiceProviders
                .FirstOrDefaultAsync(
                    p => p.UserId == userId
                );

            if (provider == null)
                return Unauthorized();

            var reviews =
                await _context.Reviews

                .Include(r => r.User)

                .Where(r =>
                    r.ServiceProviderId
                    == provider.Id
                )

                .Select(r => new
                {
                    Customer =
                        r.User.FullName,

                    r.Rating,

                    r.Comment
                })

                .ToListAsync();

            return Ok(new
            {
                average =
                    reviews.Count > 0
                    ? reviews.Average(
                        r => r.Rating
                      )
                    : 0,

                total =
                    reviews.Count,

                reviews
            });
        }

    }
}

