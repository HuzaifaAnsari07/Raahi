
'use client';

import { APIProvider, Map as GoogleMap, AdvancedMarker } from '@vis.gl/react-google-maps';
import { BusIcon } from './icons';

export default function Map({ busPosition }: { busPosition: { lat: number, lng: number } }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted p-4 text-center">
        <p className="text-destructive-foreground bg-destructive p-4 rounded-md">
          <b>Google Maps API Key is missing.</b>
          <br />
          Please add it to your .env file to enable map functionality.
        </p>
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
