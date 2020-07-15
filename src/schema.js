const { gql } = require('apollo-server');

const typeDefs = gql`
    type Show {
        id: ID!,
        name: String!,
        type: String,
        language: String,
        genres: [String],
        url: String,
        status: String,
        premiered: String,
        officialSite: String,
        rating: Float,
        image_medium: String,
        image_original: String,
        summary: String,
        updated: Int,
        episodes: [Episodes],
        cast: [Cast],
        crew: [Crew]
    }

    type Episodes {
        id: ID!,
        name: String!,
        season: Int,
        number: Int,
        airdate: String,
        airtime: String,
        airstamp: String,
        runtime: Float,
        image_medium: String,
        image_original: String,
        summary: String
    }

    type Cast {
        id: ID!,
        name: String!,
        country_name: String,
        country_code: String,
        birthday: String,
        deathday: String,
        gender: String,
        image_medium: String,
        image_original: String
    }

    type Crew {
        id: ID!,
        name: String!,
        type: String,
        country_name: String,
        country_code: String,
        birthday: String,
        deathday: String,
        gender: String,
        image_medium: String,
        image_original: String
    }

    type Query {
        shows(searchQuery: String):                                 [Show]
        show(showId: Int):                                              Show
    }
`;

module.exports = typeDefs;