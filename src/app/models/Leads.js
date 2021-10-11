const {Model, Sequelize} = require('sequelize');

class Leads extends Model {
    static init(sequelize) {
        super.init({
            plan_id: Sequelize.INTEGER,
            client_name: Sequelize.STRING,
            client_cpf: Sequelize.STRING,
            client_address: Sequelize.STRING,
            client_cep: Sequelize.STRING,
            client_picture: Sequelize.STRING
        },
        {
            sequelize,
        })
        return this;
    }
}

module.exports = Leads;