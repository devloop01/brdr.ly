import React, { useContext, useState } from 'react'

import { HandlesContextType, HandlesContext, IHandle } from './store'
import { useEvents } from './hooks'
import { createRadiusTextFromHandles, writeToClipboard } from './utils'
import { Header, Generator, Button } from './components'
import { RefreshIcon, ShuffleIcon } from '@src/icons'

const Popup: React.FC = () => {
  const { handles, updateHandle, resetHandles, shuffleHandles } =
    useContext<HandlesContextType>(HandlesContext)
  const { emitter } = useEvents()

  const [clicked, setClicked] = useState<boolean>(false)

  const onGeneratorChange = (handleId: IHandle['id'], progress: number) => {
    updateHandle?.(handleId, progress)
  }

  const copyHandler = () => {
    setClicked(true)

    const t = setTimeout(() => {
      setClicked(false)
      clearTimeout(t)
    }, 600)

    writeToClipboard('border-radius: ' + createRadiusTextFromHandles(handles))
  }

  const resetHandler = () => {
    resetHandles?.()
    emitter.emit('resetHandle', { reset: true })
  }

  const shuffleHandler = () => {
    shuffleHandles?.((handles) => {
      emitter.emit('shuffleHandle', { handles })
    })
  }

  return (
    <>
      <Header headerText="Brdr:ly;" subText="create fancy css shapes" />
      <main className="bg-gradient-grid px-6 py-4 ring-2 ring-inset ring-custom-purple-light">
        <Generator handles={handles} onChange={onGeneratorChange} />
        <div className="flex flex-col">
          <div className="mb-3">
            <span className="block text-base text-white">border-radius:</span>
            <span
              className="block rounded bg-white px-6 py-3 text-center font-mono text-lg font-normal tabular-nums text-black shadow-[4px_4px_0_-2px_theme(colors.custom.yellow.dark),4px_4px_0_0_black] ring-2 ring-inset ring-black"
              id="code"
            >
              {clicked ? 'copied!' : createRadiusTextFromHandles(handles)}
            </span>
          </div>
          <div className="mb-2 flex flex-row-reverse gap-6">
            <Button text="Copy" variant="success" onClick={copyHandler} />
            <Button variant="danger" icon={<RefreshIcon />} onClick={resetHandler} />
            <Button variant="success" icon={<ShuffleIcon />} onClick={shuffleHandler} />
          </div>
        </div>
      </main>
    </>
  )
}

export default Popup
