
'use client';

import { APIProvider, Map as GoogleMap, AdvancedMarker } from '@vis.gl/react-google-maps';
import { BusIcon } from './icons';
import { useEffect, useState } from 'react';

export default function Map({ busPosition }: { busPosition: { lat: number, lng: number } }) {
  const [apiKey, setApiKey] = useState<string | undefined>(undefined);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
  }, []);

  if (!isClient) {
    // Return a placeholder or null during server-side rendering or before hydration.
    return (
        <div className="flex h-full w-full items-center justify-center bg-muted">
            <p>Loading map...</p>
        </div>
    );
  }
  
  if (!apiKey) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted p-4 text-center">
        <div className="text-destructive-foreground bg-destructive p-4 rounded-md">
          <p className="font-bold">Google Maps API Key is missing.</p>
          <p className="text-sm">Please add it to your .env.local file to enable map functionality.</p>
          <code className="mt-2 block bg-black/20 p-1 rounded text-xs">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE</code>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <GoogleMap
        style={{ width: '100%', height: '100%' }}
        defaultCenter={{ lat: 19.0760, lng: 72.8777 }}
        center={busPosition}
        defaultZoom={13}
        zoom={15}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId={'f1b74e693259a415'}
        onLoad={(map) => {
            // You can add logic here to handle map loading events
        }}
        onError={(error) => {
            console.error("Google Maps Error:", error);
        }}
      >
        <AdvancedMarker position={busPosition}>
            <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg border-2 border-background'>
                <BusIcon className='w-6 h-6 text-primary-foreground' />
            </div>
        </AdvancedMarker>
      </GoogleMap>
    </APIProvider>
  );
}
