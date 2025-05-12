
import { Camping } from './types';
import { moscowCampings } from './campingsData/moscowCampings';
import { tverCampings } from './campingsData/tverCampings';
import { kalugaCampings } from './campingsData/kalugaCampings';
import { 
  getUniqueRegions,
  getUniqueTypes,
  getUniqueAmenities,
  filterCampings,
  getCampingById,
  getCampingsByType,
  sortCampingsByRating,
  sortCampingsByPrice,
  getRecommendedCampings
} from './utils';

/**
 * Объединение всех данных о кемпингах
 */
const campings: Camping[] = [
  ...moscowCampings,
  ...tverCampings,
  ...kalugaCampings
];

/**
 * Экспорт всех кемпингов и полезных функций для работы с ними
 */
export {
  // Данные
  moscowCampings,
  tverCampings,
  kalugaCampings,
  
  // Вспомогательные функции
  getUniqueRegions,
  getUniqueTypes,
  getUniqueAmenities,
  filterCampings,
  getCampingById,
  getCampingsByType,
  sortCampingsByRating,
  sortCampingsByPrice,
  getRecommendedCampings
};

/**
 * Экспорт по умолчанию - все кемпинги
 */
export default campings;
