import React from 'react'

import Modal from 'Lib/modal/modal/modal'
import './userSettingsModal.scss'

interface PropsInterface {
  display: boolean
  logout: () => void
  setDisplay: (value: boolean) => void
}

export default function UserSettingsModal({
  display,
  logout,
  setDisplay
}: PropsInterface) {
  const closeModal = () => setDisplay(false)

  return (
    <div className="UserSettingsModal">
      <Modal display={display} setDisplay={setDisplay}>
        <div className="UserSettingsModal-container">
          <div onClick={logout}>Logout</div>
          <div onClick={closeModal}>Cancel</div>
        </div>
      </Modal>
    </div>
  )
}
