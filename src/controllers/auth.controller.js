import userModel from '../models/user.model.js';
import {generateToken} from '../libs/jwt.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    const {email, password, username} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            email,
            password: hashedPassword,
            username
        });
        const userSaved = await newUser.save();
        const token = await generateToken({id: userSaved._id});

        res.cookie('token', token);
        res.json({ 
            id: userSaved._id,
            email: userSaved.email,
            username: userSaved.username
         });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
}
export const login = async (req, res) => {
    const {email, password} = req.body;

    try {

        const userFound = await userModel.findOne({email});
        if (!userFound) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

        const token = await generateToken({id: userFound._id});

        res.cookie('token', token);
        res.json({ 
            id: userFound._id,
            email: userFound.email,
            username: userFound.username
         });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
}
export const logout = (req, res) => {
    res.cookie('token', '', { expires: new Date(0), });
    return res.sendStatus(200);
}
