import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {

    if(req.method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed'});
    }

    // Connect to database
    try {
        await connectDB()
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }

    const {email, password} = req.body;


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
    const isPasswordCorrect = await userExistance.verifyPassword(password); 

    if (!isPasswordCorrect) {
        return res.status(422).json({status: 'failed', message: 'Invalid credentials'});
    }

    

}