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
  	fcm(devicecs,'UIET',obj.body,data);
  		}
  		catch(e){
  			console.log(e)
  			return;
  		}
})
.catch(()=>{
	console.log('no change')
	return;
});

}


var devicecs;
try{
	devicecs=JSON.parse(fs.readFileSync('./devices.txt','utf-8'));
}
catch(e){
	devicecs=[[]]
}





doit();
app.post('/addNewToken',(req,res)=>{

	console.log(req.body);
	var newKey=req.body.token;
	console.log('new Device '+newKey);
	for(var i=0;i<devicecs.length;i++){
		for ( var j=0;j<devicecs[i].length;j++){
			if(devicecs[i][j]===newKey){
				break;
			}
		}
	}
	if(i===devicecs.length){
		if(devicecs[devicecs.length-1].length >= 99){
			var a = []
			a.push(newKey);
			devicecs.push(newKey);
		}
		else{
			devicecs[devicecs.length-1].push(newKey);
		}
		fs.writeFileSync('./devices.txt', JSON.stringify(devicecs));
	}
	res.end()
});
app.get('/count',(req,res)=>{
	var c=0;
	for (var i in devicecs){
		c+=devicecs[i].length;
	}
	res.send(c);
})
app.get('/listDevices',(req,res)=>{
	res.json(devicecs);
})
app.get('/', function(req, res, next) {
var arr = JSON.parse(fs.readFileSync('./allNotifications.txt'));
res.render('web', { title: 'Notifications',mylist:arr });
 //res.sendFile(__dirname+'/allNotifications.txt');
});
app.get('/refresh', function(req, res, next) {

//fs.writeFileSync('./latest.txt',JSON.stringify({"date":"dummydata"}));
doit();
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

app.get('/download',(req,res)=>{
    res.download('./app.apk','uietNotifications.apk')
})

app.get('/change',(req,res)=>{
	
	fs.writeFileSync('./latest.txt',JSON.stringify({"date":"dummydata"}));
	res.end('done');

})

app.get('/keepmeawake',(req,res)=>{
	doit()
    console.log('awaken');
    var fun=()=>{
        var myurl = "http://resultuiet.herokuapp.com/keepmeawake"
  request({
  url: myurl,
  headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'}

},(err,res,body)=>{
	console.log('req sent')
});
};
fun()
    setTimeout(fun, 1000*60*14);
res.send('done')
})

module.exports = app;
