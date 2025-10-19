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
			<div className="flex gap-4">
				{/* <Image src={''} alt='' /> */}
				<div className="">
					App Name
				</div>
			</div>
			<div className="flex gap-4 items-center">
				{!session ? (
					<>
						<Link
							href='/sign-in'
							className='text-sm 
								dark:text-neutral-100 dark:hover:text-neutral-50
							text-neutral-800 hover:text-neutral-900 transition-colors'
						>
							Sign in
						</Link>
						<Link href='/sign-up'
							className='px-8 py-2 bg-neutral-900 text-neutral-100 rounded-full 
                dark:bg-neutral-100 dark:text-neutral-900 text-sm
								hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors
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
							className='px-8 py-2 bg-neutral-900 text-neutral-100 rounded-full 
                dark:bg-neutral-100 dark:text-neutral-900 text-sm cursor-pointer
								hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors
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
