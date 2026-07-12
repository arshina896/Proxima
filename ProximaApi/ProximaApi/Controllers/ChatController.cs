using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using ProximaApi.Data;
using ProximaApi.DTOs;
using ProximaApi.Hubs;
using ProximaApi.Models;
using Microsoft.AspNetCore.SignalR;
using ProximaApi.Hubs;
using Microsoft.AspNetCore.Authorization;
namespace ProximaApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IHubContext<ChatHub> _hub;
        public ChatController(ApplicationDbContext context, IHubContext<ChatHub> hub)
        {
            _context = context;
            _hub = hub;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendMessage(MessageDto dto)
        {
            try
            {
                int senderId = int.Parse(
                    User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

                var booking = await _context.Bookings
                    .FirstOrDefaultAsync(x => x.Id == dto.BookingId);

                if (booking == null)
                    return NotFound("Booking not found");

                var message = new Message
                {
                    SenderId = senderId,
                    ReceiverId = dto.ReceiverId,
                    BookingId = dto.BookingId,
                    Text = dto.Text,
                    SentAt = DateTime.Now
                };

                _context.Messages.Add(message);
                await _context.SaveChangesAsync();

                await _hub.Clients
                    .Group(dto.BookingId.ToString())
                    .SendAsync("ReceiveMessage", new
                    {
                        message.Id,
                        message.Text,
                        message.SenderId,
                        message.ReceiverId,
                        message.SentAt
                    });

                return Ok(new
                {
                    message.Id,
                    message.Text,
                    message.SenderId,
                    message.ReceiverId,
                    message.BookingId,
                    message.SentAt
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpGet("{bookingId}")]
        public async Task<IActionResult> GetConversation(int bookingId)
        {
            var messages = await _context.Messages

                .Include(x => x.Sender)

                .Where(x => x.BookingId == bookingId)

                .OrderBy(x => x.SentAt)

                .Select(x => new
                {
                    x.Id,
                    x.Text,
                    x.SentAt,
                    x.SenderId,
                    SenderName = x.Sender.FullName,
                    x.ReceiverId,
                    x.IsRead
                })

                .ToListAsync();

            return Ok(messages);
        }
        [HttpGet("list")]
        public async Task<IActionResult> ChatList()
        {
            int userId = int.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var chats = await _context.Messages

                .Include(m => m.Sender)
                .Include(m => m.Receiver)

                .Where(m =>
                    m.SenderId == userId ||
                    m.ReceiverId == userId)

                .OrderByDescending(m => m.SentAt)

                .ToListAsync();

            var result = chats

                .GroupBy(m => m.BookingId)

                .Select(g =>
                {
                    var last = g.First();

                    var otherUser =
                        last.SenderId == userId

                        ? last.Receiver
                        : last.Sender;
                  
                    return new
                    {
                        BookingId = last.BookingId,

                        UserId = otherUser.Id,

                        Name = otherUser.FullName,

                        ProfileImage = otherUser.ProfileImage,

                        LastMessage = last.Text,

                        LastMessageTime = last.SentAt
                    };
                })

                .ToList();

            return Ok(result);
        }
    }
}
