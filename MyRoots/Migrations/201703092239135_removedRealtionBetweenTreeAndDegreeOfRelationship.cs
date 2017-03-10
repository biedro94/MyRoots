namespace MyRoots.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class removedRealtionBetweenTreeAndDegreeOfRelationship : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.DegreeOfRelationships", "Tree_TreeId", "dbo.Trees");
            DropIndex("dbo.DegreeOfRelationships", new[] { "Tree_TreeId" });
            DropColumn("dbo.DegreeOfRelationships", "Tree_TreeId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.DegreeOfRelationships", "Tree_TreeId", c => c.Int());
            CreateIndex("dbo.DegreeOfRelationships", "Tree_TreeId");
            AddForeignKey("dbo.DegreeOfRelationships", "Tree_TreeId", "dbo.Trees", "TreeId");
        }
    }
}
