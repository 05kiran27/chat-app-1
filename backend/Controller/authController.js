const User = require('../models/userModel');
const generateTokenAndSetCookie = require('../utils/jwt');

exports.signup = async (req,res) => {
    try{
        const{firstName, lastName, userName, password, confirmPassword, gender} = req.body;

        if(password!== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"password and confirm password does not match",
            })
        }

        // const userexists = User.findOne({userName});
        // console.log("user name => ", userexists._id);
        // if(userexists){
        //     return res.status(400).json({
        //         success:false,
        //         message:"username already exists"
        //     })
        // }

        // avatar api boys => https://avatar.iran.liara.run/public/boy?username=Scott
        // avatar api girls => https://avatar.iran.liara.run/public/girl?username=Maria

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${firstName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${firstName}`;

        const newUser = new User({
            firstName,
            lastName,
            userName,
            password,
            gender,
            profilePic: gender ==='male' ? boyProfilePic : girlProfilePic
        })

        if(newUser){
            await newUser.save();

            const token = generateTokenAndSetCookie(newUser._id,res)


            return res.status(200).json({
                success:true,
                message:`user created successfully`,
                newUser,
                token,
            });
        }

        else{
            return res.status(400).json({
                success:false,
                message:"Invalid user data",
            })
        }
        

    }
    catch(error){
        console.log("error");
        console.log(error)
    }
    
}


exports.login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        const user = await User.findOne({ userName });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found in userController',
            });
        }

        originalPassword = user.password;
        if(originalPassword !== password){
            return res.status(400).json({
                success:false,
                message:`password is wrong`
            })
        }

        // Generate token and set cookie
        const token = generateTokenAndSetCookie(user._id, res);

        // Send response with user info and token
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            user,
            token  // Optional: include token in response for use in client
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Could not login, error in login in authcontroller"
        });
    }
}





exports.logout = async (req,res) => {
    try{
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({
            success:true,
            message:'logout successfully',
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'internal server error in logout auth controller'
        })
    }
}