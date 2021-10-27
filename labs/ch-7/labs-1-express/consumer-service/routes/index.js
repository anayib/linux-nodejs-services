const { Router } = require("express");
const router = Router();
const got = require("got");

const {
  BOAT_SERVICE_PORT,  BRAND_SERVICE_PORT 
} = process.env;

const boat_srv = `http://localhost:${BOAT_SERVICE_PORT}` ;
const brand_srv = `http://localhost:${BRAND_SERVICE_PORT}`;

const wrap = fn => (...args) => fn(...args).catch(args[2])

router.get('/:id', wrap(async (req, res, next) => {
  const { id } = req.params;

  const boat = await got(`${boat_srv}/${id}`).json();
  const brand = await got(`${brand_srv}/${boat.brand}`).json();
  res.status(200);
  res.json({id: boat.id, brand: brand.name, color: boat.color})
}))

module.exports = router;

/*
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  let boat;
  let brand;
   
  got(`${boat_srv}/${id}`).json()
    .then( result => {
      boat = result;
      return boat;
    })
    .then( boat => {
      return (got(`${brand_srv}/${boat.brand}`).json()
        .then(result => {
          brand = result;
          return brand;
        })
        .catch(next))
    })
    .then( brand => {
      console.log(`///////////////`, boat, brand);
      res.status(200);
      res.json({id: boat.id, brand: brand.name, color: boat.color})
    })
    .catch(next)
});


*/