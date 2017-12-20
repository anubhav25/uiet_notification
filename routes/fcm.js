module.exports =  function(title,body,mydata){

  var FCM = require('fcm-node')

    //var serverKey = require('../noti.json
    try{
    var serverKey = JSON.parse(process.env.noti)
}
catch(){
	var serverKey = process.env.noti
}
    var fcm = new FCM(serverKey)

    var message = {

        to:'dAsxq6-OeBQ:APA91bHQwWlayCMctZI-_hbaVJ98Rihhh0X000Swo9PNMYZ5NvP3UEdD6aoJPyG0hy7ihH4skurcEtGhqit9it_r2MusRp7kd8I2aRqTTu0pkGVm6FIQXjT1O33qTEBV6BEBaIQdIxma',
        notification: {
            title: title,
            body: body
        },

        data: {
            my_key: 'data',
            my_another_key: mydata
        }
    }

    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!")
        } else {
            console.log("Successfully sent with response: ", response)
        }
    })

}
