const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()



app.use(bodyParser.urlencoded({extend:false}))
app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.sendFile(__dirname +'/index.html')
})

app.post('/subcribe', ( req, res)=>{
    if(
        req.body.captcha == undefined ||
        req.body.captcha == '' ||
        req.body.captcha == null
    ){
        return res.json({"succes":false, "msg":"Please select captcha"})
    }
    const secretkey = process.env.SECRETKEY || '6LcHL5UjAAAAAMV1Z4jKlKH8Lee-gxjuFcJYZwXY'


const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretkey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`


request(verifyUrl, (err, resp, body)=>{
    body = JSON.parse(body)

    if(body.success !== undefined && !body.success){
        return resp.json({"success":false, "msg":"failed captach verification"})
    }
    return resp.json({"success":true, "msg":"captach pass"})

})
})


 app.listen(3000,()=>{
    console.log('server started');
 })