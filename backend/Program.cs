using backend.Application.Common; // for AutoMapper profiles
using Microsoft.EntityFrameworkCore;
using DotNetEnv;
using Neo4j.Driver; // for loading .env

var builder = WebApplication.CreateBuilder(args);

// Load environment variables from .env
Env.Load("../.env");

// Get info from env vars
var mysqlConn = Environment.GetEnvironmentVariable("MYSQL_CONNECTION");
var neo4jUri = Environment.GetEnvironmentVariable("NEO4J_URI");
var neo4jUser = Environment.GetEnvironmentVariable("NEO4J_USER");
var neo4jPassword = Environment.GetEnvironmentVariable("NEO4J_PASSWORD");

// Register DbContext with MySQL connection
var serverVersion = ServerVersion.AutoDetect(mysqlConn);
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(mysqlConn, serverVersion));

// Register Neo4j driver
builder.Services.AddSingleton<IDriver>(_ =>
    GraphDatabase.Driver(
        neo4jUri,
        AuthTokens.Basic(neo4jUser, neo4jPassword)
    )
);

// Register MediatR handlers from your application assembly
builder.Services.AddMediatR(cfg => 
    cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));

// Register AutoMapper profiles (adjust type to your profile class)
builder.Services.AddAutoMapper(typeof(MappingProfile));

// Add controllers & swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS policy — read allowed origins from env var, fall back to localhost for dev
var corsOrigins = Environment.GetEnvironmentVariable("CORS_ORIGINS")?.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
    ?? ["http://localhost:3000", "https://localhost:3000"];

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(corsOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Dispose Neo4j driver on application shutdown
var lifetime = app.Services.GetRequiredService<IHostApplicationLifetime>();
var neo4jDriver = app.Services.GetRequiredService<IDriver>();
lifetime.ApplicationStopping.Register(() => neo4jDriver?.Dispose());

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowFrontend");

app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsJsonAsync(new { message = "An unexpected error occurred." });
    });
});

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
