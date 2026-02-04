using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProximaApi.Data;
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

        [Authorize]
        [HttpPost("apply")]
        public async Task<IActionResult> ApplyProvider()
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (_context.ServiceProviders.Any(x => x.UserId == userId))
                return BadRequest("Already applied");
            var provider = new ServiceProviders
            {
                UserId = userId,
                IsApproved = false,
            };
            _context.ServiceProviders.Add(provider);
            _context.SaveChanges();
            return Ok("Applied for service provider");
        }



        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok("API Working");
        }

    }
}
