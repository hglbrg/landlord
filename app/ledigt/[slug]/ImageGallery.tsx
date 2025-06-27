"use client";

import Image from "next/image";
import { useState } from "react";
import { Image as ImageType } from "@/lib/types/listing";
import styles from "./page.module.css";

interface ImageGalleryProps {
  images: ImageType[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <section>
      <div style={{ marginBottom: "1rem" }}>
        <Image
          src={images[selectedImageIndex]?.url || images[0].url}
          alt={images[selectedImageIndex]?.alt || images[0].alt}
          width={800}
          height={400}
          className={styles.mainImage}
        />
      </div>

      {images.length > 1 && (
        <div className={styles.imageGallery}>
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`${styles.thumbnailButton} ${selectedImageIndex === index ? styles.selected : ""}`}
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
  );
}
