'use client';

import React, { useRef, useState, useEffect } from 'react';

interface GameIframeProps {
  src: string;
  title: string;
  className?: string;
  style?: React.CSSProperties;
  scrolling?: string;
}

export default function GameIframe({ src, title, className, style, scrolling }: GameIframeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'JigSolitaire',
          text: 'Check out this awesome puzzle game!',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (e) {
      console.error('Error sharing', e);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        ...style,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: isFullscreen ? '#0f172a' : 'transparent',
        width: isFullscreen ? '100vw' : '100%',
        height: isFullscreen ? '100vh' : 'auto',
      }}
    >
      <iframe
        src={src}
        title={title}
        className={!isFullscreen ? className : undefined}
        style={{
          width: '100%',
          flexGrow: 1,
          border: 'none',
          backgroundColor: 'transparent',
          ...(isFullscreen && { height: '100%' })
        }}
        allow="autoplay; fullscreen"
        loading="lazy"
        scrolling={scrolling}
      />
      
      {/* Controls below iframe */}
      <div 
        className="game-controls-bar"
        style={{
          display: 'flex',
          gap: '12px',
          padding: '12px',
          justifyContent: 'center',
          width: '100%',
          backgroundColor: isFullscreen ? '#0f172a' : 'transparent',
          borderTop: isFullscreen ? '1px solid rgba(255,255,255,0.1)' : 'none',
        }}
      >
        <button 
          onClick={handleFullscreen} 
          style={{
            background: 'var(--white, #fff)',
            color: 'var(--sky-dark, #00a7cc)',
            border: 'none',
            outline: 'none',
            padding: '10px 20px',
            borderRadius: '100px',
            fontWeight: 800,
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.1)'; }}
          onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)'; }}
        >
          {isFullscreen ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>
              Exit Fullscreen
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
              Fullscreen
            </>
          )}
        </button>
        <button 
          onClick={handleShare}
          style={{
            background: 'linear-gradient(180deg, var(--mint-light, #8cebbd) 0%, var(--mint, #2cd089) 100%)',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '100px',
            fontWeight: 800,
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.4), 0 4px 10px rgba(44, 208, 137, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'inset 0 2px 0 rgba(255,255,255,0.5), 0 6px 14px rgba(44, 208, 137, 0.4)'; }}
          onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'inset 0 2px 0 rgba(255,255,255,0.4), 0 4px 10px rgba(44, 208, 137, 0.3)'; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
          Share
        </button>
      </div>
    </div>
  );
}
