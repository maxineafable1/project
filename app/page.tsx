import Divider from "@/components/Divider";
import Navbar from "@/components/Navbar";
import { ArrowRight, ChartLine, CircleStar, Dumbbell } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <div className="max-w-screen-xl mx-auto">
        <Navbar />
      </div>
      <Divider />
      <div className="px-8 max-w-screen-xl mx-auto py-20 grid md:grid-cols-2 gap-8">
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
        <div className="bg-neutral-400 h-60">
          {/* gif display */}
        </div>
      </div>
      <div className="bg-neutral-100 dark:bg-neutral-700 py-20 w-full">
        <div className="max-w-screen-xl mx-auto px-8 md:gap-8 gap-16 grid md:grid-cols-3">
          <div className="space-y-4">
            <div className="p-2 rounded-md bg-blue-500 w-fit">
              <Dumbbell className="text-white" />
            </div>
            <h2 className="text-lg font-bold">Add Exercise</h2>
            <p className="max-w-[40ch]">Create your workouts in seconds. Stay consistent and keep your fitness journey all in one place.</p>
          </div>
          <div className="space-y-4">
            <div className="p-2 rounded-md bg-blue-500 w-fit">
              <ChartLine className="text-white" />
            </div>
            <h2 className="text-lg font-bold">Track Progress</h2>
            <p className="max-w-[40ch]">See your numbers climb over time. Visualize your gains and stay motivated to beat your last PR.</p>
          </div>
          <div className="space-y-4">
            <div className="p-2 rounded-md bg-blue-500 w-fit">
              <CircleStar className="text-white" />
            </div>
            <h2 className="text-lg font-bold">Manage Your Routine</h2>
            <p className="max-w-[40ch]">Make quick changes to your workouts anytime. Stay organized and keep your training on track.</p>
          </div>
        </div>
      </div>
      <div className="px-8 py-20 max-w-screen-xl mx-auto flex max-md:flex-col max-md:gap-8 justify-between items-start md:items-center">
        <div className="space-y-8">
          <h2 className="md:text-5xl text-4xl font-bold">Liftts Is <span className="text-blue-500">Free.</span> Always.</h2>
          <p className="md:text-xl text-lg max-w-[32ch]">No subscriptions. No cost. Just Liftts, built to help you hit new PRs.</p>
        </div>
        <Link
          href='/dashboard'
          className='px-8 py-2 rounded-full 
            bg-neutral-100 text-black dark:text-white inline-flex gap-2 items-center
            dark:bg-neutral-700 dark:hover:bg-neutral-600
            hover:bg-neutral-200 transition-colors focus-visible:outline-blue-500 focus-visible:outline-2'
        >
          Start Free Today <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
