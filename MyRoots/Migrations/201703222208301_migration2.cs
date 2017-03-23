namespace MyRoots.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class migration2 : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.FamilyMembers", name: "DegreeOfRelationshipId_DegreeOfRelationshipId", newName: "DegreeOfRelationship_DegreeOfRelationshipId");
            RenameIndex(table: "dbo.FamilyMembers", name: "IX_DegreeOfRelationshipId_DegreeOfRelationshipId", newName: "IX_DegreeOfRelationship_DegreeOfRelationshipId");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.FamilyMembers", name: "IX_DegreeOfRelationship_DegreeOfRelationshipId", newName: "IX_DegreeOfRelationshipId_DegreeOfRelationshipId");
            RenameColumn(table: "dbo.FamilyMembers", name: "DegreeOfRelationship_DegreeOfRelationshipId", newName: "DegreeOfRelationshipId_DegreeOfRelationshipId");
        }
    }
}
