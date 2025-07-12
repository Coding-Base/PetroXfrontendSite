// src/pages/CampusCompass.jsx
import React, {
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';
import {
  FaStar,
  FaRegStar,
  FaSearch,
  FaPlus,
  FaTimes,
  FaMap,
  FaList,
  FaDirections
} from 'react-icons/fa';
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
  InfoWindow
} from '@react-google-maps/api';

// your API key (make sure VITE_GOOGLE_MAPS_API_KEY is set in .env)
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// FUTO‑only data (full array from your original file)
const futoLocations = [
  { id: 'main-gate', name: 'Main Gate', position: { lat: 5.3831, lng: 7.0352 }, description: 'Primary entrance to campus', hours: '24/7', popularTimes: ['7-9am: Very Busy', '4-6pm: Busy'] },
  { id: 'vc-office', name: "Vice Chancellor's Office", position: { lat: 5.3870, lng: 7.0348 }, description: 'Administrative head office', hours: 'Mon-Fri: 8am-4pm', popularTimes: ['10am-12pm: Busy'] },
  { id: 'eng-building', name: 'Engineering Complex', position: { lat: 5.3862, lng: 7.0361 }, description: 'Faculty of Engineering', hours: 'Mon-Fri: 8am-6pm', indoorMaps: [{ level: 'Ground', image: '/futo/engineering-ground.jpg' }, { level: 'First', image: '/futo/engineering-first.jpg' }] },
  { id: 'science-lab', name: 'Science Laboratory Complex', position: { lat: 5.3855, lng: 7.0340 }, description: 'Main science labs', hours: 'Mon-Fri: 8am-6pm' },
  { id: 'library', name: 'University Library', position: { lat: 5.3868, lng: 7.0355 }, description: 'Central library', hours: 'Mon-Fri: 8am-4pm', popularTimes: ['10am-12pm: Very Busy', '4-6pm: Busy'] },
  { id: 'cafeteria', name: 'Main Cafeteria', position: { lat: 5.3859, lng: 7.0358 }, description: 'Food court for students', hours: 'Daily: 7am-8pm', popularTimes: ['12-1pm: Very Busy', '5-6pm: Busy'] },
  { id: 'medical-center', name: 'Medical Center', position: { lat: 5.3872, lng: 7.0365 }, description: 'On‑campus health center', hours: '24/7 Emergency, Mon-Fri: 8am-6pm' },
  { id: 'ict-center', name: 'ICT Center', position: { lat: 5.3860, lng: 7.0335 }, description: 'Computer labs & services', hours: 'Mon-Fri: 8am-6pm', popularTimes: ['9-11am: Very Busy', '3-5pm: Busy'] },
  { id: 'sports-complex', name: 'Sports Complex', position: { lat: 5.3848, lng: 7.0360 }, description: 'Athletics & gyms', hours: 'Mon-Sat: 6am-8pm', popularTimes: ['4-6pm: Very Busy'] },
  { id: 'futo-cafe', name: 'FUTO Café', position: { lat: 5.3873, lng: 7.0350 }, description: 'Coffee shop', hours: 'Mon-Sun: 8am–10pm', popularTimes: ['3–5pm: Busy', '7–9pm: Busy'] },
  { id: 'sops-theatre', name: 'School of Physical Sciences Theatre', position: { lat: 5.3852, lng: 7.0346 }, description: 'Lecture theatre', hours: 'Mon-Fri: 8am–6pm', popularTimes: ['10–12pm: Busy', '2–4pm: Moderate'] },
  { id: 'saat-auditorium', name: 'SAAT Auditorium', position: { lat: 5.3865, lng: 7.0352 }, description: 'Auditorium', hours: 'Mon-Fri: 8am–5pm', popularTimes: ['9–11am: Busy'] },
  { id: 'hostel-a', name: 'Hostel A (Male)', position: { lat: 5.3845, lng: 7.0353 }, description: 'Residence block A', hours: '24/7', popularTimes: ['Evenings: Full'] },
  { id: 'hostel-b', name: 'Hostel B (Male)', position: { lat: 5.3842, lng: 7.0357 }, description: 'Residence block B', hours: '24/7', popularTimes: ['Evenings: Full'] },
  { id: 'hostel-c', name: 'Hostel C (Female)', position: { lat: 5.3847, lng: 7.0349 }, description: 'Residence block C', hours: '24/7', popularTimes: ['Evenings: Full'] },
  { id: 'hostel-d', name: 'Hostel D (Female)', position: { lat: 5.3850, lng: 7.0351 }, description: 'Residence block D', hours: '24/7', popularTimes: ['Evenings: Full'] },
  { id: 'access-bank-futo', name: 'Access Bank (FUTO Branch)', position: { lat: 5.3861, lng: 7.0354 }, description: 'On‑campus bank branch', hours: 'Mon-Fri: 9am–4pm', popularTimes: ['12–1pm: Very Busy'] },
  { id: 'pmf-hall', name: 'Paul Martins Foundation Hall', position: { lat: 5.3871, lng: 7.0347 }, description: 'Event hall', hours: 'Mon-Fri: 8am–6pm', popularTimes: ['10–12pm: Busy', '2–4pm: Moderate'] },
  { id: 'hall-of-mercy', name: 'Hall of Mercy', position: { lat: 5.3863, lng: 7.0343 }, description: 'Assembly hall', hours: 'Mon-Fri: 8am–5pm', popularTimes: ['9–11am: Busy'] },
  { id: 'school-of-health-hall', name: 'School of Health Hall', position: { lat: 5.3858, lng: 7.0339 }, description: 'School congregation hall', hours: 'Mon-Fri: 8am–6pm', popularTimes: ['10–12pm: Busy'] },
  { id: 'seet-roundabout', name: 'SEET Roundabout', position: { lat: 5.3854, lng: 7.0345 }, description: 'Junction near Engg. Tech', hours: 'Open area', popularTimes: ['All day'] },
  { id: 'sug-resources', name: 'SUG Resource Centre', position: { lat: 5.3866, lng: 7.0341 }, description: 'Student union services', hours: 'Mon-Fri: 9am–5pm', popularTimes: ['11–1pm: Busy'] }
];

const universities = [
  {
    id: 'futo',
    name: 'Federal University of Technology Owerri',
    location: { lat: 5.3875, lng: 7.0353 },
    locations: futoLocations
  },
  {
    id: 'unilag',
    name: 'University of Lagos',
    location: { lat: 6.5244, lng: 3.3792 },
    locations: [
      // … you can add Unilag locations here …
      {
        id: 'unilag', name: 'University of Lagos', location: { lat: 6.5244, lng: 3.3792 }, locations: [
            { id: 'main-auditorium', name: 'J.F. Ade-Ajayi Auditorium', position: { lat: 6.5240, lng: 3.3785 }, category: 'Lecture Halls', description: 'Main university auditorium', hours: 'Mon-Fri: 8am-6pm' }
        ]
    },
    {
        id: 'ui', name: 'University of Ibadan', location: { lat: 7.4459, lng: 3.8969 }, locations: [
            { id: 'ui-main-gate', name: 'UI Main Gate', position: { lat: 7.4465, lng: 3.8975 }, category: 'Landmarks', description: 'Main entrance to University of Ibadan', hours: '24/7' }
        ]
    },
    ]
  }
];

// Indoor floor‑plan carousel
const FloorPlan = ({ indoorMaps }) => {
  const [level, setLevel] = useState(0);
  return (
    <div className="mt-3">
      <h4 className="font-medium mb-1">Indoor Maps</h4>
      <div className="flex gap-2 mb-2">
        {indoorMaps.map((m, i) => (
          <button
            key={i}
            className={`px-2 py-1 text-xs rounded ${
              level === i ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setLevel(i)}
          >
            {m.level}
          </button>
        ))}
      </div>
      <img
        src={indoorMaps[level].image}
        alt={indoorMaps[level].level}
        className="w-full rounded border"
      />
    </div>
  );
};

export default function CampusCompass() {
  // UI state
  const [uniId, setUniId] = useState('futo');
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [catFilter, setCatFilter] = useState('');
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [adding, setAdding] = useState(false);
  const [newLoc, setNewLoc] = useState({ name: '', category: '', description: '', hours: '', floorPlan: '' });
  const [chosen, setChosen] = useState(null);

  // map & routing
  const [userPos, setUserPos] = useState(null);
  const [directions, setDirections] = useState(null);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const directionsSvc = useRef(null);
  const mapRef = useRef(null);

  // responsive
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showMap, setShowMap] = useState(!isMobile);

  // get campus center
  const getCenter = useCallback(() => {
    const u = universities.find(u => u.id === uniId);
    return u ? u.location : { lat: 5.3875, lng: 7.0353 };
  }, [uniId]);

  // handle resize
  useEffect(() => {
    const onResize = () => {
      const m = window.innerWidth < 768;
      setIsMobile(m);
      setShowMap(!m);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // load favorites from localStorage
  useEffect(() => {
    const f = localStorage.getItem('campusFavs');
    if (f) setFavorites(JSON.parse(f));
  }, []);
  useEffect(() => {
    localStorage.setItem('campusFavs', JSON.stringify(favorites));
  }, [favorites]);

  // update categories & list when uni changes
  useEffect(() => {
    const u = universities.find(u => u.id === uniId);
    if (!u) return;
    setCategories([...new Set(u.locations.map(l => l.category))]);
    setLocations(u.locations);
    setCatFilter('');
    setSearch('');
    setChosen(null);
    setDirections(null);
  }, [uniId]);

  // apply filters
  useEffect(() => {
    const u = universities.find(u => u.id === uniId);
    if (!u) return;
    let arr = u.locations;
    if (catFilter) arr = arr.filter(l => l.category === catFilter);
    if (search) {
      const q = search.toLowerCase();
      arr = arr.filter(l =>
        l.name.toLowerCase().includes(q) ||
        (l.description && l.description.toLowerCase().includes(q))
      );
    }
    setLocations(arr);
  }, [catFilter, search, uniId]);

  // get user position once
  useEffect(() => {
    if (!navigator.geolocation) {
      setUserPos(getCenter());
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setUserPos(getCenter()),
      { enableHighAccuracy: true, timeout: 5000 }
    );
  }, [getCenter]);

  // recalc map on load
  const onMapLoad = useCallback(map => {
    mapRef.current = map;
    setTimeout(() => {
      if (mapRef.current && window.google) {
        window.google.maps.event.trigger(mapRef.current, 'resize');
        mapRef.current.setCenter(getCenter());
      }
    }, 200);
  }, [getCenter]);

  // fetch directions
  const fetchRoute = useCallback(dest => {
    if (!userPos) return;
    setLoadingRoute(true);
    setDirections(null);
    if (!directionsSvc.current && window.google) {
      directionsSvc.current = new window.google.maps.DirectionsService();
    }
    directionsSvc.current.route(
      { origin: userPos, destination: dest, travelMode: 'WALKING' },
      (res, status) => {
        if (status === 'OK') setDirections(res);
        else console.error('Directions failed:', status);
        setLoadingRoute(false);
      }
    );
  }, [userPos]);

  // when a location is selected
  const onSelect = loc => {
    setChosen(loc);
    fetchRoute(loc.position);
    if (isMobile) setShowMap(true);
  };

  // toggle favorites
  const toggleFav = (id, e) => {
    e.stopPropagation();
    setFavorites(f => (
      f.includes(id) ? f.filter(x => x !== id) : [...f, id]
    ));
  };

  // add new location
  const addLocation = () => {
    if (!newLoc.name || !newLoc.category) return;
    const loc = {
      ...newLoc,
      id: `custom-${Date.now()}`,
      position: getCenter(),
      popularTimes: [],
      addedBy: 'User'
    };
    const u = universities.find(u => u.id === uniId);
    u.locations.push(loc);
    setNewLoc({ name: '', category: '', description: '', hours: '', floorPlan: '' });
    setAdding(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* MOBILE TOP BAR */}
      {isMobile && (
        <div className="flex justify-between items-center p-4 bg-white shadow-md z-20">
          <h1 className="text-xl font-bold text-blue-600">Campus Compass</h1>
          <div className="flex space-x-3">
            <button onClick={() => setShowMap(false)} className={`${!showMap ? 'text-blue-600' : 'text-gray-400'}`}>
              <FaList size={20}/>
            </button>
            <button onClick={() => setShowMap(true)} className={`${showMap ? 'text-blue-600' : 'text-gray-400'}`}>
              <FaMap size={20}/>
            </button>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className={`bg-white w-full md:w-1/3 p-4 overflow-y-auto transition-transform duration-300 ${isMobile && showMap ? '-translate-x-full' : 'translate-x-0'}`}>
        {!isMobile && <h1 className="text-2xl font-bold text-blue-700 mb-4">Campus Compass</h1>}

        {/* Filters & Add */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-sm font-medium">University</label>
            <select
              value={uniId}
              onChange={e => setUniId(e.target.value)}
              className="mt-1 w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              {universities.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Category</label>
              <select
                value={catFilter}
                onChange={e => setCatFilter(e.target.value)}
                className="mt-1 w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search…"
                  className="mt-1 w-full p-2 pl-10 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setAdding(a => !a)}
              className="flex-1 flex items-center justify-center p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <FaPlus className="mr-2"/> Add
            </button>
            <button
              onClick={() => { setCatFilter(''); setSearch(''); }}
              className="flex-1 p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Reset
            </button>
          </div>

          {adding && (
            <div className="p-4 bg-blue-50 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-blue-800">New Location</h3>
                <FaTimes className="cursor-pointer" onClick={() => setAdding(false)} />
              </div>
              <input
                type="text"
                placeholder="Name"
                value={newLoc.name}
                onChange={e => setNewLoc({ ...newLoc, name: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Category"
                value={newLoc.category}
                onChange={e => setNewLoc({ ...newLoc, category: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
              <textarea
                placeholder="Description"
                value={newLoc.description}
                onChange={e => setNewLoc({ ...newLoc, description: e.target.value })}
                className="w-full p-2 border rounded-lg"
                rows={2}
              />
              <input
                type="text"
                placeholder="Hours"
                value={newLoc.hours}
                onChange={e => setNewLoc({ ...newLoc, hours: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Floor Plan URL"
                value={newLoc.floorPlan}
                onChange={e => setNewLoc({ ...newLoc, floorPlan: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
              <button
                onClick={addLocation}
                className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          )}
        </div>

        {/* Locations List */}
        <div className="space-y-3">
          {locations.map(loc => (
            <div
              key={loc.id}
              onClick={() => onSelect(loc)}
              className={`p-3 border rounded-lg cursor-pointer hover:shadow-md transition ${
                chosen?.id === loc.id ? 'bg-blue-50 border-blue-500' : 'bg-white'
              }`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{loc.name}</h3>
                <button onClick={e => toggleFav(loc.id, e)}>
                  {favorites.includes(loc.id) ? <FaStar className="text-yellow-500"/> : <FaRegStar className="text-gray-400"/>}
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">{loc.description}</p>
              <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                {loc.category}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* MAP PANEL */}
      <div className={`relative flex-1 ${isMobile && !showMap ? 'hidden' : ''}`}>
        <LoadScript googleMapsApiKey={API_KEY}>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={getCenter()}
            zoom={16}
            options={{
              streetViewControl: true,
              mapTypeControl: false,
              fullscreenControl: true,
              styles: [
                { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
                { featureType: 'transit', elementType: 'labels', stylers: [{ visibility: 'off' }] }
              ]
            }}
            onLoad={onMapLoad}
          >
            {/* User marker */}
            {userPos && (
              <>
                <Marker
                  position={userPos}
                  icon={{
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: '#4285F4',
                    fillOpacity: 1,
                    strokeColor: '#fff',
                    strokeWeight: 2
                  }}
                />
                <InfoWindow position={userPos}>
                  <div className="font-medium text-blue-700">You are here</div>
                </InfoWindow>
              </>
            )}

            {/* Campus markers */}
            {locations.map(loc => (
              <React.Fragment key={loc.id}>
                <Marker
                  position={loc.position}
                  onClick={() => onSelect(loc)}
                  icon={{
                    url: `https://maps.google.com/mapfiles/ms/icons/${
                      favorites.includes(loc.id) ? 'yellow' : 'blue'
                    }-dot.png`
                  }}
                />
                {chosen?.id === loc.id && !isMobile && (
                  <InfoWindow position={loc.position} onCloseClick={() => setChosen(null)}>
                    <div className="max-w-xs">
                      <h3 className="font-bold text-blue-700 mb-1">{loc.name}</h3>
                      <p className="text-sm text-gray-600">{loc.description}</p>
                      {loc.hours && <p className="mt-2"><strong>Hours:</strong> {loc.hours}</p>}
                      {loc.popularTimes && (
                        <div className="mt-2">
                          <strong className="text-sm">Popular Times:</strong>
                          <ul className="mt-1 text-xs">
                            {loc.popularTimes.map((t,i) => (
                              <li key={i} className="flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {loc.floorPlan && (
                        <a href={loc.floorPlan} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm block mt-2">
                          View Floor Plan
                        </a>
                      )}
                      {loc.indoorMaps && <FloorPlan indoorMaps={loc.indoorMaps} />}
                      <button
                        onClick={() => fetchRoute(loc.position)}
                        className="mt-3 w-full flex items-center justify-center bg-blue-600 text-white py-1.5 rounded-lg hover:bg-blue-700"
                      >
                        <FaDirections className="mr-2"/> Get Directions
                      </button>
                    </div>
                  </InfoWindow>
                )}
              </React.Fragment>
            ))}

            {/* Route polyline */}
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  polylineOptions: { strokeColor: '#4285F4', strokeWeight: 5 }
                }}
              />
            )}
          </GoogleMap>
        </LoadScript>

        {/* Mobile bottom sheet */}
        {isMobile && chosen && (
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-2xl p-4 z-20">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-blue-700">{chosen.name}</h3>
              <FaTimes onClick={() => setChosen(null)} className="cursor-pointer text-gray-500"/>
            </div>
            <p className="text-sm text-gray-600">{chosen.description}</p>
            {chosen.hours && <p className="mt-2"><strong>Hours:</strong> {chosen.hours}</p>}
            {chosen.popularTimes && (
              <div className="mt-2">
                <strong className="text-sm">Popular Times:</strong>
                <ul className="mt-1 text-xs">
                  {chosen.popularTimes.map((t,i)=>(
                    <li key={i} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {chosen.floorPlan && (
              <a href={chosen.floorPlan} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline mt-2 block text-sm">
                View Floor Plan
              </a>
            )}
            {chosen.indoorMaps && <FloorPlan indoorMaps={chosen.indoorMaps} />}
            <button
              onClick={() => fetchRoute(chosen.position)}
              className="mt-3 w-full flex items-center justify-center bg-blue-600 text-white py-1.5 rounded-lg hover:bg-blue-700"
            >
              <FaDirections className="mr-2"/> Get Directions
            </button>
          </div>
        )}

        {/* Route loading spinner */}
        {loadingRoute && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
            <div className="bg-white p-4 rounded-lg flex items-center shadow-lg">
              <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full mr-3"></div>
              <span className="text-gray-700">Calculating route…</span>
            </div>
          </div>
        )}

        {/* Mobile back to list */}
        {isMobile && showMap && (
          <button
            onClick={() => setShowMap(false)}
            className="absolute top-4 left-4 bg-white p-3 rounded-full shadow-md z-20 text-blue-600"
          >
            <FaList size={20}/>
          </button>
        )}
      </div>
    </div>
  );
}
