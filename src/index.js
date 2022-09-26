const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const port = process.env.PORT || 3000;

const staticpath = path.join(__dirname,"../public");
app.use(express.static(staticpath));
const templatepath = path.join(__dirname, "../template/views");
const partialspath = path.join(__dirname, '../template/partials');

app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialspath);

app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/about",(req,res)=>{
    res.render("about");
});

app.get("/weather",(req,res)=>{
    res.render("weather");
});

app.get("*",(req,res)=>{
    res.render("error");
});

app.listen(port,()=>{
    console.log(`${port} is listening`);
});