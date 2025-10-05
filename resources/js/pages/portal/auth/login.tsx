import { Head } from "@inertiajs/react";
import { Auth } from "@/types/portal/auth";
import { PocketKnife } from "lucide-react";
import { LoginForm } from "@/components/login-form";

export default function LoginPage({ values }: { values: Auth }) {
	return (
		<>
			<Head title={values.page_title}>
				<meta name="description" content="Login to Zentra admin portal" />
			</Head>
			<div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
				<div className="flex w-full max-w-md flex-col gap-6">
					<a href="#" className="flex items-center gap-2 self-center font-medium">
						<div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
							<PocketKnife className="size-4" />
						</div>
						Zentra
					</a>
					<LoginForm />
				</div>
			</div>
		</>
	)
}
