require('dotenv').config()
const express = require('express')
const app = express()
const {PORT, SESSION_SECRET} = process.env
const session = require('express-session')
const checkForSession = require("./middlewares/checkForSession")
const swagCtrl = require('./controllers/swagController')
const authCtrl = require('./controllers/authController')
const cartCtrl = require("./controllers/cartController")


app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(checkForSession.check4Session)

app.post(`/api/register`, authCtrl.register)
app.post(`/api/login`, authCtrl.login)
app.post(`/api/signout`, authCtrl.signout)
app.get(`/api/user`, authCtrl.getUser)

app.get(`/api/swag`, swagCtrl.read)

app.post(`/api/cart/checkout`, cartCtrl.checkout)
app.post(`/api/cart/:id`, cartCtrl.add)
app.delete(`/api/cart/:id`, cartCtrl.delete)

app.listen(PORT, ()=> console.log(`it's port ${PORT} bitch`))