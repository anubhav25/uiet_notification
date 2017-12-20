from selenium import webdriver
from bs4 import BeautifulSoup 
import json
driver = webdriver.PhantomJS(executable_path = r'E:\phantomjs.exe')

def fun():
	myurl = "http://uietkuk.org/detailedannouc.php"
	driver.get(myurl)
	html_doc = driver.page_source
	soup=BeautifulSoup(html_doc,'lxml')
	return soup

def readinput():
	input=args[0]
	print(fun())
readinput()
