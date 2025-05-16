import puppeteer from "puppeteer-core";

// Configuration
const BOOKING_URL = "https://www.booking.com/";

/**
 * STEP 1: Configure your Bright Data scraping browser endpoint
 *  - Get endpoint from: https://brightdata.com/cp/zones
 *  - Create new scraping browser: https://docs.brightdata.com/scraping-automation/scraping-browser/quickstart
 *  - Websocket format: wss://brd-customer-[id]-zone-[zone]:[password]@[domain]:[port]
 */
const BROWSER_WS = process.env.BRIGHT_DATA_SCRAPING_BROWSER_WEBSOCKET_ENDPOINT || "YOUR_BRIGHT_DATA_SCRAPING_BROWSER_WEBSOCKET_ENDPOINT";

// STEP 2: Run `node booking-hotel-scraping.js` commend on terminal

// Search parameters
const SEARCH_LOCATION = "New York";
const CHECK_IN_DAYS_FROM_NOW = 1;  // Check-in tomorrow
const CHECK_OUT_DAYS_FROM_NOW = 2;  // Check-out day after tomorrow

// Helper function to add days to a date
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// Helper function to format date for Booking.com
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Calculate check-in and check-out dates
const today = new Date();
const checkInDate = formatDate(addDays(today, CHECK_IN_DAYS_FROM_NOW));
const checkOutDate = formatDate(addDays(today, CHECK_OUT_DAYS_FROM_NOW));

// Main function to run the hotel search
async function searchHotels() {
  console.log("🔍 Starting hotel search process...");
  console.log(`📍 Searching for hotels in: ${SEARCH_LOCATION}`);
  console.log(`📅 Check-in date: ${checkInDate}`);
  console.log(`📅 Check-out date: ${checkOutDate}`);
  
  // Connect to browser
  console.log("🌐 Connecting to browser...");
  const browser = await puppeteer.connect({
    browserWSEndpoint: BROWSER_WS,
  });
  console.log("✅ Successfully connected to browser");
  
  // Open new page and go to Booking.com
  console.log("🌐 Opening Booking.com...");
  const page = await browser.newPage();
  await page.goto(BOOKING_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  console.log("✅ Successfully loaded Booking.com");
  
  // Handle popup if it appears
  await handlePopup(page);
  
  // Fill search form and submit
  console.log("📝 Filling search form...");
  await fillSearchForm(page);
  console.log("✅ Search form submitted successfully");
  
  // Get and display results
  console.log("🔍 Searching for available hotels...");
  const results = await getHotelResults(page);
  
  // Display results in a table
  console.log("\n📊 Search Results:");
  console.log("==================");
  
  // Format results for table display
  const tableData = results.map((hotel, index) => ({
    '#': index + 1,
    'Hotel Name': hotel.name,
    'Price': hotel.price,
    'Rating': hotel.rating
  }));
  
  // Display the table
  console.table(tableData);
  console.log(`\n✅ Found ${results.length} hotels`);
  
  // Close browser
  console.log("👋 Closing browser...");
  await browser.close();
  console.log("✅ Browser closed successfully");
}

// Handle the sign-in popup if it appears
async function handlePopup(page) {
  try {
    console.log("⚠️ Checking for popup...");
    const closeButton = await page.waitForSelector('[aria-label="Dismiss sign-in info."]', { timeout: 25000 });
    await closeButton.click();
    console.log("✅ Popup closed successfully");
  } catch (e) {
    console.log("ℹ️ No popup appeared - continuing with search");
  }
}

// Fill and submit the search form
async function fillSearchForm(page) {
  // Fill location
  console.log("📍 Entering search location...");
  const searchInput = await page.waitForSelector('[data-testid="destination-container"] input');
  await searchInput.type(SEARCH_LOCATION);
  console.log("✅ Location entered successfully");
  
  // Select dates
  console.log("📅 Selecting dates...");
  await page.click('[data-testid="searchbox-dates-container"]');
  await page.waitForSelector('[data-testid="searchbox-datepicker-calendar"]');
  await page.click(`[data-date="${checkInDate}"]`);
  await page.click(`[data-date="${checkOutDate}"]`);
  console.log("✅ Dates selected successfully");
  
  // Submit search
  console.log("🔍 Submitting search...");
  await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
  ]);
  console.log("✅ Search submitted successfully");
}

// Extract hotel information from search results
async function getHotelResults(page) {
  console.log("🏨 Extracting hotel information...");
  return await page.$$eval('[data-testid="property-card"]', cards => 
    cards.map(card => ({
      name: card.querySelector('[data-testid="title"]')?.innerText || 'N/A',
      price: card.querySelector('[data-testid="price-and-discounted-price"]')?.innerText || 'N/A',
      rating: card.querySelector('[data-testid="review-score"]')?.innerText || 'N/A'
    }))
  );
}

// Start the search
searchHotels();