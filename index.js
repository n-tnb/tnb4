const { connect } = require("puppeteer-real-browser");

const MINUTOS = 10;
const URL = process.env.URL;
const PROXY = JSON.parse(process.env.PROXY) || false;
const ADDRESS = process.env.ADDRESS.split("\n");

const randomIndex = Math.floor(Math.random() * PROXY.length);

const run = async () => {
  const { page, browser } = await connect({
    args: ["--start-maximized"],
    turnstile: true,
    headless: false,
    // disableXvfb: true,
    proxy: PROXY[randomIndex],
    customConfig: {},
    connectOption: {
      defaultViewport: null,
    },
    plugins: [],
  });

  try {
    await page.goto(URL, { waitUntil: "networkidle2" });

    await page.evaluate(() => {
      document.body.style.zoom = "50%";
    });

    await new Promise((r) => setTimeout(r, 5000));

    await page.type("#address", ADDRESS[randomIndex]);
    const value = await page.$eval("#address", (el) => el.value);
    if (value !== ADDRESS[randomIndex]) {
      await page.$eval("#address", (el) => (el.value = ""));
      await page.type("#address", ADDRESS[randomIndex]);
    }

    const tempoTotal = MINUTOS * 60 * 1000;
    const inicio = Date.now();

    while (Date.now() - inicio < tempoTotal) {
      try {
        await page.waitForSelector("circle");
        await page.click("circle");
      } catch (e) {}
      await new Promise((r) => setTimeout(r, 400));
    }

    await page.click("button[type='button'] > span");

    await page.screenshot({ path: "screen.png" });
  } catch (e) {
    console.error("erro", e);
  } finally {
    await browser.close();
  }
};

run();


