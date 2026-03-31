const brands = [
    { name: "Banque Populaire", img: "img/BANQUE POPULAIRE.png" },
    { name: "BNP Paribas", img: "img/BNP-Paribas.png" }, 
    { name: "Bourso Bank", img:"img/BoursoBank.png"}, 
    { name: "Caisse d'Épargne", img:"img/Caisse-Epargne.png"},
    { name: "CIC", img: "img/CIC.png"},
    {name: "Credit Agricole", img: "img/Credit-Agricole.png" },
    {name: "Credit Mutuel", img: "img/Credit-Mutuel.png" },
    {name: "Revolut", img: "img/Revolut.png" },
  ];

const category = "Banques"

const attributes = [
"audace",
"liberté",
"courage",
"spontanéité",
"découverte",
"non conformisme",
"dynamisme",
"innovation",
"fierté",
"succès",
"sophistication",
"ambition",
"confiance en soi",
"statut",
"autonomie",
"prospérité",
"contrôle",
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
"responsabilité",
"protection",
"sérénité",
"accompagnement",
"engagement",
"joie",
"insouciance",
"plaisir",
"confort",
"optimisme",
"ouverture d'esprit",
"sympathie",
"générosité",
"excitation",
"passion",
"inspiration",
"vitalité",
"réactivité",
"individualité",
"progrès",
"pertinence",
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


const survey_name = "Paris_Caisse_d_Epargne"