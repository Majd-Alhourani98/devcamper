const ErrorResponse = require('./../utils/errorResponse');
const asyncHandler = require('./../middleware/async');
const Bootcamp = require('../models/Bootcamp');
const geocoder = require('../utils/geocoder');
// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public

const getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();

  return res.status(200).json({
    success: true,
    length: bootcamps.length,
    data: bootcamps,
  });
});

// @desc      Get Single  bootcamp
// @route     GET /api/v1/bootcamps
// @access    Public
const getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  return res.status(200).json({
    success: true,
    data: bootcamp,
  });

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of  ${req.params.id}`, 404),
    );
  }
});

// @desc      Create new bootcamp
// @route     POST /api/v1/bootcamps
// @access    Private
const createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  return res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

// @desc      Delete new bootcamp
// @route     DELETE /api/v1/bootcamps:id
// @access    Private
const deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of  ${req.params.id}`, 404),
    );
  }

  res.status(200).json({
    success: true,
    data: null,
  });
});

// @desc      Update new bootcamp
// @route     PUT /api/v1/bootcamps:id
// @access    Private
const updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of  ${req.params.id}`, 404),
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @desc      UGet bootcamps within a radius
// @route     PUT /api/v1/bootcamps/radius/:zipcode/:distance
// @access    Private
const getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipCode, distance } = req.params;
  console.log(zipCode);
  console.log(distance);

  // get lat/lng from geocoder
  const loc = await geocoder.geocode(zipCode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;
  console.log('=========================');
  // calculate the radius using radians
  // divide distance by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    success: true,
    length: bootcamps.length,
    data: bootcamps,
  });
});

module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  deleteBootcamp,
  updateBootcamp,
  getBootcampsInRadius,
};
