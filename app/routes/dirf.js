var express = require('express');
var router = express.Router();

// Require controller modules.
var dirf_controller = require('../controllers/dirf_controller');

//GET - teste
router.get('/teste', dirf_controller.dirf_get_teste)

//POST - rota de teste de conexão com o banco vi sequelize
router.post('/teste', dirf_controller.dirf_post_teste);

//POST - consulta contribuintes
router.post('/contribuintes', dirf_controller.dirf_post_consulta_contribuinte);

//POST - detalhar contribuintes
router.post('/contribuintes/detalhes/', dirf_controller.dirf_post_detalhar_contribuinte);

//PUT - atualizar cliente
router.put('/contribuintes/:id', dirf_controller.dirf_put_atualizar_contribuinte);

//POST consultar movimentos
router.post('/contribuintes/movimentos',dirf_controller.dirf_post_movimentos);

//PUT - atualizar movimentos
router.put('/contribuintes/movimentos/:id', dirf_controller.dirf_put_atualizar_movimentos);

//POST - Inserir movimentos
router.post('/contribuintes/movimentos/novo', dirf_controller.dirf_post_inserir_movimentos);

//POST - consultar historico
router.put('/historicos', dirf_controller.dirf_put_consultar_historico);

//GET - consultar retencoes
router.get('/enquadramento/retencoes', dirf_controller.dirf_get_retencoes);

//GET - consultar extensoes
router.get('/enquadramento/extensoes', dirf_controller.dirf_get_extensoes);

//GET - consultar verbas
router.get('/enquadramento/verbas', dirf_controller.dirf_get_verbas);

//GET - consultar unidades de negocio
router.get('/contribuintes/unidades', dirf_controller.dirf_get_unidades);

//GET - consultar matriculas do contribuinte
router.get('/contribuintes/matriculas', dirf_controller.dirf_get_matriculas)

//GET - consultar anos informe de rendimentos
router.get('/informes/anos/:cpf', dirf_controller.dirf_get_anos)

//POST - GERA JSON INFORME
router.post('/informes/gerar', dirf_controller.dirf_post_gerar)

//POST - GERA PDF INFORME
router.post('/informes/gerar/pdf', dirf_controller.dirf_post_gerar_pdf)

module.exports = router;