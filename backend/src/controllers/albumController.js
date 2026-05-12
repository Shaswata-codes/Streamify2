import { v2 as cloudinary } from 'cloudinary'
import albumModel from '../models/albumModel.js'

const addAlbum = async (req, res) => {
  try {
    const { name, desc, bgColor } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.json({ success: false, message: "Image file is required" });
    }

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: 'image',
    })

    const album = new albumModel({         
      name,
      desc,
      bgColor,
      image: imageUpload.secure_url
    })

    await album.save();
    res.json({ success: true, message: "Album added successfully", album });

  } catch (error) {
    res.json({ success: false, message: "Error adding album", error: error.message });
  }
}


const listAlbum = async (req, res) => {
  try {
    const allAlbums = await albumModel.find({});
    res.json({ success: true, albums: allAlbums });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

const removeAlbum = async (req, res) => {
  try {
    const album = await albumModel.findByIdAndDelete(req.body.id);
    if (!album) {
      return res.json({ success: false, message: "Album not found" });
    }
    res.json({ success: true, message: "Album removed successfully" });
  } catch (error) {
    res.json({ success: false, message: "Error removing album", error: error.message });
  }
}

export { addAlbum, listAlbum, removeAlbum }