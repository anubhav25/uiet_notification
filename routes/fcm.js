

var admin = require("firebase-admin");
 // var serverKey = process.env.noti
var serviceAccount = require('../noti.json')

//var serviceAccount = JSON.parse(process.env.noti);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://uietnotification.firebaseio.com/"
});

var topic = "/topics/uietnews";
//console.log(topic);

function sendNotification(title,body,mydata){


var payload = {
    notification: {
            title: title,
            body: body
        },

    data: {
            data: mydata
        }
};


admin.messaging().sendToTopic(topic, payload)
  .then(function(response) {
    console.log("Successfully sent message:", response);
  })
  .catch(function(error) {
    console.log("Error sending message:", error);
  });




}

module.exports.firebase=admin;
module.exports.sendNotification=sendNotification;