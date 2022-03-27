import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import fetch, { Headers } from 'node-fetch';
import https from 'https'
import axios from 'axios'
import { rmSync } from "fs";
// import cors from 'cors'

var app=express()
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}));
app.use(bodyParser.json())
app.use(cors())
var PROCESS=dotenv.config()

mongoose.connect(process.env.MONGO);
var db=mongoose.connection;


db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

const adminSchema=new mongoose.Schema({
    hospitalname:String,
    hospcode:String,
    place:String,
    hierarchy:String,
    username:String,
    password:String
})

const doctorSchema=new mongoose.Schema({
    docname:String,
    age:Number,
    gender:String,
    qualification:String,
    specialisation:String,
    department:String,
    hospitalname:String,
    hospcode:String,
    place:String,
    hierarchy:String,
    username:String,
    password:String,
    patients:[],
    referrals:[]
})

const patientSchema=new mongoose.Schema({
    pname:String,
    gender:String,
    phnumber:String,
    age:Number,
    place:String,
    deptname:String,
    pcode:String,
    prescription:[]
})

const admin=new mongoose.model("Admin",adminSchema)
const patient=new mongoose.model("Patient",patientSchema)
const doctor=new mongoose.model("Doctor",doctorSchema)

//--------------------NEW ADMIN (SPECIFICALLY NEW HOSPITAL) SIGNUP--------------------------------------------------
app.post("/AdminSignup",(req,res)=>{
    const {hospitalname,hospcode,place,hierarchy,username,password}=req.body;
    console.log(req.body);
    const admin1=new admin({hospitalname,hospcode,place,hierarchy,username,password})
    admin.findOne({hospcode:hospcode},(err,user)=>{
        if(user){
            res.send({error1:"USER ALREADY EXIST"})
        }
        else{
            admin1.save((erro)=>{
                if(erro)
                {
                    console.log(erro)
                    res.send({error2:"FAILED TO ADD ADMIN"})
                }
                else{
                    res.send({success:"ADMIN ADDED SUCCESSFULLY"})
                    console.log("ADMIN ADDED SUCCESSFULLY")
                }
            })
        }
    })
})

//---------------------------ADMIN LOGIN-------------------------------------------------------

app.get("/AdminLogin/:uname/:pword",(req,res)=>{
    const username=req.params.uname;
    const password=req.params.pword;
    admin.findOne({username:username},(err,user)=>{
        if(err){
            console.log(err)
            res.send({error1:"USER NOT FOUND"})
        }
        if(user){
            console.log(password)
            console.log(user.password)
            if(user.password==password){
                res.send({success:user})
            }
            else{
                console.log("INVALID CREDENTIALS")
                res.send({error2:"INVALID CREDENTIALS"})
            }
        }
        else{
            console.log("sdkUSER NOT EXIST")
            res.send({error1:"USER NOT FOUND"})
        }
    })
})

//----------------------------NEW DOCTOR ADDING (DONE ONLY BY ADMIN OF HOSPITAL)--------------------------------
app.post("/DocAdd",(req,res)=>{
    const {docname,age,gender,phnumber,qualification,specialisation,hospitalname,hospcode,place,hierarchy,username,password}=req.body;
    const Doctor=new doctor({docname,age,gender,phnumber,qualification,specialisation,hospitalname,hospcode,place,hierarchy,username,password});

    doctor.findOne({username:username},(err,user)=>{
        if(user){
            console.log(user)
            console.log("DOCTOR ALREADY EXIST WITH  THAT USERNAME")
            res.send({error1:"DOCTOR ALREADY EXIST WITH  THAT USERNAME"})
        }
        else{
            Doctor.save((err)=>{
                if(err){
                    res.send({error2:"FAILED TO ADD DOCTOR"})
                    console.log("FAILED TO ADD DOCTOR")
                }
                else{
                    console.log("DOCTOR ADDED SUCCESSFULLY")
                    res.send({success:"DOCTOR ADDEDD SUCCESSFULLY"})
                }
            })
        }
    })
    // Doctor.save((err)=>{
    //     if(err){
    //         console.log("FAILED TO ADD DOCTOR")
    //     }
    //     else{
    //         console.log("DOCTOR ADDED SUCCESSFULLY")
    //         res.send({success:"DOCTOR ADDEDD SUCCESSFULLY"})
    //     }
    // })
})

//-----------------------------DOCTOR LOGIN----------------------------------------------------------------
app.get("/DoctorLogin/:uname/:pword",(req,res)=>{
    const username=req.params.uname;
    const password=req.params.pword;
    doctor.findOne({username:username},(err,doctor)=>{
        if(err){
            console.log(err)
            console.log("USER NOT FOUND")
            res.send({error1:"USER NOT FOUND"})
        }
        if(doctor){
            console.log(doctor)
            if(doctor.password==password){
                res.send({success:doctor})
                console.log("DOCTOR LOGGED IN")
            }
            else{
                console.log("PASSWORD IS INCORRECT")
                res.send({incorrect:"PASSWORD IS INCORRECT"})
            }
        }
        else{
            res.send({error1:"USER NOT FOUND"})
        }
    })
})

//--------------------ADDING NEW PATIENT BY ADMINS ONLY ----------------------------------------------------
app.post("/PatientAdd",(req,res)=>{
    // var pcode=Math.random().toString(36).substr(2,5);
    // console.log(pcode)
    
    const {pname,gender,phnumber,age,place,deptname,pcode}=req.body;
    
    
    const patient1=new patient({pname,gender,phnumber,age,place,deptname,pcode})
    console.log(patient1)

    
    doctor.findOne({username:deptname},(err,doc)=>{
        const g=pname+"_"+pcode
        console.log("g",g)
        if(err){
            res.send({error2:"FAILED"})
        }
        if(doc){
            doctor.findOneAndUpdate({username:deptname},{$push:{patients:g}})
            .then(
                patient1.save((err)=>{
                        if(err){
                                console.log(err)   
                                console.log("FAILED TO ADD PATIENT")     
                                res.send({error1:"FAILED TO ADD PATIENT"})      
                        }else{            
                            res.send({success:"PATIENT ADDED"})
                            console.log("patient added")
                        }
                    })
                    )
                }
        else{
            res.send({error3:"NO DOCTOR WITH THE GIVEN ID"})
            console.log("NO DOCTOR WITH THE GIVEN ID")
        }
    })
})

// app.get("")

//--------------DOCTORS ADDING PRESCRIPTION OF PATIENT -----------------------------------------------------
app.post("/AddPrescription",(req,res)=>{
    const {pcode , prescription}=req.body;
    console.log(pcode)
    console.log(prescription)
    patient.findOneAndUpdate({pcode:pcode.slice(-12)},{$push:{prescription:prescription}})
    .then(
        patient.findOne({pcode:pcode},(err,user)=>{
            if(user){
                res.send({user:user})
                console.log(user)
            }
            if(err){
                console.log(err)
                res.send({error1:"UNABLE TO ADD PRESCRIPTION"})
                console.log("UNABLE TO ADD PRESCRIPTION")
            }
        })
    )
})

//----------RETURNS PATIENT DETAILS IF PATIENT-CODE IS GIVEN------------------------------------------------
app.get("/FindPatient/:id",(req,res)=>{
        const pcode=req.params.id;
        console.log(pcode)
        patient.findOne({pcode:pcode},(err,user)=>{
            if(user){
                console.log(user)
                res.send({user:user})
            }
            if(err){
                console.log(err)
                console.log("USER NOT EXIST")
                res.send({error1:"USER NOT EXIST"});
            }
        })
})

 //------------IF ONE DOCTOR-REFERS ANOTHER DOCTOR -------------------------------------------------------
app.post("/AddReferrals",(req,res)=>{
    const {pcode,docusername}=req.body;
    console.log(docusername)
    console.log(pcode)
    doctor.findOne({username:docusername},(err,doc)=>{
        if(err){
            console.log(err)
        }
        if(doc){
            doctor.findOneAndUpdate({username:docusername},{$push:{referrals:pcode}})
            .then(
                res.send({success:"PRESCRIPTION ADDED"})     
            )   
            .catch(()=>{
                console.log("FAILED TO ADD")
                res.send({error1:"FAILED TO ADD"})
            }
            )   
            console.log(doc)
        }
        else{
            console.log("NOT FOUND")
            res.send({error2:"DOCTOR ID NOT FOUND"})
        }
    })
   
})

app.post("/RemPat",(req,res)=>{
    const {pcode,docusername}=req.body;
    console.log(docusername)
    console.log(pcode)
    doctor.findOneAndUpdate({username:docusername},{$pull:{patients:pcode}})
    .then(()=>{
        res.send({success:"PATIENT REMOVED FROM LIST"})
        console.log("PATIENT REMOVED")
    }
    )
    .catch((e)=>{
        console.log(e)
        res.send({error1:"FAILED TO DELETE"})
    })
})

app.post("/RemRefPat",(req,res)=>{
    const {pcode,docusername}=req.body;
    console.log(docusername)
    console.log(pcode)
    doctor.findOneAndUpdate({username:docusername},{$pull:{referrals:pcode}})
    .then(()=>{
        res.send({success:"PATIENT REMOVED FROM LIST"})
        console.log("PATIENT REMOVED")
    }
    )
    .catch((e)=>{
        console.log(e)
        res.send({error1:"FAILED TO DELETE"})
    })
})

//------------------------GETTING LIST OF ALL PATIENTS-----------------------------------------------
// app.get("/GetPatientList",(req,res)=>{
//     patient.find({},(err,users)=>{
//         if(err){
//             console.log(err)
//         }
//     })
// })

//------------------GETTING LIST OF ALL DOCTORS -------------------------------------------------------

app.get("/GetDocList",(req,res)=>{
    doctor.find({},(err,users)=>{
        if(err){
            console.log(err)
            console.log("FAILED TO FETCH DOCTOR LIST")
            res.send("FAILED TO FETCH DOCTOR LIST")
        }
        if(users){
            console.log(users)
            res.send({doctors:users})
        }
    })
})

app.get("/DocInfo/:id",(req,res)=>{
    const docusername=req.params.id;
    console.log("in docinfo",docusername)
    doctor.findOne({username:docusername},(err,doc)=>{
        if(err){
            console.log(err)
        }
        if(doc){
            res.send({doct:doc})
        }
    })
})
// doctor.findOneAndUpdate({username:"DARSHAN"},{$pull:{patients:"DARSHAN V_c97mf"}})
//     .then(()=>{
//         // res.send({success:"PATIENT REMOVED FROM LIST"})
//         console.log("PATIENT REMOVED")
//     }
//     )
//     .catch((e)=>{
//         console.log(e)
//         // res.send({error1:"FAILED TO DELETE"})
//     })

// axios({
//     method:"get",
//     url:"http://192.168.53.146:6001/",
//     data:{s:["blister","itching","red_sore_around_nose"]}
// })
// .then((res)=>{
//     console.log(res.data)
// })
// .catch((err)=>{
//     console.log(err)
// })

app.post("/Model1",(req,Res)=>{
    const u=req.body
    console.log(u)
    // const h=new Object({s:u})
    // console.log(h)
    var f=""
    axios({
        method:"get",
        url:"http://192.168.114.146:6001/",
        data:u
    })
    .then((res)=>{
        console.log(res.data)

        const list=new Object({"Common Cold":"Wikoryl -3 , Levocitrizine-5mg , mox-500mg-3 ","Impetigo":"Sporidex,amoxyclav", "Gastroenteritis":"omez-40mg,Loparep-3,Norflox with Ornidlzola","Hypertension":"atenolol,telmisartan","Hypoglycemia":"IV fluids","Psoriasis":"acitretin,trexall"})
        for(let i=0;i<Object.keys(list).length;i++)
        {
            if(res.data==Object.keys(list)[i])
            {
                console.log(list[res.data])
                f=list[res.data]
                break
            }
            else{
                console.log("no medi")
            }
        }
        console.log("dfv d",f)
        Res.send({m1:res.data,m2:f})
    })
    .catch((err)=>{
        console.log(err)
    })

})

app.listen(3030,() =>{
    console.log('server file is running')
});



