import { motion } from "framer-motion";

const header = {
    title: "How It Works",
    introduction: "Simple process, powerful results",
    description: "Get started in minutes and see improved team productivity",
};

const works = [
    {
        num: "1",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>,
        title: "Create an account",
        description: "Sign up for free and set up your first workspace in seconds.",
    },
    {
        num: "2",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
        title: "Invite your team",
        description: "Add your team members and start collaborating right away.",
    },
    {
        num: "3",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>,
        title: "Get things done",
        description: "Create projects, assign tasks, and track progress in real-time.",
    },
];

export default function Workflow(){
    return(
        <div className="container px-4 md:px-6" style={{ opacity: 1 }}>
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center space-y-4 text-center"
            >
                <div className="inline-block rounded-xl bg-muted px-3 py-1 text-sm">{header.title}</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{header.introduction}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">{header.description}</p>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-16"
            >
                {works.map((work, index) => (
                    <div key={index} className="relative flex flex-col items-center space-y-4 text-center" style={{ opacity: 1, transform: 'none' }}>
                        <div className="absolute -top-10 text-6xl font-bold text-muted/20">{work.num}</div>
                        <div className="bg-orange-600/10 p-3 rounded-full">{work.icon}</div>
                        <h3 className="text-xl font-bold">{work.title}</h3>
                        <p className="text-muted-foreground">{work.description}</p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}