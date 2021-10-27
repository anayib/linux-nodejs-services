const { Router } = require("express");
const got = require("got");
const router = Router();

const {
	BICYCLE_SERVICE_PORT, 
        BRAND_SERVICE_PORT, 
      } = process.env;

const bicicle_srv = `http://localhost:${BICYCLE_SERVICE_PORT}`;
const brand_srv = `http://localhost:${BRAND_SERVICE_PORT}`;

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  let  bicicle;
  let brand;
  console.log("IM IN")
  console.log(`${bicicle_srv}/${id}`,`${brand_srv}/${id}`);
  
  got(`${bicicle_srv}/${id}`).json()
    .then((value) => {
       console.log(value)
       bicicle = value;
       return bicicle;
    })
    .then((bicicle) => {
       return got(`${brand_srv}/${bicicle.id}`).json()
         .then(result  =>  {
		 brand = result;
		 return brand;
	 })
	 .catch(next)
    })
    .then((brand) => {    
       console.log(bicicle, brand);
       res.status(200).json({id: `${bicicle.id}`, name: `${brand.name}`});
    })
    .catch(next);
 
})

module.exports = router;
