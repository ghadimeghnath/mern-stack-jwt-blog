import { v2 as cloudinary } from 'cloudinary';
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: "damsaixfi",
  api_key:"889655524294581",
  api_secret: "MV4PuoxyGdj88KVW3rxzCp5cahY",
});

const storage = new CloudinaryStorage({
  cloudinary:cloudinary, 
  params: {
    folder: 'blog_images', 
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage: storage });

export default upload