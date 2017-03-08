namespace MyRoots.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Init31 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.FamilyMembers", "DegreeOfRelationship_DegreeOfRelationshipId", c => c.Int());
            CreateIndex("dbo.FamilyMembers", "DegreeOfRelationship_DegreeOfRelationshipId");
            AddForeignKey("dbo.FamilyMembers", "DegreeOfRelationship_DegreeOfRelationshipId", "dbo.DegreeOfRelationships", "DegreeOfRelationshipId");
        }
        
        public override void Down()
        {
        }
    }
}
