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

worksheet.getCell('A4').value = 'Four';

workbook.xlsx.writeFile("scraped_data_test.xlsx");
// workbook.xlsx.writeFile("Scraper.xlsx");

