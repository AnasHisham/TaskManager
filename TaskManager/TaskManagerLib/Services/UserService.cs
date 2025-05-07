using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagerLib.Interfaces;
using TaskManagerLib.Models;

namespace TaskManagerLib.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public  async Task<IEnumerable<User>> GetAll()
        {
            return await _userRepository.GetAll();
        }

        public  async Task<User?> GetById(int id)
        {
            return await _userRepository.GetById(id);
        }

        public  async Task<User?> GetByUsername(string username)
        {
            return await _userRepository.GetByUsername(username);
        }

        public  async Task<bool> UserExists(string username)
        {
            return await _userRepository.UserExists(username);
        }

        public  async Task<User> Create(User user)
        {
            await _userRepository.Add(user);
            await _userRepository.SaveChanges();
            return user;
        }

        public  async Task<bool> Update(User user)
        {
            _userRepository.Update(user);
            return await _userRepository.SaveChanges();
        }

        public  async Task<bool> Delete(int id)
        {
            var user = await _userRepository.GetById(id);
            if (user == null) return false;

            _userRepository.Delete(user);
            return await _userRepository.SaveChanges();
        }
    }

}
