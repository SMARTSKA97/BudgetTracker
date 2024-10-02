using ExpenseTracker.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers();

// Configure PostgreSQL connection 
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Enable Swagger 
builder.Services.AddEndpointsApiExplorer(); 
builder.Services.AddSwaggerGen(c => { c.SwaggerDoc("v1", new OpenApiInfo { Title = "ExpenseTracker API", Version = "v1" }); });

// Configure CORS 
builder.Services.AddCors(options => { options.AddPolicy("AllowAngularApp", builder => builder .WithOrigins("http://localhost:4200") // Angular app URL 
.AllowAnyMethod() .AllowAnyHeader()); });

var app = builder.Build();

// Apply migrations automatically (optional) 
using (var scope = app.Services.CreateScope()) { 
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>(); 
    db.Database.Migrate(); 
}

// Configure the HTTP request pipeline. 
if (app.Environment.IsDevelopment()) { 
    app.UseSwagger(); 
    app.UseSwaggerUI(); 
}

app.UseHttpsRedirection();

app.UseCors("AllowAngularApp");

app.UseAuthorization();

app.MapControllers();

app.Run();