const express = require('express');
const router = express.Router();
const axios = require('axios');
const queryString = require('query-string');

require('dotenv').config();

/* GET users listing. */
router.get('/callback', function(req, res, next) {
  const headers = {
    headers: {
        'Content-Type': 'application/json',
    }
  };

  axios.post('https://github.com/login/oauth/access_token', {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: req.query.code
  }, headers).then(({ data })=> {
      const { access_token } = queryString.parse(data);

      res.render('success', { title: 'Github auth', token: access_token });
  })
});

module.exports = router;
