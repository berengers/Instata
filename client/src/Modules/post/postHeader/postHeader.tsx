import React from 'react'

import AvatarButton from 'Lib/buttons/avatarButton/avatarButton'
import './postHeader.scss'

interface PropsInterface {
  to: string
  pictureLink: string | null
  pictureLabel: string
  username: string
}

function PostHeader({
  pictureLabel,
  pictureLink,
  to,
  username
}: PropsInterface) {
  return (
    <div className="PostHeader">
      <AvatarButton
        to={to}
        pictureLink={pictureLink}
        pictureLabel={pictureLabel}
      />
      <div className="PostHeader-content">
        <strong>{username}</strong>
      </div>
    </div>
  )
}

export default PostHeader
