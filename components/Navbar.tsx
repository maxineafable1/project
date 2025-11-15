'use client'

import { authClient } from '@/lib/auth-client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Navbar() {
	const {
		data: session,
	} = authClient.useSession()

	const router = useRouter()

	return (
		<div className='flex justify-between items-center py-4 px-8'>
			<Link href='/' className="text-lg font-bold focus-visible:outline-blue-500 focus-visible:outline-2">
				Lift<span className='text-blue-500'>ts</span>
			</Link>
			<div className="flex gap-2 items-center">
				{!session ? (
					<>
						<Link
							href='/sign-in'
							className='text-sm px-6 py-1.5 rounded-full border border-neutral-300 not-dark:hover:bg-neutral-100 
                focus-visible:outline-blue-500 focus-visible:outline focus-visible:border-blue-500
                 dark:border-neutral-700 dark:hover:border-neutral-500 transition-colors '
						>
							Sign in
						</Link>
						<Link href='/sign-up'
							className='text-sm px-6 py-1.5 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors text-white
                  dark:focus-visible:outline-white focus-visible:outline-black focus-visible:outline-2
                '>
							Sign up
						</Link>
					</>
				) : (
					<>
						<button
							onClick={async () => {
								await authClient.signOut({
									fetchOptions: {
										onSuccess: () => {
											router.push("/");
										},
									},
								});
							}}
							className='text-sm px-6 py-1.5 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors text-white
                  dark:focus-visible:outline-white focus-visible:outline-black focus-visible:outline-2
                '
						>
							Sign out
						</button>
					</>
				)}

			</div>
		</div>
	)
}
