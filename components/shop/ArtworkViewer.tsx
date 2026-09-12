'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import styles from './ArtworkViewer.module.css'

interface ArtworkViewerProps {
  title: string
  images: string[]
  isOriginal: boolean
  medium?: string | null
}

export default function ArtworkViewer({
  title,
  images,
  isOriginal,
  medium,
}: ArtworkViewerProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const containerRef = useRef<HTMLDivElement>(null)

  const activeImage = images[selectedIndex] || images[0] || '/hero.jpg'

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) })
  }

  return (
    <div className={styles.viewerContainer}>
      {/* Main Interactive Stage */}
      <div
        ref={containerRef}
        className={`${styles.mainStage} ${isZoomed ? styles.isZoomed : ''}`}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={activeImage}
          alt={`${title} - View ${selectedIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 55vw"
          className={styles.baseImage}
          style={{
            objectFit: 'cover',
            transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
          }}
        />

        {/* Studio Texture Inspection Badge */}
        <div className={styles.lensNotice}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span>{isZoomed ? 'Inspecting Brushwork (2.5× Studio Loupe)' : 'Hover to Inspect Canvas & Brushstrokes'}</span>
        </div>

        {isOriginal && (
          <div className={styles.originalTag}>
            ★ One-of-a-Kind Original {medium ? `• ${medium}` : ''}
          </div>
        )}
      </div>

      {/* Thumbnail Selector */}
      {images.length > 1 && (
        <div className={styles.thumbStrip}>
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`${styles.thumbBtn} ${selectedIndex === idx ? styles.thumbActive : ''}`}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                style={{ objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
