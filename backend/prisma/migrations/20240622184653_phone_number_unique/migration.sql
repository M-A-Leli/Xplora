/*
  Warnings:

  - A unique constraint covering the columns `[phone_number]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[Users] ADD CONSTRAINT [Users_phone_number_key] UNIQUE NONCLUSTERED ([phone_number]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
