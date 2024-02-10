import User from '@/models/user';
import { Request, Response, NextFunction } from 'express'

async function signup(req: Request, res: Response, next: NextFunction) {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        if (!username || !email || !password) {
            res.status(400).send('Username, email and password are required');
            return;
        }
        const user = await User.createUser(username, email, password);
        res.status(200).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await User.authenticate(req.body.email, req.body.password);
        if (user) {
            console.log('User authenticated:', user);
            res.status(200).json('User authenticated');
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (error) {
        res.status(401).send('Not authenticated');
    }
}

export default { login, signup }
