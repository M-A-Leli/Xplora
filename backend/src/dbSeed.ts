// npx ts-node dbSeed.ts

import prisma from './config/Prisma.Config';
import bcrypt from 'bcryptjs';

async function main() {
  // Users
  const users = [];
  for (let i = 0; i < 10; i++) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(`Password@00${i}`, salt);

    users.push(
      await prisma.user.create({
        data: {
          username: `user${i}`,
          email: `user${i}@example.com`,
          password: hash,
          salt: salt,
          first_name: `First${i}`,
          last_name: `Last${i}`,
          phone_number: `070000000${i}`,
        },
      })
    );
  }

  // Clients
  const clients = [];
  for (let i = 0; i < 5; i++) {
    clients.push(
      await prisma.client.create({
        data: {
          user_id: users[i].user_id,
        },
      })
    );
  }

  // Admins
  const admins = [];
  for (let i = 5; i < 10; i++) {
    admins.push(
      await prisma.admin.create({
        data: {
          user_id: users[i].user_id,
        },
      })
    );
  }

  // Categories
  const categories = [];
  for (let i = 0; i < 3; i++) {
    categories.push(
      await prisma.category.create({
        data: {
          category_name: `Category${i}`,
        },
      })
    );
  }

  // Tours
  const tours = [];
  for (let i = 0; i < 10; i++) {
    tours.push(
      await prisma.tour.create({
        data: {
          title: `Tour Title ${i}`,
          description: `Description for tour ${i}`,
          destination: `Destination ${i}`,
          price: 100 + i * 10,
          category_id: categories[i % 3].category_id,
          start_date: new Date(),
          end_date: new Date(),
        },
      })
    );
  }

  // TourImages
  for (let i = 0; i < 10; i++) {
    await prisma.tourImage.create({
      data: {
        tour_id: tours[i].tour_id,
        image_path: `/images/tour${i}.jpg`,
      },
    });
  }

  // Bookings
  const bookings = [];
  for (let i = 0; i < 10; i++) {
    bookings.push(
      await prisma.booking.create({
        data: {
          user_id: users[i % 10].user_id,
          tour_id: tours[i].tour_id,
          booking_date: new Date(),
          status: i % 4 === 0 ? "CONFIRMED" : "PENDING",
        },
      })
    );
  }

  // Payments
  for (let i = 0; i < 10; i++) {
    await prisma.payment.create({
      data: {
        booking_id: bookings[i].booking_id,
        amount: 100 + i * 10,
        payment_method: i % 2 === 0 ? "Credit Card" : "PayPal",
        payment_status: i % 3 === 0 ? "COMPLETED" : "PENDING",
      },
    });
  }

  // Reviews
  for (let i = 0; i < 10; i++) {
    await prisma.review.create({
      data: {
        user_id: users[i % 10].user_id,
        tour_id: tours[i].tour_id,
        rating: (i % 5) + 1,
        comment: `Comment for review ${i}`,
      },
    });
  }

  // PasswordResets
  for (let i = 0; i < 10; i++) {
    await prisma.passwordReset.create({
      data: {
        user_id: users[i % 10].user_id,
        reset_code: `reset_code_${i}`,
        expiration_time: new Date(new Date().getTime() + 3600 * 1000),
        is_valid: true,
      },
    });
  }

  console.log("All records inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
