const brands = [
    { name: "Listerine", img: "img/Listerine.png" },
    {name:"Therabreath", img:"img/Therabreath.png"},
    {name:"Ecoobix", img:"img/Ecoobix.png"},
    {nam:"BOP", img:"img/BOP.png"},
  ];

const category = "漱口水"

const attributes = ["提升自我", "保护","自信","宽慰", "舒适","内心的平静","竭尽全力","关怀", "效率","轻松自如", "避免尴尬", "实用","安全", "被他人接纳", "控制", "成功","纪律", "简约", "保障", "欢乐", "完美", "对生活的热情", "自豪", "赋能", "乐观","成就", "亲密", "活力", "无忧无虑", "能量", '自由', "精准", "刺激","与时俱进", "勇气","启迪", "原因", "激动","开明", "感官享受","认可", "专长", "改变", "精明", "冒险", "发现", "宠爱自己", "斗志", "冲动", "探索", "不落陈套"]


const pretest_attributes = [
"热",
"冷",
"危险",
"清爽",
"可爱",
"柔软"
];

const pretest_images = [
  {name: "Cat", img: "pretest_img/pretest_cat.png", correct: ["可爱", "柔软"]},
  {name: "Fire", img:"pretest_img/pretest_fire.png", correct:["危险", "热"]}, 
  {name: "Icecube", img: "pretest_img/pretest_icecube.png", correct:["冷", "清爽"]}
]

const pretest_attributes_multiple = ["热", "冷", "危险", "清爽", "可爱", "柔软", "旅行", "兴奋", "精确", "时间", "深", "湿"]

const pretest_images_multiple = [
  {name: "Cat", img: "pretest_img/pretest_cat.png", correct: ["可爱", "柔软"]},
  {name: "Fire", img:"pretest_img/pretest_fire.png", correct:["危险", "热"]}, 
  {name: "Icecube", img: "pretest_img/pretest_icecube.png", correct:["冷", "清爽"]}, 
  {name: "Driving", img: "pretest_img/pretest_driving.png", correct:["旅行", "兴奋"]}, 
  {name: "Ocean", img: "pretest_img/pretest_ocean.png", correct:["深", "湿"]},
  {name: "Clock", img: "pretest_img/pretest_clock.png", correct:["精确", "时间"]}
]


const survey_name = "Listerine_China_"