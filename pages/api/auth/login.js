import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

export default async function handler(req, res) {

    if(req.method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed'});
    }

    // Connect to database
    try {
        await connectDB()
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal server error(connection error)'});
    }

    const {email, password} = req.body;
    const expirationTime = 5 * 24 * 60 * 60 ; // 5 days


    if (!email || !password) {
        return res.status(422).json({status: 'failed',message: 'Please fill in all fields'});
    }

    // Check if user already exists
    const userExistance = await User.findOne({
        email
    });

    if (!userExistance) {
        return res.status(401).json({status: 'failed', message: 'Invalid credentials'});
    }
    
    // check if password is correct
    const isPasswordCorrect = await verifyPassword(password, userExistance.password);

    if (!isPasswordCorrect) {
        return res.status(422).json({status: 'failed', message: 'Invalid credentials'});
    }

    const token = sign({email}, process.env.SECRET_KEY, {
        expiresIn: expirationTime
    });

    res.status(200).setHeader('Set-Cookie', serialize('token', token, {httpOnly: true, maxAge: expirationTime, path: '/'})).json({status: 'success', message: 'Login successful', data: {email, token}});


}