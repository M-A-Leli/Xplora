BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Users] (
    [user_id] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [salt] NVARCHAR(1000) NOT NULL,
    [first_name] NVARCHAR(1000) NOT NULL,
    [last_name] NVARCHAR(1000) NOT NULL,
    [phone_number] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Users_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [deleted_at] DATETIME2,
    CONSTRAINT [Users_pkey] PRIMARY KEY CLUSTERED ([user_id]),
    CONSTRAINT [Users_username_key] UNIQUE NONCLUSTERED ([username]),
    CONSTRAINT [Users_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Clients] (
    [client_id] NVARCHAR(1000) NOT NULL,
    [user_id] NVARCHAR(1000) NOT NULL,
    [deleted_at] DATETIME2,
    CONSTRAINT [Clients_pkey] PRIMARY KEY CLUSTERED ([client_id]),
    CONSTRAINT [Clients_user_id_key] UNIQUE NONCLUSTERED ([user_id])
);

-- CreateTable
CREATE TABLE [dbo].[Admins] (
    [admin_id] NVARCHAR(1000) NOT NULL,
    [user_id] NVARCHAR(1000) NOT NULL,
    [deleted_at] DATETIME2,
    CONSTRAINT [Admins_pkey] PRIMARY KEY CLUSTERED ([admin_id]),
    CONSTRAINT [Admins_user_id_key] UNIQUE NONCLUSTERED ([user_id])
);

-- CreateTable
CREATE TABLE [dbo].[Categories] (
    [category_id] NVARCHAR(1000) NOT NULL,
    [category_name] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Categories_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [deleted_at] DATETIME2,
    CONSTRAINT [Categories_pkey] PRIMARY KEY CLUSTERED ([category_id])
);

-- CreateTable
CREATE TABLE [dbo].[Tours] (
    [tour_id] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [destination] NVARCHAR(1000) NOT NULL,
    [price] DECIMAL(32,16) NOT NULL,
    [category_id] NVARCHAR(1000) NOT NULL,
    [start_date] DATETIME2 NOT NULL,
    [end_date] DATETIME2 NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Tours_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [deleted_at] DATETIME2,
    CONSTRAINT [Tours_pkey] PRIMARY KEY CLUSTERED ([tour_id])
);

-- CreateTable
CREATE TABLE [dbo].[TourImages] (
    [image_id] NVARCHAR(1000) NOT NULL,
    [tour_id] NVARCHAR(1000) NOT NULL,
    [image_path] NVARCHAR(1000) NOT NULL,
    [deleted_at] DATETIME2,
    CONSTRAINT [TourImages_pkey] PRIMARY KEY CLUSTERED ([image_id])
);

-- CreateTable
CREATE TABLE [dbo].[Bookings] (
    [booking_id] NVARCHAR(1000) NOT NULL,
    [user_id] NVARCHAR(1000) NOT NULL,
    [tour_id] NVARCHAR(1000) NOT NULL,
    [booking_date] DATETIME2 NOT NULL CONSTRAINT [Bookings_booking_date_df] DEFAULT CURRENT_TIMESTAMP,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [Bookings_status_df] DEFAULT 'PENDING',
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Bookings_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [deleted_at] DATETIME2,
    CONSTRAINT [Bookings_pkey] PRIMARY KEY CLUSTERED ([booking_id])
);

-- CreateTable
CREATE TABLE [dbo].[Reviews] (
    [review_id] NVARCHAR(1000) NOT NULL,
    [user_id] NVARCHAR(1000) NOT NULL,
    [tour_id] NVARCHAR(1000) NOT NULL,
    [rating] FLOAT(53) NOT NULL,
    [comment] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Reviews_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [deleted_at] DATETIME2,
    CONSTRAINT [Reviews_pkey] PRIMARY KEY CLUSTERED ([review_id])
);

-- CreateTable
CREATE TABLE [dbo].[PasswordResets] (
    [reset_id] NVARCHAR(1000) NOT NULL,
    [user_id] NVARCHAR(1000) NOT NULL,
    [reset_code] NVARCHAR(1000) NOT NULL,
    [expiration_time] DATETIME2 NOT NULL,
    [is_valid] BIT NOT NULL CONSTRAINT [PasswordResets_is_valid_df] DEFAULT 1,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [PasswordResets_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [deleted_at] DATETIME2,
    CONSTRAINT [PasswordResets_pkey] PRIMARY KEY CLUSTERED ([reset_id])
);

-- CreateTable
CREATE TABLE [dbo].[Payments] (
    [payment_id] NVARCHAR(1000) NOT NULL,
    [booking_id] NVARCHAR(1000) NOT NULL,
    [amount] DECIMAL(10,2) NOT NULL,
    [payment_method] NVARCHAR(1000) NOT NULL,
    [payment_status] NVARCHAR(1000) NOT NULL CONSTRAINT [Payments_payment_status_df] DEFAULT 'PENDING',
    [transaction_date] DATETIME2 NOT NULL CONSTRAINT [Payments_transaction_date_df] DEFAULT CURRENT_TIMESTAMP,
    [deleted_at] DATETIME2,
    CONSTRAINT [Payments_pkey] PRIMARY KEY CLUSTERED ([payment_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Clients] ADD CONSTRAINT [Clients_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[Users]([user_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Admins] ADD CONSTRAINT [Admins_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[Users]([user_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Tours] ADD CONSTRAINT [Tours_category_id_fkey] FOREIGN KEY ([category_id]) REFERENCES [dbo].[Categories]([category_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TourImages] ADD CONSTRAINT [TourImages_tour_id_fkey] FOREIGN KEY ([tour_id]) REFERENCES [dbo].[Tours]([tour_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Bookings] ADD CONSTRAINT [Bookings_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[Users]([user_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Bookings] ADD CONSTRAINT [Bookings_tour_id_fkey] FOREIGN KEY ([tour_id]) REFERENCES [dbo].[Tours]([tour_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Reviews] ADD CONSTRAINT [Reviews_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[Users]([user_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Reviews] ADD CONSTRAINT [Reviews_tour_id_fkey] FOREIGN KEY ([tour_id]) REFERENCES [dbo].[Tours]([tour_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PasswordResets] ADD CONSTRAINT [PasswordResets_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[Users]([user_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Payments] ADD CONSTRAINT [Payments_booking_id_fkey] FOREIGN KEY ([booking_id]) REFERENCES [dbo].[Bookings]([booking_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
