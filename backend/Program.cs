using backend.Application.Common; // for AutoMapper profiles
using Microsoft.EntityFrameworkCore;
using DotNetEnv;
using Neo4j.Driver;

var builder = WebApplication.CreateBuilder(args);

// Load environment variables from .env
Env.Load("../.env");

// Get info from env vars
var mysqlConn = Environment.GetEnvironmentVariable("MYSQL_CONNECTION")
    ?? throw new InvalidOperationException("MYSQL_CONNECTION environment variable is not set.");
var neo4jUri = Environment.GetEnvironmentVariable("NEO4J_URI")
    ?? throw new InvalidOperationException("NEO4J_URI environment variable is not set.");
var neo4jUser = Environment.GetEnvironmentVariable("NEO4J_USER")
    ?? throw new InvalidOperationException("NEO4J_USER environment variable is not set.");
var neo4jPassword = Environment.GetEnvironmentVariable("NEO4J_PASSWORD")
    ?? throw new InvalidOperationException("NEO4J_PASSWORD environment variable is not set.");

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

// Register Wordle game store
builder.Services.AddSingleton<backend.Application.Words.Queries.WordleGameStore>();

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
    ?? ["http://localhost:3000", "https://localhost:3000", "http://localhost:3001", "https://localhost:3001"];

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

// Ensure MySQL tables exist
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

// Dispose Neo4j driver on application shutdown
var lifetime = app.Services.GetRequiredService<IHostApplicationLifetime>();
var neo4jDriver = app.Services.GetRequiredService<IDriver>();
lifetime.ApplicationStopping.Register(() => neo4jDriver?.Dispose());

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

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
