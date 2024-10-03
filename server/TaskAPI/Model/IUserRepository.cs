namespace TaskTrackerAPI.Model
{
    public interface IUserRepository
    {
        List<User> getUsers();
        User getUserById(int id);
        User getUserByEmailAndPassword(string email, string password); // Add this method
        void createUser(User user);
        void updateUser(User user);
        void deleteUser(User user);
    }
}