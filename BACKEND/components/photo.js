import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Spinner from './Spinner';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ReactSortable } from 'react-sortablejs';
import { MdOutlineDeleteForever } from "react-icons/md";

export default function Photo(
    {
        _id,
        title: existingTitle,
        slug: existingSlug,
        images: existingImages,
    }
) {
    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    const [title, setTitle] = useState(existingTitle || '');
    const [slug, setSlug] = useState(existingSlug || '');
    const [images, setImages] = useState(existingImages || []);

    //images uploading
    const [isUploading, setIsUploading] = useState(false);
    const uploadImageQueue = [];
    async function createBlog(ev) {
        ev.preventDefault();

        if (isUploading) {
            await Promise.all(uploadImageQueue)
        }

        const data = { title, slug, images };

        if (_id) {
            await axios.put('/api/photos', { ...data, _id })
            toast.success('Data Updated')

        } else {
            await axios.post('/api/photos', data)
            toast.success('Data Created')

        }

        setRedirect(true);
    };

    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            for (const file of files) {
                const data = new FormData();
                data.append('file', file);

                uploadImageQueue.push(
                    axios.post('/api/upload', data).then(res => {
                        setImages(oldImages => [...oldImages, ...res.data.links])
                    })
                )
            }

            await Promise.all(uploadImageQueue);
            setIsUploading(false);
            toast.success('Images Uploaded')
        } else {
            toast.error('An error occured!')
        }
    }

    if (redirect) {
        router.push('/gallery')
        return null;
    }

    function updateImagesOrder(images) {
        setImages(images)
    }

    function handleDeleteImage(index) {
        const updateImages = [...images];
        updateImages.splice(index, 1);
        setImages(updateImages);
        toast.success('Image Deleted Successfully')
    }

    //for slug url
    const handleSlugChange = (ev) => {
        const inputValue = ev.target.value;
        const newSlug = inputValue.replace(/\s+/g, '-') // replace spaces with hyphens
        setSlug(newSlug);
    }

    return <>
        <form className='addWebsiteform' onSubmit={createBlog}>
            <div className='w-100 flex flex-col flex-left mb-2'>
                <label htmlFor='title'>Title</label>
                <input
                    type="text"
                    id='title'
                    placeholder='Enter small title'
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                />
            </div>
            <div className='w-100 flex flex-col flex-left mb-2'>
                <label htmlFor='slug'>Slug (seo friendly url)</label>
                <input
                    type="text"
                    id='slug'
                    placeholder='Enter Slug url'
                    value={slug}
                    onChange={handleSlugChange}
                />
            </div>
            
            <div className='w-100 flex flex-col flex-left mb-2'>
                <div className='w-100'>
                    <label htmlFor='images'>Images (first image will be show as thumbnail, you can drag)</label>
                    <input type="file" id='fileInput' className='mt-1' accept='image/*' multiple onChange={uploadImages} />
                </div>
                <div className='w-100 flex flex-left mt-1'>
                    {isUploading && (<Spinner />)}
                </div>
            </div>
            {!isUploading && (
                <div className='flex'>
                    <ReactSortable list={Array.isArray(images) ? images : []} setList={updateImagesOrder} animation={200}
                        className='flex gap-1'>
                        {images?.map((link, index) => (
                            <div key={link} className='uploadedimg'>
                                <img src={link} alt="image" className='object-cover' />
                                <div className='deleteimg'>
                                    <button type='button' onClick={() => handleDeleteImage(index)}><MdOutlineDeleteForever /></button>
                                </div>
                            </div>
                        ))}
                    </ReactSortable>
                </div>
            )}
            
            <div className='w-100 mb-1'>
                <button type='submit' className='w-100 addwebbtn flex-center'>Save Data</button>
            </div>
        </form>
    </>
}

