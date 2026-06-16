const brands = [
    { name: "Athletic", img: "img/athletic.png" },
    { name: "Best Day", img: "img/Best_Day_Logo.png" }, 
    { name: "Corona Cero", img:"img/Corona_Cero_Logo_Blue.jpg" }, 
    { name: "Heineken", img:"img/heineken_00.png"},
    { name: "Micholob Ultra", img: "img/MicUltraZero.png"},
    { name: "Peroni", img: "img/peroni_0.webp"},
    {name: "Sierra Nevada", img: "img/sierra_nevada.png "},
    {name:"Stella Artois", img:"img/stella_0.png"}
  ];

const category = "Non-Alcoholic Beers"
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
"experimentation",
"a status choice"
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
  {name: "Ice cube", img: "pretest_img/pretest_icecube.png", correct:["Cold", "Refreshing"]}
]

const pretest_attributes_multiple = ["Hot", "Cold", "Dangerous", "Refreshing", "Cute", "Soft", "Travel", "Excitement", "Precise", "Time"]

const pretest_images_multiple = [
  {name: "Cat", img: "pretest_img/pretest_cat.png", correct: ["Cute", "Soft"]},
  {name: "Fire", img:"pretest_img/pretest_fire.png", correct:["Dangerous", "Hot"]}, 
  {name: "Ice cube", img: "pretest_img/pretest_icecube.png", correct:["Cold", "Refreshing"]}, 
  {name: "Driving", img: "pretest_img/pretest_driving.png", correct:["Travel", "Excitement"]}, 
  {name: "Ocean", img: "pretest_img/pretest_ocean.png", correct:["Deep", "Wet"]},
  {name: "Clock", img: "pretest_img/pretest_clock.png", correct:["Precise", "Time"]}
]


const survey_name = "Athletic Non-Alcoholic Beers"