using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProximaApi.Data;
using ProximaApi.DTOs;

namespace ProximaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProfileController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProfileController(ApplicationDbContext context)
        {
            this._context = context;
        }



        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            try
            {
                int userId = int.Parse(
                    User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

                var user = await _context.Users
                    .FirstOrDefaultAsync(x => x.Id == userId);

                if (user == null)
                    return NotFound("User not found");

                return Ok(new
                {
                    user.Id,
                    user.FullName,
                    user.Email,
                    user.PhoneNumber,
                    user.Gender,
                    user.DateOfBirth,
                    user.Address,
                    user.City,
                    user.State,
                    user.Pincode,
                    user.About,
                    user.ProfileImage,
                    user.Role
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // ===========================
        // UPDATE PROFILE
        // ===========================

        [HttpPut]
        public async Task<IActionResult> UpdateProfile([FromForm] ProfileDto dto)
        {
            try
            {
                int userId = int.Parse(
                    User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

                var user = await _context.Users
                    .FirstOrDefaultAsync(x => x.Id == userId);

                if (user == null)
                    return NotFound("User not found");

                // Update Details

                user.FullName = dto.FullName;
                user.PhoneNumber = dto.Phone;
                user.Gender = dto.Gender;
                user.DateOfBirth = dto.DateOfBirth;
                user.Address = dto.Address;
                user.City = dto.City;
                user.State = dto.State;
                user.Pincode = dto.Pincode;
                user.About = dto.About;
                user.UpdatedAt = DateTime.Now;

                // Upload Image

                if (dto.ProfileImage != null)
                {
                    var fileName =
                        Guid.NewGuid().ToString()
                        + Path.GetExtension(dto.ProfileImage.FileName);

                    var folder =
                        Path.Combine(
                            Directory.GetCurrentDirectory(),
                            "wwwroot",
                            "profile");

                    if (!Directory.Exists(folder))
                    {
                        Directory.CreateDirectory(folder);
                    }

                    var path =
                        Path.Combine(folder, fileName);

                    using (var stream =
                        new FileStream(path, FileMode.Create))
                    {
                        await dto.ProfileImage.CopyToAsync(stream);
                    }

                    user.ProfileImage =
                        "profile/" + fileName;
                }

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    Message = "Profile Updated Successfully"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpGet("notifications")]
        public async Task<IActionResult> GetNotifications()
        {
            int providerId = int.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var notifications = await _context.Notifications
                .Where(x => x.UserId == providerId)
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();

            return Ok(notifications);
        }
        [Authorize]
        [HttpPut("notifications/{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            var notification =
                await _context.Notifications.FindAsync(id);

            if (notification == null)
                return NotFound();

            notification.IsRead = true;

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}

