const dbConnection = require('../db/dbConfig');
const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes');
const jwt = require("jsonwebtoken");

async function register (req, res){
 const {username, firstname, lastname, email, password} = req.body
 if (!username || !firstname || !lastname || !email || !password){
    return res.status(StatusCodes.BAD_REQUEST).json({msg: "please provide the required information"});
 }
  
 try{
    const [customers] = await dbConnection.promise().query("select username,customerid from customers where username=? or email=? ", [username, email])
    if (customers.length > 0){
      return res.status(StatusCodes.BAD_REQUEST).json({msg: "user already exists"})
    }
   if(password.length < 8){
    return res.status(StatusCodes.BAD_REQUEST).json({msg: "password must be atleast 8 character"})
   }
   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(password, salt)
    await dbConnection.promise().query("INSERT INTO customers (username, firstname, lastname, email, password) VALUES (?,?,?,?,?) ", [username, firstname, lastname, email, hashedPassword])
    return res.status(StatusCodes.CREATED).json({msg: "user registerd"})
 }catch (error){
    console.log(error.message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "server error"})
 }
}
async function login (req, res){
const {email, password} = req.body;
if (!email || !password){
   return res.status(StatusCodes.BAD_REQUEST).json({ msg: "please enter all required field"})
}
try {
   const [customer] = await dbConnection.promise().query("select username, customerid, password from customers where email = ?", [email])
   if(customer.length==0){
      return res.status(StatusCodes.BAD_REQUEST).json({msg: "invalid credential"});
   }
  const isMatch =  await bcrypt.compare(password, customer[0].password);
  if(!isMatch){
    return res.status(StatusCodes.BAD_REQUEST).json({msg: "invalid credential"});
  }
  const username = customer[0].username
  const customerid = customer[0].customerid
  const token = jwt.sign({username, customerid},process.env.JWT_SECRET, {"expiresIn" : "3d"})
  return res.status(StatusCodes.OK).json({msg: "login successfully", token})

} catch (error) {
   console.log(error.message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "server error"})
 
}
}
async function check (req, res){
   const username = req.customer.username;
   const customerid = req.customer.customerid;
    return res.status(StatusCodes.OK).json({msg: "uservalid",username, customerid});
}
module.exports = {register, login, check}