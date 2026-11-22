#!/usr/bin/env python3
"""ADITI THE INFINITE GIFT acceptance: static browser, controls, responsive, privacy."""
from pathlib import Path
from functools import partial
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from threading import Thread
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
import time
ROOT=Path(__file__).resolve().parent
class Server(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
server=ThreadingHTTPServer(("127.0.0.1",0),partial(Server,directory=str(ROOT)));Thread(target=server.serve_forever,daemon=True).start()
opt=Options();opt.binary_location="/usr/bin/chromium"
for a in ["--headless=new","--no-sandbox","--disable-dev-shm-usage","--disable-gpu"]:opt.add_argument(a)
opt.set_capability("goog:loggingPrefs",{"browser":"ALL"})
driver=webdriver.Chrome(service=Service("/usr/bin/chromedriver"),options=opt)
try:
 driver.set_window_size(1440,900)
 driver.get(f"http://127.0.0.1:{server.server_port}/surprise.html")
 wait=WebDriverWait(driver,12)
 wait.until(lambda b:b.find_element(By.ID,"message").get_attribute("class").find("shown")>=0)
 assert "THE INFINITE GIFT" in driver.title
 assert "ADITI" in driver.find_element(By.TAG_NAME,"body").text
 assert driver.find_element(By.ID,"stars").get_attribute("width")!="0"
 wait.until(lambda b:"shown" in b.find_element(By.ID,"math").get_attribute("class"))
 assert "6" in driver.find_element(By.ID,"math").text
 driver.save_screenshot(str(ROOT/"surprise-desktop.png"))
 print("PASS animation, message, math, desktop screenshot",flush=True)
 driver.find_element(By.ID,"replay").click()
 assert "shown" not in driver.find_element(By.ID,"message").get_attribute("class")
 wait.until(lambda b:"shown" in b.find_element(By.ID,"message").get_attribute("class"))
 print("PASS replay action",flush=True)
 driver.set_window_size(390,844)
 driver.get(f"http://127.0.0.1:{server.server_port}/surprise.html")
 dims=driver.execute_script("return {w:document.documentElement.scrollWidth,v:innerWidth}")
 assert dims["w"]<=dims["v"]+5,dims
 driver.save_screenshot(str(ROOT/"surprise-mobile.png"))
 assert not driver.find_elements(By.CSS_SELECTOR,"audio,video,iframe")
 errors=[x for x in driver.get_log("browser") if x.get("level")=="SEVERE"]
 assert not errors,errors
 print("PASS responsive mobile, no audio, no console errors",dims,flush=True)
 assert "fetch(" not in (ROOT/"surprise.js").read_text()
 assert "XMLHttpRequest" not in (ROOT/"surprise.js").read_text()
 print("SURPRISE_ACCEPTANCE_PASS",flush=True)
finally:
 driver.quit();server.shutdown()
