const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const URL = 'https://cinetux.top/';

async function scrapeMovies() {
    try {
        const { data } = await axios.get(URL);
        const $ = cheerio.load(data);

        const movies = [];

        $('li.TPostMv').each((index, element) => {
            const title = $(element).find('h2.Title').text().trim();
            const link = $(element).find('a').attr('href');
            const image = item.querySelector('.Image img')?.src;
            const year = $(element).find('.Qlty.Yr').text().trim();
            const quality = $(element).find('.Qlty:not(.Yr)').text().trim();
            const duration = $(element).find('.Time').text().trim();
            const description = $(element).find('.Description p').first().text().trim();
            const director = $(element).find('.Director a').text().trim();

            const genres = [];
            $(element)
                .find('.Genre a')
                .each((i, genre) => {
                    genres.push($(genre).text().trim());
                });

            const actors = [];
            $(element)
                .find('.Cast a')
                .each((i, actor) => {
                    actors.push($(actor).text().trim());
                });

            movies.push({
                title,
                link,
                image,
                year,
                quality,
                duration,
                description,
                director,
                genres,
                actors,
            });
        });

        fs.writeFileSync('datos.json', JSON.stringify(movies, null, 2));
        console.log('Datos extraídos y guardados en datos.json');
    } catch (error) {
        console.error('Error al hacer scraping:', error);
    }
}

scrapeMovies();
