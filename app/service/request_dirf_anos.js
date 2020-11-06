const axios = require ('axios').default

/**
 * Função que consome o serviço responsável por informar os anos disponíveis para geração do informe de rendimentos
 * 
 * @param {String} cpfContribuinte - CPF do contribuinte
 * @returns mapValues - Anos disponiveis para geracao
 */

exports.getAno = async function(cpfContribuinte){

  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; // TODO - CONFIGURAR CERTIFICADO

  let url_service = (process.env.BUS_URL_ANOS || 'https://bprspwas11d.brasilprev.corp/bprlegaisdm/v1/dirf/anos/') + cpfContribuinte

  let bus_auth

  if (process.env.BUS_AUTH){
    bus_auth = process.env.BUS_AUTH.replace(/"/g,'')
  }

  var config = {
    method: 'get',
    url:  url_service,
    headers: {  'Username': process.env.BUS_USER || 'ws_usuario_local', 
                'Password': process.env.BUS_PASSWD || 'wslocal@l23',
                'Authorization': bus_auth || 'Basic d3NfdXN1YXJpb19sb2NhbDp3c2xvY2FsQGwyMw=='  }
      };

    try{

      let ret = await axios(config)

      //const hash = ret.data.map(e => ["ano", e])

      if (ret.data.length == 0)
      {
        return JSON.stringify("")
      }

      let mapValues = []

      for (let i of ret.data)
      {  
        mapValues.push({ano:i})
      }        

      return mapValues

    }catch(err){
        return new Error("Erro na chamada do serviço consulta ANO do BUS de serviços --> " + err) 
      }
}