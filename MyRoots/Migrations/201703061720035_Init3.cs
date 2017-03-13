namespace MyRoots.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Init3 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.FamilyMembers", "DegreeOfRelationship_DegreeOfRelationshipId", "dbo.DegreeOfRelationships");
            DropIndex("dbo.FamilyMembers", new[] { "DegreeOfRelationship_DegreeOfRelationshipId" });
            DropColumn("dbo.FamilyMembers", "DegreeOfRelationship_DegreeOfRelationshipId");

            AddColumn("dbo.FamilyMembers", "DegreeOfRelationship_DegreeOfRelationshipId", c => c.Int());
            CreateIndex("dbo.FamilyMembers", "DegreeOfRelationship_DegreeOfRelationshipId");
            AddForeignKey("dbo.FamilyMembers", "DegreeOfRelationship_DegreeOfRelationshipId", "dbo.DegreeOfRelationships", "DegreeOfRelationshipId");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.FamilyMembers", "DegreeOfRelationship_DegreeOfRelationshipId", "dbo.DegreeOfRelationships");
            DropIndex("dbo.FamilyMembers", new[] { "DegreeOfRelationship_DegreeOfRelationshipId" });
            DropColumn("dbo.FamilyMembers", "DegreeOfRelationship_DegreeOfRelationshipId");
        }
    }
}
