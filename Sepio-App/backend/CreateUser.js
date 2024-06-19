const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUser() {
    try{
      //Ensure the config was right
      await prisma.$connect();
      //Creating DB
        await prisma.$executeRaw`CREATE DATABASE IF NOT EXISTS nodejs_login;`;
        await prisma.$executeRaw`USE nodejs_login;`;

  await prisma.user.create({
    data: {
      id: 1,  
      name: 'Main_user',
      password: 'Sepio_password', // Ensure you hash the password in real applications
      otp_secret: ''
    },
  });
  //Granting privilages
  await prisma.$executeRaw`GRANT ALL PRIVILEGES ON nodejs_login.* TO 'Main_user'@'localhost';`;
  await prisma.$executeRaw`FLUSH PRIVILEGES;`;

  console.log('User created and privileges granted successfully.');
} catch (e) {
  console.error('Error creating user:', e);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
}

createUser().catch(console.error);