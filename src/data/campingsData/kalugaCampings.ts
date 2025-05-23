
import { Camping } from '../types';

/**
 * Данные о кемпингах в Калужской области
 */
export const kalugaCampings: Camping[] = [
  {
    id: "camping-4",
    name: "Кемпинг 'Речной'",
    description: "Кемпинг для любителей рыбалки и водных видов спорта на берегу реки Угра.",
    fullDescription: "Кемпинг «Речной» находится на живописном берегу реки Угра в Калужской области и является идеальным местом для любителей водных видов спорта, рыбалки и активного отдыха на природе. Удобное расположение и развитая инфраструктура делают его популярным среди туристов всех возрастов.\n\nНа территории кемпинга есть обозначенные места для установки палаток, а также несколько небольших домиков для тех, кто предпочитает более комфортные условия. Кемпинг оборудован санитарными узлами, душевыми, кухонной зоной с мангалами и столами для приготовления пищи.\n\nОсобенностью кемпинга является наличие оборудованного спуска к воде для спуска лодок и байдарок, пункт проката водного снаряжения (лодки, каяки, SUP-борды), а также услуги инструктора по водным видам спорта. Для рыбаков предусмотрены специальные мостки, организуются экскурсии к лучшим рыбным местам.\n\nНа территории кемпинга регулярно проводятся соревнования по рыбной ловле, водные праздники и фестивали, мастер-классы по приготовлению рыбных блюд на костре.",
    region: "kaluga",
    regionName: "Калужская область",
    location: "Юхновский район, близ деревни Натальинка",
    lat: 54.7555,
    lng: 35.2355,
    type: "tent",
    amenities: ["water", "fireplace", "shower", "fishing"],
    pricePerDay: 450,
    rating: 4.5,
    reviews: 132,
    images: [
      "https://images.unsplash.com/photo-1626178793926-22b28830aa30",
      "https://images.unsplash.com/photo-1629196853882-8f80c3eb4d4e",
      "https://images.unsplash.com/photo-1600367163359-d51d40bcb5f8"
    ],
    contactPhone: "+7 (484) 345-67-89",
    contactEmail: "camping@rechnoy.ru",
    website: "https://rechnoy-camp.ru",
    workingHours: "Май-октябрь: круглосуточно",
    rules: [
      "Соблюдайте чистоту на берегу реки",
      "Запрещено использование моторных лодок в непосредственной близости от кемпинга",
      "При рыбалке соблюдайте установленные нормы вылова",
      "Обязательно используйте спасательные жилеты при занятиях водными видами спорта"
    ],
    nearbyAttractions: [
      "Национальный парк 'Угра' (на территории)",
      "Святой источник (3 км)",
      "Древнее городище (5 км)"
    ]
  },
  {
    id: "camping-5",
    name: "Семейный кемпинг 'Лукоморье'",
    description: "Кемпинг для отдыха с детьми с аниматорами и детскими площадками.",
    fullDescription: "Семейный кемпинг «Лукоморье» создан специально для комфортного отдыха с детьми всех возрастов. Расположенный в экологически чистом районе Калужской области, кемпинг предлагает разнообразные виды активностей и развлечений для всей семьи.\n\nНа территории кемпинга есть как места для палаток, так и уютные домики для семейного проживания. Все объекты инфраструктуры адаптированы для детей: есть детский санузел, невысокие раковины, специальные душевые кабинки.\n\nГлавная особенность кемпинга — развитая детская инфраструктура: несколько игровых площадок для разных возрастов, детский бассейн, веревочный городок, мини-ферма с домашними животными, которых можно кормить и гладить. Ежедневно работают аниматоры, проводятся мастер-классы по рукоделию, лепке, рисованию, организуются детские дискотеки и квесты.\n\nДля родителей предусмотрена возможность оставить ребенка под присмотром профессиональных воспитателей и заняться спортом, рыбалкой или просто отдохнуть. В кемпинге есть семейное кафе с детским меню, работает прокат велосипедов, самокатов, роликов и другого спортивного инвентаря.",
    region: "kaluga",
    regionName: "Калужская область",
    location: "Малоярославецкий район, с. Детчино",
    lat: 54.8461,
    lng: 36.3281,
    type: "cabin",
    amenities: ["water", "electricity", "shower", "wifi", "playground", "kitchen"],
    pricePerDay: 1200,
    rating: 4.9,
    reviews: 203,
    images: [
      "https://images.unsplash.com/photo-1592229505726-ca121723b8ef",
      "https://images.unsplash.com/photo-1455763916899-e8b50eca9967",
      "https://images.unsplash.com/photo-1496275068113-fff8c90750d1"
    ],
    contactPhone: "+7 (484) 567-89-01",
    contactEmail: "info@lukomorie-camping.ru",
    website: "https://lukomorie-camping.ru",
    workingHours: "Круглогодично, администрация работает с 8:00 до 22:00",
    rules: [
      "Соблюдайте тишину во время дневного детского сна с 13:00 до 15:00",
      "Дети до 12 лет должны находиться под присмотром взрослых",
      "Животные допускаются только в специально отведенный сектор кемпинга",
      "Запрещено привозить и использовать стеклянную тару на территории детских площадок"
    ],
    nearbyAttractions: [
      "Парк аттракционов 'Волшебная страна' (10 км)",
      "Контактный зоопарк (на территории)",
      "Музей народных промыслов (15 км)"
    ]
  },
  // Добавим тестовый кемпинг для туристов со сплавов
  {
    id: "camping-8",
    name: "Палаточный лагерь 'Жиздра'",
    description: "Кемпинг для туристов со сплавов по реке Жиздра с базовыми удобствами.",
    fullDescription: "Палаточный лагерь «Жиздра» — это специализированный кемпинг для туристов, совершающих сплавы по живописной реке Жиздра в Калужской области. Кемпинг расположен в стратегически удобном месте на маршруте сплава, что делает его идеальным пунктом для отдыха и перегруппировки.\n\nЛагерь предлагает базовые удобства, необходимые для туристов-водников: оборудованные места для палаток на ровной территории, защищенной от ветра, костровища с запасом дров, навесы от дождя, экологичные туалеты и место для набора питьевой воды из проверенного источника.\n\nНа территории есть специальная зона для просушки снаряжения, хранения байдарок и каноэ, а также простая мастерская для мелкого ремонта туристского оборудования. Администрация кемпинга готова помочь с транспортировкой туристов и снаряжения до начальной точки сплава или от конечной до ближайшей автомобильной дороги.\n\nВ теплое время года здесь формируется особое сообщество туристов-водников, которые делятся опытом, маршрутами и историями из походов. Часто организуются импровизированные вечерние посиделки у костра с гитарой и походной кухней.",
    region: "kaluga",
    regionName: "Калужская область",
    location: "Козельский район, 2 км от деревни Сосенка",
    lat: 54.0374,
    lng: 35.6412,
    type: "tent",
    amenities: ["water", "fireplace"],
    pricePerDay: 200,
    rating: 4.6,
    reviews: 78,
    images: [
      "https://images.unsplash.com/photo-1510312305653-8ed496efae75",
      "https://images.unsplash.com/photo-1414016642750-7fdd78dc33d9",
      "https://images.unsplash.com/photo-1563299796-17596ed6b017"
    ],
    contactPhone: "+7 (484) 890-12-34",
    contactEmail: "zhizdra@camping.ru",
    website: "https://zhizdra-camp.ru",
    workingHours: "Май-сентябрь: круглосуточно",
    rules: [
      "Используйте только отведенные места для стоянок",
      "Соблюдайте чистоту, уносите весь мусор с собой",
      "Уважайте тишину и покой других туристов",
      "Разводите костры только в специальных местах"
    ],
    nearbyAttractions: [
      "Национальный парк 'Угра' (10 км)",
      "Оптина Пустынь (20 км)",
      "Живописные берега реки Жиздра (на территории)"
    ]
  }
];
