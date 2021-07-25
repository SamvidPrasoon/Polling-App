const express = require('express');
const router = express.Router();
const User = require('../models/user')
router.get('/',async(req,res)=>{
    try {
        const users = await User.find();
        if(!users)
        {
            return res.status(200).json({
                error:"no users found"
            })
        }
        res.json(users);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg:"server error "
        })
    }
})

router.get('/:id',async(req,res)=>{
    try {
         const user =  await  User.findById(req.params.id).select('-password');
         if(!user)
         {
             return res.status(200).json({
                 error:"user not found"
             })
         }
         res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg:"server error"
        })
    }
})

 module.exports = router;