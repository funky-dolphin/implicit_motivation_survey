const brands = [
    { name: "Subway", img: "img/Subway.png" },
    { name: "Tim Hortons", img: "img/Tim_hortons.png" }, 
    { name: "McDonalds", img:"img/mcdonalds.png"}, 
    { name: "A&W", img:"img/aw.png"},
    { name: "Harvey's", img: "img/harveys.png"},
    {name: "Chipotle", img: "img/chipotle.png" },
    {name: "Wendy's", img: "img/wendys.png" },
    {name: "Freshii", img: "img/freshii.png" }
  ];

const category = "Restauration rapide"

const attributes = [
"aventure",
"liberté",
"courage",
"impulsivité",
"découverte",
"évasion",
"être non conventionnel",
"libération",
"fierté",
"perfection",
"reconnaissance",
"succès",
"réussite",
"faire de mon mieux",
"autonomisation",
"m`améliorer",
"discipline",
"contrôle",
"raison",
"efficacité",
"simplicité",
"commodité",
"constant",
"futé",
"sûreté",
"sécurité",
"attentionné",
"proximité",
"sens de l`harmonie",
"tranquillité d`esprit",
"sentiment d`appartenance",
"confiance",
"joie",
"me gâter",
"insouciance",
"soulagement",
"confort",
"relaxation",
"être à l`aise avec moi-même",
"satisfait(e)",
"excitation",
"joie de vivre",
"vitalité",
"plaisir",
"enjoué",
"curiosité",
"être tendance",
"énergie"];



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


const survey_name = "Pringles Trial FCBNY"