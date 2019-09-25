import React, { useState } from 'react';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import avatar from './img/ava.png';
import { useSpring, animated } from 'react-spring';


export interface LayoutProps {
    children: any
}
 
const Layout: React.SFC<LayoutProps> = ({children}) => {
    const isDesktop = window.innerWidth > 562
    const sidebar = {
        open: isDesktop ? "15%" : "50%",
        close: isDesktop ? "4%" : "0%"
    }
    const [theme, setTheme] = useState<string>("theme-light")
    const [isSidebar, setSidebar] = useState<boolean>(isDesktop)
    const [isNavbar, setNavbar] = useState<boolean>(false)
    const sidebarTransition = useSpring({ width: isSidebar ? sidebar.open : sidebar.close, opacity: isDesktop ? 1 : isSidebar ? 1 : 0 })
    const pageTransition = useSpring({ width: !isDesktop ? "100%" : isSidebar ? "85%" : "96%" })
    const navbarTransition = useSpring({ opacity: isNavbar ? 1 : 0})
    const sidebarFade = useSpring({opacity : isSidebar ? 1 : 0})

    return ( 
        <div className={theme}>
            <div className="bg-secondary h-screen w-screen">
                {/* Navbar */}
                <header className="top-0 fixed w-full bg-primary z-50">
                    <div className="flex items-center px-6 justify-between  h-16">
                        <div className="left-0 flex items-start w-1/2">
                            <button className="block" onClick={() => setSidebar(!isSidebar)}>
                                <i className="fas fa-bars text-primary hover:text-secondary"></i>
                            </button>
                            <h3 className="text-primary pl-4">Logo</h3>
                        </div>
                        <div className="right-0 w-48 relative">
                            <button className="flex items-center w-full justify-around" onClick={() => setNavbar(!isNavbar)}>
                                <img src={avatar} className="w-8 h-8 rounded-full" alt=""/>
                                <p className="text-primary text-sm block hover:text-secondary">Username Username</p>
                                <i className="fa fa-angle-down text-secondary text-xs"></i>
                            </button>
                            <animated.div className="absolute bg-primary w-full rounded-b shadow mt-4" style={navbarTransition}>
                                <ul className="py-3">
                                    <li className="text-primary flex items-center py-2 px-4 hover:bg-secondary">
                                        <i className="fas fa-tachometer-alt text-secondary text-xs"></i>                                
                                        <p className="ml-2 text-sm">Profile</p>
                                    </li>
                                </ul>
                            </animated.div>
                        </div>
                    </div>
                </header>
                <div className="flex justify-between pt-16">
                    {/* Sidebar */}
                    <animated.aside style={sidebarTransition} className="bg-primary z-50 left-0 shadow fixed">
                        <div className="h-screen my-4">
                            <ul className="py-3">
                                <li className="text-primary flex items-center py-2 px-6 hover:bg-secondary">
                                    <i className="fas fa-tachometer-alt text-secondary text-xs"></i>                                
                                    <animated.p className="ml-2 text-sm" style={sidebarFade}>Dashboard</animated.p>
                                </li>
                            </ul>
                            <animated.div className="flex bottom-0 fixed p-3" style={sidebarFade}>
                                <label className="inline-flex items-center p-2">
                                    <input type="radio" className="form-radio" checked={theme === "theme-light"} onChange={() => setTheme("theme-light")}/>
                                    <span className="ml-2 text-primary">Light</span>
                                </label>
                                <label className="inline-flex items-center p-2">
                                    <input type="radio" className="form-radio" checked={theme === "theme-dark"} onChange={() => setTheme("theme-dark")}/>
                                    <span className="ml-2 text-primary">Dark</span>
                                </label>
                            </animated.div>
                        </div>
                    </animated.aside>
                    {/* Container */}
                    <animated.main className="right-0 fixed overflow-y-auto max-h-full" style={pageTransition} onClick={() => !isDesktop && setSidebar(false)}>
                        <div className="m-4 md:m-6">
                            <section className="text-primary py-4">
                                <h1 className="text-primary text-lg font-semibold">
                                    Page Title
                                </h1>
                            </section>
                            <section className="bg-primary rounded px-8 py-6 my-4">
                                <div className="mb-8">
                                    <h3 className="text-primary font-bold text-sm">TITLE</h3>
                                    <h5 className="text-secondary font-hairline text-xs">Subtitle</h5>
                                </div>
                                <div className="text-primary text-xs font-normal mb-16 pb-2">
                                    { children }
                                </div>
                            </section>
                        </div>
                    </animated.main>
                </div>
            </div>
        </div>
    );
}
 
export default Layout;