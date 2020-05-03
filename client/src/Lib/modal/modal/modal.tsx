import React, { MouseEvent, ReactNode } from 'react'
import { CSSTransition } from 'react-transition-group'

import './modal.scss'

interface PropsInterface {
  children: ReactNode
  display?: boolean
  setDisplay: (value: boolean) => void
}

export default function Modal({
  display = true,
  children,
  setDisplay
}: PropsInterface) {
  const clickOverlay = () => {
    setDisplay(false)
  }

  const clickCard = (event: MouseEvent) => {
    event.stopPropagation()
  }

  return (
    <div className="Modal">
      <CSSTransition
        in={display}
        timeout={display ? 80 : 0}
        classNames="Modal-transition"
        unmountOnExit
      >
        <div className="Modal-overlay" onClick={clickOverlay}>
          <div className="Modal-card" onClick={clickCard}>
            {children}
          </div>
        </div>
      </CSSTransition>
    </div>
  )
}
