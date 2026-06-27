import Link from "next/link";

export default function NotFoundDuplicate() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-center">
			<div className="mb-4 font-semibold text-2xl text-gray-500">
				404 Not Found
			</div>
			<h1 className="mb-6 font-bold text-6xl text-gray-800">
				Oops! Page Not Found
			</h1>
			<p className="mb-8 text-gray-600">
				The page you are looking for doesn’t exist. Click the button below to go
				to the homepage.
			</p>
			<Link href="/">
				<a className="rounded-md bg-black px-6 py-3 text-white transition hover:bg-gray-800">
					Back to Homepage
				</a>
			</Link>
		</div>
	);
}
