const brands = [
    { name: "Bobs Red Mill", img: "img/bobs_red_mill_logo.png" },
    { name: "Cherrios", img: "img/Cherrios_logo.png"}, 
    { name: "Chobani", img:"img/Chobani_logo.png"}, 
    { name: "Eggo", img:"img/eggo_logo.png"},
    { name: "Jimmy Dean", img: "img/jimmy_dean1.png"},
    { name: "Kodiak", img: "img/Kodiak_logo.jpg"},
    {name: "Quaker Oats", img: "img/Quaker_Oats_logo.png"},
    {name:"Purely Elizabeth", img:"img/purely_elizabeth.png"}
  ];

const category = "Breakfast"

const attributes =[
"adventure",
"freedom",
"courage",
"impulsiveness",
"discovery",
"escape",
"be unconventional",
"dynamic",
"be rebellious",
"pride",
"perfection",
"recognition",
"doing my best",
"optimization",
"improve myself",
"strong",
"discipline",
"control",
"reason",
"efficiency",
"simplicity",
"be practical",
"be down to earth",
"functional",
"be savvy",
"security",
"caring",
"closeness",
"togetherness",
"protection",
"peace of mind",
"feel at home",
"belonging",
"joy",
"carefreeness",
"pleasure",
"comfort",
"indulge myself",
"optimism",
"naturalness",
"excitement",
"zest for life",
"inspiration",
"vitality",
"fun",
"playfulness",
"individuality",
"energy"]

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


const survey_name = "Oats HH with kids"