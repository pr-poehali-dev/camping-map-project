
/**
 * Типы для данных о кемпингах
 */

/**
 * Регионы расположения кемпингов
 */
export type Region = 'moscow' | 'tver' | 'kaluga';

/**
 * Типы кемпингов
 */
export type CampingType = 'tent' | 'cabin' | 'rv';

/**
 * Типы удобств в кемпингах
 */
export type Amenity = 
  | 'water' 
  | 'fireplace' 
  | 'electricity' 
  | 'shower' 
  | 'wifi' 
  | 'playground'
  | 'kitchen'
  | 'laundry'
  | 'market'
  | 'fishing'
  | 'heating';

/**
 * Основная структура данных кемпинга
 */
export interface Camping {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  region: Region;
  regionName: string;
  location: string;
  lat: number;
  lng: number;
  type: CampingType;
  amenities: Amenity[];
  pricePerDay: number;
  rating: number;
  reviews: number;
  images: string[];
  contactPhone?: string;
  contactEmail?: string;
  website?: string;
  workingHours?: string;
  rules?: string[];
  nearbyAttractions?: string[];
}

/**
 * Параметры для фильтрации кемпингов
 */
export interface CampingFilterParams {
  region?: Region | 'all';
  type?: CampingType | 'all';
  amenities?: Amenity | 'all';
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
}
