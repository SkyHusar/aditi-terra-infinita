#!/usr/bin/env python3
"""Local offline-ready smoke/acceptance test for ADITI — TERRA INFINITA."""
from pathlib import Path
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
import time, re
ROOT=Path(__file__).resolve().parent
class Handler(SimpleHTTPRequestHandler):
 def log_message(self,*args): pass
server=ThreadingHTTPServer(("127.0.0.1",0),partial(Handler,directory=str(ROOT)))
thread=Thread(target=server.serve_forever,daemon=True)
thread.start()
base="http://127.0.0.1:"+str(server.server_port)
options=Options()
options.binary_location="/usr/bin/chromium"
for x in ("--headless=new","--no-sandbox","--disable-dev-shm-usage","--disable-gpu","--disable-extensions"):
 options.add_argument(x)
options.set_capability("goog:loggingPrefs",{"browser":"ALL"})
driver=webdriver.Chrome(service=Service("/usr/bin/chromedriver"),options=options)
wait=WebDriverWait(driver,12)
try:
 driver.set_window_size(1440,900)
 driver.get(base+"/")
 wait.until(lambda d:"PUBLIC DEMO" in d.find_element(By.ID,"connection-state").text)
 assert "ADITI" in driver.title
 assert driver.find_element(By.ID,"cpu-value").text.endswith("%")
 assert driver.find_element(By.ID,"btc-address").text=="bc1q9t5du263554qyruc0dxup4d4d3angtyq3cnllc"
 assert driver.find_element(By.CSS_SELECTOR,"a[href^='bitcoin:']").get_attribute("href").startswith("bitcoin:bc1")
 assert driver.find_element(By.CSS_SELECTOR,"a[href='https://aa-records.vercel.app/']")
 assert driver.find_element(By.ID,"matrix-rain").get_attribute("width")!="0"
 assert "SIMULATED" in driver.find_element(By.CLASS_NAME,"status-panel").text
 print("PASS public site, gift copy, music link, public BTC address, demo-only indicators",flush=True)
 driver.find_element(By.ID,"btn-infinita").click()
 assert "infinita-live" in driver.find_element(By.TAG_NAME,"body").get_attribute("class")
 first=driver.find_element(By.ID,"infinita-value").text
 wait.until(lambda d:d.find_element(By.ID,"infinita-value").text!=first)
 second=driver.find_element(By.ID,"infinita-value").text
 assert "12" in second
 driver.find_element(By.ID,"btn-infinita").click()
 assert "infinita-live" not in driver.find_element(By.TAG_NAME,"body").get_attribute("class")
 print("PASS Terra Infinita 6→12 and stop",flush=True)
 driver.find_element(By.ID,"btn-pause").click()
 assert "effects-paused" in driver.find_element(By.TAG_NAME,"body").get_attribute("class")
 driver.find_element(By.ID,"btn-pause").click()
 driver.find_element(By.ID,"btn-theme").click()
 assert "theme-blue" in driver.find_element(By.TAG_NAME,"body").get_attribute("class")
 driver.find_element(By.ID,"btn-hud").click()
 assert "hud-hidden" in driver.find_element(By.ID,"matrix-app").get_attribute("class")
 driver.find_element(By.ID,"btn-hud").click()
 driver.find_element(By.ID,"meme-next").click()
 assert driver.find_element(By.ID,"meme-output").text
 driver.find_element(By.ID,"spark-next").click()
 assert driver.find_element(By.ID,"spark-output").text
 driver.find_element(By.ID,"weekly").clear()
 driver.find_element(By.ID,"weekly").send_keys("50")
 driver.find_element(By.ID,"target").clear()
 driver.find_element(By.ID,"target").send_keys("1000")
 assert "20 tygodni" in driver.find_element(By.ID,"money-result").text
 print("PASS UI actions, memes and simple savings math",flush=True)
 driver.execute_script("window.scrollTo(0,0)")
 driver.save_screenshot(str(ROOT/"preview-desktop.png"))
 dims=driver.execute_script("return {viewport:innerWidth,width:document.documentElement.scrollWidth}")
 print("DESKTOP_WIDTH",dims,flush=True)
 assert dims["width"]<=dims["viewport"]+6
 driver.set_window_size(390,844)
 driver.get(base+"/")
 wait.until(lambda d:"PUBLIC DEMO" in d.find_element(By.ID,"connection-state").text)
 dims=driver.execute_script("return {viewport:innerWidth,width:document.documentElement.scrollWidth}")
 print("MOBILE_WIDTH",dims,flush=True)
 assert dims["width"]<=dims["viewport"]+6
 driver.save_screenshot(str(ROOT/"preview-mobile.png"))
 assert not driver.find_elements(By.CSS_SELECTOR,"audio,video,iframe")
 severe=[x for x in driver.get_log("browser") if x.get("level")=="SEVERE"]
 assert not severe,severe
 print("PASS desktop/mobile responsive, no audio, no severe browser errors",flush=True)
 # Static audit for accidental inclusion of server/network/private values.
 html=(ROOT/"index.html").read_text()
 js=(ROOT/"app.js").read_text()
 for private in ("192.168.1.","VodafoneAE3B80","skyhu","omen@","/home/omen/","mission.db","secret_key","127.0.0.1:8765","api/telemetry"):
  assert private not in html+js,private
 assert not re.search(r"\b(fetch|XMLHttpRequest|sendBeacon|WebSocket)\s*\(",js)
 print("PASS privacy audit (no dynamic remote calls, private addresses, credentials or local API)",flush=True)
 print("PUBLIC_SITE_ACCEPTANCE_PASS",flush=True)
finally:
 driver.quit()
 server.shutdown()
