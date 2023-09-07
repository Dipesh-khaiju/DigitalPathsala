const express =require('express');
const app = express();
const ejs = require('ejs');

require("./db/conn");
const Blog = require("./db/schemadef");

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port = process.env.port || 5000;

app.get("/",(req,res)=>{
    // res.send("k xa vailog");
    res.render("blogs")
 
})
app.get("/createblog",(req,res)=>{
    res.render("createblog");

})

// Creating Blog

app.post("/createblog",async(req,res)=>{
    // console.log(req.body);
    try{
        const registerBlog = new Blog({
            title:req.body.title,
            subtitle:req.body.subtitle,
            description:req.body.description,
        
        })
        const registered =await registerBlog.save();
        console.log("Successfully Saved following in Database "+registerBlog)

    }
    catch(err){
        console.log(err);
    }
    res.redirect("/")
})


app.listen(port,()=>{
    console.log(`server is running in port ${port}`)
})


