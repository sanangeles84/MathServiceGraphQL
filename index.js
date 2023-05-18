var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
// GraphQL schema
var schema = buildSchema(`
    type Query {
        sum(num1: Float!, num2: Float!): Result
        subtract(num1: Float!, num2: Float!): Result
        multiply(num1: Float!, num2: Float!): Result
        divide(num1: Float!, num2: Float!): Result
    },
    type Result {
        num1: Float
        num2: Float
        result:Float
    }
`);

var sumF = function(args) {
  return {
    num1 : parseFloat(args.num1),
    num2 : parseFloat(args.num2),
    result : parseFloat(args.num1) + parseFloat(args.num2)
    };
}
var subtractF = function(args) {
  return {
    num1 : parseFloat(args.num1),
    num2 : parseFloat(args.num2),
    result : parseFloat(args.num1) - parseFloat(args.num2)
    };
}
var multiplyF = function(args) {
  return {
    num1 : parseFloat(args.num1),
    num2 : parseFloat(args.num2),
    result : parseFloat(args.num1) * parseFloat(args.num2)
    };
}
var divideF = function(args) {
  return {
    num1 : parseFloat(args.num1),
    num2 : parseFloat(args.num2),
    result : parseFloat(args.num1) / parseFloat(args.num2)
    };
}
var root = {
    sum: sumF,
    subtract: subtractF,
    multiply: multiplyF,
    divide: divideF
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(5000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));


/*
https://mathservicegraphql--sanangeles.repl.co/graphQL
{
  sum(num1: 4, num2: 2) {
    num1
    num2
    result
  }
  subtract(num1: 4, num2: 2) {
    num1
    num2
    result
  }
  multiply(num1: 4, num2: 2) {
    num1
    num2
    result
  }
  divide(num1: 4, num2: 2) {
    num1
    num2
    result
  }
}

*/