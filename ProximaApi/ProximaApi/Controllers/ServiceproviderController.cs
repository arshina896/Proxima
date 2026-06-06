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
        //[HttpPost]
        //public async Task<IActionResult> CreateService(ServiceDto serviceDto)
        //{
        //    int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        //    var provider = await _context.ServiceProviders
        //        .FirstOrDefaultAsync(x => x.UserId == userId);
        //    if (provider == null)
        //        return Unauthorized("Not an approved service provider");
        //    var service = new Service
        //    {
        //        ServiceName = serviceDto.ServiceName,
        //        Price = serviceDto.Price,
        //        ServiceCategoryId = serviceDto.ServiceCategoryId,
        //        ServiceProviderId = provider.Id
        //    };
        //    _context.Services.Add(service);
        //    await _context.SaveChangesAsync();
        //    return Ok(service);
        //}


        [HttpPost]
        public async Task<IActionResult> CreateService(ServiceDto serviceDto)
        {
            try
            {
                int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

                var provider = await _context.ServiceProviders
                    .FirstOrDefaultAsync(x => x.UserId == userId);

                if (provider == null || !provider.IsApproved)
                    return Unauthorized("Not approved");

                var service = new Service
                {
                    ServiceName = serviceDto.ServiceName,
                    Price = serviceDto.Price,
                    ServiceCategoryId = serviceDto.ServiceCategoryId,
                    ServiceProviderId = provider.Id
                };

                _context.Services.Add(service);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    service.Id,
                    service.ServiceName,
                    service.Price,
                    CategoryName = _context.ServicesCategories
        .Where(c => c.Id == service.ServiceCategoryId)
        .Select(c => c.CategoryName)
        .FirstOrDefault()
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message); // 🔥 will show exact error
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
            s.Price,
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

        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateService(int id, ServiceDto dto)
        //{
        //    int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

        //    var provider = await _context.ServiceProviders
        //        .FirstOrDefaultAsync(s => s.UserId == userId);

        //    if (provider == null)
        //        return Unauthorized();

        //    var service = await _context.Services
        //        .FirstOrDefaultAsync(s => s.Id == id && s.ServiceProviderId == provider.Id);

        //    if (service == null)
        //        return NotFound("Service not found");

        //    service.ServiceName = dto.ServiceName;
        //    service.Price = dto.Price;
        //    service.ServiceCategoryId = dto.ServiceCategoryId;

        //    await _context.SaveChangesAsync();

        //    return Ok(service);
        //}

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateService(int id, ServiceDto dto)
        {
            try
            {
                int userId = int.Parse(
                    User.FindFirst(ClaimTypes.NameIdentifier).Value);

                var provider = await _context.ServiceProviders
                    .FirstOrDefaultAsync(s => s.UserId == userId);

                if (provider == null)
                    return Unauthorized();

                var service = await _context.Services
                    .FirstOrDefaultAsync(s =>
                        s.Id == id &&
                        s.ServiceProviderId == provider.Id);

                if (service == null)
                    return NotFound();

                service.ServiceName = dto.ServiceName;
                service.Price = dto.Price;
                service.ServiceCategoryId = dto.ServiceCategoryId;

                await _context.SaveChangesAsync();
                return Ok(new
                {
                    service.Id,
                    service.ServiceName,
                    service.Price,
                    service.ServiceCategoryId
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
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
                    s.BookingDate,
                    s.Status,
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
            await _context.SaveChangesAsync();
            return Ok(new { message = "Booking status updated" });
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

    }
}

