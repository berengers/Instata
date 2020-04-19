import { useEffect, useRef, useState } from 'react'

interface PropsInterface {
  cb: () => void
  observerOptions?: IntersectionObserverInit
}

const useInfiniteScroll = ({ cb, observerOptions }: PropsInterface) => {
  const [node, setNode] = useState<Element | null>(null)
  const observer: { current: IntersectionObserver | null } = useRef(null)

  useEffect(() => {
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(
      ([entry]: Array<IntersectionObserverEntry>) => {
        if (entry.isIntersecting) {
          cb()
        }
      },
      observerOptions
    )

    if (node) {
      observer.current.observe(node)
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    } // eslint-disable-next-line
  }, [node]);

  return [setNode]
}

export default useInfiniteScroll
