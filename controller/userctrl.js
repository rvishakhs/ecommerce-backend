const User = require("../modals/userModal")
const Cart = require("../modals/CartModal")
const Product = require("../modals/productModal")
const Coupon = require("../modals/couponModal")
const Order = require("../modals/OrderModal")
const asynchandler = require("express-async-handler");
const {generateToken} = require("../config/jwttoken");
const MongoDbValidation = require("../utils/validatemogodbid");
const cookieParser = require('cookie-parser');
const {generateRefreshToken} = require("../config/refreshToken");
const jwt = require ("jsonwebtoken");
const sentemail = require("./emailcontroler");
const crypto = require("crypto");
const uniqid = require('uniqid')
const { log } = require("console")

// Creating a new user 

const createuser =  asynchandler(async (req, res) => {
    const email = req.body.email
    const finduser = await User.findOne({email: email});
 
    if(!finduser) {
        // Create a new user
        const newUser = User.create(req.body);
        res.json(newUser);
    } else {
        // user already exists
       throw new Error(`user already exists`)
    }
})

// Login user function

const loginuserctrl = asynchandler(async (req, res) => {
    const {email, password} = req.body
    // check the user exists or not
    
    const finduser = await User.findOne({email});

    if(finduser && await finduser.isPaasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(finduser?._id);
        const updateUser = await User.findByIdAndUpdate(finduser._id, {
                refreshToken : refreshToken,
            },
            {
                new: true
            }
        );
        res.cookie("refreshToken", refreshToken,{
            httpOnly : true,
            maxAge : 72 * 60 * 60 * 1000,
        })

        res.json({
            _id : finduser?._id,
            firstname : finduser?.firstname,
            lastname : finduser?.lastname,
            email: finduser?.email,
            mobile : finduser?.mobile,
            token : generateToken(finduser?._id)

        });
        console.log("Login Sucessfull");
    } else {
        throw new Error(`user not found`)
    }
}) 

// Admin Login Functionality

const loginAdmin = asynchandler(async (req, res) => {
    const {email, password} = req.body
    // check the user exists or not
    
    const findAdmin = await User.findOne({email});
    if (findAdmin.role !== "admin") throw new Error(`This User is not a admin`)

    if(findAdmin && await findAdmin.isPaasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findAdmin?._id);
        const updateUser = await User.findByIdAndUpdate(findAdmin._id, {
                refreshToken : refreshToken,
            },
            {
                new: true
            }
        );
        res.cookie("refreshToken", refreshToken,{
            httpOnly : true,
            maxAge : 72 * 60 * 60 * 1000,
        })

        res.json({
            _id : findAdmin?._id,
            firstname : findAdmin?.firstname,
            lastname : findAdmin?.lastname,
            email: findAdmin?.email,
            mobile : findAdmin?.mobile,
            token : generateToken(findAdmin?._id)

        });
        console.log("Admin Login  Sucessfull");
    } else {
        throw new Error(`Adnin not found`)
    }
}) 

// Saving address to user 

const saveAddress = asynchandler(async (req, res) => {
    const {_id} = req.user;
    const {address} = req.body
    try {
        const user = await User.findByIdAndUpdate(_id, {address : address }, {new : true})
        res.json(user)
    } catch (err) {
        throw new Error (`This error occured while saving address `)
    }
})

//  Get all users 

const getallusers = asynchandler(async (req, res) => {
    try {
        const allUsers = await User.find() 
        res.json(allUsers)
    } catch (err) {
        throw new Error(err)
    }
} )

// Handlerefresh Token

const handleRefreshToken = asynchandler(async (req, res)=> {
    const cookie = await req.cookies
    console.log(cookie);  
    try {
        if(!cookie.refreshToken) throw new Error ("No refresh Token found" )
        const refreshToken = cookie.refreshToken
        const user = await User.findOne({ refreshToken : refreshToken})    
        if (!user) throw new Error(`There is no refresh token and user found in DB`)
        jwt.verify(refreshToken, process.env.SECRET_KEY, async (err, decoded) => {
            if (err || user.id !== decoded.id) {
                throw new Error(`There is something wrong with refresh token`)
            } else {
                const accessToken = await generateToken(user?.id);
                res.json({
                    accessToken
                })
                console.log(accessToken);
            }
        })
        

    } catch (err) {
        throw new Error(`This error is related to Handle refesh Token ${err}`)
    }
})

// Change Password Functionality 

const changePassword = asynchandler(async (req, res) => {
    const {_id} = req.user
    const {password} = req.body

    MongoDbValidation(_id) 

    const user = await User.findById(_id);

     if(password) {
        user.password = password;
        const UpdatedPassword = await user.save()
        res.json(UpdatedPassword)  
     } else {
        res.json(user)
     }
})

// Forget Password Functionality

const forgetpassword = asynchandler(async(req, res) => {
    const {email} = req.body
    const user = await User.findOne({email})
    if(!user) throw new Error(`user not found`)
    try {
        const token = await user.createPasswordResetToken();
        await user.save();

        const resetUrl = `We received a request to reset your Eshoppers account password. This Link is valid for 10 minutes till ${Date()} <a href="http://localhost:4005/api/user/resetpassword/${token}">Forget Password</a>`
        const data = {
            to : email,
            subject : "Password Reset Request",
            text : "Hey User",
            html : resetUrl
        } 
        sentemail(data)
        res.json(token)
    } catch (err) {
        throw new Error(`This error is related to Handle refesh Token ${err}`)
    }
})

// Reset Password Functionality

const resetpassword = asynchandler(async(req,res) => {
    const {password } = req.body
    const {token} = req.params

    const hashedtoken = crypto.createHash("sha256").update(token).digest("hex")

    const user = await User.findOne({
        passwordresettoken : hashedtoken,
        passwordresetexpires : { $gt : Date.now() }
    });

    if(!user) throw new Error(`user not found`)

    user.password = password;
    user.passwordresettoken = undefined;
    user.passwordresetexpires = undefined;

    await user.save();

    res.json(user)

})

// Logout Function 

const logoutFunction = asynchandler(async (req, res) => {
    const cookie = await req.cookies
    try {
        if(!cookie.refreshToken) throw new Error (" There is no refresh Token")
        const refreshToken = cookie.refreshToken
        const user = await User.findOne({refreshToken : refreshToken})
        if (!user) {
            res.clearCookie("refreshToken",{
                httpOnly: true,
                secure: true,
            })
            res.statusCode(204)
        } 
        await User.findByIdAndUpdate(user.id, {
            refreshToken : " "
        })
        res.clearCookie("refreshToken",{
            httpOnly: true,
            secure: true,
        })
        return res.sendStatus(204)
    } catch (err) {
        throw new Error(err)
    }

})

// Find one user by Id

const getOneUser = asynchandler(async (req, res) => {
    const {_id} = req.user
    MongoDbValidation(_id)
    try {
        const user = await User.findById(_id)
        res.json(user)
    } catch (err) {
        throw new Error(err)
    }
})

// Find and delete a user 

const deleteUser = asynchandler(async (req, res) => {
    const {_id } = req.user
    MongoDbValidation(_id)
    try {
        const deletedUser = await User.findByIdAndDelete(_id)
        res.json(deletedUser)
    } catch (err) {
        throw new Error(err)
    }
}) 

// Find and update a user by id 

const updateUser = asynchandler(async (req, res) => {
    const {_id} = req.user 
    MongoDbValidation(_id)
    try {
        const UserUpdated = await User.findByIdAndUpdate(_id, {
            firstname : req?.body.firstname,
            lastname : req?.body.lastname,
            email : req?.body.email,
            mobile : req?.body.mobile
        },{new : true})
        res.json(UserUpdated)

    } catch (err) {
        throw new Error(err)
    }
})

// Block a user 

const blockUser = asynchandler(async (req, res) => {
    const {id} = req.params
    MongoDbValidation(id)
    try {
        const BlockedUser = await User.findByIdAndUpdate(id, {
            blocked : true
        }, {new : true})
        res.json({
            message : "User blocked"
        })
    } catch (err) {
        throw new Error("something wrong with blocked user")
    }
})

// Unblock User 
const unBlockUser = asynchandler(async (req, res) => {
    const {id} = req.params
    MongoDbValidation(id)
    try {
        const UnBlockedUser = await User.findByIdAndUpdate(id, {
            blocked : false
        }, {new : true})
        res.json({
            message : "User Unblocked"
        })
    } catch (err) {
        throw new Error("something wrong with unblocked user")
    }
})

// Fetch wishlist from user 

const wishlist = asynchandler(async (req, res) => {
    const {_id} = req.user
    try{
        const user = await User.findById(_id).populate("wishlist")
        res.json(user)
    } catch (err) {
        throw new Error("something wrong with fetching wishlist")
    }
})

// Cart functionality for User

const userCart = asynchandler(async (req, res) => {
    const {_id} = req.user
    const {cart} = req.body
    try {
        let products = []
        const user = await User.findById(_id);
        //  Check if the user already have some products in the cart
        const alreadyInCart = await Cart.findOne({orderBy : user._id})
        // if(alreadyInCart) {
        //     alreadyInCart.remove();
        // } 
        for (let i = 0; i<cart.length; i++) {
            let object = {}
            object.product = cart[i]._id;
            object.count = cart[i].count;
            object.color = cart[i].color;Cart
            let getPrize = await Product.findById(cart[i]._id).select("price").exec();
            object.price = getPrize.price
            products.push(object)
        }

        let carttotal = 0
        for(i =0 ; i<products.length; i++){
            carttotal = carttotal + products[i].price * products[i].count
        }
        let newCart = await new  Cart({
            orderBy : user?._id,
            cartTotal : carttotal,
            products : products
        }).save()
        console.log(newCart);
        res.json(newCart)


    } catch (err){
        throw new Error(`something wrong with User Cart functionality for more info ${err.message}`)
    }
})

// Get usercart functionality 

const getUserCart = asynchandler(async(req, res) => {
    const {_id} = req.user
    try {
        // Fetch the user
        const user = await User.findById(_id)
        const cart = await Cart.findOne({orderBy : user._id}).populate("products.product") 
        console.log(cart);
        res.json(cart)
    } catch (err) {
        throw new Error (`This error is related to getting user cart for more deatils check ${err.message} `)
    }
})

// Empty Cart functionality

const emptyCart = asynchandler(async(req, res)=> {
    const {_id} = req.user
    console.log(_id);
    try {
        // Find the user
        const user = await User.findOne({_id})
        const cart = await Cart.findOneAndRemove({orderBy :user._id})
        res.json(cart)

    } catch (err){
        throw new Error (`This error is related to getting empty cart for more details ${err.message}`)
    }
})

// Applying Coupon functionality

const ApplyingCoupon = asynchandler(async(req, res)=> {
    const {_id} = req.user
    const {coupon} = req.body
    try {
        // Find the user
        const user = await User.findOne({_id})
        // Check the coupon valid or not
        const validatingCoupon = await Coupon.findOne({tittle : coupon})
        if(validatingCoupon == null) {
            throw new Error(`Coupon related error`)
        } 
        
        let {cartTotal} = await Cart.findOne({orderBy : user._id}).populate("products.product")
        let totalafterdiscount = (cartTotal - (cartTotal * validatingCoupon.discount) / 100) 
        await Cart.findOneAndUpdate({orderBy : user._id}, {totalafterDiscount : totalafterdiscount}, {new : true})
        res.json(totalafterdiscount) 

    } catch (err) {
        throw new Error (`This error is populated because of issue in applying coupon`)
    }
})

// Creating new Order functionality

const createOrder = asynchandler(async (req, res)=> {
    const {_id} = req.user
    const {COD, couponapplied} = req.body
    try {
        if(!COD) throw new Error ("Payment method is not available")
        const user = await User.findById(_id)
        let usercart = await Cart.findOne({orderBy : user._id}) 
        let finalamount = 0
        if (couponapplied && usercart.totalafterDiscount) {
            finalamount = usercart.totalafterDiscount
        } else {
            finalamount = usercart.cartTotal
        }

        let newOrder = await new Order({
            products : usercart.products,
            paymentIntent : {
                id : uniqid("ORDER",undefined),
                method : "COD",
                amount : finalamount,
                status : "Order Placed | COD",
                created : Date(),
                currency : "USD"
            },
            orderBy : user._id,
            orderStatus : "Processing"
        }).save()

        // after placing order we have to update stock count in quantity and sold quantity
        let update = usercart.products.map((item) => {
            return {
                updateOne : {
                    filter : { _id : item.product._id},
                    update : {$inc : { quantity : -item.count, sold: + item.count }}
                }
            }
        })
        const updated = await Product.bulkWrite(update, {})
        res.json({message : "success"})

    } catch (err) {
        throw new Error (`This error is populated because of issue in creating order`)
    }
})

// Getting the orderlist 

const getOrder = asynchandler(async (req, res) => {
    const {_id} = req.user
    try {
        // GEt the user
        const user = await User.findOne(_id)
        const userOrder = await Order.findOne({orderBy : _id}).populate("products.product")
        console.log(userOrder);
        res.json(userOrder)


    } catch (err) {
        throw new Error (`This error is populated because of getorder functionality`)
    }
})

// Fetching all orders 

const getallorders = asynchandler(async (req, res) => {
    try {
        const allOrders = await Order.find() 
        res.json(allOrders)
    } catch (err) {
        throw new Error(err)
    }
} )

// Update order Status function

const updateOrderStatus = async (req, res) => {
    const {id} = req.params
    const {status} = req.body
    try {
        // Find the order
        const updateOrder = await Order.findByIdAndUpdate(id, { 
            orderStatus : status, 
            $set : {
                'paymentIntent.status' :  status    
            }
        }, {new : true})
        res.json(updateOrder);
    } catch (err) {
        throw new Error(`Error related to updating order status, for more info ${err.message}`)
    }
}


module.exports = {
    createuser, 
    loginuserctrl, 
    getallusers, 
    getOneUser, 
    deleteUser,
    updateUser,
    blockUser,
    unBlockUser,
    handleRefreshToken,
    logoutFunction,
    changePassword,
    forgetpassword,
    resetpassword,
    loginAdmin,
    wishlist,
    saveAddress,
    userCart,
    getUserCart,
    emptyCart,
    ApplyingCoupon,
    createOrder,
    getOrder,
    getallorders,
    updateOrderStatus
} 