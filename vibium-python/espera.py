import time
from vibium import browser

bro = browser.start()
page = bro.page()
page.go("https://www.selenium.dev/selenium/web/dynamic.html")
antes = time.time()
boton = page.find("#adder")
boton.click()
caja = page.find("#box0")
print("tardo en segundo", round(time.time() - antes, 1))
bro.stop()