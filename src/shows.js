const { RESTDataSource } = require('apollo-datasource-rest');

class ShowsAPI extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = 'http://api.tvmaze.com/';
    }

    showsReducer(show, metadata = false) {
        let _episodes = [];
        let _cast = [];
        let _crew = [];

        if(metadata) {
            if(show._embedded.episodes) {
                show._embedded.episodes.forEach(episode => {
                    _episodes.push({
                        id: episode.id,
                        name: episode.name,
                        season: episode.season,
                        number: episode.number,
                        airdate: episode.airdate,
                        airtime: episode.airtime,
                        airstamp: episode.airstamp,
                        runtime: episode.runtime,
                        image_medium: (episode.image) ? episode.image.medium : 'assets/no-image.png',
                        image_original: (episode.image) ? episodeimage.original : 'assets/no-image.png',
                        summary: episode.summary
                    });
                });
            }
            if(show._embedded.cast) {
                show._embedded.cast.forEach(cast => {
                    _cast.push({
                        id: cast.person.id,
                        name: cast.person.name,
                        country_name: (cast.person.country) ? cast.person.country.name : '',
                        country_code: (cast.person.country) ? cast.person.country.code : '',
                        birthday: cast.person.birthday,
                        deathday: cast.person.deathday,
                        gender: cast.person.gender,
                        image_medium: (cast.person.image) ? cast.person.image.medium : 'assets/no-image.png',
                        image_original: (cast.person.image) ? cast.person.image.original : 'assets/no-image.png'
                    });
                });
            }
            if(show._embedded.crew) {
                show._embedded.crew.forEach(crew => {
                    _crew.push({
                        id: crew.person.id,
                        name: crew.person.name,
                        type: crew.type,
                        country_name: (crew.person.country) ? crew.person.country.name : '',
                        country_code: (crew.person.country) ? crew.person.country.code : '',
                        birthday: crew.person.birthday,
                        deathday: crew.person.deathday,
                        gender: crew.person.gender,
                        image_medium: (crew.person.image) ? crew.person.image.medium : 'assets/no-image.png',
                        image_original: (crew.person.image) ? crew.person.image.original : 'assets/no-image.png'
                    });
                });
            }
        }

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
            rating: (show.rating) ? show.rating.average : null,
            image_medium: (show.image) ? show.image.medium : 'assets/no-image.png',
            image_original: (show.image) ? show.image.original: 'assets/no-image.png',
            summary: show.summary,
            updated: show.updated,
            episodes: _episodes,
            cast: _cast,
            crew: _crew,
        };
    }

    async getAllShows() {
        const response = await this.get('shows');
        return Array.isArray(response)
            ? response.map(shows => this.showsReducer(shows))
            : [];
    }

    async getShowById({ showId }) {
        const response = await this.get('shows/' + showId + '?embed[]=episodes&embed[]=cast&embed[]=crew');
        return this.showsReducer(response, true);
    }

    async searchShows({ searchQuery }) {
        const response = await this.get('search/shows?q=' + searchQuery);
        return Array.isArray(response)
            ? response.map(shows => this.showsReducer(shows.show))
            : [];
    }

}

module.exports = ShowsAPI;