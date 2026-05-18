const puppeteer = require("puppeteer");
const fs = require("fs");

const scrapeProducts = async () => {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();

  let allProducts = [];

  let currentPage = "https://books.toscrape.com";

  while (currentPage) {
    await page.goto(currentPage);

    /* Ejemplo de eliminación de modales o cookies si la web los tuviera
     En Books To Scrape no existen

     const closeModalButton = await page.$(".modal-button");

     if (closeModalButton) {
       await closeModalButton.click();
     } */

    const products = await page.evaluate(() => {
      const articles = document.querySelectorAll(".product_pod");

      const productsArray = [];

      for (const article of articles) {
        const name = article.querySelector("h3 a").title;

        const price = article.querySelector(".price_color").textContent;

        const image = article.querySelector("img").src;

        productsArray.push({
          name,
          price,
          image
        });
      }

      return productsArray;
    });

    allProducts = [...allProducts, ...products];

    const nextButton = await page.$(".next a");

    if (nextButton) {
      const nextPage = await page.evaluate(
        (button) => button.getAttribute("href"),
        nextButton
      );

      currentPage = new URL(nextPage, currentPage).href;
    } else {
      currentPage = null;
    }
  }

  fs.writeFileSync(
    "products.json",
    JSON.stringify(allProducts, null, 2)
  );

  console.log("JSON generado correctamente");

  await browser.close();
};

module.exports = scrapeProducts;