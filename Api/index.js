const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const User = require("./Models/User")
const Job = require("./Models/Job")
const jwt = require("jsonwebtoken")
const checkToken =  require("./Middleware/token")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.raw());
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test_3', { useNewUrlParser: true })
app.listen(3030,()=>{
    console.log("Cổng 3030")
})
app.post("/register",async (reqs,res)=>{
    console.log(reqs.body)
    const newUser = new User();
    newUser.name = reqs.body.name
    newUser.email = reqs.body.email
    newUser.password = reqs.body.password
    try{
        const User = await newUser.save()
        res.send(User);
    }catch(err){
        res.status(400).send(err);
    }
})
/////
app.post("/login", async (reqs,res)=>{
    // Kiểm tra email
    const userLogin = await User.findOne({email: reqs.body.email});
    if(!userLogin) return res.status(400).send("Không tìm thấy email")
    console.log(userLogin)
     // Kiểm tra password
    const passLogin = await (reqs.body.password == userLogin.password);
    if(!passLogin) return res.status(400).send("Mật khẩu không hợp lệ")
    const token = jwt.sign({_id: userLogin._id}, 'daylatoken')
    // res.header("token", token).send(token);
     res.json(token);
})
app.post("/create",checkToken,async (req,res)=>{
    const newJob = new Job()
    newJob.title = req.body.title
    newJob.content = req.body.content
    newJob.progress = req.body.progress
    newJob.user = req.body.user
    try{
        const Job = await newJob.save()
        res.send(Job)
    }catch(ex){
        res.status(400).send(ex)
    }
})
app.get("/show",async (req,res)=>{
    const jobs = await Job.find()
    return res.json(jobs)
})
app.post('/delete', checkToken, async (req,res)=>{
    console.log(req.body.id)
    if(req.body.id){
        await Job.findByIdAndDelete({_id: req.body.id})
        return res.json({
            mess: "Sussce"
        })
    }
    return res.json({
        mess: "Error"
    })
})
