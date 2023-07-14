const puppeteer = require('puppeteer');

async function run()  {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(2*60*1000);

  await page.goto('https://steamcommunity.com/market/');

  const itemData = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.market_listing_row_link'));
    const data = items.map(item => {
        const titleElement = item.querySelector('.market_listing_item_name').textContent;
        const priceElement = item.querySelector('.sale_price').textContent;//can be also .normal_price or full block .market_table_value .normal_price
        return titleElement;
        // return {
        //     name: titleElement
        // };
    });
    return data;
  });

  console.log(itemData);
  console.log("done1");
  await browser.close();
  const targetElement = document.querySelector('.item-name-1');
  targetElement.innerHTML = itemData;

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