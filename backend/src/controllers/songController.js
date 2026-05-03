import {v2 as cloudinary} from 'cloudinary';
import songModel from '../models/songModel.js';

const addSongs = async(req, res)=>{
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;

        const audioFile = req.files.audio[0].path;
        const imageFile = req.files.image[0].path;

        const audioUpload = await cloudinary.uploader.upload(audioFile, {resource_type: "video"});
        const imageUpload = await cloudinary.uploader.upload(imageFile, {resource_type: "image"});

        const duration = `${Math.floor(audioUpload.duration/60)}:${Math.floor(audioUpload.duration%60)}`;

        const newSong = new songModel({
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration: duration
        });

        await newSong.save();

        res.status(200).json({
            message: "Song added successfully",
            song: newSong
        });

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

const listSongs = async (req, res) => {
    try {
        const allSongs = await songModel.find({});
        res.json({ success: true, songs: allSongs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
};

const removeSong = async (req, res) => {
    try {
        const { id } = req.body;  // ✅ FIX HERE

        await songModel.findByIdAndDelete(id);

        res.json({
            success: true,
            message: "Song removed successfully"
        });

    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};

export { addSongs, listSongs, removeSong };
