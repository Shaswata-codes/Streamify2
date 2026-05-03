import {v2 as cloudinary} from 'cloudinary';
import songModel from '../models/songModel.js';

const addSongs = async(req, res)=>{
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        const audioFile = req.files.audio[0].path;
        const imageFile = req.files.image[0].path;

        const audioUpload = await cloudinary.uploader.upload(audioFile, {
            resource_type: "video"
        });

        const imageUpload = await cloudinary.uploader.upload(imageFile, {
            resource_type: "image"
        });
        console.log(name, desc, album, audioUpload, imageUpload);
        console.log("BODY:", req.body);
        res.json({
            success: true,
            message: "Song uploaded successfully"
        });
        console.log("FILES:", req.files);
    }
    catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ message: error.message });
}
}

const listSongs = async(req, res)=>{

}

export {addSongs, listSongs}