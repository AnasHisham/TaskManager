using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagerAPI.Controllers;
using TaskManagerLib.Models;
using TaskManagerLib.Services;

namespace TaskManager.Tests
{
    public class UserControllerTests
    {
        [Fact]
        public async Task GetUser_ReturnsOk_WhenUserExists()
        {
            var mockService = new Mock<IUserService>();
            mockService.Setup(s => s.GetById(1))
                .ReturnsAsync(new User { Id = 1, Username = "Admin" });

            var controller = new UsersController(mockService.Object);

            var result = await controller.GetById(1);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var user = Assert.IsType<User>(okResult.Value);
            Assert.Equal(1, user.Id);
        }

    }
}
