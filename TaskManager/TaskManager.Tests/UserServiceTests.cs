using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagerLib.Interfaces;
using TaskManagerLib.Models;
using TaskManagerLib.Services;

namespace TaskManager.Tests
{
    public class UserServiceTests
    {
        private readonly Mock<IUserRepository> _mockRepo;
        private readonly UserService _service;
        public UserServiceTests()
        {
            _mockRepo = new Mock<IUserRepository>();
            _service = new UserService(_mockRepo.Object);
        }

        [Fact]
        public async Task GetUserById_ReturnsUser_WhenUserExists()
        {
            var user = new User { Id = 1, Username = "Admin" };
            _mockRepo.Setup(repo => repo.GetById(1)).ReturnsAsync(user);

            var result = await _service.GetById(1);

            Assert.NotNull(result);
            Assert.Equal("Admin", result.Username);
        }


    }
}
