import TeacherLayout from '@/components/layouts/TeacherLayout'
import GameLocksPage from '@/components/Teachers/gameLock'
import React from 'react'

export default function index() {
  return (
    <TeacherLayout>
        <GameLocksPage />
    </TeacherLayout>
  )
}
