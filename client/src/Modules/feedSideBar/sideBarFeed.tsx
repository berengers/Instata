import React, { useContext } from 'react'
import { UserContext } from 'Services/context/userContext'

import AvatarButton from 'Lib/buttons/avatarButton/avatarButton'
import './sideBarFeed.scss'

export default function Sidebar() {
  const { profilePicture, username, name } = useContext(UserContext)

  return (
    <div className="SideBarFeed">
      <div className="SideBarFeed-row">
        <AvatarButton
          to={`/${username}`}
          pictureLink={profilePicture}
          pictureLabel={username}
        />
        <div className="SideBarFeed-text">
          <div className="text-bold">{username}</div>
          <div>{name}</div>
        </div>
      </div>
    </div>
  )
}
