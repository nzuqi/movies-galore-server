const { RESTDataSource } = require('apollo-datasource-rest');

class ShowsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://api.tvmaze.com/';
  }
}

module.exports = ShowsAPI;