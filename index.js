/**
 * Example of using Bright Data scraping browser with Puppeteer
 * This simple script demonstrates how to make a request to a website through Bright Data scraping Browser
 */
import puppeteer from "puppeteer-core";

/**
 * STEP 1: Configure your Bright Data scraping browser endpoint
 *  - Get endpoint from: https://brightdata.com/cp/zones
 *  - Create new scraping browser: https://docs.brightdata.com/scraping-automation/scraping-browser/quickstart
 *  - Websocket format: wss://brd-customer-[id]-zone-[zone]:[password]@[domain]:[port]
 */
const BROWSER_WEBSOCKET_ENDPOINT = process.env.BRIGHT_DATA_SCRAPING_BROWSER_WEBSOCKET_ENDPOINT || "YOUR_BRIGHT_DATA_SCRAPING_BROWSER_WEBSOCKET_ENDPOINT";
// STEP 2: Set your target URL
const PAGE_URL = "https://example.com"; 

// STEP 3: Run `node index.js` commend on terminal
(async () => {  
    console.log("🚀 Starting the scraping process...");
    let browser;
    try {  
        console.log("🌐 Connecting to the Scraping Browser...");
        browser = await puppeteer.connect({  
            browserWSEndpoint: BROWSER_WEBSOCKET_ENDPOINT,  
        });
        console.log("✅ Successfully connected to the browser!");

        const page = await browser.newPage();  
        console.log("🌍 Navigating to the test URL...");
        await page.goto(PAGE_URL, { timeout: 2 * 60 * 1000 });
        console.log("📸 Taking a screenshot of the page...");
        await page.screenshot({ path: './page.png', fullPage: true });
        console.log("✅ Screenshot saved as 'page.png'!");

        console.log("🔍 Scraping page content...");
        const html = await page.content();  
        console.log("📝 Page content retrieved:");
        console.log(html);
    } catch (error) {
        console.error("❌ An error occurred during scraping:");
        console.error(error.message);
        console.error(error.stack);
    } finally {  
        if (browser) {
            await browser.close();
            console.log("👋 Browser closed.");
        }
    }  
})();
