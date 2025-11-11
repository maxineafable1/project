import Divider from "@/components/Divider";
import Navbar from "@/components/Navbar";
import { ArrowRight, ChartLine, CircleStar, Dumbbell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <div className="max-w-screen-xl mx-auto">
        <Navbar />
      </div>
      <Divider />
      <div className="px-8 max-w-screen-xl mx-auto py-20 grid grid-cols-2">
        <div className="space-y-8 ">
          <h1 className="text-6xl max-w-[15ch] font-bold">Track Your Lifts <span className="text-blue-500">Beat Your PRs</span></h1>
          <h2 className="text-lg max-w-[35ch]">Track every workout, stay consistent, and reach new personal records with Liftts.</h2>
          <Link
            href='/dashboard'
            className='px-8 py-2 rounded-full 
            bg-neutral-100 text-black dark:text-white inline-flex gap-2 items-center
            dark:bg-neutral-700 dark:hover:bg-neutral-600
            hover:bg-neutral-200 transition-colors focus-within:outline-blue-500 focus-within:outline-2'
          >
            Start Tracking <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="bg-neutral-400 h-60">
          {/* gif display */}
        </div>
      </div>
      <div className="bg-neutral-100 dark:bg-neutral-700 py-20 w-full">
        <div className="max-w-screen-xl mx-auto px-8 gap-8 grid grid-cols-3">
          <div className="space-y-4">
            <div className="p-2 rounded-md bg-blue-500 w-fit">
              <Dumbbell className="text-white" />
            </div>
            <h2 className="text-lg">Add Workouts</h2>
            <p>Create your workouts in seconds. Stay consistent and keep your fitness journey simple, focused, and all in one place.</p>
          </div>
          <div className="space-y-4">
            <div className="p-2 rounded-md bg-blue-500 w-fit">
              <ChartLine className="text-white" />
            </div>
            <h2 className="text-lg">Track Progress</h2>
            <p>See your numbers climb over time. Visualize your gains and stay motivated to beat your last PR.</p>
          </div>
          <div className="space-y-4">
            <div className="p-2 rounded-md bg-blue-500 w-fit">
              <CircleStar className="text-white" />
            </div>
            <h2 className="text-lg">Manage Your Routine</h2>
            <p>Make quick changes to your workouts anytime. Stay organized and keep your training on track.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
