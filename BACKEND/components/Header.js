import { RiBarChartHorizontalLine } from "react-icons/ri";
import { BiExitFullscreen } from "react-icons/bi";
import { GoScreenFull } from "react-icons/go";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Header({ handleAsideOpen }) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                setIsFullscreen(true);
            })
        } else {
            document.exitFullscreen().then(() => {
                setIsFullscreen(false);
            })
        }
    }

    const { data: session } = useSession();
    
        return <>
            <header className="header flex flex-sb">
                <div className="logo flex gap-2">
                    <h1>Admin</h1>
                    {session ? <div className="headerham flex flex-center" onClick={handleAsideOpen}>
                        <RiBarChartHorizontalLine />
                    </div> : null}
                    
                </div>
                <div className="rightnav flex gap-2">
                    <div onClick={toggleFullScreen}>
                        {isFullscreen ? <BiExitFullscreen /> : <GoScreenFull />}
                    </div>
                    <div className="notification">
                        <img src="/img/notification.png" alt="notification" />
                    </div>
                    <div className="profilenav">
                        <img src="/img/user.png" alt="user" />
                    </div>
                </div>
            </header>
        </>
    
}