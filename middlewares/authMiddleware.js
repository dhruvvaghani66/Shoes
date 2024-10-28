import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js'

// Protected routes token base
export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        // if token is valid then further exicution start or run
        req.user = decode
        next()
    } catch (error) {
        console.log(error);
        // res.status(401).send({
        //     success: false,
        //     message: 'Not authorized to access this resource'
        // })
    }
}


// admin access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized Access'
            })
        } else {
            // if admin then further exicution start or run
            next()
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,  
            message: 'Error in admin middelware'
        })

    }
}