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
          <h1 className="text-6xl max-w-[15ch] font-bold">Track Your Lifts <span className="text-sky-500">Beat Your PRs</span></h1>
          <h2 className="text-lg">Built for lifters who want results without the hassle.
            Simple to use, powerful where it matters, and made to help you stay consistent every day.</h2>
          <Link
            href='/'
            className='px-8 py-2 rounded-full 
            bg-white dark:bg-neutral-100 text-neutral-900 inline-flex gap-2 items-center
            hover:bg-neutral-50 dark:hover:bg-neutral-200 transition-colors
            border border-neutral-200
            '
          >
            Get Started <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="bg-neutral-400 h-60">
          {/* gif display */}
        </div>
      </div>
      <div className="bg-white dark:bg-neutral-700 py-20 w-full">
        <div className="max-w-screen-xl mx-auto px-8 gap-8 grid grid-cols-3">
          <div className="space-y-4">
            <div className="p-2 rounded-md bg-sky-500 w-fit">
              <Dumbbell className="text-white" />
            </div>
            <h2 className="text-lg">Add Workouts</h2>
            <p>Log any lift or routine in seconds. Keep your training simple and flexible with easy workout creation.</p>
          </div>
          <div className="space-y-4">
            <div className="p-2 rounded-md bg-sky-500 w-fit">
              <ChartLine className="text-white" />
            </div>
            <h2 className="text-lg">Track Progress</h2>
            <p>See your numbers climb over time. Visualize your gains and stay motivated to beat your last PR.</p>
          </div>
          <div className="space-y-4">
            <div className="p-2 rounded-md bg-sky-500 w-fit">
              <CircleStar className="text-white" />
            </div>
            <h2 className="text-lg">Personal Records</h2>
            <p>Automatically track your best lifts and celebrate every new milestone.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
