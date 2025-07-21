import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const resolved = req.nextUrl.searchParams.get('resolved') === 'true';

  const incidents = await prisma.incident.findMany({
    where: { resolved },
    orderBy: { tsStart: 'desc' },
    include: { camera: true },
  });

  return NextResponse.json(incidents);
}