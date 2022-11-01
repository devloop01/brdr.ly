import React, { useRef, useState, useEffect } from 'react'

import { IHandle } from '../store'
import { createRadiusTextFromHandles } from '../utils'
import Handle from './Handle'

type Props = {
  handles: IHandle[]
  onChange?: (id: IHandle['id'], progress: number) => void
}

const Generator: React.FC<Props> = ({ handles, onChange }) => {
  const generatorRef = useRef<HTMLDivElement | null>(null)

  const [containment, setContainment] = useState<HTMLDivElement | null>(null)

  const onChangeHandler = ({
    handleId,
    progress,
  }: {
    handleId: IHandle['id']
    progress: number
  }): void => {
    onChange?.(handleId, progress)
  }

  useEffect(() => {
    setContainment(generatorRef.current)
  }, [])

  return (
    <div className="generator relative mx-auto h-[60vmin] w-[60vmin] p-4" ref={generatorRef}>
      <div className="generator-shape__wrapper h-full w-full border-2 border-dashed border-white border-opacity-10 transition-[border] duration-300 ease-in-out">
        <div
          className="generator-shape h-full w-full border-2 border-custom-purple-light bg-gradient-to-br from-custom-purple-light to-custom-purple-dark shadow-[2rem_2rem_0_0_rgba(0,0,0,0.15)]"
          style={{
            borderRadius: createRadiusTextFromHandles(handles),
          }}
        />
      </div>
      {containment &&
        handles.map((handle) => (
          <Handle
            handle={handle}
            containment={containment}
            onHandleUpdate={onChangeHandler}
          ></Handle>
        ))}
    </div>
  )
}

export default Generator
