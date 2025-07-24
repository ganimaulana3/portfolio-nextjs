import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { FreeMode } from 'swiper/modules';
import Head from 'next/head';
import { useState } from 'react';
import useFetchData from '@/hooks/useFetchData';
import Spinner from '@/components/Spinner';
import Link from 'next/link';

export default function blogs() {

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(7);
    const [searchQuery, setSearchQuery] = useState('');
    const { alldata, loading } = useFetchData('/api/blogs');
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    const allblog = alldata.length;
    const filteredBlogs = searchQuery.trim() === '' ? alldata : alldata.filter(blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase()));
    const indexOfFirstBlog = (currentPage - 1) * perPage;
    const indexOfLastBlog = currentPage * perPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const publishedData = currentBlogs.filter(ab => ab.status === 'publish');
    const sliderpubdata = alldata.filter(ab => ab.status === 'publish')
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
        pageNumbers.push(i);
    }

    return <>
        <Head>
            <title>Blogs</title>
        </Head>
        <div className="blogpage">
            <section className="tophero">
                <div className="container">
                    <div className="toptitle">
                        <div className="toptitlecont flex">
                            <h1>Welcome to <span>My Blogs</span></h1>
                            <p>I Write about web, mobile development and modern JavaScript frameworks. the best article, links and news related to web and mobile development</p>
                            <div className="subemail">
                                <form className="flex">
                                    <input placeholder='Search blogs here...' type="text" />
                                    <button>Search</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="featured">
                        <div className="container">
                            <div className="border"></div>
                            <div className="featuredpo">
                                <div className="fetitle flex">
                                    <h3>Featured Posts :</h3>
                                </div>
                                <div className="feposts flex">
                                    <Swiper
                                        slidesPerView={'auto'}
                                        freeMode={true}
                                        spaceBetween={30}
                                        className='mySwiper'
                                        modules={[FreeMode]}
                                    >
                                        {loading ? <Spinner /> : <>{sliderpubdata.slice(0, 6).map((blog) => {
                                            return <SwiperSlide key={blog._id}>
                                                <div className="fpost" key={blog._id}>
                                                    <Link href={`/blogs/${blog.slug}`}>
                                                        <img src={blog.images[0]} alt={blog.title} />
                                                    </Link>
                                                    <div className="fpostinfo">
                                                        <div className="tegs flex">
                                                            {blog.blogcategory.map((cat) => {
                                                                return <Link href={`/blog/category${cat}`} className='ai'><span></span>{cat}</Link>
                                                            })}
                                                        </div>
                                                        <h2><Link href={`/blogs/${blog.slug}`}>{blog.title}</Link></h2>
                                                        <div className="fpostby flex">
                                                            <img src="/img/pp_gani.jpg" alt="gani" />
                                                            <p>By Gani Maulana</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        })}</>}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="populartegssec">
                <div className="container">
                    <div className="border"></div>
                    <div className="populartegsdata">
                        <div className="fetitle">
                            <h3>Popular Tags</h3>
                        </div>
                        <div className="poputegs">
                            <Link href='/blog/category/Next Js' className='pteg'>
                                <img src="https://img.icons8.com/?size=100&id=yUdJlcKanVbh&format=png&color=000000" alt="tags" />
                                <div className="tegs">
                                    <div className="apps"><span></span>Next Js</div>
                                </div>
                            </Link>
                            <Link href='/blog/category/Node Js' className='pteg'>
                                <img src="https://img.icons8.com/?size=100&id=yUdJlcKanVbh&format=png&color=000000" alt="tags" />
                                <div className="tegs">
                                    <div className="apps"><span></span>Node Js</div>
                                </div>
                            </Link>
                            <Link href='/blog/category/React Js' className='pteg'>
                                <img src="https://img.icons8.com/?size=100&id=yUdJlcKanVbh&format=png&color=000000" alt="tags" />
                                <div className="tegs">
                                    <div className="apps"><span></span>React Js</div>
                                </div>
                            </Link>
                            <Link href='/blog/category/Digital' className='pteg'>
                                <img src="https://img.icons8.com/?size=100&id=yUdJlcKanVbh&format=png&color=000000" alt="tags" />
                                <div className="tegs">
                                    <div className="apps"><span></span>Digital</div>
                                </div>
                            </Link>
                            <Link href='/blog/category/Flutter Dev' className='pteg'>
                                <img src="https://img.icons8.com/?size=100&id=yUdJlcKanVbh&format=png&color=000000" alt="tags" />
                                <div className="tegs">
                                    <div className="apps"><span></span>Flutter Dev</div>
                                </div>
                            </Link>
                            <Link href='/blog/category/Tailwind CSS' className='pteg'>
                                <img src="https://img.icons8.com/?size=100&id=yUdJlcKanVbh&format=png&color=000000" alt="tags" />
                                <div className="tegs">
                                    <div className="apps"><span></span>Tailwind CSS</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="latestpostssec">
                <div className="container">
                    <div className="border"></div>
                    <div className="latestpostsdata">
                        <div className="fetitle">
                            <h3>Latest Articles :</h3>
                        </div>
                        <div className="latestposts">
                            {loading ? <Spinner /> : <>
                                {publishedData.map((blog) => {
                                    return <div className="lpost" key={blog._id}>
                                        <div className="lpostimg">
                                            <Link href={`/blogs/${blog.slug}`}><img src={blog.images[0]} alt={blog.title} /></Link>
                                            <div className="tegs">
                                                {blog.blogcategory.map((cat) => {
                                                    return <Link href={`/blog/category${cat}`} className='ai'><span></span>{cat}</Link>
                                                })}
                                            </div>
                                        </div>
                                        <div className="lpostinfo">
                                            <h3><Link href={`/blogs/${blog.slug}`}>{blog.title}</Link></h3>
                                            <p>{blog.description}</p>
                                            <h4 className='flex'><img src="/img/pp_gani.jpg" alt="gani" />by Gani Maulana</h4>
                                        </div>
                                    </div>
                                })}
                            </>}
                        </div>
                    </div>
                    {publishedData.length === 0 ? ("") : (
                        <div className="blogspaginationbtn flex flex-center mt-3">
                            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                            {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
                                <button key={number}
                                    onClick={() => paginate(number)}
                                    className={`${currentPage === number ? 'active' : ''}`}
                                >
                                    {number}
                                </button>
                            ))}
                            <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage}>Next</button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    </>
}