const brands = [
    { name: "Burger King", img: "img/Burger_King_logo.png" },
    { name: "Chipotle", img: "img/Chipotle_logo.png"}, 
    { name: "Jersey Mikes", img:"img/Jersey_Mikes_logo.png"}, 
    { name: "Jimmy Johns", img:"img/jimmyjohns_logo.png"},
    { name: "KFC", img: "img/KFC_logo.png"},
    { name: "McDonalds", img: "img/McDonalds_logo.png"},
    {name: "Pizza Hut", img: "img/pizza_hut_logo.png"},
    {name:"Subway", img:"img/Subway_logo.png"}
  ];

const category = "Quick Service Restaurants"
const attributes =[
"adventure",
"freedom",
"bold",
"impulsiveness",
"discovery",
"unexpected",
"dynamic"
// "pride",
// "perfection",
// "recognition"
// "success",
// "sophistication",
// "smart",
// "crafted",
// "improve myself",
// "nutritious",
// "discipline",
// "control",
// "reason",
// "efficiency",
// "realiable",
// "convenience",
// "expertise",
// "consistent",
// "safety",
// "security",
// "caring",
// "something for everyone",
// "real",
// "trusted",
// "wholesome",
// "transparent",
// "joy",
// "uplifting",
// "makes you feel good",
// "something easy",
// "comfort",
// "indulgence",
// "rewarding",
// "natural",
// "embracing every moment",
// "excitement",
// "inspiration",
// "vitality",
// "fueling",
// "change",
// "energizing",
// "freshness"
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

const pretest_attributes_multiple = ["Hot", "Cold", "Dangerous", "Refreshing", "Cute", "Soft", "Travel", "Excitement", "Precise", "Time"]

const pretest_images_multiple = [
  {name: "Cat", img: "pretest_img/pretest_cat.png", correct: ["Cute", "Soft"]},
  {name: "Fire", img:"pretest_img/pretest_fire.png", correct:["Dangerous", "Hot"]}, 
  {name: "Icecube", img: "pretest_img/pretest_icecube.png", correct:["Cold", "Refreshing"]}, 
  {name: "Driving", img: "pretest_img/pretest_driving.png", correct:["Travel", "Excitement"]}, 
  {name: "Ocean", img: "pretest_img/pretest_ocean.png", correct:["Deep", "Wet"]},
  {name: "Clock", img: "pretest_img/pretest_clock.png", correct:["Precise", "Time"]}
]


const survey_name = "Executive_Demo_Paris"