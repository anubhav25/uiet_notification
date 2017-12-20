from selenium import webdriver
from bs4 import BeautifulSoup 
driver = webdriver.PhantomJS(executable_path = r'E:\phantomjs.exe')

def fun():
	myurl = "http://uietkuk.org/detailedannouc.php"
	driver.get(myurl)
	html_doc = (driver.page_source).encode('utf-8')
	print(html_doc)
	soup=BeautifulSoup(html_doc,'lxml')

	f=open('b.html','wb')
	f.write(html_doc)
	return 'done'
print(fun())