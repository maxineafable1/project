import Divider from "@/components/Divider";
import Navbar from "@/components/Navbar";
import { getSession } from "@/lib/session";
import { ArrowRight, ChartLine, Check, Dumbbell, Weight, X } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Image from "next/image";

const genericAppsBullet = [
  'Raw logs',
  'No weekly insight',
  'No PR tracking'
]

const myAppBullet = [
  'Workout and bodyweight tracking',
  'Weekly bodyweight stats',
  '1RM PRs for Squat, Bench, Deadlift, OHP',
]

const features = [
  {
    icon: Dumbbell,
    title: "Add Exercise",
    description: "Create your workouts in seconds. Stay consistent and keep your fitness journey all in one place.",
  },
  {
    icon: ChartLine,
    title: "Track Progress",
    description: "See your numbers climb over time. Visualize your gains and stay motivated to beat your last PR.",
  },
  {
    icon: Weight,
    title: "Track Bodyweight",
    description: "Add your weight anytime, track progress, and see weekly averages, min/max, and trends.",
  },
];

export default async function Home() {
  const session = await getSession()

  return (
    <div className="">
      <div className="max-w-screen-xl mx-auto">
        <Navbar session={session} />
      </div>
      <Divider />
      <div className="px-8 max-w-screen-xl mx-auto py-24 grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <h1 className="md:text-6xl text-4xl md:max-w-[15ch] font-bold">Track Your Lifts <span className="text-blue-500">Beat Your PRs</span></h1>
          <h2 className="md:text-xl text-lg max-w-[35ch]">Track every workout, stay consistent, and reach new personal records with Liftts.</h2>
          <Link
            href='/dashboard'
            className='px-8 py-2 rounded-full
            bg-neutral-100 text-black dark:text-white inline-flex gap-2 items-center
            dark:bg-neutral-700 dark:hover:bg-neutral-600
            hover:bg-neutral-200 transition-colors focus-visible:outline-blue-500 focus-visible:outline-2'
          >
            Start Tracking <ArrowRight className="size-4" />
          </Link>
        </div>
        <video className="rounded-lg shadow focus-visible:outline-blue-500 focus-visible:outline-2" autoPlay playsInline muted loop>
          <source src="/liftts-demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <Card className="max-w-screen-xl mx-auto max-sm:p-10 p-12 space-y-4 my-6 xl:my-12 max-xl:rounded-none">
        <CardHeader className="p-0 flex max-sm:flex-col gap-4 items-center justify-between">
          <CardTitle className="text-3xl">Know Your Numbers</CardTitle>
          <CardDescription className="max-w-sm">
            Add your workouts and bodyweight, and see weekly summaries that highlight your gains and improvements.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 md:gap-8 gap-16 grid md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }, index) => (
            <div key={index} className="space-y-4">
              <div className="p-2 rounded-md bg-blue-500 w-fit">
                <Icon className="text-white" />
              </div>
              <h2 className="text-lg font-bold">{title}</h2>
              <p className="max-w-[40ch]">{description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="px-8 py-24 max-w-screen-xl mx-auto space-y-12 md:mb-8">
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-bold">Why Liftts?</h2>
          <div className="opacity-50">Stop writing. Start tracking.</div>
        </div>
        <div className="flex max-sm:flex-col justify-center *:flex-1 sm:*:max-w-sm gap-12">
          <Card className="">
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Notes/Generic Apps</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {genericAppsBullet.map(val => (
                  <li key={val} className="flex items-center gap-2">
                    <X />
                    <span>{val}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-blue-500 border-4">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Liftts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {myAppBullet.map(val => (
                  <li key={val} className="flex items-center gap-2">
                    <Check />
                    <span>{val}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="px-8 py-24 bg-blue-900 text-white ">
        <div className="max-w-screen-xl mx-auto flex max-md:flex-col max-md:gap-8 justify-between items-start md:items-center">
          <div className="space-y-8">
            <h2 className="md:text-5xl text-4xl font-bold">Liftts Is Free. Always.</h2>
            <p className="md:text-xl text-lg max-w-[32ch]">No subscriptions. No cost. Just Liftts, built to help you hit new PRs.</p>
          </div>
          <Link
            href='/dashboard'
            className='px-8 py-2 rounded-full 
            bg-neutral-100 text-black dark:text-white inline-flex gap-2 items-center
            dark:bg-neutral-700 dark:hover:bg-neutral-600 hover:bg-neutral-200 transition-colors focus-visible:outline-blue-500 focus-visible:outline-2'
          >
            Start Free Today <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
      <div className="max-xl:px-4 py-8 flex items-center justify-between max-w-screen-xl mx-auto">
        <Link href='/' className="text-lg font-bold focus-visible:outline-blue-500 focus-visible:outline-2 flex items-center gap-1">
          <Image src={'/icon.png'} className='mx-auto' alt='Liftts logo icon' width={25} height={25} />
          <div className="">
            Liftts
          </div>
        </Link>
        <div className="text-sm">
          &copy;Liftts {new Date().getFullYear()}. All rights reserved.
        </div>
      </div>
    </div>
  );
}
