import puppeteer from "puppeteer-core";

// Configuration
const AMAZON_URL = "https://www.amazon.com";

/**
 * STEP 1: Configure your Bright Data scraping browser endpoint
 *  - Get endpoint from: https://brightdata.com/cp/zones
 *  - Create new scraping browser: https://docs.brightdata.com/scraping-automation/scraping-browser/quickstart
 *  - Websocket format: wss://brd-customer-[id]-zone-[zone]:[password]@[domain]:[port]
 */
const BROWSER_WS = process.env.BRIGHT_DATA_SCRAPING_BROWSER_WEBSOCKET_ENDPOINT || "YOUR_BRIGHT_DATA_SCRAPING_BROWSER_WEBSOCKET_ENDPOINT";

// STEP 2: Run `node amazon-product-scraping.js` commend on terminal

// Search parameters
const SEARCH_TERM = "laptop";  // Change this to search for different products

/**
 * Main function to run the scraper
 * This is the entry point of our script
 */
async function scrapeAmazon() {
  console.log("🚀 Starting Amazon scraper...");
  console.log(`🔍 Searching for: ${SEARCH_TERM}`);

  try {
      // Step 1: Connect to Bright Data's browser
      console.log("🌐 Connecting to browser...");
      const browser = await puppeteer.connect({
          browserWSEndpoint: BROWSER_WS,
      });
      console.log("✅ Connected to browser");

      // Step 2: Create a new page
      const page = await browser.newPage();
      
      // Step 3: Go to Amazon
      console.log("🌐 Opening Amazon...");
      await page.goto(AMAZON_URL, { waitUntil: "domcontentloaded" });
      console.log("✅ Amazon loaded");

      // Step 4: Search for products
      console.log("🔍 Entering search term...");
      await page.type('#twotabsearchtextbox', SEARCH_TERM);
      await page.click('#nav-search-submit-button');
      console.log("✅ Search submitted");

      // Step 5: Wait for results to load
      console.log("⏳ Waiting for results...");
      await page.waitForSelector('[data-component-type="s-search-result"]');
      console.log("✅ Results loaded");

      // Step 6: Extract product information
      console.log("📊 Extracting product data...");
      const products = await page.$$eval('[data-component-type="s-search-result"]', items => {
          return items.slice(0, 5).map(item => {
              // Get product title
              const titleElement = item.querySelector('h2');
              const title = titleElement ? titleElement.innerText : 'N/A';

              // Get product price
              const priceElement = item.querySelector('.a-price .a-offscreen');
              const price = priceElement ? priceElement.innerText : 'N/A';

              // Get product rating
              const ratingElement = item.querySelector('.a-icon-star-small');
              const rating = ratingElement ? ratingElement.innerText : 'N/A';

              return {
                  title,
                  price,
                  rating
              };
          });
      });

      // Step 7: Display results
      console.log(`\n📊 AMAZON SEARCH RESULTS for "${SEARCH_TERM}"`);
      console.log("=======================");
      
      // Format and display each product in a clean, readable way
      products.forEach((product, index) => {
        console.log(`\n#${index + 1} ${product.title}`);
        console.log(`   💰 Price: ${product.price}`);
        console.log(`   ⭐ Rating: ${product.rating}`);
        console.log("   " + "-".repeat(50));
      });
      
      console.log(`\n✅ Found ${products.length} products for "${SEARCH_TERM}"`);

      // Step 8: Close browser
      console.log("👋 Closing browser...");
      await browser.close();
      console.log("✅ Browser closed");

  } catch (error) {
      console.error("❌ Error occurred:", error.message);
  }
}

// Run the scraper
scrapeAmazon(); 