import express from 'express';
import prisma from './config/database';
import UserRouter from './models/userModel';

const app = express();
app.use(express.json());

app.use('/user', UserRouter);

const PORT = process.env.PORT || 3000;

async function connectDatabase() {
    try {
        await prisma.$connect();
        console.log('Db connected successfully');
    } catch (error) {
        console.error('Db connection failed:', error);
        process.exit(1);
    }
}

process.on('SIGINT', async () => {
    await prisma.$disconnect();
    console.log('Db disconnected');
    process.exit(0);
});

connectDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    })
})