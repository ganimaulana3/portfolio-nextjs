import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";


export default function gallery() {

    const { alldata, loading } = useFetchData('/api/photos')

    return <>
        <Head>
            <title>Gani Maulana: Gallery Photos</title>
        </Head>

        <div className="gallerypage">
            <div className="container">
                <div className="gallerytopsec">
                    <div className="topphonesec">
                        <div className="lefttitlesec">
                            <h4>Gani Maulana Photos</h4>
                            <h1>My Gallery</h1>
                            <Link href='/gallery#galleryimages'><button>VIEW MORE</button></Link>
                        </div>
                        <div className="rightimgsec">
                            <img src="https://i.pinimg.com/736x/5a/37/7d/5a377d8b7ef48f4cf8f46287027af189.jpg" alt="foto" />
                            <div className="r_img_top">
                                <img src="https://i.pinimg.com/236x/51/6f/43/516f4342ac0d18d34706f5abda414a66.jpg" alt="foto" />
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIRCw3OBiecgkx6TwVfBzuMhioTwml14n6zpMB9ijnUTIV0OTMq37NWrqgOmjh_tuamNw&usqp=CAU" alt="foto" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="gallerybtmphotos" id="galleryimages">
                <div className="container">
                    <div className="gbtmtitles text-center">
                        <h3><span>01//</span>OUR PORTFOLIO</h3>
                        <h2>Gani Maulana <span>All of your</span> beautiful memories</h2>
                    </div>
                    <div className="gallery_image_grid">
                        {loading ? <Spinner /> : <>
                            {alldata.map((photo) => {
                                return <div className="image-item">
                                    <img src={photo.images[0]} alt="" />
                                    <div className="galeryimgiteminfo">
                                        <h2>{photo.title}</h2>
                                        <p>by Gani Maulana</p>
                                    </div>
                                </div>
                            })}
                        </>}

                    </div>
                </div>
            </div>
        </div>
    </>
}