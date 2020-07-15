module.exports = {
    Query: {
        show: async (_, { id }, { dataSources }) =>
            dataSources.showsAPI.getShowById({ showId: id }),
        shows: async (_, { searchQuery }, { dataSources }) => 
            (searchQuery) ? dataSources.showsAPI.searchShows({ searchQuery: searchQuery }) : dataSources.showsAPI.getAllShows(),
    },
}