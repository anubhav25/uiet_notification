var express = require('express');
var app = express.Router();
var request = require('request');
var fs= require('fs')
var fcm =require('./fcm');
var scrap=require('./scrap');
//console.log(fcm)
function doit(){

scrap(fcm.firebase)
.then((latest)=>{

  	console.log(latest)
  	fcm.sendNotification('UIET',latest.body,JSON.stringify(latest));
  		}
)
.catch(()=>{
	console.log('no change')
	return;
});

}




doit();



app.get('/', function(req, res, next) {
fcm.firebase.database().ref('/allNotifications').on("value", function(snapshot) {
 // console.log(snapshot.val());
res.render('web', { title: 'Notifications',mylist: snapshot.val() });
 
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
  res.end();
});
 //res.sendFile(__dirname+'/allNotifications.txt');
});
app.get('/refresh', function(req, res, next) {

//fs.writeFileSync('./latest.txt',JSON.stringify({"date":"dummydata"}));
doit();
res.send('done');
});

app.get('/all', function(req, res, next) {
fcm.firebase.database().ref('/allNotifications').on("value", function(snapshot) {
 // console.log(snapshot.val());
res.json(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
  res.end();
});

 //res.sendFile(__dirname+'/allNotifications.txt');
});

app.get('/latest', function(req, res, next) {
 fcm.firebase.database().ref('/latest').on("value", function(snapshot) {
 // console.log(snapshot.val());
res.json(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
  res.end();
});

});

app.get('/download',(req,res)=>{
    res.download('./app.apk','uietNotifications.apk')
})

app.get('/change',(req,res)=>{
	fcm.firebase.database().ref('/latest').set({"date":"dummydata"});
	res.end('done');

})

app.get('/keepmeawake',(req,res)=>{
	doit()
    console.log('awaken');
    var fun=()=>{
        var myurl = "https://uietnotification.herokuapp.com/keepmeawake"
  request({
  url: myurl,
  headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'}

},(err,res,body)=>{
	console.log('req sent')
});
};

    setTimeout(fun, 1000*60*24);
res.send('done')
})

module.exports = app;
