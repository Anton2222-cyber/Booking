namespace Booking.Models.User
{
    public class UserRegisterViewModel
    {
        public string Username { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public IFormFile Image { get; set; }
        public string Password { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}
