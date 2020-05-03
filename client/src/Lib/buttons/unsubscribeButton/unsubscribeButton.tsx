import React from 'react'
import PersonIcon from '@material-ui/icons/Person'
import CheckIcon from '@material-ui/icons/Check'

import Loader from 'Lib/loader/loader'
import './unsubscribeButton.scss'

interface PropsInterface {
  loading: boolean
  onClick: () => void
}

export default function UnsubscribeButton({
  loading,
  onClick: clickButton
}: PropsInterface) {
  return (
    <div className="UnsubscribeButton" data-test="unsubscribe-button">
      <div className="UnsubscribeButton-buttonContainer" onClick={clickButton}>
        <PersonIcon fontSize="small" />
        <span className="UnsubscribeButton-checkIconContainer">
          <CheckIcon fontSize="inherit" />
        </span>
        <Loader display={loading} button />
      </div>
    </div>
  )
}
