import { CardContent } from '../models/cardContent';
import { categories, cards } from '../cards';

export const cardsItemsData = new Map<string, CardContent[]>();
categories.forEach((c, i) => cardsItemsData.set(c, cards[i]));

export const menuCategories: string[] = JSON.parse(JSON.stringify(categories));
menuCategories.unshift('Main Page');
menuCategories.push('Statistics');
export const burgerCardItems = categories.map((c: string) => c);
