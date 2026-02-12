const brands = [
    { name: "Absolute Sprite", img: "img/absolut_sprite.gif" },
    { name: "AU", img: "img/AU_logo.png"}, 
    { name: "Buzzball", img:"img/buzzball_logo.png"}, 
    { name: "Smirnoff Ice", img:"img/smirnoff_ice_logo.png"},
    { name: "Funkin", img: "img/funkin_cocktails_logo.png"},
    { name: "Jack Daniels and Coke", img: "img/jackdaniels_coke_logo.gif"},
    {name: "Moth", img: "img/moth_logo.png"},
    {name:"Suntory", img:"img/suntory_logo.jpg"}
  ];

const category = "Ready to Drink Alcohol"
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


const survey_name = "Smirnoff_RTD_Survey_UK"