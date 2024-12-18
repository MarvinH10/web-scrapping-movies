const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const URL = 'https://cinetux.top/';

async function scrapeData() {
    try {
        const { data } = await axios.get(URL);

        const $ = cheerio.load(data);

        const titles = [];
        $('h2.article-title').each((index, element) => {
            titles.push($(element).text().trim());
        });

        fs.writeFileSync('output.json', JSON.stringify(titles, null, 2));
        console.log('Datos extraídos y guardados en output.json');

    } catch (error) {
        console.error('Error al hacer scraping:', error);
    }
}

scrapeData();
