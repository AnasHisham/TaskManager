using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagerLib.Models;

namespace TaskManagerLib.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<IEnumerable<User>> GetAll();

        Task<User?> GetByUsername(string username);
        Task<bool> UserExists(string username);

    }
}
