const { RESTDataSource } = require('apollo-datasource-rest');
const fetch = require('node-fetch');

class UsersAPI extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = 'https://martin.co.ke/mvg/api/';
    }

    async getAllComments({ userId, showId = 0 }) {
        const _data = {
            user_id: userId
        };
        if(showId != 0) _data['show_id'] = showId;
        var response;
        await fetch(this.baseURL + "get_comments", {
            method: 'POST',
            body: JSON.stringify(_data)
        }).then(res => res.json()).then(json => response = json);
        return response.data.comments;
    }

    async addComment({ userId, showId, comment }) {
        const _data = { 
            user_id: userId, 
            show_id: showId, 
            comment: comment 
        };
        var response;
        await fetch(this.baseURL + "add_comment", {
            method: 'POST',
            body: JSON.stringify(_data)
        }).then(res => res.json()).then(json => response = json);
        return response;
    }

    async deleteComment({ id }) {
        const _data = { 
            id: id
        };
        var response;
        await fetch(this.baseURL + "delete_comment", {
            method: 'POST',
            body: JSON.stringify(_data)
        }).then(res => res.json()).then(json => response = json);
        return response;
    }

    async getAllFavorites({ userId, showId = 0 }) {
        const _data = {
            user_id: userId
        };
        if(showId != 0) _data['show_id'] = showId;
        
        var response;
        await fetch(this.baseURL + "get_favorites", {
            method: 'POST',
            body: JSON.stringify(_data)
        }).then(res => res.json()).then(json => response = json);
        return response.data.shows;
    }

    async addFavorite({ userId, showId }) {
        const _data = { 
            user_id: userId, 
            show_id: showId
        };
        var response;
        await fetch(this.baseURL + "add_favorite", {
            method: 'POST',
            body: JSON.stringify(_data)
        }).then(res => res.json()).then(json => response = json);
        return response;
    }

    async deleteFavorite({ id }) {
        const _data = { 
            id: id
        };
        var response;
        await fetch(this.baseURL + "delete_favorite", {
            method: 'POST',
            body: JSON.stringify(_data)
        }).then(res => res.json()).then(json => response = json);
        return response;
    }

    async getAllToWatch({ userId, showId = 0 }) {
        const _data = {
            user_id: userId
        };
        if(showId != 0) _data['show_id'] = showId;
        var response;
        await fetch(this.baseURL + "get_to_watch", {
            method: 'POST',
            body: JSON.stringify(_data)
        }).then(res => res.json()).then(json => response = json);
        return response.data.shows;
    }

    async addToWatch({ userId, showId }) {
        const _data = { 
            user_id: userId, 
            show_id: showId
        };
        var response;
        await fetch(this.baseURL + "add_towatch", {
            method: 'POST',
            body: JSON.stringify(_data)
        }).then(res => res.json()).then(json => response = json);
        return response;
    }

    async deleteToWatch({ id }) {
        const _data = { 
            id: id
        };
        var response;
        await fetch(this.baseURL + "delete_towatch", {
            method: 'POST',
            body: JSON.stringify(_data)
        }).then(res => res.json()).then(json => response = json);
        return response;
    }

}

module.exports = UsersAPI;