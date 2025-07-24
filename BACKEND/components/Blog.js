
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

export default function Blog(
    {
        _id,
        title: existingTitle,
        slug: existingSlug,
        images: existingImages,
        description: existingDescription,
        blogcategory: existingBlogCategory,
        tags: existingTags,
        status: existingStatus,
    }
) {
    const [redirect, setRedirect] = useState(false);
    const router = useRouter();
    const [title, setTitle] = useState(existingTitle || '');
    const [slug, setSlug] = useState(existingSlug || '');
    const [images, setImages] = useState(existingImages || []);
    const [description, setDescription] = useState(existingDescription || '');
    const [blogcategory, setBlogCategory] = useState(existingBlogCategory || []);
    const [tags, setTags] = useState(existingTags || []);
    const [status, setStatus] = useState(existingStatus || '');

    //images uploading
    const [isUploading, setIsUploading] = useState(false);
    const uploadImageQueue = [];
    async function createBlog(ev) {
        ev.preventDefault();

        if (isUploading) {
            await Promise.all(uploadImageQueue)
        }

        const data = {title, slug, images, description, blogcategory, tags, status};

        if (_id) {
            await axios.put('/api/blogs', {...data, _id})
            toast.success('Data Updated')
            
        } else {
            await axios.post('/api/blogs', data)
            toast.success('Blog Created')
            
        }

        setRedirect(true);
    };

    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            for(const file of files){
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
        router.push('/blogs')
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
                <label htmlFor='category'>Select Category (for multi select press ctrl + mouse left key)</label>
                <select onChange={(e) => setBlogCategory(Array.from(e.target.selectedOptions, option => option.value))} value={blogcategory} name='category' id='category' multiple>
                    <option value="Node js">Node Js</option>
                    <option value="React js">React Js</option>
                    <option value="Next js">Next Js</option>
                    <option value="Css">Css</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Flutter Dev">Flutter Dev</option>
                    <option value="Database">Database</option>
                    <option value="Deployment">Deployment</option>
                </select>
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
            <div className='description w-100 flex flex-col flex-left mb-2'>
                <label htmlFor='description'>Blog Content (for image: first upload and copy link and paste in ![alt text][link])</label>
                <MarkdownEditor 
                value={description}
                onChange={(ev) => setDescription(ev.text)}
                style={{width: '100%', height: '400px'}}
                renderHTML={(text) => (
                    <ReactMarkdown components={{
                        code: ({node, inline, className, children, ...props}) => {

                            const match = /language-(\w+)/.exec(className || '');
                            if (inline) {
                                return <code>{children}</code>
                            } else if(match) {
                                return (
                                    <div style={{position: 'relative'}}>
                                        <pre style={{padding: '0', borderRadius: '5px', overflowX: 'auto', whiteSpace: 'pre-wrap'}} {...props}>
                                            <code>{children}</code>
                                        </pre>
                                        <button style={{position: 'absolute', top: '0', right: '0', zIndex: '10'}} onClick={() => 
                                            navigator.clipboard.writeText(children)
                                        }> copy text</button>
                                    </div>
                                )
                            } else {
                                return <code {...props}>{children}</code>
                            }
                        }
                    }}>
                        {text}
                    </ReactMarkdown>
                )}
                />
            </div>
            <div className='w-100 flex flex-col flex-left mb-2'>
                <label htmlFor='tags'>Tags</label>
                <select onChange={(e) => setTags(Array.from(e.target.selectedOptions, option => option.value))} value={tags} name='tags' id='tags' multiple>
                    <option value="html">html</option>
                    <option value="css">css</option>
                    <option value="javascript">javascript</option>
                    <option value="nextjs">nextjs</option>
                    <option value="reactjs">reactjs</option>
                    <option value="database">database</option>
                </select>
            </div>
            <div className='w-100 flex flex-col flex-left mb-2'>
                <label htmlFor='status'>Status</label>
                <select onChange={ev => setStatus(ev.target.value)} value={status} name='status' id='status'>
                    <option value="">No select</option>
                    <option value="draft">Draft</option>
                    <option value="publish">Publish</option>
                </select>
            </div>
            <div className='w-100 mb-1'>
                <button type='submit' className='w-100 addwebbtn flex-center'>Save Blog</button>
            </div>
        </form>
    </>
}

