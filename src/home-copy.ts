// Copy for the learning-first homepage (hero, mobile menu, compact bots/venues).
// One entry per locale; missing keys fall back to English via homeCopy().
import type { Lang } from './i18n';

export interface HomeCopy {
  glossary: string;
  bots: string;
  menu: string;
  badge: string; // {articles} {langs}
  line1: string;
  line2: string;
  description: string;
  ctaLearn: string;
  ctaBots: string;
  popular: string;
  statGuides: string;
  statTerms: string;
  statLangs: string;
  statBots: string;
  details: string;
  hide: string;
  showAll: string; // {n}
  showLess: string;
}

const en: HomeCopy = {
  glossary: 'Glossary',
  bots: 'Trading bots',
  menu: 'Menu',
  badge: 'Free · {articles} guides · {langs} languages',
  line1: 'Learn to trade any market.',
  line2: 'Then automate it safely.',
  description:
    'Clear, free guides to stocks, forex, futures, options, crypto, meme coins and prediction markets, plus the risk management and psychology that decide who lasts. When you are ready, test strategies with our open-source bot engine in dry run.',
  ctaLearn: 'Start learning',
  ctaBots: 'Explore the bots',
  popular: 'Popular topics',
  statGuides: 'in-depth guides',
  statTerms: 'glossary terms',
  statLangs: 'languages',
  statBots: 'open-source bot strategies',
  details: 'Details',
  hide: 'Hide',
  showAll: 'Show all {n} venues',
  showLess: 'Show fewer',
};

const copies: Partial<Record<Lang, Partial<HomeCopy>>> = {
  en,
  zh: {
    glossary: '术语表', bots: '交易机器人', menu: '菜单',
    badge: '免费 · {articles} 篇指南 · {langs} 种语言',
    line1: '学会交易任何市场。', line2: '再安全地实现自动化。',
    description: '免费、清晰的指南，涵盖股票、外汇、期货、期权、加密货币、Meme 币和预测市场，以及决定谁能长期生存的风险管理与交易心理。准备好之后，可以用我们的开源机器人引擎在模拟模式下测试策略。',
    ctaLearn: '开始学习', ctaBots: '了解交易机器人', popular: '热门主题',
    statGuides: '篇深度指南', statTerms: '个术语', statLangs: '种语言', statBots: '个开源机器人策略',
    details: '详情', hide: '收起', showAll: '显示全部 {n} 个平台', showLess: '收起',
  },
  ru: {
    glossary: 'Глоссарий', bots: 'Торговые боты', menu: 'Меню',
    badge: 'Бесплатно · {articles} руководств · {langs} языков',
    line1: 'Научитесь торговать на любом рынке.', line2: 'Затем автоматизируйте это безопасно.',
    description: 'Понятные бесплатные руководства по акциям, форексу, фьючерсам, опционам, криптовалютам, мемкоинам и рынкам предсказаний, а также по риск-менеджменту и психологии, которые решают, кто останется в игре. Когда будете готовы, проверьте стратегии в нашем открытом движке ботов в режиме симуляции.',
    ctaLearn: 'Начать обучение', ctaBots: 'Посмотреть ботов', popular: 'Популярные темы',
    statGuides: 'подробных руководств', statTerms: 'терминов в глоссарии', statLangs: 'языков', statBots: 'стратегий ботов с открытым кодом',
    details: 'Подробнее', hide: 'Скрыть', showAll: 'Показать все {n} площадки', showLess: 'Свернуть',
  },
  es: {
    glossary: 'Glosario', bots: 'Bots de trading', menu: 'Menú',
    badge: 'Gratis · {articles} guías · {langs} idiomas',
    line1: 'Aprende a operar en cualquier mercado.', line2: 'Luego automatízalo con seguridad.',
    description: 'Guías gratuitas y claras sobre acciones, forex, futuros, opciones, cripto, meme coins y mercados de predicción, además de la gestión del riesgo y la psicología que deciden quién aguanta. Cuando estés listo, prueba estrategias con nuestro motor de bots de código abierto en modo simulación.',
    ctaLearn: 'Empieza a aprender', ctaBots: 'Ver los bots', popular: 'Temas populares',
    statGuides: 'guías a fondo', statTerms: 'términos del glosario', statLangs: 'idiomas', statBots: 'estrategias de bots de código abierto',
    details: 'Detalles', hide: 'Ocultar', showAll: 'Ver las {n} plataformas', showLess: 'Ver menos',
  },
  pt: {
    glossary: 'Glossário', bots: 'Robôs de trading', menu: 'Menu',
    badge: 'Grátis · {articles} guias · {langs} idiomas',
    line1: 'Aprenda a operar em qualquer mercado.', line2: 'Depois, automatize com segurança.',
    description: 'Guias gratuitos e claros sobre ações, forex, futuros, opções, cripto, memecoins e mercados de previsão, além da gestão de risco e da psicologia que decidem quem sobrevive. Quando estiver pronto, teste estratégias com nosso motor de robôs de código aberto em modo simulado.',
    ctaLearn: 'Comece a aprender', ctaBots: 'Conheça os robôs', popular: 'Temas populares',
    statGuides: 'guias completos', statTerms: 'termos no glossário', statLangs: 'idiomas', statBots: 'estratégias de robôs de código aberto',
    details: 'Detalhes', hide: 'Ocultar', showAll: 'Ver todas as {n} plataformas', showLess: 'Ver menos',
  },
  fr: {
    glossary: 'Glossaire', bots: 'Bots de trading', menu: 'Menu',
    badge: 'Gratuit · {articles} guides · {langs} langues',
    line1: 'Apprenez à trader sur tous les marchés.', line2: 'Puis automatisez en toute sécurité.',
    description: 'Des guides gratuits et clairs sur les actions, le forex, les futures, les options, la crypto, les memecoins et les marchés prédictifs, ainsi que sur la gestion du risque et la psychologie qui décident de qui tient sur la durée. Quand vous êtes prêt, testez des stratégies avec notre moteur de bots open source en mode simulation.',
    ctaLearn: 'Commencer à apprendre', ctaBots: 'Découvrir les bots', popular: 'Thèmes populaires',
    statGuides: 'guides détaillés', statTerms: 'termes du glossaire', statLangs: 'langues', statBots: 'stratégies de bots open source',
    details: 'Détails', hide: 'Masquer', showAll: 'Voir les {n} plateformes', showLess: 'Voir moins',
  },
  de: {
    glossary: 'Glossar', bots: 'Trading-Bots', menu: 'Menü',
    badge: 'Kostenlos · {articles} Leitfäden · {langs} Sprachen',
    line1: 'Lernen Sie, an jedem Markt zu handeln.', line2: 'Dann automatisieren Sie es sicher.',
    description: 'Kostenlose, verständliche Leitfäden zu Aktien, Forex, Futures, Optionen, Krypto, Memecoins und Prognosemärkten, dazu Risikomanagement und Psychologie, die entscheiden, wer durchhält. Wenn Sie so weit sind, testen Sie Strategien mit unserer Open-Source-Bot-Engine im Simulationsmodus.',
    ctaLearn: 'Jetzt lernen', ctaBots: 'Bots ansehen', popular: 'Beliebte Themen',
    statGuides: 'ausführliche Leitfäden', statTerms: 'Glossarbegriffe', statLangs: 'Sprachen', statBots: 'Open-Source-Bot-Strategien',
    details: 'Details', hide: 'Ausblenden', showAll: 'Alle {n} Handelsplätze anzeigen', showLess: 'Weniger anzeigen',
  },
  it: {
    glossary: 'Glossario', bots: 'Bot di trading', menu: 'Menu',
    badge: 'Gratis · {articles} guide · {langs} lingue',
    line1: 'Impara a fare trading su ogni mercato.', line2: 'Poi automatizzalo in sicurezza.',
    description: 'Guide gratuite e chiare su azioni, forex, futures, opzioni, crypto, memecoin e mercati predittivi, oltre alla gestione del rischio e alla psicologia che decidono chi resiste. Quando sei pronto, prova le strategie con il nostro motore di bot open source in modalità simulazione.',
    ctaLearn: 'Inizia a imparare', ctaBots: 'Scopri i bot', popular: 'Argomenti popolari',
    statGuides: 'guide approfondite', statTerms: 'termini del glossario', statLangs: 'lingue', statBots: 'strategie di bot open source',
    details: 'Dettagli', hide: 'Nascondi', showAll: 'Mostra tutte le {n} piattaforme', showLess: 'Mostra meno',
  },
  tr: {
    glossary: 'Sözlük', bots: 'İşlem botları', menu: 'Menü',
    badge: 'Ücretsiz · {articles} rehber · {langs} dil',
    line1: 'Her piyasada işlem yapmayı öğrenin.', line2: 'Sonra güvenle otomatikleştirin.',
    description: 'Hisse, forex, vadeli işlemler, opsiyonlar, kripto, meme coin ve tahmin piyasaları üzerine ücretsiz ve anlaşılır rehberler; ayrıca kimin ayakta kalacağını belirleyen risk yönetimi ve psikoloji. Hazır olduğunuzda stratejileri açık kaynaklı bot motorumuzla simülasyon modunda test edin.',
    ctaLearn: 'Öğrenmeye başlayın', ctaBots: 'Botları keşfedin', popular: 'Popüler konular',
    statGuides: 'kapsamlı rehber', statTerms: 'sözlük terimi', statLangs: 'dil', statBots: 'açık kaynaklı bot stratejisi',
    details: 'Ayrıntılar', hide: 'Gizle', showAll: '{n} platformun tümünü göster', showLess: 'Daha az göster',
  },
  vi: {
    glossary: 'Thuật ngữ', bots: 'Bot giao dịch', menu: 'Menu',
    badge: 'Miễn phí · {articles} bài hướng dẫn · {langs} ngôn ngữ',
    line1: 'Học giao dịch mọi thị trường.', line2: 'Rồi tự động hóa một cách an toàn.',
    description: 'Hướng dẫn miễn phí, dễ hiểu về cổ phiếu, forex, hợp đồng tương lai, quyền chọn, crypto, meme coin và thị trường dự đoán, cùng quản trị rủi ro và tâm lý giao dịch, những yếu tố quyết định ai trụ lại được. Khi đã sẵn sàng, hãy thử chiến lược với bộ máy bot mã nguồn mở của chúng tôi ở chế độ chạy thử.',
    ctaLearn: 'Bắt đầu học', ctaBots: 'Khám phá các bot', popular: 'Chủ đề phổ biến',
    statGuides: 'bài hướng dẫn chuyên sâu', statTerms: 'thuật ngữ', statLangs: 'ngôn ngữ', statBots: 'chiến lược bot mã nguồn mở',
    details: 'Chi tiết', hide: 'Ẩn', showAll: 'Xem tất cả {n} sàn', showLess: 'Thu gọn',
  },
  ja: {
    glossary: '用語集', bots: 'トレードボット', menu: 'メニュー',
    badge: '無料 · {articles}本のガイド · {langs}言語',
    line1: 'あらゆる市場のトレードを学ぶ。', line2: 'そして安全に自動化する。',
    description: '株式、FX、先物、オプション、暗号資産、ミームコイン、予測市場をわかりやすく解説する無料ガイドです。生き残れるかを左右するリスク管理とトレード心理もカバーしています。準備ができたら、オープンソースのボットエンジンでストラテジーをドライランで試せます。',
    ctaLearn: '学習を始める', ctaBots: 'ボットを見る', popular: '人気のテーマ',
    statGuides: '本の詳しいガイド', statTerms: '用語', statLangs: '言語', statBots: 'オープンソースのボット戦略',
    details: '詳細', hide: '閉じる', showAll: '全{n}取引所を表示', showLess: '折りたたむ',
  },
  ko: {
    glossary: '용어집', bots: '트레이딩 봇', menu: '메뉴',
    badge: '무료 · 가이드 {articles}편 · {langs}개 언어',
    line1: '모든 시장의 트레이딩을 배우세요.', line2: '그다음 안전하게 자동화하세요.',
    description: '주식, 외환, 선물, 옵션, 암호화폐, 밈코인, 예측 시장을 쉽게 설명하는 무료 가이드입니다. 누가 살아남는지를 결정하는 리스크 관리와 트레이딩 심리도 다룹니다. 준비가 되면 오픈소스 봇 엔진으로 전략을 모의 실행(드라이런)으로 시험해 보세요.',
    ctaLearn: '학습 시작하기', ctaBots: '봇 살펴보기', popular: '인기 주제',
    statGuides: '편의 심층 가이드', statTerms: '개 용어', statLangs: '개 언어', statBots: '개 오픈소스 봇 전략',
    details: '자세히', hide: '접기', showAll: '거래소 {n}곳 모두 보기', showLess: '접기',
  },
  ar: {
    glossary: 'المسرد', bots: 'روبوتات التداول', menu: 'القائمة',
    badge: 'مجاني · {articles} دليلًا · {langs} لغات',
    line1: 'تعلّم التداول في أي سوق.', line2: 'ثم أتمته بأمان.',
    description: 'أدلة مجانية وواضحة عن الأسهم والفوركس والعقود الآجلة والخيارات والعملات المشفرة وعملات الميم وأسواق التنبؤ، إضافة إلى إدارة المخاطر وعلم نفس التداول اللذين يحددان من يصمد. وعندما تكون مستعدًا، جرّب الاستراتيجيات بمحرك الروبوتات مفتوح المصدر في وضع المحاكاة.',
    ctaLearn: 'ابدأ التعلّم', ctaBots: 'استكشف الروبوتات', popular: 'مواضيع شائعة',
    statGuides: 'دليلًا مفصلًا', statTerms: 'مصطلحًا في المسرد', statLangs: 'لغات', statBots: 'استراتيجيات روبوتات مفتوحة المصدر',
    details: 'التفاصيل', hide: 'إخفاء', showAll: 'عرض كل المنصات ({n})', showLess: 'عرض أقل',
  },
};

export function homeCopy(lang: Lang): HomeCopy {
  return { ...en, ...(copies[lang] ?? {}) };
}

export const fill = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
