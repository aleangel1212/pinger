const { Pinger } = require('./pinger')

const { convertStringToPayload, convertPayloadToString } = require('./utils')

const config = require('./config.json')

const formatTime = date => `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

const roundTo = (number, decimalPlaces) => parseFloat(number.toFixed(decimalPlaces))
const getRandomNumberInRange = ([min, max]) => Math.floor(Math.random() * (max - min + 1)) + min

const { deltas, maxValues } = config

// Divide by 111111 to convert meters to lat/long degrees
const updateLatitude = lat => roundTo(lat + getRandomNumberInRange(deltas.latRange) / 111111, 7)
const updateLongitude = long => roundTo(long + getRandomNumberInRange(deltas.longRange) / 111111, 7)
const updateAltitude = alt => {
  const nextValue = alt + getRandomNumberInRange(deltas.altRange)

  return nextValue > maxValues.altitude ? maxValues.altitude : nextValue
}

// Updates payload fields on every interval
const updatePayload = payload => ({
  ...payload,
  time: formatTime(new Date()),
  altitude: updateAltitude(payload.altitude),
  lat: updateLatitude(payload.lat),
  long: updateLongitude(payload.long)
})

const { url, interval } = config

const pinger = new Pinger({ url, interval })

pinger.setUpdateFunction(payloadString => {
  const payload = convertStringToPayload(payloadString)
  const updatedPayload = updatePayload(payload)

  return convertPayloadToString(updatedPayload)
})

const { initialPayload } = config

pinger.ping(convertPayloadToString({ ...initialPayload, time: formatTime(new Date()) }))
