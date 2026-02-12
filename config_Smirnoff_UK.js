const brands = [
    { name: "Absolut", img: "img/Absolut_logo.png" },
    { name: "AU", img: "img/au_logo.png"}, 
    { name: "Fris", img:"img/fris_logo.svg"}, 
    { name: "Smirnoff", img:"img/Smirnoff_logo.png"},
    { name: "JJ Whitney", img: "img/jj_whitney_logo.png"},
    { name: "Zubrowka", img: "img/Zubrowka.png"},
  ];

const category = "Vodka"
const attributes =[
"adventure",
"freedom",
"courage",
"impulsiveness",
"discovery",
"escape",
"be unconventional",
"open for anything",
"pride",
"perfection",
"recognition",
"success",
"sophistication",
"self-confidence",
"be cool",
"discipline",
"control",
"reason",
"efficiency",
"simplicity",
"expertise",
"a wise choice",
"be savvy",
"safety",
"security",
"caring",
"closeness",
"togetherness",
"familiar",
"belonging",
"feel welcomed",
"joy",
"spoil myself",
"sensuality",
"carefreeness",
"pleasure",
"laugh a lot",
"new experiences",
"naturalness",
"stories with friends",
"satisfaction",
"excitement",
"zest for life",
"inspiration",
"vitality",
"fun",
"be spontaneous",
"break boredom",
"exploration",
"creativity",
"be on trend",
"be in the moment"
]

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

const pretest_attributes_multiple = ["Hot", "Cold", "Dangerous", "Refreshing", "Cute", "Soft", "Travel", "Excitement", "Precise", "Time", "Deep", "Wet"]

const pretest_images_multiple = [
  {name: "Cat", img: "pretest_img/pretest_cat.png", correct: ["Cute", "Soft"]},
  {name: "Fire", img:"pretest_img/pretest_fire.png", correct:["Dangerous", "Hot"]}, 
  {name: "Icecube", img: "pretest_img/pretest_icecube.png", correct:["Cold", "Refreshing"]}, 
  {name: "Driving", img: "pretest_img/pretest_driving.png", correct:["Travel", "Excitement"]}, 
  {name: "Ocean", img: "pretest_img/pretest_ocean.png", correct:["Deep", "Wet"]},
  {name: "Clock", img: "pretest_img/pretest_clock.png", correct:["Precise", "Time"]}
]


const survey_name = "Smirnoff_vodka_UK"