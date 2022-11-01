import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useDrag, Vector2 } from '@use-gesture/react'

import { useEvents } from '../hooks'
import { clamp, mapRange } from '../utils'
import { IHandle } from '../store'

interface Props {
  handle: IHandle
  containment: HTMLDivElement
  onHandleUpdate: (e: { handleId: IHandle['id']; progress: number }) => void
}

const Handle: React.FC<Props> = ({ handle, containment, onHandleUpdate }) => {
  const handleRef = useRef<HTMLDivElement | null>(null)
  const { emitter } = useEvents()

  const [dragOffset, setDragOffset] = useState<Vector2>([0, 0])
  const [positionStyles, setPositionStyles] = useState<{ transform?: string }>({})

  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

  const bind = useDrag(
    ({ down, offset: [ox, oy] }) => {
      const rect = handleRef.current?.getBoundingClientRect()

      if (!rect) return

      let p = [
        (rect.x - containment.offsetLeft) / (containment.offsetWidth - rect.width),
        (rect.y - containment.offsetTop) / (containment.offsetHeight - rect.height),
      ].map((v) => clamp(Math.floor(v * 100), 0, 100))

      api.start({ x: ox, y: oy, immediate: down })
      setDragOffset([ox, oy])
      onHandleUpdate?.({ handleId: handle.id, progress: handle.axis === 'x' ? p[0] : p[1] })
    },
    {
      axis: handle.axis,
      bounds: containment ?? {},
      rubberband: true,
      from: dragOffset,
    }
  )

  const initialize = useCallback(
    ({ reset, handles }: { reset: boolean; handles?: IHandle[] }) => {
      let currentHandle = handle
      if (handles) {
        currentHandle = handles.filter((h) => h.id === handle.id)[0]
      }

      const mapProgessToWidth = (n: number) =>
        mapRange(
          n,
          0,
          100,
          0,
          containment.offsetWidth - (handleRef.current ? handleRef.current.offsetWidth : 0)
        )

      let position =
        currentHandle.axis === 'x'
          ? [currentHandle.progress, currentHandle.position[1]]
          : [currentHandle.position[0], currentHandle.progress]
      position = position.map((v) => mapProgessToWidth(v))

      if (reset) {
        position = handle.position.map((v) => mapProgessToWidth(v))
      }

      setPositionStyles(() => ({ transform: `translate(${position[0]}px, ${position[1]}px)` }))

      setDragOffset([0, 0])
      api.set({ x: 0, y: 0 })
    },
    [handle]
  )

  const shuffle = useCallback(({ handles }: { handles: IHandle[] }) => {
    initialize({ reset: false, handles })
  }, [])

  useEffect(() => {
    initialize({ reset: false })

    emitter.on('resetHandle', initialize)
    emitter.on('shuffleHandle', shuffle)
    return () => {
      emitter.off('resetHandle', initialize)
      emitter.off('shuffleHandle', shuffle)
    }
  }, [])

  return (
    <animated.div
      ref={handleRef}
      id={handle.id}
      style={{ x, y, ...positionStyles }}
      {...bind()}
      className={
        'radius-handle absolute left-0 top-0 block h-8 w-8 cursor-grab transition-opacity duration-300 ease-in-out before:absolute before:left-1/2 before:top-1/2 before:h-1/2 before:w-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:scale-50 before:rounded-full before:bg-white before:opacity-25 before:ring-0 before:ring-white before:ring-opacity-75 before:transition-all before:duration-200 before:ease-out before:hover:bg-blue-700 before:hover:ring-8 ' +
        (handle.axis === 'x' ? 'active:cursor-ew-resize' : 'active:cursor-ns-resize')
      }
    />
  )
}

export default Handle
