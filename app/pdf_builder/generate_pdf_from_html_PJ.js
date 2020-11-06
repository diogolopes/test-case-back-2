const fs = require('fs')
const pdf = require('html-pdf')
const PDFMerger = require('pdf-merger-js');

var merger = new PDFMerger();

const meses = ["Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

const mockJSON = {

    "dataCabecalho": "São Paulo, 28 de Fevereiro de 2020",
    "dataRodape": "Informe de Rendimento - 2a. via emitida em 08/10/2020",
    "cpfContribuinte": "225.159.188-59",
    "nomeContribuinte": "ANDRE TROCILIO DE LIMA",
    "nomeContribuinteCabecalho": "ANDRE TROCILIO DE LIMA,",
    "anoVigencia": "2018",
    "logradouro": "Rua Martiniano de Carvalho 484 Ap 181                       ",
    "bairro": "Bela Vista          ",
    "cidade": "São Paulo                     ",
    "uf": "SP",
    "cep": "01321000",
    "dataInforme": "2020-02-28T00:00:00",
    "nomeUnidadeCorporativa": "Brasilprev Seguros e Previdência S/A",
    "cnpjUnidadeCorporativa": "27.665.207/0001-31",
    "anoAnteriorVigencia": "2017",
    "Janeiro": [{ "8040": ["corretagem", "500.23", "400.10"] },
    { "5022": ["estorno", "156.18", "400"] },
    { "111": ["teste", "156.18", "400"] }],
    "Fevereiro": [{ "8040": ["corretagem", "500.35", "400"] },
    { "5022": ["estorno", "156.18", "400"] }],
    "Marco": [{ "555": ["bbbbbbbbbb", "500", "400"] },
    { "5483": ["cccccccccc", "156.18", "400"] }],
    "Abril": [{ "999": ["teste", "500.23", "400.10"] },
    { "5022": ["estorno", "156.18", "400"] },
    { "111": ["teste", "156.18", "400"] }],
    "Maio": [{ "8040": ["corretagem", "500.35", "400"] }],
    "Junho": [],
}

//exports.generatePDFPessoaFisica = async function(){

//console.log(mockJSON.Janeiro[1])
//console.log(mockJSON["Janeiro"])
//console.log(mockJSON.Janeiro.length)

//for (prop in mockJSON.Janeiro[0]){
//    console.log(prop)
//    console.log(mockJSON.Janeiro[0][prop][0])
//}

let vec_retencoes = []

//console.log(Object.keys(mockJSON.Janeiro[0]))

for (var m of meses) {
    //console.log(m)

    if (mockJSON[m] == undefined) {
        continue
    }

    for (var i = 0; i < mockJSON[m].length; i++) {
        //console.log(i)
        //console.log(mockJSON[m][i])

        for (k of Object.keys(mockJSON[m][i])) {

            aux = undefined

            //console.log(vec_retencoes.length)
            if (vec_retencoes.length == 0) {

                aux = new Object()
                aux.codigo = k

            } else {

                for (ret of vec_retencoes) {
                    if (ret.codigo == k.toString()) {
                        aux = ret
                        vec_retencoes = vec_retencoes.filter(item => item.codigo !== ret.codigo);
                        break
                    }
                }

                if (aux == undefined) {
                    aux = new Object()
                    aux.codigo = k
                }
            }

            aux[m] = mockJSON[m][i][k]

            //console.log(k);
            //console.log(mockJSON[m][i][k]);

        }

        vec_retencoes.push(aux)

    }

    //console.log(aux); 

}

console.log("VEC RETENCOES")
console.log(vec_retencoes);

let d = new Date(mockJSON.dataInforme).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
}).split('-')

console.log(d[2] + "/" + d[1] + "/" + d[0])

/* let v = new Object()
v.codigo = '1234'
v.janeiro = 'TESTE'
v.fevereiro = 'TESTE'

console.log(v.codigo == '1234') */


let html = fs.readFileSync(__dirname + '/html_v2/InformeRendimentosPJ.html', 'utf-8')

html = JSONtoHTMLTeste(mockJSON, html)

//x = createBuffer(html)
//console.log(x)



//merger.add('testehtml.pdf');
//  merger.add('testehtml20.pdf');

//  merger.save('merged.pdf'); //save under given name


const options = {
    type: 'pdf',
    format: 'A3',
    orientation: 'portrait'
}

 pdf.create(html, options).toFile('testehtmlPJ.pdf', function (err){
console.log(err)
})

//}
 
function createBuffer(html){

    const options = {
        type: 'pdf',
        format: 'A3',
        orientation: 'portrait'
    }

    pdf.create(html, options).toBuffer((err,buffer) => {
        console.log(buffer)
        return buffer
    })

} 


function JSONtoHTMLTeste(jsonDados, htmlString) {
    htmlString = htmlString.replace('#NOMECONTRIBUINTE#', 'JOSE DOS SANTOS E SILVA')
    htmlString = htmlString.replace(/#COD#/g, '8040')
    htmlString = htmlString.replace(/#DESCRICAORETENCAO#/g, 'ad Corinthios maximae in mundo, suus populus quadrigis scriptor')
    htmlString = htmlString.replace('#ANOVIGENCIA#', jsonDados.anoVigencia)
    htmlString = htmlString.replace('#CNPJCONTRIBUINTE#', "12.345.789/0001-31")
    htmlString = htmlString.replace('#RENDJAN#', Math.random() * (10000000 - 1))

    return htmlString
}