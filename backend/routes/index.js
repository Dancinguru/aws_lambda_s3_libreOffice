const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const aws = require('aws-sdk');

var multer = require('multer');

aws.config.update({
    accessKeyId: '',
    secretAccessKey: '',
    region: 'us-east-1', // Replace with your AWS region
});
const s3 = new aws.S3();

const upload = multer({ dest: 'uploads/' });

router.post('/upload',  upload.single('doc'), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const { originalname, path } = req.file;
    console.log(req.file);
    const params = {
      Bucket: 'lambda-libreoffice-bluesky',
      Key: originalname, // Use the original filename as the object key
      Body: require('fs').createReadStream(path),
    };
    if(originalname.contains('.doc')) {
        try {
            await s3.upload(params).promise();
            console.log('this is success');
            res.status(200).json({ message: 'File uploaded successfully' });
        } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'File upload failed' });
        }      
    }
    else
        res.status(500).json({message: "File format is not allowed..."})
  });

module.exports = router;