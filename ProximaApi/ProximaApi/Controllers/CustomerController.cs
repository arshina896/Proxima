using System.Security.Claims;
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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CustomerController(ApplicationDbContext context)
        {
            this._context = context;
        }

        [HttpPost("apply")]
        public async Task<IActionResult> ApplyProvider()
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (_context.ServiceProviders.Any(x => x.UserId == userId))
                return BadRequest("Already applied");
            var provider = new Models.ServiceProvider
            {
                UserId = userId,
                IsApproved = false,
            };
            _context.ServiceProviders.Add(provider);
            await _context.SaveChangesAsync();
            return Ok("Applied for service provider");
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllService()
        {
            var service = await _context.Services
                .Include(s => s.ServiceCategory)
                .Include(s => s.ServiceProvider)
                .ThenInclude(u => u.User)
                .Select(s => new
                {
                    s.Id,
                    s.ServiceName,
                    s.Price,
                    Category = s.ServiceCategory.CategoryName,
                    Provider = s.ServiceProvider.User.FullName,
                    s.ImageUrl
                }).ToListAsync();
            return Ok(service);
        }
        //booking
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateBooking(BookingDto bookingDto)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var service = await _context.Services
             .Include(s => s.ServiceProvider)
             .FirstOrDefaultAsync(s => s.Id == bookingDto.ServiceId);
            if (service == null)
                return NotFound("Service Not found");
            if (!service.ServiceProvider.IsApproved)
                return BadRequest("Service provider not approved");
            var booking = new Booking
            {
                UserId = userId,
                ServiceId = bookingDto.ServiceId,
                BookingDate = DateTime.Now,
                Status = BookingStatus.Pending
            };
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Booking Created successfully" });
        }


        //booking details
        [HttpGet("myBooking")]
        public async Task<IActionResult> MyBookings()
        {
            int userid = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var bookings = await _context.Bookings
                .Include(s => s.Service)
                .ThenInclude(s => s.ServiceCategory)
                .Include(b => b.Service)
                .ThenInclude(b => b.ServiceProvider)
                .ThenInclude(p => p.User)
                .Where(b => b.UserId == userid)

                .Select(b => new
                {
                    b.Id,
                    ServiceName = b.Service.ServiceName,
                    Category = b.Service.ServiceCategory.CategoryName,
                    ProviderName = b.Service.ServiceProvider.User.FullName,
                    b.BookingDate,
                    Status = b.Status.ToString()

                }).ToListAsync();
            return Ok(bookings);

        }


        [HttpGet("providerWithService")]
        public async Task<IActionResult> GetProvidersWithServices()
        {
            var providers = await _context.ServiceProviders
                .Include(p => p.User)
                .Include(p => p.Services)
                .Include(p=>p.Reviews)
                .Select(p => new
                {
                    p.Id,
                    ProviderName = p.User.FullName,
                    AverageRating=p.Reviews.Any()? p.Reviews.Average(r=>r.Rating):0,
                    TotalReviews=p.Reviews.Count(),
                    Services = p.Services.Select(s => new
                    {
                        s.Id,
                        s.ServiceName,
                        s.Price
                    })
                })
                .ToListAsync();

            return Ok(providers);
        }

        [HttpGet("category")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _context.ServicesCategories.ToListAsync();
            return Ok(categories);
        }


        [HttpPut("cancel/{id}")]
        public async Task<IActionResult> CancelBooking(int id)
        {
            try
            {
                int userId =
                    int.Parse(
                        User.FindFirst(ClaimTypes.NameIdentifier).Value
                    );

                var booking =
                    await _context.Bookings
                    .FirstOrDefaultAsync(b =>
                        b.Id == id &&
                        b.UserId == userId);

                if (booking == null)
                    return NotFound("Booking not found");

                // only pending

                if (booking.Status != BookingStatus.Pending)
                {
                    return BadRequest(
                        "Only pending booking can cancel"
                    );
                }

                booking.Status =
                    BookingStatus.Cancelled;

                await _context.SaveChangesAsync();

                return Ok(
                    new
                    {
                        message =
                        "Booking cancelled"
                    }
                );
            }
            catch (Exception ex)
            {
                return StatusCode(
                    500,
                    ex.Message
                );
            }
        }


        [HttpPost("review")]
        public async Task<IActionResult> AddReview(ReviewDto dto)
        {
            try
            {
                int userId =
                    int.Parse(
                        User.FindFirst(ClaimTypes.NameIdentifier).Value
                    );

                var booking =
                    await _context.Bookings
                    .Include(b => b.Service)
                    .FirstOrDefaultAsync(b =>
                        b.Id == dto.BookingId 
                       );

                if (booking == null)
                    return BadRequest("Booking not found");

                if (booking.Status != BookingStatus.Completed)
                    return BadRequest(
                        "Review allowed only after completion"
                    );

                var already =
                    await _context.Reviews
                    .AnyAsync(r =>
                        r.UserId == userId &&
                        r.ServiceProviderId ==
                        booking.Service.ServiceProviderId);

                if (already)
                    return BadRequest(
                        "Already reviewed"
                    );

                var review =
                    new Review
                    {
                        UserId = userId,

                        ServiceProviderId =
                        booking.Service.ServiceProviderId,

                        Rating = dto.Rating,

                        Comment = dto.Comment
                    };

                _context.Reviews.Add(review);

                await _context.SaveChangesAsync();

                return Ok("Review added");
            }

            catch (Exception ex)
            {
                return StatusCode(
                    500,
                    ex.Message
                );
            }
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search(
 string? keyword,
 int? categoryId
 )
        {

            var services =
            await _context.Services

            .Include(s => s.ServiceCategory)

            .Include(s => s.ServiceProvider)
            .ThenInclude(p => p.User)

            .AsQueryable()

            .Where(s =>

            (string.IsNullOrEmpty(keyword)

            ||

            s.ServiceName.Contains(keyword))

            &&

            (categoryId == null
            ||

            categoryId == 0
            ||

            s.ServiceCategoryId
            ==
            categoryId)

            )

            .ToListAsync();

            var result =
            services

            .GroupBy(
            s =>
            s.ServiceProvider
            )

            .Select(g => new {

                providerName =
            g.First()
            .ServiceProvider
            .User
            .FullName,

                averageRating = 0,

                totalReviews = 0,

                services =
            g.Select(s => new {

                s.Id,

                s.ServiceName,

                s.Price

            })

            })

            .ToList();

            return Ok(result);

        }


    }

}
