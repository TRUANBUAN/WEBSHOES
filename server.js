// khởi tạo
require('dotenv').config() 
const express = require('express')

const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles : true
}))
//Router
app.use('/user',require('./routes/userRouter'))
app.use('/api',require('./routes/categoryRouter'))
app.use('/api',require('./routes/uploadRouter'))
app.use('/api',require('./routes/productRouter'))
app.use('/api', require('./routes/paymentRouter'))

// kết nối mongoose
const mongoose = require("mongoose");
const { restart } = require('nodemon')
const URI = process.env.MONGODB_URL
mongoose
  .connect(URI,    
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
     
    }
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Connected Failed !\n" + err);
  })
  // app.get('/',(req,res)=>{
  //   res.json({msg:"hello backend"})
  // })
  const PORT = process.env.PORT ||4000
  app.listen(PORT,()=>{
    console.log('server is running on port',PORT)
  })

