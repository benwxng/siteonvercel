import puppeteer from "puppeteer";
import fs from 'fs/promises';

const getCurrent = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  let allCurrent = [];

  try {
    await page.goto("https://www.goodreads.com/review/list/144076215?shelf=currently-reading", {
      waitUntil: "networkidle0",
    });

    // Wait for the book list to load
    //await page.waitForSelector('.bookalike.review', { timeout: 5000 });

    // Get the list of current books
    const currents = await page.evaluate(() => {
      const currentList = document.querySelectorAll(".bookalike.review");
    
      return Array.from(currentList).map((book) => {
        const titleElement = book.querySelector(".field.title .value a");
        const authorElement = book.querySelector(".field.author .value a");
        
        return {
          title: titleElement ? titleElement.textContent.trim() : null,
          author: authorElement ? authorElement.textContent.trim() : null
        };

      });
    });

    console.log(currents);
    allCurrent = currents;

  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await browser.close();
  }

  return allCurrent;
};

const data = await getCurrent();
await fs.writeFile('currentReads.json', JSON.stringify(data, null, 2));