const express = require("express");
const app = express();
const ejs = require("ejs");

require("./db/conn");
const blog = require("./db/schemadef");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.port || 4000;

app.get("/", async (req, res) => {
  // blogs collection bata sabai data deeu vaneko
  const allblog = await blog.find();
  // console.log(allblog);

  //Blog vanne key/name ma allblogs/data pass gareko ejs file lai
  res.render("blogs", { blogs: allblog });
});
app.get("/createblog", (req, res) => {
  res.render("createblog");
});
app.get("/Home", (req, res) => {
  res.redirect("/");
});
// Creating Blog

app.post("/createblog", async (req, res) => {
  // console.log(req.body);
  try {
    const registerBlog = new blog({
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
    });
    const registered = await registerBlog.save();
    console.log("Successfully Saved following in Database " + registerBlog);
  } catch (err) {
    console.log(err);
  }
  res.redirect("/");
});

// single blog page ko lagi

app.get("/single/:id", async (req, res) => {
  const id = req.params.id;
  const Blog = await blog.findOne({
    _id: id,
  });

  res.render("singleblog.ejs", { blog: Blog });
});

// Stackoverflow bata copied
// app.get("/single", function(req, res){

//     blog.findById(req.params.id, function(err, foundBlog){
//         if(err){
//             res.redirect("/");
//         } else {
//             res.render("singleblog.ejs", {blog: foundBlog});
//         }
//     });
//  });

// Delete page

app.get("/delete", async (req, res) => {
  const id = req.params.id;
  await blog.deleteOne({ id: id });

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`server is running in port ${port}`);
});
