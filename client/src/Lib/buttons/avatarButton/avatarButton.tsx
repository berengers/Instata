import React from 'react'
import { Link } from 'react-router-dom'

import profilePictureDeafult from 'Static/profile-picture-default.png'
import './avatarButton.scss'

interface PropsInterface {
  to: string
  size?: string
  pictureLink?: string | null
  pictureLabel?: string
}

function AvatarButton({
  to,
  size = '32px',
  pictureLink,
  pictureLabel
}: PropsInterface) {
  return (
    <div className="AvatarButton">
      <Link to={to}>
        <div
          className="AvatarButton-imageContainer"
          style={{ width: size, height: size }}
        >
          <img
            src={pictureLink || profilePictureDeafult}
            alt={pictureLabel}
            className="AvatarButton-image"
          />
        </div>
      </Link>
    </div>
  )
}
export default AvatarButton
