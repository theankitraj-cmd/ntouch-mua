"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, type PanInfo } from "framer-motion"
import { ChevronUp, ChevronDown } from "lucide-react"

const images = [
  {
    id: 1,
    src: "/title-marathi-bride.jpg",
    alt: "Luxurious Bridal Glam",
  },
  {
    id: 2,
    src: "/editorial-editorials.jpg",
    alt: "Soft Pink Editorial Look",
  },
  {
    id: 3,
    src: "/title-indo-western.jpg",
    alt: "High Fashion Smokey Eye",
  },
  {
    id: 4,
    src: "/title-rajasthani-bride.jpg",
    alt: "Traditional Indian Bride",
  },
  {
    id: 5,
    src: "/bride-look-2.jpg",
    alt: "Reception Dewy Glam",
  },
];

export function VerticalImageStack() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const lastNavigationTime = useRef(0)
  const navigationCooldown = 400 // ms between navigations

  const navigate = useCallback((newDirection: number) => {
    const now = Date.now()
    if (now - lastNavigationTime.current < navigationCooldown) return
    lastNavigationTime.current = now

    setCurrentIndex((prev) => {
      if (newDirection > 0) {
        return prev === images.length - 1 ? 0 : prev + 1
      }
      return prev === 0 ? images.length - 1 : prev - 1
    })
  }, [])

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    if (info.offset.y < -threshold) {
      navigate(1)
    } else if (info.offset.y > threshold) {
      navigate(-1)
    }
  }

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 0) {
          navigate(1)
        } else {
          navigate(-1)
        }
      }
    },
    [navigate],
  )

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: true })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [handleWheel])

  const getCardStyle = (index: number) => {
    const total = images.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    if (diff === 0) {
      return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0 }
    } else if (diff === -1) {
      return { y: -160, scale: 0.82, opacity: 0.6, zIndex: 4, rotateX: 8 }
    } else if (diff === -2) {
      return { y: -280, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: 15 }
    } else if (diff === 1) {
      return { y: 160, scale: 0.82, opacity: 0.6, zIndex: 4, rotateX: -8 }
    } else if (diff === 2) {
      return { y: 280, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: -15 }
    } else {
      return { y: diff > 0 ? 400 : -400, scale: 0.6, opacity: 0, zIndex: 0, rotateX: diff > 0 ? -20 : 20 }
    }
  }

  const isVisible = (index: number) => {
    const total = images.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return Math.abs(diff) <= 2
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-surface py-24">
      <div className="absolute top-12 text-center w-full z-10 px-6">
        <h2 className="font-outline text-6xl md:text-8xl lg:text-9xl text-plum opacity-5 tracking-widest absolute inset-0 -top-12 pointer-events-none">SIGNATURE</h2>
        <p className="font-body text-sm tracking-[0.2em] uppercase text-gold-500 mb-2 mt-8">Iconic Styles</p>
        <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-plum font-light">The N.Touch <span className="italic text-blush-500">Signatures</span></h3>
      </div>

      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush-200/20 blur-3xl" />
      </div>

      {/* Card Stack */}
      <div className="relative flex h-[500px] w-[320px] items-center justify-center mt-12" style={{ perspective: "1200px" }}>
        {images.map((image, index) => {
          if (!isVisible(index)) return null
          const style = getCardStyle(index)
          const isCurrent = index === currentIndex

          return (
            <motion.div
              key={image.id}
              className="absolute cursor-grab active:cursor-grabbing"
              animate={{
                y: style.y,
                scale: style.scale,
                opacity: style.opacity,
                rotateX: style.rotateX,
                zIndex: style.zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 1,
              }}
              drag={isCurrent ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              style={{
                transformStyle: "preserve-3d",
                zIndex: style.zIndex,
              }}
            >
              <div
                className="relative h-[420px] w-[280px] overflow-hidden rounded-3xl bg-white ring-1 ring-blush-500/20"
                style={{
                  boxShadow: isCurrent
                    ? "0 30px 60px -12px rgba(212,69,107,0.3), 0 0 0 1px rgba(212,69,107,0.1)"
                    : "0 10px 30px -10px rgba(0,0,0,0.1)",
                }}
              >
                {/* Card inner glow - uses foreground with low opacity */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-black/20 via-transparent to-transparent z-10 pointer-events-none" />

                <img
                  src={image.src}
                  alt={image.alt}
                  className="object-cover w-full h-full pointer-events-none"
                  draggable={false}
                />

                {/* Bottom gradient overlay - uses background color */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-8 z-10 pointer-events-none">
                   <h4 className="font-cursive text-3xl text-white text-center px-4 drop-shadow-md">{image.alt}</h4>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Navigation dots */}
      <div className="absolute right-8 md:right-24 top-1/2 flex -translate-y-1/2 flex-col gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (index !== currentIndex) {
                setCurrentIndex(index)
              }
            }}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "h-8 bg-blush-500" : "bg-black/20 hover:bg-blush-300"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Instruction hint */}
      <motion.div
        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 hidden md:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-2 text-plum-soft">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronUp className="w-5 h-5 text-blush-400" />
          </motion.div>
          <span className="text-[10px] font-medium tracking-widest uppercase">Scroll or Drag</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-blush-400" />
          </motion.div>
        </div>
      </motion.div>

      {/* Counter */}
      <div className="absolute left-8 md:left-24 top-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center">
          <span className="text-5xl font-light text-plum tabular-nums font-display">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <div className="my-3 h-10 w-px bg-plum/20" />
          <span className="text-lg text-plum-soft tabular-nums font-display">{String(images.length).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  )
}
