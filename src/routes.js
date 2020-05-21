const express = require("express");

const { celebrate, Segments, Joi } = require("celebrate");

const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

routes.post("/sessions", SessionController.create);

routes.get("/ongs", OngController.index);

routes.post(
    "/ongs",
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string()
                .required()
                .email(),
            whatsapp: Joi.string()
                .required()
                .min(10)
                .max(11),
            city: Joi.string()
                .required()
                .max(100),
            uf: Joi.string()
                .required()
                .length(2)
        })
    }),
    OngController.create
);
// para os headers a validação é adicionada no objects e para o host adiciona o unknown
routes.get(
    "/profile",
    celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string()
                .required()
                .length(8)
        }).unknown()
    }),
    ProfileController.index
);

routes.get(
    "/incidents",
    celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number()
        })
    }),
    IncidentController.index
);

routes.post(
    "/incidents",
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            title: Joi.string()
                .max(30)
                .required(),
            description: Joi.string()
                .max(300)
                .required(),
            value: Joi.number()
                .min(1)
                .max(10000)
                .required()
        }),
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string()
                .length(8)
                .required(),
            "content-type": Joi.string().required()
        }).unknown()
    }),
    IncidentController.create
);

//Passando params
routes.delete(
    "/incidents/:id",
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        }),
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string()
                .required()
                .length(8)
        }).unknown()
    }),
    IncidentController.delete
);

module.exports = routes;

// Importar o express para dentro do projeto
//Estou querendo acessar o recurso de usuários  '/users'
/**
 * Metodos HTTP
 *
 * GET: Buscar informações do meu back
 * POST: Criar uma informação no back
 * PUT: Alterar uma informação no back
 * DELETE: Apagar uma informação do meu back
 */

/**
 * Tipos de parâmetros
 *
 * Query Params: Parametros nomeados enviados na rota após "?"
 * Route Params: Identificar um único recurso depois da "/"
 * Request Body: Corpo da requisição utilizado para criar ou alterar recursos
 */

/**
 * Usar Query Builder: table('users').select('*').where('name=jorge')
 * vamos usar o KNEX.JS
 */
