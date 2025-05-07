using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagerLib.Interfaces;
using TaskManagerLib.Models;

namespace TaskManagerLib.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly TaskManagerDBContext _context;
        protected readonly DbSet<T> _dbSet;

        public Repository(TaskManagerDBContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public async Task Add(T entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public void Delete(T entity)
        {
            _dbSet.Remove(entity);
        }

      

        public async Task<T?> GetById(int id)
        {
            return await _dbSet.AsNoTracking().FirstOrDefaultAsync(e => EF.Property<int>(e, "Id") == id);
        }

        public async Task<bool> SaveChanges()
        {
            return await _context.SaveChangesAsync() > 0;
        }

      

        public void Update(T entity)
        {
            _dbSet.Update(entity);
        }
    }
}
