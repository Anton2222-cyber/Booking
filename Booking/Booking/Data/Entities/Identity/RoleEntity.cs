using Microsoft.AspNetCore.Identity;

namespace BlogWebApi.Data.Entities.Identity
{
    public class RoleEntity : IdentityRole<int>
    {
        public virtual ICollection<UserRoleEntity> Users { get; set; }
    }
}
