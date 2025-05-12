
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import campings from "@/data/campings"; 

const CampingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [camping, setCamping] = useState(campings.find(camp => camp.id === id));
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  // Эффект для прокрутки страницы наверх при загрузке
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Эффект для инициализации карты
  useEffect(() => {
    if (!camping) return;

    if (!window.google) {
      // Загрузка Google Maps API 
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

    function initMap() {
      setIsMapLoaded(true);
      const mapElement = document.getElementById('campingDetailMap');
      if (!mapElement) return;

      const mapOptions: google.maps.MapOptions = {
        center: { lat: camping.lat, lng: camping.lng },
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        scrollwheel: false,
        fullscreenControl: false,
        mapTypeControl: true,
        streetViewControl: false,
        zoomControl: true,
      };

      const map = new google.maps.Map(mapElement, mapOptions);
      setMapInstance(map);

      // Добавление маркера
      new google.maps.Marker({
        position: { lat: camping.lat, lng: camping.lng },
        map: map,
        title: camping.name,
        animation: google.maps.Animation.DROP,
        icon: {
          url: `/icons/${camping.type}-marker.svg`,
          scaledSize: new google.maps.Size(36, 36),
        }
      });
    }
  }, [camping]);
  
  // Если кемпинга нет, показываем сообщение и кнопку возврата
  if (!camping) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#F9F1E6]">
        <div className="text-center max-w-lg">
          <Icon name="AlertTriangle" size={64} className="mx-auto mb-4 text-[#1E5631]" />
          <h1 className="text-2xl font-bold mb-4 text-[#1E5631]">Кемпинг не найден</h1>
          <p className="mb-6 text-gray-600">К сожалению, запрашиваемый кемпинг не существует или был удален.</p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-[#1E5631] hover:bg-[#18462A]"
          >
            <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
            Вернуться к списку кемпингов
          </Button>
        </div>
      </div>
    );
  }

  // Функция для преобразования типа кемпинга в понятное название
  const getCampingTypeName = (type: string) => {
    switch (type) {
      case 'tent': return 'Палаточный';
      case 'cabin': return 'С домиками';
      case 'rv': return 'Для автодомов';
      default: return type;
    }
  };

  // Функция для отображения иконки удобства
  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'water': return { icon: 'Droplets', label: 'Вода' };
      case 'fireplace': return { icon: 'Flame', label: 'Костровище' };
      case 'electricity': return { icon: 'Zap', label: 'Электричество' };
      case 'shower': return { icon: 'Shower', label: 'Душ' };
      case 'wifi': return { icon: 'Wifi', label: 'Wi-Fi' };
      case 'playground': return { icon: 'Palmtree', label: 'Детская площадка' };
      case 'kitchen': return { icon: 'UtensilsCrossed', label: 'Кухня' };
      case 'laundry': return { icon: 'WashingMachine', label: 'Прачечная' };
      case 'market': return { icon: 'ShoppingBasket', label: 'Магазин' };
      case 'fishing': return { icon: 'Fish', label: 'Рыбалка' };
      case 'heating': return { icon: 'Thermometer', label: 'Отопление' };
      default: return { icon: 'Check', label: amenity };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F1E6]">
      {/* Header */}
      <header className="bg-[#1E5631] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Icon name="Tent" size={28} className="text-[#8FB339]" />
            <h1 className="text-2xl font-bold font-montserrat">КемпингКарта</h1>
          </Link>
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => navigate('/')}
          >
            <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
            К списку кемпингов
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm mb-4 text-gray-600">
          <Link to="/" className="hover:text-[#1E5631] flex items-center">
            <Icon name="Home" className="mr-1 h-4 w-4" />
            Главная
          </Link>
          <Icon name="ChevronRight" className="mx-2 h-4 w-4" />
          <Link to="/" className="hover:text-[#1E5631]">Кемпинги</Link>
          <Icon name="ChevronRight" className="mx-2 h-4 w-4" />
          <span className="font-medium text-[#1E5631]">{camping.name}</span>
        </div>
        
        {/* Camping Title and Basic Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1E5631] font-montserrat">{camping.name}</h1>
              <div className="flex items-center mt-2 text-gray-600 font-rubik">
                <Icon name="MapPin" className="mr-1 h-4 w-4 text-[#3A6B35]" />
                <span>{camping.location}, {camping.regionName}</span>
              </div>
              <div className="flex items-center mt-2 flex-wrap gap-2">
                <span className="bg-[#E5E7EB] text-[#1E5631] px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <Icon name={camping.type === 'tent' ? 'Tent' : camping.type === 'cabin' ? 'Home' : 'Truck'} className="mr-1 h-4 w-4" />
                  {getCampingTypeName(camping.type)}
                </span>
                <span className="bg-[#E5E7EB] text-[#1E5631] px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <Icon name="Star" className="mr-1 h-4 w-4 fill-yellow-500 text-yellow-500" />
                  {camping.rating} ({camping.reviews} отзывов)
                </span>
                <span className="bg-[#E5E7EB] text-[#1E5631] px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <Icon name="Tag" className="mr-1 h-4 w-4" />
                  От {camping.pricePerDay} ₽/день
                </span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Button className="bg-[#8FB339] hover:bg-[#7A9A2D] text-white">
                <Icon name="Phone" className="mr-2 h-4 w-4" />
                Забронировать
              </Button>
            </div>
          </div>
        </div>
        
        {/* Image Gallery */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 overflow-hidden">
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-4">
            <img 
              src={camping.images[activeImageIndex]} 
              alt={camping.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button 
                variant="secondary" 
                size="sm" 
                className="bg-black/50 text-white hover:bg-black/70 h-8 w-8 p-0"
                disabled={activeImageIndex === 0}
                onClick={() => setActiveImageIndex(prev => prev - 1)}
              >
                <Icon name="ChevronLeft" size={18} />
              </Button>
              <Button 
                variant="secondary" 
                size="sm" 
                className="bg-black/50 text-white hover:bg-black/70 h-8 w-8 p-0"
                disabled={activeImageIndex === camping.images.length - 1}
                onClick={() => setActiveImageIndex(prev => prev + 1)}
              >
                <Icon name="ChevronRight" size={18} />
              </Button>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {camping.images.map((image, index) => (
              <button 
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`flex-shrink-0 h-16 w-24 md:h-20 md:w-32 rounded-md overflow-hidden ${index === activeImageIndex ? 'ring-2 ring-[#1E5631]' : 'opacity-70'}`}
              >
                <img 
                  src={image} 
                  alt={`${camping.name} - изображение ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Tabs with Detailed Info */}
        <Tabs defaultValue="description" className="bg-white rounded-lg shadow-md p-6 mb-6">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="description" className="font-medium data-[state=active]:bg-[#1E5631] data-[state=active]:text-white">
              <Icon name="FileText" className="mr-2 h-4 w-4 md:block hidden" />
              Описание
            </TabsTrigger>
            <TabsTrigger value="amenities" className="font-medium data-[state=active]:bg-[#1E5631] data-[state=active]:text-white">
              <Icon name="ListCheck" className="mr-2 h-4 w-4 md:block hidden" />
              Удобства
            </TabsTrigger>
            <TabsTrigger value="location" className="font-medium data-[state=active]:bg-[#1E5631] data-[state=active]:text-white">
              <Icon name="Map" className="mr-2 h-4 w-4 md:block hidden" />
              Расположение
            </TabsTrigger>
            <TabsTrigger value="rules" className="font-medium data-[state=active]:bg-[#1E5631] data-[state=active]:text-white">
              <Icon name="ScrollText" className="mr-2 h-4 w-4 md:block hidden" />
              Правила
            </TabsTrigger>
          </TabsList>
          
          {/* Description Tab */}
          <TabsContent value="description" className="mt-2">
            <div className="prose max-w-none">
              <h3 className="text-xl font-bold text-[#1E5631] font-montserrat mb-4">О кемпинге</h3>
              <p className="text-gray-700 whitespace-pre-line font-rubik">{camping.fullDescription}</p>
              
              {camping.nearbyAttractions && camping.nearbyAttractions.length > 0 && (
                <>
                  <h4 className="text-lg font-bold text-[#1E5631] font-montserrat mt-6 mb-2">Достопримечательности поблизости</h4>
                  <ul className="list-disc pl-5 text-gray-700 font-rubik">
                    {camping.nearbyAttractions.map((attraction, index) => (
                      <li key={index}>{attraction}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </TabsContent>
          
          {/* Amenities Tab */}
          <TabsContent value="amenities" className="mt-2">
            <h3 className="text-xl font-bold text-[#1E5631] font-montserrat mb-4">Удобства и услуги</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {camping.amenities.map((amenity, index) => {
                const { icon, label } = getAmenityIcon(amenity);
                return (
                  <Card key={index} className="border-none shadow-sm">
                    <CardContent className="p-4 flex items-center">
                      <div className="bg-[#E5E7EB] rounded-full p-2 mr-3">
                        <Icon name={icon} className="h-5 w-5 text-[#1E5631]" />
                      </div>
                      <span className="font-medium font-rubik">{label}</span>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {camping.workingHours && (
              <div className="mt-8">
                <h4 className="text-lg font-bold text-[#1E5631] font-montserrat mb-2">Время работы</h4>
                <p className="text-gray-700 font-rubik flex items-center">
                  <Icon name="Clock" className="mr-2 h-4 w-4 text-[#3A6B35]" />
                  {camping.workingHours}
                </p>
              </div>
            )}
          </TabsContent>
          
          {/* Location Tab */}
          <TabsContent value="location" className="mt-2">
            <h3 className="text-xl font-bold text-[#1E5631] font-montserrat mb-4">Расположение</h3>
            <div className="rounded-lg overflow-hidden h-72 mb-4" id="campingDetailMap">
              {!isMapLoaded && (
                <div className="h-full w-full flex items-center justify-center bg-gray-100">
                  <div className="animate-spin mr-2">
                    <Icon name="Loader2" size={24} className="text-[#1E5631]" />
                  </div>
                  <span>Загрузка карты...</span>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <h4 className="text-lg font-bold text-[#1E5631] font-montserrat mb-2">Адрес</h4>
                <p className="text-gray-700 font-rubik flex items-start">
                  <Icon name="MapPin" className="mr-2 h-4 w-4 text-[#3A6B35] mt-1" />
                  <span>{camping.location}, {camping.regionName}</span>
                </p>
                
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" className="text-[#1E5631] border-[#1E5631]">
                    <Icon name="Navigation" className="mr-2 h-4 w-4" />
                    Построить маршрут
                  </Button>
                  <Button variant="outline" className="text-[#1E5631] border-[#1E5631]">
                    <Icon name="Share2" className="mr-2 h-4 w-4" />
                    Поделиться
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-[#1E5631] font-montserrat mb-2">Контакты</h4>
                {camping.contactPhone && (
                  <p className="text-gray-700 font-rubik flex items-center mb-2">
                    <Icon name="Phone" className="mr-2 h-4 w-4 text-[#3A6B35]" />
                    <a href={`tel:${camping.contactPhone}`} className="hover:text-[#1E5631]">
                      {camping.contactPhone}
                    </a>
                  </p>
                )}
                {camping.contactEmail && (
                  <p className="text-gray-700 font-rubik flex items-center mb-2">
                    <Icon name="Mail" className="mr-2 h-4 w-4 text-[#3A6B35]" />
                    <a href={`mailto:${camping.contactEmail}`} className="hover:text-[#1E5631]">
                      {camping.contactEmail}
                    </a>
                  </p>
                )}
                {camping.website && (
                  <p className="text-gray-700 font-rubik flex items-center">
                    <Icon name="Globe" className="mr-2 h-4 w-4 text-[#3A6B35]" />
                    <a href={camping.website} target="_blank" rel="noopener noreferrer" className="hover:text-[#1E5631]">
                      {camping.website.replace(/^https?:\/\//, '')}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </TabsContent>
          
          {/* Rules Tab */}
          <TabsContent value="rules" className="mt-2">
            <h3 className="text-xl font-bold text-[#1E5631] font-montserrat mb-4">Правила проживания</h3>
            
            {camping.rules && camping.rules.length > 0 ? (
              <ul className="space-y-3">
                {camping.rules.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-1">
                      <div className="bg-[#E5E7EB] rounded-full p-1">
                        <Icon name="Check" className="h-3 w-3 text-[#1E5631]" />
                      </div>
                    </div>
                    <span className="text-gray-700 font-rubik">{rule}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700 font-rubik">Информация о правилах проживания отсутствует. Пожалуйста, уточняйте правила при бронировании.</p>
            )}
            
            <div className="bg-[#F1F8E9] rounded-lg p-4 mt-6">
              <h4 className="text-lg font-bold text-[#1E5631] font-montserrat mb-2 flex items-center">
                <Icon name="Info" className="mr-2 h-5 w-5" />
                Важная информация
              </h4>
              <p className="text-gray-700 font-rubik">
                Пожалуйста, соблюдайте правила пребывания в кемпинге и общие правила поведения на природе. 
                Берегите окружающую среду, не оставляйте мусор, не повреждайте растения и не беспокойте животных.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Book Now Section */}
        <div className="bg-[#1E5631] text-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-xl font-bold font-montserrat mb-2">Забронировать место</h3>
              <p className="opacity-90 font-rubik mb-4 md:mb-0">
                От {camping.pricePerDay} ₽/день • Забронируйте сейчас и наслаждайтесь отдыхом на природе
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="text-white border-white hover:bg-white/20"
                onClick={() => window.open(`tel:${camping.contactPhone}`, '_self')}
              >
                <Icon name="Phone" className="mr-2 h-4 w-4" />
                Позвонить
              </Button>
              <Button className="bg-[#8FB339] hover:bg-[#7A9A2D] text-white">
                <Icon name="Calendar" className="mr-2 h-4 w-4" />
                Забронировать онлайн
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1E5631] text-white p-6 mt-auto">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold font-montserrat mb-3 flex items-center">
              <Icon name="Tent" className="mr-2 h-5 w-5" />
              КемпингКарта
            </h3>
            <p className="text-sm font-rubik opacity-80">
              Удобный сервис для поиска кемпингов в Московской, Тверской и Калужской областях.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold font-montserrat mb-3">Регионы</h3>
            <ul className="space-y-2 font-rubik">
              <li className="flex items-center">
                <Icon name="MapPin" className="mr-2 h-4 w-4" />
                Московская область
              </li>
              <li className="flex items-center">
                <Icon name="MapPin" className="mr-2 h-4 w-4" />
                Тверская область
              </li>
              <li className="flex items-center">
                <Icon name="MapPin" className="mr-2 h-4 w-4" />
                Калужская область
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold font-montserrat mb-3">Контакты</h3>
            <ul className="space-y-2 font-rubik">
              <li className="flex items-center">
                <Icon name="Mail" className="mr-2 h-4 w-4" />
                info@campingmap.ru
              </li>
              <li className="flex items-center">
                <Icon name="Phone" className="mr-2 h-4 w-4" />
                +7 (495) 123-45-67
              </li>
              <li className="flex items-center">
                <Icon name="HelpCircle" className="mr-2 h-4 w-4" />
                Помощь и поддержка
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto mt-8 pt-4 border-t border-white/20 text-center text-sm font-rubik opacity-60">
          &copy; 2025 КемпингКарта. Все права защищены.
        </div>
      </footer>
    </div>
  );
};

export default CampingDetail;
