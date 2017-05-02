using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyRoots.Models
{
    public class FamilyMember
    {
      
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime DateOfDeath { get; set; }
        public string BirthPlace { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }

        public virtual Tree Tree { get; set; }
        public virtual DegreeOfRelationship DegreeOfRelationship { get; set; }
    }
}