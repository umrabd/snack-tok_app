import React, { useState, useRef } from 'react';
import Layout from '../../components/Layout';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { HiVideoCamera, HiTrash, HiPencilAlt } from 'react-icons/hi';
import axios from 'axios';

const CreateFood = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [videoPreview, setVideoPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    video: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, video: file });
      // Clean up old memory if changing files
      if (videoPreview) URL.revokeObjectURL(videoPreview);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const removeVideo = () => {
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    setVideoPreview(null);
    setFormData({ ...formData, video: null });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.video || !formData.name || !formData.description) {
      return toast.error("Please fill all fields and upload a video.");
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('video', formData.video);

      const response = await axios.post(
        "http://localhost:3000/api/food", 
        formDataToSend, 
        { withCredentials: true }
      );

      toast.success("Published successfully!");
      navigate('/'); // Navigate back to home/feed
    } catch (error) {
      // Handle the 401 error and show the message from the server
      const errorMsg = error.response?.data?.message || "Upload failed";
      toast.error(errorMsg);
      
      if (error.response?.status === 401) {
        // Optional: Send them to login if unauthorized
        // navigate('/food-partner/login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout hideFooter={true}>
      <Toaster />
      <section className="flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-lg bg-card rounded-xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-800">
          
          <header className="mb-8 text-left">
            <h1 className="text-2xl font-bold text-text">Create New Post</h1>
            <p className="text-muted text-sm mt-1">Upload your cooking video and details.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* --- Video Section --- */}
            <div className="space-y-4">
             {videoPreview && (
                <label className="text-sm font-semibold text-text ">Video Preview</label>
              )}
              
              {!videoPreview ? (
                // Initial Upload Box
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className="w-full  h-64 border-2 border-dashed border-gray-400 rounded-xl bg-[var(--input-bg)] flex flex-col items-center justify-center cursor-pointer hover:bg-opacity-70 transition-all"
                >
                  <HiVideoCamera className="text-5xl text-primary mb-3" />
                  <p className="font-medium text-text">Choose a video to upload</p>
                  <p className="text-xs text-muted">MP4 or WebM (Max 50MB)</p>
                </div>
              ) : (
                // Video is Selected
                <div className="space-y-4">
                  <div className="w-full h-80 rounded-xl overflow-hidden bg-black shadow-inner">
                    <video 
                      src={videoPreview} 
                      className="w-full h-full object-contain" 
                      controls 
                    />
                  </div>

                  {/* Video Details & Buttons Below Video */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-xs font-medium text-muted uppercase tracking-wider">File:</span>
                      <p className="text-sm text-text font-mono truncate bg-[var(--input-bg)] px-2 py-1 rounded">
                        {formData.video?.name}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="flex-1 flex items-center justify-center gap-2 bg-[var(--tile)] text-text py-2.5 rounded-lg text-sm font-bold hover:brightness-95 transition"
                      >
                        <HiPencilAlt /> Change
                      </button>
                      <button 
                        type="button"
                        onClick={removeVideo}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 text-red-500 py-2.5 rounded-lg text-sm font-bold hover:bg-red-500 hover:text-white transition"
                      >
                        <HiTrash /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              <input 
                ref={fileInputRef}
                type="file" 
                className="hidden" 
                accept="video/*" 
                onChange={handleFileChange} 
              />
            </div>

            {/* --- Text Inputs --- */}
            <div className="space-y-4 pt-2">
              <div>
                <label className="text-sm font-semibold text-text mb-2 block">Dish Name</label>
                <input 
                  name="name"
                  type="text" 
                  placeholder="e.g. Grandma's Secret Pasta" 
                  className="input"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-text mb-2 block">Description</label>
                <textarea 
                  name="description"
                  rows="3"
                  placeholder="Describe the flavors and ingredients..." 
                  className="input resize-none"
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-4 rounded-[var(--radius)] font-bold text-white shadow-lg transition-all bg-primary ${loading ? 'opacity-50 disabled' : 'hover:scale-[1.01] active:scale-95'}`}
            >
              {loading ? "Processing..." : "Publish Dish"}
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default CreateFood;