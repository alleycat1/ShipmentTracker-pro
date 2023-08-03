const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShipmentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  date: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String
  },
  quantity: {
    type: Number
  },
  number: {
    type: Number
  },
  fragile: {
    type: Boolean
  },
  insuraceProvider: {
    type: String
  },
  logisticOperator: {
    type: String
  },
  departureDate: {
    type: Date
  },
  deliveryDate: {
    type: Date
  },
  shipper: {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    address: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    postalCode: {
      type: Number
    },
    country: {
      type: String
    }
  },
  receiver: {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    address: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    postalCode: {
      type: Number
    },
    country: {
      type: String
    }
  },
  edgeDevices: {
    temperature: {
      optValue: {
        type: Number
      },
      errorMargin: {
        type: Number
      }
    },
    pressure: {
      optValue: {
        type: Number
      },
      errorMargin: {
        type: Number
      }
    },
    vibration: {
      optValue: {
        type: Number
      },
      errorMargin: {
        type: Number
      }
    }
  },
  legs: [
    {
      address: {
        type: String
      },
      arrivalDate: {
        type: Date
      },
      departureDate: {
        type: Date
      },
      vehicleOperator: {
        type: String
      }
    }
  ]
});

module.exports = mongoose.model('shipments', ShipmentSchema);
