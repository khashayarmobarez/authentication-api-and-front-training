import User from "@/models/User";
import { verifyToken, verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await connectDB();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'failed', message: 'Database connection failed' });
    }

    const { name, lastName, password } = req.body;
    const { token } = req.cookies;
    const secretKey = process.env.SECRET_KEY;

    if(!token) {
        return res.status(401).json({ status: 'failed', message: 'Unauthorized' });
    }

    const result = verifyToken(token, secretKey);

    if (result.status === 'failed') {
        return res.status(401).json({ status: 'failed', message: 'Unauthorized' });
    }

    const user = await User.findOne({ email: result.email });

    console.log(user);

    if(!user) {
        return res.status(404).json({ status: 'failed', message: 'User not found' });
    }

    if (!user.password) {
        return res.status(404).json({ status: 'failed', message: 'password missing' });
    }

    const isValid = await verifyPassword(password, user.password); 

    if (!isValid) {
        return res.status(401).json({ status: 'failed', message: 'Invalid password' });
    }

    user.name = name;
    user.lastName = lastName;
    await user.save();
    return res.status(200).json({ status: 'success', message: 'User information updated successfully' });

}