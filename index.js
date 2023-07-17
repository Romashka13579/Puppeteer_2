const puppeteer = require('puppeteer');
const ExcelJS = require('exceljs');

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const LinksArray = [
  'https://steamcommunity.com/market/listings/730/Paris%202023%20Challengers%20Sticker%20Capsule',
  // 'https://steamcommunity.com/market/listings/730/Paris%202023%20Contenders%20Sticker%20Capsule',
  // 'https://steamcommunity.com/market/listings/730/Paris%202023%20Legends%20Sticker%20Capsule',
  // 'https://steamcommunity.com/market/listings/730/Dreams%20%26%20Nightmares%20Case',
];

async function run() {
  const itemsName = [];
  const itemsPrice = [];
  for (i = 0; i <= LinksArray.length; i++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(2 * 60 * 1000);
    await page.goto(LinksArray[i-1]);
    const itemData = await page.evaluate(() => {
      const name = document.querySelector('.hover_item_name');
      const itemName = name.textContent;
      const price = document.querySelectorAll('.market_commodity_orders_header_promote');
      console.log(price);
      // const itemPrice = price[1].textContent;
      return [itemName, itemName, itemName, itemName];
    });
    console.log(itemData);
    await browser.close();
    return itemData;
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
}



var i = 1;
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Sheet 1');
function myLoop() {
  setTimeout(function () {
    run().then((data) => {


      try {
        worksheet.state = 'visible';
        worksheet.getCell('A1').value = data[0];
        worksheet.getCell('A2').value = data[1];
        worksheet.getCell('A3').value = data[2];
        worksheet.getCell('A4').value = data[3];
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
  }, 8000);
}

myLoop();   
