import axios from 'axios'
import React, { useEffect } from 'react'

export default function Html() {
  const axios = require('axios');

  async function fetchPublicWebsiteHTML(url) {
      try {
          // Add a user agent to identify the bot
          const config = {
              headers: {
                  'User-Agent': 'CustomWebScraper/1.0 (https://example.com/bot; bot@example.com)'
              }
          };

          // Fetch the webpage
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

  // Example usage
  async function main() {
      const url = 'https://example.com';
      const result = await fetchPublicWebsiteHTML(url);
      
      if (result.success) {
          console.log('Status:', result.status);
          console.log('HTML:', result.html);
      } else {
          console.log('Error:', result.error);
      }
  }

  module.exports = fetchPublicWebsiteHTML;

  return (
    <div>Html</div>
  )
}
