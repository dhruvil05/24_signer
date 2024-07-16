const jwt = require('jsonwebtoken');
const secret = "Dhruvil@#@23117";

function createTokenForUser(user) {

    const payload = {
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        status: user.status,
        role: user.role
    };

    const token = jwt.sign(payload, secret);

    return token;
}

function validateToken(token) {

    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

module.exports = {
    createTokenForUser,
    validateToken,
}