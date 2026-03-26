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
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceproviderController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public ServiceproviderController(ApplicationDbContext context)
        {
            this._context = context;
        }
        [HttpPost]
        public async Task<IActionResult> CreateService(ServiceDto serviceDto)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var provider = await _context.ServiceProviders
                .FirstOrDefaultAsync(x => x.UserId == userId);
            if (provider == null)
                return Unauthorized("Not an approved service provider");
            var service = new Service
            {
                ServiceName = serviceDto.ServiceName,
                Price = serviceDto.Price,
                ServiceCategoryId = serviceDto.ServiceCategoryId,
                ServiceProviderId = provider.Id
            };
            _context.Services.Add(service);
            await _context.SaveChangesAsync();
            return Ok("Service Created Successfully");
        }
        [Authorize(Roles = "ServiceProvider")]

        [HttpGet("Provider-bookings")]
        public async Task<IActionResult> ProviderBookings()
        {
            int userid = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var provider = await _context.ServiceProviders
                .FirstOrDefaultAsync(s => s.UserId == userid);
            if (provider == null) return Unauthorized();

            var bookings = await _context.Bookings
                .Include(s => s.Service)
                .Where(s => s.Service.ServiceProviderId == provider.Id)
                .Select(s => new
                {
                    s.Id,
                    s.BookingDate,
                    s.Status,
                    CustomerName = s.User.FullName,
                    s.Service.ServiceName,

                }).ToListAsync();
            return Ok(bookings);
        }
        //update booking status
        [HttpPut("booking/{bookingid}/status")]
        public async Task<IActionResult> UpdateStatus(int bookingid, BookingSatusDto bookingSatusDto)
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
            booking.Status = bookingSatusDto.Status;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Booking status updated" });
        }
       [HttpGet("bookings")]
        public async Task<IActionResult>AllBookings()
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var provider=await _context.ServiceProviders
                .FirstOrDefaultAsync(s=>s.UserId== userId);
            if (provider == null)
                return Unauthorized("Your are not an approved provider");
            var bookings= await _context.Bookings
                .Include(s => s.Service)
                .Include(b=>b.User)
                .Where(b=>b.Service.ServiceProviderId== provider.Id)
                .Select(b=>new
                {
                    b.Id,
                    serviceName=b.Service.ServiceName,
                    CustomerName=b.User.FullName,
                    b.BookingDate,
                    b.Status
                }).ToListAsync();
            return Ok(bookings);
        }
       

    }
}
