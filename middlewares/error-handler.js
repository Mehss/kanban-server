const errorHandler = (err, req, res, next) => {
    let statusCode
    let message
    console.log(err)
    switch (err.name) {
        case "noEmail":
            statusCode = 404
            message = "Email not found"
            break;

        case "wrongPassword":
            statusCode = 401
            message = "Wrong password"
            break;
        
        case "SequelizeUniqueConstraintError":
            statusCode = 400
            message = err.errors.map(el => el.message)
            break;

        case "FillEmailPassword":
            statusCode = 400
            message = "Please Fill Email and Password"
            break;

        case "TaskNotFound":
            statusCode = 404
            message = "Task not Found"
            break;

        case "AuthorizationError":
            statusCode = 401
            message = "User does not have permission"
            break;

        case "JsonWebTokenError":
            statusCode = 401
            message= "Login Error"
            break;
        
        case "SequelizeValidationError":
            statusCode = 400
            message = err.errors.map(el => el.message)
            break;

        default:
            statusCode = 500
            message = "Internal Server Error"
            break;
    }
    res.status(statusCode).json({message: message, devMessage: err})
}
module.exports = errorHandler