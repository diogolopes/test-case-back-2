const conn = require('../../config/index')
const { DataTypes, Model } = require('sequelize');
const { QueryTypes } = require('sequelize');
const queries = require('../../database/queries')
const clienteModel = require('../models/LGLCADDDO_CAD_ENTG_LGL')
const enderecoModel = require('../models/LGLCADEND')
const movimentoModel = require('../models/LGLCTR_ENQ_TRN')

exports.updateCliente =  function  (idCliente, req) {

    console.log("Atualizando Cliente --> " + idCliente)    

    let valuesCliente = {}
    let valuesEndereco = {}

    for (i in req.body){

        if (i == "nome"){
            valuesCliente.nmCtbt = req.body.nome
        }

        if (i == "nascimento"){

            let dtNascimento = req.body.nascimento

            dtNascimento = dtNascimento.split('/')    
            dtNascimento = dtNascimento[2] + "-" + dtNascimento[1] + "-" + dtNascimento[0] + " 00:00:00"

            valuesCliente.dtNsc = new Date(dtNascimento)
        }

        if (i == 'logradouro' && req.body.logradouro){
            valuesEndereco.nmLgr = req.body.logradouro
        }

        if (i == 'numero' && req.body.numero){
            valuesEndereco.nrLgr = req.body.numero
        }

        if (i == 'bairro'){
            valuesEndereco.nmBro = req.body.bairro
        }

        if (i == 'cep'){
            valuesEndereco.nrCep = req.body.cep
        }

        if (i == 'cidade'){
            valuesEndereco.nmCde = req.body.cidade
        }

        if (i == 'estado'){
            valuesEndereco.idUf = req.body.estado
        }

    }    

    console.log(valuesCliente)
    console.log(valuesEndereco)

    const Cliente = clienteModel(conn,DataTypes)
    const Endereco = enderecoModel(conn,DataTypes)

           Endereco.update(valuesEndereco,{where:{idDdoCadEntgLgl:idCliente}})
    return Cliente.update(valuesCliente,{where:{idDdoCadEntgLgl:idCliente}})
                             
}

exports.updateMovimento = async function (idMovimento, idUsuario, req) {

    console.log("Atualizando movimento ID --> " + idMovimento)

    let valuesMovimento = {}
    let valuesUpdateMovimento = {}

    for (i in req.body){
        
        if (i == 'codigoRetencao'){
            valuesMovimento.codigoRetencao = req.body.codigoRetencao
        }

        if (i == 'codigoExtensao'){
            valuesMovimento.codigoExtensao = req.body.codigoExtensao
        }

        if (i == 'codigoVerba'){
            valuesMovimento.codigoVerba = req.body.codigoVerba
        }

        if (i == 'valor'){
            valuesMovimento.valor = req.body.valor
        }

        if (i == 'usuario'){
            valuesMovimento.usuario = req.body.usuario
        } 

        if (i == 'data')
        {

            let dtTransacao = req.body.data.split('/')
            dtTransacao = dtTransacao[2] + "-" + dtTransacao[1] + "-" + dtTransacao[0] + " 00:00:00"

            valuesMovimento.dtTrn = new Date(dtTransacao)
            
        }
    }

    
        const dado = await conn.query(queries.get_ID_VIN_RET_VRB_CPO_INF(valuesMovimento.codigoRetencao, valuesMovimento.codigoExtensao, valuesMovimento.codigoVerba), { type: QueryTypes.SELECT, nest: true });

        console.log(dado.length)

        if (dado.length == 0){
            return new Error("Nao foi possível definir o campo ID_VIN_RET_VRB_CPO_INF pelos dados de Retencao, Extensao e Verba")
        }

        valuesUpdateMovimento.idVinRetVrbCpoInf = dado[0].ID_VIN_RET_VRB_CPO_INF
        valuesUpdateMovimento.vlCpoInf = valuesMovimento.valor
        valuesUpdateMovimento.idUsrAlt = idUsuario
        valuesUpdateMovimento.dtUltAlt = conn.Sequelize.literal('CURRENT_TIMESTAMP')
        valuesUpdateMovimento.dtTrn = valuesMovimento.dtTrn

    //console.log(valuesUpdateMovimento)

    const Movimento = movimentoModel(conn, DataTypes)

    return Movimento.update(valuesUpdateMovimento,{where:{idCtrEnqTrn:idMovimento}, returning: true})   

}

exports.insereMovimento = async function(idUsuario,req){

    let valuesMovimento = {}
    let valuesInsereMovimento = {}

    let nrAnoTrn

    for (i in req.body){
        
        if (i == 'codigoRetencao'){
            valuesMovimento.codigoRetencao = req.body.codigoRetencao
        }

        if (i == 'codigoExtensao'){
            valuesMovimento.codigoExtensao = req.body.codigoExtensao
        }

        if (i == 'codigoVerba'){
            valuesMovimento.codigoVerba = req.body.codigoVerba
        }

        if (i == 'valor'){
            valuesMovimento.valor = req.body.valor
        }

        if (i == 'data')
        {

            let dtTransacao = req.body.data.split('/')
            nrAnoTrn = parseInt(dtTransacao[2], 10)
            dtTransacao = dtTransacao[2] + "-" + dtTransacao[1] + "-" + dtTransacao[0] + " 00:00:00"

            valuesMovimento.dtTrn = new Date(dtTransacao)

        }

        if (i=='cpf')
        {
            valuesMovimento.nrCpf = req.body.cpf
        }

        if (i=='cnpj')
        {
            valuesMovimento.nrCnpj = req.body.cnpj
        }

        if (i == 'matricula')
        {
            valuesMovimento.matricula = req.body.matricula
        }

        if (i == 'nomeContribuinte')
        {
            valuesMovimento.nome = req.body.nomeContribuinte
        }

    }

        const dado = await conn.query(queries.get_ID_VIN_RET_VRB_CPO_INF(valuesMovimento.codigoRetencao, valuesMovimento.codigoExtensao, valuesMovimento.codigoVerba), { type: QueryTypes.SELECT, nest: true });

        console.log(dado.length)

        if (dado.length == 0){
            return new Error("Nao foi possível definir o campo ID_VIN_RET_VRB_CPO_INF pelos dados de Retencao, Extensao e Verba")
        }

        valuesInsereMovimento.idVinRetVrbCpoInf = dado[0].ID_VIN_RET_VRB_CPO_INF
        valuesInsereMovimento.vlCpoInf = valuesMovimento.valor
        valuesInsereMovimento.idUsr = idUsuario
        valuesInsereMovimento.idTrn = 0
        valuesInsereMovimento.nrAnoTrn = nrAnoTrn
        valuesInsereMovimento.idSisOri = 10 //SISTEMA_DIRF
        valuesInsereMovimento.nrCpf = valuesMovimento.nrCpf
        valuesInsereMovimento.dtTrn = valuesMovimento.dtTrn
        valuesInsereMovimento.nrMat = valuesMovimento.matricula
        valuesInsereMovimento.nmCtbt = valuesMovimento.nome
        valuesInsereMovimento.dtCad = conn.Sequelize.literal('CURRENT_TIMESTAMP')
        valuesInsereMovimento.dtCri = conn.Sequelize.literal('CURRENT_TIMESTAMP')
        valuesInsereMovimento.icStaTrn = 'A'
        valuesInsereMovimento.idSldVgbl = 0
        valuesInsereMovimento.nrDocPagTer = 0
        valuesInsereMovimento.idTpPla = 1

        const Movimento = movimentoModel(conn, DataTypes)

       return Movimento.create(valuesInsereMovimento,{returning: true})       

}