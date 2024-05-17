using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace BlogWebApi.Data.Entities.Identity
{
    public class UserEntity : IdentityUser<int>
    {
        [StringLength(255)]
        public string FullName { get; set; }
        [StringLength(255)]
        public string Image { get; set; }
        public virtual ICollection<UserRoleEntity> Roles { get; set; }
    }
}
