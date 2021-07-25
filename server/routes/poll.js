const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const Poll = require('../models/poll');



// get all polls
router.get('/', auth, async (req, res) => {
  try {
    const polls = await Poll.find().populate('user',['id','email','name']);
    if (!polls) {
      return res.status(400).json({
        msg: 'no poll found',
      });
    }
    res.json(polls);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: 'server error',
    });
  }
});


// post polls
router.post('/', auth, async (req, res) => {
  const { options, question } = req.body;
  const user = await User.findById(req.user.id).select('-password');
  let poll = {};
  poll.user = req.user.id
  poll.question = question;
  poll.options = options.map((option) => ({
    option: option,
    votes: 0,
  }));
  try {
    poll = new Poll(poll);
    user.polls.push(poll._id)
    await user.save()
    
    await poll.save();
    res.json(poll);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: 'server error',
    });
  }
});

// get poll by user id
router.get('/user/:userid',auth,async(req,res)=>{
    try {
        const poll = await Poll.find({user:req.params.userid})
        res.json(poll)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            msg: 'server error'
        })
    }
})

// get poll by poll id
router.get('/:id',auth,async(req,res)=>{
    try {
        const poll = await Poll.findById(req.params.id).populate('user',['id','email','name'])
        if(!poll){
            return res.status(400).json({
                msg: 'no poll found',
              });
        }
        res.json(poll)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            msg: 'server error'
        })
    }
})

// delete poll 

router.delete('/:id',auth,async(req,res)=>{
    try {
        const poll = await Poll.findById(req.params.id)
        if(!poll){
            return res.status(400).json({
                msg: 'no poll found',
              });
        }
        console.log(req.user.id)
        console.log(poll.user)
        if(poll.user.toString()!==req.user.id){
            return res.status(400).json({
                msg: 'unauthorized user',
              });
        }
        await poll.remove()
        res.status(200).json({
            msg:"poll deleted"
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            msg: 'server error'
        })
    }
})


// vote

router.put('/vote/:id',auth,async(req,res)=>{

     const {answer} = req.body
     
 


    try {
        const poll = await Poll.findById(req.params.id)
        if(!answer){
            return res.status(400).json({
                msg:"answer not found"
            })
        }
            if(!poll){
                return res.status(400).json({
                    msg:"poll not found"
                })
            }




            if(poll.voted.length!==0){
                const alreadyvoted = poll.voted.find(
                    (r) => r.toString() === req.user.id.toString()
                  )
                if(alreadyvoted)
                {
                    return res.status(400).json({msg:"Already Voted"})
                }
            }
          




        poll.options.map((option)=>{
            
            if(option.option===answer){
             
                 poll.voted.push(req.user.id)
                 option.votes = option.votes+1
               
            }
          
            
        })

        await poll.save()
        res.json(poll)









    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            msg: 'server error'
        })
    }
})







module.exports = router;
