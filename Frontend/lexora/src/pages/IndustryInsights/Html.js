import axios from 'axios'
import React, { useEffect } from 'react'

export default function Html() {
  const fetchData = async (siteUrl) => {
    try {
        const response = await axios.get(`http://localhost:5000/proxy?url=${encodeURIComponent(siteUrl)}`);
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
      
      fetchData('https://ikman.lk/en/ads/sri-lanka/it-hardware-and-network-engineer-jobs');
  }, []);

  return (
    <div>Html</div>
  )
}
