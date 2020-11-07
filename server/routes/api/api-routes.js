const router = require('express').Router();
const jobSearch = require('../../controllers/api-controller')

router.get('/', jobSearch
);
module.exports = router;