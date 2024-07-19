const express = require("express");
const methodOverride = require("method-override");
const app = express();
const path = require("path");
const {v4:uuidv4}=require('uuid');

const port = 3000;
let posts=[
    {   
        id:uuidv4(),
        tittle:"first post",
        img:"https://images.unsplash.com/photo-1721333089368-7ad209fb900a?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
        caption:" hello this is my post"
    }
];
//setting paths
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.set(express.static(path.join(__dirname,"public")));

//for post request
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));
//starting sersver
app.listen(port,()=>{
    console.log("server started");
})

//get request for fetching posts
let follow =0;
app.get("/posts",(req,res)=>{
    // let {username}= req.params;
    res.render("index.ejs",{posts,follow});
})
app.post("/posts",(req,res)=>{
    
    follow++;
    res.render("index.ejs",{posts,follow});
})
app.get("/posts/new",(req,res)=>{
    // let {username}= req.params;
    res.render("add.ejs",{posts,follow});
})
app.post("/posts/new",(req,res)=>{
    let {tittle,img,caption}= req.body;
    let id = uuidv4();
    let obj={id,tittle,img,caption};
    // console.log(obj);
    posts.push(obj);
    res.redirect("/posts");
})
app.get("/posts/:id",(req,res)=>{
    let {id}= req.params;
    let post_=posts.find((p)=> id === p.id); 
    res.render("update.ejs",{post_});
})
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post_new=posts.find((p)=> id === p.id);
    post_new.tittle=req.body.tittle;
    post_new.caption=req.body.caption;
    res.redirect("/posts");
})
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
})