
'use client';

import TrackBusClient from '@/components/track-bus-client';
import { buses, busRoutes } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function TrackBusPage({ params }: { params: { busId: string } }) {
  const bus = buses.find((b) => b.id === params.busId);
  const route = busRoutes.find((r) => r.id === bus?.routeId);
  const busImage = PlaceHolderImages.find((img) => img.id === 'bus-front');

  if (!bus || !route) {
    return <div>Bus not found</div>;
  }

  return <TrackBusClient bus={bus} route={route} busImage={busImage} />;
}
