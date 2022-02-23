const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLSchema,
  GraphQLInputObjectType,
} = require("graphql");
const axios = require("axios");
// Launch Type For Dashbord.
//Yaptigimiz uygulamaya gore  object typelar sekillenir.

const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: {
      type: GraphQLInt,
    },
    mission_name: {
      type: GraphQLString,
    },
    launch_year: {
      type: GraphQLString,
    },
    launch_date_local: {
      type: GraphQLString,
    },
    launch_success: {
      type: GraphQLBoolean,
    },
    rocket: {
      type: RocketType,
    },
  }),
});

//Rocket Type
const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: {
      type: GraphQLString,
    },
    rocket_name: {
      type: GraphQLString,
    },
    rocket_type: {
      type: GraphQLString,
    },
  }),
});

const inputLaunchType = new GraphQLInputObjectType({
  name: "LaunchInput",
  fields: {
    flight_number: {
      type: GraphQLInt,
    },
    mission_name: {
      type: GraphQLString,
    },
    launch_year: {
      type: GraphQLString,
    },
    launch_date_local: {
      type: GraphQLString,
    },
    launch_success: {
      type: GraphQLBoolean,
    },
  },
});

// Root Query. Just Like Endpoint

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v3/launches")
          .then((res) => res.data);
      },
    },
    launch: {
      type: LaunchType,
      args: {
        flight_number: {
          type: GraphQLInt,
        },
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
          .then((res) => res.data);
      },
    },
    rockets: {
      type: new GraphQLList(RocketType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v3/rockets")
          .then((res) => res.data);
      },
    },
    rocket: {
      type: RocketType,
      args: {
        flight_number: {
          type: GraphQLInt,
        },
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
          .then((res) => res.data);
      },
    },
  },
});

const MutationQuery = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addLaunch: {
      type: inputLaunchType, // ?
      args: {
        input: {type: inputLaunchType}
      }, 
      resolve: function (source, args) {
        console.log(args);
        return "sa";
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: MutationQuery
});
