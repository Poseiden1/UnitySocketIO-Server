// Basic Packages
var shortid = require('shortid');

module.exports = class Player {
    constructor(username = "Unknown") {
        this.username =  username;
        this.id = shortid.generate();
    }
}