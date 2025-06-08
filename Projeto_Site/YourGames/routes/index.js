require('dotenv').config();


const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = process.env.GIANTBOMB_API_KEY;


router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * 25;
  const searchTerm = req.query.search || '';

  try {
    let response;

    if (searchTerm) {
      response = await axios.get('https://www.giantbomb.com/api/search/', {
        params: {
          api_key: API_KEY,
          format: 'json',
          query: searchTerm,
          resources: 'game',
          sort: 'original_release_date:desc',
          limit: 25,
          offset
        },
        headers: { 'User-Agent': 'YourGamesApp/1.0' }
      });
    } else {
      response = await axios.get('https://www.giantbomb.com/api/games/', {
        params: {
          api_key: API_KEY,
          format: 'json',
          sort: 'original_release_date:desc',
          limit: 25,
          offset
        },
        headers: { 'User-Agent': 'YourGamesApp/1.0' }
      });
    }

    const jogos = response.data.results.map(jogo => ({
      title: jogo.name,
      slug: jogo.name.toLowerCase().replace(/\s+/g, '-'),
      guid: jogo.guid,
      coverUrl: jogo.image?.super_url || jogo.image?.original_url
    }));

    res.render('index', {
      jogos,
      currentPage: page,
      searchTerm
    });
  } catch (error) {
    console.error('Erro ao buscar jogos:', error.message);
    res.status(500).send('Erro ao carregar recomendações.');
  }
});

module.exports = router;
