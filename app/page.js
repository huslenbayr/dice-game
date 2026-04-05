import { HomeLandingPage } from "@/components/home-landing-page";
import { getCurrentLanguage, localize } from "@/lib/i18n";

export default async function HomePage() {
  const language = await getCurrentLanguage();

  const copy = {
    cta: localize(
      {
        en: "Enter MongolWay",
        mn: "MongolWay руу нэвтрэх",
        ja: "MongolWayへ入る",
        ko: "MongolWay로 들어가기",
        es: "Entrar en MongolWay"
      },
      language
    ),
    scroll: localize(
      {
        en: "Scroll",
        mn: "Доош",
        ja: "スクロール",
        ko: "스크롤",
        es: "Desliza"
      },
      language
    ),
    introLabel: localize(
      {
        en: "Curated Presence",
        mn: "Нягт мэдрэмж",
        ja: "厳選された存在感",
        ko: "정제된 존재감",
        es: "Presencia curada"
      },
      language
    ),
    introTitle: localize(
      {
        en: "Quiet luxury with a cinematic point of view.",
        mn: "Кино мэт мэдрэмжтэй, намуухан тансаг хэмнэл.",
        ja: "映画のような視点で描く、静かなラグジュアリー。",
        ko: "시네마틱한 시선으로 풀어낸 조용한 럭셔리.",
        es: "Lujo sereno con una mirada cinematografica."
      },
      language
    ),
    introBody: localize(
      {
        en: "Every touchpoint is shaped to feel calm, elevated, and exact. Less noise, better pacing, and a stronger sense of atmosphere from the first impression onward.",
        mn: "Анхны сэтгэгдлээс эхлээд бүх цэг тайван, дэгтэй, нягт мэдрэмж төрүүлэхээр бүтээгдсэн. Илүү цэвэр хэмнэл, илүү зөв уур амьсгал.",
        ja: "最初の印象から先まで、すべての接点が静かで洗練され、正確に感じられるように設計されています。ノイズを減らし、空気感を高めています。",
        ko: "첫 인상부터 모든 접점이 차분하고 세련되며 정확하게 느껴지도록 설계되었습니다. 불필요한 소음을 덜고 분위기를 더했습니다.",
        es: "Cada punto de contacto esta pensado para sentirse sereno, elevado y preciso. Menos ruido, mejor ritmo y una atmosfera mas definida desde el primer momento."
      },
      language
    ),
    cards: [
      {
        title: localize(
          {
            en: "Editorial rhythm",
            mn: "Редакцийн хэмнэл",
            ja: "エディトリアルなリズム",
            ko: "에디토리얼 리듬",
            es: "Ritmo editorial"
          },
          language
        ),
        body: localize(
          {
            en: "A visual language built around restraint, clarity, and presence rather than clutter.",
            mn: "Илүүдэлгүй, тодорхой, мэдрэмжтэй харааны хэллэг.",
            ja: "過剰さではなく、抑制と明快さ、存在感に軸を置いたビジュアル言語。",
            ko: "과한 장식보다 절제, 선명함, 존재감에 초점을 맞춘 비주얼 언어.",
            es: "Un lenguaje visual construido desde la contencion, la claridad y la presencia."
          },
          language
        )
      },
      {
        title: localize(
          {
            en: "Private coordination",
            mn: "Хувийн зохион байгуулалт",
            ja: "プライベートな調整",
            ko: "프라이빗 코디네이션",
            es: "Coordinacion privada"
          },
          language
        ),
        body: localize(
          {
            en: "Clean planning, responsive communication, and support that feels polished without becoming loud.",
            mn: "Цэвэр төлөвлөлт, хурдан харилцаа, илүү чимээгүй хэрнээ нягт дэмжлэг.",
            ja: "明快な設計、応答性の高いコミュニケーション、そして静かに整ったサポート。",
            ko: "깔끔한 플래닝, 빠른 소통, 과하지 않지만 정제된 지원.",
            es: "Planificacion limpia, comunicacion agil y soporte pulido sin exceso."
          },
          language
        )
      },
      {
        title: localize(
          {
            en: "Refined stays",
            mn: "Нягт сонгосон орчин",
            ja: "洗練された滞在",
            ko: "정제된 스테이",
            es: "Estancias refinadas"
          },
          language
        ),
        body: localize(
          {
            en: "Routes, stays, and moments selected to feel intentional, intimate, and quietly memorable.",
            mn: "Зорилготой, дотно, чимээгүй мөртлөө мартагдахгүй мэдрэмж төрүүлэхээр сонгосон замнал ба орчин.",
            ja: "意図と親密さを感じられ、静かに記憶に残るルートと滞在、瞬間。",
            ko: "의도적이고 친밀하며 조용히 오래 남는 루트와 스테이, 그리고 순간들.",
            es: "Rutas, estancias y momentos elegidos para sentirse intencionales, intimos y memorables."
          },
          language
        )
      }
    ],
    signatureLabel: localize(
      {
        en: "Signature",
        mn: "Онцлог өнгө",
        ja: "シグネチャー",
        ko: "시그니처",
        es: "Firma"
      },
      language
    ),
    signatureTitle: localize(
      {
        en: "Designed to feel composed before it feels loud.",
        mn: "Чимээтэй харагдахаас илүү, эмхтэй мэдрэгдэхээр бүтээгдсэн.",
        ja: "派手に見せる前に、整って感じられるように設計されています。",
        ko: "강하게 보이기보다 먼저 정제되어 느껴지도록 설계되었습니다.",
        es: "Pensado para sentirse sereno antes que ruidoso."
      },
      language
    ),
    signatureBody: localize(
      {
        en: "This landing experience is built around atmosphere, movement, and editorial restraint. The goal is confidence without excess and detail without visual fatigue.",
        mn: "Энэ нүүр хуудас нь уур амьсгал, хөдөлгөөн, редакцийн хэв шинж дээр тулгуурласан. Илүүдэлгүй итгэл, ядраахгүй деталь.",
        ja: "このランディング体験は、空気感、動き、そしてエディトリアルな抑制を軸に構成されています。過剰ではない自信と、疲れないディテールが目的です。",
        ko: "이 랜딩 경험은 분위기, 움직임, 에디토리얼한 절제를 중심으로 구성되었습니다. 과하지 않은 자신감과 피로하지 않은 디테일이 핵심입니다.",
        es: "Esta experiencia se construye desde la atmosfera, el movimiento y la contencion editorial. La meta es transmitir confianza sin exceso y detalle sin fatiga visual."
      },
      language
    ),
    signaturePoints: [
      {
        title: localize(
          {
            en: "System-aware theme",
            mn: "Систем дагасан theme",
            ja: "システム連動テーマ",
            ko: "시스템 기반 테마",
            es: "Tema segun el sistema"
          },
          language
        ),
        body: localize(
          {
            en: "Dark and light modes open according to the viewer's own preference from the first frame.",
            mn: "Анхны ачааллаас эхлэн dark, light горим үзэгчийн өөрийн тохиргоог дагана.",
            ja: "最初の表示から、ダークとライトは閲覧者の環境設定に合わせて開きます。",
            ko: "첫 프레임부터 다크와 라이트가 사용자의 시스템 설정을 따릅니다.",
            es: "Los modos oscuro y claro se abren segun la preferencia del usuario desde el primer instante."
          },
          language
        )
      },
      {
        title: localize(
          {
            en: "Smooth motion",
            mn: "Зөөлөн motion",
            ja: "なめらかな動き",
            ko: "부드러운 모션",
            es: "Movimiento fluido"
          },
          language
        ),
        body: localize(
          {
            en: "The video, type, and content shift with a measured pace that keeps the page feeling premium.",
            mn: "Видео, typography, контент нь premium мэдрэмж алдахгүй хэмнэлээр хөдөлнө.",
            ja: "映像、タイポグラフィ、コンテンツが上質さを保つ速度で穏やかに動きます。",
            ko: "비디오, 타이포그래피, 콘텐츠가 프리미엄한 감각을 유지하는 속도로 움직입니다.",
            es: "El video, la tipografia y el contenido se mueven con un ritmo medido y sofisticado."
          },
          language
        )
      },
      {
        title: localize(
          {
            en: "Refined interaction",
            mn: "Нягт interaction",
            ja: "洗練された操作感",
            ko: "정제된 인터랙션",
            es: "Interaccion refinada"
          },
          language
        ),
        body: localize(
          {
            en: "A large custom cursor and subtle hover states add presence without overpowering the content.",
            mn: "Том custom cursor болон зөөлөн hover эффектүүд нь контентыг дарахгүйгээр илүү presence нэмнэ.",
            ja: "大きなカスタムカーソルと控えめなホバー表現が、内容を邪魔せず存在感を加えます。",
            ko: "큰 커스텀 커서와 절제된 호버 효과가 콘텐츠를 방해하지 않으면서 존재감을 더합니다.",
            es: "Un cursor personalizado amplio y hovers sutiles aportan presencia sin dominar el contenido."
          },
          language
        )
      }
    ],
    quote: localize(
      {
        en: "A landing page that feels like an opening frame rather than a brochure.",
        mn: "Танилцуулгаас илүү, эхний кадр шиг мэдрэгдэх нүүр хуудас.",
        ja: "パンフレットではなく、オープニングフレームのように感じられるランディングページ。",
        ko: "브로슈어가 아니라 오프닝 프레임처럼 느껴지는 랜딩 페이지.",
        es: "Una landing page que se siente como un fotograma de apertura, no como un folleto."
      },
      language
    ),
    closingLabel: localize(
      {
        en: "Next",
        mn: "Дараагийн алхам",
        ja: "次へ",
        ko: "다음",
        es: "Siguiente"
      },
      language
    ),
    closingTitle: localize(
      {
        en: "Step into the full collection.",
        mn: "Бүтэн цуглуулга руу ор.",
        ja: "コレクション全体へ進む。",
        ko: "전체 컬렉션으로 들어가세요.",
        es: "Entra en la coleccion completa."
      },
      language
    ),
    closingBody: localize(
      {
        en: "Move from the cinematic first impression into the complete routes, contact flow, and account experience.",
        mn: "Кино мэт эхний сэтгэгдлээсээ цааш бүтэн маршрут, холбоо барих урсгал, бүртгэлийн орчин руу шилжинэ.",
        ja: "シネマティックな第一印象から、完全なルート、問い合わせ導線、アカウント体験へ進めます。",
        ko: "시네마틱한 첫 인상에서 전체 루트, 문의 흐름, 계정 경험으로 이어집니다.",
        es: "Pasa de esta primera impresion cinematografica a las rutas completas, el contacto y la experiencia de cuenta."
      },
      language
    ),
    secondaryLink: localize(
      {
        en: "Explore the routes",
        mn: "Маршрутуудыг үзэх",
        ja: "ルートを見る",
        ko: "루트 보기",
        es: "Explorar rutas"
      },
      language
    ),
    contactLink: localize(
      {
        en: "Contact the studio",
        mn: "Холбогдох",
        ja: "コンタクト",
        ko: "문의하기",
        es: "Contactar"
      },
      language
    )
  };

  return <HomeLandingPage copy={copy} />;
}
