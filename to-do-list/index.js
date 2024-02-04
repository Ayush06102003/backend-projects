import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb://127.0.0.1:27017/todoListDB");

console.log("You are successfully connected");

const itemsSchema = {
    name : String,
};

const Item = mongoose.model("Item", itemsSchema);
app.get("/",(req,res)=>{
    
Item.find()
    .then(doc => {
        res.render("index.ejs",{Day : day , newListitems : doc});
    })
    .catch(err => {
        console.log(err);
    });
    let options = {weekday: 'long', year:'numeric', month:'long', day:'numeric' };
    let today = new Date();
    let day = today.toLocaleDateString("en-US", options);
    
});

app.post("/",(req,res)=>{
 const itemName = req.body.Item;
  const item = new Item ({
    name : itemName,
  });
  item.save(); 
    res.redirect("/");
});

app.post("/delete", (req,res)=>{
  const Id = req.body.checkbox;
 console.log(Id);
 Item.deleteOne({_id : Id})
    .then(doc => {
        console.log("Item deleted successfuly");
    })
    .catch(err => {
        console.log(err);
    });
  res.redirect("/");
});



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});