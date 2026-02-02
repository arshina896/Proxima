using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using ProximaApi.Data;
using ProximaApi.DTOs;
using ProximaApi.Helpers;
using ProximaApi.Models;

namespace ProximaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            this._context = context;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var email = dto.Email.ToLower();
            if (await _context.Users.AnyAsync(u => u.Email.ToLower() == email))
                return BadRequest(new { message = "Email already exists" });
            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                PasswordHash = PasswordHelper.HashPassword(dto.Password),
                Role = "User"
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(new { message = "User register Successfully" });

        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var email = loginDto.Email.Trim().ToLower();
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == email && u.IsActive);
            if (user == null)
            {
                return Unauthorized("Invalid email or passwo");
            }
            bool isValidPassword = PasswordHelper.VerifyPassword(
                loginDto.Password,
                user.PasswordHash
                );
            if (!isValidPassword)
            {
                return Unauthorized("Invalid  password");
            }
                return Ok(new
                {
                    message = "Login Successful",
                    user = user
                });
            }
        }
    }
