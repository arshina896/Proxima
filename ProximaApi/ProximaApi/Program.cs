using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ProximaApi.Data;
using ProximaApi.Helpers;
using ProximaApi.Models;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();



builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//jwt add cheyyan
var jwtSettings = builder.Configuration.GetSection("Jwt");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtSettings["Key"])
        )
    };
});



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

//

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngular");
app.UseAuthentication();


app.UseAuthorization();


app.UseDefaultFiles();
app.UseStaticFiles();

app.UseStaticFiles(

new StaticFileOptions
{

    FileProvider =

new PhysicalFileProvider(

Path.Combine(

Directory.GetCurrentDirectory(),

"uploads"

)

),

    RequestPath = "/uploads"

}

);
app.MapControllers();
app.MapFallbackToFile("index.html");
////

//using (var scope = app.Services.CreateScope())
//{
//    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

//    if (!context.Users.Any(u => u.Role == "Admin"))
//    {
//        var admin = new User
//        {
//            FullName = "System Admin",
//            Email = "arshina312@gmail.com",
//            PasswordHash = PasswordHelper.HashPassword("Admin@1"),
//            Role = "Admin",
//            IsActive = true
//        };

//        context.Users.Add(admin);
//        context.SaveChanges();
//    }
//}

////



app.Run();
