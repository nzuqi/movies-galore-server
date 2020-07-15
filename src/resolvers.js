module.exports = {
    Query: {
        shows: async (_, __, { dataSources }) =>
            dataSources.showsAPI.getAllShows(),
    },
}