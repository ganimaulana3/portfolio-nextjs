import { mongooseConnect } from "@/lib/mongoose";
import { Project } from "@/models/Project";

export default async function handle(req, res) {

    await mongooseConnect();
    const {method} = req;

    if (method === 'GET') {
        if (req.query?.id) {
            const project = await Project.findById(req.query.id);
            res.json(project);
        } else if(req.query?.projectcategory){
            const projectcate = await Project.find({projectcategory: req.query.projectcategory})
            res.json(projectcate);
        } else if(req.query?.slug){
            const projectslug = await Project.find({slug: req.query.slug});
            res.json(projectslug.reverse());
        } else {
            const projects = await Project.find();
            res.json(projects.reverse());
        }
    } else {
        res.status(400).json({message: 'Method Not Allowed'});
    }
}