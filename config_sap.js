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

const category = "Enterprise Applications & Software"
const category_2 = "AI"
const attributes =[
'Freedom',
'Courage',
'Discovery',
'Unconventional',
'Dynamic',
'Risk',
'Resilience',
'Possibility',
'Experimentation',
'Pride',
'Success',
'Sophistication',
'Confidence',
'Optimization',
'Powerful',
'Enablement',
'Aspiration',
'Growth',
'Joy',
'Carefreeness',
'Relief',
'Optimism',
'Open-mindedness',
'Reassurance',
'Contentment',
'Discipline',
'Control',
'Reason',
'Effective',
'Expertise',
'Order',
'Precision',
'Efficiency',
'Safety',
'Trusted',
'Caring',
'Protection',
'Peace of mind',
'Belonging',
'Security',
'Trust',
'Certainty',
'Excitement',
'Inspiration',
'Vitality',
'Exploration',
'Anticipation',
'Change',
'Creativity',
'Velocity'
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