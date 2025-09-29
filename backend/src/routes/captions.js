const express = require('express');
const multer = require('multer');
const path = require('path');
const whisperService = require('../services/whisperService');

const router = express.Router();

// ulter for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accepting all files that look like these videos
    if (file.mimetype.startsWith('video/') || 
        file.originalname.toLowerCase().match(/\.(mp4|avi|mov|wmv|flv|webm|mkv)$/)) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed'));
    }
  }
});

// Generate captions 
router.post('/generate-captions', upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No video file provided' });
    }

    const videoPath = req.file.path;
    console.log('Processing video:', videoPath);

    const captions = await whisperService.transcribe(videoPath);
    
    res.json({
      success: true,
      captions: captions,
      videoPath: videoPath
    });

  } catch (error) {
    console.error('Caption generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate captions',
      message: error.message 
    });
  }
});

module.exports = router;