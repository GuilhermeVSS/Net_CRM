
const Leads = require('../models/Leads');
const Plan = require('../models/internetPlans');
const viaCep = require('../services/correios');

class internetPlansController {
    async store(request, response) {
        try {
            const leadExists = await Leads.findOne({ where: { client_cpf: request.body.client_cpf } })

            if (leadExists) {
                return response.status(400).send({ statusCode: 400, error: "Lead already exists" })
            }

            if (request.body.plan_id) {
                const planExists = await Plan.findByPk(request.body.plan_id);
                if (!planExists) {
                    return response.status(400).send({ statusCode: 400, error: "Plan does not exist" });
                }
            }

            try {
                const validCep = request.body.client_cep.replace(/[^0-9]/g, '');
                await viaCep.get(`/${validCep}/json`);
            } catch (error) {
                if (error.response && error.response.status == 400) {
                    return response.status(400).json({ statusCode: 400, error: "CEP invalid" });
                }
                return response.status(500).json({ statusCode: 500, error: "Something went wrong" });
            }

            const { id, plan_id, client_cpf, client_cep, client_name, client_address } = await Leads.create(request.body);

            return response.status(201).json({
                statusCode: 201,
                data: {
                    id: id,
                    client_name: client_name,
                    plan_id: plan_id,
                    client_address: client_address,
                    client_cpf: client_cpf,
                    client_cep: client_cep,
                }
            });
        } catch (error) {
            return response.status(500).json({ statusCode: 500, message: "Somethin went wrong" });
        }
    }

    async update(request, response) {
        try {
            const { id, client_cpf, client_cep } = request.body

            const lead = await Leads.findByPk(id);

            if (client_cpf !== lead.client_cpf) {
                const leadExists = await Leads.findOne({ where: { client_cpf } })

                if (leadExists) {
                    return response.status(400).send({ error: "Lead already exists" })
                }
            }
            if (client_cep != lead.client_cep) {
                try {
                    const validCep = client_cep.replace(/[^0-9]/g, '');
                    await viaCep.get(`/${validCep}/json`);
                } catch (error) {
                    if (error.response && error.response.status == 400) {
                        return response.status(400).json({ statusCode: 400, error: "CEP invalid" });
                    }
                    return response.status(500).json({ statusCode: 500, error: "Something went wrong" });
                }
            }

            const { plan_id, client_name, client_address } = await lead.update(request.body)

            return response.status(201).json({
                statusCode: 201,
                data: {
                    id: id,
                    client_name: client_name,
                    plan_id: plan_id,
                    client_address: client_address,
                    client_cpf: client_cpf,
                    client_cep: client_cep,
                }
            });
        } catch (error) {
            return response.status(500).json({ message: "Something went wrong" });
        }
    }

    async list(request, response) {
        try {
            const leads = await Leads.findAll();
            return response.status(200).json({
                statusCode: 200,
                data: leads
            })
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
            const lead = await Leads.findByPk(id);
            if (!lead) {
                return response.status(404).json({
                    statusCode: 404,
                    error: "Lead not found"
                });
            }
            return response.status(200).json({
                statusCode: 200,
                data: lead
            });
        } catch (error) {
            return response.status(500).json({
                statusCode: 500,
                error: "Somethin went wrong"
            })
        }
    }

    async delete(request, response) {
        const { id } = request.params;

        try {
            const lead = await Leads.findByPk(id);
            if (!lead) {
                return response.status(404).json({
                    statusCode: 404,
                    error: "Lead not found"
                });
            }
            await lead.destroy();
            return response.status(200).json({
                statusCode: 200,
                message: "Lead deleted successfully"
            });
        } catch (error) {
            return response.status(500).json({
                statusCode: 500,
                error: "Somethin went wrong"
            });
        }
    }

    async clientPicture(request, response) {
        try {
            const { filename: client_picture } = request.file;
            const { id } = request.params;
            let lead = await Leads.findByPk(id);
            if (lead) {
                const { id, client_name, client_cep, client_cpf, client_address } = await lead.update({ client_picture });
                return response.status(201).json({
                    statusCode: 201,
                    id,
                    client_cpf,
                    client_address,
                    client_cep,
                    client_name,
                    client_pictue: `files/${client_picture}`
                });
            }
            return response.status(404).json({
                statusCode: 404,
                error: "Lead not found"
            })
        } catch (error) {
            console.log(error);
            return response.status(500).json({ statusCode: 500, message: "Something went wrong" });
        }
    }
}

module.exports = new internetPlansController()