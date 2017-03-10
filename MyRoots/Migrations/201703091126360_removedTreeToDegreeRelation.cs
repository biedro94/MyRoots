namespace MyRoots.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class removedTreeToDegreeRelation : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Trees", "DegreeOfRelationship_DegreeOfRelationshipId", "dbo.DegreeOfRelationships");
            DropIndex("dbo.Trees", new[] { "DegreeOfRelationship_DegreeOfRelationshipId" });
            DropColumn("dbo.Trees", "DegreeOfRelationship_DegreeOfRelationshipId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Trees", "DegreeOfRelationship_DegreeOfRelationshipId", c => c.Int());
            CreateIndex("dbo.Trees", "DegreeOfRelationship_DegreeOfRelationshipId");
            AddForeignKey("dbo.Trees", "DegreeOfRelationship_DegreeOfRelationshipId", "dbo.DegreeOfRelationships", "DegreeOfRelationshipId");
        }
    }
}
