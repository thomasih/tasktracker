using Microsoft.AspNetCore.Mvc;
using TaskTrackerAPI.Model;

namespace TaskTrackerAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("get_users")]
        public IActionResult GetUsers()
        {
            return Ok(_userRepository.getUsers());
        }

        [HttpGet("get_user/{id}")]
        public IActionResult GetUserById(int id)
        {
            var userModel = _userRepository.getUserById(id);
            if (userModel == null)
            {
                return NotFound();
            }
            return Ok(userModel);
        }

        [HttpPost("create_user")]
        public IActionResult CreateUser([FromBody] User userModel)
        {
            _userRepository.createUser(userModel);
            var createdUser = _userRepository.getUserById(userModel.Id);
            return Ok(createdUser);
        }

        [HttpPut("update_user/{id}")]
        public IActionResult UpdateUser(int id, [FromBody] User updatedUser)
        {
            var existingUser = _userRepository.getUserById(id);
            if (existingUser == null)
            {
                return NotFound();
            }

            existingUser.Email = updatedUser.Email;
            existingUser.Password = updatedUser.Password;

            _userRepository.updateUser(existingUser);
            return Ok();
        }

        [HttpDelete("delete_user/{id}")]
        public IActionResult DeleteUser(int id)
        {
            var userModel = _userRepository.getUserById(id);
            if (userModel == null)
            {
                return NotFound();
            }

            _userRepository.deleteUser(userModel);
            return Ok();
        }

        // Login method
        [HttpPost("login")]
        public IActionResult Login([FromBody] User userLogin)
        {
            var user = _userRepository.getUserByEmailAndPassword(userLogin.Email, userLogin.Password);
            if (user == null)
            {
                return Unauthorized(new { success = false, message = "Invalid credentials" });
            }

            return Ok(new { success = true, userId = user.Id });
        }
    }
}
