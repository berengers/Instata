import React, { useState, useContext, useEffect, FormEvent } from 'react'
import autosize from 'autosize'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

import { UserContext } from 'Services/context/userContext'
import PostDetail from 'Modules/post/postDetails/postDetails'
import Loader from 'Lib/loader/loader'
import './createPost.scss'

const CREATE_POST = gql`
  mutation createPost($postInput: PostInput!) {
    createPost(post: $postInput) {
      id
      media
      description
      user {
        id
        username
      }
    }
  }
`

export default function CreatePost() {
  const [photoUrl, setPhotoUrl] = useState('')
  const [description, setDescription] = useState('')
  const { username, profilePicture } = useContext(UserContext)
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST)

  useEffect(() => {
    autosize(document.querySelectorAll('textarea'))
  }, [])

  const post = {
    createdAt: new Date(),
    description,
    id: '',
    liked: false,
    likesCount: 0,
    media: photoUrl
  }

  const user = {
    profilePicture: profilePicture || null,
    username
  }

  function handleChange(
    element: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = element.currentTarget

    switch (name) {
      case 'PhotoUrl':
        setPhotoUrl(value)
        break
      case 'Description':
        setDescription(value)
        break
      default:
        throw `This value is not valide: ${name}`
    }
  }

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!description || !photoUrl) {
      // TODO - Add form validation
      return
    }

    const postInput = {
      description,
      media: photoUrl
    }

    try {
      await createPost({ variables: { postInput } })
      setPhotoUrl('')
      setDescription('')
    } catch (error) {
      throw error.message
    }
  }

  return (
    <div className="CreatePost">
      <form className="CreatePost-form" onSubmit={submit}>
        <label>
          Photo URL <small>(use square photo)</small>
        </label>
        <input
          type="text"
          placeholder="Ex: https://picsum.photos/id/203/900/900"
          name="PhotoUrl"
          value={photoUrl}
          data-test="input-media-url"
          onChange={handleChange}
        />

        <label>Photo description</label>
        <textarea
          placeholder="Write a description about your photo"
          name="Description"
          value={description}
          data-test="input-description"
          onChange={handleChange}
        />
        <button
          type="submit"
          data-test="submit-button"
          className="CreatePost-submit"
        >
          Publish
          <Loader display={loading} button />
        </button>
        {data && (
          <p data-test="success-container" className="CreatePost-success">
            Post Created
          </p>
        )}
        {error && (
          <p data-test="error-container" className="CreatePost-error">
            {error.message}
          </p>
        )}
      </form>
      <div className="CreatePost-preview">
        <PostDetail post={post} user={user} />
      </div>
    </div>
  )
}
