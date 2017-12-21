var cheerio = require('cheerio');
var request = require('request');
var fs= require('fs')





/*
function processAll(mylist){
  processedList=[]
  for (var i in mylist){
    result= {
    "date":mylist[i].find('label').text,
    "body":mylist[i].find('a').text,
    "link":'http://uietkuk.org'+mylist[i].find('a')['href'][1:]
    }
    processedList.append(result)
  open('allNotifications.txt','w').write(json.dumps(processedList))
}

}
*/

function fun(){
  var myurl = "http://uietkuk.org/detailedannouc.php"
  request(myurl,(err,res,body)=>{
    if (err) {
    console.log(err);
    throw err;
    }
    console.log(body);
   // processHTML(body);
  });
}
/*  f=open('b.html','rb')
  html_doc = f.read()
  f.close()

  *//*
 function processHTML(html_doc){
  var $=cheerio.load(html_doc);
  try{
    var latest = JSON.parse(fs.readFileSync('./latest.txt','utf-8'));
  }
  catch(e) {
    latest={"date":"dummydata"};
  }
  label=$('label["style" = "color:#a94442;"]')[0]
  if label.text() !== latest.date:
    allList=[]
    allList.push(label.findParents()[0]);
    allList+=$($(label).parent()[0]).nextAll()
    processAll(allList)
    abc=label.findNextSiblings()[0]
    result= {
    "date":label.text,
    "body":abc.text,
    "link":'http://uietkuk.org'+abc['href'][1:]
    }
    result=json.dumps(result)
    latestFile=open('latest.txt','w')
    latestFile.write(result)
    latestFile.close()
    return result
  return 'done'
}*/
fun()
