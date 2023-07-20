const puppeteer = require('puppeteer');
const ExcelJS = require('exceljs');

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const LinksArray = [
  'https://steamcommunity.com/market/search?q=sticker+Contenders+paris',
  'https://steamcommunity.com/market/search?q=sticker+Legends+paris',
  'https://steamcommunity.com/market/search?q=Challengers+Paris+stickers',
  'https://steamcommunity.com/market/search?q=Dreams+and+nightmares+case',
];

async function run() {

  const itemsName = [];
  const itemsPrice = [];

  const browser = await puppeteer.launch({ headless: true });
  for (j = 0; j < LinksArray.length; j++) {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(2 * 60 * 1000);
    await page.goto(LinksArray[j], { waitUntil: 'domcontentloaded' });
    const itemData = await page.evaluate(() => {
      if (document.querySelector('.market_listing_item_name')) {
        const name = document.querySelector('.market_listing_item_name');
        var itemName = name.textContent;
      }
      if (document.querySelectorAll('.normal_price')) {
        const price = document.querySelectorAll('.normal_price');
        if (price[1]) {
          var itemPrice = price[1].textContent;
        }
      }
      return [itemName, itemPrice];
    });
    console.log(itemData);
    itemsName.push(itemData[0]);
    itemsPrice.push(itemData[1]);
  }
  await browser.close();
  return [itemsName, itemsPrice];


  // const browser = await puppeteer.launch();
  // const page = await browser.newPage();
  // page.setDefaultNavigationTimeout(2 * 60 * 1000);
  // await page.goto('https://steamcommunity.com/market/search?q=sticker+Contenders+paris', { waitUntil: 'domcontentloaded' });
  // const itemData = await page.evaluate(() => {
  //   const name = document.querySelector('.market_listing_item_name');
  //   var itemName = name.textContent;
  //   const price = document.querySelectorAll('.normal_price');
  //   var itemPrice = price[1].textContent;
  //   return [itemName, itemPrice];
  // });
  // itemsName.push(itemData[0]);
  // itemsPrice.push(itemData[1]);


  // const page1 = await browser.newPage();
  // page1.setDefaultNavigationTimeout(2 * 60 * 1000);
  // await page1.goto('https://steamcommunity.com/market/search?q=sticker+Legends+paris', { waitUntil: 'domcontentloaded' });
  // const itemData1 = await page1.evaluate(() => {
  //   const name = document.querySelector('.market_listing_item_name');
  //   var itemName = name.textContent;
  //   const price = document.querySelectorAll('.normal_price');
  //   var itemPrice = price[1].textContent;
  //   return [itemName, itemPrice];
  // });
  // itemsName.push(itemData1[0]);
  // itemsPrice.push(itemData1[1]);


  // await browser.close();
  // console.log(itemsName, itemsPrice);
  // return [itemsName, itemsPrice];



  // const browser = await puppeteer.launch();
  // const page = await browser.newPage();
  // page.setDefaultNavigationTimeout(2 * 60 * 1000);
  // await page.goto('https://steamcommunity.com/market/search?q=sticker+Contenders+paris');
  // const itemData = await page.evaluate(() => {
  //   if (document.querySelector('.market_listing_item_name')) {
  //     const name = document.querySelector('.market_listing_item_name');
  //     var itemName = name.textContent;
  //   }
  //   if (document.querySelectorAll('.normal_price')) {
  //     const price = document.querySelectorAll('.normal_price');
  //     if (price[1]) {
  //       var itemPrice = price[1].textContent;
  //     }
  //   }
  //   return [itemName, itemPrice];
  // });
  // console.log(itemData);

  // itemsName.push(itemData[0]);
  // itemsPrice.push(itemData[1]);
  // await browser.close();
  // return [itemsName, itemsPrice];
}



var index = 1;
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Sheet 1');
worksheet.getCell('B1').value = "Items";
worksheet.getCell('C1').value = "Prices";
worksheet.getColumn(1).width = 3;
function myLoop() {
  setTimeout(function () {
    run().then((data) => {
      try {
        data.forEach((row, rowIndex) => {
          row.forEach((value, colIndex) => {
            const cell = worksheet.getCell(colIndex + 2, rowIndex + 2);
            if(value){
              cell.value = value;
            }
            if(rowIndex == 0){
              worksheet.getCell(colIndex + 2, rowIndex + 1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF0000' }
              }
            }
          });
        });
        // for (i = 0; i < data.length; i++) {
        //   for (j = 0; j < data[i].length; j++) {
        //     if(data[i][j]){
        //       const row = worksheet.getRow(j + 2);
        //       const cell = row.getCell(i + 2);
        //       cell.value = data[i][j];
        //     }
        //   }
        // }
        workbook.xlsx.writeFile('scraped_data.xlsx')
          .then(() => {
            console.log('Data saved to Excel file.');
          })
          .catch((error) => {
            console.error('Error saving data to Excel file:', error);
          });

      }
      catch (error) {
        console.error('Error opening Excel file:', error);
      }
    });
    if (true) {      // index<6
      myLoop();
      index++;
    }
  }, 12000);
}

myLoop();

// async function scratching(link) {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   page.setDefaultNavigationTimeout(2 * 60 * 1000);
//   await page.goto(link);
//   const itemData = await page.evaluate(() => {
//     if (document.querySelector('.market_listing_item_name')) {
//       const name = document.querySelector('.market_listing_item_name');
//       var itemName = name.textContent;
//     }
//     if (document.querySelectorAll('.normal_price')) {
//       const price = document.querySelectorAll('.normal_price');
//       if (price[1]) {
//         var itemPrice = price[1].textContent;
//       }
//     }
//     return [itemName, itemPrice];
//   });
//   console.log(itemData);
//   await browser.close();
//   return itemData;
// }