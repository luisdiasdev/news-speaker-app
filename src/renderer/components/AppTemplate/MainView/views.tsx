import AddFeed from '@components/Content/AddFeed'
import EditFeed from '@components/Content/EditFeed'
import Home from '@components/Content/Home'
import Player from '@components/Content/Player'
import ShowFeed from '@components/Content/ShowFeed'
import { useView } from '@context/ViewContext'
import React from 'react'

export const CurrentView: React.FC = () => {
  const { currentView, args } = useView()

  return (
    <>
      {currentView === 'Home' && <Home />}
      {currentView === 'AddFeed' && <AddFeed {...args} />}
      {currentView === 'EditFeed' && <EditFeed {...args} />}
      {currentView === 'Player' && <Player {...args} />}
      {currentView === 'ShowFeed' && <ShowFeed {...args} />}
    </>
  )
}
