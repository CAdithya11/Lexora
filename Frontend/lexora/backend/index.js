const scraper = require('./scraper.js');

// Add the URLs you want to scrape
const urls = [
    'https://example.com',
    'https://example.org'
];

// Function to scrape each URL
async function scrapeUrls() {
    for (const url of urls) {
        console.log(`Scraping ${url}...`);
        const result = await scraper(url);
        
        if (result.success) {
            console.log('Status:', result.status);
            console.log('HTML length:', result.html.length);
            // If you want to see the full HTML, uncomment the next line
            // console.log('HTML:', result.html);
        } else {
            console.log('Error:', result.error);
        }
        console.log('-------------------');
    }
}

// Run the scraper
scrapeUrls();