const express=require("express");
const router=express.Router()
const zod=require('zod');
const jwt=require("jsonwebtoken");
const {User,Account}=require('../db') //const user=require('../db')
const JWT_SECRET=require('../config.js');
const authMiddleware=require('../middleware.js')

const userSchema = zod.object({
    username: zod.string().trim().email({ message: "Invalid email address" }),
    firstname:zod.string().trim().regex(new RegExp(/^\S.{0,}$/),{message:"firstname should have atleast one alphanumeric character"}),
    lastname:zod.string().trim().regex(new RegExp(/^\S.{0,}$/),{message:"lastname should have atleast one alphanumeric character"}),
});

const passwordSchema = zod.string()
  .min(8,{message:"password must contain atleast 8 character"})
  .regex(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/), {
    message: 'Password must be at least 8 characters long and contain at least one special symbol and one alphanumeric character.'
  });

router.post("/signup",async(req,res)=>{
    const validate=userSchema.safeParse({username:req.body.username,firstname:req.body.firstname,lastname:req.body.lastname});
    console.log(validate.error)
    if (!validate.success) {
        return res.status(411).json({
            message: validate.error.issues[0].message
        })
    }
    const validatedPassword = passwordSchema.safeParse(req.body.password);
    if(!validatedPassword.success){
        return res.status(409).json({message: validatedPassword.error.issues[0].message})
    }
    const existingUser = await User.findOne({
        username: req.body.username
    })
    if (existingUser) {
        return res.status(409).json({
            message: "Email already taken"
        })
    }
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
    })
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
    
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.status(200).json({
        message: "User created successfully",
        token: token
    })
})

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})
router.post('/signin',async (req,res)=>{
    console.log(req.body)
    const validate = signinBody.safeParse({username:req.body.username,password:req.body.password})
    console.log(validate.error)
    if (!validate.success) {
        return res.json({
            message: "Incorrect inputs"
        }).status(411)
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });
    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.status(200).json({
            token: token
        })
        return;
    }
    res.status(411).json({
        message: "User doesn't exist."
    })
})

const updateDetails=zod.object({
    password:zod.string().min(8).regex(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/), {
        message: 'Password must be at least 8 characters long and contain at least one special symbol and one alphanumeric character.'
      }).optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/",authMiddleware,async(req,res)=>{
    const validate=updateDetails.safeParse(req.body);
    if(!validate.success){
        return res.status(411).json({
            msg:validate.error.errors[0].message
        })
    }
    await User.updateOne(req.body, {
        _id: req.userId
    })
    res.status(200).json({
        message: "Updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports=router;