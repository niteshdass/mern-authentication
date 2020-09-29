const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser= require('cookie-parser')
const mongoose = require('mongoose')

//import router

const blogRouter = require('./routes/blogRoutes')
const userRouter = require('./routes/auth')
const adminuserRouter = require('./routes/user')
//end import router
require('dotenv').config()
const PORT = process.env.PORT
const app = express();

//database

mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }).then( (data,error) =>{
          if(error){
                console.log("Have a some error",error)
          }else{
                console.log('Database connected')
          }
    })


//end database



//middleware
      app.use(morgan('dev'))
      app.use(bodyParser.json())
      app.use(cookieParser())


      if(process.env.NODE_ENV === 'devlopment'){
            app.use(cors({origin:`${process.env.CLIENT_URL}`}))
      }
      


//end middleware


//router middleware
app.use('/api',blogRouter)
app.use('/api',userRouter)
app.use('/api',adminuserRouter)
//end router middleware 


//route port

      app.listen(PORT, ()=>{
            console.log(`server stared on port ${PORT}`)
      })

//route listen