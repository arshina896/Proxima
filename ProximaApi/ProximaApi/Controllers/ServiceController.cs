using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProximaApi.Data;
using ProximaApi.DTOs;
using ProximaApi.Models;

namespace ProximaApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ServiceController(ApplicationDbContext context )
        {
            this._context = context;
        }
        [HttpPost]
        public async Task <IActionResult>CreateService(ServiceDto serviceDto)
        {
            var service = new Service
            {
                ServiceName = serviceDto.ServiceName,
                Price = serviceDto.Price,
                ServiceProviderId = serviceDto.ServiceProviderId,
                ServiceCategoryId = serviceDto.ServiceCategoryId,
            };
            _context.Services.Add(service);
            await _context.SaveChangesAsync();
            return Ok(service);

        }
    }
}
