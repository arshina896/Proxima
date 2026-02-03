using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.IdentityModel.Tokens;
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
        private readonly IConfiguration _configuration;

        public UserController(ApplicationDbContext context, IConfiguration configuration)
        {
            this._context = context;
            this._configuration = configuration;
        }

        //jwt
        private string GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Role, user.Role)
    };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(
                    Convert.ToDouble(_configuration["Jwt:DurationInMinutes"])
                ),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
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
            var token = GenerateJwtToken(user);
            return Ok(new
            {
                message = "Login Successful",
                token = token,
                userId = user.Id,
                role = user.Role
            });
        }


        //public async Task<IActionResult> CreateRole()
        //{
        //    await _roleManager.CreateAsync(new IdentityRole("Customer"));
        //    return Ok("roleCreated");
        //}

    }
}
