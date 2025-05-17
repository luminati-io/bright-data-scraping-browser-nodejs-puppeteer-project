# Bright Data Amazon Product Scraper

This project demonstrates how to use Bright Data's Scraping Browser to search for products on Amazon.com. It provides a practical example of web scraping with automated browser control.

<a href="https://codesandbox.io/p/devbox/github/luminati-io/bright-data-scraping-browser-nodejs-project?file=%2Famazon-product-scraping.js" target="_blank" rel="noopener">Open in CodeSandbox</a>, sign in with GitHub account, then fork the repository to begin making changes.

### Getting Started

1. Replace `YOUR_BRIGHT_DATA_SCRAPING_BROWSER_ENDPOINT` with your actual Bright Data scraping browser webSocket endpoint in `amazon-product-scraping.js`
2. Run `node amazon-product-scraping.js` to start scraping


## 💻 Usage

1. Replace `YOUR_BRIGHT_DATA_SCRAPING_BROWSER_ENDPOINT` with your actual Bright Data scraping browser WebSocket endpoint in `amazon-product-scraping.js`

2. Modify search parameters in `amazon-product-scraping.js`:
   ```javascript
   const SEARCH_TERM = "laptop";   // Change to your search term
   ```

3. Run the script:
   ```bash
   node amazon-product-scraping.js
   ```

## 📊 Example Output

```
📊 AMAZON SEARCH RESULTS for "laptop"
=======================

#1 ASUS Vivobook Go 15 L510 Thin & Light Laptop, 15.6" FHD Display, Intel Celeron N4020 Processor, 4GB RAM, 64GB Storage, Windows 11 Home in S Mode, 1 Year Microsoft 365, Star Black, L510MA-WB04
   💰 Price: $249.99
   ⭐ Rating: 4.3 out of 5 stars
   --------------------------------------------------

#2 Acer Aspire 3 A315-24P-R7VH Slim Laptop | 15.6" Full HD IPS Display | AMD Ryzen 3 7320U Quad-Core Processor | AMD Radeon Graphics | 8GB LPDDR5 | 128GB NVMe SSD | Wi-Fi 6 | Windows 11 Home in S Mode
   💰 Price: $299.99
   ⭐ Rating: 4.4 out of 5 stars
   --------------------------------------------------

#3 HP 15.6" HD Laptop, Intel Celeron N4500, 8GB RAM, 256GB SSD, Silver, Windows 11 Home in S Mode
   💰 Price: $279.00
   ⭐ Rating: 4.2 out of 5 stars
   --------------------------------------------------

#4 Lenovo IdeaPad 1 14 Laptop, 14.0" HD Display, Intel Celeron N4020, 4GB RAM, 64GB Storage, Intel UHD Graphics 600, Win 11 in S Mode, Cloud Grey
   💰 Price: $199.99
   ⭐ Rating: 4.1 out of 5 stars
   --------------------------------------------------

#5 HP 14" HD Laptop, Intel Celeron N4020, 4GB RAM, 64GB Storage, Pale Rose Gold, Windows 11 Home in S Mode
   💰 Price: $219.99
   ⭐ Rating: 4.3 out of 5 stars
   --------------------------------------------------

✅ Found 5 products for "laptop"
```