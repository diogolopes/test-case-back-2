const conn = require('../../config/index')
const { QueryTypes } = require('sequelize');
var validator = require('validator')
const dirfService = require('../service/dirf_service')
const queries = require('../../database/queries')
const requestDirfAnos = require('../service/request_dirf_anos')
const requestDirfGerar = require('../service/request_dirf_gera_json')
const gerarPDF_PF = require('../pdf_builder/generate_pdf_from_html_PF')

exports.dirf_get_teste = function (req, res) {
    res.status(200).send("TESTE")
}


exports.dirf_post_teste = function (req, res) {

    console.log(req.body)
    const dado = conn.query("SELECT * FROM GDRVNDCNL_DTB", { type: QueryTypes.SELECT, nest: true });
    console.log(dado)

    dado.then(function (t) {
        console.log('sdfasdfasd')
        res.send(t)
    })
};

/**
 * Controller/Request Handler consulta contribuinte
 * 
 * @param {Request} req Request da API
 * @param {Response} res Response da API
 * @returns {Response}
 */
//POST - consulta contribuinte
exports.dirf_post_consulta_contribuinte = function (req, res) {

    console.log("########################################")
    console.log("Consulta contribuinte")
    console.log("########################################")

    const cpfCliente = req.body.cpf
    const unidade = req.body.unidade
    const nome = req.body.nome
    const cnpj = req.body.cnpj
    const matricula = req.body.matricula
    const protocolo = req.body.protocolo
    const nif = req.body.nif
    const dtInicial = req.body.dataInicial
    const dtFinal = req.body.dataFinal

    if (unidade == undefined || (cpfCliente == undefined && cnpj == undefined) || dtInicial == undefined || dtFinal == undefined) {
        return res.status(400).send("Parametro obrigatório não informado")
    }

    if (cpfCliente && !validator.isNumeric(cpfCliente)) {
        return res.status(400).send("O campo CPF deve ser numérico")
    }


    const ret = conn.query(queries.consulta_clientes(cpfCliente, unidade, nome, cnpj, matricula, protocolo, nif, dtInicial, dtFinal),
        { type: QueryTypes.SELECT, nest: true })

    ret.then(function (t) {
        console.log('Consulta contribuinte executado com sucesso')
        res.send(t)
    })
};

/**
 * Controller/Request Handler detalhar contribuinte
 * 
 * @param {Request} req Request da API
 * @param {Response} res Response da API
 * @returns {Response}
 */

//POST - detalhar contribuinte
exports.dirf_post_detalhar_contribuinte = function (req, res) {

    console.log("########################################")
    console.log("Detalhar contribuinte")
    console.log("########################################")

    console.log("Nome do contribuinte consultado --> " + req.body.nome + " - " + "CPF - " + req.body.cpf)

    const unidade = req.body.unidade
    const cpfContribuinte = req.body.cpf
    const cnpjContribuinte = req.body.cnpj
    const nomeContribuinte = req.body.nome

    if (unidade == undefined || nomeContribuinte == undefined || (cpfContribuinte == undefined && cnpjContribuinte == undefined)) {
        return res.status(400).send({ error: "Campo obrigatorio nao informado" })
    }

    if (cpfContribuinte && !validator.isNumeric(cpfContribuinte)) {
        return res.status(400).send({ error: "O campo CPF do contribuinte deve ser numérico" })
    }

    const ret = conn.query(queries.detalhar_contribuinte(unidade, cpfContribuinte, cnpjContribuinte, nomeContribuinte), { type: QueryTypes.SELECT, nest: true })

    ret.then(function (t) {
        console.log('Sucesso na query detalhar')

        if (t.length == 0) {
            res.send("Nao existe contribuinte com o ID consultado")
        } else {
            res.send(t)
        }
    })
}

/**
 * Controller/Request Handler atualizar contribuinte
 * 
 * @param {Request} req Request da API
 * @param {Response} res Response da API
 * @returns {Response}
 */
//PUT - atualizar cliente
exports.dirf_put_atualizar_contribuinte = function (req, res) {

    console.log("########################################")
    console.log("Atualizar contribuinte")
    console.log("########################################")

    console.log("ID do cliente a ser atualizado --> " + req.params.id)
    const idCliente = req.params.id

    //VALIDACOES
    if (!validator.isNumeric(idCliente)) {
        return res.status(400).send({ error: "O campo ID do cliente deve ser numérico" })
    }

    const ret = conn.query(queries.detalhar_cliente(idCliente), { type: QueryTypes.SELECT, nest: true })

    ret.then(function (t) {

        if (t.length == 0) {
            return res.status(400).send({ error: "Nao existe cliente com o ID consultado" })
        }

        console.log('Cliente pode ser atualizado')

    })

    //ATUALIZANDO
    let updated = dirfService.updateCliente(idCliente, req)

    updated.then(registrosAtualizados => {
        console.log("Atualizou registros --> " + registrosAtualizados)

        const updatedCliente = conn.query(queries.detalhar_cliente(idCliente), { type: QueryTypes.SELECT, nest: true })

        updatedCliente.then(function (t) {
            res.send(t)
        })

    }).catch(err => {
        console.log({ Erro: "Erro ao atualizar registro --> " + err })
        return res.status(500).send({ error: "Erro ao atualizar registro" + err })

    })
}

//POST - consultar movimentos
exports.dirf_post_movimentos = function (req, res) {

    console.log("########################################")
    console.log("Consulta movimentos")
    console.log("########################################")

    const cpfCliente = req.body.cpf
    const tipoConsulta = req.body.tipoConsulta
    const nome = req.body.nome
    const unidade = req.body.unidade
    let dtInicial = req.body.dtInicial
    let dtFinal = req.body.dtFinal


    console.log("Consulta movimentacao => " + cpfCliente + " - tipo = " + tipoConsulta + " DataInicial = " + dtInicial + " DataFinal = " + dtFinal)

    if (tipoConsulta != "S" && tipoConsulta != "A") {
        return res.status(400).send({ error: "Parametro de tipo de relatorio não especificado ou inválido" })
    }

    if (dtInicial == undefined || dtFinal == undefined) {
        return res.status(400).send({ error: "Data Inicial ou Data Final não informada" })
    }

    if (cpfCliente && !validator.isNumeric(cpfCliente)) {
        return res.status(400).send({ error: "O campo CPF deve ser numérico" })
    }

    const ret = conn.query(queries.consulta_movimentacao(cpfCliente, tipoConsulta, dtInicial, dtFinal, nome, unidade), { type: QueryTypes.SELECT })

    ret.then(function (t) {
        console.log('Sucesso na query consulta movimento')
        res.send(t)
    })
}

//PUT - atualizar movimentos
exports.dirf_put_atualizar_movimentos = async function (req, res) {

    console.log("########################################")
    console.log("Atualiza movimentos")
    console.log("########################################")

    console.log("ID da movimentacao a ser atualizada --> " + req.params.id)

    const idMovimentacao = req.params.id
    const nmUsuario = req.body.usuario


    //VALIDACOES
    if (!validator.isNumeric(idMovimentacao)) {
        return res.status(400).send({ error: "O campo ID da movimentacao deve ser numérico" })
    }

    const validaMovimentacao = conn.query(queries.valida_movimentacao(idMovimentacao), { type: QueryTypes.SELECT, nest: true })

    validaMovimentacao.then(function (t) {

        if (t.length == 0) {
            return res.status(400).send({ error: "Nao existe movimento com o ID consultado" })
        }
    })

    const getUsuario = await conn.query(queries.get_gdrusucad(nmUsuario), { type: QueryTypes.SELECT })

    if (getUsuario.length == 0) {
        return res.status(400).send({ error: "Nao existe usuario na GDRUSUCAD com o nome informado" })
    }

    let idUsuario = getUsuario[0].ID_USR

    console.log("Movimento pode ser atualizado");

    //ATUALIZANDO

    try {

        let updated = dirfService.updateMovimento(idMovimentacao, idUsuario, req)

        updated.then(function (t) {

            if (t instanceof Error) {
                console.log(updated)
                console.log("PASSOU instanceof")
                return res.status(400).send({ error: "" + t })

            } else {

                const ret = conn.query(queries.detalhar_movimentacao(idMovimentacao), { type: QueryTypes.SELECT })

                ret.then(function (t) {
                    console.log('Sucesso na query detalhar movimento')
                    return res.send(t)
                })
            }

        }).catch(err => {
            console.log({ Erro: "Erro ao atualizar registro --> " + err })
            return res.status(500).send({ error: "Erro ao atualizar registro - " + err })

        })

    } catch (err) {
        console.log("erro " + err)
        res.status(500).send({ error: "Erro interno - " + err })
    }

}

//PUT - consultar historico
exports.dirf_put_consultar_historico = function (req, res) {

    console.log("########################################")
    console.log("Consulta historico")
    console.log("########################################")

    res.send("Implementar consultar histórico")

}

//GET = consultar retencoes
exports.dirf_get_retencoes = function (req, res) {

    console.log("########################################")
    console.log("Consulta retencoes")
    console.log("########################################")

    const ret = conn.query(queries.consulta_retencao(), { type: QueryTypes.SELECT })

    ret.then(function (t) {
        console.log('Consulta retencao executado com sucesso')
        res.send(t)
    })
}

//GET = consultar extensoes
exports.dirf_get_extensoes = function (req, res) {

    console.log("########################################")
    console.log("Consulta extensoes")
    console.log("########################################")

    const nrRetencao = req.query['nrRetencao']

    const ret = conn.query(queries.consulta_extensao(nrRetencao),
        { type: QueryTypes.SELECT, nest: true })

    ret.then(function (t) {
        console.log('Consulta extensao executado com sucesso')
        res.send(t)
    })
}

//GET = consultar verbas
exports.dirf_get_verbas = function (req, res) {

    console.log("########################################")
    console.log("Consulta enquadramento")
    console.log("########################################")

    const nrRetencao = req.query['nrRetencao']
    const nrExtensao = req.query['nrExtensao']

    if (nrRetencao == undefined) {
        return res.status(400).send({ error: "Retencao não informada" })
    }

    if (nrExtensao == undefined) {
        return res.status(400).send({ error: "Extensao não informada" })
    }

    const ret = conn.query(queries.consulta_enquadramento(nrRetencao, nrExtensao),
        { type: QueryTypes.SELECT, nest: true })

    ret.then(function (t) {
        console.log('Consulta enquadramento executado com sucesso')
        res.send(t)
    })

}

//GET unidade
exports.dirf_get_unidades = function (req, res) {

    console.log("########################################")
    console.log("Consulta unidades")
    console.log("########################################")

    const ret = conn.query(queries.consulta_unidade_negocio(),
        { type: QueryTypes.SELECT, nest: true })

    ret.then(function (t) {
        console.log('Consulta unidade de negocio executado com sucesso')
        res.send(t)
    })
}

//GET matriculas
exports.dirf_get_matriculas = function (req, res) {

    console.log("########################################")
    console.log("Consulta matriculas")
    console.log("########################################")

    idEntidade = req.query['id']

    if (!idEntidade) {
        return res.status(400).send({ error: "ID não informado" })
    }

    const ret = conn.query(queries.get_matriculas(idEntidade), { type: QueryTypes.SELECT })

    ret.then(function (t) {
        console.log('Consulta matriculas executado com sucesso')
        res.send(t)
    })

}

//POST
exports.dirf_post_inserir_movimentos = async function (req, res) {

    console.log("########################################")
    console.log("Insere movimento")
    console.log("########################################")

    const nmUsuario = req.body.usuario

    //VALIDACOES

    const getUsuario = await conn.query(queries.get_gdrusucad(nmUsuario), { type: QueryTypes.SELECT })

    if (getUsuario.length == 0) {
        return res.status(400).send({ error: "Nao existe usuario na GDRUSUCAD com o nome informado" })
    }

    let idUsuario = getUsuario[0].ID_USR

    console.log(idUsuario)


    //INSERE

    try {

        let inserted = dirfService.insereMovimento(idUsuario, req)

        inserted.then(function (t) {

            if (t instanceof Error) {
                console.log(inserted)
                console.log("PASSOU instanceof")
                return res.status(400).send({ error: "" + t })

            } else {
                //console.log(t)
                return res.send({ success: "Inserido com sucesso" })
            }

        }).catch(err => {
            console.log({ Erro: "Erro ao inserir registro --> " + err })
            return res.status(500).send({ error: "Erro ao inserir registro - " + err })
        })

    } catch (err) {
        console.log("erro " + err)
        res.status(500).send({ error: "Erro interno - " + err })
    }
}

exports.dirf_get_anos = async function (req, res) {

    const cpfContribuinte = req.params.cpf

    if (cpfContribuinte == undefined) {
        res.status(400).send({ error: "Parametro obrigatorio nao informado" })
    }

    if(cpfContribuinte.length < 11){
        return res.status(400).send({ error: "Quantidade de caracteres invalido para CPF - " + cpfContribuinte.length })
    }

    let ret = await requestDirfAnos.getAno(cpfContribuinte)

    if (ret instanceof Error) {
        console.log("PASSOU instanceof")
        return res.status(500).send({ error: "" + ret })
    }

    return res.send(ret)

}

exports.dirf_post_gerar = async function (req, res) {

    let cpfContribuinte = req.body.cpf
    let empresaId = req.body.empresaId
    let ano = req.body.ano

    if (cpfContribuinte == undefined || empresaId == undefined || ano == undefined) {
        res.status(400).send({ error: "Parametro obrigatorio nao informado" })
    }

    let ret = await requestDirfGerar.geraJson(cpfContribuinte, empresaId, ano)

    console.log(ret)

    if (ret instanceof Error) {
        console.log("PASSOU instanceof")
        return res.status(500).send({ error: "" + ret })
    }

    console.log(ret)
    return res.send(ret)
}

exports.dirf_post_gerar_pdf = async function (req, res) {

    let cpfContribuinte = req.body.cpf
    let empresaId = req.body.empresaId
    let ano = req.body.ano
    let cnpj = req.body.cnpj

    //INACREDITAVEL MAS OS SERVICOS DOS BUS RECEBEM CPF E CNPJ COMO CPF
    if (cpfContribuinte == undefined && cnpj) {
        cpfContribuinte = cnpj
    }

    if (cpfContribuinte == undefined || empresaId == undefined || ano == undefined) {
       return res.status(400).send({ error: "Parametro obrigatorio nao informado" })
    }

    if(cpfContribuinte.length < 11){
        return res.status(400).send({ error: "Quantidade de caracteres invalido para CPF - " + cpfContribuinte.length })
    }

    let retJSON = await requestDirfGerar.geraJson(cpfContribuinte, empresaId, ano)

    if (retJSON instanceof Error) {
        console.log("PASSOU instanceof")
        return res.status(500).send({ error: "" + retJSON })
    }

    //console.log(retJSON[0].dataCabecalho)
    console.log(retJSON)


    if (retJSON == undefined) {
        //SEM DADOS PARA GERACAO DO INFORME
        return res.status(204).send()
    }

    if (cpfContribuinte.length == 11) {
        //PF
        await gerarPDF_PF.generatePDFPessoaFisica(res, retJSON)
    } else {
        //PJ
    }

}