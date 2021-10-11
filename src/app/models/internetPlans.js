const {Model, Sequelize} = require('sequelize');

class internetPlans extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            description: Sequelize.STRING,
            price: Sequelize.INTEGER,
        },
        {
            sequelize,
        })
        return this;
    }
}

module.exports = internetPlans;