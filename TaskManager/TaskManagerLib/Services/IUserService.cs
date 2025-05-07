using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagerLib.Models;

namespace TaskManagerLib.Services
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAll();
        Task<User?> GetById(int id);
        Task<User?> GetByUsername(string username);
        Task<bool> UserExists(string username);
        Task<User> Create(User user);
        Task<bool> Update(User user);
        Task<bool> Delete(int id);
    }
}
