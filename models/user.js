const { Schema, model} = require("mongoose");
const { createHmac, randomBytes } = require('crypto');
const Joi = require("joi");
const { createTokenForUser } = require('../services/auth');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "email already exists in database!"]
    },
    salt: {
        type: String
    },
    password: {
        type: String,
        required: true  
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE"],
        default: "INACTIVE"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, {timestamps: true});


userSchema.pre("save", function (next) {
    const user = this;

    if(!user.isModified('password')) return;

    const salt = randomBytes(16).toString();

    const hashedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex');

    this.salt = salt;
    this.password = hashedPassword;

    next();
});


userSchema.static("matchPasswordAndGenerateToken", async function(email, password, res) {
    const user = await this.findOne({ email });
    if(!user) return res.json({"Error":'User not found!'});

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac('sha256', salt)
        .update(password)
        .digest("hex");

    if(hashedPassword !== userProvidedHash) return res.json("Incorrect Password");

    const token = createTokenForUser(user);

    return token;
    // return hashedPassword === userProvidedHash;
})


const validate = (user) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    return schema.validate(user);
}


const User = model('user', userSchema);

module.exports = { User, validate };