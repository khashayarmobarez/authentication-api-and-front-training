import { verify } from "jsonwebtoken";

const { hash, compare } = require("bcryptjs")

const hashPasswords = async (password) => {
    const hashedPassword = await hash(password, 10)
    return hashedPassword;
}

const verifyPassword = async (password, hashedPassword) => {
    const isMatch = await compare(password, hashedPassword)
    return isMatch;
}

function verifyToken(token, secretKey) {
    try {
        const result = verify(token, secretKey);
        return { status: 'success', data: result };
    } catch (error) {
        return { status: 'failed', message: 'Invalid token' };
    }
}


export { hashPasswords, verifyPassword, verifyToken }