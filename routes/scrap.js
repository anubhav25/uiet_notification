var cheerio = require('cheerio');
var request = require('request');

function processAll(mylist,firebase){
  processedList=[]
  for (var i in mylist){
    var temp = cheerio.load(mylist[i])
    if(temp('a').text()===''){
    temp('<a>'+temp.text().substring(12)+'</a>').insertAfter(temp('label'))
    }
    result= {
    "date":temp('label').text(),
    "body":temp('a').text()||temp.text(),
    "link":encodeURI('http://uietkuk.org'+ (temp('a').attr('href')||'1').substring(1))
    }
    processedList.push(result)
}
firebase.database().ref('/allNotifications').set(processedList);
firebase.database().ref('/latest').set(processedList[0]);
return processedList;
}


function fun(firebase){

   return new Promise(function(resolve,reject){
  var myurl = "http://uietkuk.org/detailedannouc.php"
  request({
  url: myurl,
  headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'}

},(err,res,html_doc)=>{
    if (err) {
    console.log(err);
    throw err;
    }

  var $=cheerio.load(html_doc);
  label=$('label[style = "color:#a94442;"]')[0];
    firebase.database().ref('/latest').once('value',(data)=>{

    var latest=data.val()||{"date":"dummydata"};
    console.log(latest);
    console.log('latest');
    if ($(label).text() !== latest.date){

    var allList=[]
    var parent =label.parent;
    allList.push($(parent).html());
    var alll=$(parent).nextAll();
    while(parent.next.next !== null){
     allList.push($(parent.next).html());
     parent=parent.next

    }

    var processedList=processAll(allList,firebase)

    resolve(processedList[0])
  }
  reject();

 });

    })
  });
}

module.exports = fun;
