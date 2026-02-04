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
    public class ServicecategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ServicecategoryController(ApplicationDbContext context)
        {
            this._context = context;
        }


        [Authorize(Roles ="Admin")]
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




    }
}
