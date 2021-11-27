const { getIntParams, soma } = require("./utils")

var a = getIntParams(1)
var b = getIntParams(2)

var res = soma(a, b)

console.log("Resultado: ", res)