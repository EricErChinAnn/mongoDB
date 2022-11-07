const express = require("express");
const hbs = require("hbs");

let app = express();

app.set("view engine","hbs");

app.listen(3000,()=>{
    console.log("Server is Live");
});

app.get("/",(req,res)=>{
    res.render("showAll");
})