namespace MyRoots.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Init2 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.DegreeOfRelationships",
                c => new
                    {
                        DegreeOfRelationshipId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        ShortName = c.String(),
                        Me = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.DegreeOfRelationshipId);
            
            CreateTable(
                "dbo.FamilyMembers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        LastName = c.String(),
                        DateOfBirth = c.DateTime(nullable: false),
                        DateOfDeath = c.DateTime(nullable: false),
                        BirthPlace = c.String(),
                        Description = c.String(),
                        Image = c.String(),
                        Tree_TreeId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Trees", t => t.Tree_TreeId)
                .Index(t => t.Tree_TreeId);
            
            CreateTable(
                "dbo.Trees",
                c => new
                    {
                        TreeId = c.Int(nullable: false, identity: true),
                        TreeName = c.String(),
                        DateOfCreation = c.DateTime(nullable: false),
                        ApplicationUser_Id = c.String(maxLength: 128),
                        DegreeOfRelationship_DegreeOfRelationshipId = c.Int(),
                    })
                .PrimaryKey(t => t.TreeId)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUser_Id)
                .ForeignKey("dbo.DegreeOfRelationships", t => t.DegreeOfRelationship_DegreeOfRelationshipId)
                .Index(t => t.ApplicationUser_Id)
                .Index(t => t.DegreeOfRelationship_DegreeOfRelationshipId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.FamilyMembers", "Tree_TreeId", "dbo.Trees");
            DropForeignKey("dbo.Trees", "DegreeOfRelationship_DegreeOfRelationshipId", "dbo.DegreeOfRelationships");
            DropForeignKey("dbo.Trees", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropIndex("dbo.Trees", new[] { "DegreeOfRelationship_DegreeOfRelationshipId" });
            DropIndex("dbo.Trees", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.FamilyMembers", new[] { "Tree_TreeId" });
            DropTable("dbo.Trees");
            DropTable("dbo.FamilyMembers");
            DropTable("dbo.DegreeOfRelationships");
        }
    }
}
