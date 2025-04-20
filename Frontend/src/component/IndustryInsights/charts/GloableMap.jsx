import React, { useState, useEffect, useRef } from 'react';
import { Globe, Maximize, Minimize, ChevronDown, Search, X, Filter, Layers } from 'lucide-react';

import mapImage from '../../../assets/industryInsights/worlMap.webp';

const GlobalMap = () => {
  // Simplified state
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [mapViewMode, setMapViewMode] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const mapContainerRef = useRef(null);

  // Sample data points - can be replaced with actual data
  const dataPoints = [
    { id: 'us', name: 'United States', value: 85, category: 'north-america', coordinates: [0.22, 0.38] },
    { id: 'ca', name: 'Canada', value: 72, category: 'north-america', coordinates: [0.18, 0.3] },
    { id: 'uk', name: 'United Kingdom', value: 68, category: 'europe', coordinates: [0.45, 0.3] },
    { id: 'de', name: 'Germany', value: 76, category: 'europe', coordinates: [0.48, 0.32] },
    { id: 'fr', name: 'France', value: 63, category: 'europe', coordinates: [0.47, 0.34] },
    { id: 'in', name: 'India', value: 92, category: 'asia', coordinates: [0.65, 0.43] },
    { id: 'jp', name: 'Japan', value: 70, category: 'asia', coordinates: [0.82, 0.35] },
    { id: 'au', name: 'Australia', value: 65, category: 'oceania', coordinates: [0.8, 0.6] },
    { id: 'br', name: 'Brazil', value: 78, category: 'south-america', coordinates: [0.3, 0.56] },
    { id: 'za', name: 'South Africa', value: 59, category: 'africa', coordinates: [0.52, 0.62] },
    { id: 'cn', name: 'China', value: 89, category: 'asia', coordinates: [0.75, 0.38] },
    { id: 'sg', name: 'Singapore', value: 81, category: 'asia', coordinates: [0.73, 0.48] },
  ];

  // Categories and their colors
  const categories = {
    all: { label: 'All Regions', color: 'blue' },
    'north-america': { label: 'North America', color: 'emerald' },
    europe: { label: 'Europe', color: 'purple' },
    asia: { label: 'Asia', color: 'red' },
    'south-america': { label: 'South America', color: 'amber' },
    africa: { label: 'Africa', color: 'orange' },
    oceania: { label: 'Oceania', color: 'teal' },
  };

  // Filter data points based on active filter and search query
  const filteredDataPoints = dataPoints.filter((point) => {
    const matchesFilter = activeFilter === 'all' || point.category === activeFilter;
    const matchesSearch = !searchQuery || point.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Get color for data point based on category
  const getPointColor = (point) => {
    const category = categories[point.category];
    const baseColor = category ? category.color : 'blue';

    const colorMap = {
      blue: 'rgba(59, 130, 246, 0.85)',
      emerald: 'rgba(16, 185, 129, 0.85)',
      purple: 'rgba(139, 92, 246, 0.85)',
      red: 'rgba(239, 68, 68, 0.85)',
      amber: 'rgba(245, 158, 11, 0.85)',
      orange: 'rgba(249, 115, 22, 0.85)',
      teal: 'rgba(20, 184, 166, 0.85)',
    };

    return colorMap[baseColor] || colorMap.blue;
  };

  // Get point size based on value
  const getPointSize = (point) => {
    // Base size between 20 and 48 based on value (0-100) - increased for better visibility
    return Math.max(20, Math.min(48, 20 + (point.value / 100) * 28));
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (mapContainerRef.current.requestFullscreen) {
        mapContainerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* Map Header with Controls */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center space-x-2">
          <Globe className="text-blue-600" size={22} />
          <h2 className="font-semibold text-gray-800 text-lg">Global Industry Insights</h2>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search Toggle */}
          <button
            className={`p-2 rounded-md transition-colors duration-200 ${
              showSearch ? 'bg-blue-100 text-blue-600' : 'hover:bg-blue-50 text-gray-600'
            }`}
            onClick={() => setShowSearch(!showSearch)}
            aria-label="Toggle search"
          >
            <Search size={18} />
          </button>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              className="flex items-center space-x-1 px-3 py-1.5 rounded-md border border-gray-200 hover:bg-blue-50 transition-colors duration-200"
              onClick={() => setShowDropdown(!showDropdown)}
              aria-label="Filter regions"
            >
              <Filter size={16} className="text-gray-600" />
              <span className="text-sm">{categories[activeFilter].label}</span>
              <ChevronDown
                size={14}
                className={`text-gray-500 ${
                  showDropdown ? 'transform rotate-180 transition-transform' : 'transition-transform'
                }`}
              />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-30">
                {Object.entries(categories).map(([key, { label, color }]) => (
                  <button
                    key={key}
                    className={`w-full text-left px-3 py-2.5 text-sm hover:bg-gray-50 flex items-center space-x-2 ${
                      activeFilter === key ? 'bg-blue-50 text-blue-600' : ''
                    }`}
                    onClick={() => {
                      setActiveFilter(key);
                      setShowDropdown(false);
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getPointColor({ category: key }) }}
                    ></div>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* View Mode Toggle */}
          <button
            className="p-2 rounded-md hover:bg-blue-50 text-gray-600 transition-colors duration-200"
            onClick={() => setMapViewMode(mapViewMode === 'default' ? 'satellite' : 'default')}
            aria-label="Toggle map view"
          >
            <Layers size={18} />
          </button>

          {/* Fullscreen Toggle */}
          <button
            className="p-2 rounded-md hover:bg-blue-50 text-gray-600 transition-colors duration-200"
            onClick={toggleFullscreen}
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </div>
      </div>

      {/* Search Bar - Conditional Rendering */}
      {showSearch && (
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-shadow duration-200"
            />
            {searchQuery && (
              <button
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Map Container */}
      <div ref={mapContainerRef} className="relative h-96 overflow-hidden bg-blue-50">
        {/* Map Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${mapImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: mapViewMode === 'satellite' ? 'contrast(1.1) saturate(1.2)' : 'none',
          }}
        >
          {/* Render filtered data points */}
          {filteredDataPoints.map((point) => (
            <div
              key={point.id}
              className="absolute rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-all duration-300 cursor-pointer hover:scale-110"
              style={{
                left: `${point.coordinates[0] * 100}%`,
                top: `${point.coordinates[1] * 100}%`,
                width: `${getPointSize(point)}px`,
                height: `${getPointSize(point)}px`,
                backgroundColor: getPointColor(point),
                transform: 'translate(-50%, -50%)',
                zIndex: selectedPoint === point.id ? 20 : 10,
                boxShadow:
                  selectedPoint === point.id
                    ? '0 0 0 4px rgba(59, 130, 246, 0.5), 0 4px 6px rgba(0, 0, 0, 0.1)'
                    : '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
              onClick={() => setSelectedPoint(selectedPoint === point.id ? null : point.id)}
            >
              <span className="text-sm font-bold text-white">{point.value}</span>
            </div>
          ))}

          {/* Point Detail Popover */}
          {selectedPoint && (
            <div
              className="absolute z-30 bg-white rounded-lg shadow-xl p-4 w-64 transition-opacity duration-300 border border-gray-200"
              style={{
                left: `${dataPoints.find((p) => p.id === selectedPoint).coordinates[0] * 100 + 2}%`,
                top: `${dataPoints.find((p) => p.id === selectedPoint).coordinates[1] * 100 - 5}%`,
                transform: 'translate(-25%, -100%)',
              }}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-800 text-lg">
                  {dataPoints.find((p) => p.id === selectedPoint).name}
                </h3>
                <button
                  className="text-gray-400 hover:text-gray-600 p-1"
                  onClick={() => setSelectedPoint(null)}
                  aria-label="Close details"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="mt-3">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: getPointColor(dataPoints.find((p) => p.id === selectedPoint)) }}
                  ></div>
                  <span className="text-sm text-gray-600">
                    {categories[dataPoints.find((p) => p.id === selectedPoint).category].label}
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Performance Index:</span>
                    <span className="font-medium text-blue-600 text-lg">
                      {dataPoints.find((p) => p.id === selectedPoint).value}/100
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Map Type Indicator */}
        <div className="absolute right-4 bottom-4 bg-white bg-opacity-90 px-3 py-1.5 rounded-md shadow-md z-20 text-xs font-medium">
          {mapViewMode === 'default' ? 'Standard View' : 'Satellite View'}
        </div>
      </div>
    </div>
  );
};

export default GlobalMap;
