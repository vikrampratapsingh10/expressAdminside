import express from "express";
import session from "express-session";
import { fileURLToPath } from "url";
import path from "path";

import bodyParser from "body-parser";


// import pool from './db/dbConfig.js';

import indexRouter from "./routes/index.route.js";

import AdminRouter from './routes/admin.route.js';

import categoryRouter from './routes/category.route.js';

import ProductRouter from './routes/product.route.js';

const app = express();

app.set("view engine","ejs");

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname,"public")));

app.use(session({secret: "xfdlfdrereorvcnvcxnvrerioerovcnmv", resave: true, saveUninitialized: true}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/",indexRouter);

app.use("/admin",AdminRouter);

app.use("/category",categoryRouter);

app.use("/product",ProductRouter);

// app.get("/",(req,res,next)=>{
//     return res.render('index.ejs');
// });

// app.get("/dashboard", (req,res,next)=>{
//     return res.render("dashboard.ejs");
// })

// app.post("/signin",(req,res,next)=>{
//     // console.log(req.body);
//     let email = req.body.email;
//     let password = req.body.password;
//     pool.getConnection((err,con)=>{
//         if(!err){
//             let sql = "select * from admin where email=? and password=?"; 
//             con.query(sql,[email, password],(err,result)=>{
//                 if(err)
//                   console.log(err);
//                 else{
//                     // console.log("Success.....");
//                     // console.log(result);
//                     if(result.length!=0)
//                        return res.redirect("/dashboard");
//                     else
//                       console.log(err);   
//                 }
//                 con.release(); 
//             });
//         }
//         else
//           console.log(err);
//     });
// });

app.listen(8080,()=>{
    console.log("Server Started...");
});