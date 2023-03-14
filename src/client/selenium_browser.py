from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_argument('--disable-web-security')
#         chrome_options.add_argument('--disable-gpu')
#         chrome_options.add_argument('--user-data-dir=C:/Temp/ChromeUserData')
#         chrome_options.add_argument('--no-sandbox')

service = Service('F:\Dev-kits\chromedriver_win32\chromedriver.exe')

driver = webdriver.Chrome(service=service, options=chrome_options)
driver.get("http://localhost:8080")

input("Enter to exit")
driver.quit()