const express = require('express')
const cryptoJS = require('crypto-js');
const AES = require('crypto-js/aes')
const fs = require('fs');
const formidable = require('formidable')

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.html')
})

const pass = 'password.json';
var encr;
var buff;


router.post('/encrypt', function(req, res) {
    new formidable.IncomingForm().parse(req)
    .on('file', (name, file) => {
        var fileObj = fs.readFileSync(file.path)
        var base64obj = fileObj.toString('base64')
        var middle = Math.floor(base64obj.length / 2);
        var s1 = base64obj.substr(0, middle);
        var s2 = base64obj.substr(middle + 1);
        async function encrypt() {
            encr1 = AES.encrypt(s1, pass).toString();
            encr2 = AES.encrypt(s2, pass).toString();
            encr = await encr1 + encr2;
        }
        encrypt().then( () => {
            console.log('POST /encrypt server: ' + encr.length)
            res.send('passed')
        })
    })
})

router.get('/getEncrypt', (req, res) => {
    res.send(encr)
})

router.post('/decrypt', (req, res) => {
    new formidable.IncomingForm().parse(req)
    .on('file', (name, file) => {
        var fileObj = fs.readFileSync(file.path)
        var str = fileObj.toString();
        var middle = Math.floor(str / 2);
        var s1 = str.substr(0, middle);
        var s2 = str.substr(middle + 1);
        var basetxt
        async function decrypt() {
            var dec1 = AES.decrypt(s1.toString(), pass);
            var dec2 = AES.decrypt(s2.toString(), pass);
            basetxt = dec1.toString(cryptoJS.enc.Utf8) + dec2.toString(cryptoJS.enc.Utf8)
        }
        decrypt().then( () => {
            buff = new Buffer.from(basetxt, 'base64')
            console.log('POST /encrypt server: ' + buff.toString().length)
            res.send('passed')
        })
    })
})

router.get('/getDecrypt', (req, res) => {
    res.send(buff)
})


module.exports = router;