const puppeteer = require("puppeteer");
async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.scrapingbee.com/");
  await page.waitForTimeout(5000); // wait for 5 seconds
  await browser.close();
}
main();
