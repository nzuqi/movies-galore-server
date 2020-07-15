module.exports = {
    Query: {
        show: async (_, { showId }, { dataSources }) =>
            dataSources.showsAPI.getShowById({ showId: showId }),
            
        shows: async (_, { pageId, searchQuery }, { dataSources }) => 
            (searchQuery) ? dataSources.showsAPI.searchShows({ searchQuery: searchQuery }) : dataSources.showsAPI.getAllShows({ pageId: pageId }),
    },
}