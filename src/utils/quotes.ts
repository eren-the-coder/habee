import { Quote } from '../types';

export const quotes: Quote[] = [
  { text: "La constance finit par payer.", author: "Sénèque" },
  { text: "Le secret de votre futur est caché dans votre routine quotidienne.", author: "Mike Murdock" },
  { text: "Nous devenons ce que nous répétons sans cesse.", author: "Aristote" },
  { text: "Petites victoires, grands changements.", author: "James Clear" },
  { text: "Le succès est la somme de petits efforts répétés.", author: "Robert Collier" },
  { text: "La discipline est le pont entre les objectifs et les accomplissements.", author: "Jim Rohn" },
  { text: "Le courage n’est pas d’avoir la force de continuer ; c’est de continuer quand on n’a plus de force.", author: "Theodore Roosevelt" },
  { text: "Le prix de l’excellence est la discipline.", author: "William Arthur Ward" },
  { text: "D’abord nous formons nos habitudes, ensuite ce sont elles qui nous forment.", author: "John Dryden" },
  { text: "Le futur dépend de ce que vous faites aujourd’hui.", author: "Mahatma Gandhi" },
  { text: "La constance est le fondement de la vertu.", author: "Francis Bacon" },
  { text: "Le succès vient rarement d’un grand geste, mais plutôt de petites actions répétées.", author: "Robin Sharma" },
];

export function getRandomQuote(): Quote {
  return quotes[Math.floor(Math.random() * quotes.length)];
}