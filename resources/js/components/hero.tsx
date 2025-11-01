import { motion } from "framer-motion";
import DarkZentra from "@/assets/images/dark-zentra.png";
import LightZentra from "@/assets/images/light-zentra.png";

const features = [
    { text: "No credit card required", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big size-4 text-primary" aria-hidden="true"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg> },
    { text: "Free plan available", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big size-4 text-primary" aria-hidden="true"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg> },
    { text: "Cancel anytime", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big size-4 text-primary" aria-hidden="true"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg> },
];

const actions = [
    {
        label: "Try for Free",
        href: "#",
        variant: "primary",
    },
    {
        label: "See Features",
        href: "#",
        variant: "outline",
    },
];

export default function Hero(){
    return(
        <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }} 
                    className="flex flex-col justify-center space-y-8"
                >
                    <div className="space-y-2" style={{ opacity: 1, transform: 'none' }}>
                        <h1 className="text-3xl font-bold text-pretty tracking-tighter sm:text-5xl xl:text-6xl/none">Get more done with <span className="text-primary">Zentra</span></h1>
                        <p className="max-w-[600px] text-muted-foreground md:text-xl text-pretty">The modern task management platform that helps teams organize, track, and complete work efficiently.</p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2" style={{ opacity: 1, transform: 'none' }}>
                        {actions.map((action, index) => (
                            <a key={index} href={action.href} data-discover="true">
                                <button
                                    data-slot="button"
                                    className={`inline-flex items-center rounded-xl justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer h-10 rounded-md has-[>svg]:px-4 ${
                                    action.variant === "primary"
                                        ? "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 px-8"
                                        : "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 px-6"
                                    }`}
                                >
                                    {action.label}
                                </button>
                            </a>
                        ))}
                    </div>
                    <div className="flex flex-col sm:flex-row md:items-center gap-4 text-sm text-muted-foreground" style={{ opacity: 1 }}>
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-1">
                                {feature.icon}
                                <span>{feature.text}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="mx-auto flex items-center justify-center lg:justify-end max-w-full overflow-hidden" style={{ opacity: 1, transform: "none" }}
                >
                    <div className="relative w-full max-w-[260px]  md:max-w-lg">
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-primary/20 blur-3xl hidden sm:block"></div>
                        <img
                            src={DarkZentra}
                            alt="Zentra Dashboard Light"
                            className="relative rounded-xl shadow-xl border object-cover w-full max-w-full dark:hidden"
                        />
                        <img
                            src={LightZentra}
                            alt="Zentra Dashboard Dark"
                            className="relative rounded-xl shadow-xl border object-cover w-full max-w-full hidden dark:block"
                        />                    
                    </div>
                </motion.div>
            </div>
        </div>
    );
}