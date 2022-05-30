var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type City {
    id: ID
    name: String
    country: String
    coordinates: Coordinates
    temperature: Period
  }
  
  type Coordinates {
    lon: Float
    lat: Float
  }

  type Period {
      today: Temperature
      next7Days: [FutureTemperature]
  }
  
  type Temperature {
    actual: Float
    min: Float
    max: Float
  }

  type FutureTemperature {
    min: Float
    max: Float
  }

  type Query {
    getCityByName(name: String!, country: String): City
  }

`);

function getCityByName({name}) {
    if (name == 'Belo Horizonte'){
        return {
            id: 1,
            name: name,
            country: "BR",
            coordinates: {
                lat: -19.9208,
                lon: -43.9378
            },
            temperature: {
                today: {
                    actual: 17.82,
                    min: 12.00,
                    max: 20.00
                },
                next7Days: [
                    {
                        min: 13.00,
                        max: 27.00
                    },
                    {
                        min: 13.00,
                        max: 29.00
                    },
                    {
                        min: 14.00,
                        max: 30.00
                    },
                    {
                        min: 15.00,
                        max: 29.00
                    },
                    {
                        min: 16.00,
                        max: 29.00
                    },
                    {
                        min: 17.00,
                        max: 26.00
                    },
                    {
                        min: 16.00,
                        max: 23.00
                    },
                ]
            }
        }
    } else if (name == 'Mariana'){
        return {
            id: 2,
            name: name,
            country: "BR",
            coordinates: {
                lat: -20.3778,
                lon: -43.4161
            },
            temperature: {
                today: {
                    actual: 17.82,
                    min: 11.00,
                    max: 26.00
                },
                next7Days: [
                    {
                        min: 11.00,
                        max: 28.00
                    },
                    {
                        min: 12.00,
                        max: 29.00
                    },
                    {
                        min: 13.00,
                        max: 28.00
                    },
                    {
                        min: 14.00,
                        max: 28.00
                    },
                    {
                        min: 15.00,
                        max: 25.00
                    },
                    {
                        min: 14.00,
                        max: 23.00
                    },
                    {
                        min: 12.00,
                        max: 22.00
                    }
                ]
            }
        }
    } else {
        return {
            id: 3,
            name: name,
            country: null,
            coordinates: {
                lat: null,
                lon: null
            },
            temperature: {
                today: {
                    actual: null,
                    min: null,
                    max: null
                },
                next7Days: []
            }
        }
    }
};

// The root provides the top-level API endpoints
var root = {
  getCityByName: (name) => {
    return getCityByName(name)
  }
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');