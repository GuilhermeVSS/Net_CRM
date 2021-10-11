const Sequelize = require('sequelize');
const databaseConfig = require('../config/database')
const User = require('../app/models/User');
const internetPlans = require('../app/models/internetPlans');
const Leads = require('../app/models/Leads');

const models = [User, internetPlans, Leads];


class Database {
    constructor(){
        this.init()
    }

    init(){
        this.connection = new Sequelize(databaseConfig)
        models.map(model => model.init(this.connection))
    }
}

module.exports = new Database()