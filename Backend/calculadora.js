'use strict'

let params = process.argv.slice(2);

let num1 = parseFloat(params[0]);
let num2 = parseFloat(params[1]);

let plantilla = `
La Suma es: ${num1 + num2}
La Resta es: ${num1 - num2}
La Multiplicacion es: ${num1 * num2}
La Division es: ${num1 / num2}
`;

console.log(plantilla);