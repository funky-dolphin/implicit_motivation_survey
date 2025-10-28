const brands = [
    { name: "Neutrogena", img: "img/Neutrogena.png" },
    { name: "cicacrucure", img: "img/cicacrucure.png"}, 
    { name: "La Roche-Posay", img:"img/La_Roche-Posay.png"}, 
    { name: "CeraVe", img:"img/cerave.png"},
    { name: "Nivea", img: "img/nivea.png"},
    { name: "Natura", img: "img/natura.png"},
    { name: "Vichy", img: "img/Vichy.png"},
    { name: "Avon", img: "img/avon.png"},
  ];

const category = "Cuidados Com a Pele"

//const attributes = ["Improve myself", "protection", "self-confidence", "relief", "comfort", "peace of mind", "doing my best", "caring", "efficiency", "be at ease with myself", "avoid embarrassment", "be practical", "safety", "acceptance by others", "control", "success", "discipline", "simplicity", "security", "joy", "perfection", "zest for life", "pride", "empowerment", "optimisim", "achievement", "closeness", "vitality", "carefreeness", "energy", "freedom", "precision", "stimulation", "dynamic", "courage", "inspiration", "reason", "excitement", "open-mindedness", "sensuality", "recognition", "expertise", "change", "be savvy", "adventure", "discovery", "spoil myself", "fighting spirit", "impulsiveness", "exploration", "be unconventional"]
const attributes = [
"aventura",
"liberdade",
"coragem",
"impulsividade",
"descoberta",
"espírito de combate",
"dinâmico",
"orgulho",
"perfeição",
"reconhecimento",
"sucesso",
"sofisticação",
"fazendo o meu melhor",
"autoconfiança",
"empoderamento",
"minha melhor versão",
"disciplina",
"controle",
"razão",
"eficiência",
"simplicidade",
"expertise",
"seja perspicaz",
"Estabilidade",
"segurança",
"cuidado",
"proximidade",
"proteção",
"paz de espírito",
"aceitação pelos outros",
"evite constrangimento",
"alegria",
"mimar-me",
"sensualidade",
"descontração",
"prazer",
"conforto",
"otimismo",
"naturalidade",
"estar à vontade comigo mesmo",
"empolgação",
"gosto pela vida",
"inspiração",
"vitalidade",
"diversão",
"ser tendência",
"rejuvenescimento",
"refresco",
];

const pretest_attributes = [
  "Quente", 
  "Frio", 
  "Perigoso",
  "Refrescante", 
  "Fofo",
  "Macio"
];


const pretest_images = [
  {name: "Cat", img: "pretest_img/pretest_cat.png", correct: ["Fofo", "Macio"]},
  {name: "Fire", img:"pretest_img/pretest_fire.png", correct:["Perigoso", "Quente"]}, 
  {name: "Icecube", img: "pretest_img/pretest_icecube.png", correct:["Frio", "Refrescante"]}
]

const pretest_attributes_multiple = ["Quente", "Frio", "Perigoso", "Refrescante", "Fofo", "Macio", "Viagem", "Empolgação", "Preciso", "Tempo", "Profundo", "Molhado"]

const pretest_images_multiple = [
  {name: "Cat", img: "pretest_img/pretest_cat.png", correct: ["Fofo", "Macio"]},
  {name: "Fire", img:"pretest_img/pretest_fire.png", correct:["Perigoso", "Quente"]}, 
  {name: "Icecube", img: "pretest_img/pretest_icecube.png", correct:["Frio", "Refrescante"]}, 
  {name: "Driving", img: "pretest_img/pretest_driving.png", correct:["Viagem", "Empolgação"]}, 
  {name: "Ocean", img: "pretest_img/pretest_ocean.png", correct:["Profundo", "Molhado"]},
  {name: "Clock", img: "pretest_img/pretest_clock.png", correct:["Preciso", "Tempo"]}
]


const survey_name = "Neutrogena_BRA"