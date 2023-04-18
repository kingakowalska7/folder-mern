require('dotenv').config()



const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

const cors = require('cors')

const app = express()


app.use(express.json())
app.use(cors())

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

// app.get('/', (req, res) => {
//     res.json({message: "Welcome to the app"})
// })
app.use('/api/workouts', workoutRoutes)


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Połączono z MongoDB - na porcie", process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
})


// app.listen(process.env.PORT, () => {
//     console.log("listening on port", process.env.PORT)
// })