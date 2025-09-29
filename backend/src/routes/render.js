const express = require('express');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const router = express.Router();

router.post('/export-video', async (req, res) => {
  try {
    const { videoPath, captions, style } = req.body;
    
    if (!videoPath || !captions || !style) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const videoFilePath = path.resolve(__dirname, '../../uploads', path.basename(videoPath));
    const outputPath = path.resolve(__dirname, '../../outputs', `captioned_${Date.now()}.mp4`);
    
    if (!fs.existsSync(videoFilePath)) {
      return res.status(400).json({ error: 'Video file not found' });
    }
    
    const propsPath = path.join(__dirname, '../../temp', `props_${Date.now()}.json`);
    const videoUrl = `http://localhost:3001/uploads/${path.basename(videoPath)}`;
    
    const remotionProps = {
      videoSrc: videoUrl,
      captions: captions,
      style: style
    };
    
    fs.writeFileSync(propsPath, JSON.stringify(remotionProps, null, 2));
    
    const renderCommand = `cd ${path.join(__dirname, '../../../remotion')} && npx remotion render src/index.js VideoWithCaptions "${outputPath}" --props="${propsPath}"`;
    
    console.log('Rendering video...');
    
    exec(renderCommand, { timeout: 900000 }, (error, stdout, stderr) => {
      if (fs.existsSync(propsPath)) {
        fs.unlinkSync(propsPath);
      }
      
      if (error) {
        console.error('Render error:', error);
        console.error('Render stderr:', stderr);
        console.error('Render stdout:', stdout);
        return res.status(500).json({ 
          error: 'Video rendering failed', 
          details: stderr || error.message
        });
      }
      
      console.log('Render stdout:', stdout);
      
      if (fs.existsSync(outputPath)) {
        console.log('Video rendered successfully');
        res.download(outputPath, `captioned_video.mp4`, (err) => {
          if (err) {
            console.error('Download error:', err);
            return res.status(500).json({ error: 'Download failed' });
          }
          setTimeout(() => {
            if (fs.existsSync(outputPath)) {
              fs.unlinkSync(outputPath);
            }
          }, 60000);
        });
      } else {
        console.error('Rendered video not found at:', outputPath);
        res.status(500).json({ error: 'Rendered video not found' });
      }
    });
    
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Export failed', message: error.message });
  }
});

module.exports = router;