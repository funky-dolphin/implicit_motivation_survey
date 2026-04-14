const brands = [
    { name: "Amex", img: "img/Amex_logo.png" },
    { name: "Barclays", img: "img/Barclays_logo.png" }, 
    { name: "HSBC", img:"img/HSBC_logo.png"}, 
    { name: "Klarna", img:"img/Klarna_logo.png"},
    { name: "Mastercard", img: "img/Mastercard_logo.png"},
    { name: "PayPal", img: "img/PayPal_logo.png"},
    {name: "Revolut", img: "img/Revolut_logo.png"},
    {name:"Visa", img:"img/Visa_logo.png"}
  ];

const category = "Banks"
const attributes =[
"bold",
"freedom",
"spontaneity",
"discovery",
"distinct",
"dynamic",
"innovative",
"liberation",
"pride",
"recognition",
"success",
"sophistication",
"ambition",
"status",
"empowerment",
"prosperity",
"control",
"practical",
"simplicity",
"be practical",
"expertise",
"reliability",
"affordability",
"prudence",
"security",
"togetherness",
"integrity",
"peace of mind",
"feel at home",
"belonging",
"guidance",
"commitment",
"joy",
"pamper",
"gratification",
"pleasure",
"indulgeance",
"optimism",
"rewarding",
"satisfaction",
"excitement",
"inspiration",
"vitality",
"stimulation",
"exploration",
"curiosity",
"progress",
"momentum"
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


const survey_name = "Amex_London"