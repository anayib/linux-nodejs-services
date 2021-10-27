const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
  const { name = 'Nayib' } = req.query;
  res.status(200);
  res.render('me', {name});
})

module.exports = router;
