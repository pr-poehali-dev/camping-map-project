
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import MapComponent from "@/components/MapComponent";
import campings from "@/data/campings";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("map");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedAmenities, setSelectedAmenities] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCampings = campings.filter((camping) => {
    if (selectedRegion !== "all" && camping.region !== selectedRegion) {
      return false;
    }
    if (selectedType !== "all" && camping.type !== selectedType) {
      return false;
    }
    if (
      selectedAmenities !== "all" &&
      !camping.amenities.includes(selectedAmenities)
    ) {
      return false;
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        camping.name.toLowerCase().includes(query) ||
        camping.description.toLowerCase().includes(query) ||
        camping.location.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const handleMarkerClick = (id: string) => {
    navigate(`/camping/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F1E6]">
      <header className="bg-[#1E5631] text-white p-4 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Icon name="Tent" size={28} className="text-[#8FB339]" />
            <h1 className="text-2xl font-bold font-montserrat">КемпингКарта</h1>
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <Input
              placeholder="Поиск кемпингов..."
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className="bg-[#8FB339] hover:bg-[#7A9A2D] text-white">
              <Icon name="Search" className="mr-2 h-4 w-4" />
              Найти
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-medium font-montserrat mb-2 text-[#1E5631]">
                Фильтры
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  value={selectedRegion}
                  onValueChange={setSelectedRegion}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Выберите регион" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все регионы</SelectItem>
                    <SelectItem value="moscow">Московская область</SelectItem>
                    <SelectItem value="tver">Тверская область</SelectItem>
                    <SelectItem value="kaluga">Калужская область</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Тип кемпинга" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все типы</SelectItem>
                    <SelectItem value="tent">Палаточный</SelectItem>
                    <SelectItem value="cabin">С домиками</SelectItem>
                    <SelectItem value="rv">Для автодомов</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={selectedAmenities}
                  onValueChange={setSelectedAmenities}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Удобства" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все удобства</SelectItem>
                    <SelectItem value="water">Питьевая вода</SelectItem>
                    <SelectItem value="shower">Душ</SelectItem>
                    <SelectItem value="electricity">Электричество</SelectItem>
                    <SelectItem value="wifi">Wi-Fi</SelectItem>
                    <SelectItem value="fireplace">Костровище</SelectItem>
                    <SelectItem value="playground">Детская площадка</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <Tabs
          defaultValue="map"
          className="mb-6"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto bg-[#E5E7EB]">
            <TabsTrigger
              value="map"
              className="font-medium font-rubik data-[state=active]:bg-[#1E5631] data-[state=active]:text-white"
            >
              <Icon name="Map" className="mr-2 h-4 w-4" />
              Карта
            </TabsTrigger>
            <TabsTrigger
              value="list"
              className="font-medium font-rubik data-[state=active]:bg-[#1E5631] data-[state=active]:text-white"
            >
              <Icon name="List" className="mr-2 h-4 w-4" />
              Список
            </TabsTrigger>
          </TabsList>
          <TabsContent value="map" className="mt-4">
            <MapComponent
              locations={filteredCampings.map((camping) => ({
                id: camping.id,
                name: camping.name,
                lat: camping.lat,
                lng: camping.lng,
                region: camping.region,
                type: camping.type,
              }))}
              onMarkerClick={handleMarkerClick}
              selectedRegion={selectedRegion}
            />
          </TabsContent>
          <TabsContent value="list" className="mt-4">
            {filteredCampings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCampings.map((camping) => (
                  <CampingCard
                    key={camping.id}
                    camping={camping}
                    onClick={() => navigate(`/camping/${camping.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Icon
                  name="SearchX"
                  size={48}
                  className="mx-auto mb-4 text-gray-400"
                />
                <h3 className="text-xl font-bold mb-2 text-[#1E5631]">
                  Кемпинги не найдены
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  По выбранным критериям не найдено ни одного кемпинга.
                  Попробуйте изменить параметры поиска.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        {activeTab === "map" && filteredCampings.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold font-montserrat text-[#1E5631] mb-4">
              Популярные кемпинги
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampings.slice(0, 3).map((camping) => (
                <CampingCard
                  key={camping.id}
                  camping={camping}
                  featured={true}
                  onClick={() => navigate(`/camping/${camping.id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </main>
      <footer className="bg-[#1E5631] text-white p-6 mt-auto">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold font-montserrat mb-3 flex items-center">
              <Icon name="Tent" className="mr-2 h-5 w-5" />
              КемпингКарта
            </h3>
            <p className="text-sm font-rubik opacity-80">
              Удобный сервис для поиска кемпингов в Московской, Тверской и
              Калужской областях.
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

interface CampingCardProps {
  camping: (typeof campings)[0];
  featured?: boolean;
  onClick?: () => void;
}

const CampingCard = ({
  camping,
  featured = false,
  onClick,
}: CampingCardProps) => {
  return (
    <Card
      className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${featured ? "border-[#8FB339] border-2" : ""}`}
      onClick={onClick}
    >
      <div className="relative h-48 bg-gray-200">
        {camping.images.length > 0 && (
          <img
            src={camping.images[0]}
            alt={camping.name}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
        {featured && (
          <div className="absolute top-2 right-2 bg-[#8FB339] text-white px-2 py-1 rounded-md text-xs font-medium font-rubik">
            Популярный
          </div>
        )}
        <div className="absolute bottom-2 left-2 flex space-x-2">
          <span className="bg-black/70 text-white text-xs rounded-full px-2 py-1 flex items-center">
            <Icon
              name={
                camping.type === "tent"
                  ? "Tent"
                  : camping.type === "cabin"
                    ? "Home"
                    : "Truck"
              }
              className="mr-1 h-3 w-3"
            />
            {camping.type === "tent"
              ? "Палатки"
              : camping.type === "cabin"
                ? "Домики"
                : "Автодома"}
          </span>
          {camping.amenities.includes("water") && (
            <span className="bg-black/70 text-white text-xs rounded-full px-2 py-1 flex items-center">
              <Icon name="Droplets" className="mr-1 h-3 w-3" />
              Вода
            </span>
          )}
        </div>
      </div>
      <CardContent className="p-4 cursor-pointer">
        <div className="mb-2 flex justify-between items-start">
          <h3 className="font-bold font-montserrat text-[#1E5631]">
            {camping.name}
          </h3>
          <div className="flex items-center text-yellow-500">
            <Icon name="Star" className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm text-black font-medium">
              {camping.rating}
            </span>
          </div>
        </div>
        <div className="text-sm text-gray-600 mb-3 flex items-center font-rubik">
          <Icon name="MapPin" className="mr-1 h-4 w-4 text-[#3A6B35]" />
          {camping.location}
        </div>
        <p className="text-sm line-clamp-2 mb-3 font-rubik">
          {camping.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="font-medium text-[#1E5631]">
              от {camping.pricePerDay} ₽
            </span>
            <span className="text-gray-500"> / день</span>
          </div>
          <Button
            variant="outline"
            className="text-[#1E5631] border-[#1E5631] hover:bg-[#1E5631] hover:text-white"
          >
            Подробнее
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Index;
