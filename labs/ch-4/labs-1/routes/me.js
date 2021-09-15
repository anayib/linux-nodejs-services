const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
   try {
     const { name = 'Nayib' } = req.query

     res.status(200)
     res.render('me', { name });
   } catch (err) {
     next(err)
     return;
   }
});

module.exports = router;
