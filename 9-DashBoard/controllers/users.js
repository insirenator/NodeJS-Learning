const User = require("../models/User")
//const CustomAPIError = require('../errors/custom-api-error');
require('dotenv').config()
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        // Check if username is already registered
        let user = await User.findOne(req.body);
        if (user) {
            return res.status(400).json({msg: 'username already registered'})
        }
        // If not registered, then register
        user = await User.create(req.body);
        return res.status(200).json({msg:"user created", user});
    } catch (error) {
        res.status(400).json({msg: error});
    }
} 

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(401).json({success:false, msg: 'must provide credentials'});
        }
        const user = await User.findOne({username});
        // Check if user is registered
        if (!user) {
            return res.status(401).json({success:false, msg: 'user not registered'});
        }
        // Check password
        if (user.password !== password) {
            return res.status(401).json({success:false, msg: 'incorrect credentials'});
        }

        // Generate token
        const id = Date.now()
        const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '30d'});

        // res.setHeader('Authorization', `Bearer ${token}`);
        // return res.redirect(301, '/dashboard');

        return res.status(200).json({
            success:true, 
            msg: 'login successful', 
            user: {
                firstname: user.firstname, 
                lastname: user.lastname,
                username: user.username, 
            },
            token,
        });


    } catch (error) {
        res.status(404).json({msg:error.message});
    }

    // res.status(200).json({msg: 'LOGIN', user: req.body});
}

module.exports = {
    registerUser,
    loginUser,
}