// src/pages/CampusCompass.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaStar, FaRegStar, FaSearch, FaPlus, FaTimes, FaMap, FaList, FaDirections } from 'react-icons/fa';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer, InfoWindow } from '@react-google-maps/api';

// Get API key from environment variables
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// FUTO-specific data
const futoLocations = [
    { id: 'main-gate', name: 'Main Gate', position: { lat: 5.3835, lng: 7.0378 }, category: 'Landmarks', description: 'Main entrance to the university', hours: '24/7', popularTimes: ['7-9am: Very Busy', '4-6pm: Busy'] },
    { id: 'vc-office', name: "Vice Chancellor's Office", position: { lat: 5.3860, lng: 7.0335 }, category: 'Administration', description: 'Office of the Vice Chancellor', hours: 'Mon-Fri: 8am-4pm', popularTimes: ['10am-12pm: Busy'] },
    { id: 'eng-building', name: 'Engineering Complex', position: { lat: 5.3895, lng: 7.0382 }, category: 'Academic', description: 'Faculty of Engineering buildings', hours: 'Mon-Fri: 8am-6pm', floorPlan: '/futo/engineering-complex-floorplan.jpg', indoorMaps: [{ level: 'Ground Floor', image: '/futo/engineering-ground-floor.jpg' }, { level: 'First Floor', image: '/futo/engineering-first-floor.jpg' }] },
    { id: 'science-lab', name: 'Science Laboratory Complex', position: { lat: 5.3880, lng: 7.0390 }, category: 'Academic', description: 'Main science laboratories', hours: 'Mon-Fri: 8am-6pm' },
    { id: 'library', name: 'University Library', position: { lat: 5.3878, lng: 7.0372 }, category: 'Academic', description: 'Main academic library', hours: 'Mon-Fri: 8am-8pm, Sat: 9am-4pm', popularTimes: ['10am-12pm: Very Busy', '4-6pm: Busy'] },
    { id: 'cafeteria', name: 'Main Cafeteria', position: { lat: 5.3865, lng: 7.0358 }, category: 'Services', description: 'Main student dining hall', hours: 'Daily: 7am-8pm', popularTimes: ['12-1pm: Very Busy', '5-6pm: Busy'] },
    { id: 'medical-center', name: 'Medical Center', position: { lat: 5.3850, lng: 7.0365 }, category: 'Services', description: 'University health center', hours: '24/7 Emergency, Mon-Fri: 8am-6pm' },
    { id: 'ict-center', name: 'ICT Center', position: { lat: 5.3881, lng: 7.0345 }, category: 'Services', description: 'Information Technology Services', hours: 'Mon-Fri: 8am-6pm', popularTimes: ['9-11am: Very Busy', '3-5pm: Busy'] },
    { id: 'sports-complex', name: 'Sports Complex', position: { lat: 5.3901, lng: 7.0327 }, category: 'Recreation', description: 'Sports facilities and fields', hours: 'Mon-Sat: 6am-8pm', popularTimes: ['4-6pm: Very Busy'] },
    // New locations
    { id: 'futo-cafe', name: 'FUTO Café', position: { lat: 5.3870, lng: 7.0365 }, category: 'Food & Drink', description: 'Popular student hangout for coffee and light meals', hours: 'Mon-Sun: 8am–10pm', popularTimes: ['3–5pm: Busy', '7–9pm: Busy'] },
    { id: 'sops-theatre', name: 'School of Physical Sciences Theatre', position: { lat: 5.3892, lng: 7.0348 }, category: 'Lecture Halls', description: 'Lecture theatre for Physics, Chemistry, maths seminars', hours: 'Mon-Fri: 8am–6pm', popularTimes: ['10–12pm: Busy', '2–4pm: Moderate'] },
    { id: 'saat-auditorium', name: 'SAAT Auditorium', position: { lat: 5.3900, lng: 7.0339 }, category: 'Lecture Halls', description: 'School of Agriculture & Agricultural Technology auditorium', hours: 'Mon-Fri: 8am–5pm', popularTimes: ['9–11am: Busy'] },
    { id: 'hostel-a', name: 'Hostel A (Male)', position: { lat: 5.3885, lng: 7.0350 }, category: 'Accommodation', description: 'Undergraduate male residence block A', hours: '24/7', popularTimes: ['Evenings: Full'] },
    { id: 'hostel-b', name: 'Hostel B (Male)', position: { lat: 5.3887, lng: 7.0352 }, category: 'Accommodation', description: 'Undergraduate male residence block B', hours: '24/7', popularTimes: ['Evenings: Full'] },
    { id: 'hostel-c', name: 'Hostel C (Female)', position: { lat: 5.3890, lng: 7.0355 }, category: 'Accommodation', description: 'Undergraduate female residence block C', hours: '24/7', popularTimes: ['Evenings: Full'] },
    { id: 'hostel-d', name: 'Hostel D (Female)', position: { lat: 5.3893, lng: 7.0358 }, category: 'Accommodation', description: 'Undergraduate female residence block D', hours: '24/7', popularTimes: ['Evenings: Full'] },
    { id: 'access-bank-futo', name: 'Access Bank (FUTO Branch)', position: { lat: 5.3869, lng: 7.0370 }, category: 'Services', description: 'On‑campus ATM and banking services', hours: 'Mon-Fri: 9am–4pm', popularTimes: ['12–1pm: Very Busy'] },
    { id: 'pmf-hall', name: 'Paul Martins Foundation Hall', position: { lat: 5.3880, lng: 7.0362 }, category: 'Lecture Halls', description: 'Multi‑purpose hall for conferences and lectures', hours: 'Mon-Fri: 8am–6pm', popularTimes: ['10–12pm: Busy', '2–4pm: Moderate'] },
    { id: 'hall-of-mercy', name: 'Hall of Mercy', position: { lat: 5.3876, lng: 7.0344 }, category: 'Administration', description: 'Ceremonial hall for convocations', hours: 'Mon-Fri: 8am–5pm', popularTimes: ['9–11am: Busy'] },
    { id: 'school-of-health-hall', name: 'School of Health Hall', position: { lat: 5.3883, lng: 7.0340 }, category: 'Lecture Halls', description: 'Lecture theatre for health sciences', hours: 'Mon-Fri: 8am–6pm', popularTimes: ['10–12pm: Busy'] },
    { id: 'seet-roundabout', name: 'SEET Roundabout', position: { lat: 5.3872, lng: 7.0368 }, category: 'Landmarks', description: 'Main traffic circle near School of Engineering & Engineering Tech', hours: 'Open area', popularTimes: ['All day'] },
    { id: 'sug-resources', name: 'SUG Resource Centre', position: { lat: 5.3879, lng: 7.0359 }, category: 'Services', description: 'Student Union Government office & resource centre', hours: 'Mon-Fri: 9am–5pm', popularTimes: ['11–1pm: Busy'] }
];

const universities = [
    { id: 'futo', name: 'Federal University of Technology Owerri (FUTO)', location: { lat: 5.3875, lng: 7.0353 }, locations: futoLocations },
    {
        id: 'unilag', name: 'University of Lagos', location: { lat: 6.5244, lng: 3.3792 }, locations: [
            { id: 'main-auditorium', name: 'J.F. Ade-Ajayi Auditorium', position: { lat: 6.5240, lng: 3.3785 }, category: 'Lecture Halls', description: 'Main university auditorium', hours: 'Mon-Fri: 8am-6pm' }
        ]
    },
    {
        id: 'ui', name: 'University of Ibadan', location: { lat: 7.4459, lng: 3.8969 }, locations: [
            { id: 'ui-main-gate', name: 'UI Main Gate', position: { lat: 7.4465, lng: 3.8975 }, category: 'Landmarks', description: 'Main entrance to University of Ibadan', hours: '24/7' }
        ]
    }
];

// Floor Plan Component
const FloorPlan = ({ indoorMaps }) => {
    const [currentLevel, setCurrentLevel] = useState(0);
    return (
        <div className="mt-3">
            <h4 className="font-medium mb-1">Indoor Maps:</h4>
            <div className="flex gap-2 mb-2">
                {indoorMaps.map((map, idx) => (
                    <button
                        key={idx}
                        className={`px-2 py-1 text-xs rounded ${currentLevel === idx ? 'bg-blue-600 text-white' : 'bg-gray-200'
                            }`}
                        onClick={() => setCurrentLevel(idx)}
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
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [showAddLocation, setShowAddLocation] = useState(false);
    const [newLocation, setNewLocation] = useState({ name: '', category: '', description: '', hours: '', floorPlan: '' });
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [userPosition, setUserPosition] = useState(null);
    const [directions, setDirections] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mapPadding, setMapPadding] = useState({ top: 0, right: 0, bottom: 0, left: 0 });
    const directionsServiceRef = useRef(null);
    const mapRef = useRef(null);

    // Get university center safely
    const getCenter = useCallback(() => {
        const uni = universities.find(u => u.id === selectedUniversity);
        return uni ? uni.location : { lat: 5.3875, lng: 7.0353 }; // Default to FUTO
    }, [selectedUniversity]);

    // Check if mobile on resize
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) setShowMap(true);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // User location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                pos => setUserPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                () => setUserPosition(getCenter()),
                { enableHighAccuracy: true, timeout: 5000 }
            );
        } else {
            setUserPosition(getCenter());
        }
    }, [getCenter]);

    // Favorites localStorage
    useEffect(() => {
        const stored = localStorage.getItem('campusCompassFavorites');
        if (stored) setFavorites(JSON.parse(stored));
    }, []);
    useEffect(() => {
        localStorage.setItem('campusCompassFavorites', JSON.stringify(favorites));
    }, [favorites]);

    // On university change
    useEffect(() => {
        const uni = universities.find(u => u.id === selectedUniversity);
        if (uni) {
            setCategories([...new Set(uni.locations.map(l => l.category))]);
            setLocations(uni.locations);
            setSelectedCategory('');
            setSearchQuery('');
            setSelectedLocation(null);
            setDirections(null);
        }
    }, [selectedUniversity]);

    // Filter by category
    useEffect(() => {
        const uni = universities.find(u => u.id === selectedUniversity);
        if (uni) {
            setLocations(
                selectedCategory ? 
                    uni.locations.filter(l => l.category === selectedCategory) : 
                    uni.locations
            );
        }
    }, [selectedCategory, selectedUniversity]);

    // Filter by search
    useEffect(() => {
        const uni = universities.find(u => u.id === selectedUniversity);
        if (uni) {
            setLocations(
                searchQuery ?
                    uni.locations.filter(l =>
                        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        l.description.toLowerCase().includes(searchQuery.toLowerCase())
                    ) :
                    uni.locations
            );
        }
    }, [searchQuery, selectedUniversity]);

    // Update map padding when selected location changes
    useEffect(() => {
        if (isMobile && selectedLocation) {
            setMapPadding({ top: 0, right: 0, bottom: 200, left: 0 }); // Add bottom padding for mobile
        } else {
            setMapPadding({ top: 0, right: 0, bottom: 0, left: 0 }); // Reset padding
        }
    }, [selectedLocation, isMobile]);

    // Handle location selection and directions
    const handleLocationSelect = useCallback((loc) => {
        setSelectedLocation(loc);
        if (userPosition) {
            setIsLoading(true);
            setDirections(null);
            
            // Initialize directions service
            if (!directionsServiceRef.current && window.google) {
                directionsServiceRef.current = new window.google.maps.DirectionsService();
            }
            
            if (directionsServiceRef.current) {
                directionsServiceRef.current.route(
                    { 
                        origin: userPosition, 
                        destination: loc.position, 
                        travelMode: 'WALKING' 
                    },
                    (res, status) => {
                        if (status === 'OK') {
                            setDirections(res);
                        } else {
                            console.error('Directions request failed:', status);
                        }
                        setIsLoading(false);
                    }
                );
            } else {
                setIsLoading(false);
            }
        }
    }, [userPosition]);

    // Calculate directions on button click
    const handleGetDirections = useCallback(() => {
        if (selectedLocation) {
            handleLocationSelect(selectedLocation);
        }
    }, [selectedLocation, handleLocationSelect]);

    const toggleFavorite = (id, e) => {
        e.stopPropagation();
        setFavorites(favs =>
            favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id]
        );
    };

    const handleAddLocation = () => {
        if (!newLocation.name || !newLocation.category) return;
        const loc = {
            ...newLocation,
            id: `custom-${Date.now()}`,
            position: getCenter(),
            popularTimes: [],
            addedBy: 'User'
        };
        const updated = [...locations, loc];
        setLocations(updated);
        
        // Update university data
        const uniIndex = universities.findIndex(u => u.id === selectedUniversity);
        if (uniIndex !== -1) {
            universities[uniIndex].locations = updated;
        }
        
        setNewLocation({ name: '', category: '', description: '', hours: '', floorPlan: '' });
        setShowAddLocation(false);
    };

    const toggleView = () => setShowMap(!showMap);

    // Handle map load event
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
        // Trigger resize event to fix map display issues
        setTimeout(() => {
            if (window.google && mapRef.current) {
                window.google.maps.event.trigger(mapRef.current, 'resize');
            }
        }, 100);
    }, []);

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
                className={`md:w-1/3 w-full bg-white p-4 overflow-y-auto transition-all duration-300 ${
                    isMobile && showMap ? 'hidden' : 'block'
                }`}
                style={isMobile ? { height: 'calc(100vh - 64px)' } : {}}
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
                style={isMobile ? { height: 'calc(100vh - 64px)' } : {}}
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
                            ],
                            padding: mapPadding // Added padding for mobile view
                        }}
                        onLoad={onMapLoad}
                    >
                        {/* User marker */}
                        {userPosition && (
                            <>
                                <Marker
                                    position={userPosition}
                                    icon={{
                                        path: window.google && window.google.maps.SymbolPath.CIRCLE,
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
                                {selectedLocation?.id === loc.id && !isMobile && (
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
                                                    onClick={handleGetDirections}
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

                {/* Mobile Location Card */}
                {isMobile && selectedLocation && (
                    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-2xl p-4 z-10">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-blue-700">{selectedLocation.name}</h3>
                            <button 
                                onClick={() => setSelectedLocation(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{selectedLocation.description}</p>
                        {selectedLocation.hours && (
                            <p className="text-sm mb-1">
                                <span className="font-medium">Hours:</span> {selectedLocation.hours}
                            </p>
                        )}
                        {selectedLocation.popularTimes && (
                            <div className="mt-2">
                                <p className="font-medium text-sm mb-1">Popular Times:</p>
                                <ul className="text-xs space-y-1">
                                    {selectedLocation.popularTimes.map((t, i) => (
                                        <li key={i} className="flex items-center">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {selectedLocation.floorPlan && (
                            <a 
                                href={selectedLocation.floorPlan} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="inline-block mt-2 text-blue-600 hover:underline text-sm"
                            >
                                View Floor Plan
                            </a>
                        )}
                        {selectedLocation.indoorMaps && <FloorPlan indoorMaps={selectedLocation.indoorMaps} />}
                        {userPosition && (
                            <button
                                onClick={handleGetDirections}
                                className="mt-3 w-full flex items-center justify-center bg-blue-600 text-white py-1.5 px-3 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                            >
                                <FaDirections className="mr-2" /> Get Directions
                            </button>
                        )}
                    </div>
                )}

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