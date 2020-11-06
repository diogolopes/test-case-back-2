const fs = require('fs')
const PDFDocument = require('pdfkit')



var doc = new PDFDocument()

doc.pipe(fs.createWriteStream('teste.pdf'))

doc.image('../../images/BP_logo.png', 15, 15, {
    width: 120, 
    height: 32,
    align: 'left',
    valign: 'top'
 })

doc.font('Times-Roman')
   .fontSize(12)
   .text('Some text with an embedded sdfgsdfgsdf font!', 100, 100);

doc.end()