import { type ReactNode, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Info } from 'lucide-react'
import { cn } from '../lib/cn'

type Props = {
  children: ReactNode
  align?: 'center' | 'right'
  size?: number
  className?: string
}

export default function InfoPopover({
  children,
  align = 'center',
  size = 14,
  className,
}: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onEsc)
    }
  }, [open])

  return (
    <span
      ref={ref}
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        aria-label="More info"
        className="inline-flex items-center text-taz-parchment-dim hover:text-taz-brass transition-colors focus:outline-none focus-visible:text-taz-brass"
      >
        <Info size={size} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute top-full mt-2 z-20 w-max max-w-[16rem] rounded-md border border-taz-brass/30 bg-taz-ink/95 backdrop-blur px-3 py-2 text-xs leading-relaxed text-taz-parchment shadow-xl',
              align === 'center' && 'left-1/2 -translate-x-1/2',
              align === 'right' && 'right-0',
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}
