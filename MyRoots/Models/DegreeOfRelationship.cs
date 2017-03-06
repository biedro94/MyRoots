using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyRoots.Models
{
    public class DegreeOfRelationship
    {
        public int DegreeOfRelationshipId { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public bool Me { get; set; }
    }
}