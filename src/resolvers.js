module.exports = {
    Query: {
        show: async (_, { showId }, { dataSources }) =>
            dataSources.showsAPI.getShowById({ showId: showId }),

        shows: async (_, { pageId, searchQuery }, { dataSources }) => 
            (searchQuery) ? dataSources.showsAPI.searchShows({ searchQuery: searchQuery }) : dataSources.showsAPI.getAllShows({ pageId: pageId }),

        favorites: async (_, { userId, showId }, { dataSources }) => {
            const showIds = (showId) ? await dataSources.usersAPI.getAllFavorites({ userId, showId }) : await dataSources.usersAPI.getAllFavorites({ userId })
            var _showIds = [];
            showIds.forEach(e => {
                _showIds.push(Number(e.show_id));
            });
            const shows = await dataSources.showsAPI.getAllFavorites({ showIds });
            return shows;
        },

        towatch: async (_, { userId, showId }, { dataSources }) => {
            const showIds = (showId) ? await dataSources.usersAPI.getAllToWatch({ userId, showId }) : await dataSources.usersAPI.getAllFavorites({ userId })
            const shows = await dataSources.showsAPI.getAllToWatch({ showIds });
            return shows;
        },
    },

    Mutation: {
        addFavorite: async (_, { userId, showId }, { dataSources }) => {
            const response = await dataSources.usersAPI.addFavorite({ userId, showId });
            return {
                response_code: response.response_code,
                description: response.description
            }
        },

        addToWatch: async (_, { userId, showId }, { dataSources }) => {
            const response = await dataSources.usersAPI.addToWatch({ userId, showId });
            return {
                response_code: response.response_code,
                description: response.description
            }
        },

        addComment: async (_, { userId, showId, comment }, { dataSources }) => {
            const response = await dataSources.usersAPI.addComment({ userId, showId, comment });
            return {
                response_code: response.response_code,
                description: response.description
            }
        },
    }
}