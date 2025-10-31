import { ReactNode } from "react";
import DefaultTopbar from "@/components/default-topbar";
import DefaultFooter from "@/components/default-footer";

export default function Default({ children }: { children: ReactNode }){
    return(
        <div className="min-h-screen px-4">
            <div className="max-w-screen-2xl mx-auto">
                <header className="w-full">
                    <DefaultTopbar />
                </header>
                {children}
                <DefaultFooter/>
            </div>
        </div>
    );
}