import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetChild } from 'store/parentSlice'

const ParentSignUp7 = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetChild())
  })
  return (
    <div>
        <p className='text-2xl font-medium'>Your child's account has been created successfully!</p>
    </div>
  )
}

export default ParentSignUp7