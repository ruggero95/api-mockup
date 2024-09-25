const express = require('express')
const app = express()
const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config()

const dir = fs.readdirSync('./data') 
const public = fs.readdirSync('./public') 

const virtualEnv = {
    PORT: process.env.PORT
}

dir.forEach((d)=>{
    const parts = d.split('.')       
    const route = "/"+parts.slice(1, (parts.length-1)).join('/')
    const method = parts[0]   
    app[method](route,(req, res)=>{
        return res.json(JSON.parse(fs.readFileSync(`./data/${d}`)))
    })   
})

public.forEach((p)=>{
    const route = ("/"+p).replace(/\s/g,"-")
    console.log(route)
    app.get(route,(req, res)=>{
        return res.sendFile(`${__dirname}/public/${p}`)
    })   
})


app.listen(virtualEnv.PORT, ()=>{
    console.log(`listening on ${virtualEnv.PORT}`)
})

