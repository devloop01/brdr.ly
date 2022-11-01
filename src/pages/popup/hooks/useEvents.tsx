// https://github.com/codeshifu/react-mitt

import { FC, useContext, createContext } from 'react'
import mitt, { Emitter } from 'mitt'

type Events = Record<string, any>

const emitter: Emitter<Events> = mitt<Events>()

export interface EventsContextType {
  emitter: Emitter<Events>
}

const EventsContext = createContext<EventsContextType>({ emitter })

export const EventsProvider: FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return <EventsContext.Provider value={{ emitter }}>{children}</EventsContext.Provider>
}

const useEvents = (): EventsContextType => useContext(EventsContext)

export default useEvents
