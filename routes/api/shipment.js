const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');
const AWS = require('aws-sdk');
const fs = require('fs');
const readline = require('readline');

//Shipment model
const Shipment = require('../../models/Shipment');
const User = require('../../models/User');

// @route    GET api/shipment/
// @desc     Get all shipments created by logged in user
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const shipments = await Shipment.find({ user: user._id }).sort({
      date: -1
    });
    res.json(shipments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('500 : Server Error');
  }
});

// @route   POST api/shipment/
// @desc    Create or update a shipment
// @access  Private
router.post(
  '/',
  [auth, [check('name', 'Username is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');

      const newShipment = new Shipment({
        name: req.body.name,
        legs: req.body.legs,
        user: req.user.id,
        quantity: req.body.quantity,
        fragile: req.body.fragile,
        insuranceProvider: req.body.insuranceProvider,
        logisticProvider: req.body.logisticProvider,
        departureDate: req.body.departureDate,
        deliveryDate: req.body.deliveryDate,
        shipper: req.body.shipper,
        receiver: req.body.receiver,
        edgeDevices: req.body.edgeDevices,
        number: req.body.number
      });

      const shipment = await newShipment.save();

      res.json(shipment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('500 : Server Error');
    }
  }
);

// @route   DELETE api/shipment/:id
// @desc    Delete a shipment
// @access  Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);

    if (!shipment) {
      return res.status(404).json({ msg: '404 : Shipment not found' });
    }

    //Check user
    if (shipment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: '401 : User not authorized' });
    }

    await shipment.remove();

    res.json({ msg: 'Shipment removed successfully' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('500 : Server Error');
  }
});

// @route   GET api/shipment/iotdata/:id
// @desc    Get iot data of the shipment from s3 bucket
// @access  Private
router.get('/iotdata/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    AWS.config.setPromisesDependency();
    AWS.config.update({
      accessKeyId: '<paste_your_AWSAccessKeyId>',
      secretAccessKey: '<paste_yout_AWSSecretKey>'
    });
    var params = { Bucket: 'shipment-tracker', Key: 'mapdata.json' };
    new AWS.S3().getObject(params, function (err, json_data) {
      if (!err) {
        var json = JSON.parse(new Buffer.from(json_data.Body).toString('utf8'));
        res.json(json);
      }
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: '404 : Shipment not found' });
    }
    res.status(500).send('500 : Server Error');
  }
});

// @route   GET api/shipment/sensordata/:id
// @desc    Get iot sensor data of the shipment from s3 bucket
// @access  Private
router.get('/sensordata/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    AWS.config.setPromisesDependency();
    AWS.config.update({
      accessKeyId: '<paste_your_AWSAccessKeyId>',
      secretAccessKey: '<paste_yout_AWSSecretKey>'
    });
    var params = { Bucket: 'shipment-tracker', Key: 'chdata.json' };
    new AWS.S3().getObject(params, function (err, json_data) {
      if (!err) {
        var json = JSON.parse(new Buffer.from(json_data.Body).toString('utf8'));
        res.json(json);
      }
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: '404 : Shipment not found' });
    }
    res.status(500).send('500 : Server Error');
  }
});

// @route   GET api/shipment/:id
// @desc    Show Shipment by its id
// @access  Private
router.get('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) {
      return res.status(404).json({ msg: '404 : Shipment not found' });
    }
    res.json(shipment);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: '404 : Shipment not found' });
    }
    res.status(500).send('500 : Server Error');
  }
});

module.exports = router;
