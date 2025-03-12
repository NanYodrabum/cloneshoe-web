// StoreLocator.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with React
// We need to manually set the path to marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Sample store data - replace with your actual data
const storeData = [
  {
    id: 1,
    name: 'Central World',
    address: '999/9 Rama I Rd, Pathum Wan, Bangkok 10330',
    phone: '+66 2 100 9999',
    hours: 'Mon-Sun: 10:00 AM - 10:00 PM',
    coordinates: [13.7466, 100.5393],
    image: 'https://res.cloudinary.com/dfmqmyop1/image/upload/v1741787433/store-img_2x2_e4xi5a.png',
  },
  {
    id: 2,
    name: 'Siam Paragon',
    address: '991/1 Rama I Rd, Pathum Wan, Bangkok 10330',
    phone: '+66 2 610 8000',
    hours: 'Mon-Sun: 10:00 AM - 10:00 PM',
    coordinates: [13.7462, 100.5347],
    image: 'https://res.cloudinary.com/dfmqmyop1/image/upload/v1741787558/_mg_0794_bjfoqt.jpg',
  },
  {
    id: 3,
    name: 'EmQuartier',
    address: '689 Sukhumvit Rd, Khlong Tan Nuea, Watthana, Bangkok 10110',
    phone: '+66 2 269 1000',
    hours: 'Mon-Sun: 10:00 AM - 10:00 PM',
    coordinates: [13.7305, 100.5697],
    image: 'https://res.cloudinary.com/dfmqmyop1/image/upload/v1741787669/CNB-0045_g6gzxi.jpg',
  },
];

const StoreLocator = () => {
  const [activeStore, setActiveStore] = useState(null);
  const [mapCenter, setMapCenter] = useState([13.7563, 100.5018]); // Bangkok center
  const [mapZoom, setMapZoom] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStores, setFilteredStores] = useState(storeData);

  useEffect(() => {
    // Filter stores based on search term
    const filtered = storeData.filter(store => 
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStores(filtered);
  }, [searchTerm]);

  const handleStoreClick = (store) => {
    setActiveStore(store);
    setMapCenter(store.coordinates);
    setMapZoom(15);
  };

  const handleMapMarkerClick = (store) => {
    setActiveStore(store);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold text-gray-800">Store Locator</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left sidebar: Search & Store List */}
          <div className="w-full lg:w-1/3">
            {/* Search Box */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by location or address..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Store List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <h2 className="p-4 bg-gray-100 text-lg font-semibold border-b">
                {filteredStores.length} Stores Found
              </h2>
              <div className="max-h-[500px] overflow-y-auto">
                {filteredStores.map(store => (
                  <div 
                    key={store.id} 
                    className={`p-4 cursor-pointer border-b hover:bg-gray-50 transition-colors ${activeStore?.id === store.id ? 'bg-blue-50' : ''}`}
                    onClick={() => handleStoreClick(store)}
                  >
                    <h3 className="font-bold text-lg">{store.name}</h3>
                    <p className="text-gray-600 mt-1">{store.address}</p>
                    <p className="text-gray-500 text-sm mt-1">{store.phone}</p>
                  </div>
                ))}
                {filteredStores.length === 0 && (
                  <div className="p-6 text-center text-gray-500">
                    No stores found matching your search.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right side: Map and store details */}
          <div className="w-full lg:w-2/3">
            {/* Map Container */}
            <div className="h-[400px] bg-gray-100 rounded-lg overflow-hidden mb-6">
              <MapContainer 
                center={mapCenter} 
                zoom={mapZoom} 
                style={{ height: '100%', width: '100%' }}
                key={`${mapCenter[0]}-${mapCenter[1]}-${mapZoom}`}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {filteredStores.map(store => (
                  <Marker 
                    key={store.id} 
                    position={store.coordinates}
                    eventHandlers={{
                      click: () => handleMapMarkerClick(store),
                    }}
                  >
                    <Popup>
                      <div>
                        <h3 className="font-bold">{store.name}</h3>
                        <p className="text-sm">{store.address}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            {/* Store Details */}
            {activeStore && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <img 
                      src={activeStore.image} 
                      alt={activeStore.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <h2 className="text-2xl font-bold mb-2">{activeStore.name}</h2>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <p>{activeStore.address}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        <p>{activeStore.phone}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p>{activeStore.hours}</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <a 
                        href={`https://www.google.com/maps/dir/?api=1&destination=${activeStore.coordinates[0]},${activeStore.coordinates[1]}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Get Directions
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t mt-12">
        <div className="container mx-auto py-6 px-4">
          <p className="text-center text-gray-600">© 2025 Store Locator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default StoreLocator;