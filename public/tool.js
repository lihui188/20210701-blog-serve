const getToken = require('jsonwebtoken')

exports.verToken = function(token){
    return new Promise((resolve,rejece) => {
        const info = getToken.verify(token.split(' ')[1],"1729625246");
        resolve(info);
    })
}