import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Settings, Eye, EyeOff, Key } from 'lucide-react';

interface Child {
  id: number;
  name: string;
  age: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'safe' | 'warning' | 'danger';
  lastSeen: string;
  battery: number;
  isOnline: boolean;
}

interface TrackingMapProps {
  children: Child[];
  focusChild?: Child | null;
  height?: string;
}

const TrackingMap: React.FC<TrackingMapProps> = ({ 
  children, 
  focusChild, 
  height = "h-96" 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState<boolean>(false);
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);

  // Initialize map when token is provided
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      // Clear existing map
      if (map.current) {
        map.current.remove();
      }

      // Initialize map with light theme
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: focusChild ? [focusChild.location.lng, focusChild.location.lat] : [18.4241, -33.9249], // Default to Cape Town
        zoom: focusChild ? 14 : 10,
        pitch: 0,
      });

      // Add navigation controls with custom styling
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Custom map styling for blockchain theme
      map.current.on('style.load', () => {
        setIsMapLoaded(true);
        
        // Add custom layer for light theme integration
        map.current?.addLayer({
          id: 'background-overlay',
          type: 'background',
          paint: {
            'background-color': 'hsl(0, 0%, 98%)',
            'background-opacity': 0.1
          }
        });
      });

      // Cleanup function
      return () => {
        if (map.current) {
          map.current.remove();
        }
      };
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [mapboxToken, focusChild]);

  // Update markers when children data changes
  useEffect(() => {
    if (!map.current || !isMapLoaded) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add markers for each child
    children.forEach((child) => {
      const statusColor = child.status === 'safe' ? '#22c55e' : 
                         child.status === 'warning' ? '#f59e0b' : '#ef4444';
      
      // Create custom marker element with blockchain styling
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.innerHTML = `
        <div class="relative">
          <div class="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse" 
               style="background-color: ${statusColor}; box-shadow: 0 0 20px ${statusColor}50;">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
          </div>
          <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full" 
               style="background-color: ${statusColor}; animation: pulse 2s infinite;"></div>
        </div>
      `;

      // Create popup with child info
      const popup = new mapboxgl.Popup({
        offset: 25,
        className: 'custom-popup'
      }).setHTML(`
        <div class="p-4 bg-white text-gray-900 rounded-lg border border-gray-200 shadow-lg">
          <div class="flex items-center space-x-2 mb-2">
            <div class="w-3 h-3 rounded-full" style="background-color: ${statusColor};"></div>
            <h3 class="font-semibold">${child.name}</h3>
          </div>
          <p class="text-sm text-gray-600 mb-1">Age: ${child.age}</p>
          <p class="text-sm text-gray-600 mb-1">Battery: ${child.battery}%</p>
          <p class="text-sm text-gray-600 mb-2">Last seen: ${child.lastSeen}</p>
          <p class="text-xs text-gray-500">${child.location.address}</p>
        </div>
      `);

      // Create and add marker
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([child.location.lng, child.location.lat])
        .setPopup(popup)
        .addTo(map.current!);

      markers.current.push(marker);
    });

    // Fit map to show all children if no focus child
    if (!focusChild && children.length > 1) {
      const bounds = new mapboxgl.LngLatBounds();
      children.forEach(child => {
        bounds.extend([child.location.lng, child.location.lat]);
      });
      map.current.fitBounds(bounds, { padding: 50 });
    }
  }, [children, isMapLoaded, focusChild]);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
    }
  };

  return (
    <div className="sana-card p-0 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border/20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            {focusChild ? `${focusChild.name}'s Location` : 'Children Tracking Map'}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowTokenInput(!showTokenInput)}
            className={`p-2 rounded-lg transition-colors ${
              mapboxToken ? 'text-status-safe bg-status-safe/20' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
            }`}
            title={mapboxToken ? 'Map configured' : 'Configure Mapbox token'}
          >
            {mapboxToken ? <Eye className="w-4 h-4" /> : <Key className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Token Input */}
      {showTokenInput && (
        <div className="p-4 border-b border-border/20 bg-secondary/20">
          <div className="mb-2">
            <label className="block text-sm font-medium text-foreground mb-1">
              Mapbox Public Token
            </label>
            <p className="text-xs text-muted-foreground mb-3">
              Get your token from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a> → Account → Tokens
            </p>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbGF..."
              className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              onClick={handleTokenSubmit}
              className="btn-primary px-4 py-2 text-sm"
            >
              Connect
            </button>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div className={`relative ${height}`}>
        {!mapboxToken ? (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary/20">
            <div className="text-center">
              <Key className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-foreground mb-2">Map Configuration Required</h4>
              <p className="text-muted-foreground mb-4">
                Add your Mapbox token to view children locations
              </p>
              <button
                onClick={() => setShowTokenInput(true)}
                className="btn-primary"
              >
                Configure Map
              </button>
            </div>
          </div>
        ) : (
          <>
            <div ref={mapContainer} className="absolute inset-0" />
            {/* Overlay gradient for better integration */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/10 to-transparent" />
            
            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border/20">
              <div className="text-xs font-medium text-foreground mb-2">Status Legend</div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-status-safe"></div>
                  <span className="text-foreground">Safe</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-status-warning"></div>
                  <span className="text-foreground">Warning</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-status-danger"></div>
                  <span className="text-foreground">Danger</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Add custom styles for mapbox popup
const style = document.createElement('style');
style.textContent = `
  .mapboxgl-popup-content {
    background: white !important;
    border: 1px solid hsl(0, 0%, 90%) !important;
    border-radius: 0.75rem !important;
    padding: 0 !important;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
  }
  
  .mapboxgl-popup-anchor-top .mapboxgl-popup-tip,
  .mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip,
  .mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip {
    border-bottom-color: white !important;
  }
  
  .mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip,
  .mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip,
  .mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip {
    border-top-color: white !important;
  }
  
  .mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
    border-right-color: white !important;
  }
  
  .mapboxgl-popup-anchor-right .mapboxgl-popup-tip {
    border-left-color: white !important;
  }
  
  .mapboxgl-ctrl-group {
    background: white !important;
    border: 1px solid hsl(0, 0%, 90%) !important;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
  }
  
  .mapboxgl-ctrl button {
    background: transparent !important;
    color: hsl(220, 10%, 20%) !important;
  }
  
  .mapboxgl-ctrl button:hover {
    background: hsl(0, 0%, 95%) !important;
  }
`;
document.head.appendChild(style);

export default TrackingMap;