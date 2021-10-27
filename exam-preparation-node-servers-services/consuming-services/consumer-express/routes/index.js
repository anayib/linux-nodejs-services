const { Router } = require('express');
const router = Router();
const got = require('got')
const { BICYCLE_SERVICE_PORT = 4000, BRAND_SERVICE_PORT = 5000 } = process.env;

const bicycleSrv = `http://localhost:${BICYCLE_SERVICE_PORT}`;
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`;

router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  Promise.all([got(`${bicycleSrv}/${id}`).json(), got(`${brandSrv}/${id}`).json()]).then( (values)  => {
      const bicycle = values[0];
      const brand = values[1];
      res.status(200).json({id: bicycle.id, color: bicycle.color, brand: brand.name });
    })
    .catch(next);
});

module.exports = router;
