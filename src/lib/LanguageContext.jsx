import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
];

export const translations = {
  en: {
    home: "Home",
    about: "About",
    work: "Work",
    photography: "Photography",
    contact: "Contact",

    identityPrefix: "Also:",
    identityWords: [
      "Developer",
      "UX expert",
      "World Traveller",
      "Trilingual",
      "Design expert"
    ],
    heroTitle: "Product designer crafting intuitive digital experiences.",
    heroBody: "Blending design, technology, and user research to build products that feel effortless and meaningful.",
    exploreWork: "Explore the work",
    selectedWork: "Selected work",

    projectsTitle: "PROJECTS",
    projectsSub: "A closer look at the work, from first idea to final interaction.",

    aboutEyebrow: "ABOUT",
    aboutTitle: "Ryan Monaghan",
    aboutProfileLabel: "Profile / 001",
    aboutSummaryCopy: "I am an empathetic product designer with a foundation in computer science and over five years of experience transforming complex challenges into intuitive, user-centered digital products.",
    downloadResume: "Download resume",
    howIWork: "HOW I WORK",
    designGrounded: "Design grounded in purpose and precision.",

    location: "Location",
    roleLabel: "Role",
    experienceLabel: "Experience",
    educationLabel: "Education",
    focusLabel: "Focus",
    locationVal: "Jersey City, NJ",
    roleVal: "Product Designer",
    experienceVal: "5+ Years",
    educationVal: "Computer Science",
    focusVal: "UX/UI, Design Systems, Front-End",

    workEyebrow: "WORK",
    workTitle: "Selected projects.",
    workBody: "A mix of identity, interaction, and image-making. Open a project to see the thinking behind it.",

    photoEyebrow: "PHOTOGRAPHY",
    photoTitle: "Photographs by Ryan",
    photoBody: "Photos I have taken along the way, from places I have visited to details I did not want to forget.",
    allPhotos: "ALL PHOTOS / 2026",
    bestShots: "MY BEST SHOTS",
    dragHintDesktop: "HOLD + DRAG OR SCROLL TO VIEW ALL PHOTOS",
    dragHintMobile: "SWIPE TO VIEW ALL PHOTOS",

    contactEyebrow: "CONTACT",
    contactTitle: "Hiring or building something great? Let’s talk.",
    contactBody: "For roles, collaborations, commissions, and thoughtful questions, email me directly.",
    emailMe: "Email me here",

    overview: "01 / Overview",
    challenge: "02 / The Challenge",
    researchLabel: "03 / Research & Discovery",
    processLabel: "04 / Process & Iterations",
    solutionLabel: "05 / The Solution",
    roleHeading: "Role",
    timelineHeading: "Timeline",
    toolsHeading: "Tools",
    impactHeading: "Impact & Key Outcomes",
    backToWork: "Back to work",
    nextProject: "Next Project",

    quickLinks: "QUICK LINKS",
    getInTouch: "GET IN TOUCH",
    codedBy: "Coded and designed by Ryan Monaghan",
  },
  ja: {
    home: "ホーム",
    about: "経歴・概要",
    work: "実績・作品",
    photography: "写真",
    contact: "お問い合わせ",

    identityPrefix: "また:",
    identityWords: [
      "デベロッパー",
      "UXエキスパート",
      "ワールドトラベラー",
      "トライリンガル",
      "デザインエキスパート"
    ],
    heroTitle: "直感的なデジタル体験を創造するプロダクトデザイナー。",
    heroBody: "デザイン、テクノロジー、ユーザーリサーチを融合させ、シンプルで価値あるプロダクトを構築します。",
    exploreWork: "実績を見る",
    selectedWork: "主要な実績",

    projectsTitle: "PROJECTS",
    projectsSub: "最初のアイディアから最終的なインタラクションまでの詳細な実績。",

    aboutEyebrow: "ABOUT",
    aboutTitle: "Ryan Monaghan",
    aboutProfileLabel: "プロフィール / 001",
    aboutSummaryCopy: "私はコンピューターサイエンスの基礎を持ち、5年以上にわたり複雑な課題を直感的なユーザー中心のデジタルプロダクトに変換してきたプロダクトデザイナーです。",
    downloadResume: "履歴書をダウンロード",
    howIWork: "仕事の進め方",
    designGrounded: "目的と精度に基づいたデザイン。",

    location: "居住地",
    roleLabel: "職種",
    experienceLabel: "経験年数",
    educationLabel: "専攻",
    focusLabel: "専門分野",
    locationVal: "米国ニュージャージー州ジャージーシティ",
    roleVal: "プロダクトデザイナー",
    experienceVal: "5年以上",
    educationVal: "コンピューターサイエンス",
    focusVal: "UX/UI、デザインシステム、フロントエンド",

    workEyebrow: "WORK",
    workTitle: "主要プロジェクト。",
    workBody: "アイデンティティ、インタラクション、ビジュアル制作の融合。プロジェクトを開いて背景にある思考をご覧ください。",

    photoEyebrow: "PHOTOGRAPHY",
    photoTitle: "Ryanの写真コレクション",
    photoBody: "訪れた場所から忘れられないディテールまで、旅の途中で撮影した写真。",
    allPhotos: "全写真 / 2026",
    bestShots: "ベストショット",
    dragHintDesktop: "ドラッグまたはスクロールで写真を閲覧",
    dragHintMobile: "スワイプして全写真を閲覧",

    contactEyebrow: "CONTACT",
    contactTitle: "採用や素晴らしいプロダクトの構築をご検討中ですか？お話ししましょう。",
    contactBody: "役割、コラボレーション、ご依頼、ご質問はお気軽にお問い合わせください。",
    emailMe: "メールで連絡する",

    overview: "01 / 概要",
    challenge: "02 / 課題",
    researchLabel: "03 / リサーチと発見",
    processLabel: "04 / プロセスとイテレーション",
    solutionLabel: "05 / ソリューション",
    roleHeading: "役割",
    timelineHeading: "期間",
    toolsHeading: "ツール",
    impactHeading: "主な成果と影響",
    backToWork: "実績一覧に戻る",
    nextProject: "次のプロジェクト",

    quickLinks: "クイックリンク",
    getInTouch: "お問い合わせ",
    codedBy: "Ryan Monaghan によるデザイン＆開発",
  },
  ko: {
    home: "홈",
    about: "소개",
    work: "작품",
    photography: "사진",
    contact: "연락처",

    identityPrefix: "또한:",
    identityWords: [
      "개발자",
      "UX 전문가",
      "세계 여행가",
      "3개 국어 능력자",
      "디자인 전문가"
    ],
    heroTitle: "직관적인 디지털 경험을 만드는 프로덕트 디자이너.",
    heroBody: "디자인, 기술, 사용자 리서치를 결합하여 효율적이고 의미 있는 제품을 만듭니다.",
    exploreWork: "작품 보기",
    selectedWork: "주요 작품",

    projectsTitle: "PROJECTS",
    projectsSub: "첫 아이디어부터 최종 상호작용까지의 세부 작품.",

    aboutEyebrow: "ABOUT",
    aboutTitle: "Ryan Monaghan",
    aboutProfileLabel: "프로필 / 001",
    aboutSummaryCopy: "저는 컴퓨터 과학을 바탕으로 5년 이상 복잡한 과제를 직관적인 사용자 중심 디지털 제품으로 전환해 온 프로덕트 디자이너입니다.",
    downloadResume: "이력서 다운로드",
    howIWork: "일하는 방식",
    designGrounded: "목적과 정밀함에 기반한 디자인.",

    location: "위치",
    roleLabel: "역할",
    experienceLabel: "경력",
    educationLabel: "전공",
    focusLabel: "전문 분야",
    locationVal: "미국 뉴저지주 저지시티",
    roleVal: "프로덕트 디자이너",
    experienceVal: "5년 이상",
    educationVal: "컴퓨터 과학",
    focusVal: "UX/UI, 디자인 시스템, 프론트엔드",

    workEyebrow: "WORK",
    workTitle: "주요 프로젝트.",
    workBody: "아이덴티티, 인터랙션, 비주얼 제작의 결합. 프로젝트를 열어 그 뒤에 있는 생각을 확인하세요.",

    photoEyebrow: "PHOTOGRAPHY",
    photoTitle: "Ryan의 사진 컬렉션",
    photoBody: "방문한 장소부터 잊고 싶지 않은 세부사항까지, 길에서 촬영한 사진들.",
    allPhotos: "모든 사진 / 2026",
    bestShots: "베스트 샷",
    dragHintDesktop: "드래그 또는 스크롤하여 모든 사진 보기",
    dragHintMobile: "스와이프하여 모든 사진 보기",

    contactEyebrow: "CONTACT",
    contactTitle: "채용이나 멋진 제품 작성을 준비 중이신가요? 이야기해 봅시다.",
    contactBody: "포지션, 협업, 의뢰 및 궁금한 점은 직접 이메일로 보내주세요.",
    emailMe: "이메일 보내기",

    overview: "01 / 개요",
    challenge: "02 / 과제",
    researchLabel: "03 / 리서치 및 발견",
    processLabel: "04 / 프로세스 및 반복",
    solutionLabel: "05 / 솔루션",
    roleHeading: "역할",
    timelineHeading: "기간",
    toolsHeading: "도구",
    impactHeading: "주요 성과 및 영향",
    backToWork: "작품 목록으로 돌아가기",
    nextProject: "다음 프로젝트",

    quickLinks: "빠른 링크",
    getInTouch: "연락처",
    codedBy: "Ryan Monaghan이 디자인하고 개발함",
  }
};

export const projectTranslations = {
  ja: {
    velocity: {
      category: "プロダクトデザイン / レスポンシブウェブサイト",
      summary: "医療従事者がアクセス、サポート、登録情報に容易にアクセスできる医療情報Web体験。",
      description: "ICOTYDE withMe HCPは、尋常性乾癬治療薬ICOTYDEを処方する皮膚科医向けのWebサイトです。複雑な臨床データや保険情報を明確で信頼できる処方体験へと導きます。",
      role: "3名のStudioRXチームでのプロダクトデザイナー",
      overview: "ICOTYDE withMe HCPは、医師が必要な臨床情報や患者サポートリソースに摩擦なくアクセスできるように設計されています。",
      problem: "医療従事者は処方治療の患者サポートや保険事前承認手続きに直面した際、複雑な情報探索に時間を取られる課題がありました。",
      solution: "UX、開発、プロダクトデザインが協力し、臨床価値を的確に伝え、患者の治療開始を迅速にサポートする直感的なサイトを構築しました。",
    },
    'gaming-gear': {
      category: "プロダクトデザイン / モバイルアプリ",
      summary: "信頼できるレビュー、有用な比較、コミュニティを中心としたゲーミングギア探索アプリ。",
      description: "Gaming Gearは、プレイスタイルに合った機材探しを個別推奨、ユーザーレビュー、製品比較機能でサポートします。",
      role: "UX/UIデザイン、ユーザーリサーチ、プロトタイピング",
      overview: "Gaming Gearは、ゲーミング機器の選択をよりパーソナルで信頼性の高いものにするモバイルアプリコンセプトです。",
      problem: "一般的なECサイトでは、広大なカタログから自分に合った機材を見つけることが困難でした。",
      solution: "パーソナライズされた提案とサイドバイサイド比較機能により、閲覧から自信を持った購買への明確なパスを提供しました。",
    },
    'gl-hcp-ectrims-booth': {
      category: "プロダクトデザイン / インタラクティブビジュアルガイド",
      summary: "学会ブース向けのタッチスクリーン体験。医療従事者が直感的に臨床データを閲覧可能。",
      description: "ECTRIMS学会ブースにて、医療従事者が自発的に臨床データと治療情報を体験できるタッチスクリーンビジュアルガイド。",
      role: "UX/UIデザイン、インタラクションデザイン、現地コンテンツ戦略",
      overview: "ECTRIMSブースでの対話をより深めるため、大量の臨床データを直感的なインタラクティブ画面に構成しました。",
      problem: "静的なポスターやRep主導の説明では、混雑する展示会場で医療従事者が自身のペースで深く理解することが難しかった点。",
      solution: "自己主導型のインタラクティブ体験を提供することで、Repとの対話をより具体的かつ記憶に残るものに改善しました。",
    },
    'sibos-tote-bag': {
      title: "Sibos 2023 トートバッグデザイン",
      category: "ブランディング＆ノベルティ / グラフィックデザイン",
      summary: "Sibos 2023にてPremium Technology社のために制作された持続可能なESGテーマのトートバッグ。",
      description: "トロントで開催された金融リーダー向け国際展示会Sibos 2023にて、Premium Technology社のブース来場者500名以上に配布されたESGテーマのトートバッグデザイン。",
      role: "リードプロダクトデザイナー",
      overview: "世界最高峰の金融カンファレンスSibos 2023向けに、持続可能性とグローバル展開を象徴するトートバッグをデザインしました。",
      problem: "主張しすぎない洗練されたデザインでESGコンセプトとブランドアイデンティティを表現する必要がありました。",
      solution: "親しみやすいタイポグラフィと自然なアースカラーを採用し、QRコードを組み込むことで実機アクセスへの動線を確立しました。",
    },
  },
  ko: {
    velocity: {
      category: "프로덕트 디자인 / 반응형 웹사이트",
      summary: "의료 전문가가 지원, 보험 및 등록 정보에 빠르게 접근할 수 있도록 돕는 웹 경험.",
      description: "ICOTYDE withMe HCP는 판상 건선 치료제 ICOTYDE를 처방하는 피부과 전문의를 위한 웹사이트입니다. 복잡한 임상 정보와 보험 절차를 명확하고 신뢰할 수 있는 경험으로 전환합니다.",
      role: "StudioRX 3인 팀의 프로덕트 디자이너",
      overview: "ICOTYDE withMe HCP는 의사와 의료진이 환자 지원 프로그램과 등록 리소스에 원활하게 접근하도록 돕습니다.",
      problem: "의료진은 처방 과정에서 환자 지원 및 사전 승인 서류 작업에 많은 시간을 소요하는 어려움을 겪고 있었습니다.",
      solution: "직관적인 탐색 구조와 명확한 시각적 계층 구조를 통해 처방 및 환자 치료 시작을 신속하게 지원하도록 제작되었습니다.",
    },
    'gaming-gear': {
      category: "프로덕트 디자인 / 모바일 앱",
      summary: "신뢰할 수 있는 리뷰, 제품 비교 및 커뮤니티 기반의 장비 탐색 앱.",
      description: "Gaming Gear는 플레이어의 스타일과 선호도에 맞는 맞춤형 장비 추천, 비교 및 리뷰 커뮤니티를 제공합니다.",
      role: "UX/UI 디자인, 사용자 리서치, 프로토타이핑",
      overview: "Gaming Gear는 게이밍 장비 탐색을 더욱 개인화되고 신뢰할 수 있게 만드는 모바일 앱 컨셉입니다.",
      problem: "일반 쇼핑몰의 방대한 카탈로그에서는 자신에게 맞는 장비를 찾고 확신을 갖기 어려웠습니다.",
      solution: "맞춤 추천과 나란히 비교 기능을 통해 탐색부터 구매 결정까지의 과정을 한층 더 매끄럽게 다듬었습니다.",
    },
    'gl-hcp-ectrims-booth': {
      category: "프로덕트 디자인 / 인터랙티브 비주얼 가이드",
      summary: "학회 부스용 터치스크린 경험. 의료진이 임상 데이터를 직접 탐색할 수 있는 구조.",
      description: "ECTRIMS 학회 부스에서 의료 전문가들이 자신의 속도로 임상 데이터를 탐색할 수 있도록 돕는 터치스크린 경험입니다.",
      role: "UX/UI 디자인, 인터랙션 디자인, 현장 콘텐츠 전략",
      overview: "ECTRIMS 학회의 복잡한 부스 환경에서 의료진의 관심과 이해도를 높이기 위한 인터랙티브 터치스크린 가이드입니다.",
      problem: "정적인 포스터나 설명 위주의 대화만으로는 복잡한 임상 데이터를 효과적으로 전달하는 데 한계가 있었습니다.",
      solution: "자기 주도형 인터랙티브 가이드를 통해 부스 방문자의 이해도를 높이고 더욱 깊이 있는 대화를 유도했습니다.",
    },
    'sibos-tote-bag': {
      title: "Sibos 2023 토트백 디자인",
      category: "브랜딩 & 굿즈 / 그래픽 디자인",
      summary: "Sibos 2023에서 Premium Technology사를 위해 제작된 지속 가능한 ESG 테마 토트백.",
      description: "토론토에서 열린 세계적인 금융 컨퍼런스 Sibos 2023에서 Premium Technology 부스 방문자 500여 명에게 전달된 친환경 토트백 디자인.",
      role: "리드 프로덕트 디자이너",
      overview: "글로벌 금융 리더들이 참석한 Sibos 2023을 위해 브랜드 가치와 지속 가능성을 담은 토트백을 디자인했습니다.",
      problem: "지나치게 자극적이지 않으면서도 브랜드의 ESG 메시지와 글로벌 확장 비전을 명확히 전달해야 했습니다.",
      solution: "자연스러운 컬러 팔레트와 타이포그래피, QR 코드를 통합하여 방문객의 실질적인 관심과 접속을 이끌어냈습니다.",
    },
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem("portfolio-language") || "en";
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem("portfolio-language", newLang);
  };

  const t = (key) => {
    if (typeof key === "object" && key !== null) {
      return key[lang] || key.en || "";
    }
    return translations[lang]?.[key] || translations.en?.[key] || key;
  };

  const translateProject = (project) => {
    if (!project || lang === "en") return project;
    const trans = projectTranslations[lang]?.[project.slug];
    if (!trans) return project;
    return {
      ...project,
      title: trans.title || project.title,
      category: trans.category || project.category,
      summary: trans.summary || project.summary,
      description: trans.description || project.description,
      role: trans.role || project.role,
      overview: trans.overview || project.overview,
      problem: trans.problem || project.problem,
      solution: trans.solution || project.solution,
    };
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, translateProject }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
