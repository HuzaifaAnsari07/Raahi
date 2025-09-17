import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

export default function ContactRoadmapPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Contact Roadmap</h1>
      <Card>
        <CardHeader>
          <CardTitle>NMMT Organizational Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] w-full rounded-md border p-4">
            <div className="relative min-w-[1200px] h-[800px]">
              <Image
                src="/roadmap.png"
                alt="Organizational Chart"
                fill
                objectFit="contain"
              />
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
