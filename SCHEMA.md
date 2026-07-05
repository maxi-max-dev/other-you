# 数据契约（v0.1 运行库版，三方共用，改动必须先改这里）

## 运行库结构（v0.1 起，替代单一 data.js）

沙盘支持多份推演并存，`index.html` 打开先进「选档案」页。文件组织：

```
runs/
  manifest.js        # 公开清单（进 git）
  real-manifest.js   # 真实自我清单（gitignore，本机才有，页面加载失败静默跳过）
  <run-id>.js        # 每份推演一个文件（真实自我的放 runs/real/ 下，gitignore）
  real/<run-id>.js
```

`manifest.js` / `real-manifest.js` 都是追加式注册：

```js
window.SANDBOX_LIBRARY = window.SANDBOX_LIBRARY || { runs: [] };
window.SANDBOX_LIBRARY.runs.push(
  { id: "musk-1995", tier: "celebrity", title: "马斯克 1995：斯坦福门口",
    subtitle: "退学创办 Zip2 / 留校读博 / 去 Netscape", file: "runs/musk-1995.js", generatedAt: "2026-07-06" }
);
```

每份推演文件 `runs/<run-id>.js`（惰性加载，选中才注入 script）：

```js
window.SANDBOX_RUNS = window.SANDBOX_RUNS || {};
window.SANDBOX_RUNS["musk-1995"] = { meta: {...}, dimensions: [...], timelines: [...], optionC: {...} };
```

推演对象本体的字段契约见下（与旧 window.SANDBOX_DATA 完全同构）。tier 枚举 = `real / persona / celebrity`，与 meta.profileTier 一致。

## 推演对象顶层结构

```js
window.SANDBOX_DATA = {
  meta: { ... },
  dimensions: [ ... ],   // 固定 4 个，见下
  timelines: [ ... ],    // N 条，引擎无上限
  optionC: { ... }       // 全局一个
};
```

## meta

| 字段 | 类型 | 说明 |
|---|---|---|
| title | string | 决定的短标题，如「1995 年夏，斯坦福门口」 |
| decision | string | 决定原文，1~2 句 |
| profileTier | `"real" \| "persona" \| "celebrity"` | 输入档案档位 |
| profileName | string | 如「Elon Musk（1995）」「虚拟人设：小林」 |
| spanDays | number | 30 / 90 / 180，默认 90 |
| startDate | string | ISO 日期，如 "1995-06-15" |
| disclaimer | string | 固定文案：「这是可能性的戏剧化演出，不是预测」 |
| tags | string[] | celebrity 档必须含「虚构推演 · 娱乐向」 |
| hint | string | 固定文案：「2~4 个选项对比效果最佳」 |
| generatedAt | string | 生成日期 ISO |

## dimensions（固定 4 个，顺序固定）

```js
[
  { id: "energy",  name: "精力",   icon: "⚡" },
  { id: "money",   name: "钱",     icon: "💰" },
  { id: "skill",   name: "技能",   icon: "🛠" },
  { id: "options", name: "选项数", icon: "🚪" }
]
```

数值范围 0~10。每条线有 baseline，事件通过 effects 增减，前端负责累加并 clamp 到 [0,10]。

## timelines[i]

| 字段 | 类型 | 说明 |
|---|---|---|
| id | string | "A" / "B" / "C" ... |
| choice | string | 选项短语，≤15 字，如「退学创办 Zip2」 |
| subtitle | string? | 可选一句补充 |
| isRealHistory | boolean | 名人回测中=真实选择的那条线为 true，其余 false |
| scene | string | 像素世界场景，枚举：`campus / startup / corporate / home / city / travel` |
| baseline | object | 4 维初始值，如 `{ energy: 7, money: 2, skill: 6, options: 5 }` |
| events | Event[] | **15~25 个**，按 day 升序 |
| finale | object | `{ gave, took, surprise }` 三个 string：给了你什么 / 拿走了什么 / 最大的意外 |

## Event

| 字段 | 类型 | 说明 |
|---|---|---|
| day | number | 0 ≤ day < spanDays，整数 |
| date | string | ISO 日期（startDate + day） |
| type | string | 枚举：`机会 / 挫折 / 意外 / 转折` |
| title | string | ≤12 字 |
| summary | string | 一句话 |
| reasoning | string | 「为什么会发生」：基于档案真实处境的因果链，2~4 句 |
| effects | object | 维度增减，整数 -3~+3，可省略无变化的维度，如 `{ money: -2, skill: +1 }` |
| realityCheck | string? | 可选，仅回测线：「史实对照：……」 |

## optionC

```js
{ title: "你没想过的 Option C", text: "……" }
```

## 质量红线（生成数据时必须遵守）

1. 事件 reasoning 必须引用档案里的真实处境，禁止星座运势式的空话。
2. 措辞永远是「可能」「或许」，绝不写成预测或建议。
3. celebrity 档：在世人物不做负面杜撰，虚构线走「合理但娱乐向」。
4. effects 要让状态面板动起来：每条线全程每个维度至少变化 3 次。
