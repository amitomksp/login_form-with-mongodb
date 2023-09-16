const express = require('express')
require('./db/conn.js');
const Student = require('./models/students.js');

const app = express()
const port = process.env.PORT || 3000


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("view engine", "ejs");
app.use(express.static("public"));


//create new students
app.get('/',(req,res)=>{
  res.render('./index');
})


app.get('/signup',(req,res)=>{
  res.render('./signup')
})


app.post('/CompleteSignUP',async(req,res)=>{
 
  try{
    const password=req.body.password;
    const cpassword=req.body.confirmpassword; 

    if(password === cpassword){

      const registerstudent = new Student({
        firstname : req.body.firstname,
        lastname:req.body.lastname,
        emailid : req.body.emailid,
        phonenumber : req.body.phonenumber,
        password : req.body.password,
        confirmpassword : req.body.confirmpassword,
        gender : req.body.gender
      })
      const registered = await registerstudent.save();
      res.status(201).render("./successful");
    }
    else{
      res.send("Password are not matching");
    }
  }
  catch(error){
    res.status(400).send(error);
  }
});

app.post('/login',  (req, res) => {
  try {
    const emailid = req.body.emailid;
    const password = req.body.password;
    const useremail = Student.findOne({emailid });
  
    console.log(useremail);
    if ( useremail &&  useremail.password === password) {
      res.redirect('/login');
    } else { 
      res.status(400).send('Invalid email or password');
    }
  } catch (e) {
    console.log(e)
    res.status(400).send('Invalid email or password');
  }
});

app.get('/login',(req,res)=>{
  res.render('./login')
})

    
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})