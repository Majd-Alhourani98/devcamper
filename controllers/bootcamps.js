// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public

const getBootcamps = (req, res) => {
  res.status(200).json({ success: true, message: 'Show all bootcamps' });
};

// @desc      Get Single  bootcamp
// @route     GET /api/v1/bootcamps
// @access    Public
const getBootcamp = (req, res) => {
  res.status(200).json({ success: true, message: 'Get single Bootcamp' });
};

// @desc      Create new bootcamp
// @route     POST /api/v1/bootcamps
// @access    Private
const createBootcamp = (req, res) => {
  res.status(200).json({ success: true, message: 'Create new Bootcamp' });
};

// @desc      Delete new bootcamp
// @route     DELETE /api/v1/bootcamps:id
// @access    Private
const deleteBootcamp = (req, res) => {
  res.status(200).json({ success: true, message: 'Delete bootcamp' });
};

// @desc      Update new bootcamp
// @route     PUT /api/v1/bootcamps:id
// @access    Private
const updateBootcamp = (req, res) => {
  res.status(200).json({ success: true, message: 'Update bootcamp' });
};

module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  deleteBootcamp,
  updateBootcamp,
};
