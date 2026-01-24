import { AppHeaer } from "@/components/app-header";

const Layout = ({children} : {children : React.ReactNode}) => {
    return(
        <>
            <AppHeaer />
            <main className="flex-1">
                {children}
            </main>
        </>
    )
}

export default Layout;