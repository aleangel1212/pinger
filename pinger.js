const axios = require('axios')
const chalk = require('chalk')

class Pinger {
  constructor({ url, interval = 1000 }) {
    if (!url) throw Error('Please provide a url for the Pinger to ping')

    this.url = url
    this.interval = interval
  }

  ping(message) {
    console.log(chalk.yellow('Attempting to send message:'))
    console.log(message)
    // Send message to the given configured url
    axios
      .post(this.url, { message })
      .then(res => console.log(chalk.green('OK')))
      .catch(error => console.log(chalk.red('ERR', error)))

    // Update message if an update function is provided
    const nextMessage = this.updateFunction ? this.updateFunction(message) : message

    // Recursivley call ping function again after the configured amount of time has passed
    setTimeout(() => this.ping(nextMessage), this.interval)
  }

  setUpdateFunction(updateFunction) {
    this.updateFunction = updateFunction
  }
}

module.exports = { Pinger }
