import { Request, Response } from 'express';
import prisma from '../config/database';
import jwt from 'jsonwebtoken';
import fs from 'fs';

const privateKey = fs.readFileSync('keys/private.key', 'utf8');
const publicKey = fs.readFileSync('keys/public.key', 'utf8');

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await prisma.users.findFirst({
        where: { username }
    });

    if (!user) {
        return res.status(401).json({ message: 'User not found'});
    }

    if (user.username === username && user.password === password) {
        const payload = {
            username: 'admin',
            role: 'admin'
        };

        const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1h' });

        return res.json({ token });
    }

    return res.json({ express: 'Invalid credentials'});
}

export const verify = async (req: Request, res: Response) => {
    const { token } = req.body;

    try {
        const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });

        return res.status(200).json({ message: 'Token is valid', decoded });
    } catch (e) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}