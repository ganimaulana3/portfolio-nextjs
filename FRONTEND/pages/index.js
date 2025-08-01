import Head from "next/head";
import { GoArrowRight, GoArrowUpRight } from "react-icons/go";
import Link from "next/link";
import { BiDownload } from "react-icons/bi";
import { FaCalendarDays, FaGithub, FaInstagram, FaLinkedin, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { LuMedal } from "react-icons/lu";
import { PiGraduationCap } from "react-icons/pi";


export default function Home() {

  const [activeIndex, setActiveIndex] = useState(0);
  const handleHover = (index) => {
    setActiveIndex(index);
  }
  const handleMouseOut = () => {
    setActiveIndex(0);
  }


  // services data
  const services = [
    {
      title: "Web Development",
      description: "I am very good in web development offering services, I offer reliable web development services to generate the most remarkable results which your business need."
    },
    {
      title: "Mobile Development",
      description: "Experienced mobile developer offering innovative solutions. Proficient in creating high-performance, user-centric mobile apps. Expertise in iOS, Android, and cross-platform development."
    },
    {
      title: "Digital Marketing(SEO)",
      description: "My digital marketing services will take your business to the next level, we offer remarkable digital marketing strategies that drives traffic to your website, your business, and improves your brand awareness to potential customers."
    },
    {
      title: "Content Creator",
      description: "Passionate photographer and videographer capturing moments with creativity. Transforming visions into visual stories. Expert in visual storytelling, skilled in both photography and videography to deliver captivating content."
    }
  ];

  const [loading, setLoading] = useState(true);
  const [alldata, setAlldata] = useState([]);
  const [allwork, setAllwork] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectResponse, blogResponse] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/blogs')
        ])

        const projectData = await projectResponse.json();
        const blogData = await blogResponse.json();

        setAlldata(projectData);
        setAllwork(blogData);

      } catch (error) {
        console.error('Error Fetching Data', error)
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [])

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProjects(alldata.filter(pro => pro.status === 'publish'));
    } else {
      setFilteredProjects(alldata.filter(pro => pro.status === 'publish' && pro.projectcategory[0] === selectedCategory));
    }
  }, [selectedCategory, alldata])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  }

  const formatDate = (date) => {
    if (!date || isNaN(date)) {
      return '';
    }

    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour12: true
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  return (
    <>
      <Head>
        <title>Gani Maulana - Personal Portfolio</title>
        <meta name="description" content="Gani Maulana - Personal Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
      </Head>

      {/* hero section */}
      {/* <section className="hero">
        <div className="intro_text">
          <svg viewBox="0 0 1320 300">
            <text x='50%' y='50%' text-anchor='middle' className="animate-stroke">HI</text>
          </svg>
          <div className={darkMode ? 'element_square' : ''}>

          </div>
          
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
                <Link href='/' download={'/img/CV_GANIMAULANA.pdf'} className="download_cv">Download CV <BiDownload/></Link>
                <ul className="hero_social">
                  <li><a href="/"><FaGithub/></a></li>
                  <li><a href="/"><FaLinkedin/></a></li>
                  <li><a href="/"><FaInstagram/></a></li>
                  <li><a href="/"><FaTiktok/></a></li>
                  <li><a href="/"><FaYoutube/></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Services */}
      <section className="services">
        <div className="container">
          <div className="services_titles">
            <h2>My Quality Services</h2>
            <p>We put your ideas and thus your wishes in the form of a unique web project that inspires you and your customers.</p>
          </div>
          <div className="services_menu">
            {services.map((service, index) => (
              <div key={index} className={`services_item ${activeIndex === index ? 'sactive' : ''}`}
                onMouseOver={() => handleHover(index)}
                onMouseOut={handleMouseOut}
              >
                <div className="left_s_box">
                  <span>0{index + 1}</span>
                  <h3>{service.title}</h3>
                </div>
                <div className="right_s_box">
                  <p>{service.description}</p>
                </div>
                <GoArrowUpRight />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="projects">
        <div className="container">
          <div className="project_titles">
            <h2>My Recent Works</h2>
            <p>We put your ideas and thus your wishes in the form of a unique web project that inspires you and your customers.</p>
          </div>
          <div className="project_buttons">
            <button className={selectedCategory === 'All' ? 'active' : ''} onClick={() => setSelectedCategory('All')}>All</button>
            <button className={selectedCategory === 'Website Development' ? 'active' : ''} onClick={() => setSelectedCategory('Website Development')}>Website</button>
            <button className={selectedCategory === 'App Development' ? 'active' : ''} onClick={() => setSelectedCategory('App Development')}>Apps</button>
            <button className={selectedCategory === 'E-commerce Site' ? 'active' : ''} onClick={() => setSelectedCategory('E-commerce Site')}>Digital</button>
            <button className={selectedCategory === 'Performance Evaluation' ? 'active' : ''} onClick={() => setSelectedCategory('Performance Evaluation')}>Content</button>
          </div>
          <div className="projects_cards">

            {loading ? <div className="flex flex-center wh_50"><Spinner /></div> : (
              filteredProjects.length === 0 ? (
                <h1 className="w-100 flex flex-center mt-3">No Project Found</h1>
              ) : (
                filteredProjects.slice(0, 4).map((pro) => (
                  <Link href='/' key={pro._id} className="procard">
                    <div className="proimgbox">
                      <img src={pro.images[0]} alt={pro.title} />
                    </div>
                    <div className="procontentbox">
                      <h2>{pro.title}</h2>
                      <GoArrowRight />
                    </div>
                  </Link>
                ))
              )
            )}



          </div>
        </div>
      </section>

      {/* Experience study */}
      <section className="exstudy">
        <div className="container flex flex-left flex-sb">
          <div className="experience">
            <div className="experience_title flex gap-1">
              <LuMedal />
              <h2>My Experience</h2>
            </div>
            <div className="exper_cards">
              <div className="exper_card">
                <span>Juli - September 2022</span>
                <h3>Pemprov Jabar - Gedung Sate</h3>
                <p>IT Support</p>
              </div>
            </div>
          </div>
          <div className="education">
            <div className="experience_title flex gap-1">
              <PiGraduationCap />
              <h2>My Education</h2>
            </div>
            <div className="exper_cards">
              <div className="exper_card">
                <span>2023 - Present</span>
                <h3>Universitas Dian Nuswantoro</h3>
                <p>Teknik Informatika</p>
              </div>
              <div className="exper_card">
                <span>2020 - 2023</span>
                <h3>SMKN 1 Banjar</h3>
                <p>Rekayasa Perangkat Lunak</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Skills */}
      <section className="myskills">
        <div className="container">
          <div className="myskills_title">
            <h2>My Skills</h2>
            <p>We put your ideas and thus your wishes in the form of a unique web project that inspires you and your customers.</p>
          </div>
          <div className="myskils_cards">
            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/python.svg" alt="skill" />
                <h3>92%</h3>
              </div>
              <p className="text-center">Python</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/firebase.svg" alt="skill" />
                <h3>82%</h3>
              </div>
              <p className="text-center">Firebase</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/mongodb.svg" alt="skill" />
                <h3>85%</h3>
              </div>
              <p className="text-center">MongoDB</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/redux.svg" alt="skill" />
                <h3>80%</h3>
              </div>
              <p className="text-center">Redux</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/react.svg" alt="skill" />
                <h3>90%</h3>
              </div>
              <p className="text-center">React</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/js.svg" alt="skill" />
                <h3>92%</h3>
              </div>
              <p className="text-center">JavaScript</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blogs */}
      <section className="recentblogs">
        <div className="container">
          <div className="myskills_title">
            <h2>Recent Blogs</h2>
            <p>We put your ideas and thus your wishes in the form of a unique web project that inspires you and your customers.</p>
          </div>
          <div className="recent_blogs">
            {allwork.slice(0, 3).map((blog) => {
              return <Link href={`/blogs/${blog.slug}`} key={blog._id} className="re_blog">
                <div className="re_blogimg">
                  <img src={blog.images[0] || '/img/noimage.png'} alt={blog.title} />
                  <span>{blog.blogcategory[0]}</span>
                </div>
                <div className="re_bloginfo">
                  <div className="re_topdate flex gap-1">
                    <div className="res_data">
                      <FaCalendarDays /> <span>{formatDate(new Date(blog.createdAt))}</span>
                    </div>
                  </div>
                  <h2>{blog.title}</h2>
                </div>
              </Link>
            })}
          </div>
        </div>
      </section>

    </>
  );
}
