import User from "@/models/User";
import { hashPasswords } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {

    // Check if request method is POST  
    if(req.method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed'});
    }

    //  Connect to database
    try {
        await connectDB()
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }

    // Get email and password from request body
    const {email, password} = req.body;

    // Check if email and password are provided
    if(!email || !password) {
        return res.status(422).json({status: 'failed',message: 'Please fill in all fields'});
    }

    // Check if user already exists
    const userExistance = await User.findOne({
        email
    });

    if (userExistance) {
        return res.status(409).json({status: 'failed', message: 'User already exists'});
    }

    const hashedPassword = await hashPasswords(password);

    const newUser = new User.create({
        email,
        password: hashedPassword
    }); 

    console.log(newUser);
    
    return res.status(201).json({status: 'success', message: 'User created successfully'});
}