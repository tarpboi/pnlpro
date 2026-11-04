import { Fragment, type ReactNode } from 'react';
import { useLang, LOCALES, type Lang } from './i18n';

// Render a translatable template string with {token} placeholders, injecting
// ReactNode `parts` at each token. Lets interpolated copy be localized as plain
// strings (translators keep the {tokens}).
export function interp(template: string, parts: Record<string, ReactNode>): ReactNode {
  const nodes: ReactNode[] = [];
  const re = /\{(\w+)\}/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(template)) !== null) {
    if (m.index > last) nodes.push(template.slice(last, m.index));
    nodes.push(<Fragment key={i++}>{parts[m[1]] ?? ''}</Fragment>);
    last = m.index + m[0].length;
  }
  if (last < template.length) nodes.push(template.slice(last));
  return <>{nodes}</>;
}

interface Spec {
  label: string;
  value: string;
}

interface BotContent {
  title: string;
  tagline: string;
  hook: string;
  description: string;
  specs: Spec[];
}


interface Feature {
  icon: string;
  title: string;
  body: string;
}

interface Layer {
  icon: string;
  title: string;
  body: string;
  accent: string;
}

interface Metric {
  metric: string;
  label: string;
}

interface LadderStep {
  stage: string;
  action: string;
}

interface Pillar {
  title: string;
  body: string;
}

interface Stat {
  label: string;
  value: string;
  unit: string;
}

interface ManagedFeature {
  icon: string;
  title: string;
  body: string;
}

interface ManagedStat {
  value: string;
  label: string;
}

export interface Messages {
  langName: { en: string; zh: string; ru: string };
  nav: {
    strategies: string;
    managed: string;
    venues: string;
    engine: string;
    safety: string;
    blog: string;
    contact: string;
    github: string;
    telegram: string;
    langSwitch: string;
  };
  venues: {
    eyebrow: string;
    headline: string;
    description: string;
    cardCta: string;
    footnote: string;
    footnoteCta: string;
  };
  managed: {
    eyebrow: string;
    headline: string;
    description: string;
    statusNote: string;
    stats: ManagedStat[];
    featuresTitle: string;
    features: ManagedFeature[];
  };
  hero: {
    badge: string;
    headlineLine1: string;
    headlineLine2: string;
    description: string;
    ctaGithub: string;
    stats: Stat[];
  };
  liveSignal: {
    eyebrow: string;
    headline: string;
    sub: string;
    statusLive: string;
    statusOffline: string;
    statusConnecting: string;
    pair: string;
    sessionLabel: string;
    footnote: string;
    attribution: string;
  };
  bots: {
    eyebrow: string;
    headline: string;
    description: string;
    statusProduction: string;
    statusDev: string;
    cardCta: string;
    cardCtaSuffix: string;
    items: Record<string, BotContent>;
  };
  engine: {
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    description: string;
    features: Feature[];
    performanceEyebrow: string;
    performanceHeadline: string;
    metrics: Metric[];
  };
  safety: {
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    description: string;
    layers: Layer[];
    ladderTitle: string;
    ladderSubtitle: string;
    ladder: LadderStep[];
  };
  howItWorks: {
    eyebrow: string;
    headline: string;
    description: string;
    steps: { num: string; title: string; body: string }[];
    getTitle: string;
    gets: string[];
    note: string;
    cta: string;
  };
  cta: {
    eyebrow: string;
    headline: string;
    description: string;
    ctaTelegram: string;
    ctaGithub: string;
    pillars: Pillar[];
  };
  footer: {
    productName: string;
    tagline: string;
    disclaimerLabel: string;
    disclaimer: string;
    rights: string;
  };
}

const full: Record<'en' | 'zh' | 'ru', Messages> = {
  en: {
    langName: { en: 'English', zh: '简体中文', ru: 'Русский' },
    nav: {
      strategies: 'Strategies',
      managed: 'Managed',
      venues: 'Venues',
      engine: 'Engine',
      safety: 'Safety',
      blog: 'Blog',
      contact: 'Contact',
      github: 'GitHub',
      telegram: 'Telegram',
      langSwitch: 'Language',
    },
    venues: {
      eyebrow: 'Venue Coverage',
      headline: 'One engine. Every venue.',
      description:
        "The engine is venue-agnostic — any platform with an order book or position feed plugs in through a single adapter. Twenty-one venues have a dedicated bot repo, spanning crypto-native exchanges and regulated brokerages.",
      cardCta: 'Open repo →',
      footnote:
        "Want a venue prioritized? Adapter work is demand-driven — if you trade a platform that matters to you, it can move up the queue.",
      footnoteCta: 'Request a venue →',
    },
    managed: {
      eyebrow: 'Managed & Copy-Trading',
      headline: "Don't want to run infrastructure? Let us.",
      description:
        'Trade the same engine as a service. Open a managed account, pick a proven leader from the on-chain leaderboard or a strategy, and let the hosted bots run — you watch balance, P&L, and fees on a live dashboard.',
      statusNote:
        "⏸️ The hosted service is currently closed. It ran as a paper-trading beta — simulated funds, never real custody — and never handled real money. The open-source engine is the supported way to use this today: your keys, your wallet, dry-run by default.",
      stats: [
        { value: '520+', label: 'GitHub stars' },
        { value: '21', label: "Venues" },
        { value: '1 / 10', label: "Strategies live" },
        { value: 'Dry-run', label: "By default" },
      ],
      featuresTitle: 'What you get',
      features: [
        { icon: '📈', title: 'On-chain leaderboard', body: 'Real Polymarket wallets ranked by verifiable on-chain P&L (profit or volume, 1d/7d/30d/all-time). One click to copy a proven trader.' },
        { icon: '🤖', title: 'Hosted strategy bots', body: 'The same execution engine, run for you. No keys, no servers, no ops.' },
        { icon: '💰', title: 'Cross-venue arbitrage', body: 'Live pricing across Polymarket ↔ Kalshi ↔ PredictIt, with Manifold as a play-money consensus signal.' },
        { icon: '🛡️', title: 'Same safety layer', body: 'Circuit breaker, depth guard, trade floor — the guardrails from the open-source engine, applied to every managed account.' },
      ],
    },
    hero: {
      badge: 'Open source · self-custody · dry-run by default',
      headlineLine1: 'Copy proven traders.',
      headlineLine2: 'Profit on autopilot.',
      description:
        "An open-source Rust engine for {predictfun}, {polymarket}, {kalshi}, {limitless} and 17 more prediction-market venues — one execution core, one risk layer. All ten strategies run on Predict.fun in dry run, and Copy Trading on Polymarket is updated for CLOB V2. No live order has been tested yet. Your keys, your wallet, dry-run by default.",
      ctaGithub: 'View on GitHub',
      stats: [
        { label: 'Order execution', value: '< 100ms', unit: 'end-to-end' },
        { label: 'Event processing', value: '< 1ms', unit: 'per event' },
        { label: 'Memory baseline', value: '~50MB', unit: 'resident' },
        { label: 'CPU under load', value: '< 5%', unit: 'modern hw' },
      ],
    },
    liveSignal: {
      eyebrow: 'Live signal',
      headline: 'BTC/USDT — the market the bots watch',
      sub: 'Real-time spot price, streamed directly from the order book.',
      statusLive: 'Live',
      statusOffline: 'Offline',
      statusConnecting: 'Connecting',
      pair: 'BTC / USDT',
      sessionLabel: '· session',
      footnote:
        "Source: {source}. Polymarket's BTC Up/Down markets resolve against {chainlink}, which aggregate from Binance, Coinbase, Kraken, and other major venues — so what you see here is a faithful real-time proxy for the price the bots trade against.",
      attribution: 'Charts by TradingView',
    },
    bots: {
      eyebrow: 'The Lineup',
      headline: 'Ten strategies. One engine.',
      description:
        "Each bot targets a distinct, well-defined market edge — copy trading, arbitrage, market making, order-flow signals. All share the same execution core, risk layer and venue adapters, and all run in dry run today. Pick the edge that fits your thesis, and prove it before you fund it.",
      statusProduction: 'Production',
      statusDev: "Dry run",
      cardCta: 'Discuss this bot',
      cardCtaSuffix: '→ Telegram',
      items: {
        'copy-trading': {
          title: 'Copy Trading',
          tagline: 'Mirror top wallets automatically with configurable sizing and risk limits.',
          hook: 'Outsource alpha to wallets that already proved they have it.',
          description:
            "Tracks a high-performing wallet and mirrors its buys in near-real time, sized by your rules. Exits run on your take-profit and stop-loss settings rather than copying the wallet's sells. Runs on Predict.fun and Polymarket.",
          specs: [
            { label: "Tracked wallet", value: "One per bot" },
            { label: 'Order types', value: "FAK" },
            { label: 'Risk', value: "Circuit breaker + caps" },
            { label: 'Dry run', value: 'Fully supported' },
          ],
        },
        'btc-arb': {
          title: 'BTC 5m / 15m / 1hr Arbitrage',
          tagline: 'Speed on short-window BTC Up/Down markets.',
          hook: 'In the order book before you finish reading the title.',
          description:
            'Watches BTC Up/Down windows. When a pricing inefficiency emerges, the bot places a low-latency FAK before the window closes. Human reflexes don\'t compete here.',
          specs: [
            { label: 'Markets', value: 'BTC Up/Down 5m–1hr' },
            { label: 'Order type', value: 'FAK' },
          ],
        },
        'cross-arb': {
          title: 'Cross-Venue Arbitrage',
          tagline: "Find price gaps between linked markets on two venues.",
          hook: "Spot the gap, then check it yourself.",
          description:
            "Predict.fun publishes which Polymarket market each of its markets is linked to. The bot pairs them on that link and reports a gap only when it beats fees on both venues. It reports and doesn't trade, because one filled leg without the other is a naked position.",
          specs: [
            { label: 'Venues', value: "Predict.fun ↔ Polymarket" },
            { label: 'Edge threshold', value: '≥ fees, configurable' },
            { label: "Mode", value: "Reports only" },
          ],
        },
        'directional-arb': {
          title: 'Directional Arbitrage',
          tagline: 'Arbitrage base with a directional tilt.',
          hook: 'Start from arbitrage, then lean into the side with more edge.',
          description:
            'Buys both sides when Up + Down can be assembled for under $1, then sizes up the side the model rates undervalued — keeping an arbitrage floor while the net position goes directional. The smaller side works as a partial hedge.',
          specs: [
            { label: 'Entry', value: 'Up + Down < $1 basket' },
            { label: 'Tilt', value: 'Up to 3:1 toward edge' },
            { label: 'Orders', value: 'Limit-only' },
          ],
        },
        'spread-farming': {
          title: 'Spread Farming',
          tagline: 'Systematic, repeatable micro-edges.',
          hook: 'A thousand 0.5¢ wins compound into one big number.',
          description:
            "Disciplined and repeatable: it joins the bid inside a wide spread, then offers what it bought just inside the ask, one round trip at a time. A position that won't sell in time is sold at the bid, taking the loss rather than the risk.",
          specs: [
            { label: 'Edge', value: 'Bid-ask spread' },
            { label: 'Logging', value: 'Per-trade + session' },
          ],
        },
        sports: {
          title: 'Sports Betting Execution',
          tagline: 'Click-to-bet speed on live sports markets.',
          hook: 'Click. Filled. Done.',
          description:
            'Beat the line move that costs every other manual bettor their edge before they\'ve even confirmed the order. Real-time odds combined with fast FAK execution.',
          specs: [
            { label: 'Sports', value: 'NBA, NFL, Soccer +' },
          ],
        },
        'resolution-sniper': {
          title: 'Resolution Sniper',
          tagline: "Near-certain outcomes, held to resolution.",
          hook: "Small wins, and the rare loss that costs nearly the whole stake.",
          description:
            "Buys an outcome priced close to $1 in a market about to end, and holds it to resolution. Near-certain isn't certain: a price of 97¢ only pays if the outcome is right more than 97% of the time, and one surprise can erase dozens of wins.",
          specs: [
            { label: 'Certainty', value: 'Configurable' },
            { label: 'Payout', value: "$1.00 / winning share" },
            { label: 'Venues', value: "Predict.fun" },
          ],
        },
        'orderbook-imbalance': {
          title: 'Orderbook Imbalance',
          tagline: 'Pure order-flow signal, no external data required.',
          hook: "No subscriptions and no external feeds.",
          description:
            "The signal is the order book itself. The bot compares bid and ask size near the top of the book, buys the side the imbalance favours, and exits on a fixed target, stop or time limit. Displayed size is cheap to fake, and each entry crosses the spread, so the signal has to beat that cost.",
          specs: [
            { label: 'Signal', value: 'Live orderbook only' },
            { label: "Positions", value: "Capped, 5 by default" },
            { label: 'Venues', value: "Predict.fun" },
          ],
        },
        'market-making': {
          title: 'Market Making',
          tagline: "Two-sided quotes with inventory skew.",
          hook: "Quote both sides, and manage what you end up holding.",
          description:
            "Quotes both sides around the midpoint and earns the spread when both get filled, leaning its quotes away from the inventory it holds. Every quote carries an expiry. A market that trends through your quotes can cost more than the spread earns.",
          specs: [
            { label: 'Order mgmt', value: 'Auto-cancel + requote' },
            { label: 'Inventory', value: "Skew + hard caps" },
            { label: 'Venues', value: "Predict.fun" },
          ],
        },
        'whale-signal': {
          title: 'On-Chain Whale Signal',
          tagline: "Follow large trades and many wallets at once.",
          hook: "A big trade is a signal, not a promise.",
          description:
            "Follows many wallets at once, each with its own spending limit, or any large trade when no wallets are listed. It reads Predict.fun's trade feed, so it sees a trade after it happened, and skips it if the price has already moved too far.",
          specs: [
            { label: 'Source', value: "Predict.fun trade feed" },
            { label: "Chase limit", value: "3¢" },
          ],
        },
      },
    },
    engine: {
      eyebrow: 'Under the hood',
      headlineLine1: 'Engineered in Rust.',
      headlineLine2: 'Tuned for prediction markets.',
      description:
        'Built on the guarantees Rust gives you — and the speed Tokio\'s async runtime makes possible. Every strategy shares the same execution path, the same risk hooks, the same observability surface.',
      features: [
        {
          icon: '🦀',
          title: 'Rust + Tokio',
          body: 'No GC pauses mid-trade. No data races in concurrent execution. No null-pointer surprises. Lean, predictable, fast under pressure.',
        },
        {
          icon: '🔌',
          title: 'Venue-agnostic adapters',
          body: "One shared API surface, with adapters for Predict.fun and Polymarket so far. Strategies reference VenueId — not platform-specific types.",
        },
        {
          icon: '🖥️',
          title: 'Real-time TUI',
          body: 'ratatui-powered terminal interface with live log streaming, color-coded severity, and per-bot status views.',
        },
        {
          icon: '⚙️',
          title: 'FAK & GTD orders',
          body: 'Fill-or-Kill and Good-Till-Date order types with automatic market ID resolution. Concurrent execution, rate-limited.',
        },
      ],
      performanceEyebrow: 'Performance',
      performanceHeadline: 'Numbers that matter when milliseconds cost money.',
      metrics: [
        { metric: '< 1ms', label: 'Event processing' },
        { metric: '< 100ms', label: 'Order execution' },
        { metric: '~200ms', label: 'Position polling' },
        { metric: '~50MB', label: 'Memory baseline' },
        { metric: '< 5%', label: 'CPU utilization' },
        { metric: '25 / 10s', label: 'Rate limit (configurable)' },
      ],
    },
    safety: {
      eyebrow: 'Risk-first design',
      headlineLine1: 'Speed without guardrails',
      headlineLine2: 'is just expensive losing.',
      description:
        'Every order flows through a four-layer risk pipeline before it reaches the exchange. Circuit breakers, depth checks, size floors, and full dry-run — wired into the same execution core every bot uses.',
      layers: [
        {
          icon: '🛑',
          title: 'Circuit Breaker',
          body: 'Auto-halts after N consecutive large trades inside a configurable rolling window. Stops cascades before they start.',
          accent: 'text-rose-400',
        },
        {
          icon: '🛡️',
          title: 'Orderbook Depth Guard',
          body: 'Validates liquidity before every order. No fills into thin books — period.',
          accent: 'text-amber-400',
        },
        {
          icon: '🧪',
          title: 'Dry Run Mode',
          body: 'Full execution path runs without placing real orders. Validate signals and sizing with zero capital at risk.',
          accent: 'text-cyan-400',
        },
        {
          icon: '⚖️',
          title: 'Trade Size Floor',
          body: 'Minimum-size enforcement on every order. Filters out negative-EV micro-trades automatically.',
          accent: 'text-emerald-400',
        },
      ],
      ladderTitle: 'Deployment ladder',
      ladderSubtitle: 'A short checklist for going from zero to production.',
      ladder: [
        { stage: 'Setup', action: 'Run with enable_trading: false for one full session.' },
        { stage: 'First trades', action: 'Keep copy_percentage at 5–10% until you trust the signal.' },
        { stage: 'Ongoing', action: 'Watch circuit-breaker trips — they surface execution anomalies.' },
        { stage: 'Production', action: 'Use a dedicated wallet with only the capital you intend to deploy.' },
      ],
    },
    howItWorks: {
      eyebrow: 'How it works',
      headline: 'From repo to live bot in three steps.',
      description:
        'No black box. You run the same Rust engine the screenshots show — on your machine, your keys, your capital.',
      steps: [
        { num: '01', title: 'Pick your edge', body: 'Choose the strategy and venue that fit your thesis. Each bot is a distinct, well-defined market edge on the shared engine.' },
        { num: '02', title: 'Configure & dry-run', body: 'Drop in your keys, set risk limits, and run with enable_trading: false until you trust the signal — zero capital at risk.' },
        { num: '03', title: 'Go live', body: "When you're ready, follow the live trading guide and switch on a dedicated wallet holding only what you can afford to lose. No live order has been tested yet, so start small. Watch fills, P&L, and circuit-breaker state from the real-time TUI." },
      ],
      getTitle: 'What you get',
      gets: [
        'Full Rust source — MIT licensed, yours to read and modify',
        'Guided setup — direct help getting your first bot running',
        'The shared risk layer — circuit breaker, depth guard, dry-run, trade floor',
        'Ongoing updates — new venues and strategy upgrades as they ship',
      ],
      note: 'Source-available with hands-on setup. Message on Telegram for access and pricing.',
      cta: 'Get access on Telegram',
    },
    cta: {
      eyebrow: 'Get started',
      headline: 'Ready to put a bot to work?',
      description:
        'Telegram for direct conversation, scope discussion, or paid setup. GitHub for the open-source repo, configuration docs, and the live codebase. Response time on Telegram is typically a few hours.',
      ctaTelegram: '@tarpboi on Telegram',
      ctaGithub: 'Browse the repo',
      pillars: [
        { title: 'Open source', body: 'MIT licensed. Read the code, fork it, build on it.' },
        { title: 'Actively maintained', body: 'The repo ships fixes and strategy upgrades regularly.' },
        { title: 'Direct line', body: 'No support tickets. You talk to the person who wrote the bot.' },
      ],
    },
    footer: {
      productName: 'PnL Profit',
      tagline: "Predict.fun · Polymarket · Kalshi",
      disclaimerLabel: 'Disclaimer.',
      disclaimer:
        "Trading prediction markets involves real financial risk. This software is provided as-is, without warranty or guarantee of any outcome. It is not financial advice. Always test with {flag} before deploying real capital. Ensure compliance with each venue's terms of service and applicable regulations in your jurisdiction.",
      rights: 'MIT Licensed · Built for the prediction markets community.',
    },
  },

  zh: {
    langName: { en: 'English', zh: '简体中文', ru: 'Русский' },
    nav: {
      strategies: '策略',
      managed: '托管服务',
      venues: '平台',
      engine: '引擎',
      safety: '安全',
      blog: '博客',
      contact: '联系',
      github: 'GitHub',
      telegram: 'Telegram',
      langSwitch: '语言',
    },
    venues: {
      eyebrow: '平台覆盖',
      headline: '一套引擎。覆盖所有平台。',
      description:
        "引擎与平台无关——任何具备订单簿或持仓数据的平台，都可通过单一适配器接入。二十一个平台各有专属的机器人仓库，涵盖加密原生交易所与受监管券商。",
      cardCta: '打开仓库 →',
      footnote:
        "希望优先支持某个平台？适配器开发由需求驱动——如果你在某个平台上交易，它可以在队列中提前。",
      footnoteCta: '申请接入平台 →',
    },
    managed: {
      eyebrow: '托管与跟单交易',
      headline: '不想自己运维基础设施？交给我们。',
      description:
        '把同一套引擎当作服务来用。开一个托管账户，从链上排行榜挑一位已被验证的领投者或一个策略，让托管机器人替你运行——你只需在实时仪表盘上看余额、P&L 和费用。',
      statusNote:
        "⏸️ 托管服务目前已关闭。它此前以模拟盘测试版运行——资金为模拟，从未托管或经手真实资金。目前受支持的使用方式是开源引擎：你的私钥、你的钱包，默认以 dry-run 运行。",
      stats: [
        { value: '520+', label: 'GitHub Star' },
        { value: '21', label: '平台' },
        { value: '1 / 10', label: "已上线策略" },
        { value: 'Dry-run', label: "默认开启" },
      ],
      featuresTitle: '你能获得什么',
      features: [
        { icon: '📈', title: '链上排行榜', body: '真实的 Polymarket 钱包按可核验的链上 P&L 排名（利润或成交量，1 天 / 7 天 / 30 天 / 全期）。一键跟单已被验证的交易者。' },
        { icon: '🤖', title: '托管策略机器人', body: '同一套十策略引擎，替你运行。无密钥、无服务器、无运维。' },
        { icon: '💰', title: '跨平台套利', body: 'Polymarket ↔ Kalshi ↔ PredictIt 的实时价格，并以 Manifold 作为虚拟币共识信号。' },
        { icon: '🛡️', title: '同一套安全层', body: '熔断器、深度护卫、下单底线——来自开源引擎的护栏，同样应用于每个托管账户。' },
      ],
    },
    hero: {
      badge: '开源 · 自托管 · 默认空跑',
      headlineLine1: '跟单已被验证的赢家，',
      headlineLine2: '让盈利自动运行。',
      description:
        "一个开源的 Rust 引擎，支持 {predictfun}、{polymarket}、{kalshi}、{limitless} 以及另外 17 个预测市场平台——一个执行核心，一套风控层。十个策略均已在 Predict.fun 上以空跑方式运行，Polymarket 上的跟单交易已针对 CLOB V2 更新。目前尚未测试过任何真实订单。你的密钥，你的钱包，默认空跑。",
      ctaGithub: '查看 GitHub',
      stats: [
        { label: '下单执行', value: '< 100ms', unit: '端到端' },
        { label: '事件处理', value: '< 1ms', unit: '每事件' },
        { label: '内存占用', value: '~50MB', unit: '常驻' },
        { label: 'CPU 占用', value: '< 5%', unit: '现代硬件' },
      ],
    },
    liveSignal: {
      eyebrow: '实时信号',
      headline: 'BTC/USDT — 机器人正在盯的市场',
      sub: '实时现货价格，直接来自订单簿。',
      statusLive: '实时',
      statusOffline: '离线',
      statusConnecting: '连接中',
      pair: 'BTC / USDT',
      sessionLabel: '· 本次会话',
      footnote:
        '数据源：{source}。Polymarket 的 BTC 涨跌市场以 {chainlink} 结算，而 Chainlink 聚合自 Binance、Coinbase、Kraken 等主要交易场所——所以你看到的就是机器人交易对手价格的忠实实时近似。',
      attribution: '图表来自 TradingView',
    },
    bots: {
      eyebrow: '策略阵容',
      headline: '十款策略。一套引擎。',
      description:
        "每个机器人都针对一种明确、清晰的市场优势——跟单、套利、做市、订单流信号。它们共用同一个执行核心、风控层和平台适配器，目前全部处于空跑状态。选择契合你判断的优势，先验证，再投入资金。",
      statusProduction: '生产可用',
      statusDev: "空跑",
      cardCta: '咨询这款机器人',
      cardCtaSuffix: '→ Telegram',
      items: {
        'copy-trading': {
          title: '跟单交易',
          tagline: '自动镜像顶级钱包的交易，仓位规模与风险限制可配置。',
          hook: '把研究外包给已经被证明拥有 alpha 的钱包。',
          description:
            "追踪表现出色的钱包，近乎实时地复制其买入，仓位按你的规则设定。退出由你设置的止盈和止损决定，而不是跟随该钱包的卖出。支持 Predict.fun 和 Polymarket。",
          specs: [
            { label: "跟踪钱包", value: "每个机器人一个" },
            { label: '订单类型', value: "FAK" },
            { label: '风控', value: "熔断器 + 上限" },
            { label: '空跑', value: '完整支持' },
          ],
        },
        'btc-arb': {
          title: 'BTC 5 分 / 15 分 / 1 小时套利',
          tagline: '短窗口 BTC 涨跌市场上的速度型策略。',
          hook: '你还没读完标题，机器人已经在订单簿里。',
          description:
            '监控 BTC 涨跌窗口。一旦出现定价偏差，机器人会在窗口关闭前以低延迟下达 FAK 订单。人类反应跟不上。',
          specs: [
            { label: '市场', value: 'BTC 涨跌 5m–1hr' },
            { label: '订单类型', value: 'FAK' },
          ],
        },
        'cross-arb': {
          title: '跨平台套利',
          tagline: "发现两个平台上关联市场之间的价差。",
          hook: "发现价差，然后自己核实。",
          description:
            "Predict.fun 会公布其每个市场关联的 Polymarket 市场。机器人按该关联配对，只有当价差在扣除两个平台的费用后仍然成立时才会报告。它只报告，不交易，因为只成交一条腿而另一条没成交，就会变成裸头寸。",
          specs: [
            { label: '平台', value: "Predict.fun ↔ Polymarket" },
            { label: '价差阈值', value: '≥ 手续费，可配置' },
            { label: "模式", value: "仅报告" },
          ],
        },
        'directional-arb': {
          title: '方向性套利',
          tagline: '以套利为底仓，叠加方向性倾斜。',
          hook: '从套利出发，再向更有优势的一侧倾斜。',
          description:
            '当 Up + Down 能以低于 $1 组合时同时买入两侧，再对模型判定被低估的一侧加仓——保留套利底仓的同时让净头寸转为方向性。较小的一侧充当部分对冲。',
          specs: [
            { label: '入场', value: 'Up + Down < $1 组合' },
            { label: '倾斜', value: '最高 3:1 偏向优势侧' },
            { label: '订单', value: '仅限价单' },
          ],
        },
        'spread-farming': {
          title: '价差耕作',
          tagline: '系统化、可重复的微观优势。',
          hook: '一千次 0.5¢ 小胜，复利成一个大数字。',
          description:
            "纪律严明、可重复：在价差较宽时挂在买一附近，然后把买入的仓位挂在卖一内侧卖出，一次只做一个来回。若持仓未能及时卖出，就按买价卖出，接受亏损而不是承担风险。",
          specs: [
            { label: '优势', value: '买卖价差' },
            { label: '日志', value: '单笔 + 会话汇总' },
          ],
        },
        sports: {
          title: '体育博彩执行',
          tagline: '实时体育市场上的"点击即下单"速度。',
          hook: '点击。成交。完成。',
          description:
            '在其他手动玩家还在确认订单时，你已经吃到了让他们破功的盘口移动。实时赔率结合快速 FAK 执行。',
          specs: [
            { label: '运动', value: 'NBA、NFL、足球+' },
          ],
        },
        'resolution-sniper': {
          title: '结算狙击',
          tagline: "近乎确定的结果，持有至结算。",
          hook: "小额盈利，偶尔的亏损却可能吃掉几乎全部本金。",
          description:
            "在即将结束的市场中买入价格接近 $1 的结果，并持有至结算。近乎确定不等于确定：97¢ 的价格只有在该结果的正确率高于 97% 时才能盈利，一次意外就可能抹掉几十次盈利。",
          specs: [
            { label: '确定性', value: '可配置' },
            { label: '派息', value: "每份获胜份额 $1.00" },
            { label: '平台', value: "Predict.fun" },
          ],
        },
        'orderbook-imbalance': {
          title: '订单簿失衡',
          tagline: '纯订单流信号，无需任何外部数据。',
          hook: "无需订阅，也无需外部数据源。",
          description:
            "信号就是订单簿本身。机器人比较买卖盘顶部附近的挂单量，买入失衡所偏向的一侧，并按固定目标、止损或时间限制退出。显示的挂单量很容易造假，而且每次入场都要跨越价差，所以信号必须覆盖这部分成本。",
          specs: [
            { label: '信号', value: '仅实时订单簿' },
            { label: "持仓数", value: "有上限，默认 5" },
            { label: '平台', value: "Predict.fun" },
          ],
        },
        'market-making': {
          title: '做市商',
          tagline: "双边报价，带库存倾斜。",
          hook: "双边报价，并管理你最终持有的仓位。",
          description:
            "围绕中间价双边报价，在两边都成交时赚取价差，并让报价偏离其持有的库存。每个报价都有到期时间。若市场单边穿过你的报价，亏损可能超过价差收益。",
          specs: [
            { label: '订单管理', value: '成交自动撤 + 重报' },
            { label: '库存', value: "倾斜 + 硬性上限" },
            { label: '平台', value: "Predict.fun" },
          ],
        },
        'whale-signal': {
          title: '链上鲸鱼信号',
          tagline: "同时跟随大额交易和众多钱包。",
          hook: "大额交易是信号，而不是承诺。",
          description:
            "同时跟随多个钱包，每个钱包有各自的支出上限；如果没有列出钱包，则跟随任何大额交易。它读取 Predict.fun 的成交流，因此是在交易发生之后才看到，如果价格已经偏离太多就会跳过。",
          specs: [
            { label: '信号源', value: "Predict.fun 成交流" },
            { label: "追价上限", value: "3¢" },
          ],
        },
      },
    },
    engine: {
      eyebrow: '引擎之下',
      headlineLine1: '用 Rust 构建。',
      headlineLine2: '为预测市场调校。',
      description:
        '建立在 Rust 的保证之上——以及 Tokio 异步运行时所能提供的速度。每个策略共享同一条执行路径、同一套风控钩子、同一个可观测面。',
      features: [
        {
          icon: '🦀',
          title: 'Rust + Tokio',
          body: '交易中没有 GC 停顿。并发执行无数据竞争。没有空指针意外。精简、可预期，压力下稳定。',
        },
        {
          icon: '🔌',
          title: '平台无关适配层',
          body: "统一的 API 接口，目前已有 Predict.fun 和 Polymarket 的适配器。策略引用的是 VenueId，而不是各平台专属的类型。",
        },
        {
          icon: '🖥️',
          title: '实时 TUI',
          body: '基于 ratatui 的终端界面，实时日志流、按级别着色、按机器人状态分屏。',
        },
        {
          icon: '⚙️',
          title: 'FAK 与 GTD 订单',
          body: '即时成交或取消、有效期订单，自动解析市场 ID。并发执行、限速。',
        },
      ],
      performanceEyebrow: '性能',
      performanceHeadline: '当毫秒变成钱时，这些数字就是关键。',
      metrics: [
        { metric: '< 1ms', label: '事件处理' },
        { metric: '< 100ms', label: '下单执行' },
        { metric: '~200ms', label: '仓位轮询' },
        { metric: '~50MB', label: '内存基线' },
        { metric: '< 5%', label: 'CPU 占用' },
        { metric: '25 / 10s', label: '限速（可配置）' },
      ],
    },
    safety: {
      eyebrow: '风控优先',
      headlineLine1: '没有护栏的速度',
      headlineLine2: '只是更贵的亏损。',
      description:
        '每一笔订单在送达交易所之前都要经过四层风控管道。熔断器、深度检查、最小下单额、完整空跑——全部接入每个机器人共享的执行核心。',
      layers: [
        {
          icon: '🛑',
          title: '熔断器',
          body: '在配置窗口内出现 N 笔连续大额成交后自动暂停。从源头阻断连锁反应。',
          accent: 'text-rose-400',
        },
        {
          icon: '🛡️',
          title: '订单簿深度护卫',
          body: '每一笔订单前校验流动性。绝不在薄盘里成交。',
          accent: 'text-amber-400',
        },
        {
          icon: '🧪',
          title: '空跑模式',
          body: '完整执行链路运行但不真正下单。零资金风险下验证信号与仓位。',
          accent: 'text-cyan-400',
        },
        {
          icon: '⚖️',
          title: '最小下单额',
          body: '每一笔订单都强制最小规模。自动过滤负 EV 的微交易。',
          accent: 'text-emerald-400',
        },
      ],
      ladderTitle: '部署阶梯',
      ladderSubtitle: '从零到生产的简短清单。',
      ladder: [
        { stage: '初始部署', action: '用 enable_trading: false 跑完一整轮。' },
        { stage: '首次实盘', action: '信任信号前，copy_percentage 保持在 5–10%。' },
        { stage: '长期运行', action: '关注熔断触发事件——它们会暴露执行异常。' },
        { stage: '生产环境', action: '使用专用钱包，只放你打算部署的资金。' },
      ],
    },
    howItWorks: {
      eyebrow: '工作流程',
      headline: '三步，从仓库到实盘机器人。',
      description:
        '没有黑箱。你运行的就是截图里那套 Rust 引擎——在你自己的机器、你的密钥、你的资金上。',
      steps: [
        { num: '01', title: '挑选你的优势', body: '选择匹配你判断的策略与平台。每款机器人都是共享引擎之上一个清晰、独立的市场优势。' },
        { num: '02', title: '配置并空跑', body: '填入密钥、设置风险上限，用 enable_trading: false 运行，直到你信任信号——零资金风险。' },
        { num: '03', title: '上线实盘', body: "准备好后，按照实盘交易指南，启用一个专用钱包，里面只放你亏得起的资金。目前尚未测试过任何真实订单，所以请从小额开始。在实时 TUI 中查看成交、盈亏和熔断器状态。" },
      ],
      getTitle: '你将获得',
      gets: [
        '完整 Rust 源代码——MIT 许可，可自由阅读与修改',
        '引导式部署——直接协助你跑通第一个机器人',
        '共享风控层——熔断器、深度护卫、空跑、最小交易额',
        '持续更新——新平台与策略升级随发布同步',
      ],
      note: '源码可得，并提供动手部署支持。访问与报价请在 Telegram 联系。',
      cta: '在 Telegram 获取访问',
    },
    cta: {
      eyebrow: '开始使用',
      headline: '准备好让机器人开始工作了吗？',
      description:
        'Telegram 用于直接对话、需求讨论、或付费部署。GitHub 用于查看开源代码、配置文档、最新提交。Telegram 通常几小时内回复。',
      ctaTelegram: 'Telegram：@tarpboi',
      ctaGithub: '查看代码仓库',
      pillars: [
        { title: '开源', body: 'MIT 许可。读它、Fork 它、在它之上构建。' },
        { title: '持续维护', body: '仓库会定期提交修复与策略升级。' },
        { title: '直接对话', body: '没有工单系统。你直接和写这段代码的人对话。' },
      ],
    },
    footer: {
      productName: 'PnL Profit',
      tagline: "Predict.fun · Polymarket · Kalshi",
      disclaimerLabel: '免责声明。',
      disclaimer:
        '预测市场交易涉及真实的财务风险。本软件按"原样"提供，不附带任何形式的担保或对结果的保证，且不构成投资建议。投入真实资金前请务必先以 {flag} 进行测试。请确保遵守各平台的服务条款以及你所在司法管辖区的相关法规。',
      rights: 'MIT 许可 · 为预测市场社区而构建。',
    },
  },

  ru: {
    langName: { en: 'English', zh: '简体中文', ru: 'Русский' },
    nav: {
      strategies: 'Стратегии',
      managed: 'Сервис',
      venues: 'Площадки',
      engine: 'Движок',
      safety: 'Безопасность',
      blog: 'Блог',
      contact: 'Контакты',
      github: 'GitHub',
      telegram: 'Telegram',
      langSwitch: 'Язык',
    },
    venues: {
      eyebrow: 'Покрытие площадок',
      headline: 'Один движок. Все площадки.',
      description:
        "Движок не зависит от площадки — любая платформа с биржевым стаканом или лентой позиций подключается через единый адаптер. У двадцати одной площадки есть собственный репозиторий бота: от криптонативных бирж до регулируемых брокеров.",
      cardCta: 'Открыть репозиторий →',
      footnote:
        "Хотите, чтобы площадку сделали раньше? Работа над адаптерами зависит от спроса — если вы торгуете на важной для вас платформе, она может подняться в очереди.",
      footnoteCta: 'Запросить площадку →',
    },
    managed: {
      eyebrow: 'Управляемый сервис и копи-трейдинг',
      headline: 'Не хотите держать инфраструктуру? Доверьте нам.',
      description:
        'Торгуйте на том же движке как на сервисе. Откройте управляемый счёт, выберите проверенного лидера из ончейн-рейтинга или стратегию, и пусть боты на хостинге работают за вас — вы следите за балансом, P&L и комиссиями на живой панели.',
      statusNote:
        "⏸️ Хостинговый сервис сейчас закрыт. Он работал как бета на бумажной торговле — симулированные средства, без custody, реальных денег он никогда не касался. Поддерживаемый способ сегодня — открытый движок: ваши ключи, ваш кошелёк, dry-run по умолчанию.",
      stats: [
        { value: '520+', label: 'звёзд GitHub' },
        { value: '21', label: "Площадки" },
        { value: '1 / 10', label: "Стратегий в проде" },
        { value: 'Dry-run', label: "По умолчанию" },
      ],
      featuresTitle: 'Что вы получаете',
      features: [
        { icon: '📈', title: 'Ончейн-рейтинг', body: 'Реальные кошельки Polymarket, ранжированные по проверяемому ончейн P&L (прибыль или объём, 1д/7д/30д/всё время). Копирование проверенного трейдера в один клик.' },
        { icon: '🤖', title: 'Управляемые боты стратегий', body: 'Тот же исполнительный движок, запущенный за вас. Без ключей, серверов и эксплуатации.' },
        { icon: '💰', title: 'Межплощадочный арбитраж', body: 'Живые цены на Polymarket ↔ Kalshi ↔ PredictIt, с Manifold как сигналом консенсуса на игровые деньги.' },
        { icon: '🛡️', title: 'Тот же слой безопасности', body: 'Предохранитель, защита глубины, минимум сделки — гардрейлы из открытого движка, применённые к каждому управляемому счёту.' },
      ],
    },
    hero: {
      badge: 'Открытый код · свои ключи · dry-run по умолчанию',
      headlineLine1: 'Копируйте тех, кто выигрывает,',
      headlineLine2: 'прибыль на автопилоте.',
      description:
        "Открытый движок на Rust для {predictfun}, {polymarket}, {kalshi}, {limitless} и ещё 17 площадок прогнозных рынков — одно ядро исполнения, один слой риска. Все десять стратегий работают на Predict.fun в режиме dry-run, а копи-трейдинг на Polymarket обновлён под CLOB V2. Ни один реальный ордер пока не проверялся. Ваши ключи, ваш кошелёк, по умолчанию dry-run.",
      ctaGithub: 'Открыть на GitHub',
      stats: [
        { label: 'Исполнение ордеров', value: '< 100ms', unit: 'end-to-end' },
        { label: 'Обработка событий', value: '< 1ms', unit: 'на событие' },
        { label: 'Базовая память', value: '~50MB', unit: 'резидентно' },
        { label: 'CPU под нагрузкой', value: '< 5%', unit: 'совр. железо' },
      ],
    },
    liveSignal: {
      eyebrow: 'Живой сигнал',
      headline: 'BTC/USDT — рынок, за которым следят боты',
      sub: 'Цена спота в реальном времени, прямо из стакана заявок.',
      statusLive: 'В эфире',
      statusOffline: 'Офлайн',
      statusConnecting: 'Подключение',
      pair: 'BTC / USDT',
      sessionLabel: '· сессия',
      footnote:
        'Источник: {source}. Рынки BTC Up/Down на Polymarket разрешаются по {chainlink}, которые агрегируют данные с Binance, Coinbase, Kraken и других крупных площадок — так что здесь вы видите достоверное реальное приближение к цене, против которой торгуют боты.',
      attribution: 'Графики от TradingView',
    },
    bots: {
      eyebrow: 'Состав',
      headline: 'Десять стратегий. Один движок.',
      description:
        "Каждый бот нацелен на своё чётко определённое рыночное преимущество — копи-трейдинг, арбитраж, маркетмейкинг, сигналы потока ордеров. У всех общее ядро исполнения, слой риска и адаптеры площадок, и сегодня все работают в режиме dry-run. Выберите преимущество, которое соответствует вашей идее, и проверьте его, прежде чем вкладывать деньги.",
      statusProduction: 'Продакшен',
      statusDev: "Dry-run",
      cardCta: 'Обсудить этот бот',
      cardCtaSuffix: '→ Telegram',
      items: {
        'copy-trading': {
          title: 'Копи-трейдинг',
          tagline: 'Автоматически зеркальте топовые кошельки с настраиваемым размером и риск-лимитами.',
          hook: 'Передайте поиск альфы кошелькам, которые уже доказали, что она у них есть.',
          description:
            "Отслеживает результативный кошелёк и почти в реальном времени повторяет его покупки с размером позиции по вашим правилам. Выходы определяются вашими настройками тейк-профита и стоп-лосса, а не копированием продаж кошелька. Работает на Predict.fun и Polymarket.",
          specs: [
            { label: "Отслеживаемый кошелёк", value: "Один на бота" },
            { label: 'Типы ордеров', value: "FAK" },
            { label: 'Риск', value: "Circuit breaker + лимиты" },
            { label: 'Dry run', value: 'Полная поддержка' },
          ],
        },
        'btc-arb': {
          title: 'BTC арбитраж 5м / 15м / 1ч',
          tagline: 'Скорость на коротких рынках BTC Up/Down.',
          hook: 'В стакане раньше, чем вы дочитаете заголовок.',
          description:
            'Следит за окнами BTC Up/Down. Как только возникает ценовая неэффективность, бот выставляет низколатентный FAK до закрытия окна. Человеческая реакция тут не конкурент.',
          specs: [
            { label: 'Рынки', value: 'BTC Up/Down 5м–1ч' },
            { label: 'Тип ордера', value: 'FAK' },
          ],
        },
        'cross-arb': {
          title: 'Межплощадочный арбитраж',
          tagline: "Находит разницу цен между связанными рынками на двух площадках.",
          hook: "Найдите разрыв, затем проверьте его сами.",
          description:
            "Predict.fun указывает, с каким рынком Polymarket связан каждый из его рынков. Бот сопоставляет их по этой связи и сообщает о разрыве, только если он перекрывает комиссии на обеих площадках. Он только сообщает и не торгует, потому что одна исполненная нога без другой — это открытая позиция без хеджа.",
          specs: [
            { label: 'Площадки', value: "Predict.fun ↔ Polymarket" },
            { label: 'Порог преимущества', value: '≥ комиссий, настраиваемо' },
            { label: "Режим", value: "Только отчёты" },
          ],
        },
        'directional-arb': {
          title: 'Направленный арбитраж',
          tagline: 'Арбитражная база с направленным перекосом.',
          hook: 'Начните с арбитража, затем перекос в сторону большего эджа.',
          description:
            'Покупает обе стороны, когда Up + Down собираются дешевле $1, затем наращивает сторону, которую модель считает недооценённой — сохраняя арбитражный пол, пока чистая позиция становится направленной. Меньшая сторона работает как частичный хедж.',
          specs: [
            { label: 'Вход', value: 'Корзина Up + Down < $1' },
            { label: 'Перекос', value: 'До 3:1 в сторону эджа' },
            { label: 'Ордера', value: 'Только лимитные' },
          ],
        },
        'spread-farming': {
          title: 'Сбор спреда',
          tagline: 'Системные, повторяемые микропреимущества.',
          hook: 'Тысяча выигрышей по 0,5¢ складываются в одно большое число.',
          description:
            "Дисциплинированно и повторяемо: встаёт в покупку внутри широкого спреда, затем выставляет купленное чуть внутри аска, один круг за раз. Позиция, которая не продаётся вовремя, продаётся по биду — лучше принять убыток, чем риск.",
          specs: [
            { label: 'Преимущество', value: 'Спред бид-аск' },
            { label: 'Логи', value: 'По сделке + сессия' },
          ],
        },
        sports: {
          title: 'Исполнение спортивных ставок',
          tagline: 'Скорость «клик-в-ставку» на живых спортивных рынках.',
          hook: 'Клик. Исполнено. Готово.',
          description:
            'Опередите движение линии, которое лишает преимущества любого ручного беттера, не успевшего даже подтвердить ордер. Котировки в реальном времени плюс быстрое исполнение FAK.',
          specs: [
            { label: 'Спорт', value: 'NBA, NFL, футбол +' },
          ],
        },
        'resolution-sniper': {
          title: 'Снайпер разрешения',
          tagline: "Почти определённые исходы, удержание до разрешения.",
          hook: "Небольшие выигрыши и редкий проигрыш, который стоит почти всей ставки.",
          description:
            "Покупает исход с ценой около $1 на рынке, который скоро закроется, и держит его до разрешения. Почти определённо — не значит определённо: цена 97¢ окупается, только если исход оказывается верным чаще чем в 97% случаев, а один сюрприз может стереть десятки выигрышей.",
          specs: [
            { label: 'Уверенность', value: 'Настраиваемо' },
            { label: 'Выплата', value: "$1.00 за выигрышную акцию" },
            { label: 'Площадки', value: "Predict.fun" },
          ],
        },
        'orderbook-imbalance': {
          title: 'Дисбаланс стакана',
          tagline: 'Чистый сигнал потока ордеров, без внешних данных.',
          hook: "Без подписок и внешних источников данных.",
          description:
            "Сигнал — сам стакан заявок. Бот сравнивает объёмы на покупку и продажу у вершины стакана, покупает сторону, в пользу которой перекос, и выходит по фиксированной цели, стопу или лимиту времени. Показанный объём легко подделать, а каждый вход пересекает спред, поэтому сигнал должен перекрывать эти издержки.",
          specs: [
            { label: 'Сигнал', value: 'Только живой стакан' },
            { label: "Позиции", value: "С лимитом, по умолчанию 5" },
            { label: 'Площадки', value: "Predict.fun" },
          ],
        },
        'market-making': {
          title: 'Маркет-мейкинг',
          tagline: "Двусторонние котировки со сдвигом по запасу.",
          hook: "Котируйте обе стороны и управляйте тем, что остаётся у вас на руках.",
          description:
            "Котирует обе стороны вокруг средней цены и зарабатывает спред, когда исполняются обе, смещая котировки в сторону от удерживаемого запаса. У каждой котировки есть срок действия. Рынок, который идёт сквозь ваши котировки, может обойтись дороже, чем приносит спред.",
          specs: [
            { label: 'Управление ордерами', value: 'Автоотмена + перекотировка' },
            { label: 'Инвентарь', value: "Сдвиг + жёсткие лимиты" },
            { label: 'Площадки', value: "Predict.fun" },
          ],
        },
        'whale-signal': {
          title: 'Ончейн-сигнал китов',
          tagline: "Следуйте за крупными сделками и многими кошельками сразу.",
          hook: "Крупная сделка — сигнал, а не обещание.",
          description:
            "Следует за множеством кошельков одновременно, у каждого свой лимит трат, а если кошельки не указаны — за любой крупной сделкой. Читает ленту сделок Predict.fun, поэтому видит сделку уже после того, как она произошла, и пропускает её, если цена уже ушла слишком далеко.",
          specs: [
            { label: 'Источник', value: "Лента сделок Predict.fun" },
            { label: "Лимит погони за ценой", value: "3¢" },
          ],
        },
      },
    },
    engine: {
      eyebrow: 'Под капотом',
      headlineLine1: 'Спроектировано на Rust.',
      headlineLine2: 'Настроено под рынки предсказаний.',
      description:
        'Построено на гарантиях, которые даёт Rust — и скорости, которую делает возможной асинхронный рантайм Tokio. Каждая стратегия использует один путь исполнения, одни риск-хуки, одну поверхность наблюдаемости.',
      features: [
        {
          icon: '🦀',
          title: 'Rust + Tokio',
          body: 'Никаких пауз GC посреди сделки. Никаких гонок данных в параллельном исполнении. Никаких сюрпризов с null. Компактно, предсказуемо, быстро под нагрузкой.',
        },
        {
          icon: '🔌',
          title: 'Адаптеры, не зависящие от площадки',
          body: "Единый API-интерфейс, пока с адаптерами для Predict.fun и Polymarket. Стратегии ссылаются на VenueId, а не на типы конкретных площадок.",
        },
        {
          icon: '🖥️',
          title: 'TUI в реальном времени',
          body: 'Терминальный интерфейс на ratatui с живым потоком логов, цветовой кодировкой по уровню и видами статуса по каждому боту.',
        },
        {
          icon: '⚙️',
          title: 'Ордера FAK и GTD',
          body: 'Типы ордеров Fill-or-Kill и Good-Till-Date с автоматическим разрешением ID рынка. Параллельное исполнение с ограничением частоты.',
        },
      ],
      performanceEyebrow: 'Производительность',
      performanceHeadline: 'Числа, которые важны, когда миллисекунды стоят денег.',
      metrics: [
        { metric: '< 1ms', label: 'Обработка событий' },
        { metric: '< 100ms', label: 'Исполнение ордеров' },
        { metric: '~200ms', label: 'Опрос позиций' },
        { metric: '~50MB', label: 'Базовая память' },
        { metric: '< 5%', label: 'Загрузка CPU' },
        { metric: '25 / 10s', label: 'Лимит частоты (настраиваемо)' },
      ],
    },
    safety: {
      eyebrow: 'Дизайн с приоритетом риска',
      headlineLine1: 'Скорость без ограждений —',
      headlineLine2: 'это просто дорогой проигрыш.',
      description:
        'Каждый ордер проходит через четырёхслойный риск-конвейер прежде, чем попасть на биржу. Предохранители, проверки глубины, минимальные размеры и полный dry-run — встроены в то же ядро исполнения, что использует каждый бот.',
      layers: [
        {
          icon: '🛑',
          title: 'Предохранитель',
          body: 'Автостоп после N подряд крупных сделок в настраиваемом скользящем окне. Останавливает каскады до их начала.',
          accent: 'text-rose-400',
        },
        {
          icon: '🛡️',
          title: 'Защита глубины стакана',
          body: 'Проверяет ликвидность перед каждым ордером. Никаких исполнений в тонкий стакан — точка.',
          accent: 'text-amber-400',
        },
        {
          icon: '🧪',
          title: 'Режим Dry Run',
          body: 'Полный путь исполнения работает без реальных ордеров. Проверяйте сигналы и размеры с нулевым капиталом под риском.',
          accent: 'text-cyan-400',
        },
        {
          icon: '⚖️',
          title: 'Минимальный размер сделки',
          body: 'Контроль минимального размера на каждом ордере. Автоматически отсеивает микросделки с отрицательным EV.',
          accent: 'text-emerald-400',
        },
      ],
      ladderTitle: 'Лестница развёртывания',
      ladderSubtitle: 'Короткий чек-лист от нуля до продакшена.',
      ladder: [
        { stage: 'Настройка', action: 'Запустите с enable_trading: false на одну полную сессию.' },
        { stage: 'Первые сделки', action: 'Держите copy_percentage на 5–10%, пока не доверитесь сигналу.' },
        { stage: 'Постоянно', action: 'Следите за срабатываниями предохранителя — они вскрывают аномалии исполнения.' },
        { stage: 'Продакшен', action: 'Используйте выделенный кошелёк только с тем капиталом, который собираетесь задействовать.' },
      ],
    },
    howItWorks: {
      eyebrow: 'Как это работает',
      headline: 'От репозитория до живого бота за три шага.',
      description:
        'Никакого чёрного ящика. Вы запускаете тот же движок на Rust, что на скриншотах — на своей машине, со своими ключами и капиталом.',
      steps: [
        { num: '01', title: 'Выберите преимущество', body: 'Выберите стратегию и площадку под свою гипотезу. Каждый бот — отдельное, чётко определённое рыночное преимущество на общем движке.' },
        { num: '02', title: 'Настройте и dry-run', body: 'Введите ключи, задайте лимиты риска и запустите с enable_trading: false, пока не доверитесь сигналу — ноль капитала под риском.' },
        { num: '03', title: 'Запуск вживую', body: "Когда будете готовы, следуйте руководству по реальной торговле и включите отдельный кошелёк, на котором лежит только та сумма, потерю которой вы можете себе позволить. Ни один реальный ордер пока не проверялся, поэтому начинайте с малого. Следите за исполнением, P&L и состоянием автоматического выключателя (circuit breaker) в TUI в реальном времени." },
      ],
      getTitle: 'Что вы получаете',
      gets: [
        'Полный исходный код на Rust — лицензия MIT, читайте и меняйте',
        'Сопровождаемая настройка — прямая помощь с запуском первого бота',
        'Общий слой риска — предохранитель, защита глубины, dry-run, минимум сделки',
        'Постоянные обновления — новые площадки и апгрейды стратегий по мере выхода',
      ],
      note: 'Исходный код доступен, настройка — с поддержкой. Доступ и цены — напишите в Telegram.',
      cta: 'Получить доступ в Telegram',
    },
    cta: {
      eyebrow: 'Начать',
      headline: 'Готовы запустить бота в работу?',
      description:
        'Telegram — для прямого разговора, обсуждения задачи или платной настройки. GitHub — для открытого репозитория, документации по конфигурации и живой кодовой базы. Время ответа в Telegram обычно несколько часов.',
      ctaTelegram: '@tarpboi в Telegram',
      ctaGithub: 'Открыть репозиторий',
      pillars: [
        { title: 'Открытый код', body: 'Лицензия MIT. Читайте код, форкайте, стройте на нём.' },
        { title: 'Активная поддержка', body: 'Репозиторий регулярно выпускает фиксы и апгрейды стратегий.' },
        { title: 'Прямая связь', body: 'Никаких тикетов поддержки. Вы говорите с тем, кто написал бота.' },
      ],
    },
    footer: {
      productName: 'PnL Profit',
      tagline: "Predict.fun · Polymarket · Kalshi",
      disclaimerLabel: 'Отказ от ответственности.',
      disclaimer:
        'Торговля на рынках предсказаний сопряжена с реальным финансовым риском. ПО предоставляется «как есть», без гарантий или обещания какого-либо результата. Это не финансовая консультация. Всегда тестируйте с {flag} перед вводом реального капитала. Соблюдайте условия использования каждой площадки и применимые нормы вашей юрисдикции.',
      rights: 'Лицензия MIT · Создано для сообщества рынков предсказаний.',
    },
  },
};

// ── Fallback architecture ────────────────────────────────────────────────────
// English is the source of truth. Every other locale is deep-merged over English,
// so any key a translation hasn't filled in yet gracefully shows English rather
// than breaking. Functions (interpolated strings) are never overridden.
const kindOf = (v: unknown) => (Array.isArray(v) ? 'array' : v === null ? 'null' : typeof v);
// Type-guarded deep merge: an override value is only used if it's the SAME shape
// as the English base (same primitive type, or an array of equal length, or an
// object). Any structural drift in a (machine) translation safely falls back to
// English rather than rendering something broken.
function deepMerge<T>(base: T, over: unknown): T {
  if (over === undefined) return base;
  const kb = kindOf(base);
  const ko = kindOf(over);
  if (kb === 'function') return base; // never override interpolated functions
  if (kb !== 'object' && kb !== 'array') return ko === kb ? (over as T) : base;
  if (kb === 'array') {
    const a = base as unknown[];
    const b = over as unknown[];
    if (ko !== 'array' || b.length !== a.length) return base;
    return a.map((x, i) => deepMerge(x, b[i])) as unknown as T;
  }
  if (ko !== 'object') return base;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  const o = over as Record<string, unknown>;
  for (const k of Object.keys(out)) if (o[k] !== undefined) out[k] = deepMerge(out[k], o[k]);
  return out as T;
}

// Translation overrides for the additional locales (assembled by the translation
// workflow). Anything omitted or shape-mismatched falls back to English.
const overrides: Partial<Record<Lang, unknown>> = {
  es: {"langName":{"en":"English","zh":"简体中文","ru":"Русский"},"nav":{"strategies":"Estrategias","managed":"Gestionado","venues":"Plataformas","engine":"Motor","safety":"Seguridad","blog":"Blog","contact":"Contacto","github":"GitHub","telegram":"Telegram","langSwitch":"Idioma"},"venues":{"eyebrow":"Cobertura de plataformas","headline":"Un motor. Todas las plataformas.","description":"El motor es agnóstico a la plataforma: cualquier plataforma con libro de órdenes o feed de posiciones se conecta mediante un único adaptador. Veintiuna plataformas tienen su propio repositorio de bot, desde exchanges cripto nativos hasta brókers regulados.","cardCta":"Abrir repositorio →","footnote":"¿Quieres que prioricemos una plataforma? El trabajo de adaptadores lo marca la demanda: si operas en una plataforma que te importa, puede subir en la cola.","footnoteCta":"Solicitar una plataforma →"},"managed":{"eyebrow":"Gestionado y copy-trading","headline":"¿No quieres gestionar infraestructura? Lo hacemos nosotros.","description":"Opera con el mismo motor como servicio. Abre una cuenta gestionada, elige a un líder probado del ranking on-chain o una estrategia, y deja que los bots alojados hagan el trabajo: tú vigilas el saldo, el P&L y las comisiones en un panel en directo.","statusNote":"⏸️ El servicio gestionado está cerrado por ahora. Funcionó como beta de paper trading — fondos simulados, sin custodia — y nunca manejó dinero real. La forma soportada de usarlo hoy es el motor de código abierto: tus claves, tu cartera, dry-run por defecto.","stats":[{"value":"520+","label":"Estrellas en GitHub"},{"value":"21","label":"Plataformas"},{"value":"1 / 10","label":"Estrategias activas"},{"value":"Dry-run","label":"Por defecto"}],"featuresTitle":"Lo que obtienes","features":[{"icon":"📈","title":"Ranking on-chain","body":"Carteras reales de Polymarket ordenadas por P&L verificable on-chain (beneficio o volumen, 1d/7d/30d/histórico). Copia a un trader probado con un clic."},{"icon":"🤖","title":"Bots de estrategia alojados","body":"El mismo motor de ejecución, ejecutado por ti. Sin claves, sin servidores, sin operaciones."},{"icon":"💰","title":"Arbitraje entre plataformas","body":"Precios en directo entre Polymarket ↔ Kalshi ↔ PredictIt, con Manifold como señal de consenso con dinero ficticio."},{"icon":"🛡️","title":"La misma capa de seguridad","body":"Cortacircuitos, control de profundidad, mínimo de operación: las salvaguardas del motor open source, aplicadas a cada cuenta gestionada."}]},"hero":{"badge":"Código abierto · autocustodia · dry-run por defecto","headlineLine1":"Copia a traders probados.","headlineLine2":"Beneficios en piloto automático.","ctaGithub":"Ver en GitHub","stats":[{"label":"Ejecución de órdenes","value":"< 100ms","unit":"de extremo a extremo"},{"label":"Procesamiento de eventos","value":"< 1ms","unit":"por evento"},{"label":"Memoria base","value":"~50MB","unit":"residente"},{"label":"CPU bajo carga","value":"< 5%","unit":"hardware moderno"}],"description":"Un motor de código abierto en Rust para {predictfun}, {polymarket}, {kalshi}, {limitless} y 17 plataformas más de mercados de predicción: un solo núcleo de ejecución, una sola capa de riesgo. Las diez estrategias funcionan en Predict.fun en dry-run, y el copy trading en Polymarket está actualizado para CLOB V2. Todavía no se ha probado ninguna orden real. Tus claves, tu cartera, dry-run por defecto."},"liveSignal":{"eyebrow":"Señal en directo","headline":"BTC/USDT — el mercado que vigilan los bots","sub":"Precio spot en tiempo real, transmitido directamente desde el libro de órdenes.","statusLive":"En directo","statusOffline":"Desconectado","statusConnecting":"Conectando","pair":"BTC / USDT","sessionLabel":"· sesión","attribution":"Gráficos de TradingView","footnote":"Fuente: {source}. Los mercados BTC Up/Down de Polymarket se resuelven según {chainlink}, que agregan datos de Binance, Coinbase, Kraken y otras plataformas importantes — así que lo que ves aquí es un fiel reflejo en tiempo real del precio contra el que operan los bots."},"bots":{"eyebrow":"El elenco","headline":"Diez estrategias. Un motor.","description":"Cada bot apunta a una ventaja de mercado concreta y bien definida: copy trading, arbitraje, creación de mercado, señales de flujo de órdenes. Todos comparten el mismo núcleo de ejecución, capa de riesgo y adaptadores de plataforma, y hoy todos funcionan en dry-run. Elige la ventaja que encaje con tu tesis y compruébala antes de financiarla.","statusProduction":"Producción","statusDev":"Dry-run","cardCta":"Hablar sobre este bot","cardCtaSuffix":"→ Telegram","items":{"copy-trading":{"title":"Copy Trading","tagline":"Replica las mejores carteras automáticamente con tamaño y límites de riesgo configurables.","hook":"Delega el alfa en carteras que ya demostraron tenerlo.","description":"Sigue a una cartera con buen rendimiento y replica sus compras casi en tiempo real, con el tamaño que definan tus reglas. Las salidas se rigen por tu take-profit y stop-loss, en lugar de copiar las ventas de la cartera. Funciona en Predict.fun y Polymarket.","specs":[{"label":"Cartera seguida","value":"Una por bot"},{"label":"Tipos de orden","value":"FAK"},{"label":"Riesgo","value":"Cortacircuitos + límites"},{"label":"Simulación","value":"Totalmente compatible"}]},"btc-arb":{"title":"Arbitraje BTC 5m / 15m / 1h","tagline":"Velocidad en mercados BTC Up/Down de ventana corta.","hook":"En el libro de órdenes antes de que termines de leer el título.","description":"Vigila las ventanas BTC Up/Down. Cuando aparece una ineficiencia de precio, el bot coloca una FAK de baja latencia antes de que se cierre la ventana. Los reflejos humanos no compiten aquí.","specs":[{"label":"Mercados","value":"BTC Up/Down 5m–1h"},{"label":"Tipo de orden","value":"FAK"}]},"cross-arb":{"title":"Arbitraje entre plataformas","tagline":"Encuentra diferencias de precio entre mercados vinculados en dos plataformas.","hook":"Detecta la diferencia y luego compruébala tú mismo.","description":"Predict.fun publica con qué mercado de Polymarket está vinculado cada uno de sus mercados. El bot los empareja según ese vínculo y solo informa de una diferencia cuando supera las comisiones en ambas plataformas. Informa pero no opera, porque una pata ejecutada sin la otra es una posición al descubierto.","specs":[{"label":"Plataformas","value":"Predict.fun ↔ Polymarket"},{"label":"Umbral de ventaja","value":"≥ comisiones, configurable"},{"label":"Modo","value":"Solo informa"}]},"directional-arb":{"title":"Arbitraje direccional","tagline":"Base de arbitraje con sesgo direccional.","hook":"Parte del arbitraje y luego inclínate hacia el lado con más ventaja.","description":"Compra ambos lados cuando Up + Down se pueden montar por menos de $1, y luego aumenta el lado que el modelo considera infravalorado, manteniendo un suelo de arbitraje mientras la posición neta se vuelve direccional. El lado menor actúa como cobertura parcial.","specs":[{"label":"Entrada","value":"Cesta Up + Down < $1"},{"label":"Sesgo","value":"Hasta 3:1 hacia la ventaja"},{"label":"Órdenes","value":"Solo límite"}]},"spread-farming":{"title":"Spread Farming","tagline":"Micro-ventajas sistemáticas y repetibles.","hook":"Mil victorias de 0,5¢ se capitalizan en una cifra enorme.","description":"Disciplinado y repetible: se coloca en el bid dentro de un spread amplio y luego ofrece lo comprado justo dentro del ask, un viaje de ida y vuelta cada vez. Una posición que no se vende a tiempo se vende al bid, asumiendo la pérdida en lugar del riesgo.","specs":[{"label":"Ventaja","value":"Spread bid-ask"},{"label":"Registro","value":"Por operación + sesión"}]},"sports":{"title":"Ejecución de apuestas deportivas","tagline":"Velocidad de clic a apuesta en mercados deportivos en directo.","hook":"Clic. Ejecutado. Hecho.","description":"Adelántate al movimiento de la línea que le cuesta la ventaja a todo apostador manual antes incluso de confirmar la orden. Cuotas en tiempo real combinadas con ejecución FAK rápida.","specs":[{"label":"Deportes","value":"NBA, NFL, fútbol +"}]},"resolution-sniper":{"title":"Resolution Sniper","tagline":"Resultados casi seguros, mantenidos hasta la resolución.","hook":"Pequeñas ganancias y la rara pérdida que cuesta casi toda la apuesta.","description":"Compra un resultado con precio cercano a $1 en un mercado a punto de terminar y lo mantiene hasta la resolución. Casi seguro no es seguro: un precio de 97¢ solo da beneficio si el resultado se cumple más del 97% de las veces, y una sorpresa puede borrar decenas de ganancias.","specs":[{"label":"Certeza","value":"Configurable"},{"label":"Pago","value":"$1.00 por acción ganadora"},{"label":"Plataformas","value":"Predict.fun"}]},"orderbook-imbalance":{"title":"Desequilibrio del libro de órdenes","tagline":"Señal de flujo de órdenes pura, sin datos externos.","hook":"Sin suscripciones ni fuentes externas.","description":"La señal es el propio order book. El bot compara el tamaño de bid y ask cerca de la parte superior del libro, compra el lado que favorece el desequilibrio y sale con un objetivo fijo, un stop o un límite de tiempo. El tamaño mostrado es barato de falsear y cada entrada cruza el spread, así que la señal tiene que superar ese coste.","specs":[{"label":"Señal","value":"Solo libro de órdenes en directo"},{"label":"Posiciones","value":"Limitadas, 5 por defecto"},{"label":"Plataformas","value":"Predict.fun"}]},"market-making":{"title":"Market Making","tagline":"Cotizaciones en ambos lados con sesgo de inventario.","hook":"Cotiza ambos lados y gestiona lo que acabas manteniendo.","description":"Cotiza ambos lados alrededor del punto medio y gana el spread cuando se ejecutan los dos, inclinando sus cotizaciones en sentido contrario al inventario que mantiene. Cada cotización tiene una caducidad. Un mercado que atraviesa tus cotizaciones en una tendencia puede costar más de lo que gana el spread.","specs":[{"label":"Gestión de órdenes","value":"Autocancelación + recotización"},{"label":"Inventario","value":"Sesgo + límites estrictos"},{"label":"Plataformas","value":"Predict.fun"}]},"whale-signal":{"title":"Señal on-chain de ballenas","tagline":"Sigue operaciones grandes y muchas carteras a la vez.","hook":"Una operación grande es una señal, no una promesa.","description":"Sigue a muchas carteras a la vez, cada una con su propio límite de gasto, o cualquier operación grande cuando no hay carteras en la lista. Lee el feed de operaciones de Predict.fun, así que ve la operación después de que ocurra y la omite si el precio ya se ha movido demasiado.","specs":[{"label":"Fuente","value":"Feed de operaciones de Predict.fun"},{"label":"Límite de persecución","value":"3¢"}]}}},"engine":{"eyebrow":"Bajo el capó","headlineLine1":"Diseñado en Rust.","headlineLine2":"Ajustado para mercados de predicción.","description":"Construido sobre las garantías que te da Rust, y la velocidad que hace posible el runtime asíncrono de Tokio. Cada estrategia comparte la misma ruta de ejecución, los mismos hooks de riesgo y la misma superficie de observabilidad.","features":[{"icon":"🦀","title":"Rust + Tokio","body":"Sin pausas de GC a mitad de operación. Sin condiciones de carrera en la ejecución concurrente. Sin sorpresas de punteros nulos. Ligero, predecible y rápido bajo presión."},{"icon":"🔌","title":"Adaptadores agnósticos a la plataforma","body":"Una única superficie de API, con adaptadores para Predict.fun y Polymarket por ahora. Las estrategias hacen referencia a VenueId, no a tipos específicos de cada plataforma."},{"icon":"🖥️","title":"TUI en tiempo real","body":"Interfaz de terminal impulsada por ratatui con streaming de logs en directo, severidad codificada por colores y vistas de estado por bot."},{"icon":"⚙️","title":"Órdenes FAK y GTD","body":"Tipos de orden Fill-or-Kill y Good-Till-Date con resolución automática del ID de mercado. Ejecución concurrente y con límite de tasa."}],"performanceEyebrow":"Rendimiento","performanceHeadline":"Cifras que importan cuando los milisegundos cuestan dinero.","metrics":[{"metric":"< 1ms","label":"Procesamiento de eventos"},{"metric":"< 100ms","label":"Ejecución de órdenes"},{"metric":"~200ms","label":"Sondeo de posiciones"},{"metric":"~50MB","label":"Memoria base"},{"metric":"< 5%","label":"Uso de CPU"},{"metric":"25 / 10s","label":"Límite de tasa (configurable)"}]},"safety":{"eyebrow":"Diseño con el riesgo primero","headlineLine1":"Velocidad sin salvaguardas","headlineLine2":"es solo perder caro.","description":"Cada orden pasa por una canalización de riesgo de cuatro capas antes de llegar al exchange. Cortacircuitos, comprobaciones de profundidad, mínimos de tamaño y simulación completa, integrados en el mismo núcleo de ejecución que usa cada bot.","layers":[{"icon":"🛑","title":"Cortacircuitos","body":"Se detiene automáticamente tras N operaciones grandes consecutivas dentro de una ventana móvil configurable. Frena las cascadas antes de que empiecen.","accent":"text-rose-400"},{"icon":"🛡️","title":"Control de profundidad del libro","body":"Valida la liquidez antes de cada orden. Nada de ejecutar contra libros finos, punto.","accent":"text-amber-400"},{"icon":"🧪","title":"Modo simulación","body":"La ruta de ejecución completa corre sin colocar órdenes reales. Valida señales y tamaño sin arriesgar capital.","accent":"text-cyan-400"},{"icon":"⚖️","title":"Mínimo de tamaño de operación","body":"Exigencia de tamaño mínimo en cada orden. Filtra automáticamente las micro-operaciones de EV negativo.","accent":"text-emerald-400"}],"ladderTitle":"Escalera de despliegue","ladderSubtitle":"Una breve lista de comprobación para pasar de cero a producción.","ladder":[{"stage":"Configuración","action":"Ejecuta con enable_trading: false durante una sesión completa."},{"stage":"Primeras operaciones","action":"Mantén copy_percentage al 5–10 % hasta que confíes en la señal."},{"stage":"En marcha","action":"Vigila los saltos del cortacircuitos: revelan anomalías de ejecución."},{"stage":"Producción","action":"Usa una cartera dedicada solo con el capital que pretendas desplegar."}]},"howItWorks":{"eyebrow":"Cómo funciona","headline":"Del repositorio a un bot en directo en tres pasos.","description":"Sin caja negra. Ejecutas el mismo motor de Rust que muestran las capturas: en tu máquina, con tus claves, tu capital.","steps":[{"num":"01","title":"Elige tu ventaja","body":"Escoge la estrategia y la plataforma que encajen con tu tesis. Cada bot es una ventaja de mercado distinta y bien definida sobre el motor compartido."},{"num":"02","title":"Configura y simula","body":"Introduce tus claves, define límites de riesgo y ejecuta con enable_trading: false hasta que confíes en la señal, sin arriesgar capital."},{"num":"03","title":"Ponlo en directo","body":"Cuando estés listo, sigue la guía de trading en vivo y activa una cartera dedicada que contenga solo lo que puedas permitirte perder. Todavía no se ha probado ninguna orden real, así que empieza con poco. Sigue las ejecuciones, el P&L y el estado del cortacircuitos desde la TUI en tiempo real."}],"getTitle":"Lo que obtienes","gets":["Código fuente completo en Rust: con licencia MIT, tuyo para leer y modificar","Configuración guiada: ayuda directa para poner en marcha tu primer bot","La capa de riesgo compartida: cortacircuitos, control de profundidad, simulación y mínimo de operación","Actualizaciones continuas: nuevas plataformas y mejoras de estrategia a medida que se publican"],"note":"Código disponible con configuración práctica. Escribe por Telegram para acceso y precios.","cta":"Consigue acceso en Telegram"},"cta":{"eyebrow":"Empieza ya","headline":"¿Listo para poner un bot a trabajar?","description":"Telegram para conversación directa, análisis de alcance o configuración de pago. GitHub para el repositorio open source, la documentación de configuración y el código en vivo. El tiempo de respuesta en Telegram suele ser de unas pocas horas.","ctaTelegram":"@tarpboi en Telegram","ctaGithub":"Explorar el repositorio","pillars":[{"title":"Open source","body":"Con licencia MIT. Lee el código, haz un fork, construye sobre él."},{"title":"Mantenimiento activo","body":"El repositorio publica correcciones y mejoras de estrategia con regularidad."},{"title":"Línea directa","body":"Sin tickets de soporte. Hablas con la persona que escribió el bot."}]},"footer":{"productName":"PnL Profit","tagline":"Predict.fun · Polymarket · Kalshi","disclaimerLabel":"Aviso legal.","rights":"Con licencia MIT · Creado para la comunidad de los mercados de predicción.","disclaimer":"Operar en mercados de predicción implica un riesgo financiero real. Este software se ofrece tal cual, sin garantía ni promesa de ningún resultado. No constituye asesoramiento financiero. Prueba siempre con {flag} antes de desplegar capital real. Asegúrate de cumplir con los términos de servicio de cada plataforma y con las regulaciones aplicables en tu jurisdicción."}},
  pt: {"langName":{"en":"English","zh":"简体中文","ru":"Русский"},"nav":{"strategies":"Estratégias","managed":"Gerenciado","venues":"Plataformas","engine":"Motor","safety":"Segurança","blog":"Blog","contact":"Contato","github":"GitHub","telegram":"Telegram","langSwitch":"Idioma"},"venues":{"eyebrow":"Cobertura de plataformas","headline":"Um motor. Todas as plataformas.","description":"O motor é agnóstico à plataforma: qualquer plataforma com livro de ordens ou feed de posições liga-se através de um único adaptador. Vinte e uma plataformas têm o seu próprio repositório de bot, de exchanges cripto nativas a corretoras reguladas.","cardCta":"Abrir repositório →","footnote":"Quer que priorizemos uma plataforma? O trabalho de adaptadores é guiado pela procura — se negocia numa plataforma que lhe importa, ela pode subir na fila.","footnoteCta":"Solicitar uma plataforma →"},"managed":{"eyebrow":"Gerenciado & Copy-Trading","headline":"Não quer manter infraestrutura? Deixe com a gente.","description":"Opere com o mesmo motor como serviço. Abra uma conta gerenciada, escolha um líder comprovado no ranking on-chain ou uma estratégia, e deixe os bots hospedados operarem — você acompanha saldo, P&L e taxas em um painel ao vivo.","statusNote":"⏸️ O serviço gerido está fechado de momento. Funcionou como beta de paper trading — fundos simulados, sem custódia — e nunca lidou com dinheiro real. A forma suportada de o usar hoje é o motor open-source: as suas chaves, a sua carteira, dry-run por omissão.","stats":[{"value":"520+","label":"Estrelas no GitHub"},{"value":"21","label":"Plataformas"},{"value":"1 / 10","label":"Estratégias ativas"},{"value":"Dry-run","label":"Por padrão"}],"featuresTitle":"O que você ganha","features":[{"icon":"📈","title":"Ranking on-chain","body":"Carteiras reais da Polymarket ranqueadas por P&L on-chain verificável (lucro ou volume, 1d/7d/30d/todo o período). Um clique para copiar um trader comprovado."},{"icon":"🤖","title":"Bots de estratégia hospedados","body":"O mesmo motor de execução, operado por você. Sem chaves, sem servidores, sem operação."},{"icon":"💰","title":"Arbitragem entre plataformas","body":"Preços ao vivo entre Polymarket ↔ Kalshi ↔ PredictIt, com Manifold como sinal de consenso em dinheiro fictício."},{"icon":"🛡️","title":"A mesma camada de segurança","body":"Circuit breaker, guarda de profundidade, piso de trade — as proteções do motor open source, aplicadas a cada conta gerenciada."}]},"hero":{"badge":"Código aberto · autocustódia · dry-run por padrão","headlineLine1":"Copie traders comprovados.","headlineLine2":"Lucro no piloto automático.","ctaGithub":"Ver no GitHub","stats":[{"label":"Execução de ordens","value":"< 100ms","unit":"ponta a ponta"},{"label":"Processamento de eventos","value":"< 1ms","unit":"por evento"},{"label":"Base de memória","value":"~50MB","unit":"residente"},{"label":"CPU sob carga","value":"< 5%","unit":"hardware moderno"}],"description":"Um motor open source em Rust para {predictfun}, {polymarket}, {kalshi}, {limitless} e mais 17 plataformas de mercados de previsão: um núcleo de execução, uma camada de risco. As dez estratégias rodam na Predict.fun em dry-run, e o copy trading na Polymarket foi atualizado para o CLOB V2. Nenhuma ordem real foi testada ainda. Suas chaves, sua carteira, dry-run por padrão."},"liveSignal":{"eyebrow":"Sinal ao vivo","headline":"BTC/USDT — o mercado que os bots observam","sub":"Preço spot em tempo real, transmitido direto do livro de ofertas.","statusLive":"Ao vivo","statusOffline":"Offline","statusConnecting":"Conectando","pair":"BTC / USDT","sessionLabel":"· sessão","attribution":"Gráficos por TradingView","footnote":"Fonte: {source}. Os mercados BTC Up/Down da Polymarket são resolvidos com base nos {chainlink}, que agregam dados da Binance, Coinbase, Kraken e outras grandes plataformas — portanto, o que você vê aqui é um reflexo fiel, em tempo real, do preço contra o qual os bots operam."},"bots":{"eyebrow":"A seleção","headline":"Dez estratégias. Um motor.","description":"Cada bot mira uma vantagem de mercado distinta e bem definida: copy trading, arbitragem, market making, sinais de fluxo de ordens. Todos compartilham o mesmo núcleo de execução, camada de risco e adaptadores de plataforma, e hoje todos rodam em dry-run. Escolha a vantagem que combina com a sua tese e comprove-a antes de colocar dinheiro.","statusProduction":"Produção","statusDev":"Dry-run","cardCta":"Falar sobre este bot","cardCtaSuffix":"→ Telegram","items":{"copy-trading":{"title":"Copy Trading","tagline":"Espelhe as melhores carteiras automaticamente, com sizing e limites de risco configuráveis.","hook":"Terceirize o alpha para carteiras que já provaram tê-lo.","description":"Acompanha uma carteira de bom desempenho e espelha suas compras quase em tempo real, com o tamanho definido pelas suas regras. As saídas seguem as suas configurações de take-profit e stop-loss, em vez de copiar as vendas da carteira. Funciona na Predict.fun e na Polymarket.","specs":[{"label":"Carteira acompanhada","value":"Uma por bot"},{"label":"Tipos de ordem","value":"FAK"},{"label":"Risco","value":"Circuit breaker + limites"},{"label":"Dry run","value":"Totalmente suportado"}]},"btc-arb":{"title":"Arbitragem de BTC 5m / 15m / 1h","tagline":"Velocidade em mercados BTC Up/Down de janela curta.","hook":"No livro de ordens antes de você terminar de ler o título.","description":"Observa as janelas BTC Up/Down. Quando surge uma ineficiência de preço, o bot coloca uma FAK de baixa latência antes do fechamento da janela. Reflexos humanos não competem aqui.","specs":[{"label":"Mercados","value":"BTC Up/Down 5m–1h"},{"label":"Tipo de ordem","value":"FAK"}]},"cross-arb":{"title":"Arbitragem entre plataformas","tagline":"Encontre diferenças de preço entre mercados vinculados em duas plataformas.","hook":"Identifique a diferença e depois confira você mesmo.","description":"A Predict.fun publica a qual mercado da Polymarket cada um dos seus mercados está vinculado. O bot os pareia por esse vínculo e só reporta uma diferença quando ela supera as taxas nas duas plataformas. Ele reporta e não opera, porque uma perna executada sem a outra é uma posição descoberta.","specs":[{"label":"Plataformas","value":"Predict.fun ↔ Polymarket"},{"label":"Limite de vantagem","value":"≥ taxas, configurável"},{"label":"Modo","value":"Apenas reporta"}]},"directional-arb":{"title":"Arbitragem direcional","tagline":"Base de arbitragem com uma inclinação direcional.","hook":"Comece pela arbitragem e depois pese o lado com mais vantagem.","description":"Compra os dois lados quando Up + Down podem ser montados por menos de $1, depois aumenta o lado que o modelo considera subvalorizado — mantendo um piso de arbitragem enquanto a posição líquida fica direcional. O lado menor funciona como hedge parcial.","specs":[{"label":"Entrada","value":"Cesta Up + Down < $1"},{"label":"Inclinação","value":"Até 3:1 rumo à vantagem"},{"label":"Ordens","value":"Somente limit"}]},"spread-farming":{"title":"Spread Farming","tagline":"Micro-vantagens sistemáticas e repetíveis.","hook":"Mil ganhos de 0,5¢ se compõem em um número grande.","description":"Disciplinado e repetível: entra no bid dentro de um spread largo e depois oferece o que comprou logo dentro do ask, uma ida e volta por vez. Uma posição que não vende a tempo é vendida no bid, assumindo a perda em vez do risco.","specs":[{"label":"Vantagem","value":"Spread bid-ask"},{"label":"Registro","value":"Por trade + sessão"}]},"sports":{"title":"Execução de apostas esportivas","tagline":"Velocidade de clique-para-apostar em mercados esportivos ao vivo.","hook":"Clique. Executado. Feito.","description":"Vença o movimento da linha que custa a vantagem de todo apostador manual antes mesmo de ele confirmar a ordem. Odds em tempo real combinadas com execução FAK rápida.","specs":[{"label":"Esportes","value":"NBA, NFL, Futebol +"}]},"resolution-sniper":{"title":"Resolution Sniper","tagline":"Resultados quase certos, mantidos até a resolução.","hook":"Pequenos ganhos e a rara perda que custa quase toda a aposta.","description":"Compra um resultado com preço próximo de $1 em um mercado prestes a encerrar e o mantém até a resolução. Quase certo não é certo: um preço de 97¢ só dá retorno se o resultado se confirmar em mais de 97% das vezes, e uma surpresa pode apagar dezenas de ganhos.","specs":[{"label":"Certeza","value":"Configurável"},{"label":"Pagamento","value":"$1.00 por ação vencedora"},{"label":"Plataformas","value":"Predict.fun"}]},"orderbook-imbalance":{"title":"Desequilíbrio do livro de ofertas","tagline":"Sinal puro de fluxo de ordens, sem necessidade de dados externos.","hook":"Sem assinaturas e sem feeds externos.","description":"O sinal é o próprio order book. O bot compara o tamanho de bid e ask perto do topo do livro, compra o lado que o desequilíbrio favorece e sai em uma meta fixa, um stop ou um limite de tempo. O tamanho exibido é barato de falsificar e cada entrada cruza o spread, então o sinal precisa superar esse custo.","specs":[{"label":"Sinal","value":"Somente livro de ofertas ao vivo"},{"label":"Posições","value":"Limitadas, 5 por padrão"},{"label":"Plataformas","value":"Predict.fun"}]},"market-making":{"title":"Market Making","tagline":"Cotações nos dois lados com viés de inventário.","hook":"Cote os dois lados e gerencie o que você acaba carregando.","description":"Cota os dois lados em torno do preço médio e ganha o spread quando ambos são executados, inclinando suas cotações para longe do inventário que mantém. Toda cotação tem validade. Um mercado que atravessa suas cotações em tendência pode custar mais do que o spread rende.","specs":[{"label":"Gestão de ordens","value":"Auto-cancelamento + recotação"},{"label":"Inventário","value":"Viés + limites rígidos"},{"label":"Plataformas","value":"Predict.fun"}]},"whale-signal":{"title":"Sinal de baleias on-chain","tagline":"Siga grandes operações e várias carteiras ao mesmo tempo.","hook":"Uma grande operação é um sinal, não uma promessa.","description":"Segue várias carteiras ao mesmo tempo, cada uma com seu próprio limite de gasto, ou qualquer grande operação quando nenhuma carteira está listada. Lê o feed de operações da Predict.fun, então vê a operação depois que ela aconteceu e a ignora se o preço já se moveu demais.","specs":[{"label":"Fonte","value":"Feed de operações da Predict.fun"},{"label":"Limite de perseguição","value":"3¢"}]}}},"engine":{"eyebrow":"Sob o capô","headlineLine1":"Projetado em Rust.","headlineLine2":"Afinado para mercados de previsão.","description":"Construído sobre as garantias que o Rust oferece — e a velocidade que o runtime assíncrono do Tokio torna possível. Toda estratégia compartilha o mesmo caminho de execução, os mesmos hooks de risco, a mesma superfície de observabilidade.","features":[{"icon":"🦀","title":"Rust + Tokio","body":"Sem pausas de GC no meio do trade. Sem data races na execução concorrente. Sem surpresas de ponteiro nulo. Enxuto, previsível, rápido sob pressão."},{"icon":"🔌","title":"Adaptadores agnósticos de plataforma","body":"Uma única superfície de API, por enquanto com adaptadores para a Predict.fun e a Polymarket. As estratégias referenciam VenueId, e não tipos específicos de cada plataforma."},{"icon":"🖥️","title":"TUI em tempo real","body":"Interface de terminal com ratatui, com streaming de logs ao vivo, severidade codificada por cor e visões de status por bot."},{"icon":"⚙️","title":"Ordens FAK & GTD","body":"Tipos de ordem Fill-or-Kill e Good-Till-Date com resolução automática de ID de mercado. Execução concorrente, com limite de taxa."}],"performanceEyebrow":"Performance","performanceHeadline":"Números que importam quando milissegundos custam dinheiro.","metrics":[{"metric":"< 1ms","label":"Processamento de eventos"},{"metric":"< 100ms","label":"Execução de ordens"},{"metric":"~200ms","label":"Polling de posições"},{"metric":"~50MB","label":"Base de memória"},{"metric":"< 5%","label":"Uso de CPU"},{"metric":"25 / 10s","label":"Limite de taxa (configurável)"}]},"safety":{"eyebrow":"Design com risco em primeiro lugar","headlineLine1":"Velocidade sem proteções","headlineLine2":"é só perder dinheiro caro.","description":"Toda ordem passa por um pipeline de risco de quatro camadas antes de chegar à corretora. Circuit breakers, checagens de profundidade, pisos de tamanho e dry-run completo — integrados ao mesmo núcleo de execução que todo bot usa.","layers":[{"icon":"🛑","title":"Circuit Breaker","body":"Interrompe automaticamente após N trades grandes consecutivos dentro de uma janela móvel configurável. Freia cascatas antes que comecem.","accent":"text-rose-400"},{"icon":"🛡️","title":"Guarda de profundidade do livro","body":"Valida a liquidez antes de cada ordem. Nada de execuções em livros rasos — ponto final.","accent":"text-amber-400"},{"icon":"🧪","title":"Modo Dry Run","body":"O caminho de execução completo roda sem colocar ordens reais. Valide sinais e sizing com zero capital em risco.","accent":"text-cyan-400"},{"icon":"⚖️","title":"Piso de tamanho de trade","body":"Imposição de tamanho mínimo em cada ordem. Filtra automaticamente micro-trades de EV negativo.","accent":"text-emerald-400"}],"ladderTitle":"Escada de implantação","ladderSubtitle":"Um checklist curto para ir do zero à produção.","ladder":[{"stage":"Configuração","action":"Rode com enable_trading: false por uma sessão completa."},{"stage":"Primeiros trades","action":"Mantenha copy_percentage em 5–10% até confiar no sinal."},{"stage":"Contínuo","action":"Observe os disparos do circuit breaker — eles revelam anomalias de execução."},{"stage":"Produção","action":"Use uma carteira dedicada com apenas o capital que você pretende usar."}]},"howItWorks":{"eyebrow":"Como funciona","headline":"Do repositório ao bot ao vivo em três passos.","description":"Sem caixa-preta. Você roda o mesmo motor Rust que aparece nas capturas de tela — na sua máquina, suas chaves, seu capital.","steps":[{"num":"01","title":"Escolha sua vantagem","body":"Escolha a estratégia e a plataforma que combinam com sua tese. Cada bot é uma vantagem de mercado distinta e bem definida sobre o motor compartilhado."},{"num":"02","title":"Configure & dry-run","body":"Insira suas chaves, defina limites de risco e rode com enable_trading: false até confiar no sinal — zero capital em risco."},{"num":"03","title":"Vá ao vivo","body":"Quando estiver pronto, siga o guia de trading ao vivo e ative uma carteira dedicada com apenas o que você pode se dar ao luxo de perder. Nenhuma ordem real foi testada ainda, então comece pequeno. Acompanhe execuções, P&L e o estado do circuit breaker na TUI em tempo real."}],"getTitle":"O que você ganha","gets":["Código-fonte Rust completo — licença MIT, seu para ler e modificar","Configuração guiada — ajuda direta para colocar seu primeiro bot para rodar","A camada de risco compartilhada — circuit breaker, guarda de profundidade, dry-run, piso de trade","Atualizações contínuas — novas plataformas e melhorias de estratégia conforme são lançadas"],"note":"Código disponível com configuração assistida. Mande mensagem no Telegram para acesso e preços.","cta":"Obtenha acesso no Telegram"},"cta":{"eyebrow":"Comece agora","headline":"Pronto para colocar um bot para trabalhar?","description":"Telegram para conversa direta, discussão de escopo ou configuração paga. GitHub para o repositório open source, a documentação de configuração e o código ao vivo. O tempo de resposta no Telegram costuma ser de algumas horas.","ctaTelegram":"@tarpboi no Telegram","ctaGithub":"Explorar o repositório","pillars":[{"title":"Open source","body":"Licença MIT. Leia o código, faça fork, construa sobre ele."},{"title":"Ativamente mantido","body":"O repositório lança correções e melhorias de estratégia regularmente."},{"title":"Linha direta","body":"Sem tickets de suporte. Você fala com quem escreveu o bot."}]},"footer":{"productName":"PnL Profit","tagline":"Predict.fun · Polymarket · Kalshi","disclaimerLabel":"Aviso legal.","rights":"Licença MIT · Feito para a comunidade de mercados de previsão.","disclaimer":"Operar em mercados de previsão envolve risco financeiro real. Este software é fornecido no estado em que se encontra, sem garantia ou promessa de qualquer resultado. Isto não é aconselhamento financeiro. Sempre teste com {flag} antes de aplicar capital real. Garanta a conformidade com os termos de serviço de cada plataforma e com as regulamentações aplicáveis à sua jurisdição."}},
  fr: {"langName":{"en":"English","zh":"简体中文","ru":"Русский"},"nav":{"strategies":"Stratégies","managed":"Géré","venues":"Plateformes","engine":"Moteur","safety":"Sécurité","blog":"Blog","contact":"Contact","github":"GitHub","telegram":"Telegram","langSwitch":"Langue"},"venues":{"eyebrow":"Couverture des plateformes","headline":"Un seul moteur. Toutes les plateformes.","description":"Le moteur est agnostique à la plateforme : toute plateforme dotée d'un carnet d'ordres ou d'un flux de positions se branche via un adaptateur unique. Vingt et une plateformes disposent de leur propre dépôt de bot, des exchanges crypto natifs aux courtiers régulés.","cardCta":"Ouvrir le dépôt →","footnote":"Vous voulez qu'une plateforme soit priorisée ? Le travail d'adaptateur suit la demande : si vous tradez sur une plateforme qui compte pour vous, elle peut remonter dans la file.","footnoteCta":"Demander une plateforme →"},"managed":{"eyebrow":"Gestion & Copy-Trading","headline":"Pas envie de gérer l'infrastructure ? Laissez-nous faire.","description":"Tradez avec le même moteur, en mode service. Ouvrez un compte géré, choisissez un leader éprouvé du classement on-chain ou une stratégie, et laissez tourner les bots hébergés : vous suivez solde, P&L et frais sur un tableau de bord en direct.","statusNote":"⏸️ Le service hébergé est fermé pour l'instant. Il fonctionnait en bêta paper trading — fonds simulés, sans conservation — et n'a jamais géré d'argent réel. La façon prise en charge aujourd'hui est le moteur open source : vos clés, votre portefeuille, dry-run par défaut.","stats":[{"value":"520+","label":"Étoiles GitHub"},{"value":"21","label":"Plateformes"},{"value":"1 / 10","label":"Stratégies actives"},{"value":"Dry-run","label":"Par défaut"}],"featuresTitle":"Ce que vous obtenez","features":[{"icon":"📈","title":"Classement on-chain","body":"De vrais wallets Polymarket classés selon un P&L on-chain vérifiable (profit ou volume, 1j/7j/30j/all-time). Un clic pour copier un trader éprouvé."},{"icon":"🤖","title":"Bots de stratégie hébergés","body":"Le même moteur d’exécution, exécuté pour vous. Pas de clés, pas de serveurs, pas d’ops."},{"icon":"💰","title":"Arbitrage inter-plateformes","body":"Prix en direct sur Polymarket ↔ Kalshi ↔ PredictIt, avec Manifold comme signal de consensus en argent fictif."},{"icon":"🛡️","title":"La même couche de sécurité","body":"Coupe-circuit, garde de profondeur, plancher de trade — les garde-fous du moteur open source, appliqués à chaque compte géré."}]},"hero":{"badge":"Open source · auto-conservation · dry-run par défaut","headlineLine1":"Copiez des traders éprouvés.","headlineLine2":"Le profit en pilote automatique.","ctaGithub":"Voir sur GitHub","stats":[{"label":"Exécution des ordres","value":"< 100ms","unit":"bout en bout"},{"label":"Traitement des événements","value":"< 1ms","unit":"par événement"},{"label":"Empreinte mémoire","value":"~50MB","unit":"résident"},{"label":"CPU en charge","value":"< 5%","unit":"matériel récent"}],"description":"Un moteur open source en Rust pour {predictfun}, {polymarket}, {kalshi}, {limitless} et 17 autres plateformes de marchés de prédiction : un seul cœur d'exécution, une seule couche de risque. Les dix stratégies tournent sur Predict.fun en dry-run, et le copy trading sur Polymarket est mis à jour pour CLOB V2. Aucun ordre réel n'a encore été testé. Vos clés, votre wallet, dry-run par défaut."},"liveSignal":{"eyebrow":"Signal en direct","headline":"BTC/USDT — le marché que les bots surveillent","sub":"Prix spot en temps réel, diffusé directement depuis le carnet d'ordres.","statusLive":"En ligne","statusOffline":"Hors ligne","statusConnecting":"Connexion","pair":"BTC / USDT","sessionLabel":"· session","attribution":"Graphiques par TradingView","footnote":"Source : {source}. Les marchés BTC Up/Down de Polymarket se résolvent selon {chainlink}, qui agrègent les prix de Binance, Coinbase, Kraken et d'autres grandes plateformes — ainsi, ce que vous voyez ici est un proxy fidèle et en temps réel du prix contre lequel les bots tradent."},"bots":{"eyebrow":"L'alignement","headline":"Dix stratégies. Un seul moteur.","description":"Chaque bot vise un avantage de marché distinct et bien défini : copy trading, arbitrage, market making, signaux de flux d'ordres. Tous partagent le même cœur d'exécution, la même couche de risque et les mêmes adaptateurs de plateforme, et tous tournent aujourd'hui en dry-run. Choisissez l'avantage qui correspond à votre thèse, et prouvez-le avant de le financer.","statusProduction":"Production","statusDev":"Dry-run","cardCta":"Discuter de ce bot","cardCtaSuffix":"→ Telegram","items":{"copy-trading":{"title":"Copy Trading","tagline":"Reproduisez automatiquement les meilleurs wallets, avec dimensionnement et limites de risque configurables.","hook":"Déléguez l'alpha à des wallets qui ont déjà prouvé qu'ils en avaient.","description":"Suit un wallet performant et reproduit ses achats quasiment en temps réel, dimensionnés selon vos règles. Les sorties reposent sur vos réglages de take-profit et de stop-loss plutôt que sur la copie des ventes du wallet. Fonctionne sur Predict.fun et Polymarket.","specs":[{"label":"Wallet suivi","value":"Un par bot"},{"label":"Types d'ordre","value":"FAK"},{"label":"Risque","value":"Coupe-circuit + plafonds"},{"label":"Dry run","value":"Entièrement pris en charge"}]},"btc-arb":{"title":"BTC 5m / 15m / 1hr Arbitrage","tagline":"La vitesse sur les marchés BTC Up/Down à courte fenêtre.","hook":"Dans le carnet d'ordres avant que vous ayez fini de lire le titre.","description":"Surveille les fenêtres BTC Up/Down. Dès qu'une inefficience de prix apparaît, le bot place un FAK à faible latence avant la clôture de la fenêtre. Les réflexes humains ne font pas le poids.","specs":[{"label":"Marchés","value":"BTC Up/Down 5m–1hr"},{"label":"Type d'ordre","value":"FAK"}]},"cross-arb":{"title":"Cross-Venue Arbitrage","tagline":"Repérez les écarts de prix entre marchés liés sur deux plateformes.","hook":"Repérez l'écart, puis vérifiez-le vous-même.","description":"Predict.fun publie à quel marché Polymarket chacun de ses marchés est lié. Le bot les apparie sur ce lien et ne signale un écart que s'il dépasse les frais sur les deux plateformes. Il signale mais ne trade pas, car une jambe exécutée sans l'autre est une position à nu.","specs":[{"label":"Plateformes","value":"Predict.fun ↔ Polymarket"},{"label":"Seuil d'avantage","value":"≥ frais, configurable"},{"label":"Mode","value":"Signale seulement"}]},"directional-arb":{"title":"Directional Arbitrage","tagline":"Une base d'arbitrage avec un biais directionnel.","hook":"Partez de l'arbitrage, puis penchez vers le côté qui a le plus d'avantage.","description":"Achète les deux côtés quand Up + Down peuvent être assemblés pour moins de 1 $, puis renforce le côté que le modèle juge sous-évalué — en gardant un plancher d'arbitrage tandis que la position nette devient directionnelle. Le côté plus petit sert de couverture partielle.","specs":[{"label":"Entrée","value":"Panier Up + Down < $1"},{"label":"Inclinaison","value":"Jusqu'à 3:1 vers l'avantage"},{"label":"Ordres","value":"Ordres limités uniquement"}]},"spread-farming":{"title":"Spread Farming","tagline":"Des micro-avantages systématiques et répétables.","hook":"Mille gains de 0,5¢ finissent par composer un grand nombre.","description":"Discipliné et répétable : il se place au bid dans un spread large, puis propose ce qu'il a acheté juste à l'intérieur de l'ask, un aller-retour à la fois. Une position qui ne se vend pas à temps est vendue au bid, en acceptant la perte plutôt que le risque.","specs":[{"label":"Avantage","value":"Spread bid-ask"},{"label":"Journalisation","value":"Par trade + session"}]},"sports":{"title":"Sports Betting Execution","tagline":"Vitesse click-to-bet sur les marchés sportifs en direct.","hook":"Clic. Exécuté. Terminé.","description":"Devancez le mouvement de cote qui fait perdre son avantage à tout parieur manuel avant même qu'il n'ait confirmé l'ordre. Cotes en temps réel combinées à une exécution FAK rapide.","specs":[{"label":"Sports","value":"NBA, NFL, Soccer +"}]},"resolution-sniper":{"title":"Resolution Sniper","tagline":"Des issues quasi certaines, conservées jusqu'à la résolution.","hook":"De petits gains, et la rare perte qui coûte presque toute la mise.","description":"Achète une issue cotée près de $1 sur un marché sur le point de se terminer, et la conserve jusqu'à la résolution. Quasi certain ne veut pas dire certain : un prix de 97¢ ne rapporte que si l'issue se réalise plus de 97 % du temps, et une surprise peut effacer des dizaines de gains.","specs":[{"label":"Certitude","value":"Configurable"},{"label":"Paiement","value":"$1.00 / part gagnante"},{"label":"Plateformes","value":"Predict.fun"}]},"orderbook-imbalance":{"title":"Orderbook Imbalance","tagline":"Signal de flux d'ordres pur, aucune donnée externe requise.","hook":"Pas d'abonnement ni de flux externes.","description":"Le signal, c'est l'order book lui-même. Le bot compare la taille des bids et des asks en haut du carnet, achète le côté que favorise le déséquilibre, et sort sur un objectif fixe, un stop ou une limite de temps. La taille affichée est facile à truquer et chaque entrée franchit le spread : le signal doit donc couvrir ce coût.","specs":[{"label":"Signal","value":"Carnet d'ordres en direct uniquement"},{"label":"Positions","value":"Plafonnées, 5 par défaut"},{"label":"Plateformes","value":"Predict.fun"}]},"market-making":{"title":"Market Making","tagline":"Cotations des deux côtés avec biais d'inventaire.","hook":"Cotez des deux côtés et gérez ce que vous finissez par détenir.","description":"Cote des deux côtés autour du point médian et gagne le spread quand les deux sont exécutés, en décalant ses cotations à l'opposé de l'inventaire détenu. Chaque cotation a une expiration. Un marché qui traverse vos cotations en tendance peut coûter plus que ce que rapporte le spread.","specs":[{"label":"Gestion d'ordres","value":"Annulation auto + recotation"},{"label":"Inventaire","value":"Biais + plafonds stricts"},{"label":"Plateformes","value":"Predict.fun"}]},"whale-signal":{"title":"On-Chain Whale Signal","tagline":"Suivez les gros trades et de nombreux wallets à la fois.","hook":"Un gros trade est un signal, pas une promesse.","description":"Suit de nombreux wallets à la fois, chacun avec sa propre limite de dépense, ou tout gros trade lorsqu'aucun wallet n'est listé. Il lit le flux de trades de Predict.fun, donc il voit un trade après qu'il a eu lieu, et l'ignore si le prix a déjà trop bougé.","specs":[{"label":"Source","value":"Flux de trades Predict.fun"},{"label":"Limite de poursuite","value":"3¢"}]}}},"engine":{"eyebrow":"Sous le capot","headlineLine1":"Conçu en Rust.","headlineLine2":"Réglé pour les marchés prédictifs.","description":"Bâti sur les garanties qu'offre Rust — et la vitesse que rend possible le runtime asynchrone de Tokio. Chaque stratégie partage le même chemin d'exécution, les mêmes hooks de risque, la même surface d'observabilité.","features":[{"icon":"🦀","title":"Rust + Tokio","body":"Pas de pauses GC en plein trade. Pas de data races en exécution concurrente. Pas de surprises de pointeur nul. Léger, prévisible, rapide sous pression."},{"icon":"🔌","title":"Adaptateurs agnostiques","body":"Une seule surface d'API, avec pour l'instant des adaptateurs pour Predict.fun et Polymarket. Les stratégies référencent VenueId, et non des types propres à chaque plateforme."},{"icon":"🖥️","title":"TUI en temps réel","body":"Interface terminal propulsée par ratatui, avec streaming des logs en direct, gravité codée par couleur et vues d'état par bot."},{"icon":"⚙️","title":"Ordres FAK & GTD","body":"Types d'ordre Fill-or-Kill et Good-Till-Date avec résolution automatique de l'ID de marché. Exécution concurrente, à débit limité."}],"performanceEyebrow":"Performance","performanceHeadline":"Des chiffres qui comptent quand la milliseconde coûte de l'argent.","metrics":[{"metric":"< 1ms","label":"Traitement des événements"},{"metric":"< 100ms","label":"Exécution des ordres"},{"metric":"~200ms","label":"Polling des positions"},{"metric":"~50MB","label":"Empreinte mémoire"},{"metric":"< 5%","label":"Utilisation CPU"},{"metric":"25 / 10s","label":"Limite de débit (configurable)"}]},"safety":{"eyebrow":"Conception axée risque","headlineLine1":"La vitesse sans garde-fous,","headlineLine2":"ce n'est que perdre cher.","description":"Chaque ordre traverse un pipeline de risque à quatre couches avant d'atteindre l'exchange. Coupe-circuits, contrôles de profondeur, planchers de taille et dry-run complet — câblés dans le même cœur d'exécution qu'utilise chaque bot.","layers":[{"icon":"🛑","title":"Coupe-circuit","body":"Arrêt automatique après N gros trades consécutifs dans une fenêtre glissante configurable. Stoppe les cascades avant qu'elles ne démarrent.","accent":"text-rose-400"},{"icon":"🛡️","title":"Garde de profondeur du carnet","body":"Valide la liquidité avant chaque ordre. Aucun remplissage dans un carnet peu profond — point.","accent":"text-amber-400"},{"icon":"🧪","title":"Mode Dry Run","body":"Le chemin d'exécution complet tourne sans passer de vrais ordres. Validez signaux et dimensionnement sans aucun capital à risque.","accent":"text-cyan-400"},{"icon":"⚖️","title":"Plancher de taille de trade","body":"Taille minimale imposée à chaque ordre. Filtre automatiquement les micro-trades à EV négative.","accent":"text-emerald-400"}],"ladderTitle":"Échelle de déploiement","ladderSubtitle":"Une courte checklist pour passer de zéro à la production.","ladder":[{"stage":"Installation","action":"Lancez avec enable_trading: false pendant une session complète."},{"stage":"Premiers trades","action":"Gardez copy_percentage entre 5 et 10 % jusqu'à ce que vous ayez confiance dans le signal."},{"stage":"En continu","action":"Surveillez les déclenchements du coupe-circuit — ils révèlent les anomalies d'exécution."},{"stage":"Production","action":"Utilisez un wallet dédié, avec uniquement le capital que vous comptez déployer."}]},"howItWorks":{"eyebrow":"Comment ça marche","headline":"Du dépôt au bot en direct, en trois étapes.","description":"Aucune boîte noire. Vous exécutez le même moteur Rust que montrent les captures — sur votre machine, avec vos clés, votre capital.","steps":[{"num":"01","title":"Choisissez votre avantage","body":"Sélectionnez la stratégie et la plateforme qui collent à votre thèse. Chaque bot est un avantage de marché distinct et bien défini sur le moteur commun."},{"num":"02","title":"Configurez & testez en dry-run","body":"Insérez vos clés, fixez les limites de risque et lancez avec enable_trading: false jusqu'à ce que vous ayez confiance dans le signal — sans aucun capital à risque."},{"num":"03","title":"Passez en direct","body":"Quand vous êtes prêt, suivez le guide du trading en direct et activez un wallet dédié contenant uniquement ce que vous pouvez vous permettre de perdre. Aucun ordre réel n'a encore été testé, commencez donc petit. Suivez les exécutions, le P&L et l'état du coupe-circuit dans la TUI en temps réel."}],"getTitle":"Ce que vous obtenez","gets":["Le code source Rust complet — sous licence MIT, à lire et modifier à volonté","Une installation guidée — une aide directe pour lancer votre premier bot","La couche de risque partagée — coupe-circuit, garde de profondeur, dry-run, plancher de trade","Des mises à jour continues — nouvelles plateformes et améliorations de stratégies au fil des livraisons"],"note":"Source disponible avec installation accompagnée. Écrivez sur Telegram pour l'accès et les tarifs.","cta":"Obtenir l'accès sur Telegram"},"cta":{"eyebrow":"Commencer","headline":"Prêt à mettre un bot au travail ?","description":"Telegram pour un échange direct, discuter du périmètre ou une installation payante. GitHub pour le dépôt open source, la documentation de configuration et le code en direct. Le temps de réponse sur Telegram est généralement de quelques heures.","ctaTelegram":"@tarpboi sur Telegram","ctaGithub":"Parcourir le dépôt","pillars":[{"title":"Open source","body":"Sous licence MIT. Lisez le code, forkez-le, construisez dessus."},{"title":"Activement maintenu","body":"Le dépôt livre régulièrement correctifs et améliorations de stratégies."},{"title":"Ligne directe","body":"Pas de tickets de support. Vous parlez à la personne qui a écrit le bot."}]},"footer":{"productName":"PnL Profit","tagline":"Predict.fun · Polymarket · Kalshi","disclaimerLabel":"Avertissement.","rights":"Sous licence MIT · Conçu pour la communauté des marchés prédictifs.","disclaimer":"Trader sur les marchés de prédiction comporte un risque financier réel. Ce logiciel est fourni « en l'état », sans garantie ni assurance d'aucun résultat. Il ne constitue pas un conseil financier. Testez toujours avec {flag} avant de déployer du capital réel. Assurez-vous de respecter les conditions d'utilisation de chaque plateforme ainsi que les réglementations applicables dans votre juridiction."}},
  de: {"langName":{"en":"English","zh":"简体中文","ru":"Русский"},"nav":{"strategies":"Strategien","managed":"Verwaltet","venues":"Handelsplätze","engine":"Engine","safety":"Sicherheit","blog":"Blog","contact":"Kontakt","github":"GitHub","telegram":"Telegram","langSwitch":"Sprache"},"venues":{"eyebrow":"Handelsplatz-Abdeckung","headline":"Eine Engine. Jeder Handelsplatz.","description":"Die Engine ist plattformunabhängig — jede Plattform mit Orderbuch oder Positions-Feed wird über einen einzigen Adapter angebunden. Einundzwanzig Handelsplätze haben ein eigenes Bot-Repository, von krypto-nativen Börsen bis zu regulierten Brokern.","cardCta":"Repo öffnen →","footnote":"Soll ein Handelsplatz bevorzugt werden? Die Adapter-Arbeit richtet sich nach der Nachfrage — wenn du auf einer Plattform handelst, die dir wichtig ist, kann sie in der Warteschlange aufsteigen.","footnoteCta":"Handelsplatz anfragen →"},"managed":{"eyebrow":"Verwaltet & Copy-Trading","headline":"Keine Lust, Infrastruktur zu betreiben? Überlass es uns.","description":"Handle mit derselben Engine als Service. Eröffne ein verwaltetes Konto, wähle einen bewährten Leader aus dem On-Chain-Leaderboard oder eine Strategie, und lass die gehosteten Bots laufen — du beobachtest Kontostand, P&L und Gebühren auf einem Live-Dashboard.","statusNote":"⏸️ Der gehostete Dienst ist derzeit geschlossen. Er lief als Paper-Trading-Beta — simulierte Mittel, keine Verwahrung — und hat nie echtes Geld bewegt. Der unterstützte Weg heute ist die Open-Source-Engine: deine Keys, deine Wallet, standardmäßig Dry-run.","stats":[{"value":"520+","label":"GitHub-Sterne"},{"value":"21","label":"Handelsplätze"},{"value":"1 / 10","label":"Strategien live"},{"value":"Dry-run","label":"Standardmäßig"}],"featuresTitle":"Das bekommst du","features":[{"icon":"📈","title":"On-Chain-Leaderboard","body":"Echte Polymarket-Wallets, gerankt nach verifizierbarem On-Chain-P&L (Profit oder Volumen, 1T/7T/30T/gesamt). Ein Klick, um einem bewährten Trader zu folgen."},{"icon":"🤖","title":"Gehostete Strategie-Bots","body":"Dieselbe Execution-Engine, für dich betrieben. Keine Keys, keine Server, kein Betrieb."},{"icon":"💰","title":"Venueübergreifende Arbitrage","body":"Live-Preise über Polymarket ↔ Kalshi ↔ PredictIt, mit Manifold als Spielgeld-Konsenssignal."},{"icon":"🛡️","title":"Dieselbe Sicherheitsschicht","body":"Circuit Breaker, Tiefen-Guard, Trade-Floor — die Schutzmechanismen der Open-Source-Engine, angewandt auf jedes verwaltete Konto."}]},"hero":{"badge":"Open Source · Self-Custody · standardmäßig Dry-Run","headlineLine1":"Kopiere bewährte Trader.","headlineLine2":"Profit auf Autopilot.","ctaGithub":"Auf GitHub ansehen","stats":[{"label":"Orderausführung","value":"< 100ms","unit":"end-to-end"},{"label":"Event-Verarbeitung","value":"< 1ms","unit":"pro Event"},{"label":"Speicher-Baseline","value":"~50MB","unit":"resident"},{"label":"CPU unter Last","value":"< 5%","unit":"moderne Hardware"}],"description":"Eine Open-Source-Engine in Rust für {predictfun}, {polymarket}, {kalshi}, {limitless} und 17 weitere Prognosemarkt-Plattformen — ein Ausführungskern, eine Risikoschicht. Alle zehn Strategien laufen auf Predict.fun im Dry-run, und Copy Trading auf Polymarket ist auf CLOB V2 aktualisiert. Bisher wurde noch keine echte Order getestet. Deine Schlüssel, dein Wallet, standardmäßig Dry-run."},"liveSignal":{"eyebrow":"Live-Signal","headline":"BTC/USDT — der Markt, den die Bots beobachten","sub":"Echtzeit-Spot-Preis, direkt aus dem Orderbuch gestreamt.","statusLive":"Live","statusOffline":"Offline","statusConnecting":"Verbinde","pair":"BTC / USDT","sessionLabel":"· Session","attribution":"Charts von TradingView","footnote":"Quelle: {source}. Die BTC-Up/Down-Märkte von Polymarket werden gegen {chainlink} aufgelöst, die Daten von Binance, Coinbase, Kraken und anderen großen Handelsplätzen aggregieren – was Sie hier sehen, ist also ein getreues Echtzeit-Abbild des Preises, gegen den die Bots handeln."},"bots":{"eyebrow":"Das Aufgebot","headline":"Zehn Strategien. Eine Engine.","description":"Jeder Bot zielt auf einen eigenen, klar definierten Marktvorteil — Copy Trading, Arbitrage, Market Making, Orderfluss-Signale. Alle teilen sich denselben Ausführungskern, dieselbe Risikoschicht und dieselben Plattform-Adapter, und alle laufen heute im Dry-run. Wähle den Vorteil, der zu deiner These passt, und belege ihn, bevor du ihn finanzierst.","statusProduction":"Produktion","statusDev":"Dry-run","cardCta":"Diesen Bot besprechen","cardCtaSuffix":"→ Telegram","items":{"copy-trading":{"title":"Copy Trading","tagline":"Spiegle Top-Wallets automatisch mit konfigurierbarer Positionsgröße und Risikolimits.","hook":"Lagere Alpha an Wallets aus, die es bereits bewiesen haben.","description":"Verfolgt ein erfolgreiches Wallet und spiegelt dessen Käufe nahezu in Echtzeit, dimensioniert nach deinen Regeln. Ausstiege laufen über deine Take-Profit- und Stop-Loss-Einstellungen, statt die Verkäufe des Wallets zu kopieren. Läuft auf Predict.fun und Polymarket.","specs":[{"label":"Verfolgtes Wallet","value":"Eines pro Bot"},{"label":"Order-Typen","value":"FAK"},{"label":"Risiko","value":"Circuit Breaker + Limits"},{"label":"Dry Run","value":"Voll unterstützt"}]},"btc-arb":{"title":"BTC 5m / 15m / 1hr Arbitrage","tagline":"Tempo auf BTC-Up/Down-Märkten mit kurzem Fenster.","hook":"Im Orderbuch, bevor du den Titel zu Ende gelesen hast.","description":"Beobachtet BTC-Up/Down-Fenster. Sobald eine Preisineffizienz auftaucht, platziert der Bot eine latenzarme FAK, bevor das Fenster schließt. Menschliche Reflexe haben hier keine Chance.","specs":[{"label":"Märkte","value":"BTC Up/Down 5m–1hr"},{"label":"Order-Typ","value":"FAK"}]},"cross-arb":{"title":"Cross-Venue Arbitrage","tagline":"Preisunterschiede zwischen verknüpften Märkten auf zwei Plattformen finden.","hook":"Die Lücke erkennen, dann selbst prüfen.","description":"Predict.fun veröffentlicht, mit welchem Polymarket-Markt jeder seiner Märkte verknüpft ist. Der Bot paart sie über diese Verknüpfung und meldet eine Lücke nur, wenn sie die Gebühren auf beiden Plattformen übersteigt. Er meldet nur und handelt nicht, weil ein ausgeführtes Bein ohne das andere eine ungedeckte Position ist.","specs":[{"label":"Handelsplätze","value":"Predict.fun ↔ Polymarket"},{"label":"Vorteilsschwelle","value":"≥ Gebühren, konfigurierbar"},{"label":"Modus","value":"Nur Meldungen"}]},"directional-arb":{"title":"Directional Arbitrage","tagline":"Arbitrage-Basis mit direktionaler Neigung.","hook":"Starte mit Arbitrage, lehne dich dann in die Seite mit mehr Vorteil.","description":"Kauft beide Seiten, wenn Up + Down für unter $1 zusammengestellt werden können, und stockt dann die Seite auf, die das Modell als unterbewertet einschätzt — mit einem Arbitrage-Floor als Basis, während die Nettoposition direktional wird. Die kleinere Seite wirkt als Teil-Hedge.","specs":[{"label":"Einstieg","value":"Up + Down < $1 Korb"},{"label":"Neigung","value":"Bis zu 3:1 zum Vorteil"},{"label":"Orders","value":"Nur Limit"}]},"spread-farming":{"title":"Spread Farming","tagline":"Systematische, wiederholbare Mikro-Vorteile.","hook":"Tausend 0,5¢-Gewinne summieren sich zu einer großen Zahl.","description":"Diszipliniert und wiederholbar: Er stellt sich innerhalb eines weiten Spreads ins Bid und bietet das Gekaufte knapp innerhalb des Ask an, immer ein Round Trip nach dem anderen. Eine Position, die nicht rechtzeitig verkauft wird, geht zum Bid raus — er nimmt den Verlust in Kauf statt das Risiko.","specs":[{"label":"Vorteil","value":"Bid-Ask-Spread"},{"label":"Logging","value":"Pro Trade + Session"}]},"sports":{"title":"Sports Betting Execution","tagline":"Click-to-Bet-Tempo auf Live-Sportmärkten.","hook":"Klick. Ausgeführt. Fertig.","description":"Schlage die Kursbewegung, die jedem anderen manuellen Wetter seinen Vorteil kostet, bevor er die Order überhaupt bestätigt hat. Echtzeit-Quoten kombiniert mit schneller FAK-Ausführung.","specs":[{"label":"Sportarten","value":"NBA, NFL, Fußball +"}]},"resolution-sniper":{"title":"Resolution Sniper","tagline":"Fast sichere Ausgänge, gehalten bis zur Auflösung.","hook":"Kleine Gewinne und der seltene Verlust, der fast den ganzen Einsatz kostet.","description":"Kauft einen Ausgang mit einem Preis nahe $1 in einem Markt, der bald endet, und hält ihn bis zur Auflösung. Fast sicher ist nicht sicher: Ein Preis von 97¢ zahlt sich nur aus, wenn der Ausgang in mehr als 97% der Fälle eintritt, und eine Überraschung kann Dutzende Gewinne auslöschen.","specs":[{"label":"Gewissheit","value":"Konfigurierbar"},{"label":"Auszahlung","value":"$1.00 / Gewinn-Share"},{"label":"Handelsplätze","value":"Predict.fun"}]},"orderbook-imbalance":{"title":"Orderbook Imbalance","tagline":"Reines Order-Flow-Signal, keine externen Daten nötig.","hook":"Keine Abos und keine externen Feeds.","description":"Das Signal ist das Orderbuch selbst. Der Bot vergleicht die Bid- und Ask-Größe an der Spitze des Buchs, kauft die Seite, die das Ungleichgewicht begünstigt, und steigt bei einem festen Ziel, Stop oder Zeitlimit aus. Angezeigte Größe lässt sich billig vortäuschen, und jeder Einstieg überquert den Spread — das Signal muss diese Kosten übertreffen.","specs":[{"label":"Signal","value":"Nur Live-Orderbuch"},{"label":"Positionen","value":"Begrenzt, standardmäßig 5"},{"label":"Handelsplätze","value":"Predict.fun"}]},"market-making":{"title":"Market Making","tagline":"Zweiseitige Quotes mit Bestandsneigung.","hook":"Beide Seiten quoten und verwalten, was du am Ende hältst.","description":"Quotet beide Seiten um den Mittelpunkt und verdient den Spread, wenn beide ausgeführt werden, wobei die Quotes vom gehaltenen Bestand weggeneigt werden. Jede Quote hat ein Ablaufdatum. Ein Markt, der als Trend durch deine Quotes läuft, kann mehr kosten, als der Spread einbringt.","specs":[{"label":"Order-Management","value":"Auto-Cancel + Requote"},{"label":"Inventar","value":"Neigung + harte Limits"},{"label":"Handelsplätze","value":"Predict.fun"}]},"whale-signal":{"title":"On-Chain Whale Signal","tagline":"Große Trades und viele Wallets gleichzeitig verfolgen.","hook":"Ein großer Trade ist ein Signal, kein Versprechen.","description":"Folgt vielen Wallets gleichzeitig, jedes mit eigenem Ausgabenlimit, oder jedem großen Trade, wenn keine Wallets aufgelistet sind. Er liest den Trade-Feed von Predict.fun, sieht einen Trade also erst nach dem Geschehen und überspringt ihn, wenn sich der Preis schon zu weit bewegt hat.","specs":[{"label":"Quelle","value":"Predict.fun-Trade-Feed"},{"label":"Nachlauf-Limit","value":"3¢"}]}}},"engine":{"eyebrow":"Unter der Haube","headlineLine1":"In Rust entwickelt.","headlineLine2":"Auf Prognosemärkte abgestimmt.","description":"Aufgebaut auf den Garantien, die Rust dir gibt — und der Geschwindigkeit, die Tokios Async-Runtime möglich macht. Jede Strategie teilt denselben Ausführungspfad, dieselben Risiko-Hooks, dieselbe Observability-Oberfläche.","features":[{"icon":"🦀","title":"Rust + Tokio","body":"Keine GC-Pausen mitten im Trade. Keine Data Races bei nebenläufiger Ausführung. Keine Null-Pointer-Überraschungen. Schlank, vorhersehbar, schnell unter Druck."},{"icon":"🔌","title":"Plattformunabhängige Adapter","body":"Eine gemeinsame API-Oberfläche, bisher mit Adaptern für Predict.fun und Polymarket. Strategien verweisen auf VenueId — nicht auf plattformspezifische Typen."},{"icon":"🖥️","title":"Echtzeit-TUI","body":"ratatui-basierte Terminal-Oberfläche mit Live-Log-Streaming, farbcodierter Schweregrad-Anzeige und Statusansichten pro Bot."},{"icon":"⚙️","title":"FAK- & GTD-Orders","body":"Fill-or-Kill- und Good-Till-Date-Order-Typen mit automatischer Market-ID-Auflösung. Nebenläufige Ausführung, ratenbegrenzt."}],"performanceEyebrow":"Performance","performanceHeadline":"Zahlen, die zählen, wenn Millisekunden Geld kosten.","metrics":[{"metric":"< 1ms","label":"Event-Verarbeitung"},{"metric":"< 100ms","label":"Orderausführung"},{"metric":"~200ms","label":"Positions-Polling"},{"metric":"~50MB","label":"Speicher-Baseline"},{"metric":"< 5%","label":"CPU-Auslastung"},{"metric":"25 / 10s","label":"Rate-Limit (konfigurierbar)"}]},"safety":{"eyebrow":"Risk-First-Design","headlineLine1":"Tempo ohne Schutzmechanismen","headlineLine2":"ist nur teures Verlieren.","description":"Jede Order durchläuft eine vierstufige Risiko-Pipeline, bevor sie die Börse erreicht. Circuit Breaker, Tiefenprüfungen, Größen-Floors und vollständiger Dry-Run — eingebettet in denselben Ausführungskern, den jeder Bot nutzt.","layers":[{"icon":"🛑","title":"Circuit Breaker","body":"Stoppt automatisch nach N aufeinanderfolgenden großen Trades innerhalb eines konfigurierbaren gleitenden Fensters. Stoppt Kaskaden, bevor sie beginnen.","accent":"text-rose-400"},{"icon":"🛡️","title":"Orderbuch-Tiefen-Guard","body":"Prüft die Liquidität vor jeder Order. Keine Fills in dünne Orderbücher — Punkt.","accent":"text-amber-400"},{"icon":"🧪","title":"Dry-Run-Modus","body":"Der vollständige Ausführungspfad läuft, ohne echte Orders zu platzieren. Validiere Signale und Positionsgrößen ohne jedes Kapitalrisiko.","accent":"text-cyan-400"},{"icon":"⚖️","title":"Trade-Größen-Floor","body":"Mindestgrößen-Durchsetzung bei jeder Order. Filtert Mikro-Trades mit negativem EV automatisch heraus.","accent":"text-emerald-400"}],"ladderTitle":"Deployment-Leiter","ladderSubtitle":"Eine kurze Checkliste für den Weg von null zur Produktion.","ladder":[{"stage":"Einrichtung","action":"Laufe mit enable_trading: false für eine volle Session."},{"stage":"Erste Trades","action":"Halte copy_percentage bei 5–10 %, bis du dem Signal vertraust."},{"stage":"Laufend","action":"Beobachte Circuit-Breaker-Auslösungen — sie decken Ausführungsanomalien auf."},{"stage":"Produktion","action":"Nutze eine dedizierte Wallet mit nur dem Kapital, das du einsetzen willst."}]},"howItWorks":{"eyebrow":"So funktioniert's","headline":"Vom Repo zum Live-Bot in drei Schritten.","description":"Keine Blackbox. Du betreibst dieselbe Rust-Engine, die die Screenshots zeigen — auf deiner Maschine, deinen Keys, deinem Kapital.","steps":[{"num":"01","title":"Wähle deinen Vorteil","body":"Wähle die Strategie und den Handelsplatz, die zu deiner These passen. Jeder Bot ist ein eigener, klar definierter Marktvorteil auf der gemeinsamen Engine."},{"num":"02","title":"Konfigurieren & Dry-Run","body":"Trage deine Keys ein, setze Risikolimits und laufe mit enable_trading: false, bis du dem Signal vertraust — ohne Kapitalrisiko."},{"num":"03","title":"Live gehen","body":"Wenn du bereit bist, folge der Anleitung für den Live-Handel und schalte ein eigenes Wallet frei, das nur enthält, was du dir zu verlieren leisten kannst. Bisher wurde noch keine echte Order getestet, also fang klein an. Behalte Fills, P&L und den Circuit-Breaker-Status in der Echtzeit-TUI im Blick."}],"getTitle":"Das bekommst du","gets":["Vollständiger Rust-Quellcode — MIT-lizenziert, deiner zum Lesen und Anpassen","Geführte Einrichtung — direkte Hilfe, um deinen ersten Bot zum Laufen zu bringen","Die gemeinsame Risikoschicht — Circuit Breaker, Tiefen-Guard, Dry-Run, Trade-Floor","Laufende Updates — neue Handelsplätze und Strategie-Upgrades, sobald sie erscheinen"],"note":"Source-available mit praktischer Einrichtung. Schreib auf Telegram für Zugang und Preise.","cta":"Zugang auf Telegram erhalten"},"cta":{"eyebrow":"Loslegen","headline":"Bereit, einen Bot arbeiten zu lassen?","description":"Telegram für direktes Gespräch, Scope-Klärung oder bezahlte Einrichtung. GitHub für das Open-Source-Repo, die Konfigurationsdocs und die Live-Codebasis. Die Antwortzeit auf Telegram beträgt typischerweise wenige Stunden.","ctaTelegram":"@tarpboi auf Telegram","ctaGithub":"Repo durchstöbern","pillars":[{"title":"Open Source","body":"MIT-lizenziert. Lies den Code, forke ihn, bau darauf auf."},{"title":"Aktiv gepflegt","body":"Das Repo liefert regelmäßig Fixes und Strategie-Upgrades."},{"title":"Direkter Draht","body":"Keine Support-Tickets. Du sprichst mit der Person, die den Bot geschrieben hat."}]},"footer":{"productName":"PnL Profit","tagline":"Predict.fun · Polymarket · Kalshi","disclaimerLabel":"Haftungsausschluss.","rights":"MIT-lizenziert · Gebaut für die Prognosemarkt-Community.","disclaimer":"Der Handel mit Prognosemärkten ist mit echtem finanziellem Risiko verbunden. Diese Software wird ohne Mängelgewähr bereitgestellt, ohne Garantie oder Zusicherung eines bestimmten Ergebnisses. Sie stellt keine Finanzberatung dar. Testen Sie stets mit {flag}, bevor Sie echtes Kapital einsetzen. Stellen Sie die Einhaltung der Nutzungsbedingungen des jeweiligen Handelsplatzes sowie der geltenden Vorschriften in Ihrer Rechtsordnung sicher."}},
  it: {"langName":{"en":"English","zh":"简体中文","ru":"Русский"},"nav":{"strategies":"Strategie","managed":"Gestito","venues":"Piattaforme","engine":"Engine","safety":"Sicurezza","blog":"Blog","contact":"Contatti","github":"GitHub","telegram":"Telegram","langSwitch":"Lingua"},"venues":{"eyebrow":"Copertura piattaforme","headline":"Un solo engine. Ogni piattaforma.","description":"Il motore è agnostico rispetto alla piattaforma: qualsiasi piattaforma con order book o feed delle posizioni si collega tramite un singolo adattatore. Ventuno piattaforme hanno un repository bot dedicato, dagli exchange cripto nativi ai broker regolamentati.","cardCta":"Apri repo →","footnote":"Vuoi che diamo priorità a una piattaforma? Il lavoro sugli adattatori segue la domanda: se operi su una piattaforma che ti interessa, può salire in coda.","footnoteCta":"Richiedi una piattaforma →"},"managed":{"eyebrow":"Gestito & Copy-Trading","headline":"Non vuoi gestire l'infrastruttura? Ci pensiamo noi.","description":"Opera con lo stesso engine, ma come servizio. Apri un account gestito, scegli un leader comprovato dalla leaderboard on-chain o una strategia, e lascia lavorare i bot in hosting: monitori saldo, P&L e commissioni su una dashboard live.","statusNote":"⏸️ Il servizio gestito è chiuso al momento. Girava come beta di paper trading — fondi simulati, nessuna custodia — e non ha mai gestito denaro reale. Il modo supportato oggi è il motore open source: le tue chiavi, il tuo wallet, dry-run di default.","stats":[{"value":"520+","label":"Stelle GitHub"},{"value":"21","label":"Piattaforme"},{"value":"1 / 10","label":"Strategie live"},{"value":"Dry-run","label":"Di default"}],"featuresTitle":"Cosa ottieni","features":[{"icon":"📈","title":"Leaderboard on-chain","body":"Wallet Polymarket reali ordinati per P&L on-chain verificabile (profitto o volume, 1g/7g/30g/all-time). Un clic per copiare un trader comprovato."},{"icon":"🤖","title":"Bot di strategia in hosting","body":"Lo stesso engine di esecuzione, gestito per te. Niente chiavi, niente server, niente operatività."},{"icon":"💰","title":"Arbitraggio cross-venue","body":"Prezzi live su Polymarket ↔ Kalshi ↔ PredictIt, con Manifold come segnale di consenso a denaro virtuale."},{"icon":"🛡️","title":"Stesso livello di sicurezza","body":"Circuit breaker, depth guard, trade floor — le protezioni dell'engine open source, applicate a ogni account gestito."}]},"hero":{"badge":"Open source · self-custody · dry-run di default","headlineLine1":"Copia trader comprovati.","headlineLine2":"Profitti in automatico.","ctaGithub":"Vedi su GitHub","stats":[{"label":"Esecuzione ordini","value":"< 100ms","unit":"end-to-end"},{"label":"Elaborazione eventi","value":"< 1ms","unit":"per evento"},{"label":"Baseline memoria","value":"~50MB","unit":"residente"},{"label":"CPU sotto carico","value":"< 5%","unit":"hardware moderno"}],"description":"Un motore open source in Rust per {predictfun}, {polymarket}, {kalshi}, {limitless} e altre 17 piattaforme di prediction market: un unico nucleo di esecuzione, un unico livello di rischio. Tutte e dieci le strategie girano su Predict.fun in dry-run, e il copy trading su Polymarket è aggiornato per CLOB V2. Finora non è stato testato nessun ordine reale. Le tue chiavi, il tuo wallet, dry-run di default."},"liveSignal":{"eyebrow":"Segnale live","headline":"BTC/USDT — il mercato che i bot osservano","sub":"Prezzo spot in tempo reale, in streaming diretto dall'order book.","statusLive":"Live","statusOffline":"Offline","statusConnecting":"Connessione","pair":"BTC / USDT","sessionLabel":"· sessione","attribution":"Grafici di TradingView","footnote":"Fonte: {source}. I mercati BTC Up/Down di Polymarket si risolvono in base a {chainlink}, che aggregano i dati da Binance, Coinbase, Kraken e altre importanti piattaforme — quindi ciò che vedi qui è un fedele riferimento in tempo reale del prezzo contro cui operano i bot."},"bots":{"eyebrow":"La formazione","headline":"Dieci strategie. Un solo engine.","description":"Ogni bot punta a un vantaggio di mercato distinto e ben definito: copy trading, arbitraggio, market making, segnali sul flusso di ordini. Tutti condividono lo stesso nucleo di esecuzione, livello di rischio e adapter di piattaforma, e oggi girano tutti in dry-run. Scegli il vantaggio che si adatta alla tua tesi e dimostralo prima di finanziarlo.","statusProduction":"Produzione","statusDev":"Dry-run","cardCta":"Parla di questo bot","cardCtaSuffix":"→ Telegram","items":{"copy-trading":{"title":"Copy Trading","tagline":"Replica automaticamente i migliori wallet con sizing e limiti di rischio configurabili.","hook":"Delega l'alpha ai wallet che hanno già dimostrato di averlo.","description":"Segue un wallet ad alte prestazioni e ne replica gli acquisti quasi in tempo reale, con dimensioni decise dalle tue regole. Le uscite seguono le tue impostazioni di take-profit e stop-loss invece di copiare le vendite del wallet. Funziona su Predict.fun e Polymarket.","specs":[{"label":"Wallet seguito","value":"Uno per bot"},{"label":"Tipi di ordine","value":"FAK"},{"label":"Rischio","value":"Circuit breaker + limiti"},{"label":"Dry run","value":"Pienamente supportato"}]},"btc-arb":{"title":"Arbitraggio BTC 5m / 15m / 1h","tagline":"Velocità sui mercati BTC Up/Down a finestra breve.","hook":"Nel book prima che tu finisca di leggere il titolo.","description":"Osserva le finestre BTC Up/Down. Quando emerge un'inefficienza di prezzo, il bot piazza un FAK a bassa latenza prima che la finestra si chiuda. I riflessi umani qui non competono.","specs":[{"label":"Mercati","value":"BTC Up/Down 5m–1h"},{"label":"Tipo di ordine","value":"FAK"}]},"cross-arb":{"title":"Arbitraggio Cross-Venue","tagline":"Trova differenze di prezzo tra mercati collegati su due piattaforme.","hook":"Individua il divario, poi verificalo tu stesso.","description":"Predict.fun pubblica a quale mercato Polymarket è collegato ciascuno dei suoi mercati. Il bot li abbina in base a quel collegamento e segnala un divario solo quando supera le commissioni su entrambe le piattaforme. Segnala e non opera, perché una gamba eseguita senza l'altra è una posizione scoperta.","specs":[{"label":"Piattaforme","value":"Predict.fun ↔ Polymarket"},{"label":"Soglia di edge","value":"≥ commissioni, configurabile"},{"label":"Modalità","value":"Solo segnalazioni"}]},"directional-arb":{"title":"Arbitraggio Direzionale","tagline":"Base di arbitraggio con inclinazione direzionale.","hook":"Parti dall'arbitraggio, poi pendi verso il lato con più edge.","description":"Compra entrambi i lati quando Up + Down si possono assemblare per meno di $1, poi aumenta il lato che il modello ritiene sottovalutato — mantenendo una base di arbitraggio mentre la posizione netta diventa direzionale. Il lato più piccolo funge da hedge parziale.","specs":[{"label":"Ingresso","value":"Basket Up + Down < $1"},{"label":"Inclinazione","value":"Fino a 3:1 verso l'edge"},{"label":"Ordini","value":"Solo limit"}]},"spread-farming":{"title":"Spread Farming","tagline":"Micro-edge sistematici e ripetibili.","hook":"Mille vincite da 0,5¢ si compongono in un grande numero.","description":"Disciplinato e ripetibile: si mette al bid dentro uno spread ampio, poi offre ciò che ha comprato appena dentro l'ask, un round trip alla volta. Una posizione che non si vende in tempo viene venduta al bid, accettando la perdita invece del rischio.","specs":[{"label":"Edge","value":"Spread bid-ask"},{"label":"Logging","value":"Per trade + sessione"}]},"sports":{"title":"Esecuzione Scommesse Sportive","tagline":"Velocità click-to-bet sui mercati sportivi live.","hook":"Clic. Eseguito. Fatto.","description":"Batti il movimento della linea che toglie l'edge a ogni altro scommettitore manuale prima ancora che confermi l'ordine. Quote in tempo reale unite a esecuzione FAK rapida.","specs":[{"label":"Sport","value":"NBA, NFL, Calcio +"}]},"resolution-sniper":{"title":"Resolution Sniper","tagline":"Esiti quasi certi, tenuti fino alla risoluzione.","hook":"Piccole vincite, e la rara perdita che costa quasi tutta la puntata.","description":"Compra un esito con prezzo vicino a $1 in un mercato che sta per chiudere e lo tiene fino alla risoluzione. Quasi certo non è certo: un prezzo di 97¢ rende solo se l'esito si verifica più del 97% delle volte, e una sorpresa può cancellare decine di vincite.","specs":[{"label":"Certezza","value":"Configurabile"},{"label":"Payout","value":"$1.00 / share vincente"},{"label":"Piattaforme","value":"Predict.fun"}]},"orderbook-imbalance":{"title":"Orderbook Imbalance","tagline":"Segnale puro di order flow, nessun dato esterno richiesto.","hook":"Nessun abbonamento e nessun feed esterno.","description":"Il segnale è l'order book stesso. Il bot confronta le dimensioni di bid e ask in cima al book, compra il lato favorito dallo squilibrio ed esce con un target fisso, uno stop o un limite di tempo. La size mostrata è facile da falsificare e ogni ingresso attraversa lo spread, quindi il segnale deve battere quel costo.","specs":[{"label":"Segnale","value":"Solo orderbook live"},{"label":"Posizioni","value":"Limitate, 5 di default"},{"label":"Piattaforme","value":"Predict.fun"}]},"market-making":{"title":"Market Making","tagline":"Quotazioni su entrambi i lati con skew sull'inventario.","hook":"Quota entrambi i lati e gestisci ciò che ti ritrovi in portafoglio.","description":"Quota entrambi i lati attorno al prezzo medio e guadagna lo spread quando entrambi vengono eseguiti, spostando le quotazioni lontano dall'inventario che detiene. Ogni quotazione ha una scadenza. Un mercato che attraversa in trend le tue quotazioni può costare più di quanto lo spread renda.","specs":[{"label":"Gestione ordini","value":"Auto-cancel + requote"},{"label":"Inventario","value":"Skew + limiti rigidi"},{"label":"Piattaforme","value":"Predict.fun"}]},"whale-signal":{"title":"Segnale Whale On-Chain","tagline":"Segui grandi operazioni e molti wallet insieme.","hook":"Una grande operazione è un segnale, non una promessa.","description":"Segue molti wallet insieme, ciascuno con il proprio limite di spesa, oppure qualsiasi grande operazione quando non ci sono wallet in elenco. Legge il feed delle operazioni di Predict.fun, quindi vede un'operazione dopo che è avvenuta e la salta se il prezzo si è già mosso troppo.","specs":[{"label":"Fonte","value":"Feed operazioni Predict.fun"},{"label":"Limite di inseguimento","value":"3¢"}]}}},"engine":{"eyebrow":"Sotto il cofano","headlineLine1":"Ingegnerizzato in Rust.","headlineLine2":"Ottimizzato per i prediction market.","description":"Costruito sulle garanzie che Rust ti dà — e sulla velocità che il runtime async di Tokio rende possibile. Ogni strategia condivide lo stesso percorso di esecuzione, gli stessi hook di rischio, la stessa superficie di osservabilità.","features":[{"icon":"🦀","title":"Rust + Tokio","body":"Nessuna pausa GC durante un trade. Nessuna data race nell'esecuzione concorrente. Nessuna sorpresa da null pointer. Snello, prevedibile, veloce sotto pressione."},{"icon":"🔌","title":"Adapter indipendenti dalla piattaforma","body":"Un'unica superficie API, per ora con adapter per Predict.fun e Polymarket. Le strategie fanno riferimento a VenueId, non a tipi specifici di una piattaforma."},{"icon":"🖥️","title":"TUI in tempo reale","body":"Interfaccia terminale basata su ratatui con streaming dei log live, severità a colori e viste di stato per ogni bot."},{"icon":"⚙️","title":"Ordini FAK & GTD","body":"Tipi di ordine Fill-or-Kill e Good-Till-Date con risoluzione automatica del market ID. Esecuzione concorrente, con rate limiting."}],"performanceEyebrow":"Performance","performanceHeadline":"Numeri che contano quando i millisecondi costano.","metrics":[{"metric":"< 1ms","label":"Elaborazione eventi"},{"metric":"< 100ms","label":"Esecuzione ordini"},{"metric":"~200ms","label":"Polling posizioni"},{"metric":"~50MB","label":"Baseline memoria"},{"metric":"< 5%","label":"Utilizzo CPU"},{"metric":"25 / 10s","label":"Rate limit (configurabile)"}]},"safety":{"eyebrow":"Design risk-first","headlineLine1":"Velocità senza protezioni","headlineLine2":"è solo perdere a caro prezzo.","description":"Ogni ordine passa attraverso una pipeline di rischio a quattro livelli prima di raggiungere l'exchange. Circuit breaker, controlli di profondità, soglie di dimensione e dry-run completo — integrati nello stesso core di esecuzione usato da ogni bot.","layers":[{"icon":"🛑","title":"Circuit Breaker","body":"Si arresta automaticamente dopo N grandi trade consecutivi entro una finestra scorrevole configurabile. Ferma le cascate prima che inizino.","accent":"text-rose-400"},{"icon":"🛡️","title":"Depth Guard dell'Orderbook","body":"Valida la liquidità prima di ogni ordine. Nessun fill su book sottili — punto.","accent":"text-amber-400"},{"icon":"🧪","title":"Modalità Dry Run","body":"L'intero percorso di esecuzione gira senza piazzare ordini reali. Valida segnali e sizing con zero capitale a rischio.","accent":"text-cyan-400"},{"icon":"⚖️","title":"Soglia di Dimensione","body":"Applicazione della dimensione minima su ogni ordine. Filtra automaticamente i micro-trade a EV negativo.","accent":"text-emerald-400"}],"ladderTitle":"Scala di deployment","ladderSubtitle":"Una breve checklist per passare da zero alla produzione.","ladder":[{"stage":"Setup","action":"Esegui con enable_trading: false per una sessione completa."},{"stage":"Primi trade","action":"Mantieni copy_percentage al 5–10% finché non ti fidi del segnale."},{"stage":"In corso","action":"Osserva gli scatti del circuit breaker — segnalano anomalie di esecuzione."},{"stage":"Produzione","action":"Usa un wallet dedicato con solo il capitale che intendi impiegare."}]},"howItWorks":{"eyebrow":"Come funziona","headline":"Dal repo al bot live in tre passi.","description":"Nessuna scatola nera. Esegui lo stesso engine Rust che vedi negli screenshot — sulla tua macchina, le tue chiavi, il tuo capitale.","steps":[{"num":"01","title":"Scegli il tuo edge","body":"Scegli la strategia e la piattaforma adatte alla tua tesi. Ogni bot è un edge di mercato distinto e ben definito sull'engine condiviso."},{"num":"02","title":"Configura & dry-run","body":"Inserisci le tue chiavi, imposta i limiti di rischio ed esegui con enable_trading: false finché non ti fidi del segnale — zero capitale a rischio."},{"num":"03","title":"Vai live","body":"Quando sei pronto, segui la guida al trading live e attiva un wallet dedicato che contenga solo ciò che puoi permetterti di perdere. Finora non è stato testato nessun ordine reale, quindi parti in piccolo. Controlla fill, P&L e stato del circuit breaker dalla TUI in tempo reale."}],"getTitle":"Cosa ottieni","gets":["Sorgente Rust completo — licenza MIT, tuo da leggere e modificare","Setup guidato — aiuto diretto per avviare il tuo primo bot","Il livello di rischio condiviso — circuit breaker, depth guard, dry-run, trade floor","Aggiornamenti continui — nuove piattaforme e upgrade di strategia man mano che escono"],"note":"Source-available con setup assistito. Scrivi su Telegram per accesso e prezzi.","cta":"Ottieni l'accesso su Telegram"},"cta":{"eyebrow":"Inizia","headline":"Pronto a mettere un bot al lavoro?","description":"Telegram per un dialogo diretto, per discutere lo scope o per il setup a pagamento. GitHub per il repo open source, la documentazione di configurazione e il codebase live. I tempi di risposta su Telegram sono in genere di poche ore.","ctaTelegram":"@tarpboi su Telegram","ctaGithub":"Sfoglia il repo","pillars":[{"title":"Open source","body":"Licenza MIT. Leggi il codice, forkalo, costruiscici sopra."},{"title":"Attivamente mantenuto","body":"Il repo rilascia fix e upgrade di strategia regolarmente."},{"title":"Linea diretta","body":"Niente ticket di supporto. Parli con chi ha scritto il bot."}]},"footer":{"productName":"PnL Profit","tagline":"Predict.fun · Polymarket · Kalshi","disclaimerLabel":"Disclaimer.","rights":"Licenza MIT · Creato per la community dei prediction market.","disclaimer":"Fare trading sui mercati di previsione comporta un rischio finanziario reale. Questo software è fornito \"così com'è\", senza garanzie né alcuna assicurazione sui risultati. Non costituisce consulenza finanziaria. Fai sempre delle prove con {flag} prima di impiegare capitale reale. Assicurati di rispettare i termini di servizio di ciascuna piattaforma e le normative applicabili nella tua giurisdizione."}},
  tr: {"langName":{"en":"English","zh":"简体中文","ru":"Русский"},"nav":{"strategies":"Stratejiler","managed":"Yönetilen","venues":"Platformlar","engine":"Motor","safety":"Güvenlik","blog":"Blog","contact":"İletişim","github":"GitHub","telegram":"Telegram","langSwitch":"Dil"},"venues":{"eyebrow":"Platform Kapsamı","headline":"Tek motor. Her platform.","description":"Motor platformdan bağımsızdır — emir defteri veya pozisyon akışı olan her platform tek bir adaptörle bağlanır. Yirmi bir platformun kendi bot deposu var; kripto yerel borsalardan düzenlemeye tabi aracı kurumlara kadar.","cardCta":"Depoyu aç →","footnote":"Bir platformun önceliklendirilmesini ister misiniz? Adaptör çalışması talebe göre ilerler — sizin için önemli bir platformda işlem yapıyorsanız sırada yükselebilir.","footnoteCta":"Platform talep et →"},"managed":{"eyebrow":"Yönetilen ve Kopya İşlem","headline":"Altyapı yönetmek istemiyor musunuz? Bizi bırakın.","description":"Aynı motoru bir hizmet olarak kullanın. Yönetilen bir hesap açın, on-chain lider tablosundan kanıtlanmış bir lider ya da bir strateji seçin ve barındırılan botlar çalışsın — siz bakiyeyi, P&L'i ve ücretleri canlı bir panelden izleyin.","statusNote":"⏸️ Barındırılan hizmet şu anda kapalı. Kâğıt üzerinde işlem beta’sı olarak çalıştı — simüle fonlar, saklama yok — ve hiçbir zaman gerçek para işlemedi. Bugün desteklenen yol açık kaynak motor: kendi anahtarlarınız, kendi cüzdanınız, varsayılan olarak dry-run.","stats":[{"value":"520+","label":"GitHub yıldızı"},{"value":"21","label":"Platformlar"},{"value":"1 / 10","label":"Canlı strateji"},{"value":"Dry-run","label":"Varsayılan"}],"featuresTitle":"Neler elde edersiniz","features":[{"icon":"📈","title":"On-chain lider tablosu","body":"Doğrulanabilir on-chain P&L'e göre sıralanmış gerçek Polymarket cüzdanları (kâr veya hacim, 1g/7g/30g/tüm zamanlar). Kanıtlanmış bir yatırımcıyı kopyalamak için tek tıklama."},{"icon":"🤖","title":"Barındırılan strateji botları","body":"Aynı yürütme motoru, sizin için çalıştırılıyor. Anahtar yok, sunucu yok, operasyon yok."},{"icon":"💰","title":"Platformlar arası arbitraj","body":"Polymarket ↔ Kalshi ↔ PredictIt genelinde canlı fiyatlama, oyun parası konsensüs sinyali olarak Manifold ile."},{"icon":"🛡️","title":"Aynı güvenlik katmanı","body":"Devre kesici, derinlik koruması, işlem tabanı — açık kaynak motorun koruma bariyerleri, her yönetilen hesaba uygulanır."}]},"hero":{"badge":"Açık kaynak · kendi saklama · varsayılan dry-run","headlineLine1":"Kanıtlanmış yatırımcıları kopyalayın.","headlineLine2":"Otomatik pilotta kâr edin.","ctaGithub":"GitHub'da Görüntüle","stats":[{"label":"Emir yürütme","value":"< 100ms","unit":"uçtan uca"},{"label":"Olay işleme","value":"< 1ms","unit":"olay başına"},{"label":"Bellek tabanı","value":"~50MB","unit":"yerleşik"},{"label":"Yük altında CPU","value":"< 5%","unit":"modern donanım"}],"description":"{predictfun}, {polymarket}, {kalshi}, {limitless} ve 17 tahmin piyasası platformu daha için açık kaynaklı bir Rust motoru — tek bir yürütme çekirdeği, tek bir risk katmanı. On stratejinin tamamı Predict.fun üzerinde dry-run olarak çalışıyor ve Polymarket'teki Copy Trading CLOB V2 için güncellendi. Henüz hiçbir gerçek emir test edilmedi. Anahtarlarınız, cüzdanınız, varsayılan olarak dry-run."},"liveSignal":{"eyebrow":"Canlı sinyal","headline":"BTC/USDT — botların izlediği piyasa","sub":"Doğrudan emir defterinden akan gerçek zamanlı spot fiyat.","statusLive":"Canlı","statusOffline":"Çevrimdışı","statusConnecting":"Bağlanıyor","pair":"BTC / USDT","sessionLabel":"· oturum","attribution":"Grafikler TradingView tarafından","footnote":"Kaynak: {source}. Polymarket'in BTC Yukarı/Aşağı piyasaları {chainlink} üzerinden sonuçlanır; bunlar Binance, Coinbase, Kraken ve diğer büyük mekanlardan gelen verileri bir araya getirir. Dolayısıyla burada gördüğünüz, botların karşısında işlem yaptığı fiyatın sadık ve gerçek zamanlı bir yansımasıdır."},"bots":{"eyebrow":"Kadro","headline":"On strateji. Tek motor.","description":"Her bot, belirgin ve iyi tanımlı bir piyasa avantajını hedefler — copy trading, arbitraj, piyasa yapıcılık, emir akışı sinyalleri. Hepsi aynı yürütme çekirdeğini, risk katmanını ve platform adaptörlerini paylaşır ve bugün hepsi dry-run olarak çalışıyor. Tezinize uyan avantajı seçin ve fonlamadan önce kanıtlayın.","statusProduction":"Üretim","statusDev":"Dry-run","cardCta":"Bu botu görüşün","cardCtaSuffix":"→ Telegram","items":{"copy-trading":{"title":"Kopya İşlem","tagline":"Yapılandırılabilir boyutlandırma ve risk limitleriyle en iyi cüzdanları otomatik yansıtın.","hook":"Alfayı, sahip olduğunu zaten kanıtlamış cüzdanlara devredin.","description":"Yüksek performanslı bir cüzdanı takip eder ve alımlarını, sizin kurallarınıza göre boyutlandırarak neredeyse gerçek zamanlı yansıtır. Çıkışlar, cüzdanın satışlarını kopyalamak yerine sizin take-profit ve stop-loss ayarlarınızla yürür. Predict.fun ve Polymarket üzerinde çalışır.","specs":[{"label":"Takip edilen cüzdan","value":"Bot başına bir"},{"label":"Emir tipleri","value":"FAK"},{"label":"Risk","value":"Circuit breaker + limitler"},{"label":"Kuru çalıştırma","value":"Tam destekli"}]},"btc-arb":{"title":"BTC 5dk / 15dk / 1sa Arbitraj","tagline":"Kısa pencereli BTC Up/Down piyasalarında hız.","hook":"Siz başlığı okumayı bitirmeden emir defterinde.","description":"BTC Up/Down pencerelerini izler. Bir fiyatlama verimsizliği ortaya çıktığında bot, pencere kapanmadan önce düşük gecikmeli bir FAK yerleştirir. İnsan refleksleri burada yarışamaz.","specs":[{"label":"Piyasalar","value":"BTC Up/Down 5dk–1sa"},{"label":"Emir tipi","value":"FAK"}]},"cross-arb":{"title":"Platformlar Arası Arbitraj","tagline":"İki platformdaki bağlantılı piyasalar arasındaki fiyat farklarını bulur.","hook":"Farkı görün, sonra kendiniz doğrulayın.","description":"Predict.fun, kendi piyasalarının her birinin hangi Polymarket piyasasına bağlı olduğunu yayınlar. Bot bu bağlantıya göre eşleştirir ve bir farkı yalnızca iki platformdaki ücretleri aştığında bildirir. Sadece bildirir, işlem yapmaz; çünkü bir bacağın dolup diğerinin dolmaması açık (korumasız) bir pozisyondur.","specs":[{"label":"Platformlar","value":"Predict.fun ↔ Polymarket"},{"label":"Avantaj eşiği","value":"≥ ücretler, yapılandırılabilir"},{"label":"Mod","value":"Yalnızca bildirir"}]},"directional-arb":{"title":"Yönlü Arbitraj","tagline":"Yönlü bir eğilimle arbitraj tabanı.","hook":"Arbitrajdan başlayın, ardından daha fazla avantajı olan tarafa yaslanın.","description":"Up + Down 1 doların altında toplanabildiğinde her iki tarafı da alır, sonra modelin değerinin altında gördüğü tarafı büyütür — net pozisyon yönlüleşirken bir arbitraj tabanı korunur. Küçük taraf kısmi hedge görevi görür.","specs":[{"label":"Giriş","value":"Up + Down < $1 sepeti"},{"label":"Eğilim","value":"Avantaja doğru 3:1'e kadar"},{"label":"Emirler","value":"Yalnızca limit"}]},"spread-farming":{"title":"Spread Çiftçiliği","tagline":"Sistematik, tekrarlanabilir mikro avantajlar.","hook":"Bin adet 0,5¢'lik kazanç, tek bir büyük rakama katlanır.","description":"Disiplinli ve tekrarlanabilir: geniş bir spread içinde bid'e katılır, aldığını ask'ın hemen içinde satışa koyar, her seferinde tek bir gidiş-dönüş. Zamanında satılmayan bir pozisyon bid'den satılır; riski değil zararı kabul eder.","specs":[{"label":"Avantaj","value":"Alış-satış spread'i"},{"label":"Kayıt","value":"İşlem başına + oturum"}]},"sports":{"title":"Spor Bahsi Yürütme","tagline":"Canlı spor piyasalarında tıkla-bahis yap hızı.","hook":"Tıkla. Gerçekleşti. Bitti.","description":"Diğer her manuel bahisçinin, emri onaylamadan bile avantajını yitirmesine yol açan çizgi hareketini geçin. Gerçek zamanlı oranlar hızlı FAK yürütmesiyle birleşir.","specs":[{"label":"Sporlar","value":"NBA, NFL, Futbol +"}]},"resolution-sniper":{"title":"Sonuçlanma Keskin Nişancısı","tagline":"Neredeyse kesin sonuçlar, çözülene kadar tutulur.","hook":"Küçük kazançlar ve nadiren gelen, neredeyse tüm stake'e mal olan kayıp.","description":"Bitmek üzere olan bir piyasada $1'e yakın fiyatlanan bir sonucu alır ve çözülene kadar tutar. Neredeyse kesin, kesin demek değildir: 97¢'lik bir fiyat, sonuç ancak %97'den fazla oranda doğru çıkarsa kazandırır ve tek bir sürpriz onlarca kazancı silebilir.","specs":[{"label":"Kesinlik","value":"Yapılandırılabilir"},{"label":"Ödeme","value":"$1.00 / kazanan hisse"},{"label":"Platformlar","value":"Predict.fun"}]},"orderbook-imbalance":{"title":"Emir Defteri Dengesizliği","tagline":"Saf emir akışı sinyali, harici veri gerektirmez.","hook":"Abonelik yok, harici veri akışı yok.","description":"Sinyal, order book'un kendisidir. Bot, defterin üst kısmındaki bid ve ask büyüklüklerini karşılaştırır, dengesizliğin lehine olduğu tarafı alır ve sabit bir hedefte, stop'ta ya da zaman sınırında çıkar. Gösterilen büyüklüğü taklit etmek ucuzdur ve her giriş spread'i geçer, bu yüzden sinyalin bu maliyeti aşması gerekir.","specs":[{"label":"Sinyal","value":"Yalnızca canlı emir defteri"},{"label":"Pozisyonlar","value":"Sınırlı, varsayılan 5"},{"label":"Platformlar","value":"Predict.fun"}]},"market-making":{"title":"Piyasa Yapıcılık","tagline":"Envanter eğimli iki yönlü kotasyonlar.","hook":"İki tarafa da kotasyon verin ve elinizde kalanı yönetin.","description":"Orta fiyatın etrafında iki tarafa da kotasyon verir ve ikisi de dolduğunda spread'i kazanır; kotasyonlarını elindeki envanterden uzağa doğru kaydırır. Her kotasyonun bir son kullanma süresi vardır. Kotasyonlarınızın içinden trendle geçen bir piyasa, spread'in kazandırdığından daha pahalıya mal olabilir.","specs":[{"label":"Emir yönetimi","value":"Otomatik iptal + yeniden kota"},{"label":"Envanter","value":"Eğim + sabit limitler"},{"label":"Platformlar","value":"Predict.fun"}]},"whale-signal":{"title":"On-Chain Balina Sinyali","tagline":"Büyük işlemleri ve çok sayıda cüzdanı aynı anda takip edin.","hook":"Büyük bir işlem bir sinyaldir, söz değil.","description":"Her biri kendi harcama limitine sahip birçok cüzdanı aynı anda takip eder; cüzdan listelenmediğinde ise herhangi bir büyük işlemi. Predict.fun'ın işlem akışını okur, dolayısıyla bir işlemi gerçekleştikten sonra görür ve fiyat zaten çok uzaklaştıysa atlar.","specs":[{"label":"Kaynak","value":"Predict.fun işlem akışı"},{"label":"Kovalama limiti","value":"3¢"}]}}},"engine":{"eyebrow":"Kaputun altında","headlineLine1":"Rust ile inşa edildi.","headlineLine2":"Tahmin piyasaları için ayarlandı.","description":"Rust'ın sunduğu garantiler — ve Tokio'nun async çalışma zamanının mümkün kıldığı hız üzerine kurulu. Her strateji aynı yürütme yolunu, aynı risk kancalarını, aynı gözlemlenebilirlik yüzeyini paylaşır.","features":[{"icon":"🦀","title":"Rust + Tokio","body":"İşlem ortasında GC duraklaması yok. Eşzamanlı yürütmede veri yarışı yok. Null-pointer sürprizleri yok. Yalın, öngörülebilir, baskı altında hızlı."},{"icon":"🔌","title":"Platform bağımsız adaptörler","body":"Tek bir ortak API yüzeyi; şimdilik Predict.fun ve Polymarket için adaptörlerle. Stratejiler platforma özgü tiplere değil, VenueId'ye başvurur."},{"icon":"🖥️","title":"Gerçek zamanlı TUI","body":"Canlı log akışı, renk kodlu önem düzeyi ve bot başına durum görünümleriyle ratatui destekli terminal arayüzü."},{"icon":"⚙️","title":"FAK ve GTD emirleri","body":"Otomatik piyasa ID çözümlemeli Fill-or-Kill ve Good-Till-Date emir tipleri. Eşzamanlı yürütme, hız sınırlı."}],"performanceEyebrow":"Performans","performanceHeadline":"Milisaniyelerin paraya mal olduğu yerde önemli olan rakamlar.","metrics":[{"metric":"< 1ms","label":"Olay işleme"},{"metric":"< 100ms","label":"Emir yürütme"},{"metric":"~200ms","label":"Pozisyon yoklama"},{"metric":"~50MB","label":"Bellek tabanı"},{"metric":"< 5%","label":"CPU kullanımı"},{"metric":"25 / 10s","label":"Hız limiti (yapılandırılabilir)"}]},"safety":{"eyebrow":"Önce risk tasarımı","headlineLine1":"Koruma bariyeri olmayan hız,","headlineLine2":"yalnızca pahalı bir kayıptır.","description":"Her emir, borsaya ulaşmadan önce dört katmanlı bir risk hattından geçer. Devre kesiciler, derinlik kontrolleri, boyut tabanları ve tam kuru çalıştırma — her botun kullandığı aynı yürütme çekirdeğine bağlı.","layers":[{"icon":"🛑","title":"Devre Kesici","body":"Yapılandırılabilir bir kayan pencere içinde N ardışık büyük işlemden sonra otomatik durur. Zincirleme etkileri başlamadan durdurur.","accent":"text-rose-400"},{"icon":"🛡️","title":"Emir Defteri Derinlik Koruması","body":"Her emirden önce likiditeyi doğrular. İnce defterlere doldurma yok — nokta.","accent":"text-amber-400"},{"icon":"🧪","title":"Kuru Çalıştırma Modu","body":"Tam yürütme yolu, gerçek emir vermeden çalışır. Sinyalleri ve boyutlandırmayı sıfır sermaye riskiyle doğrulayın.","accent":"text-cyan-400"},{"icon":"⚖️","title":"İşlem Boyutu Tabanı","body":"Her emirde minimum boyut zorunluluğu. Negatif EV'li mikro işlemleri otomatik olarak eler.","accent":"text-emerald-400"}],"ladderTitle":"Devreye alma merdiveni","ladderSubtitle":"Sıfırdan üretime geçmek için kısa bir kontrol listesi.","ladder":[{"stage":"Kurulum","action":"Tam bir oturum boyunca enable_trading: false ile çalıştırın."},{"stage":"İlk işlemler","action":"Sinyale güvenene kadar copy_percentage değerini %5–10'da tutun."},{"stage":"Süregelen","action":"Devre kesici tetiklemelerini izleyin — yürütme anormalliklerini yüzeye çıkarırlar."},{"stage":"Üretim","action":"Yalnızca kullanmayı düşündüğünüz sermayeyle özel bir cüzdan kullanın."}]},"howItWorks":{"eyebrow":"Nasıl çalışır","headline":"Depodan canlı bota üç adımda.","description":"Kara kutu yok. Ekran görüntülerinde gördüğünüz aynı Rust motorunu siz çalıştırırsınız — kendi makinenizde, kendi anahtarlarınızla, kendi sermayenizle.","steps":[{"num":"01","title":"Avantajınızı seçin","body":"Tezinize uyan strateji ve platformu seçin. Her bot, ortak motor üzerinde belirgin, iyi tanımlanmış bir piyasa avantajıdır."},{"num":"02","title":"Yapılandırın ve kuru çalıştırın","body":"Anahtarlarınızı girin, risk limitlerini ayarlayın ve sinyale güvenene kadar enable_trading: false ile çalıştırın — sıfır sermaye riski."},{"num":"03","title":"Canlıya geçin","body":"Hazır olduğunuzda canlı işlem rehberini izleyin ve yalnızca kaybetmeyi göze alabileceğiniz tutarı içeren ayrı bir cüzdanı devreye alın. Henüz hiçbir gerçek emir test edilmedi, bu yüzden küçük başlayın. Gerçek zamanlı TUI'den dolumları, P&L'i ve circuit breaker durumunu izleyin."}],"getTitle":"Neler elde edersiniz","gets":["Tam Rust kaynağı — MIT lisanslı, okumanız ve değiştirmeniz için sizin","Rehberli kurulum — ilk botunuzu çalıştırmada doğrudan yardım","Ortak risk katmanı — devre kesici, derinlik koruması, kuru çalıştırma, işlem tabanı","Süregelen güncellemeler — çıktıkça yeni platformlar ve strateji yükseltmeleri"],"note":"Uygulamalı kurulumla kaynağı erişilebilir. Erişim ve fiyatlandırma için Telegram'dan yazın.","cta":"Telegram'dan erişim alın"},"cta":{"eyebrow":"Başlayın","headline":"Bir botu işe koşmaya hazır mısınız?","description":"Doğrudan görüşme, kapsam tartışması veya ücretli kurulum için Telegram. Açık kaynak depo, yapılandırma dokümanları ve canlı kod tabanı için GitHub. Telegram'da yanıt süresi genellikle birkaç saattir.","ctaTelegram":"Telegram'da @tarpboi","ctaGithub":"Depoya göz atın","pillars":[{"title":"Açık kaynak","body":"MIT lisanslı. Kodu okuyun, çatallayın, üzerine inşa edin."},{"title":"Aktif olarak bakım yapılıyor","body":"Depo düzenli olarak düzeltmeler ve strateji yükseltmeleri yayınlıyor."},{"title":"Doğrudan hat","body":"Destek talebi yok. Botu yazan kişiyle konuşuyorsunuz."}]},"footer":{"productName":"PnL Profit","tagline":"Predict.fun · Polymarket · Kalshi","disclaimerLabel":"Sorumluluk reddi.","rights":"MIT Lisanslı · Tahmin piyasaları topluluğu için inşa edildi.","disclaimer":"Tahmin piyasalarında işlem yapmak gerçek finansal risk içerir. Bu yazılım, herhangi bir sonuç garantisi veya teminatı olmaksızın, olduğu gibi sağlanır. Finansal tavsiye değildir. Gerçek sermaye kullanmadan önce her zaman {flag} ile test edin. Her mekanın hizmet şartlarına ve kendi yargı bölgenizde geçerli olan düzenlemelere uyduğunuzdan emin olun."}},
  vi: {"langName":{"en":"English","zh":"简体中文","ru":"Русский"},"nav":{"strategies":"Chiến lược","managed":"Quản lý hộ","venues":"Sàn giao dịch","engine":"Bộ máy","safety":"An toàn","blog":"Blog","contact":"Liên hệ","github":"GitHub","telegram":"Telegram","langSwitch":"Ngôn ngữ"},"venues":{"eyebrow":"Phạm vi sàn giao dịch","headline":"Một bộ máy. Mọi sàn giao dịch.","description":"Engine không phụ thuộc sàn — bất kỳ nền tảng nào có sổ lệnh hoặc luồng vị thế đều kết nối qua một adapter duy nhất. Hai mươi mốt sàn có kho bot riêng, từ các sàn crypto-native đến những nhà môi giới được quản lý.","cardCta":"Mở repo →","footnote":"Muốn ưu tiên một sàn? Công việc adapter do nhu cầu dẫn dắt — nếu bạn giao dịch trên nền tảng quan trọng với mình, nó có thể được đẩy lên trong hàng đợi.","footnoteCta":"Yêu cầu thêm sàn →"},"managed":{"eyebrow":"Quản lý hộ & Copy-Trading","headline":"Không muốn tự vận hành hạ tầng? Cứ để chúng tôi.","description":"Giao dịch với cùng bộ máy dưới dạng dịch vụ. Mở tài khoản quản lý hộ, chọn một leader đã được kiểm chứng từ bảng xếp hạng on-chain hoặc một chiến lược, rồi để các bot được lưu trữ tự chạy — bạn chỉ việc theo dõi số dư, P&L và phí trên bảng điều khiển trực tiếp.","statusNote":"⏸️ Dịch vụ vận hành sẵn hiện đang đóng. Nó từng chạy ở bản beta giao dịch giấy — tiền mô phỏng, không giữ tài sản — và chưa bao giờ xử lý tiền thật. Cách được hỗ trợ hôm nay là engine mã nguồn mở: key của bạn, ví của bạn, mặc định dry-run.","stats":[{"value":"520+","label":"Sao GitHub"},{"value":"21","label":"Sàn"},{"value":"1 / 10","label":"Chiến lược đang chạy"},{"value":"Dry-run","label":"Mặc định"}],"featuresTitle":"Bạn nhận được gì","features":[{"icon":"📈","title":"Bảng xếp hạng on-chain","body":"Ví Polymarket thật được xếp hạng theo P&L on-chain có thể kiểm chứng (lợi nhuận hoặc khối lượng, 1 ngày/7 ngày/30 ngày/toàn thời gian). Một cú nhấp để copy trader đã được kiểm chứng."},{"icon":"🤖","title":"Bot chiến lược được lưu trữ","body":"Cùng bộ máy khớp lệnh, chạy hộ bạn. Không cần key, không server, không vận hành."},{"icon":"💰","title":"Chênh lệch giá liên sàn","body":"Giá trực tiếp trên Polymarket ↔ Kalshi ↔ PredictIt, cùng Manifold làm tín hiệu đồng thuận tiền ảo."},{"icon":"🛡️","title":"Cùng lớp an toàn","body":"Cầu dao ngắt mạch, bảo vệ độ sâu, sàn khối lượng — các hàng rào bảo vệ từ bộ máy mã nguồn mở, áp dụng cho mọi tài khoản quản lý hộ."}]},"hero":{"badge":"Mã nguồn mở · tự lưu ký · mặc định dry-run","headlineLine1":"Copy trader đã được kiểm chứng.","headlineLine2":"Lợi nhuận tự động.","ctaGithub":"Xem trên GitHub","stats":[{"label":"Thực thi lệnh","value":"< 100ms","unit":"đầu cuối"},{"label":"Xử lý sự kiện","value":"< 1ms","unit":"mỗi sự kiện"},{"label":"Bộ nhớ nền","value":"~50MB","unit":"thường trú"},{"label":"CPU khi tải","value":"< 5%","unit":"phần cứng hiện đại"}],"description":"Một engine mã nguồn mở viết bằng Rust cho {predictfun}, {polymarket}, {kalshi}, {limitless} và 17 sàn thị trường dự đoán khác — một lõi thực thi, một lớp quản lý rủi ro. Cả mười chiến lược đều chạy trên Predict.fun ở chế độ dry-run, và Copy Trading trên Polymarket đã được cập nhật cho CLOB V2. Chưa có lệnh thật nào được thử nghiệm. Khóa của bạn, ví của bạn, mặc định dry-run."},"liveSignal":{"eyebrow":"Tín hiệu trực tiếp","headline":"BTC/USDT — thị trường mà các bot theo dõi","sub":"Giá spot thời gian thực, truyền trực tiếp từ sổ lệnh.","statusLive":"Trực tiếp","statusOffline":"Ngoại tuyến","statusConnecting":"Đang kết nối","pair":"BTC / USDT","sessionLabel":"· phiên","attribution":"Biểu đồ bởi TradingView","footnote":"Nguồn: {source}. Các thị trường BTC Tăng/Giảm của Polymarket được quyết toán dựa trên {chainlink}, vốn tổng hợp dữ liệu từ Binance, Coinbase, Kraken và các sàn lớn khác — vì vậy những gì bạn thấy ở đây là bản phản chiếu thời gian thực trung thực của mức giá mà các bot đang giao dịch."},"bots":{"eyebrow":"Đội hình","headline":"Mười chiến lược. Một bộ máy.","description":"Mỗi bot nhắm tới một lợi thế thị trường riêng, được xác định rõ — copy trading, arbitrage, market making, tín hiệu dòng lệnh. Tất cả dùng chung lõi thực thi, lớp rủi ro và adapter sàn, và hiện tại tất cả đều chạy ở chế độ dry-run. Hãy chọn lợi thế phù hợp với luận điểm của bạn, và kiểm chứng nó trước khi nạp vốn.","statusProduction":"Vận hành thật","statusDev":"Dry-run","cardCta":"Trao đổi về bot này","cardCtaSuffix":"→ Telegram","items":{"copy-trading":{"title":"Copy Trading","tagline":"Tự động sao chép các ví hàng đầu với kích thước lệnh và giới hạn rủi ro tùy chỉnh.","hook":"Giao phó alpha cho những ví đã chứng minh họ có nó.","description":"Theo dõi một ví hiệu suất cao và sao chép các lệnh mua của ví đó gần như theo thời gian thực, với khối lượng do quy tắc của bạn quyết định. Việc thoát lệnh dựa trên cài đặt take-profit và stop-loss của bạn, thay vì sao chép các lệnh bán của ví. Chạy trên Predict.fun và Polymarket.","specs":[{"label":"Ví được theo dõi","value":"Một ví mỗi bot"},{"label":"Loại lệnh","value":"FAK"},{"label":"Rủi ro","value":"Circuit breaker + giới hạn"},{"label":"Chạy thử","value":"Hỗ trợ đầy đủ"}]},"btc-arb":{"title":"Chênh lệch giá BTC 5m / 15m / 1hr","tagline":"Tốc độ trên các thị trường BTC Up/Down khung ngắn.","hook":"Đã vào sổ lệnh trước khi bạn đọc xong tiêu đề.","description":"Theo dõi các cửa sổ BTC Up/Down. Khi xuất hiện định giá không hiệu quả, bot đặt lệnh FAK độ trễ thấp trước khi cửa sổ đóng. Phản xạ con người không thể cạnh tranh ở đây.","specs":[{"label":"Thị trường","value":"BTC Up/Down 5m–1hr"},{"label":"Loại lệnh","value":"FAK"}]},"cross-arb":{"title":"Chênh lệch giá liên sàn","tagline":"Tìm chênh lệch giá giữa các thị trường liên kết trên hai sàn.","hook":"Phát hiện chênh lệch, rồi tự kiểm tra.","description":"Predict.fun công bố mỗi thị trường của mình được liên kết với thị trường Polymarket nào. Bot ghép cặp theo liên kết đó và chỉ báo chênh lệch khi nó vượt phí trên cả hai sàn. Bot chỉ báo cáo chứ không giao dịch, vì chỉ khớp một chân mà không khớp chân kia là một vị thế không được phòng hộ.","specs":[{"label":"Sàn","value":"Predict.fun ↔ Polymarket"},{"label":"Ngưỡng lợi thế","value":"≥ phí, tùy chỉnh"},{"label":"Chế độ","value":"Chỉ báo cáo"}]},"directional-arb":{"title":"Chênh lệch giá có định hướng","tagline":"Nền tảng arbitrage với độ nghiêng theo hướng.","hook":"Khởi đầu từ arbitrage, rồi nghiêng về phía có nhiều lợi thế hơn.","description":"Mua cả hai chiều khi Up + Down có thể gom dưới $1, sau đó tăng khối lượng ở phía mà mô hình đánh giá bị định giá thấp — giữ một sàn arbitrage trong khi vị thế ròng đi theo hướng. Phía nhỏ hơn đóng vai trò phòng hộ một phần.","specs":[{"label":"Điểm vào","value":"Rổ Up + Down < $1"},{"label":"Độ nghiêng","value":"Tối đa 3:1 về phía lợi thế"},{"label":"Lệnh","value":"Chỉ lệnh giới hạn"}]},"spread-farming":{"title":"Spread Farming","tagline":"Các lợi thế nhỏ, có hệ thống và lặp lại.","hook":"Một nghìn chiến thắng 0.5¢ gộp lại thành một con số lớn.","description":"Kỷ luật và lặp lại được: đặt lệnh theo bid bên trong một spread rộng, rồi chào bán thứ vừa mua ngay bên trong ask, mỗi lần một vòng mua-bán. Vị thế không bán được kịp thời sẽ bị bán ở giá bid, chấp nhận khoản lỗ thay vì gánh thêm rủi ro.","specs":[{"label":"Lợi thế","value":"Chênh lệch mua-bán"},{"label":"Ghi log","value":"Theo lệnh + theo phiên"}]},"sports":{"title":"Thực thi cá cược thể thao","tagline":"Tốc độ nhấp-để-cược trên các thị trường thể thao trực tiếp.","hook":"Nhấp. Khớp lệnh. Xong.","description":"Đón đầu bước dịch chuyển tỷ lệ vốn cướp mất lợi thế của mọi người cược thủ công trước cả khi họ kịp xác nhận lệnh. Tỷ lệ thời gian thực kết hợp thực thi FAK nhanh.","specs":[{"label":"Thể thao","value":"NBA, NFL, Bóng đá +"}]},"resolution-sniper":{"title":"Resolution Sniper","tagline":"Kết quả gần như chắc chắn, giữ đến khi thanh toán.","hook":"Lãi nhỏ, và những lần thua hiếm hoi mất gần hết tiền cược.","description":"Mua một kết quả có giá gần $1 trong thị trường sắp kết thúc và giữ đến khi thanh toán. Gần như chắc chắn không phải là chắc chắn: mức giá 97¢ chỉ có lãi nếu kết quả đúng hơn 97% số lần, và một bất ngờ có thể xóa sạch hàng chục lần thắng.","specs":[{"label":"Độ chắc chắn","value":"Tùy chỉnh"},{"label":"Chi trả","value":"$1.00 / cổ phần thắng"},{"label":"Sàn","value":"Predict.fun"}]},"orderbook-imbalance":{"title":"Mất cân bằng sổ lệnh","tagline":"Tín hiệu thuần từ luồng lệnh, không cần dữ liệu bên ngoài.","hook":"Không cần đăng ký, không cần nguồn dữ liệu bên ngoài.","description":"Tín hiệu chính là order book. Bot so sánh khối lượng bid và ask gần đỉnh sổ lệnh, mua phía mà sự mất cân bằng nghiêng về, và thoát theo mục tiêu cố định, stop hoặc giới hạn thời gian. Khối lượng hiển thị rất dễ làm giả, và mỗi lần vào lệnh đều phải vượt qua spread, nên tín hiệu phải bù được chi phí đó.","specs":[{"label":"Tín hiệu","value":"Chỉ sổ lệnh trực tiếp"},{"label":"Vị thế","value":"Có giới hạn, mặc định 5"},{"label":"Sàn","value":"Predict.fun"}]},"market-making":{"title":"Tạo lập thị trường","tagline":"Báo giá hai chiều với độ lệch theo tồn kho.","hook":"Báo giá cả hai phía, và quản lý những gì bạn nắm giữ.","description":"Báo giá cả hai phía quanh giá giữa và hưởng spread khi cả hai cùng khớp, đồng thời lệch báo giá ra xa khỏi lượng tồn kho đang nắm. Mỗi báo giá đều có thời hạn. Một thị trường chạy xu hướng xuyên qua các báo giá của bạn có thể gây lỗ nhiều hơn số spread kiếm được.","specs":[{"label":"Quản lý lệnh","value":"Tự hủy + yết lại"},{"label":"Tồn kho","value":"Độ lệch + giới hạn cứng"},{"label":"Sàn","value":"Predict.fun"}]},"whale-signal":{"title":"Tín hiệu cá voi on-chain","tagline":"Theo dõi các lệnh lớn và nhiều ví cùng lúc.","hook":"Một lệnh lớn là tín hiệu, không phải lời hứa.","description":"Theo dõi nhiều ví cùng lúc, mỗi ví có hạn mức chi tiêu riêng, hoặc bất kỳ lệnh lớn nào khi không liệt kê ví nào. Bot đọc nguồn giao dịch của Predict.fun nên chỉ thấy lệnh sau khi nó đã xảy ra, và bỏ qua nếu giá đã dịch chuyển quá xa.","specs":[{"label":"Nguồn","value":"Nguồn giao dịch Predict.fun"},{"label":"Giới hạn đuổi giá","value":"3¢"}]}}},"engine":{"eyebrow":"Bên trong bộ máy","headlineLine1":"Được xây bằng Rust.","headlineLine2":"Tinh chỉnh cho prediction market.","description":"Dựng trên những đảm bảo mà Rust mang lại — và tốc độ mà runtime bất đồng bộ của Tokio tạo ra. Mọi chiến lược dùng chung đường thực thi, cùng các hook rủi ro, cùng bề mặt quan sát.","features":[{"icon":"🦀","title":"Rust + Tokio","body":"Không dừng GC giữa lệnh. Không tranh chấp dữ liệu khi thực thi song song. Không bất ngờ với con trỏ null. Gọn, dự đoán được, nhanh khi chịu áp lực."},{"icon":"🔌","title":"Adapter độc lập với sàn","body":"Một bề mặt API dùng chung, hiện có adapter cho Predict.fun và Polymarket. Các chiến lược tham chiếu VenueId — không phải các kiểu riêng của từng nền tảng."},{"icon":"🖥️","title":"TUI thời gian thực","body":"Giao diện terminal chạy trên ratatui với luồng log trực tiếp, mã màu theo mức độ nghiêm trọng, và trạng thái từng bot."},{"icon":"⚙️","title":"Lệnh FAK & GTD","body":"Các loại lệnh Fill-or-Kill và Good-Till-Date với tự động phân giải market ID. Thực thi song song, có giới hạn tần suất."}],"performanceEyebrow":"Hiệu năng","performanceHeadline":"Những con số quan trọng khi từng mili-giây là tiền.","metrics":[{"metric":"< 1ms","label":"Xử lý sự kiện"},{"metric":"< 100ms","label":"Thực thi lệnh"},{"metric":"~200ms","label":"Polling vị thế"},{"metric":"~50MB","label":"Bộ nhớ nền"},{"metric":"< 5%","label":"Sử dụng CPU"},{"metric":"25 / 10s","label":"Giới hạn tần suất (tùy chỉnh)"}]},"safety":{"eyebrow":"Thiết kế ưu tiên rủi ro","headlineLine1":"Tốc độ mà không có hàng rào bảo vệ","headlineLine2":"chỉ là thua lỗ đắt đỏ.","description":"Mọi lệnh đều đi qua đường ống rủi ro bốn lớp trước khi tới sàn. Cầu dao ngắt mạch, kiểm tra độ sâu, sàn kích thước và chạy thử đầy đủ — được đấu nối vào cùng lõi thực thi mà mọi bot sử dụng.","layers":[{"icon":"🛑","title":"Cầu dao ngắt mạch","body":"Tự động dừng sau N lệnh lớn liên tiếp trong cửa sổ trượt tùy chỉnh. Chặn hiệu ứng dây chuyền trước khi nó bắt đầu.","accent":"text-rose-400"},{"icon":"🛡️","title":"Bảo vệ độ sâu sổ lệnh","body":"Xác thực thanh khoản trước mỗi lệnh. Không khớp vào sổ lệnh mỏng — chấm hết.","accent":"text-amber-400"},{"icon":"🧪","title":"Chế độ chạy thử","body":"Toàn bộ đường thực thi chạy mà không đặt lệnh thật. Kiểm chứng tín hiệu và kích thước với không rủi ro vốn.","accent":"text-cyan-400"},{"icon":"⚖️","title":"Sàn kích thước lệnh","body":"Bắt buộc kích thước tối thiểu trên mọi lệnh. Tự động lọc bỏ các lệnh siêu nhỏ có EV âm.","accent":"text-emerald-400"}],"ladderTitle":"Nấc thang triển khai","ladderSubtitle":"Danh sách kiểm tra ngắn để đi từ số không tới vận hành thật.","ladder":[{"stage":"Thiết lập","action":"Chạy với enable_trading: false trong trọn một phiên."},{"stage":"Giao dịch đầu tiên","action":"Giữ copy_percentage ở mức 5–10% cho tới khi bạn tin tưởng tín hiệu."},{"stage":"Duy trì","action":"Theo dõi các lần cầu dao ngắt — chúng phản ánh bất thường khi thực thi."},{"stage":"Vận hành thật","action":"Dùng ví chuyên biệt chỉ với số vốn bạn dự định triển khai."}]},"howItWorks":{"eyebrow":"Cách hoạt động","headline":"Từ repo tới bot chạy thật trong ba bước.","description":"Không phải hộp đen. Bạn chạy cùng bộ máy Rust như trong ảnh chụp — trên máy của bạn, key của bạn, vốn của bạn.","steps":[{"num":"01","title":"Chọn lợi thế của bạn","body":"Chọn chiến lược và sàn phù hợp với luận điểm của bạn. Mỗi bot là một lợi thế thị trường riêng biệt, rõ ràng trên bộ máy dùng chung."},{"num":"02","title":"Cấu hình & chạy thử","body":"Thả key vào, đặt giới hạn rủi ro, và chạy với enable_trading: false cho tới khi bạn tin tưởng tín hiệu — không rủi ro vốn."},{"num":"03","title":"Lên sóng thật","body":"Khi sẵn sàng, hãy làm theo hướng dẫn giao dịch thật và bật một ví riêng chỉ chứa số tiền bạn có thể chấp nhận mất. Chưa có lệnh thật nào được thử nghiệm, nên hãy bắt đầu nhỏ. Theo dõi các lệnh khớp, P&L và trạng thái circuit breaker trên TUI thời gian thực."}],"getTitle":"Bạn nhận được gì","gets":["Toàn bộ mã nguồn Rust — cấp phép MIT, của bạn để đọc và chỉnh sửa","Thiết lập có hướng dẫn — hỗ trợ trực tiếp để chạy bot đầu tiên","Lớp rủi ro dùng chung — cầu dao ngắt, bảo vệ độ sâu, chạy thử, sàn khối lượng","Cập nhật liên tục — sàn mới và nâng cấp chiến lược khi ra mắt"],"note":"Mã nguồn mở kèm thiết lập tận tay. Nhắn tin trên Telegram để nhận quyền truy cập và bảng giá.","cta":"Nhận quyền truy cập trên Telegram"},"cta":{"eyebrow":"Bắt đầu","headline":"Sẵn sàng đưa một bot vào việc?","description":"Telegram để trao đổi trực tiếp, bàn về phạm vi, hoặc thiết lập có phí. GitHub cho repo mã nguồn mở, tài liệu cấu hình và codebase trực tiếp. Thời gian phản hồi trên Telegram thường trong vài giờ.","ctaTelegram":"@tarpboi trên Telegram","ctaGithub":"Duyệt repo","pillars":[{"title":"Mã nguồn mở","body":"Cấp phép MIT. Đọc mã, fork nó, xây tiếp trên đó."},{"title":"Được bảo trì tích cực","body":"Repo phát hành bản vá và nâng cấp chiến lược thường xuyên."},{"title":"Đường dây trực tiếp","body":"Không ticket hỗ trợ. Bạn nói chuyện với chính người viết ra bot."}]},"footer":{"productName":"PnL Profit","tagline":"Predict.fun · Polymarket · Kalshi","disclaimerLabel":"Miễn trừ trách nhiệm.","rights":"Cấp phép MIT · Xây dựng cho cộng đồng prediction market.","disclaimer":"Giao dịch trên các thị trường dự đoán tiềm ẩn rủi ro tài chính thực sự. Phần mềm này được cung cấp \"nguyên trạng\", không có bất kỳ bảo hành hay cam kết nào về kết quả. Đây không phải là lời khuyên tài chính. Hãy luôn thử nghiệm với {flag} trước khi đưa vốn thật vào sử dụng. Đảm bảo tuân thủ điều khoản dịch vụ của từng sàn cũng như các quy định pháp luật hiện hành tại khu vực pháp lý của bạn."}},
  ja: {"langName":{"en":"English","zh":"简体中文","ru":"Русский"},"nav":{"strategies":"戦略","managed":"マネージド","venues":"取引所","engine":"エンジン","safety":"安全性","blog":"ブログ","contact":"お問い合わせ","github":"GitHub","telegram":"Telegram","langSwitch":"言語"},"venues":{"eyebrow":"対応取引所","headline":"1つのエンジンで、あらゆる取引所へ。","description":"エンジンは取引所に依存しません。板情報またはポジションフィードを持つプラットフォームなら、単一のアダプターで接続できます。21 の取引所それぞれに専用のボットリポジトリがあり、クリプトネイティブな取引所から規制対象のブローカーまでを対象としています。","cardCta":"リポジトリを開く →","footnote":"優先してほしい取引所はありますか？アダプターの開発は需要ベースです。あなたが取引しているプラットフォームであれば、順番が上がることがあります。","footnoteCta":"取引所をリクエスト →"},"managed":{"eyebrow":"マネージド & コピートレード","headline":"インフラ運用は面倒ですか？私たちにお任せください。","description":"同じエンジンをサービスとして利用できます。マネージドアカウントを開設し、オンチェーンのリーダーボードから実績あるリーダーや戦略を選ぶだけ。あとはホスト型ボットが稼働し、残高・損益・手数料をライブダッシュボードで確認できます。","statusNote":"⏸️ ホスティング版は現在クローズしています。ペーパートレードのベータとして稼働しており、資金はすべてシミュレーション、実資金を預かったことはありません。現在サポートされている使い方はオープンソースのエンジンです。自分の鍵、自分のウォレット、デフォルトで dry-run。","stats":[{"value":"520+","label":"GitHub スター"},{"value":"21","label":"取引所"},{"value":"1 / 10","label":"稼働中の戦略"},{"value":"Dry-run","label":"デフォルト"}],"featuresTitle":"得られるもの","features":[{"icon":"📈","title":"オンチェーン・リーダーボード","body":"検証可能なオンチェーン損益（利益または出来高、1日/7日/30日/全期間）でランク付けされた実在のPolymarketウォレット。ワンクリックで実績あるトレーダーをコピーできます。"},{"icon":"🤖","title":"ホスト型戦略ボット","body":"同じ実行エンジンを、あなたの代わりに稼働。鍵も、サーバーも、運用も不要です。"},{"icon":"💰","title":"クロス取引所アービトラージ","body":"Polymarket ↔ Kalshi ↔ PredictIt のライブ価格に加え、Manifoldを仮想資金のコンセンサスシグナルとして活用。"},{"icon":"🛡️","title":"同じ安全レイヤー","body":"サーキットブレーカー、デプスガード、取引サイズ下限。オープンソースエンジンのガードレールを、すべてのマネージドアカウントに適用します。"}]},"hero":{"badge":"オープンソース · セルフカストディ · デフォルトで dry-run","headlineLine1":"実績あるトレーダーをコピー。","headlineLine2":"利益は自動操縦で。","ctaGithub":"GitHubで見る","stats":[{"label":"注文執行","value":"< 100ms","unit":"エンドツーエンド"},{"label":"イベント処理","value":"< 1ms","unit":"1イベントあたり"},{"label":"メモリ基準値","value":"~50MB","unit":"常駐"},{"label":"負荷時のCPU","value":"< 5%","unit":"最新ハード"}],"description":"{predictfun}、{polymarket}、{kalshi}、{limitless}、さらに17の予測市場プラットフォームに対応するオープンソースの Rust エンジン。実行コアもリスクレイヤーもひとつです。10種類すべての戦略が Predict.fun で dry-run として動作し、Polymarket のコピートレードは CLOB V2 に対応済みです。実際の注文はまだ一度もテストされていません。あなたのキー、あなたのウォレット、デフォルトで dry-run。"},"liveSignal":{"eyebrow":"ライブシグナル","headline":"BTC/USDT — ボットが監視する市場","sub":"オーダーブックから直接ストリーミングされるリアルタイム現物価格。","statusLive":"稼働中","statusOffline":"オフライン","statusConnecting":"接続中","pair":"BTC / USDT","sessionLabel":"· セッション","attribution":"チャート提供：TradingView","footnote":"出典: {source}。Polymarket の BTC 上昇/下落マーケットは {chainlink} を基準に決済され、これは Binance、Coinbase、Kraken をはじめとする主要取引所から価格を集約しています。そのため、ここに表示されている価格は、ボットが実際に取引する価格を忠実に反映したリアルタイムの指標です。"},"bots":{"eyebrow":"ラインナップ","headline":"10の戦略。1つのエンジン。","description":"各ボットは、コピートレード、アービトラージ、マーケットメイク、オーダーフロー・シグナルなど、明確に定義された独自の優位性を狙います。いずれも同じ実行コア、リスクレイヤー、取引所アダプターを共有し、現在はすべて dry-run で動作しています。自分の仮説に合う優位性を選び、資金を入れる前に検証してください。","statusProduction":"本番稼働","statusDev":"Dry-run","cardCta":"このボットについて相談","cardCtaSuffix":"→ Telegram","items":{"copy-trading":{"title":"コピートレード","tagline":"設定可能なサイジングとリスク上限で、トップウォレットを自動ミラーリング。","hook":"すでに実力を証明したウォレットに、アルファ獲得を任せる。","description":"成績の良いウォレットを追跡し、その買いをほぼリアルタイムでミラーリングします。サイズはあなたのルールで決まります。エグジットはウォレットの売りをコピーするのではなく、あなたのテイクプロフィットとストップロスの設定で行われます。Predict.fun と Polymarket で動作します。","specs":[{"label":"追跡ウォレット","value":"ボットごとに1つ"},{"label":"注文タイプ","value":"FAK"},{"label":"リスク","value":"サーキットブレーカー + 上限"},{"label":"ドライラン","value":"完全対応"}]},"btc-arb":{"title":"BTC 5分 / 15分 / 1時間アービトラージ","tagline":"短時間枠のBTC Up/Down市場でのスピード勝負。","hook":"タイトルを読み終える前にオーダーブックへ。","description":"BTC Up/Downの各時間枠を監視。価格の非効率が生じた瞬間、枠が閉じる前に低レイテンシのFAKを発注します。人間の反射神経では太刀打ちできません。","specs":[{"label":"市場","value":"BTC Up/Down 5分〜1時間"},{"label":"注文タイプ","value":"FAK"}]},"cross-arb":{"title":"クロス取引所アービトラージ","tagline":"2つの取引所の連動する市場間の価格差を見つけます。","hook":"価格差を見つけて、自分で確認する。","description":"Predict.fun は、各市場がどの Polymarket 市場と紐づいているかを公開しています。ボットはその紐づけでペアを作り、両取引所の手数料を上回る場合にのみ価格差を報告します。報告のみで取引はしません。片方だけ約定すると、ヘッジのないポジションになるためです。","specs":[{"label":"取引所","value":"Predict.fun ↔ Polymarket"},{"label":"エッジ閾値","value":"手数料以上、設定可能"},{"label":"モード","value":"報告のみ"}]},"directional-arb":{"title":"ディレクショナル・アービトラージ","tagline":"アービトラージを土台に、方向性の傾きを加える。","hook":"アービトラージから始め、エッジの大きい側へ傾ける。","description":"Up + Downを合計1ドル未満で組成できるとき両側を買い、モデルが割安と評価する側を増し玉。アービトラージの下限を保ちながら、ネットポジションを方向性へ傾けます。小さい側は部分ヘッジとして機能します。","specs":[{"label":"エントリー","value":"Up + Down < $1 のバスケット"},{"label":"傾斜","value":"エッジ側へ最大3:1"},{"label":"注文","value":"指値のみ"}]},"spread-farming":{"title":"スプレッドファーミング","tagline":"システマティックで再現可能なマイクロエッジ。","hook":"0.5¢の勝ちを千回積み上げれば、一つの大きな数字になる。","description":"規律的で再現性があります。広いスプレッドの内側でビッドに並び、買ったものをアスクのすぐ内側で売り出します。1回ずつの往復取引です。時間内に売れないポジションはビッドで売り、リスクを抱えるより損失を確定させます。","specs":[{"label":"エッジ","value":"ビッド・アスク・スプレッド"},{"label":"ロギング","value":"取引ごと + セッション"}]},"sports":{"title":"スポーツベッティング執行","tagline":"ライブスポーツ市場でのクリック即ベットのスピード。","hook":"クリック。約定。完了。","description":"他のすべての手動ベッターがエッジを失う原因となるライン変動を、彼らが注文を確定する前に出し抜きます。リアルタイムオッズと高速FAK執行の組み合わせ。","specs":[{"label":"スポーツ","value":"NBA, NFL, サッカー +"}]},"resolution-sniper":{"title":"レゾリューション・スナイパー","tagline":"ほぼ確実な結果を、決着まで保有する。","hook":"小さな勝ちと、まれに起きるほぼ全額を失う負け。","description":"まもなく終了する市場で、価格が $1 に近い結果を買い、決着まで保有します。ほぼ確実は確実ではありません。97¢ の価格は、その結果が97%より高い確率で当たらなければ利益になりません。たった1度の予想外が、数十回の勝ちを消すこともあります。","specs":[{"label":"確実性","value":"設定可能"},{"label":"払い戻し","value":"勝ちシェア1枚あたり $1.00"},{"label":"取引所","value":"Predict.fun"}]},"orderbook-imbalance":{"title":"オーダーブック・インバランス","tagline":"純粋な注文フローシグナル、外部データ不要。","hook":"サブスクリプションも外部フィードも不要。","description":"シグナルはオーダーブックそのものです。ボットは板の上部付近の買いと売りの数量を比較し、偏りが有利に働く側を買い、固定の目標、ストップ、または時間制限でエグジットします。表示されている数量は偽装が容易で、エントリーのたびにスプレッドをまたぐため、シグナルはそのコストを上回る必要があります。","specs":[{"label":"シグナル","value":"ライブオーダーブックのみ"},{"label":"ポジション","value":"上限あり、デフォルト5"},{"label":"取引所","value":"Predict.fun"}]},"market-making":{"title":"マーケットメイク","tagline":"在庫スキュー付きの両サイド気配。","hook":"両サイドに気配を出し、抱えたものを管理する。","description":"ミッドポイントの両側に気配を出し、両方が約定するとスプレッドを得ます。保有在庫から離れる方向に気配を傾けます。すべての気配には有効期限があります。気配を突き抜けてトレンドが続く市場では、スプレッドで稼ぐ額より損失のほうが大きくなることがあります。","specs":[{"label":"注文管理","value":"自動キャンセル + 再クオート"},{"label":"在庫","value":"スキュー + ハード上限"},{"label":"取引所","value":"Predict.fun"}]},"whale-signal":{"title":"オンチェーン・クジラシグナル","tagline":"大口取引と多数のウォレットを同時に追う。","hook":"大口取引はシグナルであって、約束ではない。","description":"多数のウォレットを、それぞれ個別の支出上限付きで同時に追跡します。ウォレットが未指定の場合は、あらゆる大口取引が対象です。Predict.fun の取引フィードを読むため、取引が起きた後に検知し、価格がすでに大きく動いていればスキップします。","specs":[{"label":"ソース","value":"Predict.fun 取引フィード"},{"label":"追随上限","value":"3¢"}]}}},"engine":{"eyebrow":"内部構造","headlineLine1":"Rustで設計。","headlineLine2":"予測市場に最適化。","description":"Rustが保証する安全性と、Tokioの非同期ランタイムが可能にする速度の上に構築。すべての戦略が、同じ執行パス、同じリスクフック、同じ可観測性の基盤を共有します。","features":[{"icon":"🦀","title":"Rust + Tokio","body":"取引中のGC停止なし。並行実行でのデータ競合なし。ヌルポインタの不意打ちなし。軽量で、予測可能で、負荷下でも高速。"},{"icon":"🔌","title":"取引所非依存アダプター","body":"共通の API インターフェースで、現時点では Predict.fun と Polymarket 用のアダプターがあります。戦略はプラットフォーム固有の型ではなく VenueId を参照します。"},{"icon":"🖥️","title":"リアルタイムTUI","body":"ratatui製のターミナルインターフェース。ライブログストリーミング、重大度の色分け、ボットごとのステータス表示に対応。"},{"icon":"⚙️","title":"FAK & GTD 注文","body":"Fill-or-KillおよびGood-Till-Dateの注文タイプに対応し、マーケットIDを自動解決。レート制限付きの並行執行。"}],"performanceEyebrow":"パフォーマンス","performanceHeadline":"ミリ秒がコストになるとき、意味を持つ数字。","metrics":[{"metric":"< 1ms","label":"イベント処理"},{"metric":"< 100ms","label":"注文執行"},{"metric":"~200ms","label":"ポジションポーリング"},{"metric":"~50MB","label":"メモリ基準値"},{"metric":"< 5%","label":"CPU使用率"},{"metric":"25 / 10s","label":"レート制限（設定可能）"}]},"safety":{"eyebrow":"リスク最優先の設計","headlineLine1":"ガードレールなきスピードは、","headlineLine2":"高くつく負けにすぎない。","description":"すべての注文は、取引所に届く前に4層のリスクパイプラインを通過します。サーキットブレーカー、デプスチェック、サイズ下限、そして完全なドライラン — すべてのボットが使う同じ執行コアに組み込まれています。","layers":[{"icon":"🛑","title":"サーキットブレーカー","body":"設定可能なローリングウィンドウ内で大口取引がN回連続すると自動停止。連鎖が始まる前に食い止めます。","accent":"text-rose-400"},{"icon":"🛡️","title":"オーダーブック・デプスガード","body":"すべての注文の前に流動性を検証。薄いオーダーブックへの約定は一切なし。","accent":"text-amber-400"},{"icon":"🧪","title":"ドライランモード","body":"実際の発注を行わずに、完全な執行パスを走らせます。資金リスクゼロでシグナルとサイジングを検証。","accent":"text-cyan-400"},{"icon":"⚖️","title":"取引サイズ下限","body":"すべての注文に最小サイズを強制。負のEVを持つマイクロ取引を自動的に除外します。","accent":"text-emerald-400"}],"ladderTitle":"デプロイメントの段階","ladderSubtitle":"ゼロから本番稼働までの短いチェックリスト。","ladder":[{"stage":"セットアップ","action":"enable_trading: false で1セッション丸ごと実行する。"},{"stage":"最初の取引","action":"シグナルを信頼できるまで copy_percentage は5〜10%に保つ。"},{"stage":"運用中","action":"サーキットブレーカーの作動を監視 — 執行の異常が浮かび上がります。"},{"stage":"本番稼働","action":"投入するつもりの資金だけを入れた専用ウォレットを使う。"}]},"howItWorks":{"eyebrow":"仕組み","headline":"リポジトリからライブボットまで、3ステップ。","description":"ブラックボックスはありません。スクリーンショットと同じRustエンジンを、あなたのマシンで、あなたの鍵で、あなたの資金で動かします。","steps":[{"num":"01","title":"エッジを選ぶ","body":"あなたの仮説に合う戦略と取引所を選択。各ボットは共通エンジン上の、明確に定義された固有の市場エッジです。"},{"num":"02","title":"設定してドライラン","body":"鍵を入れ、リスク上限を設定し、シグナルを信頼できるまで enable_trading: false で実行 — 資金リスクはゼロです。"},{"num":"03","title":"ライブ稼働","body":"準備ができたら、実取引ガイドに従い、失っても問題ない金額だけを入れた専用ウォレットを有効にしてください。実際の注文はまだ一度もテストされていないため、少額から始めましょう。約定、損益(P&L)、サーキットブレーカーの状態は、リアルタイムの TUI で確認できます。"}],"getTitle":"得られるもの","gets":["完全なRustソース — MITライセンス、読むのも改変するのも自由","ガイド付きセットアップ — 最初のボット起動を直接サポート","共通リスクレイヤー — サーキットブレーカー、デプスガード、ドライラン、取引サイズ下限","継続的なアップデート — 新しい取引所や戦略の改善をリリースのたびに"],"note":"ソース公開型、ハンズオンのセットアップ付き。アクセスと価格についてはTelegramでご連絡ください。","cta":"Telegramでアクセスを入手"},"cta":{"eyebrow":"始めましょう","headline":"ボットを働かせる準備はできましたか？","description":"直接の会話、要件の相談、有料セットアップはTelegramで。オープンソースリポジトリ、設定ドキュメント、稼働中のコードベースはGitHubで。Telegramの返信は通常数時間以内です。","ctaTelegram":"Telegramで @tarpboi","ctaGithub":"リポジトリを見る","pillars":[{"title":"オープンソース","body":"MITライセンス。コードを読み、フォークし、その上に構築を。"},{"title":"活発にメンテナンス","body":"リポジトリは修正と戦略の改善を定期的にリリースしています。"},{"title":"直通ライン","body":"サポートチケットは不要。ボットを書いた本人と直接話せます。"}]},"footer":{"productName":"PnL Profit","tagline":"Predict.fun · Polymarket · Kalshi","disclaimerLabel":"免責事項。","rights":"MIT Licensed · 予測市場コミュニティのために構築。","disclaimer":"予測市場での取引には現実の金銭的リスクが伴います。本ソフトウェアは現状のまま提供されるものであり、いかなる結果についても保証や確約はありません。これは投資助言ではありません。実際の資金を投入する前に、必ず {flag} でテストしてください。各取引所の利用規約、およびお客様の管轄地域で適用される規制を必ず遵守してください。"}},
  ko: {"langName":{"en":"English","zh":"简体中文","ru":"Русский"},"nav":{"strategies":"전략","managed":"위탁 운용","venues":"거래소","engine":"엔진","safety":"안전장치","blog":"블로그","contact":"문의","github":"GitHub","telegram":"Telegram","langSwitch":"언어"},"venues":{"eyebrow":"거래소 커버리지","headline":"하나의 엔진, 모든 거래소.","description":"엔진은 거래소에 구애받지 않습니다. 오더북이나 포지션 피드가 있는 플랫폼이라면 단일 어댑터로 연결됩니다. 21개 거래소가 각각 전용 봇 저장소를 가지고 있으며, 크립토 네이티브 거래소부터 규제 대상 브로커까지 포함합니다.","cardCta":"저장소 열기 →","footnote":"우선적으로 지원했으면 하는 거래소가 있나요? 어댑터 작업은 수요에 따라 진행됩니다. 중요하게 거래하는 플랫폼이라면 순서가 앞당겨질 수 있습니다.","footnoteCta":"거래소 요청하기 →"},"managed":{"eyebrow":"위탁 운용 & 카피 트레이딩","headline":"인프라 운영이 부담스럽다면, 저희에게 맡기세요.","description":"동일한 엔진을 서비스로 이용하세요. 위탁 계정을 개설하고, 온체인 리더보드에서 검증된 리더나 전략을 선택하면 호스팅 봇이 대신 운용합니다. 잔고, 손익, 수수료는 실시간 대시보드에서 확인하세요.","statusNote":"⏸️ 호스팅 서비스는 현재 종료되어 있습니다. 페이퍼 트레이딩 베타로 운영되었고, 자금은 모두 시뮬레이션이었으며 실제 자금을 보관하거나 다룬 적이 없습니다. 현재 지원되는 사용 방법은 오픈소스 엔진입니다. 본인 키, 본인 지갑, 기본값은 dry-run 입니다.","stats":[{"value":"520+","label":"GitHub 스타"},{"value":"21","label":"거래소"},{"value":"1 / 10","label":"가동 중인 전략"},{"value":"Dry-run","label":"기본값"}],"featuresTitle":"제공 항목","features":[{"icon":"📈","title":"온체인 리더보드","body":"검증 가능한 온체인 손익(수익 또는 거래량, 1일/7일/30일/전체 기간)으로 순위를 매긴 실제 Polymarket 지갑. 클릭 한 번으로 검증된 트레이더를 복제합니다."},{"icon":"🤖","title":"호스팅 전략 봇","body":"동일한 실행 엔진을 대신 운용합니다. 키도, 서버도, 운영 부담도 없습니다."},{"icon":"💰","title":"크로스 거래소 차익거래","body":"Polymarket ↔ Kalshi ↔ PredictIt 실시간 시세와 가상 자금 컨센서스 신호로서의 Manifold."},{"icon":"🛡️","title":"동일한 안전 계층","body":"서킷 브레이커, 심도 가드, 거래 하한선 — 오픈소스 엔진의 안전장치를 모든 위탁 계정에 그대로 적용합니다."}]},"hero":{"badge":"오픈소스 · 셀프 커스터디 · 기본 dry-run","headlineLine1":"검증된 트레이더를 복제하세요.","headlineLine2":"수익은 자동 운항으로.","ctaGithub":"GitHub에서 보기","stats":[{"label":"주문 체결","value":"< 100ms","unit":"엔드투엔드"},{"label":"이벤트 처리","value":"< 1ms","unit":"이벤트당"},{"label":"기본 메모리","value":"~50MB","unit":"상주"},{"label":"부하 시 CPU","value":"< 5%","unit":"최신 하드웨어"}],"description":"{predictfun}, {polymarket}, {kalshi}, {limitless}와 17개의 예측 시장 플랫폼을 지원하는 오픈소스 Rust 엔진입니다. 실행 코어도 리스크 레이어도 하나입니다. 열 가지 전략 모두 Predict.fun에서 dry-run으로 동작하며, Polymarket의 카피 트레이딩은 CLOB V2에 맞게 업데이트되었습니다. 실제 주문은 아직 한 번도 테스트되지 않았습니다. 내 키, 내 지갑, 기본값은 dry-run."},"liveSignal":{"eyebrow":"라이브 시그널","headline":"BTC/USDT — 봇이 주시하는 시장","sub":"호가창에서 직접 스트리밍되는 실시간 현물 가격.","statusLive":"실시간","statusOffline":"오프라인","statusConnecting":"연결 중","pair":"BTC / USDT","sessionLabel":"· 세션","attribution":"차트 제공: TradingView","footnote":"출처: {source}. Polymarket의 BTC Up/Down 마켓은 {chainlink}를 기준으로 정산되며, 이는 Binance, Coinbase, Kraken을 비롯한 주요 거래소의 가격을 집계합니다. 따라서 여기에 표시되는 값은 봇이 실제로 거래하는 가격을 충실하게 반영한 실시간 프록시입니다."},"bots":{"eyebrow":"라인업","headline":"10가지 전략, 하나의 엔진.","description":"각 봇은 카피 트레이딩, 차익거래, 마켓 메이킹, 주문 흐름 시그널처럼 뚜렷하게 정의된 고유한 시장 우위를 노립니다. 모두 같은 실행 코어, 리스크 레이어, 거래소 어댑터를 공유하며, 현재는 전부 dry-run으로 동작합니다. 내 가설에 맞는 우위를 고르고, 자금을 넣기 전에 먼저 검증하세요.","statusProduction":"프로덕션","statusDev":"Dry-run","cardCta":"이 봇에 대해 상담하기","cardCtaSuffix":"→ Telegram","items":{"copy-trading":{"title":"카피 트레이딩","tagline":"설정 가능한 사이징과 리스크 한도로 상위 지갑을 자동 복제.","hook":"이미 실력을 입증한 지갑에 알파를 위임하세요.","description":"성과가 좋은 지갑을 추적하여 그 매수를 거의 실시간으로 따라 하며, 크기는 내가 정한 규칙에 따릅니다. 청산은 지갑의 매도를 따라 하는 대신 내가 설정한 익절과 손절 기준으로 이루어집니다. Predict.fun과 Polymarket에서 동작합니다.","specs":[{"label":"추적 지갑","value":"봇당 하나"},{"label":"주문 유형","value":"FAK"},{"label":"리스크","value":"서킷 브레이커 + 한도"},{"label":"드라이런","value":"완전 지원"}]},"btc-arb":{"title":"BTC 5분 / 15분 / 1시간 차익거래","tagline":"단기 BTC Up/Down 시장에서의 속도.","hook":"제목을 다 읽기도 전에 오더북에.","description":"BTC Up/Down 윈도를 감시합니다. 가격 비효율이 나타나면 봇이 윈도가 닫히기 전에 초저지연 FAK를 넣습니다. 여기서 인간의 반사 신경으로는 겨룰 수 없습니다.","specs":[{"label":"시장","value":"BTC Up/Down 5분–1시간"},{"label":"주문 유형","value":"FAK"}]},"cross-arb":{"title":"크로스 거래소 차익거래","tagline":"두 거래소의 연결된 시장 간 가격 차이를 찾습니다.","hook":"차이를 포착한 뒤 직접 확인하세요.","description":"Predict.fun은 각 시장이 어느 Polymarket 시장과 연결되어 있는지 공개합니다. 봇은 그 연결을 기준으로 짝을 맞추고, 두 거래소의 수수료를 넘어설 때만 차이를 보고합니다. 보고만 하고 거래하지 않습니다. 한쪽만 체결되고 다른 쪽이 체결되지 않으면 헤지되지 않은 포지션이 되기 때문입니다.","specs":[{"label":"거래소","value":"Predict.fun ↔ Polymarket"},{"label":"우위 기준","value":"≥ 수수료, 설정 가능"},{"label":"모드","value":"보고만 함"}]},"directional-arb":{"title":"방향성 차익거래","tagline":"방향성 편향을 더한 차익거래 기반 전략.","hook":"차익거래에서 출발해, 우위가 더 큰 쪽으로 기웁니다.","description":"Up + Down을 $1 미만으로 조합할 수 있을 때 양쪽을 매수한 뒤, 모델이 저평가로 판단한 쪽을 키웁니다. 차익거래의 하한선을 유지하면서 순포지션은 방향성을 띠게 됩니다. 작은 쪽은 부분 헤지 역할을 합니다.","specs":[{"label":"진입","value":"Up + Down < $1 바스켓"},{"label":"편향","value":"우위 쪽으로 최대 3:1"},{"label":"주문","value":"지정가 전용"}]},"spread-farming":{"title":"스프레드 파밍","tagline":"체계적이고 반복 가능한 미세 우위.","hook":"0.5¢짜리 승리 천 번이 모여 큰 숫자가 됩니다.","description":"규율 있고 반복 가능합니다. 넓은 스프레드 안쪽에서 매수호가에 줄을 서고, 매수한 물량을 매도호가 바로 안쪽에 내놓으며, 한 번에 한 왕복씩 진행합니다. 제때 팔리지 않는 포지션은 매수호가에 팔아 위험을 지는 대신 손실을 확정합니다.","specs":[{"label":"우위","value":"매수-매도 스프레드"},{"label":"로깅","value":"거래별 + 세션별"}]},"sports":{"title":"스포츠 베팅 실행","tagline":"라이브 스포츠 시장에서 클릭 즉시 베팅하는 속도.","hook":"클릭. 체결. 완료.","description":"다른 모든 수동 베터가 주문을 확정하기도 전에 우위를 앗아가는 라인 변동을 이겨내세요. 실시간 배당과 빠른 FAK 실행을 결합합니다.","specs":[{"label":"종목","value":"NBA, NFL, 축구 +"}]},"resolution-sniper":{"title":"정산 스나이퍼","tagline":"거의 확실한 결과를 결판날 때까지 보유합니다.","hook":"작은 이익, 그리고 드물게 거의 전액을 잃는 손실.","description":"곧 종료되는 시장에서 가격이 $1에 가까운 결과를 매수해 결판날 때까지 보유합니다. 거의 확실하다는 것은 확실하다는 뜻이 아닙니다. 97¢ 가격은 그 결과가 97%보다 높은 확률로 맞아야만 수익이 나며, 한 번의 이변이 수십 번의 승리를 지울 수 있습니다.","specs":[{"label":"확실성","value":"설정 가능"},{"label":"지급","value":"이긴 지분당 $1.00"},{"label":"거래소","value":"Predict.fun"}]},"orderbook-imbalance":{"title":"호가창 불균형","tagline":"외부 데이터가 필요 없는 순수 주문 흐름 신호.","hook":"구독도 외부 데이터 피드도 필요 없습니다.","description":"시그널은 호가창 그 자체입니다. 봇은 호가창 상단의 매수·매도 물량을 비교하여 불균형이 유리한 쪽을 매수하고, 고정 목표, 손절 또는 시간 제한으로 청산합니다. 표시된 물량은 위조하기 쉽고 진입할 때마다 스프레드를 넘어야 하므로, 시그널은 그 비용을 이겨야 합니다.","specs":[{"label":"신호","value":"실시간 호가창 전용"},{"label":"포지션","value":"제한 있음, 기본 5"},{"label":"거래소","value":"Predict.fun"}]},"market-making":{"title":"마켓 메이킹","tagline":"재고 편향을 반영한 양방향 호가.","hook":"양쪽에 호가를 내고, 결국 보유하게 된 물량을 관리하세요.","description":"중간값을 기준으로 양쪽에 호가를 내고 양쪽이 모두 체결되면 스프레드를 얻으며, 보유 재고에서 멀어지는 방향으로 호가를 기울입니다. 모든 호가에는 만료 시간이 있습니다. 호가를 뚫고 한 방향으로 추세를 타는 시장에서는 스프레드로 버는 것보다 손실이 더 클 수 있습니다.","specs":[{"label":"주문 관리","value":"자동 취소 + 재호가"},{"label":"재고","value":"편향 + 하드 한도"},{"label":"거래소","value":"Predict.fun"}]},"whale-signal":{"title":"온체인 고래 신호","tagline":"대형 거래와 여러 지갑을 동시에 따라갑니다.","hook":"큰 거래는 신호일 뿐, 약속이 아닙니다.","description":"여러 지갑을 각자의 지출 한도와 함께 동시에 따라가며, 지갑을 지정하지 않으면 모든 대형 거래를 따릅니다. Predict.fun의 체결 피드를 읽기 때문에 거래가 일어난 뒤에 확인하며, 가격이 이미 너무 많이 움직였다면 건너뜁니다.","specs":[{"label":"소스","value":"Predict.fun 체결 피드"},{"label":"추격 한도","value":"3¢"}]}}},"engine":{"eyebrow":"내부 구조","headlineLine1":"Rust로 설계했습니다.","headlineLine2":"예측 시장에 맞춰 튜닝했습니다.","description":"Rust가 보장하는 안정성과 Tokio 비동기 런타임이 가능케 하는 속도 위에 구축했습니다. 모든 전략이 동일한 실행 경로, 동일한 리스크 훅, 동일한 관측 계층을 공유합니다.","features":[{"icon":"🦀","title":"Rust + Tokio","body":"거래 도중 GC 멈춤 없음. 동시 실행에서 데이터 레이스 없음. 널 포인터 사고 없음. 압박 속에서도 가볍고, 예측 가능하며, 빠릅니다."},{"icon":"🔌","title":"거래소 독립 어댑터","body":"하나의 공통 API 인터페이스이며, 현재는 Predict.fun과 Polymarket용 어댑터가 있습니다. 전략은 플랫폼별 타입이 아니라 VenueId를 참조합니다."},{"icon":"🖥️","title":"실시간 TUI","body":"ratatui 기반 터미널 인터페이스로 실시간 로그 스트리밍, 심각도별 색상 구분, 봇별 상태 뷰를 제공합니다."},{"icon":"⚙️","title":"FAK & GTD 주문","body":"자동 마켓 ID 해석을 갖춘 Fill-or-Kill 및 Good-Till-Date 주문 유형. 동시 실행, 속도 제한 적용."}],"performanceEyebrow":"성능","performanceHeadline":"밀리초가 돈이 되는 순간에 의미 있는 숫자들.","metrics":[{"metric":"< 1ms","label":"이벤트 처리"},{"metric":"< 100ms","label":"주문 체결"},{"metric":"~200ms","label":"포지션 폴링"},{"metric":"~50MB","label":"기본 메모리"},{"metric":"< 5%","label":"CPU 사용률"},{"metric":"25 / 10s","label":"속도 제한 (설정 가능)"}]},"safety":{"eyebrow":"리스크 우선 설계","headlineLine1":"안전장치 없는 속도는","headlineLine2":"값비싼 손실일 뿐입니다.","description":"모든 주문은 거래소에 도달하기 전 4단계 리스크 파이프라인을 통과합니다. 서킷 브레이커, 심도 검사, 사이즈 하한선, 완전 드라이런 — 모든 봇이 사용하는 동일한 실행 코어에 통합되어 있습니다.","layers":[{"icon":"🛑","title":"서킷 브레이커","body":"설정 가능한 롤링 윈도 내에서 대형 거래가 N회 연속되면 자동 정지합니다. 연쇄 반응이 시작되기 전에 멈춥니다.","accent":"text-rose-400"},{"icon":"🛡️","title":"호가창 심도 가드","body":"모든 주문 전에 유동성을 검증합니다. 얕은 호가창으로의 체결은 절대 없습니다.","accent":"text-amber-400"},{"icon":"🧪","title":"드라이런 모드","body":"실제 주문 없이 전체 실행 경로를 가동합니다. 자본을 전혀 투입하지 않고 신호와 사이징을 검증하세요.","accent":"text-cyan-400"},{"icon":"⚖️","title":"거래 사이즈 하한선","body":"모든 주문에 최소 사이즈를 강제합니다. 마이너스 EV 미세 거래를 자동으로 걸러냅니다.","accent":"text-emerald-400"}],"ladderTitle":"배포 단계","ladderSubtitle":"제로에서 프로덕션까지 가기 위한 짧은 체크리스트.","ladder":[{"stage":"설정","action":"enable_trading: false 상태로 한 세션 전체를 실행하세요."},{"stage":"첫 거래","action":"신호를 신뢰하기 전까지 copy_percentage를 5–10%로 유지하세요."},{"stage":"운영 중","action":"서킷 브레이커 발동을 주시하세요 — 실행 이상 징후를 드러냅니다."},{"stage":"프로덕션","action":"투입할 자본만 담긴 전용 지갑을 사용하세요."}]},"howItWorks":{"eyebrow":"작동 방식","headline":"저장소에서 라이브 봇까지 세 단계.","description":"블랙박스가 아닙니다. 스크린샷에 나온 것과 동일한 Rust 엔진을 당신의 기기에서, 당신의 키로, 당신의 자본으로 직접 실행합니다.","steps":[{"num":"01","title":"우위를 고르세요","body":"당신의 논리에 맞는 전략과 거래소를 선택하세요. 각 봇은 공유 엔진 위의 뚜렷하고 명확한 시장 우위입니다."},{"num":"02","title":"설정 & 드라이런","body":"키를 넣고, 리스크 한도를 정한 뒤, 신호를 신뢰하기 전까지 enable_trading: false로 실행하세요 — 자본 위험 없이."},{"num":"03","title":"라이브 전환","body":"준비가 되면 실거래 가이드를 따라 잃어도 괜찮은 금액만 넣은 전용 지갑을 켜세요. 실제 주문은 아직 한 번도 테스트되지 않았으므로 소액으로 시작하세요. 체결, 손익(P&L), 서킷 브레이커 상태는 실시간 TUI에서 확인할 수 있습니다."}],"getTitle":"제공 항목","gets":["전체 Rust 소스 — MIT 라이선스, 자유롭게 읽고 수정 가능","가이드 설정 — 첫 봇 실행을 직접 지원","공유 리스크 계층 — 서킷 브레이커, 심도 가드, 드라이런, 거래 하한선","지속적 업데이트 — 새 거래소와 전략 개선을 출시 즉시 반영"],"note":"직접 지원이 포함된 소스 공개 방식. 접근 권한과 가격은 Telegram으로 문의하세요.","cta":"Telegram으로 접근 권한 받기"},"cta":{"eyebrow":"시작하기","headline":"봇을 일하게 할 준비가 되셨나요?","description":"직접 대화, 범위 논의, 유료 설정은 Telegram으로. 오픈소스 저장소, 설정 문서, 라이브 코드베이스는 GitHub으로. Telegram 응답 시간은 보통 몇 시간 이내입니다.","ctaTelegram":"Telegram의 @tarpboi","ctaGithub":"저장소 둘러보기","pillars":[{"title":"오픈소스","body":"MIT 라이선스. 코드를 읽고, 포크하고, 그 위에 만드세요."},{"title":"활발한 유지보수","body":"저장소는 수정 사항과 전략 개선을 정기적으로 배포합니다."},{"title":"직통 연결","body":"지원 티켓 없음. 봇을 만든 사람과 직접 이야기합니다."}]},"footer":{"productName":"PnL Profit","tagline":"Predict.fun · Polymarket · Kalshi","disclaimerLabel":"면책 조항.","rights":"MIT 라이선스 · 예측 시장 커뮤니티를 위해 제작.","disclaimer":"예측 시장 거래에는 실제 금융 리스크가 따릅니다. 본 소프트웨어는 어떠한 결과에 대한 보증이나 보장 없이 있는 그대로(as-is) 제공됩니다. 이는 금융 자문이 아닙니다. 실제 자본을 투입하기 전에 항상 {flag}로 테스트하십시오. 각 거래소의 서비스 약관과 귀하의 관할권에 적용되는 규정을 준수하시기 바랍니다."}},
  ar: {"langName":{"en":"English","zh":"简体中文","ru":"Русский"},"nav":{"strategies":"الاستراتيجيات","managed":"الإدارة","venues":"المنصات","engine":"المحرك","safety":"الأمان","blog":"المدونة","contact":"تواصل","github":"GitHub","telegram":"Telegram","langSwitch":"اللغة"},"venues":{"eyebrow":"تغطية المنصات","headline":"محرك واحد. كل المنصات.","description":"المحرك غير مرتبط بمنصة بعينها — أي منصة لديها دفتر أوامر أو تدفق للمراكز تتصل عبر محول واحد. إحدى وعشرون منصة لكل منها مستودع بوت مخصص، من منصات التداول المبنية على العملات الرقمية إلى الوسطاء الخاضعين للتنظيم.","cardCta":"فتح المستودع ←","footnote":"تريد إعطاء الأولوية لمنصة معينة؟ العمل على المحولات مدفوع بالطلب — إذا كنت تتداول على منصة تهمك، يمكن أن تتقدم في قائمة الانتظار.","footnoteCta":"اطلب منصة ←"},"managed":{"eyebrow":"الإدارة ونسخ التداول","headline":"لا تريد تشغيل البنية التحتية؟ دعنا نتولى ذلك.","description":"تداول بنفس المحرك كخدمة. افتح حسابًا مُدارًا، اختر متصدرًا مثبتًا من لوحة الصدارة على السلسلة أو استراتيجية، ودع البوتات المستضافة تعمل — تتابع الرصيد والأرباح والخسائر والرسوم على لوحة تحكم حية.","statusNote":"⏸️ الخدمة المُدارة مغلقة حاليًا. كانت تعمل كنسخة تجريبية بتداول ورقي — أموال محاكاة، دون حفظ أو وصاية — ولم تتعامل مع أموال حقيقية قط. الطريقة المدعومة اليوم هي المحرك مفتوح المصدر: مفاتيحك، محفظتك، و dry-run افتراضيًا.","stats":[{"value":"520+","label":"نجوم GitHub"},{"value":"21","label":"المنصات"},{"value":"1 / 10","label":"استراتيجيات فعّالة"},{"value":"Dry-run","label":"افتراضيًا"}],"featuresTitle":"ما الذي تحصل عليه","features":[{"icon":"📈","title":"لوحة صدارة على السلسلة","body":"محافظ Polymarket حقيقية مُرتَّبة بأرباح وخسائر قابلة للتحقق على السلسلة (ربح أو حجم، يوم/7 أيام/30 يومًا/كل الأوقات). نقرة واحدة لنسخ متداول مثبت."},{"icon":"🤖","title":"بوتات استراتيجية مستضافة","body":"نفس محرك التنفيذ، يُشغَّل لأجلك. بلا مفاتيح، بلا خوادم، بلا عمليات."},{"icon":"💰","title":"مراجحة بين المنصات","body":"تسعير حي عبر Polymarket ↔ Kalshi ↔ PredictIt، مع Manifold كإشارة إجماع بأموال تجريبية."},{"icon":"🛡️","title":"نفس طبقة الأمان","body":"قاطع دائرة، حارس عمق، حد أدنى للصفقة — الضمانات من المحرك مفتوح المصدر، مطبَّقة على كل حساب مُدار."}]},"hero":{"badge":"مفتوح المصدر · حفظ ذاتي · تشغيل تجريبي افتراضيًا","headlineLine1":"انسخ متداولين مثبتين.","headlineLine2":"ربح على الطيار الآلي.","ctaGithub":"شاهد على GitHub","stats":[{"label":"تنفيذ الأوامر","value":"< 100ms","unit":"من الطرف إلى الطرف"},{"label":"معالجة الأحداث","value":"< 1ms","unit":"لكل حدث"},{"label":"خط أساس الذاكرة","value":"~50MB","unit":"مقيمة"},{"label":"المعالج تحت الحمل","value":"< 5%","unit":"عتاد حديث"}],"description":"محرك مفتوح المصدر مكتوب بلغة Rust لمنصات {predictfun} و{polymarket} و{kalshi} و{limitless} و17 منصة أخرى لأسواق التنبؤ — نواة تنفيذ واحدة وطبقة مخاطر واحدة. تعمل الاستراتيجيات العشر كلها على Predict.fun في وضع dry-run، وتم تحديث Copy Trading على Polymarket ليعمل مع CLOB V2. لم يتم اختبار أي أمر حقيقي حتى الآن. مفاتيحك، ومحفظتك، وdry-run افتراضيًا."},"liveSignal":{"eyebrow":"إشارة حية","headline":"BTC/USDT — السوق الذي تراقبه البوتات","sub":"سعر فوري لحظي، متدفق مباشرة من دفتر الأوامر.","statusLive":"مباشر","statusOffline":"غير متصل","statusConnecting":"جارٍ الاتصال","pair":"BTC / USDT","sessionLabel":"· الجلسة","attribution":"الرسوم البيانية بواسطة TradingView","footnote":"المصدر: {source}. تُسوّى أسواق BTC صعوداً/هبوطاً في Polymarket بناءً على {chainlink}، التي تُجمّع البيانات من Binance وCoinbase وKraken وغيرها من المنصّات الكبرى — لذا فإن ما تراه هنا هو مؤشّر بديل دقيق وفوري للسعر الذي تتداول الروبوتات في مقابله."},"bots":{"eyebrow":"التشكيلة","headline":"عشر استراتيجيات. محرك واحد.","description":"يستهدف كل بوت ميزة سوقية محددة وواضحة — نسخ التداول، والمراجحة، وصناعة السوق، وإشارات تدفق الأوامر. تشترك جميعها في نواة التنفيذ نفسها وطبقة المخاطر نفسها ومحولات المنصات نفسها، وتعمل كلها اليوم في وضع dry-run. اختر الميزة التي تناسب تصورك، وأثبتها قبل أن تموّلها.","statusProduction":"إنتاج","statusDev":"Dry-run","cardCta":"ناقش هذا البوت","cardCtaSuffix":"← Telegram","items":{"copy-trading":{"title":"نسخ التداول","tagline":"انسخ أفضل المحافظ تلقائيًا بأحجام وحدود مخاطر قابلة للتهيئة.","hook":"أسنِد الألفا لمحافظ أثبتت بالفعل أنها تمتلكها.","description":"يتتبع محفظة ذات أداء مرتفع وينسخ عمليات شرائها في وقت شبه فوري، بحجم تحدده قواعدك. تتم عمليات الخروج وفق إعدادات جني الأرباح ووقف الخسارة لديك بدل نسخ عمليات بيع المحفظة. يعمل على Predict.fun وPolymarket.","specs":[{"label":"المحفظة المتتبَّعة","value":"واحدة لكل بوت"},{"label":"أنواع الأوامر","value":"FAK"},{"label":"المخاطر","value":"قاطع دائرة + حدود قصوى"},{"label":"التشغيل التجريبي","value":"مدعوم بالكامل"}]},"btc-arb":{"title":"مراجحة BTC 5د / 15د / ساعة","tagline":"سرعة في أسواق BTC صعود/هبوط قصيرة النافذة.","hook":"في دفتر الأوامر قبل أن تنتهي من قراءة العنوان.","description":"يراقب نوافذ BTC صعود/هبوط. عند ظهور خلل في التسعير، يضع البوت أمر FAK منخفض الكمون قبل إغلاق النافذة. ردود الفعل البشرية لا تنافس هنا.","specs":[{"label":"الأسواق","value":"BTC صعود/هبوط 5د–ساعة"},{"label":"نوع الأمر","value":"FAK"}]},"cross-arb":{"title":"مراجحة بين المنصات","tagline":"اكتشف فروق الأسعار بين الأسواق المرتبطة على منصتين.","hook":"اكتشف الفارق، ثم تحقق منه بنفسك.","description":"تنشر Predict.fun السوق المقابل في Polymarket المرتبط بكل سوق من أسواقها. يقترن البوت بين الأسواق وفق هذا الربط، ولا يبلّغ عن فارق إلا إذا تجاوز الرسوم على المنصتين. يبلّغ فقط ولا ينفّذ صفقات، لأن تنفيذ ساق واحدة دون الأخرى يترك مركزًا مكشوفًا.","specs":[{"label":"المنصات","value":"Predict.fun ↔ Polymarket"},{"label":"عتبة الميزة","value":"≥ الرسوم، قابلة للتهيئة"},{"label":"الوضع","value":"إبلاغ فقط"}]},"directional-arb":{"title":"مراجحة اتجاهية","tagline":"أساس مراجحة مع ميل اتجاهي.","hook":"ابدأ من المراجحة، ثم مِل نحو الجانب الأكثر ميزة.","description":"يشتري كلا الجانبين عندما يمكن تجميع الصعود + الهبوط بأقل من دولار، ثم يزيد حجم الجانب الذي يقيّمه النموذج مبخوسًا — مع الحفاظ على أرضية مراجحة بينما يصبح المركز الصافي اتجاهيًا. يعمل الجانب الأصغر كتحوّط جزئي.","specs":[{"label":"الدخول","value":"سلة صعود + هبوط < $1"},{"label":"الميل","value":"حتى 3:1 نحو الميزة"},{"label":"الأوامر","value":"أوامر حدّية فقط"}]},"spread-farming":{"title":"حصاد الفروقات","tagline":"ميزات دقيقة منهجية وقابلة للتكرار.","hook":"ألف ربح بقيمة 0.5¢ يتراكم إلى رقم كبير واحد.","description":"منضبط وقابل للتكرار: ينضم إلى سعر الشراء داخل فارق سعر واسع، ثم يعرض ما اشتراه للبيع داخل سعر البيع مباشرة، في دورة شراء وبيع واحدة كل مرة. المركز الذي لا يُباع في الوقت المناسب يُباع عند سعر الشراء، فيقبل الخسارة بدل المخاطرة.","specs":[{"label":"الميزة","value":"فارق العرض والطلب"},{"label":"التسجيل","value":"لكل صفقة + الجلسة"}]},"sports":{"title":"تنفيذ رهانات رياضية","tagline":"سرعة النقر للرهان على أسواق رياضية حية.","hook":"نقرة. تنفيذ. تم.","description":"اسبق تحرك الخط الذي يكلّف كل مراهن يدوي آخر ميزته قبل أن يؤكد الأمر أصلًا. احتمالات لحظية مقترنة بتنفيذ FAK سريع.","specs":[{"label":"الرياضات","value":"NBA، NFL، كرة قدم +"}]},"resolution-sniper":{"title":"قناص التسوية","tagline":"نتائج شبه مؤكدة، تُحتفظ بها حتى التسوية.","hook":"أرباح صغيرة، وخسارة نادرة تكلّف تقريبًا كامل الرهان.","description":"يشتري نتيجة يقترب سعرها من $1 في سوق على وشك الانتهاء، ويحتفظ بها حتى التسوية. شبه مؤكد لا يعني مؤكدًا: سعر 97¢ لا يحقق ربحًا إلا إذا صحّت النتيجة في أكثر من 97% من الحالات، ومفاجأة واحدة قد تمحو عشرات الأرباح.","specs":[{"label":"اليقين","value":"قابل للتهيئة"},{"label":"العائد","value":"$1.00 / سهم رابح"},{"label":"المنصات","value":"Predict.fun"}]},"orderbook-imbalance":{"title":"اختلال دفتر الأوامر","tagline":"إشارة تدفق أوامر خالصة، دون حاجة لبيانات خارجية.","hook":"بلا اشتراكات وبلا مصادر بيانات خارجية.","description":"الإشارة هي دفتر الأوامر نفسه. يقارن البوت حجم عروض الشراء والبيع قرب أعلى الدفتر، ويشتري الجانب الذي يرجّحه الاختلال، ويخرج عند هدف ثابت أو وقف خسارة أو حد زمني. الحجم المعروض رخيص التزييف، وكل دخول يعبر فارق السعر، لذا يجب أن تتغلب الإشارة على هذه التكلفة.","specs":[{"label":"الإشارة","value":"دفتر الأوامر الحي فقط"},{"label":"المراكز","value":"محدودة، 5 افتراضيًا"},{"label":"المنصات","value":"Predict.fun"}]},"market-making":{"title":"صناعة السوق","tagline":"عروض أسعار على الجانبين مع انحياز للمخزون.","hook":"قدّم أسعارًا للجانبين، وأدِر ما ينتهي بك الأمر إلى حيازته.","description":"يقدّم أسعارًا على الجانبين حول السعر المتوسط ويكسب فارق السعر عند تنفيذ الطرفين، مع إمالة عروضه بعيدًا عن المخزون الذي يحتفظ به. لكل عرض سعر تاريخ انتهاء. قد يكلّف سوق يتحرك باتجاه واحد عبر عروضك أكثر مما يكسبه فارق السعر.","specs":[{"label":"إدارة الأوامر","value":"إلغاء + إعادة تسعير تلقائي"},{"label":"المخزون","value":"انحياز + حدود صارمة"},{"label":"المنصات","value":"Predict.fun"}]},"whale-signal":{"title":"إشارة الحيتان على السلسلة","tagline":"تابع الصفقات الكبيرة وعدة محافظ في آن واحد.","hook":"الصفقة الكبيرة إشارة، وليست وعدًا.","description":"يتابع عدة محافظ في آن واحد، لكل منها حد إنفاق خاص، أو أي صفقة كبيرة عندما لا تكون هناك محافظ مدرجة. يقرأ تدفق صفقات Predict.fun، لذا يرى الصفقة بعد حدوثها، ويتجاهلها إذا كان السعر قد تحرك بعيدًا بالفعل.","specs":[{"label":"المصدر","value":"تدفق صفقات Predict.fun"},{"label":"حد الملاحقة","value":"3¢"}]}}},"engine":{"eyebrow":"تحت الغطاء","headlineLine1":"مُهندَس بلغة Rust.","headlineLine2":"مُضبَط لأسواق التنبؤ.","description":"مبني على الضمانات التي تمنحها لك Rust — والسرعة التي يتيحها زمن تشغيل Tokio غير المتزامن. كل استراتيجية تشترك في نفس مسار التنفيذ، ونفس خطاطيف المخاطر، ونفس سطح المراقبة.","features":[{"icon":"🦀","title":"Rust + Tokio","body":"بلا توقفات جمع مهملات أثناء الصفقة. بلا تسابق بيانات في التنفيذ المتزامن. بلا مفاجآت مؤشرات فارغة. رشيق، متوقع، سريع تحت الضغط."},{"icon":"🔌","title":"محوّلات مستقلة عن المنصة","body":"واجهة API واحدة مشتركة، مع محولات لمنصتي Predict.fun وPolymarket حتى الآن. تشير الاستراتيجيات إلى VenueId وليس إلى أنواع خاصة بكل منصة."},{"icon":"🖥️","title":"واجهة طرفية لحظية","body":"واجهة طرفية مدعومة بـ ratatui مع تدفق سجلات حي، وشدة مرمّزة بالألوان، وعروض حالة لكل بوت."},{"icon":"⚙️","title":"أوامر FAK و GTD","body":"أنواع أوامر ملء-أو-إلغاء وصالح-حتى-تاريخ مع حل تلقائي لمعرّف السوق. تنفيذ متزامن، محدود المعدل."}],"performanceEyebrow":"الأداء","performanceHeadline":"أرقام تهم حين تكلّف الميلي ثانية أموالًا.","metrics":[{"metric":"< 1ms","label":"معالجة الأحداث"},{"metric":"< 100ms","label":"تنفيذ الأوامر"},{"metric":"~200ms","label":"استطلاع المراكز"},{"metric":"~50MB","label":"خط أساس الذاكرة"},{"metric":"< 5%","label":"استخدام المعالج"},{"metric":"25 / 10s","label":"حد المعدل (قابل للتهيئة)"}]},"safety":{"eyebrow":"تصميم يضع المخاطر أولًا","headlineLine1":"السرعة بلا ضمانات","headlineLine2":"ليست سوى خسارة باهظة.","description":"كل أمر يمر عبر خط أنابيب مخاطر من أربع طبقات قبل أن يصل إلى المنصة. قواطع دائرة، وفحوص عمق، وحدود دنيا للحجم، وتشغيل تجريبي كامل — موصولة بنفس نواة التنفيذ التي يستخدمها كل بوت.","layers":[{"icon":"🛑","title":"قاطع الدائرة","body":"يتوقف تلقائيًا بعد N صفقات كبيرة متتالية داخل نافذة متحركة قابلة للتهيئة. يوقف الانهيارات قبل أن تبدأ.","accent":"text-rose-400"},{"icon":"🛡️","title":"حارس عمق دفتر الأوامر","body":"يتحقق من السيولة قبل كل أمر. بلا تنفيذ في دفاتر رقيقة — نقطة.","accent":"text-amber-400"},{"icon":"🧪","title":"وضع التشغيل التجريبي","body":"مسار التنفيذ الكامل يعمل دون وضع أوامر حقيقية. تحقق من الإشارات والأحجام دون أي رأس مال معرّض للخطر.","accent":"text-cyan-400"},{"icon":"⚖️","title":"الحد الأدنى لحجم الصفقة","body":"فرض حد أدنى للحجم على كل أمر. يصفّي الصفقات الدقيقة سالبة القيمة المتوقعة تلقائيًا.","accent":"text-emerald-400"}],"ladderTitle":"سُلَّم النشر","ladderSubtitle":"قائمة تحقق قصيرة للانتقال من الصفر إلى الإنتاج.","ladder":[{"stage":"الإعداد","action":"شغّل بإعداد enable_trading: false لجلسة كاملة واحدة."},{"stage":"أولى الصفقات","action":"أبقِ copy_percentage عند 5–10% حتى تثق بالإشارة."},{"stage":"المتابعة","action":"راقب تفعيلات قاطع الدائرة — فهي تكشف شذوذ التنفيذ."},{"stage":"الإنتاج","action":"استخدم محفظة مخصصة برأس المال الذي تنوي نشره فقط."}]},"howItWorks":{"eyebrow":"كيف يعمل","headline":"من المستودع إلى بوت مباشر في ثلاث خطوات.","description":"بلا صندوق أسود. تشغّل نفس محرك Rust الظاهر في اللقطات — على جهازك، بمفاتيحك، برأس مالك.","steps":[{"num":"01","title":"اختر ميزتك","body":"اختر الاستراتيجية والمنصة اللتين تناسبان رؤيتك. كل بوت ميزة سوقية مميزة ومحددة بوضوح على المحرك المشترك."},{"num":"02","title":"هيّئ وشغّل تجريبيًا","body":"أدخل مفاتيحك، وحدد حدود المخاطر، وشغّل بإعداد enable_trading: false حتى تثق بالإشارة — بلا رأس مال معرّض للخطر."},{"num":"03","title":"انطلق مباشرة","body":"عندما تكون مستعدًا، اتبع دليل التداول الحقيقي وفعّل محفظة مخصصة لا تحتوي إلا على ما يمكنك تحمّل خسارته. لم يتم اختبار أي أمر حقيقي حتى الآن، لذا ابدأ بمبلغ صغير. تابع عمليات التنفيذ والأرباح والخسائر (P&L) وحالة قاطع الدائرة من واجهة TUI المباشرة."}],"getTitle":"ما الذي تحصل عليه","gets":["مصدر Rust كامل — مرخّص بـ MIT، لك أن تقرأه وتعدّله","إعداد موجَّه — مساعدة مباشرة لتشغيل أول بوت لك","طبقة المخاطر المشتركة — قاطع دائرة، حارس عمق، تشغيل تجريبي، حد أدنى للصفقة","تحديثات مستمرة — منصات جديدة وترقيات استراتيجيات فور صدورها"],"note":"متاح المصدر مع إعداد عملي مباشر. راسِلنا على Telegram للوصول والتسعير.","cta":"احصل على الوصول عبر Telegram"},"cta":{"eyebrow":"ابدأ الآن","headline":"مستعد لتشغيل بوت؟","description":"Telegram للحوار المباشر، ومناقشة النطاق، أو الإعداد المدفوع. GitHub لمستودع المصدر المفتوح، ووثائق التهيئة، والشيفرة الحية. زمن الرد على Telegram عادةً بضع ساعات.","ctaTelegram":"@tarpboi على Telegram","ctaGithub":"تصفّح المستودع","pillars":[{"title":"مفتوح المصدر","body":"مرخّص بـ MIT. اقرأ الشيفرة، انسخها، ابنِ عليها."},{"title":"مصان بنشاط","body":"المستودع يشحن إصلاحات وترقيات استراتيجيات بانتظام."},{"title":"خط مباشر","body":"بلا تذاكر دعم. تتحدث إلى الشخص الذي كتب البوت."}]},"footer":{"productName":"PnL Profit","tagline":"Predict.fun · Polymarket · Kalshi","disclaimerLabel":"إخلاء مسؤولية.","rights":"مرخّص بـ MIT · بُني لمجتمع أسواق التنبؤ.","disclaimer":"ينطوي تداول أسواق التنبؤ على مخاطر مالية حقيقية. يُقدَّم هذا البرنامج كما هو، دون أي ضمان أو كفالة لأي نتيجة. وهو لا يُعدّ نصيحة مالية. اختبِر دائماً باستخدام {flag} قبل توظيف رأس مال حقيقي. احرص على الالتزام بشروط الخدمة الخاصة بكل منصّة وباللوائح المعمول بها في نطاق ولايتك القضائية."}},
};

const messages = Object.fromEntries(
  LOCALES.map((l) => {
    const code = l.code as Lang;
    if (code === 'en' || code === 'zh' || code === 'ru') return [code, full[code]];
    return [code, deepMerge<Messages>(full.en, overrides[code] ?? {})];
  }),
) as Record<Lang, Messages>;

// Languages actually ready to show in the switcher: EN/ZH/RU plus any locale
// whose override has been filled in. New languages light up automatically as
// their translations land in `overrides` above.
export const READY_LANGS: Lang[] = LOCALES.map((l) => l.code as Lang).filter(
  (code) => code === 'en' || code === 'zh' || code === 'ru' || Object.keys(overrides[code] ?? {}).length > 0,
);

export function useT(): Messages {
  const { lang } = useLang();
  return messages[lang] ?? full.en;
}

export { messages };
