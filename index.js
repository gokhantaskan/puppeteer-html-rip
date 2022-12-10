const path = require("path");
const puppeteer = require("puppeteer");
const fs = require("fs");

const filePath = path.resolve(__dirname, "timezones.html");

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(filePath);

    let content = await page.evaluate(() => {
      let results = [];
      let items = document.querySelectorAll(".option");

      items.forEach((item) => {
        results.push({
          timezone: item.querySelector("span:first-child").innerText,
          offset: item.querySelector("span:nth-child(2)").innerText,
        });
      });

      return results;
    });

    browser.close();
    fs.writeFile(path.resolve(__dirname, "output.json"), JSON.stringify(content), "utf8", () => {});
  } catch (e) {
    console.error(e);
  }
})();
