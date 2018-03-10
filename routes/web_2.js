
var fcm =require('./fcm');

function doit(){

  var latest = {
    date : Date.now(),
    body : 'anubhav',
    link  : 'https://www.google.com'
  }

  	console.log(latest)
  	fcm.sendNotification('UIET',latest.body,JSON.stringify(latest));

}




doit();


