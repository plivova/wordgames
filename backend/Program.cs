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
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        mysqlConn,
        ServerVersion.AutoDetect(mysqlConn)
    ));

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

// CORS policy for local frontend ports
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
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
