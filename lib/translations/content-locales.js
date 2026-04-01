function mergeLocalizedValue(baseValue, localeMap) {
  if (!localeMap) {
    return baseValue;
  }

  if (!baseValue || typeof baseValue !== "object" || Array.isArray(baseValue)) {
    return localeMap;
  }

  return {
    ...baseValue,
    ...localeMap
  };
}

const SITE_TRANSLATIONS = {
  home: {
    eyebrow: {
      ja: "五感で味わうモンゴルの旅",
      ko: "오감으로 느끼는 몽골 여행",
      es: "Viajar con los cinco sentidos"
    },
    heroTitle: {
      ja: "モンゴルを五感で体験する旅。",
      ko: "몽골을 오감으로 경험하는 여정.",
      es: "Descubre Mongolia a través de los cinco sentidos."
    },
    heroSubtitle: {
      ja: "景色を見るだけで終わらせず、草原の音、食卓の味わい、フェルトや風の手ざわり、文化と自然の空気感まで、落ち着いたペースで深く感じるための旅です。",
      ko: "풍경만 보고 지나가지 않고, 초원의 소리, 식탁의 맛, 펠트와 바람의 감촉, 문화와 자연의 공기까지 차분한 속도로 깊이 느끼도록 설계한 여행입니다.",
      es: "No se trata solo de mirar paisajes. Es un viaje para escuchar la estepa, saborear la mesa local, sentir las texturas y entrar con calma en la atmósfera de la cultura y la naturaleza."
    },
    sectionIntro: {
      ja: "空気感、風景、文化、そしてモンゴルのゆっくりした感覚的なリズムを軸にした3つのサンプル旅程。",
      ko: "분위기, 풍경, 문화, 그리고 몽골 특유의 느린 감각적 리듬을 중심으로 구성한 세 가지 샘플 여정.",
      es: "Tres viajes de muestra pensados alrededor de la atmósfera, el paisaje, la cultura y el ritmo sensorial más pausado de Mongolia."
    },
    storyTitle: {
      ja: "モンゴルを、見るだけでなく深く感じるための旅",
      ko: "몽골을 보기만 하는 것이 아니라 깊이 느끼도록 만든 여행",
      es: "Viajes pensados para sentir Mongolia, no solo verla"
    },
    storyBody: {
      ja: "どのルートにも、ひらけた土地の音、食卓のぬくもり、土地の素材の質感、そして心に残る静かな細部を感じるための余白があります。",
      ko: "각 여정에는 넓은 땅의 소리, 함께하는 식사의 온기, 지역 재료의 질감, 그리고 오래 남는 조용한 순간을 느낄 여백이 담겨 있습니다.",
      es: "Cada ruta deja espacio para el sonido del paisaje abierto, la calidez de las comidas compartidas, la textura de los materiales locales y esos detalles silenciosos que hacen memorable un lugar."
    }
  },
  about: {
    title: {
      ja: "シンプルな視点を持つ新しいモンゴルの旅行会社",
      ko: "분명한 시각을 가진 새로운 몽골 여행사",
      es: "Una nueva empresa de viajes mongola con una mirada clara y sencilla"
    },
    intro: {
      ja: "MongolWayは現代のモンゴルに焦点を当てます。広い空間、日常のもてなし、土地の物語、そして混みすぎない個人的なルートです。",
      ko: "MongolWay는 현대의 몽골에 집중합니다. 넓은 공간, 일상의 환대, 지역의 이야기, 그리고 지나치게 붐비지 않는 개인적인 동선입니다.",
      es: "MongolWay se enfoca en la Mongolia contemporánea: espacios abiertos, hospitalidad cotidiana, historias locales y rutas que se sienten personales en lugar de abarrotadas."
    },
    approachTitle: {
      ja: "私たちが大切にしたい旅の感覚",
      ko: "우리가 여행에서 만들고 싶은 감각",
      es: "Cómo queremos que se sienta la experiencia"
    },
    approachBody: {
      ja: "わかりやすいコミュニケーション、柔軟なペース配分、そして象徴的な瞬間と静かなローカル体験のバランス。",
      ko: "명확한 소통, 유연한 속도, 그리고 대표적인 순간과 조용한 로컬 경험 사이의 균형.",
      es: "Comunicación clara, ritmo adaptable y un equilibrio entre momentos icónicos y encuentros locales más tranquilos."
    }
  },
  contactPage: {
    title: {
      ja: "MongolWayに連絡する",
      ko: "MongolWay에 문의하기",
      es: "Contactar a MongolWay"
    },
    body: {
      ja: "日程、プライベート出発、現地情報についての質問を歓迎します。このサンプル会社ではHuslenbayrが主な連絡窓口です。",
      ko: "날짜, 프라이빗 출발, 현지 정보에 대한 문의를 환영합니다. 이 샘플 회사 프로필에서는 Huslenbayr가 주요 연락 담당자입니다.",
      es: "Son bienvenidas las preguntas sobre fechas, salidas privadas o detalles locales. Huslenbayr figura como el contacto principal de esta empresa de muestra."
    }
  },
  faqIntro: {
    ja: "モンゴル旅行を計画する前によく寄せられる主な質問への回答です。",
    ko: "몽골 여행을 계획하기 전에 여행자들이 자주 묻는 주요 질문에 대한 답변입니다.",
    es: "Respuestas a las preguntas más frecuentes que hacen los viajeros antes de planear un viaje a Mongolia."
  },
  faqs: {
    "faq-1": {
      question: {
        ja: "これらのサンプル旅程はどのような旅行者向けですか？",
        ko: "이 샘플 여정은 어떤 여행자에게 적합한가요?",
        es: "¿Para qué tipo de viajeros son estos viajes de muestra?"
      },
      answer: {
        ja: "ガイド付きで一定の構成がありつつ、風景、文化、地域のペースを味わう時間も欲しい方に向いています。",
        ko: "구조가 있는 가이드 여행을 원하지만, 풍경과 문화, 지역의 속도를 느낄 시간도 원하는 여행자에게 잘 맞습니다.",
        es: "Son ideales para quienes quieren un viaje guiado con estructura, pero también tiempo para el paisaje, la cultura y el ritmo local."
      }
    },
    "faq-2": {
      question: {
        ja: "プライベートグループ向けに出発内容を調整できますか？",
        ko: "프라이빗 그룹을 위해 출발 일정이나 구성을 조정할 수 있나요?",
        es: "¿Se pueden ajustar las salidas para grupos privados?"
      },
      answer: {
        ja: "はい。この構成はプライベート出発や調整した日程に対応できるよう準備されています。",
        ko: "네. 이 구조는 프라이빗 출발과 맞춤 날짜를 지원할 수 있도록 준비되어 있습니다.",
        es: "Sí. La estructura del proyecto está preparada para salidas privadas y fechas personalizadas."
      }
    },
    "faq-3": {
      question: {
        ja: "今後、支払いはどのように機能しますか？",
        ko: "앞으로 결제는 어떻게 작동하나요?",
        es: "¿Cómo funcionarán los pagos más adelante?"
      },
      answer: {
        ja: "このデモではQPay対応の支払いレイヤーを準備しており、後でQR生成やコールバック処理を追加できます。",
        ko: "이 데모는 QPay 준비형 결제 레이어를 갖추고 있어, 나중에 QR 생성과 콜백 처리를 추가할 수 있습니다.",
        es: "Esta demo prepara una capa de pago lista para QPay, de modo que después se puedan añadir la generación de QR y el manejo de callbacks."
      }
    },
    "faq-4": {
      question: {
        ja: "誰に連絡すればよいですか？",
        ko: "누구에게 연락하면 되나요?",
        es: "¿Con quién debo comunicarme?"
      },
      answer: {
        ja: "連絡先セクションではHuslenbayrを主な窓口として案内しています。",
        ko: "연락처 섹션에 Huslenbayr가 주요 담당자로 표시되어 있습니다.",
        es: "Huslenbayr figura como el contacto principal en la sección de contacto."
      }
    }
  }
};

const GUIDE_TRANSLATIONS = {
  "guide-1": {
    role: {
      ja: "フェスティバルホスト",
      ko: "축제 호스트",
      es: "Anfitrión del festival"
    },
    bio: {
      ja: "Temuulenは、レスリング会場から日常の夏の風景まで、ナーダムが都市と草原でどう感じられるかを説明するのが得意です。",
      ko: "Temuulen은 레슬링 경기장부터 여름의 일상적인 풍경까지, 나담이 도시와 초원에서 어떻게 느껴지는지 설명하는 것을 좋아합니다.",
      es: "A Temuulen le gusta explicar cómo se vive el Naadam tanto en la ciudad como en la estepa, desde la lucha hasta los rituales del verano cotidiano."
    }
  },
  "guide-2": {
    role: {
      ja: "自然ルートガイド",
      ko: "자연 루트 가이드",
      es: "Guía de rutas naturales"
    },
    bio: {
      ja: "Ariunaaは、中央モンゴルの谷、森の縁、火山景観をゆったりしたペースで案内します。",
      ko: "Ariunaa는 몽골 중부의 계곡, 숲 가장자리, 화산 지형을 느린 템포로 안내합니다.",
      es: "Ariunaa guía rutas de ritmo tranquilo por valles, bordes de bosque y paisajes volcánicos del centro de Mongolia."
    }
  },
  "guide-3": {
    role: {
      ja: "北の湖のコンパニオン",
      ko: "북부 호수 지역 동행 가이드",
      es: "Compañero del norte lacustre"
    },
    bio: {
      ja: "Saruulは湖水地方の空気感、森の雰囲気、そして北へ向かう旅行者への実務的なサポートに重点を置いています。",
      ko: "Saruul은 호수 지역의 분위기, 숲의 감각, 그리고 북쪽으로 향하는 여행자를 위한 실질적인 지원에 집중합니다.",
      es: "Saruul se enfoca en la región de los lagos, la atmósfera del bosque y el apoyo práctico para quienes viajan al norte."
    }
  }
};

const TOUR_TRANSLATIONS = {
  "tour-naadam": {
    title: {
      ja: "ナーダム体験",
      ko: "나담 체험",
      es: "Experiencia Naadam"
    },
    intro: {
      ja: "ナーダムの雰囲気、郷土料理、儀式、そしてウランバートル周辺の時間を軸にした短い夏の旅です。",
      ko: "나담의 분위기, 지역 음식, 의식, 그리고 울란바토르 안팎의 시간을 중심으로 한 짧은 여름 여행입니다.",
      es: "Un viaje corto de verano centrado en el ambiente del Naadam, la comida local, la ceremonia y el tiempo dentro y alrededor de Ulán Bator."
    },
    destination: {
      ja: "ウランバートルと近郊の草原",
      ko: "울란바토르와 인근 초원",
      es: "Ulán Bator y estepa cercana"
    },
    durationLabel: {
      ja: "4日 / 3泊",
      ko: "4일 / 3박",
      es: "4 días / 3 noches"
    },
    highlights: {
      ja: ["開会式の熱気", "伝統料理の試食", "市外への日帰り"],
      ko: ["개막식의 에너지", "전통 음식 시식", "도시 밖 당일 여행"],
      es: ["Energía de la ceremonia de apertura", "Degustación de comida tradicional", "Excursión fuera de la ciudad"]
    },
    included: {
      ja: ["空港送迎", "3泊の宿泊", "祭り会場への移動", "一部食事", "現地ホストの案内"],
      ko: ["공항 이동", "3박 숙박", "축제장 이동", "일부 식사", "현지 호스트 안내"],
      es: ["Traslados al aeropuerto", "3 noches de alojamiento", "Transporte a los recintos del festival", "Algunas comidas", "Acompañamiento local"]
    },
    excluded: {
      ja: ["国際線", "個人的な買い物", "旅行保険"],
      ko: ["국제선 항공", "개인 구매", "여행 보험"],
      es: ["Vuelos internacionales", "Compras personales", "Seguro de viaje"]
    },
    itinerary: {
      1: {
        title: {
          ja: "到着と夏の都市のリズム",
          ko: "도착과 여름 도시의 리듬",
          es: "Llegada y ritmo veraniego de la ciudad"
        },
        description: {
          ja: "ウランバートルで合流し、落ち着いた後、街がナーダムに向けて整う主要な空間を歩きます。",
          ko: "울란바토르에서 만나 여장을 푼 뒤, 도시가 나담을 준비하는 주요 공간을 걸어봅니다.",
          es: "Encuentro en Ulán Bator, tiempo para instalarse y paseo por los espacios principales mientras la ciudad se prepara para el Naadam."
        }
      },
      2: {
        title: {
          ja: "式典と祭り会場",
          ko: "의식과 축제장",
          es: "Ceremonia y recintos del festival"
        },
        description: {
          ja: "祭りの中心的な雰囲気、食事の立ち寄り、そして見ているものの背景説明を受けながら一日を過ごします。",
          ko: "축제의 중심적인 분위기 속에서 음식도 즐기고, 보고 있는 장면에 대한 설명도 들으며 하루를 보냅니다.",
          es: "Pasa el día con el ambiente principal del festival, paradas gastronómicas y explicaciones sobre lo que estás viendo."
        }
      },
      3: {
        title: {
          ja: "近郊の草原へ",
          ko: "도시 근교 초원으로",
          es: "Salida a la estepa cercana"
        },
        description: {
          ja: "都市を少し離れ、より静かな空間、オープンな風景、地元のもてなしを体験します。",
          ko: "도시를 잠시 벗어나 더 조용한 공간과 열린 풍경, 현지의 환대를 경험합니다.",
          es: "Salida más allá de la ciudad para vivir un entorno más tranquilo, paisajes abiertos y hospitalidad local."
        }
      },
      4: {
        title: {
          ja: "ゆっくり出発",
          ko: "여유로운 출발",
          es: "Salida tranquila"
        },
        description: {
          ja: "最後の朝は余裕を持って過ごし、その後空港または市内へ移動します。",
          ko: "마지막 아침은 여유롭게 보내고 이후 공항이나 시내로 이동합니다.",
          es: "Mañana tranquila antes del traslado al aeropuerto o a la ciudad."
        }
      }
    }
  },
  "tour-arkhangai": {
    title: {
      ja: "アルハンガイ・アドベンチャー",
      ko: "아르항가이 어드벤처",
      es: "Aventura en Arkhangai"
    },
    intro: {
      ja: "中央モンゴルの谷、温泉、火山地形、ゆっくりした移動リズムをめぐる旅です。",
      ko: "몽골 중부의 계곡, 온천, 화산 지형, 느린 이동 리듬을 따라가는 여행입니다.",
      es: "Un viaje por los valles, las aguas termales, los paisajes volcánicos y el ritmo pausado del centro de Mongolia."
    },
    destination: {
      ja: "アルハンガイ県",
      ko: "아르항가이 주",
      es: "Provincia de Arkhangai"
    },
    durationLabel: {
      ja: "5日 / 4泊",
      ko: "5일 / 4박",
      es: "5 días / 4 noches"
    },
    highlights: {
      ja: ["渓谷と火山の景観", "温泉での休息", "草原の道中風景"],
      ko: ["계곡과 화산 풍경", "온천 휴식", "초원 도로의 풍경"],
      es: ["Paisajes de valle y volcán", "Descanso en aguas termales", "Trayectos por la estepa"]
    },
    included: {
      ja: ["4泊の宿泊", "専用移動", "朝食・昼食・夕食の大半", "現地ガイド", "国立公園入場"],
      ko: ["4박 숙박", "전용 이동", "대부분의 식사", "현지 가이드", "국립공원 입장"],
      es: ["4 noches de alojamiento", "Traslados privados", "La mayoría de las comidas", "Guía local", "Ingreso al parque nacional"]
    },
    excluded: {
      ja: ["国際線", "アルコール飲料", "旅行保険"],
      ko: ["국제선 항공", "주류", "여행 보험"],
      es: ["Vuelos internacionales", "Bebidas alcohólicas", "Seguro de viaje"]
    },
    itinerary: {
      1: {
        title: {
          ja: "アルハンガイへ出発",
          ko: "아르항가이로 이동",
          es: "Salida hacia Arkhangai"
        },
        description: {
          ja: "ウランバートルを出発し、中央モンゴルの景色を見ながら西へ向かいます。",
          ko: "울란바토르를 출발해 중앙 몽골의 풍경을 보며 서쪽으로 이동합니다.",
          es: "Salida desde Ulán Bator hacia el oeste atravesando los paisajes del centro de Mongolia."
        }
      },
      2: {
        title: {
          ja: "渓谷と温泉",
          ko: "계곡과 온천",
          es: "Valle y aguas termales"
        },
        description: {
          ja: "ゆったりしたペースで渓谷地帯を巡り、その後温泉で休みます。",
          ko: "느린 템포로 계곡 지대를 둘러본 뒤 온천에서 휴식합니다.",
          es: "Recorrido relajado por la zona del valle y descanso posterior en aguas termales."
        }
      },
      3: {
        title: {
          ja: "火山景観を歩く",
          ko: "화산 지형 산책",
          es: "Caminar entre paisajes volcánicos"
        },
        description: {
          ja: "特徴的な火山地形を歩き、周辺の草原風景を静かに楽しみます。",
          ko: "독특한 화산 지형을 걷고 주변 초원의 풍경을 차분히 즐깁니다.",
          es: "Caminata entre formaciones volcánicas singulares y tiempo para disfrutar del paisaje abierto."
        }
      },
      4: {
        title: {
          ja: "地域の暮らしに触れる一日",
          ko: "지역의 생활을 만나는 하루",
          es: "Un día para el ritmo local"
        },
        description: {
          ja: "移動を抑え、周辺の暮らしや風景をゆっくり感じる日です。",
          ko: "이동을 줄이고 주변의 생활과 풍경을 여유롭게 느끼는 날입니다.",
          es: "Un día con menos traslados para sentir el ritmo local y el entorno con calma."
        }
      },
      5: {
        title: {
          ja: "ウランバートルへ戻る",
          ko: "울란바토르로 귀환",
          es: "Regreso a Ulán Bator"
        },
        description: {
          ja: "中央モンゴルの道を戻り、市内へ帰着します。",
          ko: "중앙 몽골의 길을 따라 다시 도시로 돌아옵니다.",
          es: "Regreso por carretera a la capital al final del viaje."
        }
      }
    }
  },
  "tour-khuvsgul": {
    title: {
      ja: "フブスグル湖エスケープ",
      ko: "홉스골 호수 이스케이프",
      es: "Escapada al lago Khuvsgul"
    },
    intro: {
      ja: "北モンゴルの湖水地方、森の空気、静かな時間を味わう、すっきりした旅です。",
      ko: "몽골 북부의 호수 지역, 숲의 공기, 조용한 시간을 느끼는 담백한 여행입니다.",
      es: "Un viaje sereno para descubrir la región lacustre del norte de Mongolia, el aire del bosque y el ritmo tranquilo del lago."
    },
    destination: {
      ja: "フブスグル湖",
      ko: "홉스골 호수",
      es: "Lago Khuvsgul"
    },
    durationLabel: {
      ja: "5日 / 4泊",
      ko: "5일 / 4박",
      es: "5 días / 4 noches"
    },
    highlights: {
      ja: ["湖畔の滞在", "北方の森林風景", "静かな移動のリズム"],
      ko: ["호숫가 체류", "북부 산림 풍경", "조용한 이동 리듬"],
      es: ["Estadía junto al lago", "Paisajes forestales del norte", "Ritmo de viaje tranquilo"]
    },
    included: {
      ja: ["4泊の宿泊", "地域内の移動", "大半の食事", "ガイド同行", "湖周辺のアクティビティ"],
      ko: ["4박 숙박", "지역 내 이동", "대부분의 식사", "가이드 동행", "호수 주변 활동"],
      es: ["4 noches de alojamiento", "Traslados en la zona", "La mayoría de las comidas", "Acompañamiento de guía", "Actividades junto al lago"]
    },
    excluded: {
      ja: ["国際線", "個人費用", "旅行保険"],
      ko: ["국제선 항공", "개인 경비", "여행 보험"],
      es: ["Vuelos internacionales", "Gastos personales", "Seguro de viaje"]
    },
    itinerary: {
      1: {
        title: {
          ja: "北へ移動",
          ko: "북쪽으로 이동",
          es: "Viaje hacia el norte"
        },
        description: {
          ja: "北部へ向かい、湖水地方のより静かな風景へ移っていきます。",
          ko: "북부로 이동하며 호수 지역의 더 조용한 풍경으로 들어갑니다.",
          es: "Traslado hacia el norte para entrar en un paisaje más sereno y lacustre."
        }
      },
      2: {
        title: {
          ja: "湖畔で一日を過ごす",
          ko: "호숫가에서 하루 보내기",
          es: "Un día junto al lago"
        },
        description: {
          ja: "水辺の空気、森の縁、そしてゆっくりした時間を楽しみます。",
          ko: "물가의 공기와 숲 가장자리, 그리고 느린 시간을 즐깁니다.",
          es: "Tiempo para disfrutar del ambiente del agua, el borde del bosque y un ritmo pausado."
        }
      },
      3: {
        title: {
          ja: "北方の風景をたどる",
          ko: "북부 풍경 따라가기",
          es: "Seguir el paisaje del norte"
        },
        description: {
          ja: "小さな立ち寄りを重ねながら、湖周辺の景色と地域の暮らしを見ていきます。",
          ko: "작은 정차를 이어가며 호수 주변의 풍경과 지역의 생활을 살펴봅니다.",
          es: "Pequeñas paradas para observar el paisaje del lago y la vida local en sus alrededores."
        }
      },
      4: {
        title: {
          ja: "静かな自由時間",
          ko: "조용한 자유 시간",
          es: "Tiempo libre tranquilo"
        },
        description: {
          ja: "湖畔で休んだり歩いたりしながら、自分のペースで過ごす日です。",
          ko: "호숫가에서 쉬거나 걷거나 하며 자신의 속도로 보내는 날입니다.",
          es: "Un día para descansar, caminar y disfrutar del lago a tu propio ritmo."
        }
      },
      5: {
        title: {
          ja: "出発の準備",
          ko: "출발 준비",
          es: "Preparación para la salida"
        },
        description: {
          ja: "朝の湖を最後に味わってから、次の移動へ向けて出発します。",
          ko: "아침의 호수를 마지막으로 느낀 뒤 다음 이동을 위해 출발합니다.",
          es: "Últimas vistas del lago por la mañana antes de partir hacia el siguiente tramo del viaje."
        }
      }
    }
  }
};

function translateSite(site) {
  return {
    ...site,
    home: {
      ...site.home,
      eyebrow: mergeLocalizedValue(site.home.eyebrow, SITE_TRANSLATIONS.home.eyebrow),
      heroTitle: mergeLocalizedValue(site.home.heroTitle, SITE_TRANSLATIONS.home.heroTitle),
      heroSubtitle: mergeLocalizedValue(site.home.heroSubtitle, SITE_TRANSLATIONS.home.heroSubtitle),
      sectionIntro: mergeLocalizedValue(site.home.sectionIntro, SITE_TRANSLATIONS.home.sectionIntro),
      storyTitle: mergeLocalizedValue(site.home.storyTitle, SITE_TRANSLATIONS.home.storyTitle),
      storyBody: mergeLocalizedValue(site.home.storyBody, SITE_TRANSLATIONS.home.storyBody)
    },
    about: {
      ...site.about,
      title: mergeLocalizedValue(site.about.title, SITE_TRANSLATIONS.about.title),
      intro: mergeLocalizedValue(site.about.intro, SITE_TRANSLATIONS.about.intro),
      approachTitle: mergeLocalizedValue(site.about.approachTitle, SITE_TRANSLATIONS.about.approachTitle),
      approachBody: mergeLocalizedValue(site.about.approachBody, SITE_TRANSLATIONS.about.approachBody)
    },
    contactPage: {
      ...site.contactPage,
      title: mergeLocalizedValue(site.contactPage.title, SITE_TRANSLATIONS.contactPage.title),
      body: mergeLocalizedValue(site.contactPage.body, SITE_TRANSLATIONS.contactPage.body)
    },
    faqIntro: mergeLocalizedValue(site.faqIntro, SITE_TRANSLATIONS.faqIntro),
    faqs: site.faqs.map((item) => ({
      ...item,
      question: mergeLocalizedValue(item.question, SITE_TRANSLATIONS.faqs[item.id]?.question),
      answer: mergeLocalizedValue(item.answer, SITE_TRANSLATIONS.faqs[item.id]?.answer)
    }))
  };
}

function translateGuide(guide) {
  const translations = GUIDE_TRANSLATIONS[guide.id];

  if (!translations) {
    return guide;
  }

  return {
    ...guide,
    role: mergeLocalizedValue(guide.role, translations.role),
    bio: mergeLocalizedValue(guide.bio, translations.bio)
  };
}

function translateTour(tour) {
  const translations = TOUR_TRANSLATIONS[tour.id];

  if (!translations) {
    return tour;
  }

  return {
    ...tour,
    title: mergeLocalizedValue(tour.title, translations.title),
    intro: mergeLocalizedValue(tour.intro, translations.intro),
    destination: mergeLocalizedValue(tour.destination, translations.destination),
    durationLabel: mergeLocalizedValue(tour.durationLabel, translations.durationLabel),
    highlights: mergeLocalizedValue(tour.highlights, translations.highlights),
    included: mergeLocalizedValue(tour.included, translations.included),
    excluded: mergeLocalizedValue(tour.excluded, translations.excluded),
    itinerary: tour.itinerary.map((item) => ({
      ...item,
      title: mergeLocalizedValue(item.title, translations.itinerary[item.day]?.title),
      description: mergeLocalizedValue(item.description, translations.itinerary[item.day]?.description)
    }))
  };
}

export function applyContentTranslations(snapshot) {
  if (!snapshot) {
    return snapshot;
  }

  return {
    ...snapshot,
    site: translateSite(snapshot.site),
    guides: (snapshot.guides || []).map(translateGuide),
    tours: (snapshot.tours || []).map(translateTour)
  };
}

export function applyTourTranslations(tour) {
  if (!tour) {
    return tour;
  }

  return translateTour(tour);
}
