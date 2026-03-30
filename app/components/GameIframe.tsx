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
  const [isIosFallbackFullscreen, setIsIosFallbackFullscreen] = useState(false);

  useEffect(() => {
    const onFullscreenChange = () => {
      const webkitDocument = document as Document & {
        webkitFullscreenElement?: Element | null;
      };

      setIsFullscreen(
        !!document.fullscreenElement || !!webkitDocument.webkitFullscreenElement,
      );
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange as EventListener);

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!isIosFallbackFullscreen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isIosFallbackFullscreen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsIosFallbackFullscreen(false);
      }
    };

    if (isIosFallbackFullscreen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isIosFallbackFullscreen]);

  const handleFullscreen = () => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const webkitElement = container as HTMLDivElement & {
      webkitRequestFullscreen?: () => Promise<void> | void;
    };
    const webkitDocument = document as Document & {
      webkitFullscreenElement?: Element | null;
      webkitExitFullscreen?: () => Promise<void> | void;
    };

    if (isIosFallbackFullscreen) {
      setIsIosFallbackFullscreen(false);
      return;
    }

    if (document.fullscreenElement || webkitDocument.webkitFullscreenElement) {
      const exitFullscreen = document.exitFullscreen?.bind(document) || webkitDocument.webkitExitFullscreen?.bind(document);

      exitFullscreen?.();
      return;
    }

    const requestFullscreen = container.requestFullscreen?.bind(container) || webkitElement.webkitRequestFullscreen?.bind(container);

    if (requestFullscreen) {
      Promise.resolve(requestFullscreen()).catch((err: { message?: string }) => {
        console.error(`Error attempting to enable fullscreen: ${err.message ?? 'Unknown error'}`);
        setIsIosFallbackFullscreen(true);
      });
      return;
    }

    setIsIosFallbackFullscreen(true);
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
        background: isFullscreen || isIosFallbackFullscreen ? '#0f172a' : 'transparent',
        width: isFullscreen ? '100vw' : isIosFallbackFullscreen ? '100%' : '100%',
        height: isFullscreen ? '100vh' : isIosFallbackFullscreen ? '100dvh' : 'auto',
        position: isIosFallbackFullscreen ? 'fixed' : 'relative',
        inset: isIosFallbackFullscreen ? 0 : 'auto',
        zIndex: isIosFallbackFullscreen ? 9999 : 'auto',
        paddingTop: isIosFallbackFullscreen ? 'max(env(safe-area-inset-top), 0px)' : 0,
        paddingBottom: isIosFallbackFullscreen ? 'max(env(safe-area-inset-bottom), 0px)' : 0,
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
          ...(isFullscreen || isIosFallbackFullscreen ? { height: '100%' } : {}),
        }}
        allow="autoplay; fullscreen"
        allowFullScreen
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
          backgroundColor: isFullscreen || isIosFallbackFullscreen ? '#0f172a' : 'transparent',
          borderTop: isFullscreen || isIosFallbackFullscreen ? '1px solid rgba(255,255,255,0.1)' : 'none',
          flexWrap: 'wrap',
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
          ) : isIosFallbackFullscreen ? (
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
