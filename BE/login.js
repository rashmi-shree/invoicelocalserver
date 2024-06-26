const express = require('express');
const router = express.Router();
'use strict';
const db = require("../db");

router.post('/login',(req,res)=>{
    const reqestData = req.body.params.logindataalter;
    // holds the base64-encoded username
    const username = reqestData.username;
    // holds the base64-encoded password
    const password = reqestData.password;
    // A Buffer object created from the base64-encoded username.
    let buffusername = new  Buffer.from(username, 'base64');
    // The buffusername is then converted to a string in ASCII encoding, effectively decoding the base64-encoded username.
    let decodedusername = buffusername.toString('ascii');
    
    // A Buffer object created from the base64-encoded password.
    let buffpassword = new Buffer.from(password, 'base64');
    // The buffpassword is then converted to a string in ASCII encoding, effectively decoding the base64-encoded password.
    let decodedpassword = buffpassword.toString('ascii');
    var error;
    try{
        if (username.length == 0){
            throw error="Username is missing";
        }
        else if(password.length == 0){
            throw error="Password is missing";
        }
        else {
            db.query(`select username
            from users where username = ? and password = ?`,
            [decodedusername, decodedpassword],
            (err, result)=>{
                if(result.length == 0){
                    // res.status(401).send({message:"Password Incorrect"});
                    res.send({message:"Password Incorrect"});
                }
                else{
                    let string = result[0].username;
                    let buffresult = Buffer.from(string, 'utf8');
                    let base64String = buffresult.toString("base64");
                    res.json(base64String);
                }
            }
            )
        }
    }
    catch(e){
        // res.status(400).send({message:error});
        res.send({message:error});
    }
    // finally{
    //     console.log("query rungs");
    //     // db.query(`select *
    //     // from users where username = ? and password = ?`,
    //     // [username, password],
    //     // (err, result)=>{
    //     //     if(err){
    //     //         console.log(err);
    //     //     }
    //     //     else{
    //     //         if(result.length){
    //     //             res.json(result);
    //     //         }
    //     //         else{
    //     //             res.status(401).send({message:"Password Incorrect"});
    //     //         }
    //     //     }
    //     // }
    //     // )
    // }
    // db.query(`select username from users where username = ?`,
    // [username],
    // (err,userresponse)=>{
    //     if (userresponse.length>0){
    //         db.query(
    //             `select *
    //              from users where username = ? and password = ?`,
    //             [username, password],
    //             (err, result)=>{
    //                 if (err){
    //                     console.log(err);
    //                     // res.json({msg:"password incorrect", code:401})
    //                 }else{
    //                     if(result.length ){
    //                         res.json(result);
    //                     }
    //                     else {
    //                         res.json({msg:"Password Incorrect", code:401})
    //                     }
    //                 }
    //             }
    //         );
    //     }
    //     else if (userresponse.length == 0){
    //         res.json({msg:"Enter Credentials", code:404});
    //     }
    //     else {
    //         res.json({msg:"user is not present", code:404});
    //     }
    // })
 
})

module.exports = router;