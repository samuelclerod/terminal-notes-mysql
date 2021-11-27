const { question } = require('readline-sync')

const nota1 = parseFloat(question("qual primeira nota? "))
const nota2 = parseFloat(question("qual segunda nota? "))

const media = (nota1 + nota2) / 2

if (media >= 7) {
  console.log(`Aluno aprovado com média ${media.toFixed(2)}`)
} else {
  console.log(`O aluno com média ${media.toFixed(2)} não foi aprovado`)
}
