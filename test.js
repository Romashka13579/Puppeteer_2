// const ExcelJS = require('exceljs');

// try {
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Sheet 1');
//     worksheet.state = 'visible';
//     const cell = worksheet.getCell('A1'); 
    
//     cell.value = 'Updated Value';
//     workbook.xlsx.writeFile('scraped_data.xlsx')
//       .then(() => {
//         console.log('Data saved to Excel file.');
//       })
//       .catch((error) => {
//         console.error('Error saving data to Excel file:', error);
//       });

// }
// catch (error) {
//     console.error('Error opening Excel file:', error);
// }

// function myLoop() {
//     setTimeout(function () {
//         try {
//             const workbook = new ExcelJS.Workbook();
//             workbook.xlsx.readFile('Scraper.xlsx');

//             const sheet = workbook.getWorksheet(1);

//             if (sheet) {
//                 const cell = sheet.getCell('A1');

//                 cell.value = 'Updated Value';

//                 workbook.xlsx.writeFile('Scraper.xlsx');

//                 console.log('Cell updated successfully.');
//                 workbook.
//             } else {
//                 console.error('Worksheet not found.');
//             }

//         }
//         catch (error) {
//             console.error('Error opening Excel file:', error);
//         }
//         if (true) {
//             console.log("ae");
//             myLoop();
//         }
//     }, 10000);
// }

// myLoop();


const ExcelJS = require('exceljs');

// const workbook = new ExcelJS.Workbook();
// workbook.xlsx.readFile("Scraper.xlsx");
const workbook = new ExcelJS.Workbook();

const worksheet = workbook.addWorksheet('sheet', {properties:{tabColor:{argb:'FF00FF00'}}});

worksheet.properties.defaultRowHeight = 50;
worksheet.properties.defaultColWidth = 10;
// worksheet.autoFilter = 'A1:C1';
worksheet.autoFilter = {
    from: 'A1',
    to: 'C1',
  }

  const nameCol = worksheet.getColumn('B');
  
  nameCol.width = 15;
//   nameCol.eachCell({ includeEmpty: true }, function(cell, rowNumber) {
//     cell
//   });
const row = worksheet.getRow(5);
row.height = 70;
row.getCell(1).value = 5; 
worksheet.getCell('A2').value = 'Two';
worksheet.getCell('A3').value = 'Three';
worksheet.getCell('A4').value = 'Four';
worksheet.getCell('A5').alignment = { vertical: 'middle', horizontal: 'center' };
// const imageId1 = workbook.addImage({
//   filename: 'path/to/image.jpg',
//   extension: 'png',
// });
const text = "OneOneOneOne"
worksheet.getCell('A1').value = text;
worksheet.properties.defaultColWidth = text.length * 1.5;

workbook.xlsx.writeFile("scraped_data_test.xlsx");
// workbook.xlsx.writeFile("Scraper.xlsx");

