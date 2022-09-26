const express = require('express');
const express = require('express');
const morgan = require('morgan');

const blogRoutes = require('./routes/blogRoute');

const mongoose = require('mongoose');

const app= express();

const port = process.env.PORT || 5000;

const dbURI = 'mongodb+srv://binayak:pMMvfn1RdGMkttQC@blogapp.abvuqks.mongodb.net/blog_app?retryWrites=true&w=majority'

mongoose.connect(dbURI)
.then((result)=>{ 
    app.listen(port)
    console.log("connected to DB")
})
.catch((err)=>{
    console.log(err.message);
})

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))



app.get('/',(req,res)=>{
    res.redirect('/blogs');
})
//blog routes
app.use(blogRoutes);

app.get('/about',(req,res)=>{
    res.render('about', {title: "about"});
})



app.use((req,res)=>{
    res.render('404', {title: "error"});
})