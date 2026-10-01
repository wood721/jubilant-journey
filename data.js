// ============================================
// 角色数据
// ============================================
const CENTER_ID = "mc";

const characters = [
  {
    id: "mc",
    name: "我（蔷薇）",
    avatar: "",
    role: "忒弥斯律师事务所 律师 / NXX调查组 蔷薇",
    tags: ["主控", "律师", "NXX"],
    personality: ["坚强独立", "正直", "热心肠", "感情上略钢铁直女", "细心"],
    appearance: "黑色长发，气质干净利落。日常多为职业装，工作时干练，私下偏休闲。",
    bio: "毕业于未名大学法律系，任职忒弥斯律师事务所。受左然推荐加入NXX调查组，代号蔷薇。",
    timeline: [
      { time: "幼年", text: "与寄养在家的夏彦一起长大，青梅竹马。" },
      { time: "童年", text: "学小提琴，未名市小提琴比赛金奖。" },
      { time: "中学", text: "初中全级第二（第一是夏彦），高中文科第一。" },
      { time: "大学", text: "父母被选召去封闭试验，开始独居。考入未名大学法律系。" },
      { time: "毕业后", text: "任职忒弥斯律师事务所，加入NXX，代号蔷薇。" },
      { time: "主线第16章", text: "通过中级律师资格考试，晋升中级律师。" }
    ]
  },
  {
    id: "xiayan",
    name: "夏彦",
    avatar: "",
    role: "私家侦探 / 时光古物店店主",
    tags: ["青梅竹马", "侦探", "NXX"],
    personality: ["阳光开朗", "恋爱迟钝", "重情义"],
    appearance: "浅棕色短发，常穿休闲外套。身形修长，眼神温和。",
    bio: "首都大学生物工程硕士。精通追踪、狙击、格斗、战术驾驶、野外生存。",
    timeline: [
      { time: "幼年", text: "寄养在女主家中，与女主青梅竹马。" },
      { time: "少年", text: "离开未名市，加入国家安全部门，执行危险任务。" },
      { time: "离开期间", text: "染病，暗中准备了心形红宝石婚戒，却不敢靠近女主。" },
      { time: "归来后", text: "回到未名市，成为私家侦探，经营时光古物店。" },
      { time: "当前", text: "与杨笑医生保持主治医生关系，参与NXX调查。" }
    ]
  },
  {
    id: "zuoran",
    name: "左然",
    avatar: "",
    role: "忒弥斯律师事务所 首席律师 / 高级合伙人",
    tags: ["律师", "NXX", "搭档"],
    personality: ["绝对理智", "冷静", "严谨", "外冷内热"],
    appearance: "深色短发，常着正装。身形挺拔，气场沉稳。",
    bio: "未名大学法律系博士。职业生涯几乎未尝败绩，99%胜率，被媒体称为没有感情的辩护机器。",
    timeline: [
      { time: "学生时期", text: "师从聂秋教授（未名大学法律系教授、博导），聂秋目前下落不明。" },
      { time: "职业期", text: "成为忒弥斯律师事务所首席律师、高级合伙人。" },
      { time: "当前", text: "推荐女主加入NXX调查组。" }
    ]
  },
  {
    id: "lujinghe",
    name: "陆景和",
    avatar: "",
    role: "和印集团 执行总裁 / 画家Z",
    tags: ["总裁", "画家", "NXX"],
    personality: ["玩世不恭", "叛逆", "真实自我隐藏很深", "聪明"],
    appearance: "浅金/棕色中长发，常带一点艺术家气质。衣着讲究但不拘谨。",
    bio: "和印集团第二继承人。本科毕业于殿堂级艺术学府油画专业，后回未名大学读研。",
    timeline: [
      { time: "少年时期", text: "想弹吉他浪迹天涯，吉他被存进银行多年。" },
      { time: "求学", text: "本科毕业于殿堂级艺术学府油画专业，后回未名大学读研。" },
      { time: "职业期", text: "以画家Z的身份活跃于艺术圈，在翡冷翠成为新锐画家。" },
      { time: "转折", text: "哥哥陆景瀚失踪，不得不挑起家族担子，接任执行总裁。" },
      { time: "当前", text: "同时兼顾总裁、画家、NXX调查组三重身份。" }
    ]
  },
  {
    id: "moyi",
    name: "莫弈",
    avatar: "",
    role: "心理医生 / 未名大学心理系客座教授",
    tags: ["心理医生", "教授", "NXX", "斯沃尔特"],
    personality: ["优雅从容", "游刃有余", "防备心极重", "擅长打造人设"],
    appearance: "银色/浅色长发，气质清冷优雅。常着浅色西装或风衣。",
    bio: "斯沃尔特国王大学心理学院 理学与教育学双荣誉博士。莫氏心理健康研究中心所有人之一。",
    timeline: [
      { time: "幼年", text: "出生于斯沃尔特王国，父亲为哈斯普兰公爵，母亲为未名市书香名门出身。父母因故分离。" },
      { time: "少年", text: "在不幸福的原生家庭中被迫学习强大与伪装，逐渐封闭内心。" },
      { time: "求学", text: "考入斯沃尔特国王大学心理学院，获双荣誉博士学位。" },
      { time: "职业期", text: "成为心理医生，拒绝各方橄榄枝后回到未名市。" },
      { time: "当前", text: "作为NXX调查组成员参与调查。" }
    ]
  },
  {
    id: "chengcheng",
    name: "程澄",
    avatar: "",
    role: "忒弥斯律师事务所 实习律师",
    tags: ["同事", "学妹", "闺蜜"],
    personality: ["活泼", "热心"],
    appearance: "短发，青春干练。",
    bio: "女主的大学学妹，忒弥斯律师事务所同事。",
    timeline: [
      { time: "大学", text: "成为女主的大学学妹。" },
      { time: "毕业后", text: "进入忒弥斯律师事务所，成为实习律师。" }
    ]
  },
  {
    id: "zhaiXing",
    name: "翟星",
    avatar: "",
    role: "忒弥斯律师事务所 创始人 / 高级合伙人",
    tags: ["律所", "上级"],
    personality: ["稳重", "有威望"],
    appearance: "",
    bio: "忒弥斯律师事务所创始人之一，高级合伙人。",
    timeline: []
  },
  {
    id: "nieqiu",
    name: "聂秋",
    avatar: "",
    role: "未名大学法律系 教授 / 博导",
    tags: ["老师", "下落不明"],
    personality: ["学者气质"],
    appearance: "",
    bio: "左然的老师。目前下落不明。",
    timeline: [
      { time: "学生时期", text: "收左然为学生。" },
      { time: "当前", text: "下落不明。" }
    ]
  },
  {
    id: "yangxiao",
    name: "杨笑",
    avatar: "",
    role: "医生",
    tags: ["医生", "夏彦主治医生"],
    personality: ["专业"],
    appearance: "",
    bio: "夏彦的主治医生。",
    timeline: []
  },
  {
    id: "lujinghan",
    name: "陆景瀚",
    avatar: "",
    role: "和印集团 第一继承人 / 总裁",
    tags: ["陆景和哥哥", "总裁"],
    personality: [],
    appearance: "",
    bio: "陆景和的哥哥，和印集团第一继承人，现任总裁，目前不在国内。",
    timeline: []
  },
  {
    id: "wenchen",
    name: "温辰",
    avatar: "",
    role: "陆景和 贴身助理",
    tags: ["助理"],
    personality: ["能力出众", "忠实可靠"],
    appearance: "",
    bio: "陆景和的贴身助理。",
    timeline: []
  },
  {
    id: "haspuran",
    name: "哈斯普兰公爵",
    avatar: "",
    role: "斯沃尔特王国 公爵",
    tags: ["莫弈父亲", "贵族", "军方背景"],
    personality: [],
    appearance: "",
    bio: "莫弈的父亲，实权派贵族，有军方背景，已再婚。",
    timeline: []
  },
  {
    id: "mozijin",
    name: "莫子衿",
    avatar: "",
    role: "未名市 书香名门出身",
    tags: ["莫弈母亲"],
    personality: [],
    appearance: "",
    bio: "莫弈的母亲，未名市书香名门出身。",
    timeline: []
  },
  {
    id: "aogier",
    name: "奥吉尔",
    avatar: "",
    role: "哈斯普兰公爵 原近卫队长 / 管家",
    tags: ["管家"],
    personality: ["忠诚"],
    appearance: "",
    bio: "哈斯普兰公爵原近卫队长，看着莫弈长大。",
    timeline: []
  }
];

// ============================================
// 关系数据
// forwardLabel: from → to 时显示的称呼
// backwardLabel: to → from 时显示的称呼
// ============================================
const relationships = [
  { from: "mc", to: "xiayan", forwardLabel: "青梅竹马", backwardLabel: "青梅竹马", type: "亲情", note: "彼此有深厚羁绊，夏彦暗恋女主。" },
  { from: "mc", to: "zuoran", forwardLabel: "搭档", backwardLabel: "搭档", type: "工作", note: "左然是女主的推荐人和搭档。" },
  { from: "mc", to: "lujinghe", forwardLabel: "委托关系", backwardLabel: "代理律师", type: "工作", note: "陆景和曾请女主做代理律师。" },
  { from: "mc", to: "moyi", forwardLabel: "工作伙伴", backwardLabel: "工作伙伴", type: "工作", note: "NXX及日常工作中合作。" },
  { from: "mc", to: "chengcheng", forwardLabel: "闺蜜/学姐", backwardLabel: "闺蜜/学妹", type: "友情", note: "大学学妹，律所同事。" },

  { from: "zuoran", to: "nieqiu", forwardLabel: "学生", backwardLabel: "老师", type: "师生", note: "聂秋是左然的老师，下落不明。" },
  { from: "zuoran", to: "zhaiXing", forwardLabel: "合伙人", backwardLabel: "合伙人", type: "工作", note: "同所高级合伙人。" },
  { from: "zuoran", to: "chengcheng", forwardLabel: "上级", backwardLabel: "下属", type: "工作", note: "程澄是实习律师。" },

  { from: "xiayan", to: "yangxiao", forwardLabel: "病人", backwardLabel: "主治医生", type: "医疗", note: "杨笑是夏彦的主治医生。" },

  { from: "lujinghe", to: "lujinghan", forwardLabel: "弟弟", backwardLabel: "哥哥", type: "血亲", note: "陆景瀚是哥哥，第一继承人。" },
  { from: "lujinghe", to: "wenchen", forwardLabel: "雇主", backwardLabel: "助理", type: "工作", note: "温辰是贴身助理。" },

  { from: "moyi", to: "haspuran", forwardLabel: "儿子", backwardLabel: "父亲", type: "血亲", note: "哈斯普兰公爵，实权贵族。" },
  { from: "moyi", to: "mozijin", forwardLabel: "儿子", backwardLabel: "母亲", type: "血亲", note: "莫子衿，书香名门出身。" },
  { from: "moyi", to: "aogier", forwardLabel: "少爷", backwardLabel: "管家", type: "主仆", note: "奥吉尔看着莫弈长大。" }
];

// 关系类型 → 颜色（关系图用）
const REL_COLORS = {
  "亲情": "#e08a8a",
  "工作": "#8aa8d8",
  "友情": "#8ac8a0",
  "师生": "#c8a0d8",
  "医疗": "#7ac8c8",
  "血亲": "#e0a0a0",
  "主仆": "#b8a888",
  "默认": "#c0b8b0"
};
