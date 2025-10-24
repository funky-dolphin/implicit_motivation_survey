const brands = [
    { name: "Neutrogena", img: "" },
    { name: "L'Oreal", img: "" }, 
    { name: "La Roche-Posay", img:""}, 
    { name: "CeraVe", img:""},
    { name: "Balea", img: ""},
    { name: "Nø Cosmetics", img: ""},
    { name: "Mixa", img: ""},
    { name: "Keine der oben genannten", img: ""}
  ];

const category = ""

const attributes = ["Improve myself", "protection", "self-confidence", "relief", "comfort", "peace of mind", "doing my best", "caring", "efficiency", "be at ease with myself", "avoid", "embarrassment", "be practical", "safety", "acceptance by others", "control", "success", "discipline", "simplicity", "security", "joy", "perfection", "zest for life", "pride", "empowerment", "optimisim", "achievement", "closeness", "vitality", "carefreeness", "energy", "freedom", "precision", "stimulation", "dynamic", "courage", "inspiration", "reason", "excitement", "open-mindedness", "sensuality", "recognition", "expertise", "change", "be savvy", "adventure", "discovery", "spoil myself", "fighting spirit", "impulsiveness", "exploration", "be unconventional"]


const pretest_attributes = [
  "Heiß", 
  "Kalt", 
  "Gefährlich",
  "Erfrischend", 
  "Niedlich",
  "Weich"
];


const pretest_images = [
  {name: "Cat", img: "pretest_img/pretest_cat.png", correct: ["Niedlich", "Weich"]},
  {name: "Fire", img:"pretest_img/pretest_fire.png", correct:["Gefährlich", "Heiß"]}, 
  {name: "Icecube", img: "pretest_img/pretest_icecube.png", correct:["Kalt", "Erfrischend"]}
]

const pretest_attributes_multiple = ["Heiß", "Kalt", "Gefährlich", "Erfrischend", "Niedlich", "Weich", "Reisen", "Aufregung", "Präzise", "Zeit", "Tief", "Nass"]

const pretest_images_multiple = [
  {name: "Cat", img: "pretest_img/pretest_cat.png", correct: ["Niedlich", "Weich"]},
  {name: "Fire", img:"pretest_img/pretest_fire.png", correct:["Gefährlich", "Heiß"]}, 
  {name: "Icecube", img: "pretest_img/pretest_icecube.png", correct:["Kalt", "Erfrischend"]}, 
  {name: "Driving", img: "pretest_img/pretest_driving.png", correct:["Reisen", "Aufregung"]}, 
  {name: "Ocean", img: "pretest_img/pretest_ocean.png", correct:["Tief", "Nass"]},
  {name: "Clock", img: "pretest_img/pretest_clock.png", correct:["Precise", "Time"]}
]


const survey_name = "Listerine_UK"