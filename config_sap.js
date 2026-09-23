const brands = [
    { name: "Microsoft", img: "img/microsoft_logo.png" },
    { name: "Netsuite", img: "img/netsuite_logo.png" }, 
    { name: "Oracle", img:"img/oracle-logo.png"}, 
    { name: "Palantir", img:"img/palantir_logo.png"},
    { name: "Rippling", img: "img/rippling_logo.png"},
    { name: "Salesforce", img: "img/salesforce_logo.png"},
    {name: "SAP", img: "img/SAP_logo.png"},
    {name:"Service Now", img:"img/servicenow_logo.png"},
    {name:"Workday", img:"img/workday_logo.png"}
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