module.exports =  function(devices,title,body,mydata){

  var FCM = require('fcm-node')

    var serverKey = require('../noti.json');
//  var serverKey = process.env.noti
   // console.log(serverKey);
    var fcm = new FCM(serverKey)
for (var count in devices){
     console.log(devices[count]);
    var message = {

        registration_ids:devices[count],
        notification: {
            title: title,
            body: body
        },

        data: {
            data: mydata
        }
    }

    fcm.send(message, function(err, response){
        if (err) {
            console.log(err)
            console.log("Something has gone wrong!")
        } else {
            console.log("Successfully sent with response: ", response)
        }
    })
}
}
