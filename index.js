const puppeteer = require('puppeteer');
const ExcelJS = require('exceljs');

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function run() {

  //   const browser = await puppeteer.launch();
  //   const page = await browser.newPage();

  //   await page.goto('https://steamcommunity.com/market/');

  for (i = 0; i < 1; i++) {
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
        return {
          name: titleElement,
          price: priceElement
        };
      });
      return data;
    });
    console.log(itemData);
    await browser.close();
    await delay(10000);
    return itemData;
  }



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
function loop(){
  setTimeout(function(){
    console.log("1");
  }, 3000)
}
for(var start = 1; start < 10; start++) {
  loop();
  run().then((data) => {
    // Iterate over the scraped data and add it to the worksheet
  
  
    try {
      // Process the scraped data and save it to Excel
      const workbook = new ExcelJS.Workbook();
      workbook.xlsx.readFile('Scraper.xlsx');
  
      // Access the worksheets in the Excel file
      // const worksheet = workbook.getWorksheet('Sheet1'); // Replace 'Sheet1' with the actual sheet name
  
      // if (worksheet) {
      //   const cell = worksheet.getCell('A1'); // Replace 'A1' with the desired cell reference
  
      //   cell.value = 'Updated Value'; // Assign the new value to the cell
  
      //   workbook.xlsx.writeFile('Scraper.xlsx');
  
      //   console.log('Cell updated successfully.');
      // } else {
      //   console.error('Worksheet not found.');
      // }
  
    } catch (error) {
      console.error('Error opening Excel file:', error);
    }
  
  
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
}
