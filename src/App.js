import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputType, setInputType] = useState('url'); // 'url' o 'pdf'
  const [urlInput, setUrlInput] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  
  // Simulación de datos de videos recientes
  const [recentVideos] = useState([
    { id: 1, title: 'Nuevas medidas económicas en Aragón', thumbnail: 'https://via.placeholder.com/320x180?text=Video+1', date: '5 Mar 2025' },
    { id: 2, title: 'Reforma educativa provincial', thumbnail: 'https://via.placeholder.com/320x180?text=Video+2', date: '4 Mar 2025' },
    { id: 3, title: 'Eventos culturales de primavera', thumbnail: 'https://via.placeholder.com/320x180?text=Video+3', date: '2 Mar 2025' },
  ]);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulación de procesamiento
    setTimeout(() => {
      setIsProcessing(false);
      setVideoUrl('https://via.placeholder.com/640x360?text=Video+Generado');
    }, 2000);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AI News Video Generator</h1>
        <p>Convierte noticias en videos informativos de forma instantánea</p>
      </header>

      <main className="main-content">
        <section className="input-section">
          <div className="tabs">
            <button 
              className={inputType === 'url' ? 'active' : ''} 
              onClick={() => setInputType('url')}
            >
              URL de Noticia
            </button>
            <button 
              className={inputType === 'pdf' ? 'active' : ''} 
              onClick={() => setInputType('pdf')}
            >
              Archivo PDF
            </button>
          </div>

          <form onSubmit={handleSubmit} className="input-form">
            {inputType === 'url' ? (
              <div className="url-input">
                <input 
                  type="url" 
                  placeholder="Introduce la URL de la noticia..." 
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  required={inputType === 'url'}
                />
              </div>
            ) : (
              <div className="file-input">
                <label htmlFor="pdf-upload" className="file-label">
                  {pdfFile ? pdfFile.name : 'Seleccionar PDF...'}
                </label>
                <input 
                  id="pdf-upload"
                  type="file" 
                  accept=".pdf" 
                  onChange={handleFileChange}
                  required={inputType === 'pdf'}
                />
              </div>
            )}
            <button 
              type="submit" 
              className="generate-button"
              disabled={isProcessing || (inputType === 'url' && !urlInput) || (inputType === 'pdf' && !pdfFile)}
            >
              {isProcessing ? 'Generando...' : 'Generar Video'}
            </button>
          </form>
        </section>

        {isProcessing && (
          <section className="processing-section">
            <div className="processing-indicator">
              <div className="spinner"></div>
              <p>Procesando noticia y generando video...</p>
            </div>
          </section>
        )}

        {videoUrl && !isProcessing && (
          <section className="video-section">
            <h2>Video Generado</h2>
            <div className="video-container">
              <img src={videoUrl} alt="Video generado" />
              <div className="video-controls">
                <button className="control-button">Reproducir</button>
                <button className="control-button">Descargar</button>
                <button className="control-button">Compartir</button>
              </div>
            </div>
          </section>
        )}

        <section className="recent-videos">
          <h2>Videos Recientes</h2>
          <div className="video-grid">
            {recentVideos.map(video => (
              <div key={video.id} className="video-card">
                <div className="thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                </div>
                <div className="video-info">
                  <h3>{video.title}</h3>
                  <p className="date">{video.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>© 2025 AI News Video Generator - Desarrollado para Periódico de Aragón</p>
      </footer>
    </div>
  );
}

export default App;