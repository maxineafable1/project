import React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

export default function PicsCarousel({ pics }: { pics: string[] }) {
  return (
    <Carousel opts={{ loop: true }}>
      <CarouselContent>
        {pics.map((pic) => (
          <CarouselItem key={pic}>
            <Image
              src={pic}
              alt="Profile picture"
              width={1920}
              height={1080}
              className="object-contain aspect-square w-full md:max-h-[700px]"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
