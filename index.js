const puppeteer = require('puppeteer');

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function run()  {

//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto('https://steamcommunity.com/market/');

  while (true){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(2*60*1000);
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
run();
