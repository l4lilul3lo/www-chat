const puppeteer = require("puppeteer");
const { faker } = require("@faker-js/faker");

function createUser() {
  const username = faker.name.findName();
  const password = faker.random.word();
  return { username, password };
}

async function createPages(browsers) {
  return await Promise.all(browsers.map(async (browser) => browser.newPage()));
}

async function createBrowsers(n) {
  return await Promise.all(
    [...new Array(n)].map(async (x) => await puppeteer.launch())
  );
}

async function inputText(page, selector, text) {
  await page.waitForSelector(selector, { visible: true });
  await page.focus(selector);
  await page.keyboard.type(text);
}

async function readValue(page, selector) {
  return await page.$eval(selector, (el) => el.value);
}

async function registerAndLogin(pages) {
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    await page.goto("http://localhost:3000/register");
    page.username = faker.name.findName();
    page.password = faker.random.word();
    await inputText(page, "#username", page.username);
    await inputText(page, "#password", page.password);
    const usernameValue = await readValue(page, "#username");
    const passwordValue = await readValue(page, "#password");
    console.log("usernameValue", usernameValue);
    console.log("passwordValue", passwordValue);
    await page.screenshot({
      path: `./screenshots/register/screenshot${i}.png`,
    });
    await page.click("#register-submit-btn");
    await page.goto("http://localhost:3000/login");
    await inputText(page, "#username", page.username);
    await inputText(page, "#password", page.password);
    const loginNameValue = await readValue(page, "#username");
    const loginPasswordValue = await readValue(page, "#password");
    console.log(loginNameValue);
    console.log(loginPasswordValue);
    await page.screenshot({ path: `./screenshots/login/screenshot${i}.png` });
    await page.click("#login-submit-btn");
    setTimeout(async () => {
      const cookies = await page.cookies();
      console.log("cookies", cookies);
      page.screenshot({ path: `./screenshots/root/screenshot${i}.png` });
    }, 1000);
  }
}
async function simulation() {
  const browsers = await createBrowsers(5);

  const pages = await createPages(browsers);

  setTimeout(async () => {
    await registerAndLogin(pages);
  }, 1000);
}

simulation();
