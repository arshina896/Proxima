using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProximaApi.Data;
using ProximaApi.DTOs;
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
            _context.SaveChanges();
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
                Status = "Pending"
            };
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            return Ok("Booking Created successfully");
        }


        //booking details
        [HttpGet("myBooking")]
        public async Task <IActionResult> MyBookings()
        {
            int userid = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var bookings = await _context.Bookings
                .Include(s => s.Service)
                .ThenInclude(s => s.ServiceCategory)
                .Include(b => b.Service)
                .ThenInclude(b => b.ServiceProvider)
                .Where(b => b.UserId == userid)
                .Select(b => new
                {
                    b.Id,
                    ServiceName = b.Service.ServiceName,
                    Category = b.Service.ServiceCategory.CategoryName,
                    ProviderName = b.Service.ServiceProvider.User.FullName,
                    b.BookingDate,
                    b.Status,

                }).ToListAsync();
            return Ok(bookings);

        }
    }

}
