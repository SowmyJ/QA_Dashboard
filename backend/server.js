const express=require('express')
const path = require('path')
const app =express()
const port=3000
const fs = require('fs').promises
const directory = path.join(__dirname,'uploads','Insight')
app.use(express.static(directory));
app.get('/file/:filename',async(req,res)=>{
    const filename=req.params.filename
    const filepath= path.join(directory,filename);
    try{
        const file = await fs.readFile(filepath);
        res.send(file)
    }catch(error){
        console.error(error)
        res.status(500).send('Internal server error')
    }
})
app.listen(port,()=>{
    console.log('sexy');
})