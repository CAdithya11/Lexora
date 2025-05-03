import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, FileText, AlertTriangle } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.js?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function PersonaMatcherPage() {
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Frontend Developer', skill: 'React, JavaScript, HTML/CSS', progress: 75 },
    { id: 2, title: 'Backend Developer', skill: 'Node.js, Express, MongoDB', progress: 60 },
    { id: 3, title: 'UX Designer', skill: 'Figma, User Research, Wireframing', progress: 85 },
    { id: 4, title: 'DevOps Engineer', skill: 'Docker, Kubernetes, CI/CD', progress: 10 },
  ]);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [matchedPersonas, setMatchedPersonas] = useState([]);
  const [selectedPdfIndex, setSelectedPdfIndex] = useState(null);
  const [pdfPreviewError, setPdfPreviewError] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [text, setText] = useState('');
  const hnadlenavigate = () => {
    navigate('/Personas', { state: { msg: text } });
  };
  const extractText = async (file) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      const typedarray = new Uint8Array(reader.result);
      const pdf = await pdfjs.getDocument({ data: typedarray }).promise;
      let extractedText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        extractedText += textContent.items.map((item) => item.str).join(' ') + ' ';
      }

      setText(extractedText);
    };
  };
  useEffect(() => {
    if (uploadedFiles.length > 0) {
      handleMatchPersonas();
    }
  }, [uploadedFiles]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files).map((file) => ({
      file,
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      preview: file.type === 'application/pdf' ? URL.createObjectURL(file) : URL.createObjectURL(file),
      name: file.name,
      type: file.type,
    }));
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
    setIsUploading(true);

    if (selectedPdfIndex === null && files.length > 0) {
      setSelectedPdfIndex(uploadedFiles.length);
    }
  };

  const removeFile = (id) => {
    const fileToRemove = uploadedFiles.find((fileObj) => fileObj.id === id);
    if (fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    const updatedFiles = uploadedFiles.filter((fileObj) => fileObj.id !== id);
    setUploadedFiles(updatedFiles);

    if (updatedFiles.length === 0) {
      setIsUploading(false);
      setMatchedPersonas([]);
      setSelectedPdfIndex(null);
    } else if (selectedPdfIndex >= updatedFiles.length) {
      setSelectedPdfIndex(updatedFiles.length - 1);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleMatchPersonas = () => {
    const mockMatchedPersonas = uploadedFiles.map((file, index) => ({
      id: file.id,
      name: `Career Persona ${index + 1}`,
      fileName: file.name,
      confidence: Math.floor(Math.random() * 100),
    }));
    setMatchedPersonas(mockMatchedPersonas);
  };

  const PDFPreview = ({ url }) => {
    const [previewError, setPreviewError] = useState(null);

    return (
      <div className="pdf-preview-container">
        {previewError ? (
          <div className="flex flex-col items-center justify-center h-full text-red-500">
            <AlertTriangle className="w-12 h-12 mb-4" />
            <p>Failed to load PDF preview</p>
          </div>
        ) : (
          <iframe
            src={url}
            width="100%"
            height="400"
            title="PDF Preview"
            onError={() => setPreviewError(new Error('Unable to display PDF'))}
            className="border rounded-lg"
          />
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarSub />

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Persona Matcher</h1>
            <p className="text-sm text-gray-500">My Persona's</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium mr-2">
                JS
              </div>
              <span className="text-sm font-medium text-gray-700">John Smith</span>
            </div>
          </div>
        </header>

        <main className="p-6 flex-1 overflow-y-auto bg-white">
          <div className="bg-white">
            <div className="">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Matched Career Persona's</h2>
                <button
                  onClick={triggerFileInput}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  <Upload className="w-5 h-5" />
                  Upload Certificates
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Persona matching will be performed by finding matching persona's based on the certifications provided.
              </p>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => {
                  handleFileUpload(e);
                  extractText(e.target.files[0]);
                }}
              />

              {uploadedFiles.length === 0 ? (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-300 transition w-[300px]"
                  onClick={triggerFileInput}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Upload Certificates</p>
                  <p className="text-sm text-gray-500">Drag and drop or click to browse</p>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {uploadedFiles.map((fileObj, index) => (
                      <div
                        key={fileObj.id}
                        className={`relative border rounded-lg overflow-hidden ${
                          fileObj.type === 'application/pdf' ? 'p-4' : ''
                        }`}
                      >
                        {uploadedFiles[selectedPdfIndex].type === 'application/pdf' ? (
                          <PDFPreview url={uploadedFiles[selectedPdfIndex].preview} />
                        ) : (
                          <img
                            src={uploadedFiles[selectedPdfIndex].preview}
                            alt="Preview"
                            className="w-full h-56 object-cover"
                          />
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(fileObj.id);
                          }}
                          className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white"
                        >
                          <X className="w-5 h-5 text-red-500" />
                        </button>
                      </div>
                    ))}
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer hover:border-blue-300"
                      onClick={triggerFileInput}
                    >
                      <Upload className="w-8 h-8 text-gray-400 mr-2" />
                      <span className="text-gray-600">Add More</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <p>{text}</p>
          <div className="fixed bottom-4 left-0 right-0 flex justify-center">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
              onClick={hnadlenavigate}
            >
              Match persona
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
