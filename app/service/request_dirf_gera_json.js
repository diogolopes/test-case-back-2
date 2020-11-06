const axios = require ('axios').default

/**
 * Função que consome o serviço responsável por informar os anos disponíveis para geração do informe de rendimentos
 * 
 * @param {String} cpfContribuinte - CPF do contribuinte
 * @param {Number} empresaId - ID da empresa
 * @param {Number} ano - ano do informe a ser gerado
 * @returns {JSON} data - JSON com os dados do informe
 */

exports.geraJson = async function(cpfContribuinte, empresaId, ano){

  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; // TODO - CONFIGURAR CERTIFICADO

  let url_service = process.env.BUS_URL_GERAR_JSON || 'https://bprspbus11d.brasilprev.corp/api/legais/dirf/v1/gerar'
  
  let bus_auth

  if (process.env.BUS_AUTH){
    bus_auth = process.env.BUS_AUTH.replace(/"/g,'')
  } 

  var config = {
    method: 'post',
    url:  url_service,
    headers: {  'Username': process.env.BUS_USER || 'ws_usuario_local', 
                'Password': process.env.BUS_PASSWD || 'wslocal@l23',
                'Authorization': bus_auth || 'Basic d3NfdXN1YXJpb19sb2NhbDp3c2xvY2FsQGwyMw=='  },
    data:{
            "cpf": cpfContribuinte,
            "empresaId": empresaId,
            "ano": ano
         }
      };

    try{

      let ret = await axios(config)

      //console.log(ret.data)

      if (ret.data.length == 0)
      {
        //return JSON.stringify("")
        return 
      }

      return ret.data

    }catch(err){
        //console.log(err.response)
        return new Error("Erro na chamada do serviço GERA JSON do BUS de serviços --> " + err) 
      }
}