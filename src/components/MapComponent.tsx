
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface CampingLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  region: string;
  type: string;
}

interface MapComponentProps {
  locations: CampingLocation[];
  onMarkerClick: (id: string) => void;
  selectedRegion: string;
}

const MapComponent = ({ locations, onMarkerClick, selectedRegion }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  // Центральные координаты для регионов
  const regionCoordinates = {
    all: { lat: 55.7558, lng: 37.6173, zoom: 7 }, // Центр между тремя областями
    moscow: { lat: 55.7558, lng: 37.6173, zoom: 8 },
    tver: { lat: 56.8587, lng: 35.9208, zoom: 8 },
    kaluga: { lat: 54.5293, lng: 36.2754, zoom: 8 }
  };

  useEffect(() => {
    // Функция инициализации карты
    const initMap = () => {
      if (!mapRef.current) return;
      
      const { lat, lng, zoom } = regionCoordinates[selectedRegion as keyof typeof regionCoordinates] || regionCoordinates.all;
      
      const mapOptions: google.maps.MapOptions = {
        center: { lat, lng },
        zoom: zoom,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        fullscreenControl: false,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          position: google.maps.ControlPosition.TOP_RIGHT,
        },
        streetViewControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP,
        },
        styles: [
          {
            featureType: "poi.business",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "poi.park",
            elementType: "labels.text",
            stylers: [{ visibility: "on" }],
          },
          {
            featureType: "landscape.natural",
            elementType: "geometry",
            stylers: [{ color: "#e8f0e2" }],
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{ color: "#a3d0fd" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }],
          },
        ],
      };

      mapInstanceRef.current = new google.maps.Map(mapRef.current, mapOptions);
      addMarkers();
    };

    // Функция добавления маркеров на карту
    const addMarkers = () => {
      // Очистка предыдущих маркеров
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      if (!mapInstanceRef.current) return;

      // Фильтрация локаций по выбранному региону
      const filteredLocations = selectedRegion === 'all' 
        ? locations 
        : locations.filter(location => location.region === selectedRegion);

      // Создание маркеров для каждой локации
      filteredLocations.forEach(location => {
        const icon = {
          url: location.type === 'tent' 
            ? '/icons/tent-marker.svg' 
            : location.type === 'cabin' 
              ? '/icons/cabin-marker.svg' 
              : '/icons/rv-marker.svg',
          scaledSize: new google.maps.Size(32, 32),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(16, 32),
        };

        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: mapInstanceRef.current,
          title: location.name,
          icon: icon,
          animation: google.maps.Animation.DROP,
        });

        // Добавление обработчика клика на маркер
        marker.addListener('click', () => {
          onMarkerClick(location.id);
        });

        markersRef.current.push(marker);
      });
    };

    // Загрузка Google Maps API 
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    } else {
      initMap();
    }
  }, [locations, selectedRegion, onMarkerClick]);

  // Обновление маркеров при изменении выбранного региона
  useEffect(() => {
    if (mapInstanceRef.current) {
      const { lat, lng, zoom } = regionCoordinates[selectedRegion as keyof typeof regionCoordinates] || regionCoordinates.all;
      
      mapInstanceRef.current.setCenter({ lat, lng });
      mapInstanceRef.current.setZoom(zoom);
      
      // Перезагрузка маркеров
      markersRef.current.forEach(marker => marker.setMap(null));
      
      const filteredLocations = selectedRegion === 'all' 
        ? locations 
        : locations.filter(location => location.region === selectedRegion);
      
      filteredLocations.forEach(location => {
        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: mapInstanceRef.current,
          title: location.name,
          animation: google.maps.Animation.DROP,
        });
        
        marker.addListener('click', () => {
          onMarkerClick(location.id);
        });
        
        markersRef.current.push(marker);
      });
    }
  }, [selectedRegion, locations, onMarkerClick]);

  return (
    <div className="relative h-[60vh] rounded-lg overflow-hidden shadow-md">
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
        <Button 
          variant="secondary" 
          size="sm" 
          className="bg-white shadow-md"
          onClick={() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.setZoom((mapInstanceRef.current.getZoom() || 7) + 1);
            }
          }}
        >
          <Icon name="ZoomIn" size={18} />
        </Button>
        <Button 
          variant="secondary" 
          size="sm" 
          className="bg-white shadow-md"
          onClick={() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.setZoom((mapInstanceRef.current.getZoom() || 7) - 1);
            }
          }}
        >
          <Icon name="ZoomOut" size={18} />
        </Button>
        <Button 
          variant="secondary" 
          size="sm" 
          className="bg-white shadow-md"
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  };
                  if (mapInstanceRef.current) {
                    mapInstanceRef.current.setCenter(pos);
                    mapInstanceRef.current.setZoom(12);
                  }
                },
                () => {
                  console.error("Error: The Geolocation service failed.");
                }
              );
            } else {
              console.error("Error: Your browser doesn't support geolocation.");
            }
          }}
        >
          <Icon name="Locate" size={18} />
        </Button>
      </div>
      
      <div ref={mapRef} className="h-full w-full" />
      
      {!window.google && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin mb-3">
              <Icon name="Loader2" size={40} className="text-[#1E5631]" />
            </div>
            <p>Загрузка карты...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
