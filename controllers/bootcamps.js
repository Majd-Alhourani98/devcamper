const ErrorResponse = require('./../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp');
// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public

const getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();

    return res.status(200).json({
      success: true,
      length: bootcamps.length,
      data: bootcamps,
    });
  } catch (error) {
    next(error);
  }
};

// @desc      Get Single  bootcamp
// @route     GET /api/v1/bootcamps
// @access    Public
const getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    return res.status(200).json({
      success: true,
      data: bootcamp,
    });

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp not found with id of  ${req.params.id}`,
          404,
        ),
      );
    }
  } catch (error) {
    next(error);
  }
};

// @desc      Create new bootcamp
// @route     POST /api/v1/bootcamps
// @access    Private
const createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    return res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    next(error);
  }
};

// @desc      Delete new bootcamp
// @route     DELETE /api/v1/bootcamps:id
// @access    Private
const deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp not found with id of  ${req.params.id}`,
          404,
        ),
      );
    }

    res.status(200).json({
      success: true,
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// @desc      Update new bootcamp
// @route     PUT /api/v1/bootcamps:id
// @access    Private
const updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp not found with id of  ${req.params.id}`,
          404,
        ),
      );
    }

    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  deleteBootcamp,
  updateBootcamp,
};
