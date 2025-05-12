
import { Camping, CampingFilterParams, Region, CampingType, Amenity } from './types';

/**
 * Получение всех уникальных регионов из списка кемпингов
 */
export const getUniqueRegions = (campings: Camping[]): Region[] => {
  const regions = [...new Set(campings.map(camping => camping.region))];
  return regions as Region[];
};

/**
 * Получение всех уникальных типов из списка кемпингов
 */
export const getUniqueTypes = (campings: Camping[]): CampingType[] => {
  const types = [...new Set(campings.map(camping => camping.type))];
  return types as CampingType[];
};

/**
 * Получение всех уникальных удобств из списка кемпингов
 */
export const getUniqueAmenities = (campings: Camping[]): Amenity[] => {
  const amenitiesSet = new Set<Amenity>();
  
  campings.forEach(camping => {
    camping.amenities.forEach(amenity => {
      amenitiesSet.add(amenity as Amenity);
    });
  });
  
  return Array.from(amenitiesSet);
};

/**
 * Фильтрация кемпингов по различным параметрам
 */
export const filterCampings = (
  campings: Camping[], 
  filters: CampingFilterParams
): Camping[] => {
  return campings.filter(camping => {
    // Фильтр по региону
    if (filters.region && filters.region !== 'all' && camping.region !== filters.region) {
      return false;
    }
    
    // Фильтр по типу кемпинга
    if (filters.type && filters.type !== 'all' && camping.type !== filters.type) {
      return false;
    }
    
    // Фильтр по удобствам
    if (filters.amenities && filters.amenities !== 'all' && !camping.amenities.includes(filters.amenities)) {
      return false;
    }
    
    // Фильтр по цене
    if (filters.minPrice && camping.pricePerDay < filters.minPrice) {
      return false;
    }
    
    if (filters.maxPrice && camping.pricePerDay > filters.maxPrice) {
      return false;
    }
    
    // Фильтр по поисковому запросу
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesName = camping.name.toLowerCase().includes(query);
      const matchesDescription = camping.description.toLowerCase().includes(query);
      const matchesLocation = camping.location.toLowerCase().includes(query);
      
      if (!matchesName && !matchesDescription && !matchesLocation) {
        return false;
      }
    }
    
    return true;
  });
};

/**
 * Получение кемпинга по ID
 */
export const getCampingById = (campings: Camping[], id: string): Camping | undefined => {
  return campings.find(camping => camping.id === id);
};

/**
 * Получение кемпингов по типу
 */
export const getCampingsByType = (campings: Camping[], type: CampingType): Camping[] => {
  return campings.filter(camping => camping.type === type);
};

/**
 * Сортировка кемпингов по рейтингу (по убыванию)
 */
export const sortCampingsByRating = (campings: Camping[]): Camping[] => {
  return [...campings].sort((a, b) => b.rating - a.rating);
};

/**
 * Сортировка кемпингов по цене (по возрастанию)
 */
export const sortCampingsByPrice = (campings: Camping[]): Camping[] => {
  return [...campings].sort((a, b) => a.pricePerDay - b.pricePerDay);
};

/**
 * Получение рекомендуемых кемпингов (высокий рейтинг и много отзывов)
 */
export const getRecommendedCampings = (campings: Camping[], limit: number = 3): Camping[] => {
  return [...campings]
    .sort((a, b) => {
      // Комбинированный рейтинг: рейтинг * log(количество отзывов)
      const scoreA = a.rating * Math.log10(a.reviews + 1);
      const scoreB = b.rating * Math.log10(b.reviews + 1);
      return scoreB - scoreA;
    })
    .slice(0, limit);
};
