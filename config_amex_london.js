const brands = [
    { name: "Athletic", img:"img/athletic.png" },
    { name: "Bell's Brewery", img:"img/bells.webp" }, 
    { name: "Corona", img:"img/corona-logo.png" }, 
    { name: "Heineken", img:"img/Heineken-Logo.png"},
    { name: "Modelo", img: "img/Modelo-Logo.png"},
    { name: "Peroni", img: "img/peroni_logo.png"},
    {name: "Sierra Nevada", img: "img/Sierra_nevada1.png"},
    {name:"Stella Artois", img:"img/Stella-Artois-Logo.png"}
  ];

const category = "Beer"
const attributes =[
"adventure",
"freedom",
"courage",
"spontaneity",
"discovery",
"distinct",
"unconventional",
"trailblazing",
"risk",
"rebellious",
"makes a statement",
"recognition",
"sophistication",
"achievement",
"self-confidence",
"status",
"empowerment",
"optimization",
"improve myself",
"independence",
"for athletes",
"premium",
"discipline",
"control",
"hand-crafted",
"simplicity",
"be practical",
"expertise",
"mindfulness",
"consistency",
"balance",
"versatile",
"be savvy",
"safety",
"caring",
"togetherness",
"protection",
"peace of mind",
"no trade-offs",
"feel at home",
"belonging",
"acceptance by others",
"responsible",
"avoid embarrassment",
"joy",
"celebration",
"carefreeness",
"pleasure",
"comfort",
"indulge myself",
"relaxation",
"optimism",
"open-mindedness",
"an everyday choice",
"satisfaction",
"excitement",
"vitality",
"fun",
"playfulness",
"individuality",
"exploration",
"curiosity",
"creativity",
"be on trend",
"Experimentation",
"A status choice"
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


const survey_name = "Athletic_Alcoholic_Beers"