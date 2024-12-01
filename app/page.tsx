'use client';
import axios from 'axios';
import React, { useState } from 'react';
import { ButtonLoading } from '@/components/ButtonLoading';
const Home = () => {
  const [url, setUrl] = useState('');
  const [res, setRes] = useState('');
  const [loading, setLoading] = useState(false);

  async function handlePing() {
    if (!url || !url.match(/^(https?:\/\/)/)) {
      setRes('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    setLoading(true);
    setRes('');
    try {
      const response = await axios.post('/api/ping', { url });
      if (response.data.message === 'UP') {
        setRes('✅ All ok - Website is UP!');
      } else {
        setRes('❌ The website appears to be DOWN.');
      }
    } catch (error) {
      setRes('❌ Error in pinging the URL. Check the URL and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Ping a URL</h1>
      <input
        className="w-full max-w-md px-4 py-2 border rounded-md bg-gray-800 border-gray-700 text-white mb-4"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL (e.g., https://example.com)"
      />
      <button
        onClick={handlePing}
        disabled={loading}
        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-medium"
      >
        {loading ? <ButtonLoading /> : 'ping'}
      </button>
      {res && <p className="mt-4">{res}</p>}
    </div>
  );
};

export default Home;
