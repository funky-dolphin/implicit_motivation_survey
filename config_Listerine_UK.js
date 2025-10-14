const brands = [
    { name: "Listerine", img: "img/Listerine.png" },
    { name: "Aquafresh", img: "img/Aquafresh.png" }, 
    { name: "Colgate", img:"img/Colgate.png"}, 
    { name: "Corsodyl", img:"img/Corsodyl.png"},
    { name: "Dentyl", img: "img/dentyl.png"},
    { name: "Oral-B", img: "img/OralB.png"},
    { name: "Sensodyne", img: "img/Sensodyne.png"},
    { name: "TePe", img: "img/tepe.png"}
  ];

const category = "Mouthwash"

const attributes = ["Improve myself", "protection", "self-confidence", "relief", "comfort", "peace of mind", "doing my best", "caring", "efficiency", "be at ease with myself", "avoid", "embarrassment", "be practical", "safety", "acceptance by others", "control", "success", "discipline", "simplicity", "security", "joy", "perfection", "zest for life", "pride", "empowerment", "optimisim", "achievement", "closeness", "vitality", "carefreeness", "energy", "freedom", "precision", "stimulation", "dynamic", "courage", "inspiration", "reason", "excitement", "open-mindedness", "sensuality", "recognition", "expertise", "change", "be savvy", "adventure", "discovery", "spoil myself", "fighting spirit", "impulsiveness", "exploration", "be unconventional"]


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


const survey_name = "Listerine_UK"