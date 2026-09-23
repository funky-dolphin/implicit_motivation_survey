const brands = [
    { name: "Aetna", img: "img/Aetna.png" },
    { name: "Ambetter", img: "img/ambetter.png" }, 
    { name: "Blue Cross Blue Shield", img:"img/blue cross blue shield.png"}, 
    { name: "Cigna", img:"img/Cigna.png"},
    { name: "Florida Blue", img: "img/Florida Blue.png"},
    { name: "Humana", img: "img/Humana.png"},
    {name: "Oscar", img: "img/Oscar.png"},
    {name:"United Health Care", img:"img/United Health Care.png"}
  ];

const category = "Enterprise Software Solutions"
const category_2 = "Ai Company"
const attributes =[
'Adventure',
'Impulsiveness',
'Escape',
'Fighting spirit',
'Liberation',
'Boldness',
'Vigor',
'Perfection',
'Recognition',
'Achievement',
'Doing my best',
'Status',
'Empowerment',
'Self-Improvement',
'Strong',
'Exclusivity',
'Pragmatic',
'Simplicity',
'Methodical',
'Practical',
'Down to earth',
'Functional',
'Savvy',
'Value',
'Proven',
'Closeness',
'Togetherness',
'Sense of harmony',
'Warm-hearted',
'Feel at home',
'Acceptance by others',
'Dependable',
'Spoil myself',
'Sensuality',
'Pleasure',
'Indulge myself',
'Indulgence',
'Relaxation',
'Naturalness',
'Be at ease with myself',
'Satisfaction',
'Zest for life',
'Fun',
'Playfulness',
'Stimulation',
'Individuality',
'Expression',
'Curiosity',
'Be on trend',
'Energy',
'Vibrant'
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


const survey_name = "SAP_focus"