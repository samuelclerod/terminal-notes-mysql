function soma(v1, v2) {
  return v1 + v2
}
function getIntParams(indice) {
  var pIndice = indice + 1
  return parseInt(process.argv[pIndice])
}

module.exports = { soma, getIntParams }

