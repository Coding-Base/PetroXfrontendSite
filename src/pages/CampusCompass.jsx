// src/pages/CampusCompass.jsx
import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar, FaSearch, FaPlus, FaTimes } from 'react-icons/fa';
import { 
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
  InfoWindow
} from '@react-google-maps/api';

// Get API key from environment variables
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// FUTO-specific data
const futoLocations = [
  {
    id: 'main-gate',
    name: 'Main Gate',
    position: { lat: 5.3835, lng: 7.0378 },
    category: 'Landmarks',
    description: 'Main entrance to the university',
    hours: '24/7',
    popularTimes: ['7-9am: Very Busy', '4-6pm: Busy']
  },
  {
    id: 'vc-office',
    name: "Vice Chancellor's Office",
    position: { lat: 5.3860, lng: 7.0335 },
    category: 'Administration',
    description: 'Office of the Vice Chancellor',
    hours: 'Mon-Fri: 8am-4pm',
    popularTimes: ['10am-12pm: Busy']
  },
  {
    id: 'eng-building',
    name: 'Engineering Complex',
    position: { lat: 5.3895, lng: 7.0382 },
    category: 'Academic',
    description: 'Faculty of Engineering buildings',
    hours: 'Mon-Fri: 8am-6pm',
    floorPlan: '/futo/engineering-complex-floorplan.jpg',
    indoorMaps: [
      {
        level: 'Ground Floor',
        image: '/futo/engineering-ground-floor.jpg'
      },
      {
        level: 'First Floor',
        image: '/futo/engineering-first-floor.jpg'
      }
    ]
  },
  {
    id: 'science-lab',
    name: 'Science Laboratory Complex',
    position: { lat: 5.3880, lng: 7.0390 },
    category: 'Academic',
    description: 'Main science laboratories',
    hours: 'Mon-Fri: 8am-6pm'
  },
  {
    id: 'library',
    name: 'University Library',
    position: { lat: 5.3878, lng: 7.0372 },
    category: 'Academic',
    description: 'Main academic library',
    hours: 'Mon-Fri: 8am-8pm, Sat: 9am-4pm',
    popularTimes: ['10am-12pm: Very Busy', '4-6pm: Busy']
  },
  {
    id: 'cafeteria',
    name: 'Main Cafeteria',
    position: { lat: 5.3865, lng: 7.0358 },
    category: 'Services',
    description: 'Main student dining hall',
    hours: 'Daily: 7am-8pm',
    popularTimes: ['12-1pm: Very Busy', '5-6pm: Busy']
  },
  {
    id: 'medical-center',
    name: 'Medical Center',
    position: { lat: 5.3850, lng: 7.0365 },
    category: 'Services',
    description: 'University health center',
    hours: '24/7 Emergency, Mon-Fri: 8am-6pm'
  },
  {
    id: 'ict-center',
    name: 'ICT Center',
    position: { lat: 5.3881, lng: 7.0345 },
    category: 'Services',
    description: 'Information Technology Services',
    hours: 'Mon-Fri: 8am-6pm',
    popularTimes: ['9-11am: Very Busy', '3-5pm: Busy']
  },
  {
    id: 'sports-complex',
    name: 'Sports Complex',
    position: { lat: 5.3901, lng: 7.0327 },
    category: 'Recreation',
    description: 'Sports facilities and fields',
    hours: 'Mon-Sat: 6am-8pm',
    popularTimes: ['4-6pm: Very Busy']
  }
];

const universities = [
  {
    id: 'futo',
    name: 'Federal University of Technology Owerri (FUTO)',
    location: { lat: 5.3875, lng: 7.0353 },
    locations: futoLocations
  },
  {
    id: 'unilag',
    name: 'University of Lagos',
    location: { lat: 6.5244, lng: 3.3792 },
    locations: [
      {
        id: 'main-auditorium',
        name: 'J.F. Ade-Ajayi Auditorium',
        position: { lat: 6.5240, lng: 3.3785 },
        category: 'Lecture Halls',
        description: 'Main university auditorium',
        hours: 'Mon-Fri: 8am-6pm'
      }
    ]
  }
];

// Floor Plan Component for Indoor Maps
const FloorPlan = ({ indoorMaps }) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  
  return (
    <div className="mt-3">
      <h4 className="font-medium mb-1">Indoor Maps:</h4>
      <div className="flex gap-2 mb-2">
        {indoorMaps.map((map, index) => (
          <button
            key={index}
            className={`px-2 py-1 text-xs rounded ${
              currentLevel === index
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200'
            }`}
            onClick={() => setCurrentLevel(index)}
          >
            {map.level}
          </button>
        ))}
      </div>
      <img 
        src={indoorMaps[currentLevel].image} 
        alt={indoorMaps[currentLevel].level}
        className="w-full rounded border"
      />
    </div>
  );
};

const CampusCompass = () => {
  const [selectedUniversity, setSelectedUniversity] = useState('futo');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [newLocation, setNewLocation] = useState({
    name: '',
    category: '',
    description: '',
    hours: '',
    floorPlan: ''
  });

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to FUTO position if location access denied
          setUserPosition({ lat: 5.3875, lng: 7.0353 });
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      // Default to FUTO position if geolocation not supported
      setUserPosition({ lat: 5.3875, lng: 7.0353 });
    }
  }, []);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('campusCompassFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('campusCompassFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Update categories when university changes
  useEffect(() => {
    if (selectedUniversity) {
      const uni = universities.find(u => u.id === selectedUniversity);
      const uniqueCategories = [...new Set(uni.locations.map(loc => loc.category))];
      setCategories(uniqueCategories);
      setLocations(uni.locations);
      setSelectedCategory('');
      setSelectedLocation(null);
      setSearchQuery('');
    }
  }, [selectedUniversity]);

  // Filter locations by category
  useEffect(() => {
    if (selectedUniversity && selectedCategory) {
      const uni = universities.find(u => u.id === selectedUniversity);
      setLocations(uni.locations.filter(loc => 
        loc.category === selectedCategory
      ));
    }
  }, [selectedCategory, selectedUniversity]);

  // Filter locations by search query
  useEffect(() => {
    if (selectedUniversity && searchQuery) {
      const uni = universities.find(u => u.id === selectedUniversity);
      const filtered = uni.locations.filter(loc => 
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setLocations(filtered);
    }
  }, [searchQuery, selectedUniversity]);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    
    if (userPosition && window.google && window.google.maps) {
      setIsLoading(true);
      
      setTimeout(() => {
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
          {
            origin: userPosition,
            destination: location.position,
            travelMode: window.google.maps.TravelMode.WALKING
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              setDirections(result);
            } else {
              console.error(`Directions request failed: ${status}`);
            }
            setIsLoading(false);
          }
        );
      }, 500);
    }
  };

  const toggleFavorite = (locationId, e) => {
    e.stopPropagation();
    if (favorites.includes(locationId)) {
      setFavorites(favorites.filter(id => id !== locationId));
    } else {
      setFavorites([...favorites, locationId]);
    }
  };

  const handleAddLocation = () => {
    if (!newLocation.name || !newLocation.category) return;
    
    const newLoc = {
      ...newLocation,
      id: `custom-${Date.now()}`,
      position: { lat: 5.3875, lng: 7.0353 }, // Default position
      popularTimes: [],
      addedBy: "User"
    };
    
    const updatedLocations = [...locations, newLoc];
    setLocations(updatedLocations);
    
    // Update the university locations (in a real app, this would be sent to a server)
    const uniIndex = universities.findIndex(u => u.id === selectedUniversity);
    if (uniIndex !== -1) {
      universities[uniIndex].locations = updatedLocations;
    }
    
    setNewLocation({
      name: '',
      category: '',
      description: '',
      hours: '',
      floorPlan: ''
    });
    setShowAddLocation(false);
  };

  const getCenter = () => {
    if (selectedUniversity) {
      return universities.find(u => u.id === selectedUniversity).location;
    }
    return { lat: 5.3875, lng: 7.0353 }; // Default to FUTO
  };

  const containerStyle = {
    width: '100%',
    height: '70vh',
    minHeight: '400px'
  };

  // Safe marker icon definition
  const getMarkerIcon = (category) => {
    if (!window.google || !window.google.maps) return null;
    
    return {
      url: `https://maps.google.com/mapfiles/ms/icons/${
        category === 'Lecture Halls' ? 'blue' : 
        category === 'Administration' ? 'red' : 
        category === 'Services' ? 'green' : 'orange'
      }-dot.png`,
      scaledSize: new window.google.maps.Size(32, 32)
    };
  };

  return (
    <div className="flex flex-col h-full p-4 md:p-6 bg-gray-50">
      <div className="mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Campus Compass</h1>
        <p className="text-gray-600">Navigate FUTO Owerri and other campuses with ease</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-4 flex-shrink-0">
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1">Select University</label>
          <select
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            {universities.map(uni => (
              <option key={uni.id} value={uni.id}>{uni.name}</option>
            ))}
          </select>
        </div>
        
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1">Search Locations</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg pl-10 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row flex-1 gap-4">
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-4 overflow-y-auto h-[70vh] md:h-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {selectedCategory ? `${selectedCategory} (${locations.length})` : 'All Locations'}
            </h2>
            <button 
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
              onClick={() => setShowAddLocation(!showAddLocation)}
            >
              <FaPlus className="mr-1" />
              Add Location
            </button>
          </div>
          
          {showAddLocation && (
            <div className="mb-4 p-3 border rounded-lg bg-blue-50">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Add New Location</h3>
                <button onClick={() => setShowAddLocation(false)}>
                  <FaTimes className="text-gray-500 hover:text-gray-700" />
                </button>
              </div>
              <input
                type="text"
                placeholder="Location Name"
                value={newLocation.name}
                onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <select
                value={newLocation.category}
                onChange={(e) => setNewLocation({...newLocation, category: e.target.value})}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <textarea
                placeholder="Description"
                value={newLocation.description}
                onChange={(e) => setNewLocation({...newLocation, description: e.target.value})}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
                rows="2"
              />
              <div className="flex gap-2">
                <button 
                  className="flex-1 bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700"
                  onClick={handleAddLocation}
                >
                  Add
                </button>
                <button 
                  className="flex-1 bg-gray-200 py-2 px-3 rounded hover:bg-gray-300"
                  onClick={() => setShowAddLocation(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mb-4">
            <button 
              className={`px-3 py-1 text-sm rounded flex items-center ${favorites.length > 0 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}`}
              onClick={() => {
                if (favorites.length > 0) {
                  const favLocations = locations.filter(loc => favorites.includes(loc.id));
                  setLocations(favLocations);
                }
              }}
            >
              <FaStar className="mr-1" />
              Favorites ({favorites.length})
            </button>
            <button 
              className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
                const uni = universities.find(u => u.id === selectedUniversity);
                setLocations(uni.locations);
              }}
            >
              Reset Filters
            </button>
          </div>
          
          {locations.length > 0 ? (
            <div className="space-y-3">
              {locations.map(location => (
                <div 
                  key={location.id}
                  className={`p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 relative transition-all ${
                    selectedLocation?.id === location.id ? 'bg-blue-100 border-blue-500' : ''
                  }`}
                  onClick={() => handleLocationSelect(location)}
                >
                  <button 
                    className="absolute top-3 right-3 text-amber-400 hover:text-amber-600"
                    onClick={(e) => toggleFavorite(location.id, e)}
                  >
                    {favorites.includes(location.id) ? (
                      <FaStar className="text-amber-500" />
                    ) : (
                      <FaRegStar />
                    )}
                  </button>
                  
                  <h3 className="font-medium text-gray-800">{location.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{location.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {location.category}
                    </span>
                    {location.hours && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {location.hours.split(',')[0]}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchQuery ? 'No locations match your search' : 'No locations found in this category'}
              </p>
            </div>
          )}
        </div>
        
        <div className="w-full md:w-2/3 bg-white rounded-lg shadow-md overflow-hidden">
          {loadError ? (
            <div className="h-full flex flex-col items-center justify-center bg-red-50 p-4">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h3 className="text-lg font-bold mb-2">Map Loading Error</h3>
              <p className="text-center mb-4">
                Failed to load Google Maps. Please check your API key and network connection.
              </p>
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => window.location.reload()}
              >
                Reload Page
              </button>
            </div>
          ) : !isLoaded ? (
            <div className="h-full flex items-center justify-center bg-gray-100">Loading Google Maps...</div>
          ) : (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={getCenter()}
                zoom={16}
                options={{
                  streetViewControl: true,
                  mapTypeControl: false,
                  fullscreenControl: true,
                  styles: [
                    {
                      "featureType": "poi",
                      "elementType": "labels",
                      "stylers": [{ "visibility": "off" }]
                    },
                    {
                      "featureType": "transit",
                      "elementType": "labels",
                      "stylers": [{ "visibility": "off" }]
                    },
                    {
                      "elementType": "geometry",
                      "stylers": [{ "color": "#f5f5f5" }]
                    },
                    {
                      "elementType": "labels.icon",
                      "stylers": [{ "visibility": "off" }]
                    }
                  ],
                  backgroundColor: '#f0f0f0'
                }}
              >
                {/* User Location Marker */}
                {userPosition && (
                  <Marker 
                    position={userPosition}
                    icon={window.google?.maps ? {
                      path: window.google.maps.SymbolPath.CIRCLE,
                      scale: 8,
                      fillColor: "#4285F4",
                      fillOpacity: 1,
                      strokeColor: "#FFFFFF",
                      strokeWeight: 2
                    } : undefined}
                  >
                    {window.google?.maps && (
                      <InfoWindow>
                        <div className="p-2">
                          <h3 className="font-bold">Your Location</h3>
                          <p className="text-sm">You are here</p>
                        </div>
                      </InfoWindow>
                    )}
                  </Marker>
                )}
                
                {/* University Locations */}
                {locations.map(location => (
                  <Marker
                    key={location.id}
                    position={location.position}
                    onClick={() => handleLocationSelect(location)}
                    icon={getMarkerIcon(location.category)}
                  />
                ))}
                
                {/* Selected Location Info */}
                {selectedLocation && window.google?.maps && (
                  <InfoWindow
                    position={selectedLocation.position}
                    onCloseClick={() => setSelectedLocation(null)}
                  >
                    <div className="p-2 max-w-xs">
                      <h3 className="font-bold text-lg text-gray-800">{selectedLocation.name}</h3>
                      <p className="text-gray-700 mb-2">{selectedLocation.description}</p>
                      
                      <div className="mb-2">
                        <p className="font-medium text-sm">Hours:</p>
                        <p className="text-sm">{selectedLocation.hours || 'Not specified'}</p>
                      </div>
                      
                      {selectedLocation.popularTimes && (
                        <div className="mb-2">
                          <p className="font-medium text-sm">Popular Times:</p>
                          <div className="space-y-1 mt-1">
                            {selectedLocation.popularTimes.map((time, i) => (
                              <div key={i} className="flex items-center">
                                <div className={`w-3 h-3 rounded-full mr-2 ${
                                  time.includes('Busy') ? 'bg-red-500' : 
                                  time.includes('Moderate') ? 'bg-yellow-500' : 'bg-green-500'
                                }`}></div>
                                <span className="text-sm">{time}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {selectedLocation.floorPlan && (
                        <div className="mb-2">
                          <p className="font-medium text-sm">Floor Plan:</p>
                          <a 
                            href={selectedLocation.floorPlan} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-blue-600 text-sm hover:underline"
                          >
                            View Map
                          </a>
                        </div>
                      )}
                      
                      {selectedLocation.indoorMaps && (
                        <FloorPlan indoorMaps={selectedLocation.indoorMaps} />
                      )}
                      
                      {selectedLocation.addedBy && (
                        <p className="text-xs text-gray-500 mt-2">
                          Added by: {selectedLocation.addedBy}
                        </p>
                      )}
                      
                      <button 
                        className="mt-2 text-blue-600 hover:underline text-sm"
                        onClick={() => handleLocationSelect(selectedLocation)}
                      >
                        Get Directions
                      </button>
                    </div>
                  </InfoWindow>
                )}
                
                {/* Directions */}
                {directions && window.google?.maps && (
                  <DirectionsRenderer directions={directions} />
                )}
              </GoogleMap>
          )}
          
          <div className="p-4 border-t bg-gray-50">
            <h3 className="font-medium mb-2 text-sm">Legend:</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm">Lecture Halls</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm">Administration</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm">Services</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
                <span className="text-sm">Recreation</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-sm">Landmarks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500 mr-3"></div>
            <p className="text-lg">Calculating directions...</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default CampusCompass;