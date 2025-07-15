import Head from "next/head";
import { Bar } from 'react-chartjs-2';
import Loading from "@/components/Loading";
import { IoHome } from "react-icons/io5";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";


export default function Home() {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  const [blogsData, setBlogsData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [photosData, setPhotosData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(true);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Blogs Created Monthly by Year',
      }
    }
  }

  useEffect(() => {
    //fetch data from api
    const fetchData = async () => {
      try {
        const response = await fetch('/api/blogs');
        // const responseProject = await fetch('/api/projects');
        // const responseShop = await fetch('/api/shops');
        // const responseGallery = await fetch('/api/photos');
        const data = await response.json();
        // const dataProject = await responseProject.json();
        // const dataShop = await responseShop.json();
        // const dataPhotos = await responseGallery.json();

        setBlogsData(data);
        // setProjectData(dataProject);
        // setShopData(dataShop);
        // setPhotosData(dataPhotos);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const monthlyData = blogsData.filter(dat => dat.status === "publish").reduce((acc, blog) => {
    const year = new Date(blog.createdAt).getFullYear();
    const month = new Date(blog.createdAt).getMonth();
    acc[year] = acc[year] || Array(12).fill(0);
    acc[year][month]++;
    return acc;
  }, {});

  const currentYear = new Date().getFullYear();
  const years = Object.keys(monthlyData);
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Des'];
  const datasets = years.map(year => ({
    label: `${year}`,
    data: monthlyData[year] || Array(12).fill(0),
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
  }));

  const data = {
    labels,
    datasets
  }

  return (

    <>
      <Head>
        <title>Portfolio Backend</title>
        <meta name="description" content="Blog website backend" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="dashboard">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>Admin <span>Dashboard</span></h2>
            <h3>Admin Panel</h3>
          </div>
          <div className="breadcrumb">
            <IoHome /> <span>/</span> <span>Dashboard</span>
          </div>
        </div>

        <div className="topfourcards flex flex-sb">
          <div className="four_card">
            <h2>Total Blogs</h2>
            <span>{blogsData.filter(dat => dat.status === 'publish').length}</span>
          </div>
          <div className="four_card">
            <h2>Total Projects</h2>
            <span>5</span>
          </div>
          <div className="four_card">
            <h2>Total Products</h2>
            <span>5</span>
          </div>
          <div className="four_card">
            <h2>Gallery Photos</h2>
            <span>5</span>
          </div>
        </div>

        <div className="year_overview flex flex-sb">
          <div className="leftyearoverview">
            <div className="flex flex-sb">
              <h3>Year Overview</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <li className="small-dot"></li>
              </ul>
              <h3 className="text-right">{blogsData.filter(dat => dat.status === 'publish').length} / 365 <br /> <span>Total Published</span></h3>
            </div>
            <Bar data={data} options={options} />
          </div>

          <div className="right_salescont">
            <div>
              <h3>Blogs by Category</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <li className="small-dot"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </>

  );



}
