
const Plan = require('../models/internetPlans')

class internetPlansController {
    async store(request, response) {
        try {
            const planExists = await Plan.findOne({ where: { name: request.body.name } })

            if (planExists) {
                return response.status(400).send({ error: "Plan already exists" })
            }
            const { id, name, description, price } = await Plan.create(request.body)
            return response.status(201).json({
                statusCode: 201,
                data: {
                    id: id,
                    name: name,
                    description: description,
                    price: price,
                }
            })

        } catch (error) {
            return response.status(500).json({
                statusCode: 500,
                message: "Somethin went wrong"
            });
        }
    }

    async update(request, response) {
        try {
            const { id, name } = request.body

            const plan = await Plan.findByPk(id);

            if (name !== plan.name) {
                const planExists = await Plan.findOne({ where: { name } })

                if (planExists) {
                    return response.status(400).send({
                        statusCode: 400,
                        error: "Plan already exists"
                    })
                }
            }

            const { description, price } = await plan.update(request.body)

            return response.status(201).json({
                statusCode: 201,
                data: {
                    id: id,
                    name: name,
                    description: description,
                    price: price
                }
            })
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                statusCode: 500,
                message: "Somethin went wrong"
            });
        }
    }

    async list(request, response) {
        try {
            const plans = await Plan.findAll();
            return response.status(200).json({
                statusCode: 200,
                data: plans
            });
        } catch (error) {
            return response.status(500).json({
                statusCode: 500,
                error: "Somethin went wrong"
            })
        }
    }

    async get(request, response) {
        const { id } = request.params;
        try {
            const plan = await Plan.findByPk(id);
            if (!plan) {
                return response.status(404).json({
                    statusCode: 404,
                    error: "Plan not found"
                });
            }

            return response.status(200).json({
                statusCode: 200,
                data: plan
            });
        } catch (error) {
            return response.status(500).json({
                statusCode: 500,
                error: "Somethin went wrong"
            })
        }
    }

    async delete(request, response){
        const {id} = request.params;
        try {
            const plan = await Plan.findByPk(id);
            if(!plan){
                return response.status(404).json({
                    statusCode: 404,
                    error: "Plan not found"
                });
            }
            await plan.destroy();
            return response.status(200).json({
                statusCode: 200,
                message: "Plan successfully destroyed"
            });
        } catch (error) {
            return response.status(500).json({
                statusCode: 500,
                error: "Somethin went wrong"
            })
        }
    }
}

module.exports = new internetPlansController()