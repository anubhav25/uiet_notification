var express = require('express');
var app = express.Router();
var cheerio = require('cheerio');
var request = require('request');

/* GET home page. */
app.get('/', function(req, res, next) {


	const { spawn } = require('child_process');
	console.log('hi')
    const pyProg = spawn('python',[__dirname+"/a.py"]);
    pyProg.stdout.on('data', function(data) {

        console.log(data.toString());
         console.log('done');
         res.send(data+'<br>'+data.toString()+'<br>'+'done');

    });
    pyProg.stderr.on('data', (data) => {

        console.log(data.toString());
        console.log('done');
         res.send(data+'<br>'+'data.toString()'+'<br>'+'err');
    });

/*    const { spawn } = require('child_process');
    const pyProg = spawn('python',[__dirname+"/result.py"]);

    pyProg.stdout.on('data', function(data) {

        console.log(data.toString());
        res.write(data);
        res.end('end');

    });*/
 // res.render('index', { title: 'Express' });
});





module.exports = app;
