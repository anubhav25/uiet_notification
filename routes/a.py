from selenium import webdriver
from bs4 import BeautifulSoup
import json
driver = webdriver.PhantomJS(executable_path = r'E:\phantomjs.exe')
def processAll(mylist):
	processedList=[]
	for i in mylist:
		result= {
		"date":i.find('label').text,
		"body":i.find('a').text,
		"link":'http://uietkuk.org'+i.find('a')['href'][1:]
		}
		processedList.append(result)
	open('allNotifications.txt','w').write(json.dumps(processedList))

def fun():
	# myurl = "http://uietkuk.org/detailedannouc.php"
	# driver.get(myurl)
	# html_doc = (driver.page_source).encode('utf-8')
	f=open('b.html','rb')
	html_doc = f.read()
	f.close()
	soup=BeautifulSoup(html_doc,'lxml')
	try:
		latestFile=open('latest.txt','r')
		latest=json.loads(latestFile.read())
		latestFile.close()
	except:
		latest={"date":"dummydata"}
	label=soup.find('label',{ "style" : "color:#a94442;"})
	if label.text != latest["date"]:
		allList=[]
		allList.append(label.findParents()[0]);
		allList+=allList[0].findNextSiblings()
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
print(fun())
