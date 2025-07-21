import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const cameras = await prisma.camera.createMany({
    data: [
      { name: 'Shop Floor A', location: 'First Floor' },
      { name: 'Vault', location: 'Basement' },
      { name: 'Entrance', location: 'Main Gate' },
    ],
  });

  const cameraList = await prisma.camera.findMany();

  const threats = ['Unauthorised Access', 'Gun Threat', 'Face Recognised'];
  const now = new Date();

  for (let i = 0; i < 12; i++) {
    const cam = cameraList[i % 3];
    const start = new Date(now.getTime() - Math.random() * 8.64e7);
    const end = new Date(start.getTime() + 5 * 60 * 1000);

    await prisma.incident.create({
      data: {
        cameraId: cam.id,
        type: threats[i % threats.length],
        tsStart: start,
        tsEnd: end,
        thumbnailUrl: `/thumb${(i % 5) + 1}.jpg`,
        resolved: i % 4 === 0,
      },
    });
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());