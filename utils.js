const convertStringToPayload = payloadString => {
  const tokens = payloadString.split(',')

  return {
    time: tokens[0],

    altitude: parseFloat(tokens[1], 10),
    lat: parseFloat(tokens[2], 10),
    long: parseFloat(tokens[3], 10),

    satelliteNum: parseInt(tokens[4], 10),
    ascentRate: parseFloat(tokens[5], 10),

    primaryRail: {
      amps: parseFloat(tokens[6], 10),
      volts: parseFloat(tokens[7], 10)
    },

    auxRail: {
      amps: parseFloat(tokens[8], 10),
      volts: parseFloat(tokens[9], 10)
    },

    heater: {
      amps: parseFloat(tokens[10], 10),
      temp: parseFloat(tokens[11], 10)
    },

    signalStrength: parseFloat(tokens[12], 10),
    xb: tokens[13],

    fireAttempts: parseInt(tokens[14], 10)
  }
}

const convertPayloadToString = payload => {
  const data = [
    payload.time,
    payload.altitude,
    payload.lat,
    payload.long,
    payload.satelliteNum,
    payload.ascentRate,
    payload.primaryRail.amps,
    payload.primaryRail.volts,
    payload.auxRail.amps,
    payload.auxRail.volts,
    payload.heater.amps,
    payload.heater.temp,
    payload.signalStrength,
    payload.xb,
    payload.fireAttempts
  ]

  return data.join(',')
}

module.exports = {
  convertStringToPayload,
  convertPayloadToString
}
