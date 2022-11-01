import React, { createContext } from 'react'

import { useLocalStorage } from './hooks'
import { getRandomInt } from './utils'

export type AxisType = 'x' | 'y'
export interface IHandle {
  id: 'top' | 'right' | 'bottom' | 'left'
  progress: number
  axis: AxisType
  position: [number, number]
}

export const localStorageKey = 'brdrly-local-storage'
export const localStorageInitialState: IHandle[] = [
  { id: 'top', progress: 0, axis: 'x', position: [0, 0] },
  { id: 'right', progress: 0, axis: 'y', position: [100, 0] },
  { id: 'bottom', progress: 100, axis: 'x', position: [100, 100] },
  { id: 'left', progress: 100, axis: 'y', position: [0, 100] },
]

export type HandlesContextType = {
  handles: IHandle[]
  updateHandle?: (handleId: IHandle['id'], progress: number) => void
  resetHandles?: () => void
  shuffleHandles?: (fn: (handles: IHandle[]) => void) => void
}

export const HandlesContext = createContext<HandlesContextType>({
  handles: localStorageInitialState,
})

export const HandlesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [localHandles, setLocalHandles] = useLocalStorage<IHandle[]>(
    localStorageKey,
    localStorageInitialState
  )

  const updateHandle: HandlesContextType['updateHandle'] = (handleId, progress) => {
    setLocalHandles((handles) => [
      ...handles.map((handle) => ({
        ...handle,
        progress: handle.id === handleId ? progress : handle.progress,
      })),
    ])
  }

  const resetHandles: HandlesContextType['resetHandles'] = () => {
    setLocalHandles(() => [...localStorageInitialState])
  }

  const shuffleHandles: HandlesContextType['shuffleHandles'] = (callback) => {
    setLocalHandles((handles) => {
      const updatedHandles = handles.map((handle) => ({
        ...handle,
        progress: getRandomInt(0, 100),
      }))
      callback(updatedHandles)
      return updatedHandles
    })
  }

  return (
    <HandlesContext.Provider
      value={{
        handles: localHandles,
        updateHandle,
        resetHandles,
        shuffleHandles,
      }}
    >
      {children}
    </HandlesContext.Provider>
  )
}
