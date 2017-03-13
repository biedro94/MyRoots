namespace MyRoots.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changedModels : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Trees", "DegreeOfRelationship_DegreeOfRelationshipId", "dbo.DegreeOfRelationships");
            DropIndex("dbo.Trees", new[] { "DegreeOfRelationship_DegreeOfRelationshipId" });
            AddColumn("dbo.DegreeOfRelationships", "Tree_TreeId", c => c.Int());
            CreateIndex("dbo.DegreeOfRelationships", "Tree_TreeId");
            AddForeignKey("dbo.DegreeOfRelationships", "Tree_TreeId", "dbo.Trees", "TreeId");
            DropColumn("dbo.Trees", "DegreeOfRelationship_DegreeOfRelationshipId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Trees", "DegreeOfRelationship_DegreeOfRelationshipId", c => c.Int());
            DropForeignKey("dbo.DegreeOfRelationships", "Tree_TreeId", "dbo.Trees");
            DropIndex("dbo.DegreeOfRelationships", new[] { "Tree_TreeId" });
            DropColumn("dbo.DegreeOfRelationships", "Tree_TreeId");
            CreateIndex("dbo.Trees", "DegreeOfRelationship_DegreeOfRelationshipId");
            AddForeignKey("dbo.Trees", "DegreeOfRelationship_DegreeOfRelationshipId", "dbo.DegreeOfRelationships", "DegreeOfRelationshipId");
        }
    }
}
