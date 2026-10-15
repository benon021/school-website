import { useEffect } from 'react'

/** Adds `.is-visible` to every `.reveal` element as it scrolls into view or on mount. */
export default function useReveal(dep) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Pre-trigger elements ahead of viewport so users don't scroll into blank space
    const revealVisible = () => {
      const els = document.querySelectorAll('.reveal')
      els.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top <= window.innerHeight + 350) {
          el.classList.add('is-visible')
        }
      })
    }

    revealVisible()

    if (typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'))
      return
    }

    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.01, rootMargin: '350px 0px 350px 0px' },
    )

    els.forEach((el) => {
      if (!el.classList.contains('is-visible')) {
        io.observe(el)
      }
    })

    window.addEventListener('scroll', revealVisible, { passive: true })

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', revealVisible)
    }
  }, [dep])
}
