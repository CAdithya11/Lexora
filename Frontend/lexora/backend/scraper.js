const axios = require('axios');

async function fetchPublicWebsiteHTML(url) {
    try {
        const config = {
            headers: {
                'User-Agent': 'CustomWebScraper/1.0 (https://example.com/bot; bot@example.com)'
            }
        };

        const response = await axios.get(url, config);
        return {
            success: true,
            html: response.data,
            status: response.status
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
            status: error.response?.status
        };
    }
}

module.exports = fetchPublicWebsiteHTML;