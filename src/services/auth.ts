import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { prisma } from '../../prisma/client';
import type { CreateUserPayload, UserJwtPayload, UserPayload } from '../types/userTypes';

export const registerUser = async (payload: CreateUserPayload): Promise<{ user: UserPayload; token: string }> => {
    const hashPass = await bcrypt.hash(payload.password, 10)

    const user = await prisma.user.create({
        data: { ...payload, password: hashPass },
    })

    const tokenPayload: UserJwtPayload = { id: user.id, email: user.email }
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, { expiresIn: '1d' })

    return { user, token }
}

export const loginUser = async (email: string, password: string): Promise<{ user: UserPayload; token: string }> => {

    const user = await prisma.user.findUnique({
        where: { email },
        include: { recipes: true },
    })

    if (!user) {
        throw createHttpError(404, 'User not found!')
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
        throw createHttpError(401, 'Invalid password')
    }
    
    const tokenPayload: UserJwtPayload = { id: user.id, email: user.email }
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, { expiresIn: '1d' })

    return { user, token }
}
