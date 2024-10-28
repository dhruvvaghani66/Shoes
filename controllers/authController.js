import userModel from '../models/userModel.js'
import {
    comparePassword,
    hashPassword
} from '../helpers/authHelper.js';
import JWT from 'jsonwebtoken';
import orderModel from '../models/orderModel.js';



// register
export const registerController = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phone,
            address,
            answer
        } = req.body;

        // validations
        if (!name) {
            return res.send({
                message: 'Name is Required'
            })
        }
        if (!name) {
            return res.send({
                message: 'Name is Required'
            })
        }
        if (!email) {
            return res.send({
                message: 'Email is Required'
            })
        }
        if (!password) {
            return res.send({
                message: 'Password is Required'
            })
        }
        if (!phone) {
            return res.send({
                message: 'Phone is Required'
            })
        }
        if (!address) {
            return res.send({
                message: 'Address is Required'
            })
        }
        if (!answer) {
            return res.send({
                message: 'Answer is Required'
            })
        }
        // check user
        const exisitingUser = await userModel.findOne({
            email
        })
        // check exisiting user
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already Register please Login'
            })
        }

        // register user
        const hashedPassword = await hashPassword(password);
        // save
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            answer
        }).save();

        res.status(200).send({
            success: true,
            message: 'User Register Successfully',
            user
        })




    } catch (message) {
        console.log(message);
        res.status(500).send({
            success: false,
            message: 'Error in Registeration',
            message
        })
    }
}


// POST Login
export const loginController = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body

        // validatiom
        if (!email || !password) {
            return res.status({
                success: false,
                message: 'Invalid email or password'
            })
        }

        // check user
        const user = await userModel.findOne({
            email
        })

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email not found'
            })
        }
        // if we get successfully email then password compare but password in DB is encrypt so first here decrypt
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid Password'
            })
        }

        //token
        const token = await JWT.sign({
            _id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })
        res.status(200).send({
            success: true,
            message: 'login successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,

            },
            token
        })


    } catch (message) {
        console.log(message);
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            message
        })
    }
}



//forgot password controller
export const forgotPasswordController = async (req, res) => {
    try {
        const {
            email,
            answer,
            newPassword
        } = req.body;

        // validation
        if (!email) {
            return res.status(400).send({
                message: 'Email is required'
            });
        }
        if (!answer) {
            return res.status(400).send({
                message: 'Answer is required'
            });
        }
        if (!newPassword) {
            return res.status(400).send({
                message: 'New Password is required'
            });
        }

        // check user
        const user = await userModel.findOne({
            email,
            answer
        });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Wrong Email Or Answer'
            });
        }

        // if we get successfully email then answer compare
        // const match = await comparePassword(answer, user.question);

        // if (!match) {
        //     return res.status(
        //         401
        //     ).send({
        //         message: 'Invalid answer'
        //     });
        // }
        // hash password
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, {
            password: hashed
        })
        // update password
        // user.password = hashed;
        // await user.save();

        res.status(200).send({
            message: 'Password Reset Successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Forgot Password',
            error
        });
    }
};



//test controller
export const testController = async (req, res) => {
    try {
        res.send(`protected Route`);
    } catch (message) {
        console.log(message);
        res.send({
            message
        });
    }
}

//update prfole
export const updateProfileController = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            address,
            phone
        } = req.body;
        const user = await userModel.findById(req.user._id);
        //password
        if (password && password.length < 6) {
            return res.json({
                error: "Passsword is required and 6 character long"
            });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id, {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address,
            }, {
                new: true
            }
        );
        res.status(200).send({
            success: true,
            message: "Profile Updated SUccessfully",
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Update profile",
            error,
        });
    }
};

// orders
export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({
            buyer: req.user._id
        }).
        populate("products", "-photo").
        populate("buyer", "name");
        res.json({
            success: true,
            orders,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting orders",
            error,
        });
    }
};

// all order
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort("-createdAt");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};

//order status
export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };