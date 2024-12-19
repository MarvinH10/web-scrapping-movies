const puppeteer = require('puppeteer');
const fs = require('fs');

const URL = 'https://cinetux.top/';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: 'networkidle2' });

    const movies = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('li.TPostMv'));
        return items.map(item => {
            const title = item.querySelector('h2.Title')?.textContent.trim();
            const link = item.querySelector('a')?.href;
            const image = item.querySelector('.Image img')?.src;
            const year = item.querySelector('.Qlty.Yr')?.textContent.trim();
            const quality = item.querySelector('.Qlty:not(.Yr)')?.textContent.trim();
            const duration = item.querySelector('.Time')?.textContent.trim();
            const description = item.querySelector('.Description p')?.textContent.trim();
            const director = item.querySelector('.Director a')?.textContent.trim();

            const genres = Array.from(item.querySelectorAll('.Genre a')).map(el => el.textContent.trim());
            const actors = Array.from(item.querySelectorAll('.Cast a')).map(el => el.textContent.trim());

            return { title, link, image, year, quality, duration, description, director, genres, actors };
        });
    });

    fs.writeFileSync('output.json', JSON.stringify(movies, null, 2));
    console.log('Datos extraídos y guardados en output.json');

    await browser.close();
})();
