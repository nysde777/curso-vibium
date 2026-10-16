import asyncio

from vibium import async_api as vibium

async def main():
    bro = await vibium.browser.start()
    page = await bro.page()
    await page.go("https://www.saucedemo.com/")
    print(await page.title())
    await bro.stop()

asyncio.run(main())