require('dotenv').config();


const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = process.env.GIANTBOMB_API_KEY;


router.get('/:slug', async (req, res) => {
  const slug = req.params.slug.toLowerCase().replace(/-/g, ' ');

  try {
    // Passo 1: buscar pelo slug para obter o guid
    const searchResponse = await axios.get('https://www.giantbomb.com/api/search/', {
      params: {
        api_key: API_KEY,
        format: 'json',
        query: slug,
        resources: 'game',
        limit: 1
      },
      headers: { 'User-Agent': 'YourGamesApp/1.0' }
    });

    const result = searchResponse.data.results[0];
    if (!result) return res.status(404).send('Jogo não encontrado');

    const guid = result.guid;

    // Passo 2: buscar detalhes do jogo pelo guid
    const detailResponse = await axios.get(`https://www.giantbomb.com/api/game/${guid}/`, {
      params: {
        api_key: API_KEY,
        format: 'json',
      },
      headers: { 'User-Agent': 'YourGamesApp/1.0' }
    });

    const jogo = detailResponse.data.results;

    res.render('game', {
      game: {
        title: jogo.name,
        description: jogo.deck,
        coverUrl: jogo.image?.super_url || jogo.image?.original_url,
        genres: jogo.genres?.map(g => g.name) || [],
        developer: jogo.developers?.[0]?.name || 'Desconhecido',
        year: jogo.original_release_date?.split('-')[0] || 'Ano desconhecido',
        rating: '4.2'
      }
    });
  } catch (error) {
    console.error('Erro ao buscar jogo:', error.message);
    res.status(500).send('Erro ao carregar jogo.');
  }
});

module.exports = router;
