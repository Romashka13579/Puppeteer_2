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
  for (j = 0; j < LinksArray.length; j++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // page.setDefaultNavigationTimeout(2 * 60 * 1000);
    await page.goto(LinksArray[j]);
    const itemData = await page.evaluate(() => {
      const name = document.querySelector('.market_listing_item_name');
      const itemName = name.textContent;
      const price = document.querySelectorAll('.normal_price');
      const itemPrice = price[1].textContent;
      return [itemName, itemPrice];
    });
    console.log(itemData);
    await browser.close();
    console.log(j);
    itemsName.push(itemData[0]);
    itemsPrice.push(itemData[1]);
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // page.setDefaultNavigationTimeout(2 * 60 * 1000);
    // await page.goto('https://steamcommunity.com/market/search?q=#p1_popular_desc');
    // const itemData = await page.evaluate(() => {
    //   const items = Array.from(document.querySelectorAll('.market_listing_row_link'));
    //   const data = items.map(item => {
    //     const titleElement = item.querySelector('.market_listing_item_name').textContent;
    //     const priceElement = item.querySelector('.sale_price').textContent;//can be also .normal_price or full block .market_table_value .normal_price
    //     return {
    //       name: titleElement,
    //       price: priceElement
    //     };
    //   });
    //   return data;
    // });
    // console.log(itemData);
    // await browser.close();
    // return itemData;
  }
  return [itemsName, itemsPrice];
}



var i = 1;
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Sheet 1');
function myLoop() {
  setTimeout(function () {
    run().then((data) => {


      try {
        worksheet.state = 'visible';
        worksheet.getCell('A1').value = data[0][0];
        worksheet.getCell('A2').value = data[0][1];
        worksheet.getCell('A3').value = data[0][2];
        worksheet.getCell('A4').value = data[0][3];
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
    if (true) {      // i<6
      myLoop();
      i++;
    }
  }, 20000);
}

myLoop();   
