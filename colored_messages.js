const chalk = require('chalk')

function redMessage(msg) {
  console.log(chalk.bold.inverse.red(msg))
}

function greenMessage(msg) {
  console.log(chalk.bold.inverse.green(msg))
}

function invertedMessage(msg) {

  console.log(chalk.inverse(msg))
}

function greenText(msg) {
  console.info(chalk.green(msg))
}

module.exports = {
  redMessage,
  greenMessage,
  invertedMessage,
  greenText,
}