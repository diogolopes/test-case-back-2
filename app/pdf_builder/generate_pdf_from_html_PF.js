const fs = require('fs')
const pdf = require('html-pdf')

exports.generatePDFPessoaFisica = async function(res, jsonDados){

//let html = fs.readFileSync(__dirname + '/html/d6ead6a4-066b-11eb-8b25-0cc47a792c0a_id_d6ead6a4-066b-11eb-8b25-0cc47a792c0a.html').toString()
//let html = fs.readFileSync(__dirname + '/html/d6ead6a4-066b-11eb-8b25-0cc47a792c0a_id_d6ead6a4-066b-11eb-8b25-0cc47a792c0a.html','utf-8')

let html = fs.readFileSync(__dirname + '/html_v2/abf0e552-09d5-11eb-8b25-0cc47a792c0a_id_abf0e552-09d5-11eb-8b25-0cc47a792c0a.html','utf-8')


const options = {
    type: 'pdf',
    format: 'A4',
    orientation: 'portrait'
}

// Export options
//"directory": "/tmp",       // The directory the file gets written into if not using .toFile(filename, callback). default: '/tmp'

html = html.replace("abf0e552-09d5-11eb-8b25-0cc47a792c0a_id_abf0e552-09d5-11eb-8b25-0cc47a792c0a_files/background1.jpg",
'file:///' + __dirname + '/html_v2/abf0e552-09d5-11eb-8b25-0cc47a792c0a_id_abf0e552-09d5-11eb-8b25-0cc47a792c0a_files/background1.jpg')



html = JSONtoHTML(jsonDados, html)

 //pdf.create(html, options).toFile('testehtml.pdf', function (err){
//    console.log(err)
//}) 


pdf.create(html, options).toBuffer((err,buffer) => {
    
    if(err){
        console.log(err)
        return res.status(500).send({erro:"Erro na geracao do PDF --> " + err})
    }
    
    //console.log("chegou")
    //console.log(buffer)
    res.setHeader('Content-Type', 'application/pdf')
    res.send(buffer)
})


}

function JSONtoHTML (jsonDados, htmlString) {

    htmlString = htmlString.replace('#nomeContribuinte#',jsonDados[0].nomeContribuinte)
    htmlString = htmlString.replace('#dataCabecalho#',jsonDados[0].dataCabecalho)
    htmlString = htmlString.replace('#dataRodape#',jsonDados[0].dataRodape)
    htmlString = htmlString.replace('#cpfContribuinte#',jsonDados[0].cpfContribuinte)
    htmlString = htmlString.replace('#nomeContribuinteCabecalho#',jsonDados[0].nomeContribuinteCabecalho)
    htmlString = htmlString.replace('#anoVigencia#',jsonDados[0].anoVigencia)
    htmlString = htmlString.replace('#valorRendimentoTradicional#',jsonDados[0].valorRendimentoTradicional)
    htmlString = htmlString.replace('#valorRendimentoPgbl#',jsonDados[0].valorRendimentoPgbl)
    htmlString = htmlString.replace('#valorRendimentoVgbl#',jsonDados[0].valorRendimentoVgbl)
    htmlString = htmlString.replace('#valorImpostoTradicional#',jsonDados[0].valorImpostoTradicional)
    htmlString = htmlString.replace('#valorImpostoPgbl#',jsonDados[0].valorImpostoPgbl)
    htmlString = htmlString.replace('#valorImpostoVgbl#',jsonDados[0].valorImpostoVgbl)
    htmlString = htmlString.replace('#cpfContribuinte#',jsonDados[0].cpfContribuinte)
    htmlString = htmlString.replace('#valorRendimentoIsento1995Tradicional#',jsonDados[0].valorRendimentoIsento1995Tradicional)
    htmlString = htmlString.replace('#valorRendimentoIsento1995Pgbl#',jsonDados[0].valorRendimentoIsento1995Pgbl)
    htmlString = htmlString.replace('#valorRendimentoIsento1995Vgbl#',jsonDados[0].valorRendimentoIsento1995Vgbl)
    htmlString = htmlString.replace('#valorRendimentoIsento65Tradicional#',jsonDados[0].valorRendimentoIsento65Tradicional)
    htmlString = htmlString.replace('#valorRendimentoIsento65Pgbl#',jsonDados[0].valorRendimentoIsento65Pgbl)
    htmlString = htmlString.replace('#valorRendimentoIsento65Vgbl#',jsonDados[0].valorRendimentoIsento65Vgbl)
    htmlString = htmlString.replace('#valorRendimentoIsentoTradicional#',jsonDados[0].valorRendimentoIsentoTradicional)
    htmlString = htmlString.replace('#valorRendimentoIsentoPgbl#',jsonDados[0].valorRendimentoIsentoPgbl)
    htmlString = htmlString.replace('#valorRendimentoIsentoVgbl#',jsonDados[0].valorRendimentoIsentoVgbl)
    htmlString = htmlString.replace('#valorIsentoResgateVgbl#',jsonDados[0].valorIsentoResgateVgbl)
    htmlString = htmlString.replace('#valorSaldoAnoAnterioVgbl#',jsonDados[0].valorSaldoAnoAnterioVgbl)
    htmlString = htmlString.replace('#valorSaldoAnoAtualVgbl#',jsonDados[0].valorSaldoAnoAtualVgbl)
    htmlString = htmlString.replace('#valorContribuicaoTradicional#',jsonDados[0].valorContribuicaoTradicional)
    htmlString = htmlString.replace('#valorContribuicaoPgbl#',jsonDados[0].valorContribuicaoPgbl)
    htmlString = htmlString.replace('#valorContribuicaoVgbl#',jsonDados[0].valorContribuicaoVgbl)
    htmlString = htmlString.replace('#valorContribuicaoPeculioTradicional#',jsonDados[0].valorContribuicaoPeculioTradicional)
    htmlString = htmlString.replace('#valorContribuicaoPeculioPgbl#',jsonDados[0].valorContribuicaoPeculioPgbl)
    htmlString = htmlString.replace('#valorContribuicaoPeculioVgbl#',jsonDados[0].valorContribuicaoPeculioVgbl)
    htmlString = htmlString.replace('#valorIsentoRedutorTradicional#',jsonDados[0].valorIsentoRedutorTradicional)
    htmlString = htmlString.replace('#valorIsentoRedutorPgbl#',jsonDados[0].valorIsentoRedutorPgbl)
    htmlString = htmlString.replace('#valorIsentoRedutorVgbl#',jsonDados[0].valorIsentoRedutorVgbl)
    htmlString = htmlString.replace('#valorRendimentoTributadoExclusivoTradicional#',jsonDados[0].valorRendimentoTributadoExclusivoTradicional)
    htmlString = htmlString.replace('#valorRendimentoTributadoExclusivoPgbl#',jsonDados[0].valorRendimentoTributadoExclusivoPgbl)
    htmlString = htmlString.replace('#valorRendimentoTributadoExclusivoVgbl#',jsonDados[0].valorRendimentoTributadoExclusivoVgbl)
    htmlString = htmlString.replace('#nomeUnidadeCorporativa#',jsonDados[0].nomeUnidadeCorporativa)
    htmlString = htmlString.replace('#cnpjUnidadeCorporativa#',jsonDados[0].cnpjUnidadeCorporativa)
    htmlString = htmlString.replace('#anoAnteriorVigencia#',jsonDados[0].anoAnteriorVigencia)
    htmlString = htmlString.replace(/#anoVigencia#/g,jsonDados[0].anoVigencia)
    htmlString = htmlString.replace('#valorResgatePlanoTotal#',jsonDados[0].valorResgatePlanoTotal)
    htmlString = htmlString.replace('#valorRendaPlanoTotal#',jsonDados[0].valorRendaPlanoTotal)
    htmlString = htmlString.replace('#valorRendimento1995Total#',jsonDados[0].valorRendimento1995Total)
    htmlString = htmlString.replace('#valorRendimento65Total#',jsonDados[0].valorRendimento65Total)
    htmlString = htmlString.replace('#valorPeculioTotal#',jsonDados[0].valorPeculioTotal)
    htmlString = htmlString.replace('#valorDeducaoTotal#',jsonDados[0].valorDeducaoTotal)
    htmlString = htmlString.replace('#valorRendimentoResgateTributadoTotal#',jsonDados[0].valorRendimentoResgateTributadoTotal)
    htmlString = htmlString.replace('#valorTotalPeculioAnoAnteriorTotal#',jsonDados[0].valorTotalPeculioAnoAnteriorTotal)
    htmlString = htmlString.replace('#valorContribuicaoPeculioPgbl#',jsonDados[0].valorContribuicaoPeculioPgbl)
    htmlString = htmlString.replace('#valorContribuicaoPeculioTradicional#',jsonDados[0].valorContribuicaoPeculioTradicional)
    htmlString = htmlString.replace('#valorContribuicaoPeculioVgbl#',jsonDados[0].valorContribuicaoPeculioVgbl)
    htmlString = htmlString.replace('#valorTotalContrubuicaoAnoAnteriorTotal#',jsonDados[0].valorTotalContrubuicaoAnoAnteriorTotal)
    htmlString = htmlString.replace('#valorContribuicaoPgbl#',jsonDados[0].valorContribuicaoPgbl)
    
    return htmlString

}

function JSONtoHTMLTeste (jsonDados, htmlString) {

    htmlString = htmlString.replace('#nomeContribuinte#',"100.000,00")
    htmlString = htmlString.replace('#dataCabecalho#',"100.000,00")
    htmlString = htmlString.replace('#dataRodape#',"100.000,00")
    htmlString = htmlString.replace('#cpfContribuinte#',"100.000,00")
    htmlString = htmlString.replace('#nomeContribuinteCabecalho#',"100.000,00")
    htmlString = htmlString.replace('#anoVigencia#',"100.000,00")
    htmlString = htmlString.replace('#valorRendimentoTradicional#',"100.000,00")
    htmlString = htmlString.replace('#valorRendimentoPgbl#',"100.000,00")
    htmlString = htmlString.replace('#valorRendimentoVgbl#',"100.000,00")
    htmlString = htmlString.replace('#valorImpostoTradicional#',"100.000,00")
    htmlString = htmlString.replace('#valorImpostoPgbl#',"100.000,00")
    htmlString = htmlString.replace('#valorImpostoVgbl#',"100.000,00")
    htmlString = htmlString.replace('#cpfContribuinte#',"100.000,00")
    htmlString = htmlString.replace('#valorRendimentoIsento1995Tradicional#',"100.000,00")
    htmlString = htmlString.replace('#valorRendimentoIsento1995Pgbl#',"100.000,00")
    htmlString = htmlString.replace('#valorRendimentoIsento1995Vgbl#',"100.000,00")
    htmlString = htmlString.replace('#valorRendimentoIsento65Tradicional#',"100.000,00")
    htmlString = htmlString.replace('#valorRendimentoIsento65Pgbl#',"100.000,00")
    htmlString = htmlString.replace('#valorRendimentoIsento65Vgbl#',"100.000,00")
    htmlString = htmlString.replace('#valorRendimentoIsentoTradicional#',"100.000,00")
    htmlString = htmlString.replace('#valorRendimentoIsentoPgbl#',"100.000,00")
    htmlString = htmlString.replace('#valorRendimentoIsentoVgbl#',"100.000,00")
    htmlString = htmlString.replace('#valorIsentoResgateVgbl#',"100.000,00")
    htmlString = htmlString.replace('#valorSaldoAnoAnterioVgbl#',"100.000,00")
    htmlString = htmlString.replace('#valorSaldoAnoAtualVgbl#',"100.000,00")
    htmlString = htmlString.replace('#valorContribuicaoTradicional#',"100.000,00")
    htmlString = htmlString.replace('#valorContribuicaoPgbl#',"100.000,00")
    htmlString = htmlString.replace('#valorContribuicaoVgbl#',"100.000,00")
    htmlString = htmlString.replace('#valorContribuicaoPeculioTradicional#',"100.000,00")
    htmlString = htmlString.replace('#valorContribuicaoPeculioPgbl#',"100.000,00")
    htmlString = htmlString.replace('#valorContribuicaoPeculioVgbl#',"100.000,00")
    htmlString = htmlString.replace('#valorIsentoRedutorTradicional#',"100.000,00")
    htmlString = htmlString.replace('#valorIsentoRedutorPgbl#',"100.000,00")
    htmlString = htmlString.replace('#valorIsentoRedutorVgbl#',"100.000,00")
    htmlString = htmlString.replace('#valorRendimentoTributadoExclusivoTradicional#',"100.000,00")
    htmlString = htmlString.replace('#valorRendimentoTributadoExclusivoPgbl#',"100.000,00")
    htmlString = htmlString.replace('#valorRendimentoTributadoExclusivoVgbl#',"100.000,00")
    htmlString = htmlString.replace('#nomeUnidadeCorporativa#',"100.000,00")
    htmlString = htmlString.replace('#cnpjUnidadeCorporativa#',"100.000,00")
    htmlString = htmlString.replace('#anoAnteriorVigencia#',"100.000,00")
    htmlString = htmlString.replace(/#anoVigencia#/g,"100.000,00")
    htmlString = htmlString.replace('#valorResgatePlanoTotal#',"100.000,00")
    htmlString = htmlString.replace('#valorRendaPlanoTotal#',"100.000,00")
    htmlString = htmlString.replace('#valorRendimento1995Total#',"100.000,00")
    htmlString = htmlString.replace('#valorRendimento65Total#',"100.000,00")
    htmlString = htmlString.replace('#valorPeculioTotal#',"100.000,00")
    htmlString = htmlString.replace('#valorDeducaoTotal#',"100.000,00")
    htmlString = htmlString.replace('#valorRendimentoResgateTributadoTotal#',"100.000,00")
    htmlString = htmlString.replace('#valorTotalPeculioAnoAnteriorTotal#',"100.000,00")
    htmlString = htmlString.replace('#valorContribuicaoPeculioPgbl#',"100.000,00")
    htmlString = htmlString.replace('#valorContribuicaoPeculioTradicional#',"100.000,00")
    htmlString = htmlString.replace('#valorContribuicaoPeculioVgbl#',"100.000,00")
    htmlString = htmlString.replace('#valorTotalContrubuicaoAnoAnteriorTotal#',"100.000,00")
    htmlString = htmlString.replace('#valorContribuicaoPgbl#',"100.000,00")
    
    return htmlString

}