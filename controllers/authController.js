const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
const conexion=require('../database/db')
const {promisify}=require('util')
//comunicacion asincrona

//procedimiento para registrarse

exports.register=async(req,res)=>{
    try {
        const name=req.body.name
    const user=req.body.user
    const pass=req.body.pass
    let passHash=await bcryptjs.hash(pass, 8)

        conexion.query('INSERT INTO usuarios SET ?',{user:user,name:name,pass:passHash},(error,results)=>{
            if(error){console.log(error)}
            res.redirect('login')
        })
        
    } catch (error) {
        console.log(error)
    }
    
}

exports.login=async (req,res)=>{
    try {
        const user=req.body.user
        const pass=req.body.pass
        if (!user || !pass) {
            res.render('login',{
               
            })
        }else{
            conexion.query('SELECT * FROM usuarios WHERE user = ?',[user],async(error,results)=>{
                if (resuls.lenght==0|| !(await bcrypstjs.compare(pass, results[0].passHash))) {
                    res.render('login',{
            
                     })
                } else{
                    //inicio de sesion bien
                    const id=results[0].id
                    const token = jwt.sign({id: id}, process.env.JWT_SECRET,{
                        expiresIn: process.env.JWT_TIEMPOEX
                        
                    })
                    const cookieconfig={
                        expires: new Date(Date.now()+process.env.JWT_COOKIEEX *24*60*60*1000),
                        httpOnly:true
                    }
                    res.cookie('jwt',token,cookieconfig)
                    res.render('login',{
                
                     })

                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}