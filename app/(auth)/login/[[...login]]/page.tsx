import { SignIn } from "@clerk/nextjs";
import type { ReactElement } from "react";

const LoginPage = (): ReactElement => (
	<main className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 py-12">
		<div className="mx-auto w-full max-w-2xl text-center">
			<SignIn />
		</div>
	</main>
);

export default LoginPage;
