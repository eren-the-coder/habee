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
  { text: "Ne deviens pas comme lui.", author: "Inconnu" },
  { text: "La discipline est le meilleur ami de l’homme.", author: "Publilius Syrus" },
  { text: "Le succès est la somme de petits efforts, répétés jour après jour.", author: "Leo Robert Collier" },
  { text: "La constance est la clé de tout succès.", author: "Benjamin Disraeli" },
  { text: "Le succès n’est pas une destination, c’est un voyage.", author: "Zig Ziglar" },
  { text: "La discipline est le pont entre les objectifs et les réalisations.", author: "Jim Rohn" },
  { text: "Ton futur dépend de ce que tu fais maintenant.", author: "Inconnu" },
  { text: "Rien ne change si rien ne change.", author: "Inconnu" },
  { text: "Travaille jusqu’à respecter la personne dans le miroir.", author: "Inconnu" },
];

export function getRandomQuote(): Quote {
  return quotes[Math.floor(Math.random() * quotes.length)];
}