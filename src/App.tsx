import React, { useState, useMemo, useEffect } from 'react';
import {
  Users,
  Baby,
  Sparkles,
  RefreshCw,
  Clock,
  ChefHat,
  ShoppingBag,
  Calendar,
  BookOpen,
  Check,
  Plus,
  Minus,
  Copy,
  CheckCircle2,
  Eye,
  EyeOff,
  Search,
  Flame,
  Leaf,
  Heart,
  Utensils,
  X,
  ArrowRight,
  Trash2,
  Info,
  Sun,
  Moon,
  Filter
} from 'lucide-react';

// ==========================================
// BASE DE DONNÉES DE 26 RECETTES FAMILIALES
// Quantités de base définies pour 1.0 part adulte
// ==========================================
const RECIPES_DB = [
  {
    id: 'r1',
    title: 'Aiguillettes de poulet moutarde, herbes & épinards frais',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80',
    prepTime: 10,
    cookTime: 15,
    difficulty: 'Facile',
    tags: ['Rapide', 'Équilibré', 'Gourmand'],
    badge: 'Coup de cœur',
    calories: 410,
    kidTip: 'Adoucissez la moutarde avec une cuillère supplémentaire de crème fraîche et servez avec du riz basmati ou des coquillettes.',
    ingredients: [
      { name: 'Aiguillettes de poulet', qty: 150, unit: 'g', category: 'Boucherie & Poissonnerie' },
      { name: 'Épinards frais en branches', qty: 100, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Crème fraîche épaisse', qty: 40, unit: 'ml', category: 'Crèmerie & Fromages' },
      { name: 'Moutarde à l’ancienne', qty: 10, unit: 'g', category: 'Épicerie' },
      { name: 'Gousse d’ail', qty: 0.5, unit: 'pièce', category: 'Fruits & Légumes' },
      { name: 'Riz basmati', qty: 65, unit: 'g', category: 'Épicerie' },
      { name: 'Herbes de Provence', qty: 1, unit: 'pincée', category: 'Épicerie' }
    ],
    steps: [
      'Lancer la cuisson du riz basmati dans une grande casserole d’eau bouillante salée selon les indications du paquet.',
      'Émincer finement l’ail et laver soigneusement les feuilles d’épinards frais à l’eau claire.',
      'Dans une grande sauteuse avec un filet d’huile d’olive, faire dorer les aiguillettes de poulet 5 à 6 minutes avec l’ail et les herbes de Provence.',
      'Baisser le feu, incorporer la moutarde à l’ancienne et la crème fraîche, puis mélanger délicatement pour enrober la volaille.',
      'Ajouter les épinards frais directement dans la sauteuse et couvrir 3 minutes jusqu’à ce qu’ils soient tendres. Servir bien chaud avec le riz.'
    ]
  },
  {
    id: 'r2',
    title: 'Gratin de penne au saumon frais & brocolis croquants',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281298?auto=format&fit=crop&w=900&q=80',
    prepTime: 15,
    cookTime: 20,
    difficulty: 'Facile',
    tags: ['Gourmand', 'Équilibré'],
    badge: 'Favori des enfants',
    calories: 520,
    kidTip: 'Coupez les fleurettes de brocolis en tout petits bouquets : mélangés au fromage gratiné, les enfants les adorent !',
    ingredients: [
      { name: 'Pavé de saumon frais', qty: 120, unit: 'g', category: 'Boucherie & Poissonnerie' },
      { name: 'Pâtes Penne', qty: 85, unit: 'g', category: 'Épicerie' },
      { name: 'Brocoli frais', qty: 110, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Crème liquide entière', qty: 60, unit: 'ml', category: 'Crèmerie & Fromages' },
      { name: 'Emmental râpé', qty: 35, unit: 'g', category: 'Crèmerie & Fromages' },
      { name: 'Citron jaune', qty: 0.25, unit: 'pièce', category: 'Fruits & Légumes' }
    ],
    steps: [
      'Préchauffer le four à 200°C (mode gril/chaleur tournante).',
      'Cuire les pâtes penne dans l’eau bouillante salée. Ajouter les petites fleurettes de brocoli 4 minutes avant la fin de la cuisson des pâtes.',
      'Couper le saumon frais en dés réguliers d’environ 2 cm.',
      'Égoutter les pâtes et le brocoli, puis les verser dans un plat à gratin avec les dés de saumon cru, la crème liquide et un trait de jus de citron.',
      'Parsemer généreusement d’emmental râpé et enfourner 15 minutes jusqu’à obtenir une belle croûte dorée.'
    ]
  },
  {
    id: 'r3',
    title: 'Lasagnes familiales à la bolognaise mijotée maison',
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=900&q=80',
    prepTime: 25,
    cookTime: 35,
    difficulty: 'Moyen',
    tags: ['Gourmand'],
    badge: 'Classique Familial',
    calories: 590,
    kidTip: 'Râpez très finement la carotte dans la sauce tomate : elle apporte une douceur naturelle qui réduit l’acidité et plaît aux plus petits.',
    ingredients: [
      { name: 'Bœuf haché 5%', qty: 130, unit: 'g', category: 'Boucherie & Poissonnerie' },
      { name: 'Feuilles de lasagnes', qty: 3, unit: 'pièce', category: 'Épicerie' },
      { name: 'Coulis de tomates', qty: 150, unit: 'ml', category: 'Épicerie' },
      { name: 'Carotte', qty: 0.6, unit: 'pièce', category: 'Fruits & Légumes' },
      { name: 'Oignon jaune', qty: 0.4, unit: 'pièce', category: 'Fruits & Légumes' },
      { name: 'Lait demi-écrémé', qty: 120, unit: 'ml', category: 'Crèmerie & Fromages' },
      { name: 'Beurre doux', qty: 15, unit: 'g', category: 'Crèmerie & Fromages' },
      { name: 'Farine de blé', qty: 15, unit: 'g', category: 'Épicerie' },
      { name: 'Mozzarella râpée', qty: 40, unit: 'g', category: 'Crèmerie & Fromages' }
    ],
    steps: [
      'Faire revenir l’oignon émincé et la carotte finement râpée dans une cocotte. Ajouter le bœuf haché et faire dorer 5 minutes.',
      'Verser le coulis de tomates, saler, poivrer et laisser mijoter à couvert pendant 15 minutes.',
      'Préparer la béchamel : faire fondre le beurre, ajouter la farine d’un coup, puis verser le lait progressivement en fouettant jusqu’à épaississement.',
      'Dans un grand plat, alterner une couche de sauce bolognaise, des feuilles de lasagnes et une couche de béchamel.',
      'Terminer par la mozzarella râpée et enfourner 30 minutes à 190°C.'
    ]
  },
  {
    id: 'r4',
    title: 'Curry doux de pois chiches, patates douces & lait de coco',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=80',
    prepTime: 12,
    cookTime: 18,
    difficulty: 'Facile',
    tags: ['Végétarien', 'Équilibré'],
    badge: '100% Végétal',
    calories: 430,
    kidTip: 'Utilisez du curry doux et du lait de coco crémeux : la saveur sucrée de la patate douce conquiert même les enfants réticents aux légumes.',
    ingredients: [
      { name: 'Patate douce', qty: 140, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Pois chiches cuits', qty: 90, unit: 'g', category: 'Épicerie' },
      { name: 'Lait de coco', qty: 100, unit: 'ml', category: 'Épicerie' },
      { name: 'Pousses d’épinards', qty: 50, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Riz thaï parfumé', qty: 65, unit: 'g', category: 'Épicerie' },
      { name: 'Curry doux en poudre', qty: 3, unit: 'g', category: 'Épicerie' },
      { name: 'Oignon jaune', qty: 0.3, unit: 'pièce', category: 'Fruits & Légumes' }
    ],
    steps: [
      'Éplucher et couper la patate douce en petits cubes d’environ 1,5 cm pour une cuisson rapide.',
      'Dans une sauteuse, faire fondre l’oignon émincé avec le curry doux pendant 2 minutes.',
      'Ajouter les cubes de patate douce, les pois chiches rincés et le lait de coco. Couvrir et laisser mijoter 15 minutes à feu doux.',
      'Pendant ce temps, cuire le riz thaï.',
      'En fin de cuisson, incorporer les pousses d’épinards dans le curry chaud et servir aussitôt avec le riz.'
    ]
  },
  {
    id: 'r5',
    title: 'Fajitas festives au poulet croustillant & poivrons fondants',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80',
    prepTime: 12,
    cookTime: 10,
    difficulty: 'Facile',
    tags: ['Rapide', 'Gourmand'],
    badge: 'Repas Ludique',
    calories: 480,
    kidTip: 'Disposez chaque garniture dans des petits bols au centre de la table pour que chaque enfant compose sa propre tortilla !',
    ingredients: [
      { name: 'Filet de poulet', qty: 140, unit: 'g', category: 'Boucherie & Poissonnerie' },
      { name: 'Tortillas de blé', qty: 2, unit: 'pièce', category: 'Boulangerie & Divers' },
      { name: 'Poivron rouge', qty: 0.5, unit: 'pièce', category: 'Fruits & Légumes' },
      { name: 'Avocat mûr', qty: 0.5, unit: 'pièce', category: 'Fruits & Légumes' },
      { name: 'Cheddar râpé', qty: 30, unit: 'g', category: 'Crèmerie & Fromages' },
      { name: 'Yaourt grec ou crème', qty: 30, unit: 'g', category: 'Crèmerie & Fromages' },
      { name: 'Paprika doux', qty: 2, unit: 'g', category: 'Épicerie' }
    ],
    steps: [
      'Émincer les filets de poulet et le poivron rouge en fines lamelles.',
      'Faire sauter le poulet et les poivrons à feu vif dans une poêle huilée avec le paprika doux pendant 8 à 10 minutes.',
      'Écraser la chair de l’avocat à la fourchette avec une pincée de sel pour créer un guacamole express.',
      'Tiédir les tortillas de blé 1 minute à la poêle sèche ou au four.',
      'Garnir chaque tortilla de poulet, poivrons, avocat, cheddar râpé et d’une touche de yaourt grec.'
    ]
  },
  {
    id: 'r6',
    title: 'Quiche lorraine dorée & salade verte aux noix',
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=900&q=80',
    prepTime: 10,
    cookTime: 30,
    difficulty: 'Facile',
    tags: ['Gourmand', 'Équilibré'],
    badge: 'Soirée Cosy',
    calories: 495,
    kidTip: 'Vous pouvez remplacer la moitié des lardons par des dés de jambon blanc découenné pour une version plus douce et moins salée.',
    ingredients: [
      { name: 'Pâte brisée pur beurre', qty: 0.25, unit: 'rouleau', category: 'Crèmerie & Fromages' },
      { name: 'Œufs frais', qty: 1, unit: 'pièce', category: 'Crèmerie & Fromages' },
      { name: 'Lardons fumés ou jambon', qty: 50, unit: 'g', category: 'Boucherie & Poissonnerie' },
      { name: 'Crème fraîche liquide', qty: 65, unit: 'ml', category: 'Crèmerie & Fromages' },
      { name: 'Comté râpé', qty: 30, unit: 'g', category: 'Crèmerie & Fromages' },
      { name: 'Salade jeunes pousses', qty: 45, unit: 'g', category: 'Fruits & Légumes' }
    ],
    steps: [
      'Préchauffer le four à 190°C et dérouler la pâte brisée dans un moule à tarte en piquant le fond avec une fourchette.',
      'Faire revenir les lardons à sec dans une poêle pendant 3 minutes puis les égoutter sur du papier absorbant.',
      'Dans un saladier, battre les œufs avec la crème fraîche, une pincée de muscade et le poivre.',
      'Répartir les lardons et le comté râpé sur le fond de tarte, puis verser l’appareil aux œufs.',
      'Enfourner 30 minutes jusqu’à ce que la quiche soit bien gonflée et dorée. Servir avec la salade verte.'
    ]
  },
  {
    id: 'r7',
    title: 'Risotto crémeux aux champignons de Paris & parmesan',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=900&q=80',
    prepTime: 10,
    cookTime: 20,
    difficulty: 'Moyen',
    tags: ['Végétarien', 'Gourmand'],
    badge: 'Végétarien Gourmand',
    calories: 450,
    kidTip: 'Réservez quelques lamelles de champignons bien dorées pour décorer le dessus ou mixez-les dans le bouillon pour les enfants qui n’aiment pas leur texture.',
    ingredients: [
      { name: 'Riz Arborio pour risotto', qty: 80, unit: 'g', category: 'Épicerie' },
      { name: 'Champignons de Paris frais', qty: 120, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Parmesan AOP râpé', qty: 30, unit: 'g', category: 'Crèmerie & Fromages' },
      { name: 'Échalote', qty: 0.5, unit: 'pièce', category: 'Fruits & Légumes' },
      { name: 'Bouillon de légumes', qty: 250, unit: 'ml', category: 'Épicerie' },
      { name: 'Beurre doux', qty: 15, unit: 'g', category: 'Crèmerie & Fromages' }
    ],
    steps: [
      'Nettoyer et émincer les champignons de Paris, puis les faire dorer à la poêle avec une noisette de beurre. Réserver.',
      'Dans une sauteuse, faire revenir l’échalote ciselée puis verser le riz Arborio jusqu’à ce que les grains soient translucides.',
      'Ajouter le bouillon de légumes chaud louche par louche en remuant régulièrement pendant 18 minutes.',
      'Hors du feu, incorporer les champignons poêlés, le parmesan râpé et le reste de beurre pour lier le risotto.'
    ]
  },
  {
    id: 'r8',
    title: 'Filet mignon de porc mijoté aux carottes fondantes & miel',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    prepTime: 15,
    cookTime: 25,
    difficulty: 'Facile',
    tags: ['Équilibré', 'Gourmand'],
    badge: 'Plat du Dimanche',
    calories: 470,
    kidTip: 'Les rondelles de carottes glacées dans le jus légèrement miellé deviennent fondantes comme des bonbons salés.',
    ingredients: [
      { name: 'Filet mignon de porc', qty: 140, unit: 'g', category: 'Boucherie & Poissonnerie' },
      { name: 'Carottes', qty: 160, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Pommes de terre grenaille', qty: 150, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Miel doux liquide', qty: 8, unit: 'g', category: 'Épicerie' },
      { name: 'Oignon jaune', qty: 0.4, unit: 'pièce', category: 'Fruits & Légumes' },
      { name: 'Bouillon de volaille', qty: 100, unit: 'ml', category: 'Épicerie' }
    ],
    steps: [
      'Couper le filet mignon en médaillons épais et les faire dorer sur chaque face dans une cocotte avec l’oignon émincé.',
      'Éplucher et couper les carottes en rondelles fines, laver les pommes de terre grenaille coupées en deux.',
      'Ajouter les légumes dans la cocotte, verser le miel et le bouillon de volaille.',
      'Couvrir et laisser mijoter à feu doux pendant 22 minutes jusqu’à ce que les carottes et pommes de terre soient fondantes.'
    ]
  },
  {
    id: 'r9',
    title: 'Pancakes salés moelleux jambon, courgette râpée & comté',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=900&q=80',
    prepTime: 10,
    cookTime: 12,
    difficulty: 'Facile',
    tags: ['Rapide', 'Équilibré', 'Gourmand'],
    badge: 'Astuce Légumes Cachés',
    calories: 390,
    kidTip: 'La courgette râpée finement dans la pâte à pancakes est totalement invisible et rend les pancakes ultra-moelleux !',
    ingredients: [
      { name: 'Courgette fraîche', qty: 100, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Jambon blanc supérieur', qty: 50, unit: 'g', category: 'Boucherie & Poissonnerie' },
      { name: 'Farine de blé', qty: 65, unit: 'g', category: 'Épicerie' },
      { name: 'Œufs frais', qty: 1, unit: 'pièce', category: 'Crèmerie & Fromages' },
      { name: 'Lait demi-écrémé', qty: 80, unit: 'ml', category: 'Crèmerie & Fromages' },
      { name: 'Comté râpé', qty: 30, unit: 'g', category: 'Crèmerie & Fromages' },
      { name: 'Levure chimique', qty: 2, unit: 'g', category: 'Épicerie' }
    ],
    steps: [
      'Laver et râper finement la courgette (avec la peau), puis la presser légèrement dans les mains pour retirer l’excédent d’eau.',
      'Dans un saladier, fouetter la farine, la levure, les œufs et le lait jusqu’à obtenir une pâte lisse.',
      'Incorporer la courgette râpée, le jambon coupé en petits dés et le comté râpé.',
      'Faire cuire de petites louches de pâte dans une poêle chaude légèrement beurrée, 2 minutes de chaque côté.'
    ]
  },
  {
    id: 'r10',
    title: 'Tajine express de boulettes de bœuf aux petits légumes',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=900&q=80',
    prepTime: 15,
    cookTime: 18,
    difficulty: 'Facile',
    tags: ['Équilibré', 'Gourmand'],
    badge: 'Voyage des Papilles',
    calories: 485,
    kidTip: 'Façonnez de toutes petites boulettes de la taille d’une noix avec les enfants : elles cuisent en un clin d’œil et sont faciles à piquer.',
    ingredients: [
      { name: 'Bœuf haché', qty: 130, unit: 'g', category: 'Boucherie & Poissonnerie' },
      { name: 'Semoule de blé fine', qty: 70, unit: 'g', category: 'Épicerie' },
      { name: 'Courgette fraîche', qty: 90, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Carotte', qty: 0.7, unit: 'pièce', category: 'Fruits & Légumes' },
      { name: 'Pulpe de tomates concassées', qty: 120, unit: 'ml', category: 'Épicerie' },
      { name: 'Cumin doux moulu', qty: 2, unit: 'g', category: 'Épicerie' }
    ],
    steps: [
      'Assaisonner le bœuf haché avec une pincée de cumin et de sel, puis former de petites boulettes régulières.',
      'Faire dorer les boulettes 4 minutes dans une sauteuse avec un filet d’huile d’olive.',
      'Ajouter les carottes et courgettes coupées en petits bâtonnets ainsi que la pulpe de tomates et un demi-verre d’eau.',
      'Couvrir et laisser mijoter 14 minutes. Servir sur la semoule gonflée à l’eau chaude.'
    ]
  },
  {
    id: 'r11',
    title: 'Poêlée forestière de gnocchis dorés, potimarron & noisettes',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80',
    prepTime: 10,
    cookTime: 12,
    difficulty: 'Facile',
    tags: ['Rapide', 'Végétarien', 'Gourmand'],
    badge: 'Prêt en 20 min',
    calories: 440,
    kidTip: 'Les gnocchis à poêler deviennent croustillants dehors et fondants dedans, un vrai régal avec la douceur du potimarron.',
    ingredients: [
      { name: 'Gnocchis à poêler', qty: 150, unit: 'g', category: 'Crèmerie & Fromages' },
      { name: 'Potimarron ou courge butternut', qty: 130, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Champignons de Paris', qty: 80, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Crème fraîche épaisse', qty: 30, unit: 'ml', category: 'Crèmerie & Fromages' },
      { name: 'Noisettes concassées', qty: 10, unit: 'g', category: 'Épicerie' },
      { name: 'Parmesan râpé', qty: 20, unit: 'g', category: 'Crèmerie & Fromages' }
    ],
    steps: [
      'Couper le potimarron en tout petits dés et émincer les champignons.',
      'Faire sauter le potimarron et les champignons dans une grande poêle avec un filet d’huile pendant 7 minutes à couvert.',
      'Ajouter les gnocchis directement dans la poêle et faire dorer l’ensemble 5 minutes à feu vif.',
      'Lier avec une cuillère de crème fraîche, le parmesan et parsemer de noisettes concassées.'
    ]
  },
  {
    id: 'r12',
    title: 'Croque-Monsieur au four à la béchamel légère & salade croquante',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80',
    prepTime: 10,
    cookTime: 12,
    difficulty: 'Facile',
    tags: ['Rapide', 'Gourmand'],
    badge: 'Soirée Express',
    calories: 460,
    kidTip: 'Découpez les croque-monsieur en triangles ou en bâtonnets "mouillettes" pour les plus jeunes enfants.',
    ingredients: [
      { name: 'Pain de mie complet grandes tranches', qty: 2, unit: 'pièce', category: 'Boulangerie & Divers' },
      { name: 'Jambon blanc sans couenne', qty: 60, unit: 'g', category: 'Boucherie & Poissonnerie' },
      { name: 'Emmental râpé', qty: 45, unit: 'g', category: 'Crèmerie & Fromages' },
      { name: 'Fromage frais à tartiner', qty: 25, unit: 'g', category: 'Crèmerie & Fromages' },
      { name: 'Salade batavia ou mâche', qty: 40, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Tomates cerises', qty: 60, unit: 'g', category: 'Fruits & Légumes' }
    ],
    steps: [
      'Préchauffer le four à 200°C et préparer une plaque recouverte de papier cuisson.',
      'Tartiner chaque tranche de pain de mie de fromage frais pour un moelleux incomparable sans beurre lourd.',
      'Garnir de jambon blanc et d’emmental râpé, refermer les croques et parsemer le dessus d’un peu de fromage.',
      'Enfourner 10 à 12 minutes jusqu’à ce qu’ils soient bien dorés et accompagner de la salade et des tomates cerises.'
    ]
  },
  {
    id: 'r13',
    title: 'Wok de nouilles sautées aux crevettes & petits légumes croquants',
    image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=900&q=80',
    prepTime: 10,
    cookTime: 10,
    difficulty: 'Facile',
    tags: ['Rapide', 'Équilibré'],
    badge: 'Prêt en 20 min',
    calories: 415,
    kidTip: 'Utilisez une sauce soja douce réduite en sel avec une pointe de miel pour enrober les nouilles.',
    ingredients: [
      { name: 'Crevettes roses décortiquées', qty: 110, unit: 'g', category: 'Boucherie & Poissonnerie' },
      { name: 'Nouilles chinoises aux œufs', qty: 75, unit: 'g', category: 'Épicerie' },
      { name: 'Carotte', qty: 0.6, unit: 'pièce', category: 'Fruits & Légumes' },
      { name: 'Courgette fraîche', qty: 80, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Sauce soja douce', qty: 15, unit: 'ml', category: 'Épicerie' },
      { name: 'Graines de sésame', qty: 3, unit: 'g', category: 'Épicerie' }
    ],
    steps: [
      'Tailler la carotte et la courgette en fins bâtonnets (julienne) ou en rubans à l’aide d’un économe.',
      'Cuire les nouilles 4 minutes dans l’eau bouillante puis les égoutter.',
      'Faire sauter les légumes 5 minutes à feu vif dans un wok, ajouter les crevettes et la sauce soja pendant 3 minutes.',
      'Incorporer les nouilles, bien mélanger sur le feu pendant 2 minutes et parsemer de sésame.'
    ]
  },
  {
    id: 'r14',
    title: 'Parmentier de canard ou bœuf à la purée douce de patate douce',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=80',
    prepTime: 20,
    cookTime: 25,
    difficulty: 'Moyen',
    tags: ['Gourmand', 'Équilibré'],
    badge: 'Ultra Fondant',
    calories: 530,
    kidTip: 'Le mélange 50% pomme de terre et 50% patate douce donne une belle couleur orangée très appréciée des enfants.',
    ingredients: [
      { name: 'Viande hachée de bœuf ou effiloché de canard', qty: 130, unit: 'g', category: 'Boucherie & Poissonnerie' },
      { name: 'Pommes de terre à purée', qty: 140, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Patate douce', qty: 120, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Lait demi-écrémé', qty: 50, unit: 'ml', category: 'Crèmerie & Fromages' },
      { name: 'Comté râpé', qty: 25, unit: 'g', category: 'Crèmerie & Fromages' },
      { name: 'Oignon jaune', qty: 0.3, unit: 'pièce', category: 'Fruits & Légumes' }
    ],
    steps: [
      'Éplucher et cuire les pommes de terre et patates douces en cubes pendant 15 minutes dans l’eau bouillante salée.',
      'Faire revenir la viande avec l’oignon émincé pendant 8 minutes dans une poêle, puis répartir au fond d’un plat à gratin.',
      'Écraser les tubercules égouttés avec le lait chaud pour former une purée onctueuse.',
      'Recouvrir la viande de purée, parsemer de comté et gratiner 12 minutes à 200°C.'
    ]
  },
  {
    id: 'r15',
    title: 'Tarte fine rustique à la tomate, moutarde douce & mozzarella',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
    prepTime: 10,
    cookTime: 22,
    difficulty: 'Facile',
    tags: ['Rapide', 'Végétarien', 'Équilibré'],
    badge: 'Rapide & Végé',
    calories: 420,
    kidTip: 'Mélangez la moutarde avec une cuillère de fromage blanc avant de l’étaler sur la pâte pour un goût tout doux.',
    ingredients: [
      { name: 'Pâte feuilletée pur beurre', qty: 0.25, unit: 'rouleau', category: 'Crèmerie & Fromages' },
      { name: 'Tomates rondes mûres', qty: 180, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Mozzarella en boule', qty: 55, unit: 'g', category: 'Crèmerie & Fromages' },
      { name: 'Moutarde douce', qty: 8, unit: 'g', category: 'Épicerie' },
      { name: 'Salade roquette ou mâche', qty: 35, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Huile d’olive vierge', qty: 5, unit: 'ml', category: 'Épicerie' }
    ],
    steps: [
      'Préchauffer le four à 200°C et dérouler la pâte feuilletée sur une plaque.',
      'Badigeonner le fond de pâte d’une fine couche de moutarde douce.',
      'Disposer les tomates coupées en rondelles et la mozzarella tranchée par-dessus.',
      'Arroser d’un filet d’huile d’olive, d’origan et enfourner 22 minutes. Servir avec la salade.'
    ]
  },
  {
    id: 'r16',
    title: 'Blanquette de dinde express aux petits pois & carottes',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    prepTime: 12,
    cookTime: 20,
    difficulty: 'Facile',
    tags: ['Équilibré', 'Gourmand'],
    badge: 'Douceur Familiale',
    calories: 445,
    kidTip: 'La sauce veloutée toute blanche et les petits pois sucrés font l’unanimité chez les petits.',
    ingredients: [
      { name: 'Filet de dinde ou poulet', qty: 140, unit: 'g', category: 'Boucherie & Poissonnerie' },
      { name: 'Petits pois extra-fins', qty: 70, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Carottes', qty: 100, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Crème fraîche légère', qty: 40, unit: 'ml', category: 'Crèmerie & Fromages' },
      { name: 'Riz blanc long grain', qty: 65, unit: 'g', category: 'Épicerie' },
      { name: 'Bouillon de volaille', qty: 120, unit: 'ml', category: 'Épicerie' }
    ],
    steps: [
      'Couper la dinde en cubes et les carottes en fines rondelles.',
      'Dans une cocotte, saisir brièvement la dinde sans coloration puis ajouter les carottes et le bouillon de volaille.',
      'Couvrir et laisser cuire 15 minutes à feu moyen, puis ajouter les petits pois et la crème fraîche pour 5 minutes.',
      'Servir bien chaud accompagné du riz blanc.'
    ]
  },
  {
    id: 'r17',
    title: 'Quesadillas croustillantes haricots rouges, maïs & cheddar',
    image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=900&q=80',
    prepTime: 10,
    cookTime: 8,
    difficulty: 'Facile',
    tags: ['Rapide', 'Végétarien', 'Gourmand'],
    badge: 'Prêt en 18 min',
    calories: 460,
    kidTip: 'Écrasez grossièrement la moitié des haricots rouges avec du fromage frais pour créer une tartinade super fondante dans la tortilla.',
    ingredients: [
      { name: 'Tortillas de blé', qty: 2, unit: 'pièce', category: 'Boulangerie & Divers' },
      { name: 'Haricots rouges cuits', qty: 80, unit: 'g', category: 'Épicerie' },
      { name: 'Maïs doux en grains', qty: 50, unit: 'g', category: 'Épicerie' },
      { name: 'Cheddar et mozzarella râpés', qty: 45, unit: 'g', category: 'Crèmerie & Fromages' },
      { name: 'Avocat mûr', qty: 0.4, unit: 'pièce', category: 'Fruits & Légumes' },
      { name: 'Tomate fraîche', qty: 0.5, unit: 'pièce', category: 'Fruits & Légumes' }
    ],
    steps: [
      'Rincer et égoutter les haricots rouges et le maïs doux, puis couper la tomate en petits dés.',
      'Sur la moitié de chaque tortilla, répartir le fromage râpé, les haricots, le maïs et les dés de tomate.',
      'Replier la tortilla en demi-lune et faire dorer à sec dans une grande poêle 3 à 4 minutes de chaque côté.',
      'Couper en triangles et servir avec des lamelles d’avocat frais.'
    ]
  },
  {
    id: 'r18',
    title: 'Dos de cabillaud rôti au four, écrasé de pommes de terre à l’huile d’olive',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80',
    prepTime: 12,
    cookTime: 18,
    difficulty: 'Facile',
    tags: ['Équilibré', 'Rapide'],
    badge: 'Poisson Sans Arêtes',
    calories: 395,
    kidTip: 'Le dos de cabillaud est garanti sans petites arêtes et sa chair se détache en gros pétales tendres.',
    ingredients: [
      { name: 'Dos de cabillaud frais', qty: 135, unit: 'g', category: 'Boucherie & Poissonnerie' },
      { name: 'Pommes de terre à chair tendre', qty: 200, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Courgette fraîche', qty: 90, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Huile d’olive vierge extra', qty: 12, unit: 'ml', category: 'Épicerie' },
      { name: 'Citron jaune', qty: 0.25, unit: 'pièce', category: 'Fruits & Légumes' },
      { name: 'Beurre demi-sel', qty: 10, unit: 'g', category: 'Crèmerie & Fromages' }
    ],
    steps: [
      'Cuire les pommes de terre épluchées et coupées en morceaux 15 minutes dans l’eau bouillante salée.',
      'Disposer les dos de cabillaud et les rondelles de courgettes dans un plat au four avec un filet d’huile d’olive et de citron pendant 12 minutes à 190°C.',
      'Écraser les pommes de terre à la fourchette avec l’huile d’olive et une noix de beurre demi-sel.',
      'Dresser l’écrasé moelleux avec le cabillaud rôti et les courgettes tendres.'
    ]
  },
  {
    id: 'r19',
    title: 'Pâtes Carbonara crémeuses à la française & petits pois',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=900&q=80',
    prepTime: 8,
    cookTime: 12,
    difficulty: 'Facile',
    tags: ['Rapide', 'Gourmand'],
    badge: 'Prêt en 20 min',
    calories: 510,
    kidTip: 'Les petits pois apportent une touche de couleur verte et de douceur sucrée dans les pâtes préférées de la famille.',
    ingredients: [
      { name: 'Tagliatelles ou Spaghetti', qty: 85, unit: 'g', category: 'Épicerie' },
      { name: 'Allumettes de lardons ou bacon', qty: 55, unit: 'g', category: 'Boucherie & Poissonnerie' },
      { name: 'Petits pois doux', qty: 50, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Crème fraîche liquide', qty: 45, unit: 'ml', category: 'Crèmerie & Fromages' },
      { name: 'Jaune d’œuf frais', qty: 0.5, unit: 'pièce', category: 'Crèmerie & Fromages' },
      { name: 'Parmesan râpé', qty: 25, unit: 'g', category: 'Crèmerie & Fromages' }
    ],
    steps: [
      'Cuire les pâtes dans un grand volume d’eau salée en ajoutant les petits pois 3 minutes avant la fin.',
      'Faire dorer les allumettes de bacon ou lardons à sec dans une poêle.',
      'Baisser le feu, verser la crème fraîche et le parmesan dans la poêle.',
      'Mélanger avec les pâtes égouttées et lier hors du feu avec le jaune d’œuf.'
    ]
  },
  {
    id: 'r20',
    title: 'Dahl onctueux de lentilles corail aux carottes & pain naan',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80',
    prepTime: 10,
    cookTime: 15,
    difficulty: 'Facile',
    tags: ['Rapide', 'Végétarien', 'Équilibré'],
    badge: 'Protéines Végétales',
    calories: 430,
    kidTip: 'Les lentilles corail fondent comme une purée orangée très douce et n’ont pas la peau ferme des lentilles vertes.',
    ingredients: [
      { name: 'Lentilles corail sèches', qty: 75, unit: 'g', category: 'Épicerie' },
      { name: 'Lait de coco', qty: 90, unit: 'ml', category: 'Épicerie' },
      { name: 'Carotte', qty: 0.8, unit: 'pièce', category: 'Fruits & Légumes' },
      { name: 'Coulis de tomates', qty: 70, unit: 'ml', category: 'Épicerie' },
      { name: 'Pain pita ou naan', qty: 1, unit: 'pièce', category: 'Boulangerie & Divers' },
      { name: 'Curcuma doux', qty: 2, unit: 'g', category: 'Épicerie' }
    ],
    steps: [
      'Rincer les lentilles corail à l’eau froide et râper grossièrement les carottes.',
      'Dans une casserole, verser les lentilles, les carottes, le lait de coco, le coulis de tomates, le curcuma et 150 ml d’eau par personne.',
      'Laisser mijoter à feu doux 15 minutes en remuant jusqu’à obtenir une texture crémeuse.',
      'Servir chaud avec des pains naans ou pitas tiédis au grille-pain.'
    ]
  },
  {
    id: 'r21',
    title: 'Burgers maison au poulet pané croustillant & potatoes au four',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    prepTime: 15,
    cookTime: 20,
    difficulty: 'Facile',
    tags: ['Gourmand'],
    badge: 'Favori du Vendredi',
    calories: 560,
    kidTip: 'Panez les filets de poulet dans des cornflakes non sucrés écrasés et cuisez-les au four à côté des potatoes : croustillant garanti sans friture !',
    ingredients: [
      { name: 'Pains burger briochés', qty: 1, unit: 'pièce', category: 'Boulangerie & Divers' },
      { name: 'Filet de poulet', qty: 125, unit: 'g', category: 'Boucherie & Poissonnerie' },
      { name: 'Pommes de terre fermes', qty: 180, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Cheddar en tranches', qty: 25, unit: 'g', category: 'Crèmerie & Fromages' },
      { name: 'Tomate fraîche', qty: 0.4, unit: 'pièce', category: 'Fruits & Légumes' },
      { name: 'Feuilles de laitue', qty: 20, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Chapelure dorée', qty: 20, unit: 'g', category: 'Épicerie' }
    ],
    steps: [
      'Préchauffer le four à 200°C. Couper les pommes de terre en quartiers "potatoes", les enrober d’un filet d’huile et enfourner 20 minutes.',
      'Enrober les filets de poulet de chapelure dorée et les cuire à la poêle ou au four pendant 12 minutes.',
      'Chauffer les pains burgers 2 minutes avec la tranche de cheddar pour la faire fondre.',
      'Assembler les burgers avec la laitue, une rondelle de tomate et le poulet croustillant.'
    ]
  },
  {
    id: 'r22',
    title: 'Omelette soufflée aux fines herbes, pommes de terre rissolées & salade',
    image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=900&q=80',
    prepTime: 10,
    cookTime: 14,
    difficulty: 'Facile',
    tags: ['Rapide', 'Végétarien', 'Équilibré'],
    badge: 'Économique & Rapide',
    calories: 380,
    kidTip: 'Ajoutez une cuillère à soupe de lait ou de crème dans les œufs battus pour une omelette ultra-fondante et jamais sèche.',
    ingredients: [
      { name: 'Œufs frais plein air', qty: 2, unit: 'pièce', category: 'Crèmerie & Fromages' },
      { name: 'Pommes de terre', qty: 160, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Comté ou gruyère râpé', qty: 25, unit: 'g', category: 'Crèmerie & Fromages' },
      { name: 'Ciboulette fraîche', qty: 1, unit: 'botte', category: 'Fruits & Légumes' },
      { name: 'Salade verte mélangée', qty: 40, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Beurre doux', qty: 10, unit: 'g', category: 'Crèmerie & Fromages' }
    ],
    steps: [
      'Couper les pommes de terre en petits dés d’1 cm et les faire rissoler dans une poêle avec le beurre pendant 10 minutes.',
      'Battre énergiquement les œufs avec la ciboulette ciselée, le sel et le poivre.',
      'Verser les œufs sur les pommes de terre dorées, parsemer de fromage râpé et cuire 4 minutes à feu doux.',
      'Servir avec la salade verte croquante.'
    ]
  },
  {
    id: 'r23',
    title: 'Gratin de ravioles du Dauphiné aux courgettes fondantes',
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=900&q=80',
    prepTime: 10,
    cookTime: 15,
    difficulty: 'Facile',
    tags: ['Rapide', 'Végétarien', 'Gourmand'],
    badge: 'Prêt en 25 min',
    calories: 465,
    kidTip: 'Les petites ravioles au comté cuisent directement dans le plat sans pré-cuisson à l’eau !',
    ingredients: [
      { name: 'Plaques de ravioles du Dauphiné', qty: 120, unit: 'g', category: 'Crèmerie & Fromages' },
      { name: 'Courgettes fraîches', qty: 140, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Crème liquide légère', qty: 60, unit: 'ml', category: 'Crèmerie & Fromages' },
      { name: 'Emmental ou comté râpé', qty: 30, unit: 'g', category: 'Crèmerie & Fromages' },
      { name: 'Noix de muscade', qty: 1, unit: 'pincée', category: 'Épicerie' }
    ],
    steps: [
      'Préchauffer le four à 195°C. Râper ou émincer très finement les courgettes et les faire revenir 5 minutes à la poêle.',
      'Dans un plat à gratin, alterner les plaques de ravioles crues et les courgettes fondantes.',
      'Arroser avec la crème liquide assaisonnée de muscade et parsemer de fromage râpé.',
      'Enfourner 15 minutes jusqu’à ce que le dessus soit doré et bouillonnant.'
    ]
  },
  {
    id: 'r24',
    title: 'Bœuf bourguignon express aux carottes & tagliatelles fraîches',
    image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=900&q=80',
    prepTime: 15,
    cookTime: 25,
    difficulty: 'Moyen',
    tags: ['Gourmand', 'Équilibré'],
    badge: 'Tradition Réconfort',
    calories: 515,
    kidTip: 'Cette version familiale sans vin utilise un bouillon de bœuf corsé et une cuillère de concentré de tomates pour une sauce onctueuse adaptée à tous.',
    ingredients: [
      { name: 'Émincé de bœuf tendre', qty: 140, unit: 'g', category: 'Boucherie & Poissonnerie' },
      { name: 'Carottes', qty: 120, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Champignons de Paris', qty: 70, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Tagliatelles fraîches', qty: 90, unit: 'g', category: 'Crèmerie & Fromages' },
      { name: 'Concentré de tomates', qty: 10, unit: 'g', category: 'Épicerie' },
      { name: 'Bouillon de bœuf', qty: 140, unit: 'ml', category: 'Épicerie' }
    ],
    steps: [
      'Saisir l’émincé de bœuf à feu vif dans une cocotte pendant 3 minutes.',
      'Ajouter les carottes en fines rondelles, les champignons émincés, le concentré de tomates et le bouillon.',
      'Couvrir et laisser mijoter 20 minutes à feu doux jusqu’à ce que la sauce nappe la cuillère.',
      'Cuire les tagliatelles fraîches 3 minutes et servir nappées de sauce.'
    ]
  },
  {
    id: 'r25',
    title: 'Poke Bowl familial au saumon, riz vinaigré, mangue & avocat',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
    prepTime: 15,
    cookTime: 10,
    difficulty: 'Facile',
    tags: ['Rapide', 'Équilibré'],
    badge: 'Frais & Coloré',
    calories: 440,
    kidTip: 'Vous pouvez poêler rapidement les dés de saumon 2 minutes avec de la sauce soja sucrée (façon teriyaki) pour les enfants qui ne mangent pas de poisson cru.',
    ingredients: [
      { name: 'Pavé de saumon frais', qty: 110, unit: 'g', category: 'Boucherie & Poissonnerie' },
      { name: 'Riz rond ou basmati', qty: 70, unit: 'g', category: 'Épicerie' },
      { name: 'Avocat mûr', qty: 0.4, unit: 'pièce', category: 'Fruits & Légumes' },
      { name: 'Mangue fraîche ou concombre', qty: 75, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Carotte râpée', qty: 50, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Sauce soja sucrée', qty: 12, unit: 'ml', category: 'Épicerie' }
    ],
    steps: [
      'Cuire le riz puis le laisser tiédir quelques minutes.',
      'Couper le saumon, l’avocat et la mangue (ou concombre) en petits dés réguliers.',
      'Saisir les dés de saumon 2 minutes à la poêle si souhaité, ou les mariner avec la sauce soja.',
      'Dresser le riz au fond des bols et disposer harmonieusement chaque ingrédient coloré par-dessus.'
    ]
  },
  {
    id: 'r26',
    title: 'Soupe veloutée de courge butternut au lait de coco & tartines gratinées',
    image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=900&q=80',
    prepTime: 12,
    cookTime: 18,
    difficulty: 'Facile',
    tags: ['Végétarien', 'Équilibré'],
    badge: 'Dîner Réconfortant',
    calories: 375,
    kidTip: 'Les grandes tartines de pain de campagne gratinées au comté à tremper dans le velouté transforment la soupe en fête !',
    ingredients: [
      { name: 'Courge butternut', qty: 200, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Pomme de terre', qty: 70, unit: 'g', category: 'Fruits & Légumes' },
      { name: 'Lait de coco ou crème', qty: 50, unit: 'ml', category: 'Épicerie' },
      { name: 'Pain de campagne tranché', qty: 50, unit: 'g', category: 'Boulangerie & Divers' },
      { name: 'Comté râpé', qty: 35, unit: 'g', category: 'Crèmerie & Fromages' }
    ],
    steps: [
      'Éplucher et couper la courge butternut et la pomme de terre en cubes.',
      'Cuire les légumes 18 minutes dans une casserole d’eau bouillante salée à hauteur.',
      'Mixer finement avec le lait de coco jusqu’à obtenir un velouté onctueux.',
      'Passer les tranches de pain recouvertes de comté 4 minutes sous le gril du four et servir avec le velouté.'
    ]
  }
];

const DAYS_OF_WEEK = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
  'Dimanche'
];

const CATEGORIES_ORDER = [
  'Fruits & Légumes',
  'Boucherie & Poissonnerie',
  'Crèmerie & Fromages',
  'Épicerie',
  'Boulangerie & Divers'
];

const CATEGORY_STYLES = {
  'Fruits & Légumes': { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  'Boucherie & Poissonnerie': { bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-200', dot: 'bg-rose-500' },
  'Crèmerie & Fromages': { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200', dot: 'bg-amber-500' },
  'Épicerie': { bg: 'bg-orange-50', text: 'text-orange-800', border: 'border-orange-200', dot: 'bg-orange-500' },
  'Boulangerie & Divers': { bg: 'bg-stone-100', text: 'text-stone-800', border: 'border-stone-300', dot: 'bg-stone-500' }
};

// Fonction utilitaire pour formater intelligemment les quantités ajustées
function formatQuantity(rawQty, unit) {
  if (unit === 'g' || unit === 'ml') {
    if (rawQty >= 1000 && unit === 'g') {
      const kg = (rawQty / 1000).toFixed(2).replace(/\.00$/, '').replace(/0$/, '');
      return `${kg} kg`;
    }
    if (rawQty >= 1000 && unit === 'ml') {
      const l = (rawQty / 1000).toFixed(2).replace(/\.00$/, '').replace(/0$/, '');
      return `${l} L`;
    }
    const rounded = rawQty > 50 ? Math.round(rawQty / 5) * 5 : Math.max(1, Math.round(rawQty));
    return `${rounded} ${unit}`;
  }
  if (unit === 'pièce' || unit === 'rouleau' || unit === 'botte') {
    const rounded = Math.ceil(rawQty * 2) / 2;
    const displayVal = rounded % 1 === 0 ? rounded : rounded.toFixed(1).replace('.5', ' ½');
    const plural = rounded > 1 && unit === 'pièce' ? 'pièces' : rounded > 1 && unit === 'rouleau' ? 'rouleaux' : unit;
    return `${displayVal} ${plural}`;
  }
  return `${Math.ceil(rawQty)} ${unit}`;
}

export default function App() {
  // 1. État de la composition familiale avec persistance
  const [adults, setAdults] = useState(() => {
    const saved = localStorage.getItem('tf_adults');
    return saved ? Number(saved) : 2;
  });
  const [children, setChildren] = useState(() => {
    const saved = localStorage.getItem('tf_children');
    return saved ? Number(saved) : 3;
  });
  const [selectedFilter, setSelectedFilter] = useState('Tous');
  const [activeTab, setActiveTab] = useState('semainier'); // 'semainier' | 'recettes' | 'courses'

  // Coefficient de portion : 1 adulte = 1.0 part, 1 enfant = 0.65 part
  const portionFactor = useMemo(() => {
    return Number((adults * 1.0 + children * 0.65).toFixed(2));
  }, [adults, children]);

  const totalPeople = adults + children;

  // 2. État du planificateur de la semaine avec persistance
  const [weeklyPlan, setWeeklyPlan] = useState(() => {
    try {
      const saved = localStorage.getItem('tf_weekly_plan');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DAYS_OF_WEEK.map((day, idx) => ({
      day,
      lunchId: RECIPES_DB[(idx * 2) % RECIPES_DB.length].id,
      dinnerId: RECIPES_DB[(idx * 2 + 1) % RECIPES_DB.length].id
    }));
  });

  const [isSpinning, setIsSpinning] = useState(false);
  const [spinningSlot, setSpinningSlot] = useState(null);

  // 3. État de la Modal Recette & Étapes cochées
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [checkedSteps, setCheckedSteps] = useState({});

  // 4. État de la Liste de courses avec persistance
  const [checkedItems, setCheckedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('tf_checked_items');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {};
  });
  const [customItems, setCustomItems] = useState(() => {
    try {
      const saved = localStorage.getItem('tf_custom_items');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      { id: 'c1', name: 'Fruits frais pour les goûters des enfants', qtyText: '1 panier', category: 'Fruits & Légumes' },
      { id: 'c2', name: 'Baguette tradition fraîche', qtyText: '4 pièces', category: 'Boulangerie & Divers' }
    ];
  });
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Fruits & Légumes');
  const [hideChecked, setHideChecked] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  // Sauvegardes dans le localStorage
  useEffect(() => {
    localStorage.setItem('tf_adults', String(adults));
  }, [adults]);

  useEffect(() => {
    localStorage.setItem('tf_children', String(children));
  }, [children]);

  useEffect(() => {
    localStorage.setItem('tf_weekly_plan', JSON.stringify(weeklyPlan));
  }, [weeklyPlan]);

  useEffect(() => {
    localStorage.setItem('tf_checked_items', JSON.stringify(checkedItems));
  }, [checkedItems]);

  useEffect(() => {
    localStorage.setItem('tf_custom_items', JSON.stringify(customItems));
  }, [customItems]);

  // 5. État de recherche catalogue Recettes
  const [searchQuery, setSearchQuery] = useState('');

  // Dictionnaire rapide des recettes par ID
  const recipesById = useMemo(() => {
    const map = {};
    RECIPES_DB.forEach(r => { map[r.id] = r; });
    return map;
  }, []);

  // Filtrage des recettes selon la préférence active
  const getFilteredPool = (filterName) => {
    if (filterName === 'Tous') return RECIPES_DB;
    if (filterName === 'Rapide') return RECIPES_DB.filter(r => r.prepTime + r.cookTime <= 25 || r.tags.includes('Rapide'));
    return RECIPES_DB.filter(r => r.tags.includes(filterName));
  };

  // Régénérer toute la semaine
  const regenerateFullWeek = (customFilter = selectedFilter) => {
    setIsSpinning(true);
    const pool = getFilteredPool(customFilter);
    const sourcePool = pool.length >= 6 ? pool : RECIPES_DB;

    // Mélange Fisher-Yates pour éviter les doublons
    const shuffled = [...sourcePool].sort(() => Math.random() - 0.5);

    const newPlan = DAYS_OF_WEEK.map((day, index) => {
      const lunchRecipe = shuffled[(index * 2) % shuffled.length];
      const dinnerRecipe = shuffled[(index * 2 + 1) % shuffled.length];
      return {
        day,
        lunchId: lunchRecipe.id,
        dinnerId: dinnerRecipe.id
      };
    });

    setTimeout(() => {
      setWeeklyPlan(newPlan);
      setIsSpinning(false);
    }, 350);
  };

  // Changer un seul repas (Midi ou Soir sur un jour précis)
  const swapSingleMeal = (dayIndex, slotType) => {
    const slotKey = `${dayIndex}-${slotType}`;
    setSpinningSlot(slotKey);

    const pool = getFilteredPool(selectedFilter);
    const sourcePool = pool.length > 1 ? pool : RECIPES_DB;
    const currentId = slotType === 'lunch' ? weeklyPlan[dayIndex].lunchId : weeklyPlan[dayIndex].dinnerId;

    // Privilégier une recette pas encore présente dans la semaine
    const usedIds = new Set(weeklyPlan.flatMap(d => [d.lunchId, d.dinnerId]));
    let candidates = sourcePool.filter(r => !usedIds.has(r.id));
    if (candidates.length === 0) {
      candidates = sourcePool.filter(r => r.id !== currentId);
    }

    const chosen = candidates[Math.floor(Math.random() * candidates.length)] || sourcePool[0];

    setTimeout(() => {
      setWeeklyPlan(prev =>
        prev.map((item, idx) => {
          if (idx !== dayIndex) return item;
          return slotType === 'lunch'
            ? { ...item, lunchId: chosen.id }
            : { ...item, dinnerId: chosen.id };
        })
      );
      setSpinningSlot(null);
    }, 220);
  };

  // Agrégation automatique de tous les ingrédients des 14 repas de la semaine
  const aggregatedShoppingList = useMemo(() => {
    const map = {};

    weeklyPlan.forEach(dayObj => {
      [dayObj.lunchId, dayObj.dinnerId].forEach(recipeId => {
        const recipe = recipesById[recipeId];
        if (!recipe) return;

        recipe.ingredients.forEach(ing => {
          const key = `${ing.name.toLowerCase()}__${ing.unit}`;
          if (!map[key]) {
            map[key] = {
              key,
              name: ing.name,
              unit: ing.unit,
              category: ing.category,
              rawTotalQty: 0,
              occurrences: 0
            };
          }
          map[key].rawTotalQty += ing.qty * portionFactor;
          map[key].occurrences += 1;
        });
      });
    });

    const grouped = {};
    CATEGORIES_ORDER.forEach(cat => { grouped[cat] = []; });

    Object.values(map).forEach(item => {
      const cat = grouped[item.category] ? item.category : 'Boulangerie & Divers';
      grouped[cat].push({
        id: item.key,
        name: item.name,
        qtyText: formatQuantity(item.rawTotalQty, item.unit),
        occurrences: item.occurrences,
        category: cat,
        isCustom: false
      });
    });

    // Ajout des articles manuels
    customItems.forEach(custom => {
      const cat = grouped[custom.category] ? custom.category : 'Boulangerie & Divers';
      grouped[cat].push({
        ...custom,
        isCustom: true
      });
    });

    // Tri alphabétique dans chaque rayon
    CATEGORIES_ORDER.forEach(cat => {
      grouped[cat].sort((a, b) => a.name.localeCompare(b.name));
    });

    return grouped;
  }, [weeklyPlan, portionFactor, recipesById, customItems]);

  // Statistiques de progression de la liste de courses
  const shoppingStats = useMemo(() => {
    const allItems = Object.values(aggregatedShoppingList).flat();
    const total = allItems.length;
    const completed = allItems.filter(i => checkedItems[i.id]).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, percent };
  }, [aggregatedShoppingList, checkedItems]);

  // Basculer un article de la liste de courses
  const toggleShoppingItem = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Ajouter un article personnalisé
  const handleAddCustomItem = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const newItem = {
      id: `custom-${Date.now()}`,
      name: newItemName.trim(),
      qtyText: 'Au choix',
      category: newItemCategory
    };
    setCustomItems(prev => [...prev, newItem]);
    setNewItemName('');
  };

  // Supprimer un article personnalisé
  const removeCustomItem = (id) => {
    setCustomItems(prev => prev.filter(item => item.id !== id));
  };

  // Copier la liste de courses dans le presse-papier
  const copyShoppingListToClipboard = () => {
    let text = `🛒 LISTE DE COURSES DE LA SEMAINE\n👨‍👩‍👧‍👦 Famille : ${adults} adulte(s) et ${children} enfant(s) (${totalPeople} pers.)\n\n`;

    CATEGORIES_ORDER.forEach(cat => {
      const items = aggregatedShoppingList[cat];
      if (items && items.length > 0) {
        text += `📍 ${cat.toUpperCase()}\n`;
        items.forEach(item => {
          const checkSymbol = checkedItems[item.id] ? '✅' : '⬜';
          text += `${checkSymbol} ${item.name} : ${item.qtyText}\n`;
        });
        text += `\n`;
      }
    });

    navigator.clipboard.writeText(text);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 3000);
  };

  // Basculer une étape de préparation dans la modal recette
  const toggleRecipeStep = (recipeId, stepIdx) => {
    const key = `${recipeId}-${stepIdx}`;
    setCheckedSteps(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Filtrage du catalogue de recettes dans l'onglet "Recettes"
  const filteredRecipesCatalog = useMemo(() => {
    return RECIPES_DB.filter(recipe => {
      const matchesFilter =
        selectedFilter === 'Tous' ||
        (selectedFilter === 'Rapide' && (recipe.prepTime + recipe.cookTime <= 25 || recipe.tags.includes('Rapide'))) ||
        recipe.tags.includes(selectedFilter);

      const matchesSearch =
        !searchQuery.trim() ||
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesFilter && matchesSearch;
    });
  }, [selectedFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      {/* ==========================================
          EN-TÊTE & BARRE DE NAVIGATION
      ========================================== */}
      <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Logo & Identité */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
                  <ChefHat className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                      Table <span className="text-emerald-700">&amp;</span> Famille
                    </h1>
                    <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                      Menus &amp; Courses
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-500">
                    14 repas équilibrés et votre liste de courses calculée au gramme près
                  </p>
                </div>
              </div>

              {/* Badge Mobile total personnes */}
              <div className="flex md:hidden items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 whitespace-nowrap ml-2">
                <Users className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">{totalPeople} pers.</span>
              </div>
            </div>

            {/* Navigation principale par Onglets */}
            <nav className="flex items-center bg-stone-200/70 p-1 rounded-2xl self-start md:self-auto w-full md:w-auto">
              <button
                onClick={() => setActiveTab('semainier')}
                className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'semainier'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-stone-600 hover:text-slate-900'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Semainier</span>
              </button>

              <button
                onClick={() => setActiveTab('recettes')}
                className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'recettes'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-stone-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Recettes ({RECIPES_DB.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('courses')}
                className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer relative ${
                  activeTab === 'courses'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-stone-600 hover:text-slate-900'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Courses</span>
                <span className="ml-1 px-1.5 py-0.5 text-[11px] rounded-full bg-orange-500 text-white font-bold">
                  {shoppingStats.total - shoppingStats.completed}
                </span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* ==========================================
          PANNEAU DE CONFIGURATION FAMILIALE & FILTRES
      ========================================== */}
      <section className="bg-white border-b border-stone-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Sélecteurs Adultes & Enfants */}
            <div className="lg:col-span-6 flex flex-wrap items-center gap-3 sm:gap-4 bg-[#FAF8F5] p-3 rounded-2xl border border-stone-200/90">
              {/* Compteur Adultes */}
              <div className="flex items-center gap-2.5 bg-white px-3 py-2 rounded-xl border border-stone-200 shadow-2xs flex-1 min-w-[145px] justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 leading-tight">Adultes</div>
                    <div className="text-[10px] text-stone-500">1 part / pers.</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    aria-label="Retirer un adulte"
                    className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 active:scale-95 flex items-center justify-center text-slate-700 transition cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-5 text-center font-extrabold text-base text-slate-900">
                    {adults}
                  </span>
                  <button
                    onClick={() => setAdults(Math.min(12, adults + 1))}
                    aria-label="Ajouter un adulte"
                    className="w-7 h-7 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-95 flex items-center justify-center text-white transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Compteur Enfants */}
              <div className="flex items-center gap-2.5 bg-white px-3 py-2 rounded-xl border border-stone-200 shadow-2xs flex-1 min-w-[145px] justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center">
                    <Baby className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 leading-tight">Enfants</div>
                    <div className="text-[10px] text-stone-500">0,65 part / enf.</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    aria-label="Retirer un enfant"
                    className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 active:scale-95 flex items-center justify-center text-slate-700 transition cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-5 text-center font-extrabold text-base text-slate-900">
                    {children}
                  </span>
                  <button
                    onClick={() => setChildren(Math.min(12, children + 1))}
                    aria-label="Ajouter un enfant"
                    className="w-7 h-7 rounded-lg bg-orange-500 hover:bg-orange-600 active:scale-95 flex items-center justify-center text-white transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Résumé Dynamique du Foyer */}
              <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2 px-3 py-1.5 rounded-xl bg-emerald-900 text-white text-xs">
                <div>
                  <div className="font-bold">{totalPeople} personnes à table</div>
                  <div className="text-emerald-200 text-[11px]">
                    Quantités calibrées ({portionFactor} parts)
                  </div>
                </div>
              </div>
            </div>

            {/* Filtres rapides & Bouton Régénérer la semaine */}
            <div className="lg:col-span-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Filtres de style culinaire */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
                {[
                  { id: 'Tous', label: 'Tous', icon: Utensils },
                  { id: 'Rapide', label: 'Rapide < 25m', icon: Clock },
                  { id: 'Équilibré', label: 'Équilibré', icon: Heart },
                  { id: 'Végétarien', label: 'Végétarien', icon: Leaf },
                  { id: 'Gourmand', label: 'Familial', icon: Flame }
                ].map(f => {
                  const IconComp = f.icon;
                  const active = selectedFilter === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => {
                        setSelectedFilter(f.id);
                        if (activeTab === 'semainier') {
                          regenerateFullWeek(f.id);
                        }
                      }}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                        active
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      <IconComp className="w-3.5 h-3.5" />
                      <span>{f.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Bouton Régénérer la semaine */}
              <button
                onClick={() => regenerateFullWeek(selectedFilter)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/20 active:scale-98 transition cursor-pointer shrink-0"
              >
                <RefreshCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
                <span>Régénérer la semaine</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          CONTENU PRINCIPAL SELON L'ONGLET ACTIF
      ========================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ------------------------------------------
            ONGLET 1 : VUE SEMAINIER (LUNDI À DIMANCHE)
        ------------------------------------------ */}
        {activeTab === 'semainier' && (
          <div className="space-y-6">
            {/* Bannière d'information interactive */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-4 sm:p-5 rounded-2xl shadow-md">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold">
                    Votre menu de la semaine pour {adults} adulte{adults > 1 ? 's' : ''} et {children} enfant{children > 1 ? 's' : ''}
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-100">
                    Cliquez sur un plat pour ouvrir la recette ajustée ou sur l’icône <RefreshCw className="w-3.5 h-3.5 inline mx-0.5" /> pour remplacer uniquement ce repas.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('courses')}
                className="self-start sm:self-auto flex items-center gap-2 bg-white text-emerald-900 hover:bg-emerald-50 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition cursor-pointer shrink-0"
              >
                <ShoppingBag className="w-4 h-4 text-orange-600" />
                <span>Voir la liste de courses ({shoppingStats.total})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Grille des 7 jours de la semaine */}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 transition-opacity duration-300 ${isSpinning ? 'opacity-50' : 'opacity-100'}`}>
              {weeklyPlan.map((dayPlan, dayIdx) => {
                const lunch = recipesById[dayPlan.lunchId] || RECIPES_DB[0];
                const dinner = recipesById[dayPlan.dinnerId] || RECIPES_DB[1];

                return (
                  <div
                    key={dayPlan.day}
                    className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-md transition flex flex-col overflow-hidden"
                  >
                    {/* En-tête du Jour */}
                    <div className="bg-stone-100/90 px-3.5 py-2.5 border-b border-stone-200 flex items-center justify-between">
                      <span className="font-extrabold text-sm text-slate-900 tracking-wide uppercase">
                        {dayPlan.day}
                      </span>
                      <span className="text-[11px] font-medium text-stone-500">
                        2 repas
                      </span>
                    </div>

                    {/* Corps du jour : Déjeuner & Dîner */}
                    <div className="p-3 space-y-3 flex-1 flex flex-col justify-between">
                      {[
                        { slot: 'lunch', label: 'Déjeuner', icon: Sun, iconColor: 'text-amber-500', recipe: lunch },
                        { slot: 'dinner', label: 'Dîner', icon: Moon, iconColor: 'text-indigo-500', recipe: dinner }
                      ].map(({ slot, label, icon: SlotIcon, iconColor, recipe }) => {
                        const isSlotSpinning = spinningSlot === `${dayIdx}-${slot}`;
                        const totalTime = recipe.prepTime + recipe.cookTime;

                        return (
                          <div
                            key={slot}
                            className={`group rounded-xl border border-stone-200/80 bg-[#FAF8F5] hover:bg-white hover:border-emerald-300 transition overflow-hidden flex flex-col justify-between ${
                              isSlotSpinning ? 'opacity-40 scale-98' : 'opacity-100'
                            }`}
                          >
                            {/* Photo du plat avec badges */}
                            <div
                              onClick={() => setSelectedRecipe(recipe)}
                              className="relative h-32 w-full overflow-hidden cursor-pointer bg-stone-200"
                            >
                              <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                              {/* Moment du repas (Midi / Soir) */}
                              <div className="absolute top-2 left-2 flex items-center gap-1 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-full text-[11px] font-bold text-slate-800 shadow-2xs">
                                <SlotIcon className={`w-3 h-3 ${iconColor}`} />
                                <span>{label}</span>
                              </div>

                              {/* Bouton changer uniquement ce plat */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  swapSingleMeal(dayIdx, slot);
                                }}
                                title="Changer ce plat"
                                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 hover:bg-orange-500 hover:text-white text-slate-700 flex items-center justify-center shadow-xs transition cursor-pointer"
                              >
                                <RefreshCw className={`w-3.5 h-3.5 ${isSlotSpinning ? 'animate-spin' : ''}`} />
                              </button>

                              {/* Temps & Badge en bas de l'image */}
                              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[11px]">
                                <span className="flex items-center gap-1 font-medium bg-black/45 px-2 py-0.5 rounded-md backdrop-blur-2xs">
                                  <Clock className="w-3 h-3 text-amber-300" />
                                  {totalTime} min
                                </span>
                                <span className="bg-emerald-600/90 px-2 py-0.5 rounded-md font-semibold truncate max-w-[110px]">
                                  {recipe.badge}
                                </span>
                              </div>
                            </div>

                            {/* Titre et bouton Voir Recette */}
                            <div className="p-2.5 flex-1 flex flex-col justify-between gap-2">
                              <h3
                                onClick={() => setSelectedRecipe(recipe)}
                                className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-emerald-800 line-clamp-2 leading-snug cursor-pointer"
                              >
                                {recipe.title}
                              </h3>

                              <div className="flex items-center justify-between pt-1 border-t border-stone-200/60">
                                <button
                                  onClick={() => setSelectedRecipe(recipe)}
                                  className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                                >
                                  <span>Voir la recette</span>
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                                <span className="text-[10px] text-stone-400 font-medium">
                                  {recipe.difficulty}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ------------------------------------------
            ONGLET 2 : CATALOGUE DE TOUTES LES RECETTES
        ------------------------------------------ */}
        {activeTab === 'recettes' && (
          <div className="space-y-6">
            {/* Barre de recherche de recettes ou d'ingrédients */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un plat ou un ingrédient (ex: saumon, poulet, courgette, curry...)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-stone-200 text-sm focus:outline-none focus:border-emerald-600"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-slate-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="text-xs sm:text-sm text-stone-500 font-medium">
                Affichage de <strong className="text-slate-900">{filteredRecipesCatalog.length}</strong> recettes adaptées pour <strong className="text-emerald-700">{totalPeople} personnes</strong>
              </div>
            </div>

            {/* Grille des cartes de recettes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredRecipesCatalog.map(recipe => {
                const totalTime = recipe.prepTime + recipe.cookTime;
                return (
                  <div
                    key={recipe.id}
                    onClick={() => setSelectedRecipe(recipe)}
                    className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col cursor-pointer group"
                  >
                    <div className="relative h-48 overflow-hidden bg-stone-200">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 bg-emerald-700 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-xs">
                        {recipe.badge}
                      </span>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                        <span className="flex items-center gap-1 bg-black/50 px-2.5 py-1 rounded-lg backdrop-blur-2xs">
                          <Clock className="w-3.5 h-3.5 text-amber-300" />
                          {totalTime} min
                        </span>
                        <span className="bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-lg font-medium">
                          {recipe.calories} kcal / part
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {recipe.tags.map(t => (
                            <span
                              key={t}
                              className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 leading-snug">
                          {recipe.title}
                        </h3>
                      </div>

                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                        <span className="text-stone-500">
                          {recipe.ingredients.length} ingrédients
                        </span>
                        <span className="font-bold text-emerald-700 flex items-center gap-1">
                          Ouvrir la recette <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ------------------------------------------
            ONGLET 3 : LISTE DE COURSES INTELLIGENTE
        ------------------------------------------ */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            {/* En-tête de la liste de courses avec Jauge de progression et Actions */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-xl font-extrabold text-slate-900">
                      Liste de courses de la semaine
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      14 repas cumulés
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                    Quantités totales calculées automatiquement pour <strong>{adults} adulte(s)</strong> et <strong>{children} enfant(s)</strong> ({portionFactor} parts).
                  </p>
                </div>

                {/* Boutons d'actions rapides */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setHideChecked(!hideChecked)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-200 bg-[#FAF8F5] hover:bg-stone-100 text-xs font-bold text-slate-700 transition cursor-pointer"
                  >
                    {hideChecked ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4 text-stone-500" />}
                    <span>{hideChecked ? 'Afficher les articles cochés' : 'Masquer les articles cochés'}</span>
                  </button>

                  {shoppingStats.completed > 0 && (
                    <button
                      onClick={() => setCheckedItems({})}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-200 bg-[#FAF8F5] hover:bg-rose-50 hover:text-rose-700 text-xs font-bold text-stone-600 transition cursor-pointer"
                    >
                      <span>Tout décocher</span>
                    </button>
                  )}

                  <button
                    onClick={copyShoppingListToClipboard}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition cursor-pointer"
                  >
                    {copiedToast ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedToast ? 'Liste copiée !' : 'Copier pour WhatsApp / Notes'}</span>
                  </button>
                </div>
              </div>

              {/* Barre de progression des courses en magasin */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-emerald-800">
                    Progression du panier : {shoppingStats.completed} / {shoppingStats.total} articles
                  </span>
                  <span className="text-emerald-700">{shoppingStats.percent}%</span>
                </div>
                <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden border border-stone-200/60">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-300 rounded-full"
                    style={{ width: `${shoppingStats.percent}%` }}
                  />
                </div>
              </div>

              {/* Formulaire d'ajout manuel d'un article supplémentaire */}
              <form onSubmit={handleAddCustomItem} className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Ajouter un produit supplémentaire (ex: Lait, couches, pommes, café...)"
                  className="flex-1 px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-stone-200 text-sm focus:outline-none focus:border-emerald-600"
                />
                <select
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-stone-200 text-sm text-slate-700 font-medium focus:outline-none focus:border-emerald-600"
                >
                  {CATEGORIES_ORDER.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter</span>
                </button>
              </form>
            </div>

            {/* Grille des rayons de supermarché */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CATEGORIES_ORDER.map(category => {
                const allItems = aggregatedShoppingList[category] || [];
                const visibleItems = hideChecked
                  ? allItems.filter(item => !checkedItems[item.id])
                  : allItems;
                const style = CATEGORY_STYLES[category] || CATEGORY_STYLES['Boulangerie & Divers'];

                if (allItems.length === 0) return null;

                return (
                  <div
                    key={category}
                    className="bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden flex flex-col"
                  >
                    {/* En-tête du Rayon */}
                    <div className={`px-4 py-3 border-b ${style.bg} ${style.border} flex items-center justify-between`}>
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
                        <h3 className={`font-extrabold text-sm ${style.text}`}>
                          {category}
                        </h3>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/80 text-slate-700">
                        {allItems.filter(i => checkedItems[i.id]).length}/{allItems.length}
                      </span>
                    </div>

                    {/* Liste des ingrédients du rayon */}
                    <div className="divide-y divide-stone-100 p-2 flex-1">
                      {visibleItems.length === 0 ? (
                        <div className="py-8 text-center text-xs text-stone-400 italic">
                          Tous les articles de ce rayon sont dans votre panier !
                        </div>
                      ) : (
                        visibleItems.map(item => {
                          const isChecked = !!checkedItems[item.id];
                          return (
                            <div
                              key={item.id}
                              onClick={() => toggleShoppingItem(item.id)}
                              className={`flex items-center justify-between gap-3 p-2.5 rounded-xl transition cursor-pointer select-none ${
                                isChecked
                                  ? 'bg-stone-50/80 text-stone-400'
                                  : 'hover:bg-emerald-50/40 text-slate-800'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div
                                  className={`w-5 h-5 rounded-md flex items-center justify-center border transition shrink-0 ${
                                    isChecked
                                      ? 'bg-emerald-600 border-emerald-600 text-white'
                                      : 'border-stone-300 bg-white'
                                  }`}
                                >
                                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>
                                <div className="truncate">
                                  <span className={`text-sm font-medium ${isChecked ? 'line-through' : ''}`}>
                                    {item.name}
                                  </span>
                                  {item.occurrences > 1 && (
                                    <span className="ml-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-stone-100 text-stone-500">
                                      {item.occurrences} repas
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <span
                                  className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                                    isChecked
                                      ? 'bg-stone-100 text-stone-400'
                                      : 'bg-amber-50 text-amber-900 border border-amber-200/60'
                                  }`}
                                >
                                  {item.qtyText}
                                </span>
                                {item.isCustom && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeCustomItem(item.id);
                                    }}
                                    className="text-stone-400 hover:text-rose-600 p-1"
                                    title="Supprimer cet article"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* ==========================================
          MODAL DÉTAILLÉE DE LA RECETTE SÉLECTIONNÉE
      ========================================== */}
      {selectedRecipe && (
        <div
          onClick={() => setSelectedRecipe(null)}
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 my-auto max-h-[92vh] flex flex-col"
          >
            {/* Image Grand Format & En-tête de la Modal */}
            <div className="relative h-56 sm:h-72 w-full shrink-0 bg-stone-200">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-md transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-5 right-5 text-white space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white">
                    {selectedRecipe.badge}
                  </span>
                  {selectedRecipe.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold leading-tight">
                  {selectedRecipe.title}
                </h2>
              </div>
            </div>

            {/* Contenu déroulant de la Recette */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
              {/* Bandeau d'informations rapides & Calibrage Famille */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF8F5] p-3.5 rounded-2xl border border-stone-200/80">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-emerald-700 shrink-0" />
                  <div>
                    <div className="text-[11px] text-stone-500">Préparation</div>
                    <div className="text-sm font-bold text-slate-900">{selectedRecipe.prepTime} min</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Flame className="w-5 h-5 text-orange-600 shrink-0" />
                  <div>
                    <div className="text-[11px] text-stone-500">Cuisson</div>
                    <div className="text-sm font-bold text-slate-900">{selectedRecipe.cookTime} min</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <ChefHat className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <div className="text-[11px] text-stone-500">Difficulté</div>
                    <div className="text-sm font-bold text-slate-900">{selectedRecipe.difficulty}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Users className="w-5 h-5 text-teal-700 shrink-0" />
                  <div>
                    <div className="text-[11px] text-stone-500">Portions ajustées</div>
                    <div className="text-sm font-bold text-emerald-800">
                      {adults} ad. + {children} enf.
                    </div>
                  </div>
                </div>
              </div>

              {/* Astuce Enfants & Famille */}
              <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Baby className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-900">
                    Astuce du Chef pour les enfants
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-950 mt-0.5 leading-relaxed">
                    {selectedRecipe.kidTip}
                  </p>
                </div>
              </div>

              {/* Grille Ingrédients & Étapes */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Liste des ingrédients ajustés */}
                <div className="md:col-span-5 space-y-3">
                  <h3 className="font-extrabold text-base text-slate-900 flex items-center justify-between">
                    <span>Ingrédients</span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      Pour {totalPeople} personnes
                    </span>
                  </h3>
                  <ul className="space-y-2 bg-[#FAF8F5] p-3.5 rounded-2xl border border-stone-200/80">
                    {selectedRecipe.ingredients.map((ing, i) => {
                      const scaledQty = formatQuantity(ing.qty * portionFactor, ing.unit);
                      return (
                        <li
                          key={i}
                          className="flex items-center justify-between text-xs sm:text-sm py-1.5 border-b border-stone-200/60 last:border-none"
                        >
                          <span className="font-medium text-slate-800">{ing.name}</span>
                          <span className="font-extrabold text-emerald-800 bg-white px-2 py-0.5 rounded-md border border-stone-200/80">
                            {scaledQty}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Étapes de préparation interactives */}
                <div className="md:col-span-7 space-y-3">
                  <h3 className="font-extrabold text-base text-slate-900">
                    Étapes de préparation (cliquez pour cocher)
                  </h3>
                  <div className="space-y-2.5">
                    {selectedRecipe.steps.map((step, idx) => {
                      const stepKey = `${selectedRecipe.id}-${idx}`;
                      const isDone = !!checkedSteps[stepKey];
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleRecipeStep(selectedRecipe.id, idx)}
                          className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                            isDone
                              ? 'bg-emerald-50/60 border-emerald-200 text-stone-400'
                              : 'bg-white border-stone-200 hover:border-emerald-300 text-slate-800'
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                              isDone
                                ? 'bg-emerald-600 text-white'
                                : 'bg-stone-100 text-slate-700'
                            }`}
                          >
                            {isDone ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                          </div>
                          <p className={`text-xs sm:text-sm leading-relaxed ${isDone ? 'line-through' : ''}`}>
                            {step}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pied de page discret */}
      <footer className="bg-white border-t border-stone-200/80 py-4 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
          <span>
            <strong>Table &amp; Famille</strong> — Planificateur hebdomadaire intelligent (Adulte : 1 part • Enfant : 0,65 part)
          </span>
          <span>
            14 repas équilibrés • Liste de courses triée par rayons
          </span>
        </div>
      </footer>
    </div>
  );
}