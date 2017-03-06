using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyRoots.Models
{
    public class Tree
    {
        public int TreeId { get; set; }
        public string TreeName { get; set; }
        public DateTime DateOfCreation { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual DegreeOfRelationship DegreeOfRelationship { get; set; }
    }
}