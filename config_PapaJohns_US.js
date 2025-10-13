const brands = [
    { name: "Papa Johns", img: "img/Papa_Johns_logo.png" },
    { name: "Papa Murphy", img: "img/PapaMurphylogo.jpg" }, 
    { name: "Pizza Hut", img:"img/pizzahut.png"}, 
    { name: "Marco's Pizza", img:"img/Marcos_Pizza_Logo.png"},
    { name: "Little Caesars", img: "img/Little-Caesars-Logo.png"},
    { name: "Domino's", img: "img/Dominos.png"}
  ];

const category = "Pizza Delivery"

const attributes =["adventure", "freedom", "courage", "impulsiveness", "discovery", "escape", "Be unconventional", "Dynamic", "recognition", "perfection", "pride", "success", "empowerment", "independence", "Doing my best", "self-confidence", "discipline", "control", "reason", "efficiency", "expertise", "Be practical", "Be savvy", "simplicity", "joy", "carefreeness", "spoil myself", "sensuality", "indulgence", "naturalness", "relief", "satisfaction", "excitement", "zest for life", "inspiration", "Individuality", "exploration", "fun", "creativity", "playfulness", "safety", "security", "caring", "closeness", "belonging", "peace of mind", "Feel at home", "togetherness"]


const pretest_attributes = [
  "Hot", 
  "Cold", 
  "Dangerous",
  "Refreshing", 
  "Cute",
  "Soft"
];


const pretest_images = [
  {name: "Cat", img: "pretest_img/pretest_cat.png", correct: ["Cute", "Soft"]},
  {name: "Fire", img:"pretest_img/pretest_fire.png", correct:["Dangerous", "Hot"]}, 
  {name: "Icecube", img: "pretest_img/pretest_icecube.png", correct:["Cold", "Refreshing"]}
]

const pretest_attributes_multiple = ["Hot", "Cold", "Dangerous", "Refreshing", "Cute", "Soft", "Travel", "Excitement", "Precise", "Time"]

const pretest_images_multiple = [
  {name: "Cat", img: "pretest_img/pretest_cat.png", correct: ["Cute", "Soft"]},
  {name: "Fire", img:"pretest_img/pretest_fire.png", correct:["Dangerous", "Hot"]}, 
  {name: "Icecube", img: "pretest_img/pretest_icecube.png", correct:["Cold", "Refreshing"]}, 
  {name: "Driving", img: "pretest_img/pretest_driving.png", correct:["Travel", "Excitement"]}, 
  {name: "Ocean", img: "pretest_img/pretest_ocean.png", correct:["Deep", "Wet"]},
  {name: "Clock", img: "pretest_img/pretest_clock.png", correct:["Precise", "Time"]}
]


const survey_name = "Papa_Johns_us"