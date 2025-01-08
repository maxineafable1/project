"use client"

import React, { useEffect, useState } from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Image from "next/image"

export default function PicsCarousel({ pics }: { pics: string[] }) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(pics.length)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="relative">
      <Carousel opts={{ loop: true }} setApi={setApi}>
        <CarouselContent>
          {pics.map((pic) => (
            <CarouselItem key={pic} className="relative">
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
      <div 
        className="
        absolute bottom-4 left-1/2 transform -translate-x-1/2
        px-4 rounded py-2 mx-auto text-center w-fit text-sm bg-black/50">
        Slide {current} of {count}
      </div>
    </div>
  )
}
