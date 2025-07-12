
// src/pages/CampusCompass.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FaStar, FaRegStar, FaSearch, FaPlus, FaTimes, FaMap, FaList, FaDirections } from 'react-icons/fa';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer, InfoWindow } from '@react-google-maps/api';

// Get API key from environment variables
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// FUTO-specific data (same as before)

const universities = [
  // Same as before
];

// Floor Plan Component (same as before)

const CampusCompass = () => {
  // Existing state declarations (same as before)
  const [showMap, setShowMap] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef(null);

  // Check if mobile on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setShowMap(true);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Existing useEffect hooks (same as before)

  // Toggle map on mobile
  const toggleView = () => setShowMap(!showMap);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Mobile Navigation Bar */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-xl font-bold text-blue-600">Campus Compass</h1>
        <div className="flex space-x-4">
          <button 
            onClick={toggleView}
            className={`p-2 rounded-full ${!showMap ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
            aria-label={showMap ? "Show list" : "Show map"}
          >
            <FaList size={20} />
          </button>
          <button 
            onClick={toggleView}
            className={`p-2 rounded-full ${showMap ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
            aria-label={showMap ? "Show map" : "Show list"}
          >
            <FaMap size={20} />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`md:w-1/3 w-full bg-white p-4 overflow-y-auto transition-all duration-300 ${
          isMobile && showMap ? 'hidden' : 'block'
        }`}
      >
        <div className="hidden md:block">
          <h1 className="text-2xl font-bold mb-2 text-blue-700">Campus Compass</h1>
        </div>
        
        <div className="space-y-4 mb-4">
          {/* University selector */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">University</label>
            <select
              value={selectedUniversity}
              onChange={e => setSelectedUniversity(e.target.value)}
              className="w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            >
              {universities.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Category selector */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Category</label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            {/* Search */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full p-2.5 pl-10 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                />
                <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Add & Reset */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowAddLocation(show => !show)}
              className="flex-1 flex items-center justify-center p-2.5 border rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <FaPlus className="mr-2" /> Add Location
            </button>
            <button
              onClick={() => { setSelectedCategory(''); setSearchQuery(''); }}
              className="flex-1 p-2.5 border rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Reset
            </button>
          </div>
          
          {/* Add form */}
          {showAddLocation && (
            <div className="p-4 border rounded-lg bg-blue-50 space-y-3 mt-3">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-blue-800">Add New Location</h3>
                <FaTimes 
                  className="cursor-pointer text-gray-500 hover:text-gray-700" 
                  onClick={() => setShowAddLocation(false)} 
                />
              </div>
              <input 
                type="text" 
                placeholder="Location Name" 
                value={newLocation.name}
                onChange={e => setNewLocation({ ...newLocation, name: e.target.value })}
                className="w-full p-2.5 border rounded-lg focus:ring-blue-500 focus:border-blue-500" 
              />
              <input 
                type="text" 
                placeholder="Category" 
                value={newLocation.category}
                onChange={e => setNewLocation({ ...newLocation, category: e.target.value })}
                className="w-full p-2.5 border rounded-lg focus:ring-blue-500 focus:border-blue-500" 
              />
              <textarea 
                placeholder="Description" 
                value={newLocation.description}
                onChange={e => setNewLocation({ ...newLocation, description: e.target.value })}
                className="w-full p-2.5 border rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                rows="2" 
              />
              <input 
                type="text" 
                placeholder="Opening Hours" 
                value={newLocation.hours}
                onChange={e => setNewLocation({ ...newLocation, hours: e.target.value })}
                className="w-full p-2.5 border rounded-lg focus:ring-blue-500 focus:border-blue-500" 
              />
              <input 
                type="text" 
                placeholder="Floor Plan URL" 
                value={newLocation.floorPlan}
                onChange={e => setNewLocation({ ...newLocation, floorPlan: e.target.value })}
                className="w-full p-2.5 border rounded-lg focus:ring-blue-500 focus:border-blue-500" 
              />
              <button 
                onClick={handleAddLocation}
                className="w-full bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Location
              </button>
            </div>
          )}
        </div>
        
        {/* Location list */}
        <div className="space-y-3">
          {locations.map(loc => (
            <div
              key={loc.id}
              onClick={() => {
                handleLocationSelect(loc);
                if (isMobile) setShowMap(true);
              }}
              className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                selectedLocation?.id === loc.id 
                  ? 'bg-blue-50 border-blue-500 shadow-sm' 
                  : 'bg-white'
              }`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-800">{loc.name}</h3>
                <button 
                  onClick={e => toggleFavorite(loc.id, e)}
                  className="text-yellow-500 hover:text-yellow-600"
                >
                  {favorites.includes(loc.id) ? <FaStar /> : <FaRegStar />}
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">{loc.description}</p>
              <div className="flex items-center mt-2">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  {loc.category}
                </span>
                {selectedLocation?.id === loc.id && (
                  <FaDirections className="ml-2 text-blue-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div 
        className={`md:w-2/3 w-full relative ${
          isMobile && !showMap ? 'hidden' : 'block'
        }`}
      >
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={getCenter()}
            zoom={16}
            options={{
              streetViewControl: true,
              mapTypeControl: false,
              fullscreenControl: true,
              styles: [
                {
                  featureType: "poi",
                  elementType: "labels",
                  stylers: [{ visibility: "off" }]
                },
                {
                  featureType: "transit",
                  elementType: "labels",
                  stylers: [{ visibility: "off" }]
                }
              ]
            }}
          >
            {/* User marker */}
            {userPosition && (
              <>
                <Marker
                  position={userPosition}
                  icon={{
                    path: window.google?.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: '#4285F4',
                    fillOpacity: 1,
                    strokeColor: '#fff',
                    strokeWeight: 2
                  }}
                />
                <InfoWindow position={userPosition}>
                  <div className="font-medium text-blue-700">Your Location</div>
                </InfoWindow>
              </>
            )}

            {/* Campus markers and InfoWindows */}
            {locations.map(loc => (
              <React.Fragment key={loc.id}>
                <Marker 
                  position={loc.position} 
                  onClick={() => handleLocationSelect(loc)}
                  icon={{
                    url: `https://maps.google.com/mapfiles/ms/icons/${favorites.includes(loc.id) ? 'yellow' : 'blue'}-dot.png`
                  }}
                />
                {selectedLocation?.id === loc.id && (
                  <InfoWindow 
                    position={loc.position} 
                    onCloseClick={() => setSelectedLocation(null)}
                  >
                    <div className="max-w-xs">
                      <h3 className="font-bold text-blue-700 mb-1">{loc.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{loc.description}</p>
                      {loc.hours && (
                        <p className="text-sm mb-1">
                          <span className="font-medium">Hours:</span> {loc.hours}
                        </p>
                      )}
                      {loc.popularTimes && (
                        <div className="mt-2">
                          <p className="font-medium text-sm mb-1">Popular Times:</p>
                          <ul className="text-xs space-y-1">
                            {loc.popularTimes.map((t, i) => (
                              <li key={i} className="flex items-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {loc.floorPlan && (
                        <a 
                          href={loc.floorPlan} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="inline-block mt-2 text-blue-600 hover:underline text-sm"
                        >
                          View Floor Plan
                        </a>
                      )}
                      {loc.indoorMaps && <FloorPlan indoorMaps={loc.indoorMaps} />}
                      {userPosition && (
                        <button
                          onClick={() => handleLocationSelect(loc)}
                          className="mt-3 w-full flex items-center justify-center bg-blue-600 text-white py-1.5 px-3 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                        >
                          <FaDirections className="mr-2" /> Get Directions
                        </button>
                      )}
                    </div>
                  </InfoWindow>
                )}
              </React.Fragment>
            ))}

            {/* Directions */}
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </LoadScript>

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg flex items-center shadow-lg">
              <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full mr-3"></div>
              <span className="text-gray-700">Calculating route...</span>
            </div>
          </div>
        )}

        {/* Mobile view toggle button */}
        {isMobile && showMap && (
          <button
            onClick={() => setShowMap(false)}
            className="absolute top-4 left-4 bg-white p-3 rounded-full shadow-md z-10 text-blue-600 hover:bg-gray-50"
            aria-label="Show list"
          >
            <FaList size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CampusCompass;