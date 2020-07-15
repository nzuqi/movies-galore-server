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
        updated: Int
    }

    type Query {
        shows(searchQuery: String):                                 [Show]
        show(showId: Int):                                              Show
    }
`;

module.exports = typeDefs;