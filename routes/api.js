const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

require('dotenv').config({ path: '../.env' });

router.get('/:search', async (req, res) => {
  console.log(req.params.search);
  const response = await fetch(
    `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.API_KEY}&q=${req.params.search}`
  );
  const data = await response.json();
  res.json(data);
});

router.get('/forcast/:city', async (req, res) => {
  console.log(req.params.city);
  const response = await fetch(
    `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${req.params.city}?apikey=${process.env.API_KEY}&metric=true`
  );
  const data = await response.json();
  res.json(data);
});

// @route  GET api/items
// @desc   Get All Items
// @access Public
// router.get('/', async (req, res) => {
//   Item.find()
//     .sort({ date: -1 })
//     .then((items) => res.json(items));
// });

// @route  POST api/items
// @desc   Create A Item
// @access Public
// router.post('/', (req, res) => {
//   const newItem = new Item({
//     name: req.body.name,
//   });
//   newItem.save().then((item) => res.json(item));
// });

// // @route  DELETE api/items/:id
// // @desc   Delete A Item
// // @access Public
// router.delete('/:id', (req, res) => {
//   Item.findById(req.params.id).then((item) =>
//     item
//       .remove()
//       .then(() => res.json({ success: true }))
//       .catch((err) => res.status(404).json({ success: true }))
//   );
// });

module.exports = router;
