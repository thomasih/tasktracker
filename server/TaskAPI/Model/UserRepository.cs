using System.Text.Json;
using TaskTrackerAPI.Helpers;

namespace TaskTrackerAPI.Model
{
    public class UserRepository : IUserRepository
    {
        private readonly string _userFilePath = "Assets/User.json";

        private List<User> ReadUsersFromFile()
        {
            if (!File.Exists(_userFilePath))
            {
                return new List<User>();
            }

            var userData = File.ReadAllText(_userFilePath);
            return JsonSerializer.Deserialize<List<User>>(userData) ?? new List<User>();
        }

        private void WriteUsersToFile(List<User> users)
        {
            var userData = JsonSerializer.Serialize(users, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_userFilePath, userData);
        }

        public List<User> getUsers()
        {
            return ReadUsersFromFile();
        }

        public User getUserById(int id)
        {
            return ReadUsersFromFile().FirstOrDefault(t => t.Id == id);
        }

        public void createUser(User user)
        {
            var users = ReadUsersFromFile();
            user.Id = users.Count > 0 ? users.Max(t => t.Id) + 1 : 1;
            user.Password = PasswordHelper.HashPassword(user.Password);
            users.Add(user);
            WriteUsersToFile(users);
        }

        public void updateUser(User updatedUser)
        {
            var users = ReadUsersFromFile();
            var existingUser = users.FirstOrDefault(t => t.Id == updatedUser.Id);
            if (existingUser != null)
            {
                existingUser.Email = updatedUser.Email;
                existingUser.Password = PasswordHelper.HashPassword(updatedUser.Password);
                WriteUsersToFile(users);
            }
        }

        public void deleteUser(User user)
        {
            var users = ReadUsersFromFile();
            var userToRemove = users.FirstOrDefault(t => t.Id == user.Id);
            if (userToRemove != null)
            {
                users.Remove(userToRemove);
                WriteUsersToFile(users);
            }
        }

        public User getUserByEmailAndPassword(string email, string password)
        {
            var users = ReadUsersFromFile();
            var user = users.FirstOrDefault(t => t.Email == email);
            if (user != null && PasswordHelper.VerifyPassword(password, user.Password))
            {
                return user;
            }
            return null;
        }
    }
}