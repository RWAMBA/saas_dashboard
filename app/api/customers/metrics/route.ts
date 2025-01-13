import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET() {
  try {
    // Comment out or remove the unused variables
    // const { from, to } = req.query;

    // Get total customers
    const totalCustomers = await prisma.customer.count();

    // Get active subscriptions (customers with active status)
    const activeSubscriptions = await prisma.customer.count({
      where: { status: 'active' }
    });

    // Calculate churn rate (inactive customers / total customers)
    const inactiveCustomers = await prisma.customer.count({
      where: { status: 'inactive' }
    });
    const churnRate = totalCustomers > 0 
      ? ((inactiveCustomers / totalCustomers) * 100).toFixed(1)
      : "0.0";

    // Get month-over-month growth
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const customersLastMonth = await prisma.customer.count({
      where: {
        createdAt: {
          lt: new Date(),
          gte: lastMonth
        }
      }
    });

    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    const customersTwoMonthsAgo = await prisma.customer.count({
      where: {
        createdAt: {
          lt: lastMonth,
          gte: twoMonthsAgo
        }
      }
    });

    const growth = customersTwoMonthsAgo > 0
      ? ((customersLastMonth - customersTwoMonthsAgo) / customersTwoMonthsAgo * 100).toFixed(1)
      : customersLastMonth > 0 ? "100.0" : "0.0";

    return NextResponse.json({
      totalCustomers,
      activeSubscriptions,
      churnRate: `${churnRate}%`,
      growth: `${growth}%`,
      lastMonthCustomers: customersLastMonth
    });
  } catch (error) {
    console.error('Error fetching customer metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customer metrics' },
      { status: 500 }
    );
  }
} 