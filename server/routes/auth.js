const express =  require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const User =  require('../models/user');
const bcrypt = require('bcryptjs');
const {check,validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');




router.get('/', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // @route    POST api/auth
  // @desc     Authenticate user & get token
  // @access   Public

  router.post('/',
  [
      
      
      check("email","enter a valid Email").isEmail(),
      check("password","password is required ").exists()
  
  
  
  ], 
  
  
  async(req,res)=>{
      const errors = validationResult(req);
      if(!errors.isEmpty())
      {
          return res.status(400).json({errors:errors.array()})
      }
     
     //req.body contains all my data
     const {email,password} = req.body;
  
  
  
      try {
       let user =  await User.findOne({email:email});
       
       if(!user)
       {
           res.status(400).json({errors:[{msg:"invalid credentials"}]});
       }
       
       const passwordmatch = await bcrypt.compare(password,user.password);
       // console.log(passwordmatch);
       if(!passwordmatch)
       {
        res.status(400).json({errors:[{msg:"invalid credentials"}]});
       }
       
       
      
    
       //res.send("user registered");
       const payload = {
           user:{
               id:user.id
           }
       }
       jwt.sign(payload,config.get('jwtsecret'),{expiresIn:3600},
         (err,token)=>{
            if(err)
            {
                throw err;
            }
            else{
              //console.log(token);
                res.json({token:token})
            }
         }  )
     
  
  
  
  
      } catch (error) {
          res.status(401).json({
              msg:"server error"
          })
      }
  
  })
  
  
  router.post('/signin',
  [
      
      check("name","name is required").not().isEmpty(),
      check("email","enter a valid Email").isEmail(),
      check("password","please enter a password with 6 or more characters ").isLength({min:6})
  
  
  
  ], 
  
  
  async(req,res)=>{
      const errors = validationResult(req);
      if(!errors.isEmpty())
      {
          return res.status(400).json({errors:errors.array()})
      }
     
     //req.body contains all my data
     const {name,email,password} = req.body;
      try {
       let user =  await User.findOne({email:email});
       if(user)
       {
           res.status(400).json({errors:[{msg:"user already exist"}]});
       }
       
       //instantiating new user
       
       user = new User({
           name,email,password
       });
      
       const salt = await bcrypt.genSalt(10);
       user.password = await bcrypt.hash(password,salt);
       await user.save();
       //res.send("user registered");
       const payload = {
           user:{
               id:user.id
           }
       }
       jwt.sign(payload,config.get('jwtsecret'),{expiresIn:3600},
         (err,token)=>{
            if(err)
            {
                throw err;
            }
            else{
                res.json({token:token})
            }
         }  )
     
      } catch (error) {
          res.status(401).json({
              error:"server error"
          })
      }
  
  })
  
  
   
  







  
  module.exports = router;