const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/proxy', async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) {
            return res.status(400).json({ error: 'Missing URL parameter' });
        }

        console.log(`Opening browser to: ${url}`);

        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:110.0) Gecko/20100101 Firefox/110.0');
        await page.goto(url, { waitUntil: 'networkidle2' });

        const jobListings = await page.evaluate(() => {
            let jobs = [];
            document.querySelectorAll('.job-title-class').forEach((jobElement, index) => {
                const title = jobElement.innerText.trim();
                const location = document.querySelectorAll('.job-location-class')[index]?.innerText.trim() || 'N/A';
                const salary = document.querySelectorAll('.job-salary-class')[index]?.innerText.trim() || 'N/A';
                
                jobs.push({ title, location, salary });
            });
            return jobs;
        });

        await browser.close();

        res.json({ success: true, jobs: jobListings });
    } catch (error) {
        console.error('Proxy Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch data', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
