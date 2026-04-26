import { Quote } from '../types';

export const quotes: Quote[] = [
  { text: "La constance finit par payer.", author: "Sénèque" },
  { text: "Nous sommes ce que nous faisons chaque jour.", author: "Aristote" },
  { text: "Petites victoires, grands changements.", author: "James Clear" },
  { text: "Un jour à la fois.", author: "Proverbe" },
  { text: "Ne remets pas à demain.", author: "Benjamin Franklin" },
  { text: "Chaque action compte.", author: "Will Smith" },
  { text: "Le succès est la somme de petits efforts répétés.", author: "Robert Collier" },
  { text: "Commencez là où vous êtes.", author: "Arthur Ashe" },
  { text: "La discipline est le pont entre les objectifs et les résultats.", author: "Jim Rohn" },
  { text: "Les habitudes sont d'abord des toiles d'araignée, puis des câbles.", author: "Frederic Amiel" },
];

export function getRandomQuote(): Quote {
  return quotes[Math.floor(Math.random() * quotes.length)];
}