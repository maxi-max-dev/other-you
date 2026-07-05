// 最小样例数据 —— 仅供前端开发/渲染自测用，字段以 SCHEMA.md 为准。只读，不要修改。
window.SANDBOX_DATA = {
  meta: {
    title: "样例：毕业季的三岔口",
    decision: "接 A 公司实习 offer，还是等 B 公司终面，还是全职打磨作品集到秋招？",
    profileTier: "persona",
    profileName: "虚拟人设：小林",
    spanDays: 90,
    startDate: "2026-07-01",
    disclaimer: "这是可能性的戏剧化演出，不是预测",
    tags: [],
    hint: "2~4 个选项对比效果最佳",
    generatedAt: "2026-07-06"
  },
  dimensions: [
    { id: "energy", name: "精力", icon: "⚡" },
    { id: "money", name: "钱", icon: "💰" },
    { id: "skill", name: "技能", icon: "🛠" },
    { id: "options", name: "选项数", icon: "🚪" }
  ],
  timelines: [
    {
      id: "A",
      choice: "接 A 公司实习",
      subtitle: "先上车再说",
      isRealHistory: false,
      scene: "corporate",
      baseline: { energy: 6, money: 3, skill: 5, options: 5 },
      events: [
        { day: 2, date: "2026-07-03", type: "机会", title: "入职第一周", summary: "被拉进核心项目群，节奏比想象快。", reasoning: "小林简历里的原型能力被 mentor 注意到，直接派了活。新人期的表现窗口通常在前两周。", effects: { energy: -1, skill: 1 } },
        { day: 30, date: "2026-07-31", type: "挫折", title: "需求被砍", summary: "做了三周的功能整个下线。", reasoning: "大组织的优先级随季度目标漂移，实习生的项目最容易成为缓冲区。这与个人表现无关，但很消耗心气。", effects: { energy: -2, options: -1 } },
        { day: 75, date: "2026-09-13", type: "转折", title: "转正名额确认", summary: "组里放出一个转正 HC，mentor 提名了小林。", reasoning: "前两个月的两次快速交付攒下了信任，秋招季组里缺人手，时机和表现叠加。", effects: { money: 2, options: 2, energy: 1 } }
      ],
      finale: { gave: "一段真实的大厂履历和一个转正选项。", took: "三个月里几乎没有自己的时间。", surprise: "最大的收获不是技能，是知道了自己讨厌什么样的会议。" }
    },
    {
      id: "B",
      choice: "全职做作品集",
      subtitle: "赌一把秋招",
      isRealHistory: false,
      scene: "home",
      baseline: { energy: 7, money: 2, skill: 5, options: 4 },
      events: [
        { day: 5, date: "2026-07-06", type: "机会", title: "第一个 demo 上线", summary: "小工具发帖后有了第一批真实用户。", reasoning: "没有通勤和会议，产出速度是实习状态的两倍。发布带来的正反馈形成了节奏。", effects: { skill: 1, energy: 1 } },
        { day: 40, date: "2026-08-10", type: "意外", title: "存款告急", summary: "房租续约涨价，预算表变红。", reasoning: "没有收入的第二个月，固定成本的复利开始显形。这是全职间隔期最常被低估的变量。", effects: { money: -2, energy: -1 } },
        { day: 82, date: "2026-09-20", type: "转折", title: "作品集敲开面试", summary: "两家 AI 公司主动约了聊。", reasoning: "三个月三个可玩 demo 在秋招简历池里是稀缺信号，作品本身开始替人说话。", effects: { options: 3, energy: 1 } }
      ],
      finale: { gave: "三个能拿出手的作品和两个主动来的面试。", took: "存款见底带来的每一夜焦虑。", surprise: "真正投简历时，发现最有用的作品是当初随手做的那个。" }
    }
  ],
  optionC: { title: "你没想过的 Option C", text: "跟 A 公司谈一个「延迟一个月入职」：先冲刺 30 天作品集再上车，两头都不放。" }
};
