import React from 'react'

import Loader from 'Lib/loader/loader'
import './subscribeButton.scss'

interface PropsInterface {
  loading?: boolean
  onClick: () => Promise<void>
}

export default function SubscribeButton({
  loading = false,
  onClick: followUser
}: PropsInterface) {
  const clickButton = () => {
    if (loading) return

    followUser()
  }

  return (
    <div className="SubscribeButton" data-test="subscribe-button">
      <div className="SubscribeButton-button" onClick={clickButton}>
        Follow
      </div>
      <Loader display={loading} button />
    </div>
  )
}
