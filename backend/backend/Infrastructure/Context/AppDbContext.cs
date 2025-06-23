// // Created by Kateřina Plívová on 23.06.2025.

using Microsoft.EntityFrameworkCore;
using backend.Domain;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<LetterSet> LetterSets { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<LetterSet>(entity =>
        {
            entity.ToTable("letter_sets");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Letters).HasColumnName("letter_set");
            entity.Property(e => e.CentralLetter).HasColumnName("central_letter");
        });
    }
}