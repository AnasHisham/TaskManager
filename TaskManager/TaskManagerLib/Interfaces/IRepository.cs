﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagerLib.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<T?> GetById(int id);
        Task Add(T entity);
        void Update(T entity);
        void Delete(T entity);
        Task<bool> SaveChanges();
    }

}
