import puppeteer from "puppeteer-core";

const BROWSER_WS_ENDPOINT = "BROWSER_WS_ENDPOINT";  
  
(async () => {  
    console.log('Connecting to Scraping Browser...');  
    const browser = await puppeteer.connect({  
        browserWSEndpoint: BROWSER_WS_ENDPOINT,  
   });  
    try {  
        console.log('Connected! Navigating...');  
        const page = await browser.newPage();  
        // Enter your test URL below
        await page.goto('https://example.com', { timeout: 2 * 60 * 1000 });  
        console.log('Taking screenshot to page.png');  
        await page.screenshot({ path: './page.png', fullPage: true });  
   console.log('Navigated! Scraping page content...');  
 const html = await page.content();  
 console.log(html)  
 // CAPTCHA solving: If you know you are likely to encounter a CAPTCHA on your target page, add the following few lines of code to get the status of Scraping Browser's automatic CAPTCHA solver   
 // Note 1: If no captcha was found it will return not_detected status after detectTimeout   
 // Note 2: Once a CAPTCHA is solved, if there is a form to submit, it will be submitted by default   
 // const client = await page.target().createCDPSession();  
 // const {status} = await client.send('Captcha.solve', {detectTimeout: 30*1000});   
 // console.log(`Captcha solve status: ${status}`)   
    } finally {  
        await browser.close();  
   }  
})();