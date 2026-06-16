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
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            this._context = context;
        }
        [HttpGet("category")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _context.ServicesCategories.ToListAsync();
            return Ok(categories);
        }


        [HttpPost("category")]
        public async Task <IActionResult>CategoryCreate(CategoryDto categoryDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            bool exists = await _context.ServicesCategories.AnyAsync(c => c.CategoryName.ToLower() == categoryDto.CategoryName.ToLower());
            if (exists)
                return BadRequest("Category Already exists");
            var category = new ServiceCategories
            {
                CategoryName = categoryDto.CategoryName,
            };
            _context.ServicesCategories.Add(category);
            await _context.SaveChangesAsync();
            return Ok(category);

        }

        //user provider aavan ullath
        [HttpGet("pending")]
        public async Task<IActionResult>PendingRequests()
        {
            var requests=_context.ServiceProviders
                .Include(x=>x.User)
                .Where(x=>!x.IsApproved)
                .Select(x=>new
                {
                    x.Id,
                    x.UserId,
                    x.User.FullName,
                    x.User.Email,
                    
                }).ToList();
            return Ok(requests);
        }
        //
        [HttpPost("approve/{id}")]
        public async Task <IActionResult>Approveprovider(int id)
        {
               var provider=await _context.ServiceProviders.Include(x=>x.User)
                .FirstOrDefaultAsync(x=>x.Id == id);
            if (provider == null)
                return NotFound("Service provider request not found");
            if (provider.IsApproved)
                return BadRequest("Already approved");
            provider.IsApproved = true;
            provider.User.Role = "ServiceProvider";
            await _context.SaveChangesAsync();
            return Ok("Service provider approved successfully");
        }
        [HttpDelete("category/{id}")]
        public async Task <IActionResult> DeleteCategory(int id)
        {
            var category = await _context.ServicesCategories.FindAsync(id);
            if (category == null)
                return NotFound("category not found");
            _context.ServicesCategories.Remove(category);
            await _context.SaveChangesAsync();
            return Ok("Category delete successfully");
        }
        [HttpPut("category/{id}")]
        public async Task<IActionResult> UpdateCategory(int id ,CategoryDto categoryDto)
        {
            var category = await _context.ServicesCategories.FindAsync(id);
            if (category == null)
                return NotFound("Category not found");
            bool exists = await _context.ServicesCategories.AnyAsync(c => c.CategoryName.ToLower() == categoryDto.CategoryName.ToLower() && c.Id != id);
            if (exists)
                return BadRequest("Category already exists");
            category.CategoryName=categoryDto.CategoryName;
            await _context.SaveChangesAsync();
            return Ok(category);
        }
        //[HttpGet("stats")]
        //public async Task<IActionResult> GetStats()
        //{
        //    var totalUsers = await _context.Users.CountAsync();
        //    var totalProviders = await _context.ServiceProviders.CountAsync();
        //    var totalCategories = await _context.ServicesCategories.CountAsync();
        //    var totalServices = await _context.Services.CountAsync();

        //    return Ok(new
        //    {
        //        totalUsers,
        //        totalProviders,
        //        totalCategories,
        //        totalServices
        //    });
        //}
        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            return Ok(new
            {
                totalUsers = await _context.Users.CountAsync(),
                totalProviders = await _context.ServiceProviders.CountAsync(),
                totalServices = await _context.Services.CountAsync(),
                totalCategories = await _context.ServicesCategories.CountAsync()
            });
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users
                .Select(u => new
                {
                    u.Id,
                    u.FullName,
                    u.Email,
                    u.Role
                })
                .ToListAsync();

            return Ok(users);
        }
        [HttpGet("services")]
        public async Task<IActionResult> GetServices()
        {
            var services = await _context.Services
                .Include(s => s.ServiceProvider)
                .Include(s => s.ServiceCategory)
                .Select(s => new
                {
                    s.Id,
                    s.ServiceName,
                    s.Price,
                    Category = s.ServiceCategory.CategoryName
                })
                .ToListAsync();

            return Ok(services);
        }
        [HttpGet("bookings")]
        public async Task<IActionResult> GetBookings()
        {
            var bookings = await _context.Bookings
                .Include(b => b.User)
                .Include(b => b.Service)
                .ThenInclude(s=>s.ServiceProvider)
                .ThenInclude(sp=>sp.User)
                .Select(b => new
                {
                    b.Id,
                    Customer = b.User.FullName,
                    Service = b.Service.ServiceName,
                    Provider=b.Service.ServiceProvider.User.FullName,
                    b.BookingDate,
                    Status = b.Status.ToString()
                })
                .ToListAsync();

            return Ok(bookings);
        }
      
        [HttpDelete("user/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound();

            _context.Users.Remove(user);

            await _context.SaveChangesAsync();

            return Ok();
        }


        [HttpDelete("service/{id}")]
        public async Task<IActionResult> DeleteService(int id)
        {
            var service = await _context.Services.FindAsync(id);

            if (service == null)
                return NotFound("Service not found");

            _context.Services.Remove(service);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Service deleted successfully"
            });
        }


        [HttpDelete("booking/{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);

            if (booking == null)
                return NotFound("Booking not found");

            _context.Bookings.Remove(booking);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Booking deleted successfully"
            });
        }
    }
}
