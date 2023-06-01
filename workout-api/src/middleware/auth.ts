import { User } from '@supabase/supabase-js';
import type { NextFunction, Request, Response } from 'express';
import { supabase } from '../supabase';

export interface Req extends Request {
    user?: User | null;
}

export async function authenticate(req: Req, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (error || !user) return res.status(401).json({ message: 'Unauthorized' });

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
