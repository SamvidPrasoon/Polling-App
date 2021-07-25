const express =  require('express')
const app = express();
const cors = require('cors');
const connectDB =  require('./config/db')
connectDB();
app.use(express.json({limit: '50mb'}));
app.use(cors());

  const user = require('./routes/user')
  app.use('/api/user',user)
  const auth = require('./routes/auth')
  app.use('/api/auth',auth)
  const poll = require('./routes/poll')
  app.use('/api/poll',poll)


 




const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
  console.log(`server is listening on port ${PORT}`)
})