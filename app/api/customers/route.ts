import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

const CustomerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  status: z.enum(['active', 'inactive', 'pending']),
  plan: z.enum(['free', 'starter', 'pro', 'enterprise']),
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const status = url.searchParams.get('status');
  const plan = url.searchParams.get('plan');

  console.log('GET /api/customers', { status, plan });

  try {
    const customers = await prisma.customer.findMany({
      where: {
        ...(status !== 'all' && status !== null && { status: status }),
        ...(plan !== 'all' && plan !== null && { plan: plan }),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    console.log(`Found ${customers.length} customers`);
    return NextResponse.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  console.log('POST /api/customers');
  
  try {
    const json = await req.json();
    console.log('Request body:', json);

    const body = CustomerSchema.parse(json);
    console.log('Validated body:', body);

    // Check if email already exists
    const existingCustomer = await prisma.customer.findUnique({
      where: { email: body.email },
    });

    if (existingCustomer) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    const customer = await prisma.customer.create({
      data: {
        name: body.name,
        email: body.email,
        status: body.status,
        plan: body.plan,
      },
    });

    console.log('Created customer:', customer);
    return NextResponse.json(customer);
  } catch (error) {
    console.error('Error creating customer:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    );
  }
} 