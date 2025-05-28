import { verifyToken } from "@/utils/auth";


export default async function handler(req, res) {
    if(req.method !== 'GET') {
            return res.status(405).json({ message: 'Method not allowed' });
        };

    const { token } = req.cookies;
    const secretKey = process.env.SECRET_KEY;

    if (!token) {
        return res.status(401).json({ status:'failed',message: 'Unauthorized' });
    }

    
    const result = verifyToken(token, secretKey);
    if (result.status === 'failed') {
        return res.status(401).json({ status: 'failed', message: 'you are unauthorized' });
    }
    return res.status(200).json({ status: 'success', user: result.data });
}