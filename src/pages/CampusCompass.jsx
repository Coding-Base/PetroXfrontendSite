// src/pages/CampusCompass.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaStar, FaRegStar, FaSearch, FaPlus, FaTimes, FaMap, FaList, FaDirections, FaStop, FaChevronDown, FaChevronUp, FaWalking, FaBicycle, FaCar } from 'react-icons/fa';
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

// Direction Step Component
const DirectionStep = ({ step }) => {
    return (
        <div className="flex items-start py-2 border-b border-gray-100">
            <div className="mr-3 mt-1 text-blue-500">
                {step.maneuver === 'turn-right' && '→'}
                {step.maneuver === 'turn-left' && '←'}
                {step.maneuver === 'straight' && '↑'}
                {step.maneuver === 'merge' && '⇗'}
                {!['turn-right', 'turn-left', 'straight', 'merge'].includes(step.maneuver) && '•'}
            </div>
            <div>
                <div className="font-medium">{step.instructions.replace(/<[^>]+>/g, '')}</div>
                <div className="text-xs text-gray-500">{step.distance.text} • {step.duration.text}</div>
            </div>
        </div>
    );
};

// Travel Mode Selector
const TravelModeSelector = ({ onSelectMode }) => {
    return (
        <div className="flex justify-between space-x-2 mb-4">
            <button 
                onClick={() => onSelectMode('WALKING')}
                className="flex-1 flex flex-col items-center p-3 border rounded-lg hover:bg-blue-50 transition-colors"
            >
                <FaWalking className="text-blue-600 text-xl mb-1" />
                <span>Walk</span>
            </button>
            <button 
                onClick={() => onSelectMode('BICYCLING')}
                className="flex-1 flex flex-col items-center p-3 border rounded-lg hover:bg-blue-50 transition-colors"
            >
                <FaBicycle className="text-blue-600 text-xl mb-1" />
                <span>Bike</span>
            </button>
            <button 
                onClick={() => onSelectMode('DRIVING')}
                className="flex-1 flex flex-col items-center p-3 border rounded-lg hover:bg-blue-50 transition-colors"
            >
                <FaCar className="text-blue-600 text-xl mb-1" />
                <span>Drive</span>
            </button>
        </div>
    );
};

// Bottom Sheet Component for Mobile
const BottomSheet = ({ 
  location, 
  isNavigating, 
  distance, 
  duration,
  travelMode,
  onSelectMode,
  onStartNavigation, 
  onStopNavigation, 
  onClose,
  onToggleExpand,
  isExpanded,
  navigationSteps,
  currentStepIndex
}) => {
  if (!location) return null;
  
  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg z-20 transition-all duration-300 ${
      isExpanded ? 'h-[70vh]' : 'h-[140px]'
    }`}>
      <div className="p-4">
        {/* Drag handle */}
        <div 
          className="flex justify-center mb-2"
          onClick={onToggleExpand}
        >
          <div className="w-12 h-1 bg-gray-300 rounded-full cursor-pointer"></div>
        </div>
        
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{location.name}</h3>
            <p className="text-sm text-gray-600 truncate">{location.description}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        
        {/* Expand/collapse button */}
        <div className="flex justify-center mt-1">
          <button 
            onClick={onToggleExpand}
            className="text-gray-500"
          >
            {isExpanded ? <FaChevronDown /> : <FaChevronUp />}
          </button>
        </div>
        
        {/* Expanded content */}
        {isExpanded && (
          <div className="mt-3 overflow-y-auto h-[calc(70vh-140px)]">
            {!isNavigating && (
              <TravelModeSelector onSelectMode={onSelectMode} />
            )}
            
            {isNavigating && navigationSteps.length > 0 && (
              <div className="mb-4">
                <div className="font-bold text-blue-700 mb-2">Current Step:</div>
                {currentStepIndex >= 0 && currentStepIndex < navigationSteps.length && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <DirectionStep step={navigationSteps[currentStepIndex]} />
                  </div>
                )}
              </div>
            )}
            
            {!isNavigating && (
              <>
                {location.hours && (
                  <p className="text-sm mb-2">
                    <span className="font-medium">Hours:</span> {location.hours}
                  </p>
                )}
                {location.popularTimes && (
                  <div className="mb-2">
                    <p className="font-medium text-sm mb-1">Popular Times:</p>
                    <ul className="text-xs space-y-1">
                      {location.popularTimes.map((t, i) => (
                        <li key={i} className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {location.floorPlan && (
                  <a 
                    href={location.floorPlan} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-block mt-2 text-blue-600 hover:underline text-sm"
                  >
                    View Floor Plan
                  </a>
                )}
                {location.indoorMaps && <FloorPlan indoorMaps={location.indoorMaps} />}
              </>
            )}
            
            {/* Directions list */}
            {isNavigating && navigationSteps.length > 0 && (
              <div className="mt-3">
                <div className="font-bold text-blue-700 mb-2">Full Directions:</div>
                <div className="max-h-40 overflow-y-auto">
                  {navigationSteps.map((step, index) => (
                    <DirectionStep 
                      key={index} 
                      step={step} 
                      isCurrent={index === currentStepIndex}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Navigation controls */}
        <div className="mt-3">
          {isNavigating ? (
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex justify-between text-sm mb-2">
                <span>Distance: {distance}</span>
                <span>Time: {duration}</span>
              </div>
              <button
                onClick={onStopNavigation}
                className="w-full flex items-center justify-center bg-red-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-red-700 transition-colors"
              >
                <FaStop className="mr-2" /> Stop Navigation
              </button>
            </div>
          ) : (
            <button
              onClick={onStartNavigation}
              className="w-full flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              <FaDirections className="mr-2" /> Start Navigation
            </button>
          )}
        </div>
      </div>
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
    const [isNavigating, setIsNavigating] = useState(false);
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [activeDestination, setActiveDestination] = useState(null);
    const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);
    const [travelMode, setTravelMode] = useState('WALKING');
    const [navigationSteps, setNavigationSteps] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [nextInstruction, setNextInstruction] = useState('');
    const directionsServiceRef = useRef(null);
    const mapRef = useRef(null);
    const watchIdRef = useRef(null);
    const speechSynthesisRef = useRef(null);

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
        
        // Cleanup on unmount
        return () => {
            if (watchIdRef.current) {
                navigator.geolocation.clearWatch(watchIdRef.current);
            }
            if (speechSynthesisRef.current) {
                window.speechSynthesis.cancel();
            }
        };
    }, [getCenter]);

    // Start real-time position tracking during navigation
    const startPositionTracking = useCallback(() => {
        if (navigator.geolocation) {
            watchIdRef.current = navigator.geolocation.watchPosition(
                (position) => {
                    const newPos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setUserPosition(newPos);
                    
                    // Recalculate route when position changes
                    if (activeDestination && isNavigating) {
                        calculateRoute(newPos, activeDestination.position);
                    }
                    
                    // Update current step based on position
                    if (directions && directions.routes[0] && directions.routes[0].legs[0]) {
                        const leg = directions.routes[0].legs[0];
                        const steps = leg.steps;
                        
                        // Find the closest step to the user's current position
                        let closestStepIndex = 0;
                        let minDistance = Number.MAX_VALUE;
                        
                        steps.forEach((step, index) => {
                            const stepStart = step.start_location;
                            const stepEnd = step.end_location;
                            
                            // Calculate distance to step start and end
                            const d1 = Math.sqrt(
                                Math.pow(stepStart.lat() - newPos.lat, 2) +
                                Math.pow(stepStart.lng() - newPos.lng, 2)
                            );
                            
                            const d2 = Math.sqrt(
                                Math.pow(stepEnd.lat() - newPos.lat, 2) +
                                Math.pow(stepEnd.lng() - newPos.lng, 2)
                            );
                            
                            const stepDistance = Math.min(d1, d2);
                            
                            if (stepDistance < minDistance) {
                                minDistance = stepDistance;
                                closestStepIndex = index;
                            }
                        });
                        
                        if (closestStepIndex !== currentStepIndex) {
                            setCurrentStepIndex(closestStepIndex);
                            
                            // Announce next instruction
                            if (closestStepIndex < steps.length - 1) {
                                const nextStep = steps[closestStepIndex + 1];
                                const instruction = nextStep.instructions.replace(/<[^>]+>/g, '');
                                setNextInstruction(instruction);
                                
                                // Use text-to-speech for navigation instructions
                                if ('speechSynthesis' in window) {
                                    window.speechSynthesis.cancel();
                                    const utterance = new SpeechSynthesisUtterance(instruction);
                                    speechSynthesisRef.current = utterance;
                                    window.speechSynthesis.speak(utterance);
                                }
                            }
                        }
                    }
                },
                (error) => {
                    console.error("Error watching position:", error);
                },
                { 
                    enableHighAccuracy: true, 
                    timeout: 5000, 
                    maximumAge: 0 
                }
            );
        }
    }, [activeDestination, isNavigating, directions, currentStepIndex]);

    // Stop real-time position tracking
    const stopPositionTracking = useCallback(() => {
        if (watchIdRef.current) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
        }
        if (speechSynthesisRef.current) {
            window.speechSynthesis.cancel();
        }
    }, []);

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
            setIsNavigating(false);
            setActiveDestination(null);
            stopPositionTracking();
        }
    }, [selectedUniversity, stopPositionTracking]);

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

    // Calculate route with distance and duration
    const calculateRoute = useCallback((origin, destination) => {
        if (!window.google) return;
        
        setIsLoading(true);
        
        // Initialize directions service
        if (!directionsServiceRef.current) {
            directionsServiceRef.current = new window.google.maps.DirectionsService();
        }
        
        if (directionsServiceRef.current) {
            directionsServiceRef.current.route(
                { 
                    origin, 
                    destination, 
                    travelMode: travelMode,
                    provideRouteAlternatives: false
                },
                (res, status) => {
                    if (status === 'OK') {
                        setDirections(res);
                        
                        // Extract distance and duration
                        if (res.routes[0] && res.routes[0].legs[0]) {
                            setDistance(res.routes[0].legs[0].distance.text);
                            setDuration(res.routes[0].legs[0].duration.text);
                            
                            // Extract steps for navigation instructions
                            const steps = [];
                            res.routes[0].legs[0].steps.forEach(step => {
                                steps.push({
                                    instructions: step.instructions,
                                    distance: step.distance,
                                    duration: step.duration,
                                    maneuver: step.maneuver || 'straight'
                                });
                            });
                            setNavigationSteps(steps);
                            setCurrentStepIndex(0);
                        }
                    } else {
                        console.error('Directions request failed:', status);
                    }
                    setIsLoading(false);
                }
            );
        } else {
            setIsLoading(false);
        }
    }, [travelMode]);

    // Handle location selection
    const handleLocationSelect = useCallback((loc) => {
        setSelectedLocation(loc);
        setIsBottomSheetExpanded(false);
        
        // If we're already navigating to this location, keep it active
        if (isNavigating && activeDestination?.id === loc.id) {
            return;
        }
        
        // Otherwise, reset navigation state
        setIsNavigating(false);
        setDirections(null);
        setActiveDestination(null);
        stopPositionTracking();
    }, [isNavigating, activeDestination, stopPositionTracking]);

    // Start navigation
    const startNavigation = useCallback(() => {
        if (selectedLocation && userPosition) {
            setIsNavigating(true);
            setActiveDestination(selectedLocation);
            calculateRoute(userPosition, selectedLocation.position);
            startPositionTracking();
        }
    }, [selectedLocation, userPosition, calculateRoute, startPositionTracking]);

    // Stop navigation
    const stopNavigation = useCallback(() => {
        setIsNavigating(false);
        setActiveDestination(null);
        setDirections(null);
        setNavigationSteps([]);
        setCurrentStepIndex(0);
        stopPositionTracking();
    }, [stopPositionTracking]);

    // Select travel mode
    const handleSelectTravelMode = useCallback((mode) => {
        setTravelMode(mode);
    }, []);

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

    // Close location details without stopping navigation
    const closeLocationDetails = useCallback(() => {
        setSelectedLocation(null);
        setIsBottomSheetExpanded(false);
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
                            onClick={() => { 
                                setSelectedCategory(''); 
                                setSearchQuery('');
                                setSelectedLocation(null);
                                stopNavigation();
                            }}
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
                            ]
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
                                {!isMobile && (
                                  <InfoWindow position={userPosition}>
                                      <div className="font-medium text-blue-700">Your Location</div>
                                  </InfoWindow>
                                )}
                            </>
                        )}

                        {/* Destination marker */}
                        {activeDestination && (
                            <Marker 
                                position={activeDestination.position} 
                                icon={{
                                    url: `https://maps.google.com/mapfiles/ms/icons/red-dot.png`
                                }}
                            />
                        )}

                        {/* Directions */}
                        {directions && <DirectionsRenderer 
                            directions={directions}
                            options={{
                                polylineOptions: {
                                    strokeColor: '#4285F4',
                                    strokeOpacity: 0.8,
                                    strokeWeight: 6
                                },
                                suppressMarkers: true
                            }}
                        />}
                    </GoogleMap>
                </LoadScript>

                {/* Navigation Header */}
                {isNavigating && activeDestination && (
                    <div className="absolute top-4 left-0 right-0 mx-auto bg-white p-3 rounded-lg shadow-lg max-w-md z-10">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="font-bold text-blue-700">Navigating to {activeDestination.name}</div>
                                <div className="text-sm text-gray-600">
                                    {distance} • {duration} • {travelMode === 'WALKING' ? 'Walking' : 
                                      travelMode === 'BICYCLING' ? 'Biking' : 'Driving'}
                                </div>
                            </div>
                            <button 
                                onClick={stopNavigation}
                                className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                            >
                                <FaStop />
                            </button>
                        </div>
                        
                        {/* Next instruction */}
                        {nextInstruction && (
                            <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                                <div className="font-medium">Next:</div>
                                <div className="text-sm">{nextInstruction}</div>
                            </div>
                        )}
                    </div>
                )}

                {/* Mobile Bottom Sheet */}
                {isMobile && selectedLocation && (
                    <BottomSheet 
                        location={selectedLocation}
                        isNavigating={isNavigating && activeDestination?.id === selectedLocation.id}
                        distance={distance}
                        duration={duration}
                        travelMode={travelMode}
                        onSelectMode={handleSelectTravelMode}
                        onStartNavigation={startNavigation}
                        onStopNavigation={stopNavigation}
                        onClose={closeLocationDetails}
                        onToggleExpand={() => setIsBottomSheetExpanded(!isBottomSheetExpanded)}
                        isExpanded={isBottomSheetExpanded}
                        navigationSteps={navigationSteps}
                        currentStepIndex={currentStepIndex}
                    />
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
                {isMobile && showMap && !selectedLocation && (
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