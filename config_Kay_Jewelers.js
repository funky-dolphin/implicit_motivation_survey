const brands = [
    { name: "Brilliant Earth", img: "img/Brilliant_Earth_Logo.png" },
    { name: "Jared", img: "img/Jared_logo.png"}, 
    { name: "Kay Jewelers", img:"img/Kay_logo.png"}, 
    { name: "Kendra Scott", img:"img/kendra_scott_logo.png"},
    { name: "Mejuri", img: "img/mejuri_logo.png"},
    { name: "Pandora", img: "img/Pandora-Logo.png"},
    {name: "Swarovski", img: "img/Swarovski_logo.png"},
    {name:"Zales", img:"img/zales_logo.jpg"}
  ];

const category = "Jewelry"
const attributes =[
"thrilling",
"freedom",
"courage",
"impulsiveness",
"vibrant",
"bold",
"spontaneity",
"journey",
"pride",
"perfection",
"recognition",
"success",
"aspiring",
"prestige",
"status",
"elegance",
"discipline",
"control",
"reason",
"efficiency",
"commitment",
"unpretentious",
"purpose",
"harmony",
"safety",
"security",
"caring",
"closeness",
"belonging",
"longevity",
"trustworthy",
"intimate",
"euphoria",
"treat",
"sensuality",
"carefreeness",
"romance",
"self-expression",
"satisfaction",
"hopefulness",
"excitement",
"zest for life",
"inspiration",
"vitality",
"curiosity", 
"trendy",
"passion",
"breathtaking"
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


const survey_name = "Kay_Jewelers_Survey"