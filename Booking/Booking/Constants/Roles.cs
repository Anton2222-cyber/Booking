namespace Booking.Constants
{
    public static class Roles
    {
        public static List<string> All = new()
        {
            Admin,
            User
        };
        public const string Admin = "admin";
        public const string User = "user";
    }
}
