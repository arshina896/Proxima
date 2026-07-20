using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace ProximaApi.Hubs
{
    [Authorize]
    public class ChatHub :Hub
    {
        public async Task JoinChat(string bookingId)
        {
            Console.WriteLine($"JOIN ROOM : {bookingId}");
            await Groups.AddToGroupAsync(
                Context.ConnectionId,
                bookingId
            );
        }

        public async Task LeaveChat(string bookingId)
        {
            await Groups.RemoveFromGroupAsync(
                Context.ConnectionId,
                bookingId
            );
        }

        public async Task SendMessage(
            string bookingId,
            object message
        )
        {
            await Clients.Group(bookingId)
                .SendAsync(
                    "ReceiveMessage",
                    message
                );
        }
    }
}
