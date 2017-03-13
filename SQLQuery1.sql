CREATE PROCEDURE [MyRoots_GetUserEmail]  @userId varchar(max)
AS
BEGIN
 
    SELECT Email From AspNetUsers WHERE Id = @userId;
 
END