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


   
        [HttpPost]
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
    }
}
