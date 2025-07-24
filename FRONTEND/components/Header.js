import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiDownload } from "react-icons/bi";
import { FaGithub, FaInstagram, FaLinkedin, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa6";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoMoonSharp } from "react-icons/io5";
import { LuSun, LuSunMoon } from "react-icons/lu";

export default function Header() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode);
    }, [])

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
            localStorage.setItem('darkMode', true);
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('darkMode', false);
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    const router = useRouter();
    const [clicked, setClicked] = useState(false);
    const [activeLink, setActiveLink] = useState('/');

    const handleLinkClick = (link) => {
        setActiveLink(link);
        setClicked(false);
    }

    useEffect(() => {
        setActiveLink(router.pathname);
    }, [router.pathname]);

    const [mobile, setMobile] = useState(false);
    const handleMobileOpen = () => {
        setMobile(!mobile);
    }
    const handleMobileClose = () => {
        setMobile(false);
    }

    const hiddenHeroPages = ['/'];

    return <>
    {activeLink === '/' && (
        <section className="hero">
            <div className={darkMode ? '' : 'shining-star'}>
                <div className="night">
                    <div className="single-star"></div>
                    <div className="single-star"></div>
                    <div className="single-star"></div>
                    <div className="single-star"></div>
                    <div className="single-star"></div>
                </div>
            </div>
            <div className={darkMode ? '' : 'shooting-star'}>
                <div className="night">
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                </div>
            </div>
            <div className="intro_text">
                <div className={darkMode ? 'element_square' : 'element_square2'}>

                </div>
                <svg viewBox="0 0 1320 300">
                    <text x='50%' y='50%' text-anchor='middle' className="animate-stroke">HI</text>
                </svg>

            </div>
            <div className="container">
                <div className="flex w-100">
                    <div className="heroinfoleft">
                        <span className="hero_sb_title">I am Gani Maulana</span>
                        <h1 className="hero_title">Web Developer + <br /> <span className="typed-text">UX Designer</span></h1>
                        <div className="hero_img_box heroimgbox">
                            <img src="/img/pp_gani.jpg" alt="ganimaulana" />
                        </div>
                        <div className="lead">I break down complex user experience problems to create integrity focussed solutions that connect billion of people</div>
                        <div className="hero_btn_box">
                            <Link href='/' download={'/img/CV_GANIMAULANA.pdf'} className="download_cv">Download CV <BiDownload /></Link>
                            <ul className="hero_social">
                                <li><a href="/"><FaGithub /></a></li>
                                <li><a href="/"><FaLinkedin /></a></li>
                                <li><a href="/"><FaInstagram /></a></li>
                                <li><a href="/"><FaTiktok /></a></li>
                                <li><a href="/"><FaYoutube /></a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="heroimageright">
                        <div className="hero_img_box">
                            <img src="/img/pp_gani.jpg" alt="ganimaulana" />
                        </div>
                    </div>
                </div>

                <div className="funfect_area flex flex-sb">
                    <div className="funfect_item">
                        <h3>7+</h3>
                        <h4>Year of <br />
                        Experience</h4>
                    </div>
                    <div className="funfect_item">
                        <h3>20+</h3>
                        <h4>Projects <br />
                        Completed</h4>
                    </div>
                    <div className="funfect_item">
                        <h3>12+</h3>
                        <h4>OpenSource <br />
                        Library</h4>
                    </div>
                    <div className="funfect_item">
                        <h3>45+</h3>
                        <h4>Happy <br />
                        Customers</h4>
                    </div>
                </div>
            </div>
        </section>
    )}
        <header>
            <nav className="container flex flex-sb">
                <div className="logo flex gap-2">
                    <Link href='/'><img src={`/img/${darkMode ? 'white' : 'logo'}.png`} alt="logo" /></Link>
                    <h2>Gani Maulana</h2>
                </div>
                <div className="navlist flex gap-2">
                    <ul className="flex gap-2">
                        <li>
                            <Link href='/' onClick={() => handleLinkClick('/')} className={activeLink === '/' ? 'active' : ''}>Home</Link>
                        </li>
                        <li>
                            <Link href='/services' onClick={() => handleLinkClick('/services')} className={activeLink === '/services' ? 'active' : ''}>Services</Link>
                        </li>
                        <li>
                            <Link href='/projects' onClick={() => handleLinkClick('/projects')} className={activeLink === '/projects' ? 'active' : ''}>Projects</Link>
                        </li>
                        <li>
                            <Link href='/blogs' onClick={() => handleLinkClick('/blogs')} className={activeLink === '/blogs' ? 'active' : ''}>Blogs</Link>
                        </li>
                        <li>
                            <Link href='/shop' onClick={() => handleLinkClick('/shop')} className={activeLink === '/shop' ? 'active' : ''}>Shop</Link>
                        </li>
                        <li>
                            <Link href='/gallery' onClick={() => handleLinkClick('/gallery')} className={activeLink === '/gallery' ? 'active' : ''}>Gallery</Link>
                        </li>
                        <li>
                            <Link href='/contact' onClick={() => handleLinkClick('/contact')} className={activeLink === '/contact' ? 'active' : ''}>Contact</Link>
                        </li>
                    </ul>
                    <div className="darkmodetoggle" onClick={toggleDarkMode}>
                        {darkMode ? <IoMoonSharp /> : <LuSun />}

                    </div>
                    <button><Link href='/contact'>Hire Me!</Link></button>
                    <div className="mobiletogglesvg" onClick={handleMobileOpen}>
                        <HiMiniBars3BottomRight />
                    </div>
                </div>
                <div className={mobile ? 'mobilenavlist active' : 'mobilenavlist'}>
                    <span onClick={handleMobileClose} className={mobile ? 'active' : ''}></span>
                    <div className="mobilelogo">
                        <img src="/img/white.png" alt="logo" />
                        <h2>Gani Maulana</h2>
                    </div>
                    <ul className="flex gap-1 flex-col flex-left mt-3" onClick={handleMobileClose}>
                        <li>
                            <Link href='/' onClick={() => handleLinkClick('/')} className={activeLink === '/' ? 'active' : ''}>Home</Link>
                        </li>
                        <li>
                            <Link href='/services' onClick={() => handleLinkClick('/services')} className={activeLink === '/services' ? 'active' : ''}>Services</Link>
                        </li>
                        <li>
                            <Link href='/projects' onClick={() => handleLinkClick('/projects')} className={activeLink === '/projects' ? 'active' : ''}>Projects</Link>
                        </li>
                        <li>
                            <Link href='/blogs' onClick={() => handleLinkClick('/blogs')} className={activeLink === '/blogs' ? 'active' : ''}>Blogs</Link>
                        </li>
                        <li>
                            <Link href='/shop' onClick={() => handleLinkClick('/shop')} className={activeLink === '/shop' ? 'active' : ''}>Shop</Link>
                        </li>
                        <li>
                            <Link href='/gallery' onClick={() => handleLinkClick('/gallery')} className={activeLink === '/gallery' ? 'active' : ''}>Gallery</Link>
                        </li>
                        <li>
                            <Link href='/contact' onClick={() => handleLinkClick('/contact')} className={activeLink === '/contact' ? 'active' : ''}>Contact</Link>
                        </li>
                    </ul>
                    <p>Copyright &copy; 2025 | Gani Maulana</p>
                </div>
            </nav>
        </header>

    </>
}