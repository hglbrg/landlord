'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Map.module.css'

interface MapComponentProps {
  latitude: number
  longitude: number
  address: string
  showDialog?: boolean
  onDialogToggle?: (open: boolean) => void
  height?: string
  zoom?: number
  className?: string
}

export default function MapComponent({
  latitude,
  longitude,
  address,
  showDialog = false,
  onDialogToggle,
  height = '200px',
  zoom = 15,
  className = '',
}: MapComponentProps) {
  const mapRef = useRef<any>(null)
  const dialogMapRef = useRef<any>(null)
  const [isClient, setIsClient] = useState(false)
  const [leafletLoaded, setLeafletLoaded] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load leaflet dynamically to avoid SSR issues
  useEffect(() => {
    if (!isClient) return

    const loadLeaflet = async () => {
      // Dynamically import leaflet to avoid SSR issues
      const L = (await import('leaflet')).default

      // Fix default markers in webpack
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      })

      setLeafletLoaded(true)
      return L
    }

    loadLeaflet()
  }, [isClient])

  // Initialize small preview map
  useEffect(() => {
    if (!leafletLoaded || !isClient) return

    const initMap = async () => {
      const L = (await import('leaflet')).default

      if (mapRef.current) {
        // Clear existing map
        if (mapRef.current._leaflet_id) {
          mapRef.current._leaflet_map?.remove()
        }

        // Create new map
        const map = L.map(mapRef.current, {
          zoomControl: false,
          scrollWheelZoom: false,
          dragging: false,
          touchZoom: false,
          doubleClickZoom: false,
        }).setView([latitude, longitude], zoom)

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(map)

        // Add marker
        L.marker([latitude, longitude]).addTo(map).bindPopup(address)

        // Store map reference
        mapRef.current._leaflet_map = map
      }
    }

    initMap()

    // Cleanup function
    return () => {
      if (mapRef.current?._leaflet_map) {
        mapRef.current._leaflet_map.remove()
      }
    }
  }, [leafletLoaded, latitude, longitude, address, zoom, isClient])

  // Initialize full-screen dialog map
  useEffect(() => {
    if (!leafletLoaded || !showDialog || !isClient) return

    const initDialogMap = async () => {
      const L = (await import('leaflet')).default

      if (dialogMapRef.current) {
        // Clear existing map
        if (dialogMapRef.current._leaflet_id) {
          dialogMapRef.current._leaflet_map?.remove()
        }

        // Create new map with full controls and better initial zoom
        const map = L.map(dialogMapRef.current, {
          zoomControl: true,
          scrollWheelZoom: true,
          dragging: true,
          touchZoom: true,
          doubleClickZoom: true,
          keyboard: true,
          boxZoom: true,
          zoomSnap: 1,
          zoomDelta: 1,
          wheelPxPerZoomLevel: 60,
        }).setView([latitude, longitude], zoom)

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map)

        // Add marker with enhanced popup
        const marker = L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup(
            `<div style="text-align: center; padding: 5px;">
              <strong style="font-size: 14px;">${address}</strong><br/>
              <small style="color: #666;">Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}</small><br/>
              <button onclick="window.open('https://www.google.com/maps?q=${latitude},${longitude}', '_blank')" 
                      style="margin-top: 8px; padding: 4px 8px; background: #4285f4; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 12px;">
                Öppna i Google Maps
              </button>
            </div>`,
            { maxWidth: 250 }
          )

        // Open popup by default
        marker.openPopup()

        // Add scale control
        L.control
          .scale({
            position: 'bottomleft',
            imperial: false,
            metric: true,
          })
          .addTo(map)

        // Custom control for centering on marker
        const centerControl = L.Control.extend({
          onAdd: function () {
            const div = L.DomUtil.create(
              'div',
              'leaflet-bar leaflet-control leaflet-control-custom'
            )
            div.style.backgroundColor = 'white'
            div.style.backgroundImage =
              'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDJWMThNMiAxMEgxOCIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K)'
            div.style.backgroundSize = '16px 16px'
            div.style.backgroundRepeat = 'no-repeat'
            div.style.backgroundPosition = 'center'
            div.style.width = '30px'
            div.style.height = '30px'
            div.style.cursor = 'pointer'
            div.title = 'Centrera på markör'

            div.onclick = function () {
              map.setView([latitude, longitude], zoom)
              marker.openPopup()
            }

            return div
          },
        })

        // Add center control
        map.addControl(new centerControl({ position: 'topleft' }))

        // Store map reference
        dialogMapRef.current._leaflet_map = map

        // Invalidate size after a short delay to ensure proper rendering
        setTimeout(() => {
          map.invalidateSize()
        }, 100)

        // Additional invalidation when dialog becomes visible
        const observer = new ResizeObserver(() => {
          map.invalidateSize()
        })
        observer.observe(dialogMapRef.current)

        // Cleanup observer
        dialogMapRef.current._resizeObserver = observer
      }
    }

    initDialogMap()

    // Prevent body scroll when dialog is open
    document.body.style.overflow = 'hidden'

    // Cleanup function
    return () => {
      // Restore body scroll
      document.body.style.overflow = 'unset'

      if (dialogMapRef.current?._leaflet_map) {
        dialogMapRef.current._leaflet_map.remove()
      }
      if (dialogMapRef.current?._resizeObserver) {
        dialogMapRef.current._resizeObserver.disconnect()
      }
    }
  }, [leafletLoaded, showDialog, latitude, longitude, address, zoom, isClient])

  // Handle keyboard events for dialog
  useEffect(() => {
    if (!showDialog) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onDialogToggle) {
        onDialogToggle(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [showDialog, onDialogToggle])

  const handleMapClick = () => {
    if (onDialogToggle) {
      onDialogToggle(true)
    }
  }

  const handleDialogClose = () => {
    if (onDialogToggle) {
      onDialogToggle(false)
    }
  }

  const handleDialogBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleDialogClose()
    }
  }

  if (!isClient) {
    return (
      <div className={`${styles.mapPlaceholder} ${className}`} style={{ height }}>
        <div className={styles.loadingText}>Laddar karta...</div>
      </div>
    )
  }

  return (
    <>
      {/* Small preview map */}
      <div className={`${styles.mapContainer} ${className}`}>
        <div
          ref={mapRef}
          className={styles.map}
          style={{ height, cursor: 'pointer' }}
          onClick={handleMapClick}
          title="Klicka för att öppna större karta"
        />
        <div className={styles.mapOverlay} onClick={handleMapClick}>
          <span className={styles.expandText}>🔍 Visa större karta</span>
        </div>
      </div>

      {/* Full-screen dialog with larger map */}
      {showDialog && (
        <dialog open className={styles.mapDialog} onClick={handleDialogBackdropClick}>
          <div className={styles.dialogContent}>
            <header className={styles.dialogHeader}>
              <h3>Karta - {address}</h3>
              <div className={styles.headerControls}>
                <button
                  onClick={() =>
                    window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank')
                  }
                  className={styles.googleMapsButton}
                  title="Öppna i Google Maps"
                >
                  📍 Google Maps
                </button>
                <button
                  onClick={handleDialogClose}
                  className={styles.closeButton}
                  aria-label="Stäng karta"
                >
                  ×
                </button>
              </div>
            </header>
            <div ref={dialogMapRef} className={styles.dialogMap} />
            <footer className={styles.dialogFooter}>
              <small>
                Använd musen eller touch för att navigera kartan. Klicka på markören för Google
                Maps.
              </small>
              <button onClick={handleDialogClose} className={styles.dialogCloseBtn}>
                Stäng
              </button>
            </footer>
          </div>
        </dialog>
      )}
    </>
  )
}
