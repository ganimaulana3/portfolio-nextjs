import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsPostcard } from "react-icons/bs";


export default function DeleteProduct() {
    const router = useRouter();
    const { id } = router.query;
    const [productInfo, setProductInfo] = useState(null);
    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get('/api/blogs?id=' + id).then(response => {
                setProductInfo(response.data)
            })
        }
    }, [id]);
    function goBack() {
        router.push('/projects')
    }

    async function deleteBlog() {
        await axios.delete('/api/projects?id=' + id)
        toast.success('delete successfully')
        goBack();
    }

    return <>
        <Head>
            <title>Delete Project</title>
        </Head>
        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Delete <span>{productInfo?.title}</span></h2>
                    <h3>Admin Panel</h3>
                </div>
                <div className="breadcrumb">
                    <BsPostcard /> <span>/</span> <span>Delete Project</span>
                </div>
            </div>
            <div className="deletesec flex flex-center wh_100">
                <div className="deletecard">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="red"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        height="6em"
                        width="6em"
                    >
                        <path d="M3 6H5H21M19 6L18 20H6L5 6M10 11V17M14 11V17M9 6V4H15V6" />
                    </svg>
                    <p className="cookieHeading">Are you sure?</p>
                    <p className="cookieDescription">If you delete this website content it'll be permanent delete your content.</p>
                    <div className="buttonContainer">
                        <button onClick={deleteBlog} className="acceptButton">Delete</button>
                        <button onClick={goBack} className="declineButton">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}