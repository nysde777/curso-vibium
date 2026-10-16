from vibium import sync_api as vibium

bro = vibium.browser.start()

page = bro.page()

page.go("https://www.saucedemo.com/")

print(page.title())

bro.stop()

