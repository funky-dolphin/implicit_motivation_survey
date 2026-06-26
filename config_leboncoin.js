const brands = [
    { name: "Black Market", img: "img/black_market.png" },
    { name: "Amazon", img: "img/amazon.jpg" }, 
    { name: "Discount", img:"img/discount.png"}, 
    { name: "Leboncoin", img:"img/leboncoin.png"},
    { name: "Temu", img: "img/Temu.png"},
    {name: "Vinted", img: "img/vinted.png" },
  ];

const category = "Détaillants en Ligne"

const attributes = [
"audace",
"liberté",
"spontanéité",
"découverte",
"non conformisme",
"dynamisme",
"innovation",
"libération",
"fierté",
"sophistication",
"confiance en soi",
"statut",
"autonomie",
"optimisation",
"prospérité",
"indépendance",
"efficacité",
"praticité",
"simplicité",
"compétence",
"fiabilité",
"accessibilité",
"prudence",
"sécurité",
"bienveillance",
"proximité",
"protection",
"sérénité",
"se sentir comme à la maison",
"appartenance",
"accompagnement",
"engagement",
"joie",
"plaisir",
"confort",
"optimisme",
"ouverture d'esprit",
"sympathie",
"générosité",
"passion",
"inspiration",
"réactivité",
"individualité",
"curiosité",
"créativité",
"progrès",
"modernité"
];



const pretest_attributes = [
  "Chaud", 
  "Froid", 
  "Dangereux",
  "Rafraîchissant", 
  "Mignon",
  "Doux"
];


const pretest_images = [
  {name: "Cat", img: "pretest_img/pretest_cat.png", correct: ["Mignon", "Doux"]},
  {name: "Fire", img:"pretest_img/pretest_fire.png", correct:["Dangereux", "Chaud"]}, 
  {name: "Icecube", img: "pretest_img/pretest_icecube.png", correct:["Froid", "Rafraîchissant"]}
]

const pretest_attributes_multiple = ["Chaud", "Froid", "Dangereux", "Rafraîchissant", "Mignon", "Doux", "Voyage", "Excitation", "Précis", "Temps", "Profond", "Mouillé"]

const pretest_images_multiple = [
  {name: "Cat", img: "pretest_img/pretest_cat.png", correct: ["Mignon", "Doux"]},
  {name: "Fire", img:"pretest_img/pretest_fire.png", correct:["Dangereux", "Chaud"]}, 
  {name: "Icecube", img: "pretest_img/pretest_icecube.png", correct:["Froid", "Rafraîchissant"]}, 
  {name: "Driving", img: "pretest_img/pretest_driving.png", correct:["Voyage", "Excitation"]}, 
  {name: "Ocean", img: "pretest_img/pretest_ocean.png", correct:["Profond", "Mouillé"]},
  {name: "Clock", img: "pretest_img/pretest_clock.png", correct:["Précis", "Temps"]}
]


const survey_name = "Leboncoin"