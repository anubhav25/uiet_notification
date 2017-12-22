var cheerio = require('cheerio');
var request = require('request');
var fs= require('fs')

function processAll(mylist){
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
fs.writeFileSync('./allNotifications.txt',JSON.stringify(processedList));
fs.writeFileSync('./latest.txt',JSON.stringify(processedList[0]));
return processedList;
}


function fun(){
 
   return new Promise(function(resolve,reject){
  var myurl = "http://uietkuk.org/detailedannouc.php"
  request({
  url: myurl,
  headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'}

},(err,res,body)=>{
    if (err) {
    console.log(err);
    throw err;
    }
    var ans=processHTML(body);
    if(ans){
      resolve();
    }
    else{
      reject()
    }
    })
  });
}

 function processHTML(html_doc){
  var $=cheerio.load(html_doc);
  try{
    var latest = JSON.parse(fs.readFileSync('./latest.txt','utf-8'));
  }
  catch(e) {
    latest={"date":"dummydata"};
  }
  label=$('label[style = "color:#a94442;"]')[0];
  if ($(label).text() !== latest.date){

    var allList=[]
    var parent =label.parent;
    allList.push($(parent).html());
    var alll=$(parent).nextAll();
    while(parent.next.next !== null){
     allList.push($(parent.next).html());
     parent=parent.next

    }

    var processedList=processAll(allList)

    return true
  }
  return false
}


module.exports = fun;
