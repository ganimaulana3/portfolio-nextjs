import { mongooseConnect } from '@/lib/mongoose';
import { Blog } from '@/models/Blog';
import { Comment } from '@/models/Comment';

export default async function handler(req, res) {
    const {slug} = req.query;
    await mongooseConnect();

    if (req.method === 'GET') {
        try {
            const blog = await Blog.findOne({slug});

            if (!blog) {
                return res.status(404).json({message: 'Blog Not Found'})
            }

            const comments = await Comment.find({blog: blog._id}).sort({createdAt: -1});

            res.status(200).json({blog, comments})

        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Server error'})
        }
    } else if (req.method === 'POST'){
        try {
            const {name, email, title, contentpera, maincomment, parent} = req.body;

            const blog = await Blog.findOne({slug});
            if (!blog) {
                return res.status(404).json({message: "blog not found"})
            }

            if (parent) {
                const parentComment = await Comment.findById(parent);
                if (!parentComment) {
                    return res.status(404).json({message: 'Parent comment not found'})
                }

                const newComment = new Comment({
                    name,
                    email,
                    title,
                    contentpera,
                    maincomment,
                    parent: parentComment._id,
                    blog: blog._id,
                    parentName: parentComment.name,
                })

                await newComment.save();

                parentComment.children.push(newComment._id);

                await parentComment.save();

                res.status(201).json(newComment);
            } else {
                const newComment = new Comment({
                    name,
                    email,
                    title,
                    contentpera,
                    maincomment,
                    blog: blog._id
                });

                await newComment.save();
                res.status(201).json(newComment);
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Server error'})
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Aloowed`);
    }
}
