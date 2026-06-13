const { PrismaClient } = require('./src/generated/prisma');
const prisma = new PrismaClient();

(async () => {
  try {
    const res = await prisma.workflow.findMany({ take: 1 });
    console.log('workflow findMany success', res);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
})();
