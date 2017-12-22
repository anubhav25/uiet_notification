var express = require('express');
var app = express.Router();
var request = require('request');
var fs= require('fs')
var scrap=require('./scrap');

function doit(){
var fcm =require('./fcm');
scrap()
.then(()=>{
	try{

	var data=fs.readFileSync('./latest.txt','utf-8')
  	obj=JSON.parse(data);
  	console.log(data)
  	fcm('UIET',obj.body,data);
  		}
  		catch(e){
  			return;
  		}
})
.catch(()=>{
	console.log('no change')
	return;
});

}

doit();


app.get('/', function(req, res, next) {
var arr = JSON.parse(fs.readFileSync('./allNotifications.txt'));
res.render('web', { title: 'Express',mylist:arr });
 //res.sendFile(__dirname+'/allNotifications.txt');
});
app.get('/refresh', function(req, res, next) {
doit()
res.send('done');
});
app.get('/all', function(req, res, next) {
res.json(JSON.parse(fs.readFileSync('./allNotifications.txt')));
 //res.sendFile(__dirname+'/allNotifications.txt');
});

app.get('/latest', function(req, res, next) {
res.json(JSON.parse(fs.readFileSync('./latest.txt')));
 //res.sendFile(__dirname+'/allNotifications.txt');
});

app.get('keepmeawake',(req,res)=>{
    console.log(awaken);
    setInterval(()=>{
        var myurl = "http://resultuiet.herokuapp.com/keepmeawake"
  request({
  url: myurl,
  headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'}

},(err,res,body)=>{
});
}, 1000*60*60*4);

})

module.exports = app;
