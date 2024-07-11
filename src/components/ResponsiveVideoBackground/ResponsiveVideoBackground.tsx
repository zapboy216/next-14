"use client";

import React, { ReactNode } from 'react';
import Image from 'next/image';
import styles from './ResponsiveVideoBackground.module.css';

interface ResponsiveVideoBackgroundProps {
  className?: string;
  webm?: string;
  mp4?: string;
  poster?: string;
  fallback?: string;
  srcset?: string;
  sizes?: string;
  breakpoint?: string;
  children?: ReactNode;
}

const ResponsiveVideoBackground: React.FC<ResponsiveVideoBackgroundProps> = ({
  className,
  webm,
  mp4,
  poster,
  fallback,
  srcset,
  sizes,
  breakpoint,
  children,
}) => {
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const showVideo = !prefersReducedMotion && (webm || mp4) && (!breakpoint || window.matchMedia(`(min-width: ${breakpoint})`).matches);

  return (
    <div className={`${styles.responsiveVideoBackground} ${className}`} style={{ position: 'relative', overflow: 'hidden' }}>
      {showVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={poster}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        >
          {webm && <source src={webm} type="video/webm" />}
          {mp4 && <source src={mp4} type="video/mp4" />}
        </video>
      ) : (
        fallback && (
          <Image
            src={fallback}
            alt="Fallback background"
            layout="fill"
            objectFit="cover"
            priority
          />
        )
      )}
      <div
        className={styles.overlay}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'var(--overlay-color, transparent)',
          zIndex: 1,
        }}
      ></div>
      <div
        className={styles.content}
        style={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ResponsiveVideoBackground;
