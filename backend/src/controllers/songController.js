import { v2 as cloudinary } from 'cloudinary';
import songModel from '../models/songModel.js';


const addSongs = async (req, res) => {
    try {
        const { name, desc, album } = req.body;

        const audioFile = req.files.audio[0].path;
        const imageFile = req.files.image[0].path;

        // ✅ Upload both at the same time instead of one after another
        const [audioUpload, imageUpload] = await Promise.all([
            cloudinary.uploader.upload(audioFile, { resource_type: "video" }),
            cloudinary.uploader.upload(imageFile, { resource_type: "image" })
        ])

        const duration = `${Math.floor(audioUpload.duration / 60)}:${String(Math.floor(audioUpload.duration % 60)).padStart(2, '0')}`;

        const newSong = new songModel({
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file:  audioUpload.secure_url,
            duration
        });

        await newSong.save();
        res.json({ success: true, message: "Song added successfully", song: newSong });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


const listSongs = async (req, res) => {
    try {
        const allSongs = await songModel.find({});
        res.json({ success: true, songs: allSongs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


const removeSong = async (req, res) => {
    try {
        const { id } = req.body;
        const song = await songModel.findByIdAndDelete(id);

        if (!song) {
            return res.json({ success: false, message: "Song not found" });
        }

        res.json({ success: true, message: "Song removed successfully" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export { addSongs, listSongs, removeSong };