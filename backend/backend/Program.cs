using backend.Application.Common; // for AutoMapper profiles
using Microsoft.EntityFrameworkCore;
using DotNetEnv; // for loading .env

var builder = WebApplication.CreateBuilder(args);

// Load environment variables from .env
Env.Load("../.env");

// Get connection string from env vars
var mysqlConn = Environment.GetEnvironmentVariable("MYSQL_CONNECTION");

// Register DbContext with MySQL connection
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        mysqlConn,
        ServerVersion.AutoDetect(mysqlConn)
    ));

// Register MediatR handlers from your application assembly
builder.Services.AddMediatR(cfg => 
    cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));

// Register AutoMapper profiles (adjust type to your profile class)
builder.Services.AddAutoMapper(typeof(MappingProfile));

// Add controllers & swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS policy for local frontend ports
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowLocalFrontend");

// Use custom error handling middleware
// app.UseMiddleware<ErrorHandlingMiddleware>();

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
