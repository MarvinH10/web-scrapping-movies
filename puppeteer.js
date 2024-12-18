const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeWithPuppeteer() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const URL = 'https://ejemplo.com';
    await page.goto(URL, { waitUntil: 'networkidle2' });

    const titles = await page.evaluate(() => {
        const elements = document.querySelectorAll('h2.article-title');
        return Array.from(elements).map(el => el.innerText.trim());
    });

    fs.writeFileSync('output.json', JSON.stringify(titles, null, 2));
    console.log('Datos extraídos y guardados en output.json');

    await browser.close();
}

scrapeWithPuppeteer();
