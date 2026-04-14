import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import AnnouncementBanner from './components/AnnouncementBanner'
import Home from './pages/Home'
import Shop from './pages/Shop'
import CollectionPage from './pages/CollectionPage'

const App = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  return (
    <div className="bg-white">
      <AnnouncementBanner onVisibilityChange={setIsBannerVisible} />
      <Navbar isBannerVisible={isBannerVisible} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/collection" element={<CollectionPage />} />
      </Routes>
    </div>
  )
}

export default App
