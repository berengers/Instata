import React from 'react'

import './profileHeader.scss'
import { getUser_user as getUserInterface } from 'Pages/profile/types/getUser'
import ProfileHeaderButtons from 'Modules/profile/profilHeaderButtons/profileHeaderButtons'
import AvatarButton from 'Lib/buttons/avatarButton/avatarButton'

function ProfileHeader({ user }: { user: getUserInterface }) {
  return (
    <header className="ProfileHeader">
      <div className="ProfileHeader-profilPictureContainer">
        <AvatarButton
          pictureLink={user.profilePicture}
          to={`/${user.username}`}
          pictureLabel={user.username}
          size={'150px'}
        />
      </div>
      <div className="ProfileHeader-information">
        <div className="ProfileHeader-information-header">
          <div className="ProfileHeader-username">{user.username}</div>
          <ProfileHeaderButtons user={user} />
        </div>

        <div className="ProfileHeader-information-data">
          <div>
            <span className="text-bold">{user.postsCount} </span>
            <span>posts</span>
          </div>
          <div>
            <span className="text-bold">{user.followersCount} </span>
            <span>followers</span>
          </div>
          <div>
            <span className="text-bold">{user.followsCount} </span>
            <span>following</span>
          </div>
        </div>

        <div className="ProfileHeader-information-name text-bold">
          {user.name}
        </div>
        <div className="ProfileHeader-information-description">
          {user.description}
        </div>
      </div>
    </header>
  )
}

export default ProfileHeader
