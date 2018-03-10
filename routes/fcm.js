

var admin = require("firebase-admin");
 // var serverKey = process.env.noti
try {
var serviceAccount = require('../uiet-2f78e-firebase-adminsdk-8c11r-b494da6b49.json')
} catch (e) {
	var serviceAccount = JSON.parse(process.env.noti);
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://uiet-2f78e.firebaseio.com/"
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