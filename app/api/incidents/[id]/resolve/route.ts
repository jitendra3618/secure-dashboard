import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const incident = await prisma.incident.update({
    where: { id },
    data: { resolved: { not: true } },
  });
  return NextResponse.json(incident);
}