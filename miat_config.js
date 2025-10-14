const brands = [
    { name: "PRINGLES", img: "img/pringles1.png" },
    { name: "LAYS", img: "img/lays1.png" }, 
    { name: "RITZ", img:"img/ritz1.png"}, 
    { name: "DORITOS", img:"img/doritos1.png"},
    { name: "TAKIS", img: "img/takis1.png"}
  ];

const category = "Salty Snacks"

const attributes = ["adventure", "freedom", "courage", "impulsiveness", "discovery", "escape", "be unconventional", "be rebellious", "spontaneity", "pride", "perfection", "recognition", "success", "sophistication", "achievement", "self-confidence", "status", "uniqueness", "discipline", "control", "reason", "efficiency", "simplicity", "be practical", "expertise", "be down to earth", "routine", "safety", "security", "caring", "closeness", "togetherness", "feel at home", "belonging", "avoid embarrassment", "joy", "spoil myself", "sensuality", "carefreeness", "pleasure", "comfort", "indulge myself", "relaxation", "excitement", "zest for life", "inspiration", "vitality", "fun", "playfulness", "individuality", "creativity", "energy"];

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


const survey_name = "Pringles Trial FCBNY"