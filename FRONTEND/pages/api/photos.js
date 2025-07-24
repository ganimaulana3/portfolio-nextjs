import { mongooseConnect } from "@/lib/mongoose";
import { Photo, Photos } from "@/models/Photo";


export default async function handle(req, res) {

    await mongooseConnect();
    const { method } = req;

    if (method === 'GET') {
        if (req.query?.id) {
            const photos = await Photos.findById(req.query.id);
            res.json(photos);
        } else {
            const photos = await Photos.find();
            res.json(photos.reverse());
        }
    } else {
        res.status(400).json({ message: 'Method Not Allowed' });
    }
}