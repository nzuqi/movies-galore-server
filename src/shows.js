const { RESTDataSource } = require('apollo-datasource-rest');

class ShowsAPI extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = 'http://api.tvmaze.com/';
    }

    showsReducer(show) {
        return {
            id: show.id || 0,
            name: show.name,
            type: show.type,
            language: show.language,
            genres: show.genres,
            url: show.url,
            status: show.status,
            premiered: show.premiered,
            officialSite: show.officialSite,
            rating: show.rating.average,
            image_medium: show.image.medium,
            image_original: show.image.original,
            summary: show.summary,
            updated: show.updated
        };
    }

    async getAllShows() {
        const response = await this.get('shows');
        return Array.isArray(response)
            ? response.map(shows => this.showsReducer(shows))
            : [];
    }

    async getShowById({ showId }) {
        const response = await this.get('shows/' + showId);
        return this.showsReducer(response);
    }

    async searchShows({ searchQuery }) {
        const response = await this.get('search/shows?q=' + searchQuery);
        return Array.isArray(response)
            ? response.map(shows => this.showsReducer(shows))
            : [];
    }

}

module.exports = ShowsAPI;