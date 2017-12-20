var express = require('express');
var app = express.Router();
var cheerio = require('cheerio');
var request = require('request');
var fs= require('fs')

function doit(){
var fcm =require('./fcm')
const exec = require('child_process').exec;
console.log('now');
const pyProg = exec('python routes/a.py');
  	pyProg.stdout.on('data', function(data) {
  		if(data!=='done\r\n'){
  			obj=JSON.parse(data);
  			fcm('UIET',obj.body,data);
  		}
        console.log(data)

    });
    pyProg.stderr.on('data', (data) => {

        console.log(data)

    });
}

doit();


app.get('/', function(req, res, next) {
var arr = JSON.parse(fs.readFileSync(__dirname+'/allNotifications.txt'));
res.render('web', { title: 'Express',mylist:arr });
 //res.sendFile(__dirname+'/allNotifications.txt');
});
app.get('/refresh', function(req, res, next) {
doit()
res.send('done');
});

app.get('/all', function(req, res, next) {
res.json(JSON.parse(fs.readFileSync(__dirname+'/allNotifications.txt')));
 //res.sendFile(__dirname+'/allNotifications.txt');
});

app.get('/latest', function(req, res, next) {
res.json(JSON.parse(fs.readFileSync('./latest.txt')));
 //res.sendFile(__dirname+'/allNotifications.txt');
});





module.exports = app;
