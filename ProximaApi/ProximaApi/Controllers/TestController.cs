using Microsoft.AspNetCore.Mvc;

namespace ProximaApi.Controllers
{
    [ApiController]
    [Route("api/test")]
    public class TestController : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("API Working");
        }
    }
}
