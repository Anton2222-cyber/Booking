using BlogWebApi.Data.Entities.Identity;
using System.ComponentModel.DataAnnotations;

namespace Booking.Models.User
{
    public class UserItemViewModel
    {
        public string Username { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public string Phone { get; set; }
        public string Image { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime CreatedOn { get; set; }
        public virtual ICollection<string> Roles { get; set; }
    }
}
