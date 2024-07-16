const { validateToken } = require("../services/auth");

function checkAuthenticationcookie(coockieName) {
    return (req, res, next) => {

        const tokenCookieValue = req.cookies[coockieName];
        if(!tokenCookieValue) {
           return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch (error) {}
        
        return next();
    };
}


module.exports = {
    checkAuthenticationcookie,
    
}