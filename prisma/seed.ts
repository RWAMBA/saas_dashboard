import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');
  
  try {
    // Clear existing data
    console.log('Clearing existing data...');
    await prisma.analyticsEvent.deleteMany();
    await prisma.dailyStats.deleteMany();
    await prisma.customer.deleteMany();
    await prisma.user.deleteMany();
    console.log('Cleared existing data');
    
    // Create a test user with role
    console.log('Creating test user...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    const now = new Date();
    const verificationDeadline = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        hashedPassword,
        verificationDeadline,
        emailVerified: new Date(),
        verificationToken: null,
        passwordResetToken: null,
        passwordResetExpires: null,
        image: null,
        role: 'admin',
      },
    });
    console.log('Test user created:', user.id);

    // Create sample customers
    console.log('Creating sample customers...');
    const customers = Array.from({ length: 10 }, () => ({
      name: faker.company.name(),
      email: faker.internet.email(),
      status: faker.helpers.arrayElement(['active', 'inactive', 'pending']),
      plan: faker.helpers.arrayElement(['free', 'pro', 'enterprise']),
    }));

    await prisma.customer.createMany({
      data: customers,
    });
    console.log('Created sample customers');

    // Generate daily stats with consistent data
    console.log('Generating daily stats...');
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      date.setHours(0, 0, 0, 0);
      
      const totalVisits = faker.number.int({ min: 100, max: 1000 });
      const uniqueVisitors = faker.number.int({ min: 50, max: totalVisits });
      
      await prisma.dailyStats.create({
        data: {
          date,
          totalVisits,
          uniqueVisitors,
          totalEvents: faker.number.int({ min: totalVisits, max: totalVisits * 3 }),
        },
      });

      // Create multiple events for each day
      const eventsForDay = Array.from({ length: totalVisits }, () => ({
        name: faker.helpers.arrayElement(['page_view', 'click', 'signup', 'purchase']),
        path: faker.helpers.arrayElement([
          '/',
          '/dashboard',
          '/features',
          '/pricing',
          '/docs',
        ]),
        sessionId: faker.string.uuid(),
        timestamp: new Date(date.getTime() + faker.number.int({ min: 0, max: 24 * 60 * 60 * 1000 })),
        userId: user.id,
        properties: {
          userAgent: faker.internet.userAgent(),
          referrer: faker.helpers.arrayElement([
            'https://google.com',
            'https://github.com',
            'https://twitter.com',
            null
          ]),
          duration: faker.number.int({ min: 10, max: 300 }),
          value: faker.number.int({ min: 1, max: 1000 }),
        },
      }));

      await prisma.analyticsEvent.createMany({
        data: eventsForDay,
      });
    }
    
    console.log('Seed completed successfully');
    console.log('\nTest User Credentials:');
    console.log('Email: test@example.com');
    console.log('Password: password123');
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('Failed to seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Disconnecting from database...');
    await prisma.$disconnect();
    console.log('Done');
  }); 