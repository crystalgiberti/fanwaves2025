import { useEffect } from 'react';

export default function KeepAlive() {
  useEffect(() => {
    // Keep-alive function to ping the server
    const keepServerAlive = async () => {
      try {
        // Use a lightweight endpoint to keep server active
        await fetch('/api/products?limit=1', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        console.log('🏃 Keep-alive ping sent');
      } catch (error) {
        console.log('Keep-alive ping failed (normal if server is starting)');
      }
    };

    // Send initial ping after 30 seconds
    const initialTimeout = setTimeout(keepServerAlive, 30000);

    // Then ping every 3 minutes (180 seconds)
    const interval = setInterval(keepServerAlive, 180000);

    // Cleanup on unmount
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  // This component doesn't render anything
  return null;
}
