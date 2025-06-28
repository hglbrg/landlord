'use client'

import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react'
import { Image as ImageType } from '@/lib/types/listing'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './page.module.css'
import { AnimatePresence, motion } from 'framer-motion'

interface ImageGalleryProps {
  images: ImageType[]
  title: string
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const maxIndex = images.length - 1

  const goToPrev = useCallback(() => {
    setSelectedImageIndex(i => (i > 0 ? i - 1 : maxIndex))
  }, [maxIndex])

  const goToNext = useCallback(() => {
    setSelectedImageIndex(i => (i < maxIndex ? i + 1 : 0))
  }, [maxIndex])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'h') goToPrev()
      else if (e.key === 'ArrowRight' || e.key === 'l') goToNext()
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goToPrev, goToNext])

  const currentImage = images[selectedImageIndex] ?? images[0]

  return (
    <section>
      <div className={styles.imageContainer} style={{ marginBottom: '1rem' }}>
        <div className={styles.mainImageWrapper}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentImage.url}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={currentImage.url}
                alt={currentImage.alt}
                width={800}
                height={400}
                className={styles.mainImage}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <button
          onClick={goToPrev}
          className={`${styles.navButton} ${styles.navLeft}`}
          aria-label="Previous image"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={goToNext}
          className={`${styles.navButton} ${styles.navRight}`}
          aria-label="Next image"
        >
          <ChevronRight />
        </button>
      </div>

      {images.length > 1 && (
        <div className={styles.imageGallery}>
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`${styles.thumbnailButton} ${
                selectedImageIndex === index ? styles.selected : ''
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                width={100}
                height={60}
                className={styles.thumbnailImage}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
