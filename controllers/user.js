const {User, validate} = require('../models/user');
const Joi = require('joi');
async function handleCreateNewUser(req, res) {
    
    const { error } = validate(req.body);
    if(error) return res.status(400).json(error.details[0].message);
    
    const {firstName, lastName, email, password} = req.body;

    try {
        const user = await User.create({
            firstName, 
            lastName,
            email,
            password,
        });

        return res.json(user);

    } catch (err) {
        return res.json({"ERROR": err.errmsg})
    }
}

async function handleLogin(req, res) {

    const { error } = validateLogin(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    const { email, password } = req.body;
    const token  = await User.matchPasswordAndGenerateToken(email, password, res);

    if(!token){
        return res.json(' Email or Password is wrong.');
    }
    res.cookie('token', token);
    const data = await User.findOne({ email }, { password:0, salt:0});

    return res.json({"data": data, "token": token});
} 

async function handleGetAllUsers(req, res) {
    try {
        const users = await User.find({}, { password:0, salt:0});
        const count = users.length

        if(!users) return res.status(404).json('Users Not Found.');

        return res.status(200).json({ 'total_users': count, "users": users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    
}

async function handleGetUserById(req, res) {
    try {
        const user = await User.findOne({ "_id": req.params.id}, { password:0, salt:0});

        if(!user) return res.status(404).json("User Not Found");

        return res.status(200).json(user);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const validateLogin = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    return schema.validate(user);
}

module.exports = {
    handleCreateNewUser,
    handleLogin,
    handleGetAllUsers,
    handleGetUserById,
};