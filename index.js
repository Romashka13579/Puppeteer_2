const puppeteer = require('puppeteer');
const ExcelJS = require('exceljs');

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function run() {

  //   const browser = await puppeteer.launch();
  //   const page = await browser.newPage();

  //   await page.goto('https://steamcommunity.com/market/');

  // for (i = 0; i < 1; i++) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(2 * 60 * 1000);
  await page.goto('https://steamcommunity.com/market/search?q=#p1_popular_desc');
  // await page.goto('https://steamcommunity.com/market/search?q=#p'+i+'_popular_desc');
  // console.log('https://steamcommunity.com/market/search?q=#p'+i+'_popular_desc');
  const itemData = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.market_listing_row_link'));
    const data = items.map(item => {
      const titleElement = item.querySelector('.market_listing_item_name').textContent;
      const priceElement = item.querySelector('.sale_price').textContent;//can be also .normal_price or full block .market_table_value .normal_price
      // return titleElement;
      return {
        name: titleElement,
        price: priceElement
      };
    });
    return data;
  });
  console.log(itemData);
  await browser.close();
  // await delay(10000);
  return itemData;
  // }



  // Print the extracted data


  //   const selector = '.market_listing_row_link'
  //   await page.waitForSelector(selector);
  //   const element = await page.$(selector);

  //   const text = await element.evaluate(e => e.innerHTML);

  //   console.log(text);



  //   const html = await page.evaluate(() => document.documentElement.outerHTML);
  //   console.log(html);

  // const itemData = await page.evaluate(() => {
  //     const
  // })
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
        worksheet.getCell('A5').value = data[4];
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

      // try {
      //   const workbook = new ExcelJS.Workbook();
      //   workbook.xlsx.readFile('Scraper.xlsx');

      //   const sheet = workbook.addWorksheet('My Sheet');

      //   if (sheet) {
      //     const cell = sheet.getCell('A1');

      //     cell.value = 'Updated Value';

      //     workbook.xlsx.writeFile('Scraper.xlsx');

      //     console.log('Cell updated successfully.');
      //   } else {
      //     console.error('Worksheet not found.');
      //   }

      // } 
      // catch (error) {
      //   console.error('Error opening Excel file:', error);
      // }


      //   // Save the workbook to a file
      //   workbook.xlsx.writeFile('scraped_data.xlsx')
      //     .then(() => {
      //       console.log('Data saved to Excel file.');
      //     })
      //     .catch((error) => {
      //       console.error('Error saving data to Excel file:', error);
      //     });
      // }).catch((error) => {
      //   console.error('Error scraping data:', error);
    });
    if (true) {      // i<6
      myLoop();
      i++;
    }
  }, 8000);
}

myLoop();   
