import React, { useEffect, useState, useRef } from 'react'
import classnames from 'classnames'
import './TopLoader.scss'

export default function TopLoader() {
  const [start, setStart] = useState(false)
  const [stop, setStop] = useState(false)
  const [finish, setFinish] = useState(false)

  const stopTimeout = useRef<NodeJS.Timeout | null>(null)
  const finishTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!start) {
      setStart(true)
      return
    }

    setStart(false)
    setStop(true)

    stopTimeout.current = setTimeout(() => {
      setFinish(true)

      finishTimeout.current = setTimeout(() => {
        setStop(false)
        setFinish(false)
      }, 100)
    }, 200)
  }, [start])

  useEffect(() => {
    return () => {
      if (stopTimeout.current) clearTimeout(stopTimeout.current)
      if (finishTimeout.current) clearTimeout(finishTimeout.current)
    }
  }, [])

  return (
    <div className={classnames({ 'top-loader': true, 'top-loader--enabled': start && !finish })}>
      <div
        className={classnames({
          'top-loader__bar': true,
          'top-loader__bar--start': start,
          'top-loader__bar--stop': stop,
          'top-loader__bar--finish': finish,
        })}
      ></div>
    </div>
  )
}
