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
          <CarouselItem
            key={pic}
            className="relative"
          >
            <div
              className="
              absolute inset-0
              bg-[image:var(--image-url)] bg-no-repeat
              bg-center bg-cover blur -z-50
            "
            style={
              {
                "--image-url": `url(${pic})`,
              } as React.CSSProperties
            }
            ></div>
            <Image
              src={pic}
              alt="Profile picture"
              width={1920}
              height={1080}
              className="object-contain z-50 aspect-square w-full md:max-h-[700px]"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
