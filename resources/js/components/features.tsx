import { motion } from "framer-motion";

const header = {
    title: "Our Features",
    introduction: "Everything you need to manage tasks effectively",
    description: "Our powerful features help teams stay organized and deliver projects on time",
}

const features = [
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users size-8 text-primary" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>,
        title: "Team Collaboration",
        description: "Work together seamlessly with your team in shared workspaces with real-time updates.",
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-check size-8 text-primary" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path><path d="m9 16 2 2 4-4"></path></svg>,
        title: "Task Management",
        description: "Organize tasks with priorities, due dates, comments, and track progress visually.",
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><path d="M2 20h.01"></path><path d="M7 20v-4"></path><path d="M12 20v-8"></path><path d="M17 20V8"></path><path d="M22 4v16"></path></svg>,
        title: "Progress Tracking",
        description: "Visualize project progress with beautiful charts and get insights into team productivity.",
    },
];

export default function Features() {
    return(
        <div className="container px-4 md:px-6" style={{ opacity: 1, transform: 'none' }}>
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center space-y-4 text-center"
            >
                <div className="inline-block rounded-xl bg-muted px-3 py-1 text-sm">{header.title}</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-pretty">
                    {header.introduction}
                </h2>
                <p className="max-w-[900px] text-center text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {header.description}
                </p>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 md:gap-12 lg:gap-16 mt-16"
            >
                {features.map((feature, index) => (
                    <div key={index} className="flex flex-col items-center space-y-4 text-center" style={{ opacity: 1, transform: 'none' }}>
                        <div className="bg-primary/10 p-3 rounded-full">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}