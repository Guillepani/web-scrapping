const puppeteer = require("puppeteer");
const fs = require("fs");

const scrapeProducts = async () => {
  let browser;

  try {
    console.log("Iniciando scraper...");

    browser = await puppeteer.launch({
      headless: true
    });

    const page = await browser.newPage();

    await page.goto("https://www.combatarena.es", {
      waitUntil: "domcontentloaded"
    });

    console.log("Página principal cargada");

    const cookiesButton = await page.$("#cm_primary_btn");

    if (cookiesButton) {
      await page.click("#cm_primary_btn");

      console.log("Banner de cookies cerrado");
    }

    const baseUrl =
      "https://www.combatarena.es/collections/guantes-de-boxeo?page=";

    let allProducts = [];

    let pageNumber = 1;

    let hasMorePages = true;

    while (hasMorePages) {
      const currentPage = `${baseUrl}${pageNumber}`;

      console.log(`Scrapeando página ${pageNumber}...`);

      await page.goto(currentPage, {
        waitUntil: "domcontentloaded"
      });

      const cookiesButton = await page.$("#cm_primary_btn");

      if (cookiesButton) {
        await page.click("#cm_primary_btn");

        console.log("Banner de cookies cerrado");
      }

      const products = await page.evaluate(() => {
        const cards = document.querySelectorAll(".product-card");

        const productsArray = [];

        for (const card of cards) {
          const name =
            card.querySelector(".product-title")?.textContent.trim() ||
            "Sin nombre";

          const price =
            card
              .querySelector("[data-card-price]")
              ?.textContent.trim() || "Sin precio";

          const image =
            card.querySelector("img")?.src || "Sin imagen";

          productsArray.push({
            name,
            price,
            image
          });
        }

        return productsArray;
      });

      console.log(
        `${products.length} productos encontrados en página ${pageNumber}`
      );

      if (products.length === 0) {
        console.log("No hay más productos");

        hasMorePages = false;
      } else {
        allProducts = [...allProducts, ...products];

        console.log("Pasando a la siguiente página...");

        pageNumber++;
      }
    }

    fs.writeFileSync(
      "products.json",
      JSON.stringify(allProducts, null, 2)
    );

    console.log(
      `JSON generado correctamente con ${allProducts.length} productos`
    );

    await browser.close();

    console.log("Navegador cerrado");
  } catch (error) {
    console.error("Error durante el scraping:", error);

    if (browser) {
      await browser.close();

      console.log("Navegador cerrado tras error");
    }
  }
};

module.exports = scrapeProducts;