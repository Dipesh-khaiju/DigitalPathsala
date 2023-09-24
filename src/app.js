const express =require('express');
const app = express();
const ejs = require('ejs');
const path =require('path');

require("./db/conn");
const blog = require("./db/schemadef");

//For external css,js etc
app.use(express.static(path.join(__dirname,"../public/")));

// for using partials
// <%-include('partials/filenmae')%>



app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port = process.env.port || 5000;

app.get("/",async(req,res)=>{
    // blogs collection bata sabai data deeu vaneko
    const allblog= await blog.find();
    // console.log(allblog);

    //Blog vanne key/name ma allblogs/data pass gareko ejs file lai
    res.render("blogs",{blogs:allblog});
  
})

app.get("/Home",(req,res)=>{
    res.redirect("/")
})

app.get("/createblog",(req,res)=>{
    res.render("createblog");

})

// Creating Blog

app.post("/createblog",async(req,res)=>{
    // console.log(req.body);
    try{
        const registerBlog = new blog({
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

// single blog page show garna ko lagix

app.get("/single/:id",async(req,res)=>{
    const id = req.params.id
    const Blog =  await blog.findOne({
     _id:id
})
    
    res.render("singleblog.ejs",{blog:Blog});
});

// page update garna lai

app.get("/updateBlog/:id",async(req,res)=>{
    const id = req.params.id;
    const editBlog = await blog.findOne({_id:id})
 
    res.render("editBlog",{blog:editBlog});
});

app.post("/editBlog/:id",async(req,res)=>{
        const {id}=req.params;
        const data = await blog.findOne({_id:id});
        if(!data){
            throw new error("BLog not found")
        }

        const blogData = await blog.findOneAndUpdate({_id:id},req.body,{new:true});
        // res.render("singleblog.ejs",{blog:blogData});


    //error aayo esma
    // const title = req.body.title;
    // const subtitle = req.body.subtitle;
    // const description = req.body.description;
    // await blog.updateOne({
    // title:title,
    // subtitle:subtitle,
    // description:description
    // },{_id:id})

    res.redirect("/single/" + id)

})

// Delete page

app.get("/delete/:id",async(req,res)=>{
    const id = req.params.id;
    await blog.deleteOne({_id:id})

   res.redirect("/")
})

app.listen(port,()=>{
    console.log(`server is running in port ${port}`)
})


