const express = require('express');

const router = express.Router();

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  deleteBootcamp,
  updateBootcamp,
} = require('../controllers/bootcamps.js');

router.route('/').get(getBootcamps).post(createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .delete(deleteBootcamp)
  .put(updateBootcamp);

module.exports = router;
