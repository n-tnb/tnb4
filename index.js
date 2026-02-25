const { connect } = require("puppeteer-real-browser");
//const { GhostCursor } = require('ghost-cursor');

const run = async () => {
  const { page, browser } = await connect({
    args: ["--start-maximized"],
    turnstile: true,
    headless: false,
    // disableXvfb: true,
    proxy: {
      host: "104.234.127.10",
      port: 47568,
      username: "BHVTZ9TQ",
      password: "EBD8SU4H",
    },
    customConfig: {},
    connectOption: {
      defaultViewport: null,
    },
    plugins: [],
  });

  await page.goto("https://thenanobutton.com/u5Xtxg?unit=dollars", {
    waitUntil: "networkidle2",
  });

  await page.evaluate(() => {
    document.body.style.zoom = "50%";
  });

  await new Promise((r) => setTimeout(r, 10000));

  await page.waitForSelector("circle");

  let count = 0;
  while (count < 50) {
    // await page.realCursor.click("circle")

    // mouse click
    const circle = await page.$("circle");
    const boundingBox = await circle.boundingBox();
    const x = boundingBox.x + boundingBox.width / 2;
    const y = boundingBox.y + boundingBox.height / 2;
    await page.mouse.click(x, y);
    await new Promise((r) => setTimeout(r, 400));
    count++;
  }

  // await new Promise((r) => setTimeout(r, 5000));

  // let token = null;
  // let startDate = Date.now();
  // while (!token && Date.now() - startDate < 30000) {
  //   token = await page.evaluate(() => {
  //     try {
  //       let item = document.querySelector(
  //         '[name="cf-turnstile-response"]',
  //       ).value;
  //       return item && item.length > 20 ? item : null;
  //     } catch (e) {
  //       return null;
  //     }
  //   });
  //   await new Promise((r) => setTimeout(r, 1000));
  // }

  // await new Promise((r) => setTimeout(r, 5000));



  await page.screenshot({ path: "screen.png" });

  await browser.close();
};

run();



