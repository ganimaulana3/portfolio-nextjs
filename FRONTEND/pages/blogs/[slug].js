// pages/blogs/[slug].js

import { SlCalender } from "react-icons/sl";
import { CiRead } from "react-icons/ci";
import { RiFacebookFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { BiLogoLinkedin } from "react-icons/bi";
import { BsCopy } from "react-icons/bs";
import Link from "next/link";
import Head from "next/head";

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import axios from "axios";
import { useRouter } from "next/router";
import useFetchData from "@/hooks/useFetchData";
import { useEffect, useRef, useState } from "react";
import Spinner from "@/components/Spinner";
import { FaGithub, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa6";

const BlogPage = () => {
    const router = useRouter();
    const { slug } = router.query;
    const { alldata } = useFetchData('/api/blogs');
    const [blogData, setBlogData] = useState({ blog: {}, comments: [] });
    const [newComment, setNewComment] = useState({
        name: '',
        email: '',
        title: '',
        contentpera: '',
        maincomment: true,
        parent: null,
        parentName: '',
    })
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [messageOk, setMessageOk] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchBlogData = async () => {
            if (slug) {
                try {
                    const response = await axios.get(`/api/blogs/${slug}`);
                    setBlogData(response.data);
                    setLoading(false);
                } catch (error) {
                    setError('Failed to fetch blog data. please try again later.');
                    setLoading(false);
                }
            }
        };

        fetchBlogData();
    }, [slug]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/blogs/${slug}`, newComment);

            if (newComment.parent) {
                setBlogData(prevData => {
                    const updatedComments = prevData.comments.map(comment => {
                        if (comment._id === newComment.parent) {
                            return {
                                ...comment,
                                children: [...comment.children, response.data]
                            }
                        } else if (comment.children && comment.children.length > 0) {
                            return {
                                ...comment,
                                children: updateChildrenComments(comment.children, newComment.parent, response.data)
                            };
                        }
                        return comment;
                    });

                    return {
                        ...prevData,
                        comments: updatedComments
                    }
                })
            } else {
                setBlogData(prevData => ({
                    ...prevData,
                    comments: [response.data, ...prevData.comments]
                }))
            }

            setMessageOk('✅ Comment posted successfully');
            setTimeout(() => {
                setMessageOk('')
            }, 5000);

            setNewComment({
                name: '',
                email: '',
                title: '',
                contentpera: '',
                maincomment: true,
                parent: null,
                parentName: ''
            })

        } catch (error) {
            setMessageOk('❌ Failed to post comment');
            setTimeout(() => {
                setMessageOk('')
            }, 5000);
        }
    }

    const replyFormRef = useRef(null);

    const updateChildrenComments = () => {

    }

    if (loading) {
        return <div className="flex flex-center wh_100"><Spinner /></div>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    const createdAtDate = blogData && blogData.blog.createdAt ? new Date(blogData && blogData.blog.createdAt) : null;


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

    const blogUrl = `http://localhost:3000/blogs/${slug}`;
    const handleCopyUrl = (url) => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 3000);
    }

    const Code = ({ node, inline, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || '');
        const [copied, setCopied] = useState(false);
        const handleCopy = () => {
            navigator.clipboard.writeText(children);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 3000);
        }

        if (inline) {
            return <code>{children}</code>
        } else if (match) {
            return (
                <div style={{ position: 'relative' }}>
                    <SyntaxHighlighter
                        style={a11yDark}
                        language={match[1]}
                        PreTag='pre'
                        {...props}
                        codeTagProps={{ style: { padding: '0', borderRadius: '5px', overflow: 'auto', whiteSpace: 'pre-wrap' } }}
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                    <button onClick={handleCopy} style={{ position: 'absolute', top: '0', right: '0', zIndex: '1', background: '#3d3d3d', color: '#fff', padding: '10px' }}>
                        {copied ? 'Copied!' : 'Copy code'}
                    </button>
                </div>
            );
        } else {
            return (
                <code className="md-post-code" {...props}>
                    {children}
                </code>
            )
        }
    }

    return (
        <>
            <Head>
                <title>{slug}</title>
            </Head>
            <div>
                {blogData && (
                    <div className="blogslugpage">
                        <div className="container">
                            <div className="blogslugpagecont">
                                <div className="leftsitedetails">
                                    <div className="leftbloginfoimg">
                                        <img src={blogData.blog.images[0] || '/img/noimage.png'} alt={blogData && blogData.title} />
                                    </div>
                                    <div className="slugbloginfopub">
                                        <div className="flex gap-2">
                                            <div className="adminslug">
                                                <img src='/img/pp_gani.jpg' alt="" />
                                                <span>by Gani Maulana</span>
                                            </div>
                                            <div className="adminslug">
                                                <SlCalender />
                                                <span>{formatDate(createdAtDate)}</span>
                                            </div>
                                            <div className="adminslug">
                                                <CiRead />
                                                <span>Comments ({blogData.comments ? blogData.comments.length : 0})</span>
                                            </div>
                                        </div>

                                        <div className="shareblogslug">
                                            <div title="Copy URL" onClick={() => handleCopyUrl(blogUrl)} style={{ cursor: 'pointer' }}>
                                                <BsCopy /> <span>{copied ? 'Copied!' : ''}</span>
                                            </div>

                                            <a target="_blank" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`} rel="noopener noreferrer"><FaLinkedin /></a>
                                            <a target="_blank" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out this blog post:' + blogUrl)}`} rel="noopener noreferrer"><FaTwitter /></a>
                                            <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`} rel="noopener noreferrer"><RiFacebookFill /></a>
                                            <a target="_blank" href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blogUrl)}`} rel="noopener noreferrer"><RiWhatsappFill /></a>
                                        </div>
                                    </div>
                                    <h1>{blogData.blog.title}</h1>
                                    {loading ? <Spinner /> : <div className="blogcontent">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                code: Code
                                            }}
                                        >
                                            {blogData.blog.description}
                                        </ReactMarkdown>
                                    </div>}

                                    <div className="blogslugtags">
                                        <div className="blogstegs">
                                            <h2>Tags:</h2>
                                            <div className="flex flex-wrap gap-1">
                                                {blogData && blogData.blog.tags.map((cat) => {
                                                    return <span key={cat}>{cat}</span>
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="blogusercomments">
                                        <h2>Comments</h2>
                                        { }
                                    </div>
                                    <div className="blogslugcomments">
                                        { }

                                        { }
                                        <p>Your email address will not be publish. Required fields are marked</p>
                                        <form className="leaveareplyform" onSubmit={handleCommentSubmit}>
                                            <div className="nameemailcomment">
                                                <input
                                                    type="text"
                                                    placeholder="Enter Name"
                                                    value={newComment.name}
                                                    onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                                                />
                                                <input
                                                    type="email"
                                                    placeholder="Enter Email"
                                                    value={newComment.email}
                                                    onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Enter Title"
                                                value={newComment.title}
                                                onChange={(e) => setNewComment({ ...newComment, title: e.target.value })}
                                            />
                                            <textarea
                                                name=""
                                                rows={4}
                                                placeholder="Enter your Comments"
                                                id="textcomments"
                                                value={newComment.contentpera}
                                                onChange={(e) => setNewComment({ ...newComment, contentpera: e.target.value })}
                                            ></textarea>
                                            <div className="flex gap-2">
                                                <button type="submit">Post Comment</button>
                                                <p>{messageOk}</p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </>
    );
};

export default BlogPage;
