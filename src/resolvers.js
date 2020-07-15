module.exports = {
    Query: {
        show: async (_, { id }, { dataSources }) =>
            dataSources.showsAPI.getShowById({ id: id }),
        shows: async (_, __, { dataSources }) =>
            dataSources.showsAPI.getAllShows(),
    },
}