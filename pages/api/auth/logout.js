import { serialize } from "cookie";

export default async function handler(req, res) {
    if(req.method !== 'GET') return;

    const serialized = serialize('token', '', {
        path: '/',
        maxAge: -1, // Set to -1 to delete the cookie
    }) 

    res.status(200).setHeader('Set-Cookie', serialized).json({ status: 'success', message: 'Logged out successfully' });
}