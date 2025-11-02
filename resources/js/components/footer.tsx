
export default function Footer(){
    return(
        <footer className="py-5 flex items-center justify-center border-t text-sm text-muted-foreground mt-20 px-5">
            Copyright © {new Date().getFullYear()} Joseph DLC. All rights reserved.
        </footer>
    );
}