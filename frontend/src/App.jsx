import React, { useState } from "react";
import VideoUpload from "./components/VideoUpload";
import CaptionPreview from "./components/CaptionPreview";
import StyleSelector from "./components/StyleSelector";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Progress } from "./components/ui/progress";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./hooks/use-toast";
import { Upload, Download, Video, Zap } from "lucide-react";

import "./App.css";

function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [captions, setCaptions] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState("bottom-centered");
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [videoPath, setVideoPath] = useState("");
  const { toast } = useToast();

  const handleVideoUpload = (file) => {
    setVideoFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    toast({
      title: "Video uploaded successfully!",
      description: `${file.name} is ready for caption generation.`,
    });
  };

  const generateCaptions = async () => {
    setIsProcessing(true);
    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      toast({
        title: "Generating captions...",
        description: "Processing your video with AI transcription.",
      });

      const response = await fetch(
        "http://localhost:3001/api/captions/generate-captions",
        { method: "POST", body: formData }
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setCaptions(data.captions || []);
      setVideoPath(data.videoPath || "");

      toast({
        title: "Captions generated successfully!",
        description: `Generated ${data.captions?.length || 0} caption segments.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Caption generation failed",
        description: error.message,
      });
      setCaptions([]);
    } finally {
      setIsProcessing(false);
    }
  };

  const exportVideo = async () => {
    if (!videoFile || !captions.length) {
      toast({
        variant: "destructive",
        title: "Cannot export video",
        description: "Please upload a video and generate captions first.",
      });
      return;
    }

    setIsProcessing(true);
    try {
      toast({
        title: "Exporting video...",
        description: "Rendering your video with captions. This may take a few minutes.",
      });

      const requestData = { videoPath, captions, style: selectedStyle };
      const response = await fetch(
        "http://localhost:3001/api/render/export-video",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) throw new Error(`Export failed: ${response.status}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `captioned_${videoFile.name}`;
      a.click();

      toast({
        title: "Video exported successfully!",
        description: `Your captioned video has been downloaded as captioned_${videoFile.name}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Export failed",
        description: error.message,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 flex flex-col space-y-8">
        {/* Header */}
        <div className="flex justify-center lg:justify-start items-center mb-4">
          <div className="flex items-center gap-3">
            <Video className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">
              Subly - AI Video Captioning
            </h1>
          </div>
        </div>

        {/* Upload & Actions */}
        <div className="flex flex-col space-y-6 w-full">
          {/* Upload Card */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-center">
                <Upload className="h-5 w-5" />
                Upload Video
              </CardTitle>
              <CardDescription className="text-center">
                Upload your video file to generate automatic captions
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <VideoUpload onUpload={handleVideoUpload} />
            </CardContent>
          </Card>

          {/* Style Selector */}
          {videoFile && (
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Caption Style</CardTitle>
                <CardDescription>
                  Choose how your captions will appear on the video
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StyleSelector
                  selectedStyle={selectedStyle}
                  onStyleChange={setSelectedStyle}
                />
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          {videoFile && (
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
                <CardDescription>
                  Generate captions and export your video
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Button
                  onClick={generateCaptions}
                  disabled={isProcessing}
                  className="w-full h-14 text-lg font-semibold bg-black text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:transform-none disabled:shadow-md"
                  size="lg"
                >
                  <Zap className="mr-3 h-5 w-5" />
                  {isProcessing ? "Generating Captions..." : "Auto-generate Captions"}
                </Button>

                {captions.length > 0 && (
                  <Button
                    onClick={exportVideo}
                    disabled={isProcessing}
                    className="w-full h-14 text-lg font-semibold bg-black text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:transform-none disabled:shadow-md"
                    size="lg"
                  >
                    <Download className="mr-3 h-5 w-5" />
                    {isProcessing ? "Exporting..." : "Export Video"}
                  </Button>
                )}

                {isProcessing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Processing...</span>
                      <span>Please wait</span>
                    </div>
                    <Progress value={75} className="w-full" />
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Preview */}
        {previewUrl && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                See how your captions will look on the video
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CaptionPreview
                videoUrl={previewUrl}
                captions={captions}
                style={selectedStyle}
              />
            </CardContent>
          </Card>
        )}
      </div>

      <Toaster />
    </div>
  );
}

export default App;