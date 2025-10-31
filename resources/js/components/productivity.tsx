import { motion } from "framer-motion";
import { login, register } from "@/routes/portal/auth";

export default function Productivity(){
    return(
        <div className="container px-4 md:px-6 text-center">
            <div className="mx-auto flex max-w-3xl flex-col items-center justify-center space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }} 
                    className="space-y-2"
                >
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to boost your team's productivity?</h2>
                    <p className="mx-auto max-w-[700px] text-sm md:text-xl text-pretty">Join thousands of teams that use Zentra to get more done, together.</p>
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }} 
                    className="flex gap-4"
                >
                    <a href={login.url()} data-discover="true">
                        <button data-slot="button" className="inline-flex rounded-xl items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 h-10 rounded-md px-6 has-[&gt;svg]:px-4">
                            Get Started Free
                        </button>
                    </a>
                    <a href={register.url()} data-discover="true">
                        <button data-slot="button" className="inline-flex rounded-xl items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer border shadow-xs dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-10 rounded-md px-6 has-[&gt;svg]:px-4 bg-transparent border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                        Sign In</button>
                    </a>
                </motion.div>
            </div>
        </div>
    );
}