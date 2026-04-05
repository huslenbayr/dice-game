export const UI_LOCALES = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      tours: "Tours",
      booking: "Booking",
      contact: "Contact",
      faq: "FAQ",
      admin: "Admin",
      signIn: "Sign in",
      account: "Account"
    },
    common: {
      language: "Language",
      contact: "Contact",
      exploreTours: "Explore tours",
      startBooking: "Book now",
      viewDetails: "View details",
      included: "Included",
      excluded: "Excluded",
      itinerary: "Itinerary",
      dates: "Dates",
      guides: "Guides",
      from: "From",
      perPerson: "per person",
      bookingSummary: "Booking summary",
      paymentSummary: "Payment status",
      paymentMethod: "Payment method",
      paymentReady: "Prepare QPay flow",
      saveChanges: "Save changes",
      delete: "Delete",
      addTour: "Add tour",
      updateStatus: "Update status",
      contactPerson: "Main contact",
      comingSoon: "Coming soon",
      signOut: "Sign out",
      status: "Status",
      source: "Source",
      created: "Created",
      payment: "Payment",
      office: "Address",
      accountArea: "Account area",
      recommended: "Recommended",
      active: "Active",
      planned: "Planned",
      backHome: "Back home",
      dayLabel: "Day {day}",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      switchToLightMode: "Switch to light mode",
      switchToDarkMode: "Switch to dark mode"
    },
    home: {
      featuredJourneys: "Featured journeys",
      whyTitle: "Thoughtful routes, modern presentation, and room for local detail",
      whyBody:
        "The layout and content are designed to feel open, contemporary, and grounded in Mongolia without overstating the brand.",
      emailCaptureTitle: "Get more travel details",
      emailCaptureBody:
        "Leave your email and we'll send you more detailed information about our journeys, travel updates, and offers.",
      emailCapturePlaceholder: "Your email address",
      emailCaptureSubmit: "Send details",
      emailCaptureSuccess: "Thanks. We'll keep your email for future travel details and updates.",
      emailCaptureError: "We couldn't save your email just now. Please try again.",
      emailCaptureRequired: "Please enter your email address.",
      emailCaptureInvalid: "Please enter a valid email address."
    },
    about: {
      pageLabel: "About MongolWay",
      guidesTitle: "People connected to each journey",
      guidesBody: "Guide names remain easy to change from the admin dashboard.",
      fallbackGuideRole: "Journey companion",
      fallbackGuideBio: "Connected to one of the current MongolWay tour routes."
    },
    tours: {
      pageLabel: "Tours",
      body: "Browse the first three sample journeys and move directly into booking.",
      gallery: "Gallery",
      notFoundTitle: "Tour not found",
      notFoundBody: "This journey is not available in the current MongolWay demo."
    },
    booking: {
      pageLabel: "Booking",
      formTitle: "Plan your booking",
      formBody: "Choose a departure, number of people, and traveler details before confirming.",
      signedInHint: "Signed in details can be used as the starting point for your booking.",
      savedMessage: "Booking saved successfully.",
      errorMessage: "Booking failed.",
      fields: {
        tour: "Tour",
        date: "Date",
        people: "People",
        name: "Full name",
        email: "Email",
        phone: "Phone",
        nationality: "Nationality",
        specialRequest: "Special request"
      },
      confirm: "Confirm booking"
    },
    payment: {
      pageLabel: "Payment",
      title: "Checkout options",
      body:
        "Choose the payment path that fits the traveler context. PayPal is primary for international guests, QPay stays ready for local QR and deep-link flows, and manual card checkout remains available as a fallback.",
      reference: "Reference",
      methodsTitle: "Available methods",
      cardFields: {
        cardholderName: "Cardholder name",
        cardNumber: "Card number",
        expiryMonth: "Expiry month",
        expiryYear: "Expiry year",
        cvc: "CVC"
      },
      paypalSubmit: "Continue with PayPal",
      cardSubmit: "Pay by card",
      qpaySubmit: "Prepare QPay",
      applePayNote: "Apple Pay can be enabled later if the connected card gateway supports it.",
      deepLink: "Deep link",
      checkoutLink: "Checkout link",
      promoTitle: "Promotion code",
      promoCodeLabel: "Promotion code",
      promoCodePlaceholder: "Enter a code",
      promoHint: "If the code is valid, the checkout amount drops to $0.01 on the server before the payment session is created.",
      promoApplied: "Promo applied",
      promoOriginalAmount: "Original amount",
      promoDiscountAmount: "Promo discount",
      promoFinalAmount: "Payable amount",
      localHint: "This booking looks local, so QPay is shown first.",
      internationalHint: "This booking looks international, so PayPal is shown first.",
      paypalResultTitle: "PayPal checkout",
      cardResultTitle: "Card checkout result",
      qpayResultTitle: "QPay checkout",
      paypalSuccess: "PayPal payment completed successfully.",
      paypalPending: "The PayPal checkout is still waiting for final confirmation.",
      paypalCancelled: "The PayPal checkout was cancelled before capture.",
      paypalFailed: "PayPal could not confirm this payment.",
      cardSuccess: "Card payment completed successfully.",
      cardFailed: "Card payment returned a failed state.",
      qpayPrepared: "Prepared the QPay checkout flow.",
      paypalOpenCheckout: "Open PayPal checkout",
      paypalRedirectMissing: "PayPal did not return a checkout link for this booking.",
      paypalPanelNote:
        "PayPal creates a hosted approval step and then returns the traveler to MongolWay. The payment session is updated on the server when the traveler comes back.",
      qpayPanelNote:
        "The QPay option creates a QR and deep-link ready session first. Real callback confirmation can be added later at the gateway layer.",
      paypalPanelPlaceholder:
        "This panel will show the PayPal approval state, checkout link, and the final capture status after the traveler returns.",
      cardPanelPlaceholder:
        "This panel will show the card checkout result, session reference, and future Apple Pay capability notes.",
      qpayPanelPlaceholder:
        "This panel will later hold the QPay QR, deep link, and callback-driven confirmation state.",
      errorMessage: "Unable to prepare payment."
    },
    contact: {
      pageLabel: "Contact",
      sendMessage: "Send a message",
      fields: {
        phone: "Phone",
        email: "Email",
        office: "Office location"
      }
    },
    faq: {
      pageLabel: "FAQ"
    },
    auth: {
      pageLabel: "Sign in",
      title: "Access your MongolWay account",
      body:
        "Traveler accounts can manage booking-related details, while admin access is only available for authorized users.",
      providersTitle: "Sign-in architecture",
      providersBody: "Use email and password or continue with any configured identity provider.",
      continueWithGoogle: "Continue with Google",
      orContinueWithEmail: "Or continue with email",
      signInTab: "Sign in",
      registerTab: "Create account",
      signInTitle: "Welcome back",
      signInBody: "Use your email and password to continue to the right area for your role.",
      registerTitle: "Create a traveler account",
      registerBody: "Public registration creates a regular traveler account. Admin access is managed separately.",
      submitSignIn: "Sign in",
      submitRegister: "Create account",
      successMessage: "Signed in successfully.",
      errorMessage: "Unable to continue.",
      oauthErrorMessage: "That sign-in option couldn't be completed. Please try again or use email and password.",
      oauthUnavailableMessage: "That sign-in option is not available yet. Finish the provider setup and try again.",
      fields: {
        fullName: "Full name",
        email: "Email",
        phone: "Phone",
        nationality: "Nationality",
        password: "Password"
      }
    },
    account: {
      pageLabel: "Account",
      title: "Your bookings and profile",
      body: "Review your traveler details, recent bookings, and payment status from one place.",
      profileTitle: "Profile",
      bookingsTitle: "Bookings",
      noBookings: "No bookings yet. When you submit one, it will appear here.",
      bookAnother: "Book another journey",
      managePayment: "Open payment page"
    },
    footer: {
      contactTitle: "Contact",
      languageTitle: "English / Монгол / 日本語 / 한국어 / Español",
      socialTitle: "Social"
    },
    admin: {
      pageLabel: "Admin Dashboard",
      pageBody:
        "Manage sample tours, multilingual content, contact details, bookings, and payment placeholder states from one place.",
      toursTitle: "Manage tours",
      bookingsTitle: "Manage bookings",
      leadsTitle: "Collected email leads",
      leadsBody: "Homepage email captures appear here so the team can follow up later.",
      leadsEmpty: "No email leads yet.",
      siteTitle: "Site content and contact details",
      contactTitle: "Contact information",
      contentTitle: "Homepage and about content",
      guidesHint: "Edit guide names as a comma-separated list."
    },
    notFound: {
      title: "Page not found",
      body: "The page you asked for is not available in this MongolWay build."
    }
  },
  mn: {
    nav: {
      home: "Нүүр",
      about: "Тухай",
      tours: "Аяллууд",
      booking: "Захиалга",
      contact: "Холбоо барих",
      faq: "Түгээмэл асуулт",
      admin: "Админ",
      signIn: "Нэвтрэх",
      account: "Бүртгэл"
    },
    common: {
      language: "Хэл",
      contact: "Холбоо барих",
      exploreTours: "Аяллуудыг үзэх",
      startBooking: "Захиалах",
      viewDetails: "Дэлгэрэнгүй",
      included: "Багтсан",
      excluded: "Багтаагүй",
      itinerary: "Хөтөлбөр",
      dates: "Огноо",
      guides: "Хөтөч нар",
      from: "Эхлэх үнэ",
      perPerson: "хүнээс",
      bookingSummary: "Захиалгын тойм",
      paymentSummary: "Төлбөрийн төлөв",
      paymentMethod: "Төлбөрийн арга",
      paymentReady: "QPay урсгал бэлтгэх",
      saveChanges: "Хадгалах",
      delete: "Устгах",
      addTour: "Аялал нэмэх",
      updateStatus: "Төлөв шинэчлэх",
      contactPerson: "Гол холбоо барих хүн",
      comingSoon: "Удалгүй",
      signOut: "Гарах",
      status: "Төлөв",
      source: "Эх сурвалж",
      created: "Үүссэн",
      payment: "Төлбөр",
      office: "Хаяг",
      accountArea: "Бүртгэлийн хэсэг",
      recommended: "Санал болгосон",
      active: "Идэвхтэй",
      planned: "Бэлтгэсэн",
      backHome: "Нүүр рүү буцах",
      dayLabel: "{day} дахь өдөр",
      openMenu: "Цэс нээх",
      closeMenu: "Цэс хаах",
      switchToLightMode: "Цайвар горим руу шилжих",
      switchToDarkMode: "Харанхуй горим руу шилжих"
    },
    home: {
      featuredJourneys: "Онцлох аяллууд",
      whyTitle: "Бодлоготой маршрут, орчин үеийн төрх, орон нутгийн мэдрэмж",
      whyBody:
        "Загвар ба агуулга нь Монголын өнгө аясыг хэтрүүлэхгүйгээр орон зайтай, цэгцтэй, орчин үеийн байхаар бүтээгдсэн.",
      emailCaptureTitle: "Аяллын дэлгэрэнгүй мэдээлэл аваарай",
      emailCaptureBody:
        "Имэйлээ үлдээгээрэй. Бид аяллын дэлгэрэнгүй мэдээлэл, шинэчлэл, саналын мэдээллийг дараа илгээх боломжтой.",
      emailCapturePlaceholder: "Таны имэйл хаяг",
      emailCaptureSubmit: "Мэдээлэл авах",
      emailCaptureSuccess: "Баярлалаа. Таны имэйлийг дараагийн аяллын мэдээлэл, шинэчлэлд хадгаллаа.",
      emailCaptureError: "Таны имэйлийг яг одоо хадгалж чадсангүй. Дахин оролдоно уу.",
      emailCaptureRequired: "Имэйл хаягаа оруулна уу.",
      emailCaptureInvalid: "Зөв имэйл хаяг оруулна уу."
    },
    about: {
      pageLabel: "MongolWay-ийн тухай",
      guidesTitle: "Аялал бүртэй холбоотой хүмүүс",
      guidesBody: "Хөтөчийн нэрсийг админ хэсгээс хялбар өөрчилж болно.",
      fallbackGuideRole: "Аяллын хамтрагч",
      fallbackGuideBio: "Одоогийн MongolWay аяллын нэг чиглэлтэй холбоотой хүн."
    },
    tours: {
      pageLabel: "Аяллууд",
      body: "Эхний гурван жишиг аяллыг үзээд шууд захиалгад орно уу.",
      gallery: "Зургийн сан",
      notFoundTitle: "Аялал олдсонгүй",
      notFoundBody: "Энэ аялал одоогийн MongolWay демод байхгүй байна."
    },
    booking: {
      pageLabel: "Захиалга",
      formTitle: "Захиалгаа төлөвлөх",
      formBody: "Огноо, хүний тоо, аялагчийн мэдээллээ оруулаад захиалгаа баталгаажуулна.",
      signedInHint: "Нэвтэрсэн хэрэглэгчийн мэдээллийг захиалгын эхлэл болгож ашиглаж болно.",
      savedMessage: "Захиалга амжилттай хадгалагдлаа.",
      errorMessage: "Захиалга амжилтгүй боллоо.",
      fields: {
        tour: "Аялал",
        date: "Огноо",
        people: "Хүний тоо",
        name: "Овог нэр",
        email: "Имэйл",
        phone: "Утас",
        nationality: "Иргэншил",
        specialRequest: "Тусгай хүсэлт"
      },
      confirm: "Захиалга илгээх"
    },
    payment: {
      pageLabel: "Төлбөр",
      title: "Checkout сонголтууд",
      body:
        "Аялагчийн нөхцөлд тохирох төлбөрийн замыг сонгоно. Гадаад зочдод PayPal үндсэн, дотоод хэрэглэгчдэд QPay-ийн QR болон deep link урсгал бэлэн, харин картаар төлөх нь fallback хэвээр байна.",
      reference: "Лавлагаа",
      methodsTitle: "Боломжит аргууд",
      cardFields: {
        cardholderName: "Карт эзэмшигчийн нэр",
        cardNumber: "Картын дугаар",
        expiryMonth: "Дуусах сар",
        expiryYear: "Дуусах жил",
        cvc: "CVC"
      },
      paypalSubmit: "PayPal-р үргэлжлүүлэх",
      cardSubmit: "Картаар төлөх",
      qpaySubmit: "QPay бэлтгэх",
      applePayNote: "Холбогдсон картын gateway дэмжвэл дараа нь Apple Pay нэмэх боломжтой.",
      deepLink: "Deep link",
      checkoutLink: "Checkout холбоос",
      promoTitle: "Урамшууллын код",
      promoCodeLabel: "Урамшууллын код",
      promoCodePlaceholder: "Код оруулна уу",
      promoHint: "Код зөв бол payment session үүсэхээс өмнө сервер дээр checkout дүн $0.01 болж буурна.",
      promoApplied: "Хэрэгжсэн код",
      promoOriginalAmount: "Эхний дүн",
      promoDiscountAmount: "Хөнгөлөлт",
      promoFinalAmount: "Төлөх дүн",
      localHint: "Энэ захиалга дотоод хэрэглэгчтэй төстэй тул QPay-г эхэнд харуулж байна.",
      internationalHint: "Энэ захиалга гадаад аялагчтай төстэй тул PayPal-г эхэнд харуулж байна.",
      paypalResultTitle: "PayPal checkout",
      cardResultTitle: "Картын checkout үр дүн",
      qpayResultTitle: "QPay checkout",
      paypalSuccess: "PayPal төлбөр амжилттай боллоо.",
      paypalPending: "PayPal checkout эцсийн баталгаажуулалтаа хүлээж байна.",
      paypalCancelled: "PayPal checkout capture хийгдэхээс өмнө цуцлагдлаа.",
      paypalFailed: "PayPal энэ төлбөрийг баталгаажуулж чадсангүй.",
      cardSuccess: "Картын төлбөр амжилттай боллоо.",
      cardFailed: "Картын төлбөр failed төлөвтэй буцлаа.",
      qpayPrepared: "QPay checkout бэлэн боллоо.",
      paypalOpenCheckout: "PayPal checkout нээх",
      paypalRedirectMissing: "Энэ захиалгад PayPal checkout холбоос буцааж ирсэнгүй.",
      paypalPanelNote:
        "PayPal сонголт нь hosted approval алхам үүсгээд, аялагчийг MongolWay руу буцаана. Аялагч буцаж орж ирэхэд сервер дээр session төлөв шинэчлэгдэнэ.",
      qpayPanelNote:
        "QPay сонголт нь QR болон deep link-д бэлэн байдлаар үүснэ. Жинхэнэ callback баталгаажуулалт дараа нь gateway холболтоор нэмэгдэнэ.",
      paypalPanelPlaceholder:
        "Энд PayPal approval төлөв, checkout холбоос, аялагч буцаж орсны дараах эцсийн capture төлөв харагдана.",
      cardPanelPlaceholder:
        "Энд картаар төлөхийн үр дүн, session лавлагаа болон цаашдын Apple Pay боломжийн тэмдэглэл харагдана.",
      qpayPanelPlaceholder:
        "Энд дараа нь QPay-ийн QR, deep link болон callback-д суурилсан баталгаажуулалтын төлөв гарч ирнэ.",
      errorMessage: "Төлбөр бэлтгэж чадсангүй."
    },
    contact: {
      pageLabel: "Холбоо барих",
      sendMessage: "Мессеж үлдээх",
      fields: {
        phone: "Утас",
        email: "Имэйл",
        office: "Оффисын байршил"
      }
    },
    faq: {
      pageLabel: "Түгээмэл асуулт"
    },
    auth: {
      pageLabel: "Нэвтрэх",
      title: "MongolWay бүртгэлдээ нэвтрэх",
      body:
        "Аялагчийн бүртгэл нь захиалгын мэдээллээ удирдах боломжтой бөгөөд админ эрх нь зөвхөн зөвшөөрөгдсөн хэрэглэгчдэд нээгдэнэ.",
      providersTitle: "Нэвтрэлтийн бүтэц",
      providersBody: "Имэйл, нууц үгээрээ нэвтрэх эсвэл тохируулсан identity provider-оор үргэлжлүүлнэ.",
      continueWithGoogle: "Google-ээр үргэлжлүүлэх",
      orContinueWithEmail: "Эсвэл имэйлээр үргэлжлүүлэх",
      signInTab: "Нэвтрэх",
      registerTab: "Бүртгэл үүсгэх",
      signInTitle: "Эргэн тавтай морил",
      signInBody: "Имэйл болон нууц үгээрээ нэвтэрч өөрийн эрхэд тохирсон хэсэг рүү орно.",
      registerTitle: "Аялагчийн бүртгэл үүсгэх",
      registerBody: "Нээлттэй бүртгэлээр энгийн аялагчийн бүртгэл үүснэ. Админ эрхийг тусад нь удирдана.",
      submitSignIn: "Нэвтрэх",
      submitRegister: "Бүртгэл үүсгэх",
      successMessage: "Амжилттай нэвтэрлээ.",
      errorMessage: "Үргэлжлүүлж чадсангүй.",
      oauthErrorMessage: "Энэ нэвтрэх сонголтыг гүйцээж чадсангүй. Дахин оролдох эсвэл имэйл, нууц үгээ ашиглана уу.",
      oauthUnavailableMessage: "Энэ нэвтрэх сонголт хараахан бэлэн болоогүй байна. Provider тохиргоогоо гүйцээгээд дахин оролдоно уу.",
      fields: {
        fullName: "Овог нэр",
        email: "Имэйл",
        phone: "Утас",
        nationality: "Иргэншил",
        password: "Нууц үг"
      }
    },
    account: {
      pageLabel: "Бүртгэл",
      title: "Таны захиалга ба профайл",
      body: "Аялагчийн мэдээлэл, сүүлийн захиалгууд, төлбөрийн төлөвөө нэг дороос харна.",
      profileTitle: "Профайл",
      bookingsTitle: "Захиалгууд",
      noBookings: "Одоогоор захиалга алга. Захиалга илгээмэгц энд харагдана.",
      bookAnother: "Дахин аялал захиалах",
      managePayment: "Төлбөрийн хуудас нээх"
    },
    footer: {
      contactTitle: "Холбоо барих",
      languageTitle: "English / Монгол / 日本語 / 한국어 / Español",
      socialTitle: "Сошиал"
    },
    admin: {
      pageLabel: "Админ самбар",
      pageBody:
        "Жишиг аяллууд, олон хэлний агуулга, холбоо барих мэдээлэл, захиалга болон төлбөрийн placeholder төлөвүүдийг нэг дороос удирдана.",
      toursTitle: "Аяллуудыг удирдах",
      bookingsTitle: "Захиалгуудыг удирдах",
      leadsTitle: "Цугларсан имэйлүүд",
      leadsBody: "Нүүр хуудасны имэйл бүртгэлүүд энд харагдана. Дараа нь холбоо барихад ашиглаж болно.",
      leadsEmpty: "Одоогоор имэйл бүртгэл алга.",
      siteTitle: "Сайтын агуулга ба холбоо барих мэдээлэл",
      contactTitle: "Холбоо барих мэдээлэл",
      contentTitle: "Нүүр ба тухай агуулга",
      guidesHint: "Хөтөчийн нэрсийг таслалаар тусгаарлан засна."
    },
    notFound: {
      title: "Хуудас олдсонгүй",
      body: "Таны хүссэн хуудас энэ MongolWay хувилбарт байхгүй байна."
    }
  },
  ja: {
    nav: {
      home: "ホーム",
      about: "会社情報",
      tours: "ツアー",
      booking: "予約",
      contact: "お問い合わせ",
      faq: "FAQ",
      admin: "管理",
      signIn: "ログイン",
      account: "アカウント"
    },
    common: {
      language: "言語",
      contact: "お問い合わせ",
      exploreTours: "ツアーを見る",
      startBooking: "予約する",
      viewDetails: "詳細を見る",
      included: "含まれるもの",
      excluded: "含まれないもの",
      itinerary: "旅程",
      dates: "日程",
      guides: "ガイド",
      from: "料金",
      perPerson: "1名あたり",
      bookingSummary: "予約概要",
      paymentSummary: "支払い状況",
      paymentMethod: "支払い方法",
      paymentReady: "QPayを準備",
      saveChanges: "保存",
      delete: "削除",
      addTour: "ツアーを追加",
      updateStatus: "状況を更新",
      contactPerson: "主な連絡先",
      comingSoon: "近日公開",
      signOut: "ログアウト",
      status: "状況",
      source: "流入元",
      created: "作成日",
      payment: "支払い",
      office: "住所",
      accountArea: "アカウント区分",
      recommended: "おすすめ",
      active: "利用可能",
      planned: "準備済み",
      backHome: "ホームへ戻る",
      dayLabel: "{day}日目",
      openMenu: "メニューを開く",
      closeMenu: "メニューを閉じる",
      switchToLightMode: "ライトモードに切り替える",
      switchToDarkMode: "ダークモードに切り替える"
    },
    home: {
      featuredJourneys: "注目の旅",
      whyTitle: "丁寧なルート設計、現代的な見せ方、そして土地の空気感",
      whyBody:
        "レイアウトと内容は、モンゴルらしさを誇張せず、余白があり、現代的で落ち着いた印象になるよう設計されています。",
      emailCaptureTitle: "旅の詳しい情報を受け取る",
      emailCaptureBody:
        "メールアドレスを残していただければ、旅程の詳しい案内、最新情報、オファーを後ほどお送りします。",
      emailCapturePlaceholder: "メールアドレス",
      emailCaptureSubmit: "情報を受け取る",
      emailCaptureSuccess: "ありがとうございます。今後の旅情報や更新のためにメールを保存しました。",
      emailCaptureError: "現在メールアドレスを保存できませんでした。もう一度お試しください。",
      emailCaptureRequired: "メールアドレスを入力してください。",
      emailCaptureInvalid: "有効なメールアドレスを入力してください。"
    },
    about: {
      pageLabel: "MongolWayについて",
      guidesTitle: "各旅に関わる人たち",
      guidesBody: "ガイド名は管理画面から簡単に変更できます。",
      fallbackGuideRole: "旅のコンパニオン",
      fallbackGuideBio: "現在のMongolWayツアールートのいずれかに関わるメンバーです。"
    },
    tours: {
      pageLabel: "ツアー",
      body: "最初の3つのサンプル旅程を見て、そのまま予約へ進めます。",
      gallery: "ギャラリー",
      notFoundTitle: "ツアーが見つかりません",
      notFoundBody: "この旅程は現在のMongolWayデモにはありません。"
    },
    booking: {
      pageLabel: "予約",
      formTitle: "予約を計画する",
      formBody: "出発日、人数、旅行者情報を選択してから予約を確定します。",
      signedInHint: "ログイン済みの情報を予約の初期値として利用できます。",
      savedMessage: "予約が保存されました。",
      errorMessage: "予約を完了できませんでした。",
      fields: {
        tour: "ツアー",
        date: "日付",
        people: "人数",
        name: "氏名",
        email: "メール",
        phone: "電話番号",
        nationality: "国籍",
        specialRequest: "特別な要望"
      },
      confirm: "予約を確定"
    },
    payment: {
      pageLabel: "支払い",
      title: "チェックアウト方法",
      body:
        "旅行者の状況に合った支払い方法を選択してください。海外旅行者にはPayPalを優先し、国内利用者にはQPayのQRとディープリンク導線を用意し、カード決済は補助手段として残します。",
      reference: "参照番号",
      methodsTitle: "利用可能な方法",
      cardFields: {
        cardholderName: "カード名義",
        cardNumber: "カード番号",
        expiryMonth: "有効期限（月）",
        expiryYear: "有効期限（年）",
        cvc: "CVC"
      },
      paypalSubmit: "PayPalで続行",
      cardSubmit: "カードで支払う",
      qpaySubmit: "QPayを準備",
      applePayNote: "接続するカードゲートウェイが対応していれば、後でApple Payも追加できます。",
      deepLink: "ディープリンク",
      checkoutLink: "チェックアウトリンク",
      promoTitle: "プロモーションコード",
      promoCodeLabel: "プロモーションコード",
      promoCodePlaceholder: "コードを入力",
      promoHint: "コードが有効な場合、支払いセッション作成前にサーバー側でチェックアウト金額が0.01ドルになります。",
      promoApplied: "適用されたコード",
      promoOriginalAmount: "元の金額",
      promoDiscountAmount: "割引額",
      promoFinalAmount: "支払額",
      localHint: "この予約は国内利用に近いため、QPayを先に表示しています。",
      internationalHint: "この予約は海外旅行者向けのため、PayPalを先に表示しています。",
      paypalResultTitle: "PayPalチェックアウト",
      cardResultTitle: "カード決済結果",
      qpayResultTitle: "QPayチェックアウト",
      paypalSuccess: "PayPal決済が完了しました。",
      paypalPending: "PayPalチェックアウトは最終確認待ちです。",
      paypalCancelled: "PayPalチェックアウトは確定前にキャンセルされました。",
      paypalFailed: "PayPalでこの支払いを確認できませんでした。",
      cardSuccess: "カード決済が完了しました。",
      cardFailed: "カード決済は失敗ステータスで返されました。",
      qpayPrepared: "QPayチェックアウトを準備しました。",
      paypalOpenCheckout: "PayPalチェックアウトを開く",
      paypalRedirectMissing: "PayPalはこの予約のチェックアウトリンクを返しませんでした。",
      paypalPanelNote:
        "PayPalではホスト型の承認ステップを作成し、旅行者をMongolWayに戻します。戻ってきた後にサーバー上で支払いセッションが更新されます。",
      qpayPanelNote:
        "QPayではまずQRとディープリンク対応のセッションを作成します。実際のコールバック確認は後でゲートウェイ層に追加できます。",
      paypalPanelPlaceholder:
        "ここにはPayPal承認状態、チェックアウトリンク、旅行者の帰還後に確定したキャプチャ状態が表示されます。",
      cardPanelPlaceholder:
        "ここにカード決済結果、セッション参照情報、将来のApple Pay対応メモが表示されます。",
      qpayPanelPlaceholder:
        "ここに今後、QPayのQR、ディープリンク、コールバックによる確認状態が表示されます。",
      errorMessage: "支払いを準備できませんでした。"
    },
    contact: {
      pageLabel: "お問い合わせ",
      sendMessage: "メッセージを送る",
      fields: {
        phone: "電話",
        email: "メール",
        office: "オフィス所在地"
      }
    },
    faq: {
      pageLabel: "FAQ"
    },
    auth: {
      pageLabel: "ログイン",
      title: "MongolWayアカウントへアクセス",
      body: "旅行者アカウントでは予約関連情報を管理でき、管理者アクセスは権限のあるユーザーのみに表示されます。",
      providersTitle: "ログイン構成",
      providersBody: "メールとパスワード、または設定済みのIDプロバイダーで続行できます。",
      continueWithGoogle: "Googleで続行",
      orContinueWithEmail: "またはメールで続行",
      signInTab: "ログイン",
      registerTab: "アカウント作成",
      signInTitle: "おかえりなさい",
      signInBody: "メールアドレスとパスワードでログインし、役割に応じた画面へ進みます。",
      registerTitle: "旅行者アカウントを作成",
      registerBody: "公開登録では通常の旅行者アカウントが作成されます。管理者権限は別途管理されます。",
      submitSignIn: "ログイン",
      submitRegister: "登録する",
      successMessage: "正常にログインしました。",
      errorMessage: "続行できませんでした。",
      oauthErrorMessage: "このサインイン方法を完了できませんでした。もう一度試すか、メールとパスワードを使用してください。",
      oauthUnavailableMessage: "このサインイン方法はまだ利用できません。プロバイダー設定を完了してから再度お試しください。",
      fields: {
        fullName: "氏名",
        email: "メール",
        phone: "電話",
        nationality: "国籍",
        password: "パスワード"
      }
    },
    account: {
      pageLabel: "アカウント",
      title: "予約とプロフィール",
      body: "旅行者情報、最近の予約、支払い状況を一か所で確認できます。",
      profileTitle: "プロフィール",
      bookingsTitle: "予約",
      noBookings: "まだ予約はありません。予約を送信するとここに表示されます。",
      bookAnother: "別の旅を予約する",
      managePayment: "支払いページを開く"
    },
    footer: {
      contactTitle: "お問い合わせ",
      languageTitle: "English / Монгол / 日本語 / 한국어 / Español",
      socialTitle: "SNS"
    },
    admin: {
      pageLabel: "管理ダッシュボード",
      pageBody:
        "サンプルツアー、多言語コンテンツ、連絡先情報、予約、支払いプレースホルダー状態を一か所で管理できます。",
      toursTitle: "ツアー管理",
      bookingsTitle: "予約管理",
      leadsTitle: "収集したメールリード",
      leadsBody: "ホームページで集めたメールアドレスをここで確認し、後でフォローできます。",
      leadsEmpty: "まだメールリードはありません。",
      siteTitle: "サイト内容と連絡先情報",
      contactTitle: "連絡先情報",
      contentTitle: "ホームと会社紹介の内容",
      guidesHint: "ガイド名はカンマ区切りで編集します。"
    },
    notFound: {
      title: "ページが見つかりません",
      body: "お探しのページはこのMongolWayビルドにはありません。"
    }
  },
  ko: {
    nav: {
      home: "홈",
      about: "소개",
      tours: "투어",
      booking: "예약",
      contact: "문의",
      faq: "FAQ",
      admin: "관리",
      signIn: "로그인",
      account: "계정"
    },
    common: {
      language: "언어",
      contact: "문의",
      exploreTours: "투어 보기",
      startBooking: "예약하기",
      viewDetails: "자세히 보기",
      included: "포함 사항",
      excluded: "불포함 사항",
      itinerary: "일정",
      dates: "출발일",
      guides: "가이드",
      from: "요금",
      perPerson: "1인 기준",
      bookingSummary: "예약 요약",
      paymentSummary: "결제 상태",
      paymentMethod: "결제 방법",
      paymentReady: "QPay 준비",
      saveChanges: "저장",
      delete: "삭제",
      addTour: "투어 추가",
      updateStatus: "상태 업데이트",
      contactPerson: "주요 연락처",
      comingSoon: "곧 제공",
      signOut: "로그아웃",
      status: "상태",
      source: "유입 경로",
      created: "생성일",
      payment: "결제",
      office: "주소",
      accountArea: "계정 구분",
      recommended: "추천",
      active: "사용 가능",
      planned: "준비됨",
      backHome: "홈으로 돌아가기",
      dayLabel: "{day}일차",
      openMenu: "메뉴 열기",
      closeMenu: "메뉴 닫기",
      switchToLightMode: "라이트 모드로 전환",
      switchToDarkMode: "다크 모드로 전환"
    },
    home: {
      featuredJourneys: "추천 여정",
      whyTitle: "세심한 동선, 현대적인 표현, 그리고 지역의 결",
      whyBody:
        "레이아웃과 콘텐츠는 몽골의 분위기를 과장하지 않으면서도 여백 있고 현대적이며 차분하게 느껴지도록 설계되었습니다.",
      emailCaptureTitle: "더 자세한 여행 정보를 받아보세요",
      emailCaptureBody:
        "이메일을 남겨 주시면 여정 상세 정보, 여행 업데이트, 제안을 나중에 보내드릴 수 있습니다.",
      emailCapturePlaceholder: "이메일 주소",
      emailCaptureSubmit: "정보 받기",
      emailCaptureSuccess: "감사합니다. 앞으로의 여행 정보와 업데이트를 위해 이메일이 저장되었습니다.",
      emailCaptureError: "지금은 이메일을 저장할 수 없습니다. 다시 시도해 주세요.",
      emailCaptureRequired: "이메일 주소를 입력해 주세요.",
      emailCaptureInvalid: "유효한 이메일 주소를 입력해 주세요."
    },
    about: {
      pageLabel: "MongolWay 소개",
      guidesTitle: "각 여정과 함께하는 사람들",
      guidesBody: "가이드 이름은 관리자 화면에서 쉽게 변경할 수 있습니다.",
      fallbackGuideRole: "여정 동반자",
      fallbackGuideBio: "현재 MongolWay 투어 루트 중 하나와 연결된 멤버입니다."
    },
    tours: {
      pageLabel: "투어",
      body: "세 가지 샘플 여정을 둘러보고 바로 예약으로 이동할 수 있습니다.",
      gallery: "갤러리",
      notFoundTitle: "투어를 찾을 수 없습니다",
      notFoundBody: "이 여정은 현재 MongolWay 데모에 없습니다."
    },
    booking: {
      pageLabel: "예약",
      formTitle: "예약 계획하기",
      formBody: "출발일, 인원수, 여행자 정보를 선택한 뒤 예약을 확정하세요.",
      signedInHint: "로그인한 정보는 예약의 시작값으로 사용할 수 있습니다.",
      savedMessage: "예약이 저장되었습니다.",
      errorMessage: "예약을 완료할 수 없습니다.",
      fields: {
        tour: "투어",
        date: "날짜",
        people: "인원",
        name: "이름",
        email: "이메일",
        phone: "전화번호",
        nationality: "국적",
        specialRequest: "특별 요청"
      },
      confirm: "예약 확정"
    },
    payment: {
      pageLabel: "결제",
      title: "체크아웃 옵션",
      body:
        "여행자 상황에 맞는 결제 경로를 선택하세요. 해외 여행자에게는 PayPal을 우선으로 제공하고, 현지 이용자에게는 QPay QR 및 딥링크 흐름을 준비해 두며, 카드 결제는 보조 수단으로 남겨 둡니다.",
      reference: "참조 번호",
      methodsTitle: "사용 가능한 방법",
      cardFields: {
        cardholderName: "카드 소유자 이름",
        cardNumber: "카드 번호",
        expiryMonth: "만료 월",
        expiryYear: "만료 연도",
        cvc: "CVC"
      },
      paypalSubmit: "PayPal로 계속하기",
      cardSubmit: "카드로 결제",
      qpaySubmit: "QPay 준비",
      applePayNote: "연결된 카드 게이트웨이가 지원하면 나중에 Apple Pay도 추가할 수 있습니다.",
      deepLink: "딥링크",
      checkoutLink: "체크아웃 링크",
      promoTitle: "프로모션 코드",
      promoCodeLabel: "프로모션 코드",
      promoCodePlaceholder: "코드를 입력하세요",
      promoHint: "코드가 유효하면 결제 세션이 생성되기 전에 서버에서 체크아웃 금액이 0.01달러로 내려갑니다.",
      promoApplied: "적용된 코드",
      promoOriginalAmount: "원래 금액",
      promoDiscountAmount: "프로모션 할인",
      promoFinalAmount: "결제 금액",
      localHint: "이 예약은 현지 이용자에 가까워 QPay를 먼저 보여줍니다.",
      internationalHint: "이 예약은 해외 여행자에 가까워 PayPal을 먼저 보여줍니다.",
      paypalResultTitle: "PayPal 체크아웃",
      cardResultTitle: "카드 결제 결과",
      qpayResultTitle: "QPay 체크아웃",
      paypalSuccess: "PayPal 결제가 완료되었습니다.",
      paypalPending: "PayPal 체크아웃이 최종 확인을 기다리고 있습니다.",
      paypalCancelled: "PayPal 체크아웃이 승인 전에 취소되었습니다.",
      paypalFailed: "PayPal이 이 결제를 확인하지 못했습니다.",
      cardSuccess: "카드 결제가 완료되었습니다.",
      cardFailed: "카드 결제가 실패 상태로 반환되었습니다.",
      qpayPrepared: "QPay 체크아웃이 준비되었습니다.",
      paypalOpenCheckout: "PayPal 체크아웃 열기",
      paypalRedirectMissing: "PayPal이 이 예약에 대한 체크아웃 링크를 반환하지 않았습니다.",
      paypalPanelNote:
        "PayPal은 호스팅된 승인 단계를 만든 뒤 여행자를 MongolWay로 다시 돌려보냅니다. 돌아온 후 서버에서 결제 세션 상태가 갱신됩니다.",
      qpayPanelNote:
        "QPay는 먼저 QR 및 딥링크용 세션을 생성합니다. 실제 콜백 확인은 나중에 게이트웨이 계층에 추가할 수 있습니다.",
      paypalPanelPlaceholder:
        "이 영역에는 PayPal 승인 상태, 체크아웃 링크, 사용자가 돌아온 뒤의 최종 캡처 상태가 표시됩니다.",
      cardPanelPlaceholder:
        "이 영역에는 카드 결제 결과, 세션 참조, 향후 Apple Pay 지원 메모가 표시됩니다.",
      qpayPanelPlaceholder:
        "이 영역에는 향후 QPay QR, 딥링크, 콜백 기반 확인 상태가 표시됩니다.",
      errorMessage: "결제를 준비할 수 없습니다."
    },
    contact: {
      pageLabel: "문의",
      sendMessage: "메시지 보내기",
      fields: {
        phone: "전화",
        email: "이메일",
        office: "사무실 위치"
      }
    },
    faq: {
      pageLabel: "FAQ"
    },
    auth: {
      pageLabel: "로그인",
      title: "MongolWay 계정에 접속",
      body: "여행자 계정은 예약 관련 정보를 관리할 수 있으며, 관리자 접근은 승인된 사용자에게만 제공됩니다.",
      providersTitle: "로그인 구조",
      providersBody: "이메일과 비밀번호 또는 설정된 ID 공급자를 통해 계속할 수 있습니다.",
      continueWithGoogle: "Google로 계속하기",
      orContinueWithEmail: "또는 이메일로 계속하기",
      signInTab: "로그인",
      registerTab: "계정 만들기",
      signInTitle: "다시 오신 것을 환영합니다",
      signInBody: "이메일과 비밀번호로 로그인하여 역할에 맞는 화면으로 이동하세요.",
      registerTitle: "여행자 계정 만들기",
      registerBody: "공개 가입은 일반 여행자 계정을 생성합니다. 관리자 권한은 별도로 관리됩니다.",
      submitSignIn: "로그인",
      submitRegister: "가입하기",
      successMessage: "로그인에 성공했습니다.",
      errorMessage: "계속 진행할 수 없습니다.",
      oauthErrorMessage: "이 로그인 옵션을 완료할 수 없었습니다. 다시 시도하거나 이메일과 비밀번호를 사용해 주세요.",
      oauthUnavailableMessage: "이 로그인 옵션은 아직 사용할 수 없습니다. 공급자 설정을 완료한 뒤 다시 시도해 주세요.",
      fields: {
        fullName: "이름",
        email: "이메일",
        phone: "전화",
        nationality: "국적",
        password: "비밀번호"
      }
    },
    account: {
      pageLabel: "계정",
      title: "예약 및 프로필",
      body: "여행자 정보, 최근 예약, 결제 상태를 한 곳에서 확인할 수 있습니다.",
      profileTitle: "프로필",
      bookingsTitle: "예약",
      noBookings: "아직 예약이 없습니다. 예약을 제출하면 여기에 표시됩니다.",
      bookAnother: "다른 여정 예약",
      managePayment: "결제 페이지 열기"
    },
    footer: {
      contactTitle: "문의",
      languageTitle: "English / Монгол / 日本語 / 한국어 / Español",
      socialTitle: "소셜"
    },
    admin: {
      pageLabel: "관리 대시보드",
      pageBody:
        "샘플 투어, 다국어 콘텐츠, 연락처 정보, 예약, 결제 플레이스홀더 상태를 한 곳에서 관리할 수 있습니다.",
      toursTitle: "투어 관리",
      bookingsTitle: "예약 관리",
      leadsTitle: "수집된 이메일 리드",
      leadsBody: "홈페이지에서 수집한 이메일 주소를 여기서 보고 나중에 후속 연락에 활용할 수 있습니다.",
      leadsEmpty: "아직 이메일 리드가 없습니다.",
      siteTitle: "사이트 콘텐츠 및 연락처 정보",
      contactTitle: "연락처 정보",
      contentTitle: "홈 및 소개 콘텐츠",
      guidesHint: "가이드 이름은 쉼표로 구분해 수정합니다."
    },
    notFound: {
      title: "페이지를 찾을 수 없습니다",
      body: "요청하신 페이지는 현재 MongolWay 빌드에 없습니다."
    }
  },
  es: {
    nav: {
      home: "Inicio",
      about: "Nosotros",
      tours: "Tours",
      booking: "Reserva",
      contact: "Contacto",
      faq: "FAQ",
      admin: "Admin",
      signIn: "Iniciar sesión",
      account: "Cuenta"
    },
    common: {
      language: "Idioma",
      contact: "Contacto",
      exploreTours: "Explorar tours",
      startBooking: "Reservar",
      viewDetails: "Ver detalles",
      included: "Incluye",
      excluded: "No incluye",
      itinerary: "Itinerario",
      dates: "Fechas",
      guides: "Guías",
      from: "Desde",
      perPerson: "por persona",
      bookingSummary: "Resumen de reserva",
      paymentSummary: "Estado del pago",
      paymentMethod: "Método de pago",
      paymentReady: "Preparar QPay",
      saveChanges: "Guardar cambios",
      delete: "Eliminar",
      addTour: "Agregar tour",
      updateStatus: "Actualizar estado",
      contactPerson: "Contacto principal",
      comingSoon: "Próximamente",
      signOut: "Cerrar sesión",
      status: "Estado",
      source: "Origen",
      created: "Creado",
      payment: "Pago",
      office: "Dirección",
      accountArea: "Área de cuenta",
      recommended: "Recomendado",
      active: "Activo",
      planned: "Planificado",
      backHome: "Volver al inicio",
      dayLabel: "Día {day}",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      switchToLightMode: "Cambiar a modo claro",
      switchToDarkMode: "Cambiar a modo oscuro"
    },
    home: {
      featuredJourneys: "Viajes destacados",
      whyTitle: "Rutas cuidadas, presentación moderna y espacio para el detalle local",
      whyBody:
        "El diseño y el contenido están pensados para sentirse abiertos, contemporáneos y conectados con Mongolia sin exagerar la marca.",
      emailCaptureTitle: "Recibe más detalles de viaje",
      emailCaptureBody:
        "Déjanos tu correo y te enviaremos información más detallada sobre nuestros viajes, novedades y ofertas.",
      emailCapturePlaceholder: "Tu correo electrónico",
      emailCaptureSubmit: "Recibir información",
      emailCaptureSuccess: "Gracias. Guardamos tu correo para futuros detalles de viaje y actualizaciones.",
      emailCaptureError: "No pudimos guardar tu correo en este momento. Inténtalo de nuevo.",
      emailCaptureRequired: "Introduce tu correo electrónico.",
      emailCaptureInvalid: "Introduce un correo electrónico válido."
    },
    about: {
      pageLabel: "Sobre MongolWay",
      guidesTitle: "Personas conectadas con cada viaje",
      guidesBody: "Los nombres de los guías se pueden cambiar fácilmente desde el panel de administración.",
      fallbackGuideRole: "Compañero de viaje",
      fallbackGuideBio: "Vinculado a una de las rutas actuales de MongolWay."
    },
    tours: {
      pageLabel: "Tours",
      body: "Explora los tres primeros viajes de muestra y pasa directamente a la reserva.",
      gallery: "Galería",
      notFoundTitle: "Tour no encontrado",
      notFoundBody: "Este viaje no está disponible en la demo actual de MongolWay."
    },
    booking: {
      pageLabel: "Reserva",
      formTitle: "Planifica tu reserva",
      formBody: "Elige una salida, el número de viajeros y los datos del pasajero antes de confirmar.",
      signedInHint: "Los datos de la sesión pueden usarse como punto de partida para tu reserva.",
      savedMessage: "La reserva se guardó correctamente.",
      errorMessage: "No se pudo completar la reserva.",
      fields: {
        tour: "Tour",
        date: "Fecha",
        people: "Personas",
        name: "Nombre completo",
        email: "Correo electrónico",
        phone: "Teléfono",
        nationality: "Nacionalidad",
        specialRequest: "Solicitud especial"
      },
      confirm: "Confirmar reserva"
    },
    payment: {
      pageLabel: "Pago",
      title: "Opciones de pago",
      body:
        "Elige la ruta de pago que mejor se adapte al viajero. PayPal es la opción principal para viajeros internacionales, QPay queda listo para flujos locales con QR y deep link, y el pago manual con tarjeta se mantiene como respaldo.",
      reference: "Referencia",
      methodsTitle: "Métodos disponibles",
      cardFields: {
        cardholderName: "Nombre del titular",
        cardNumber: "Número de tarjeta",
        expiryMonth: "Mes de vencimiento",
        expiryYear: "Año de vencimiento",
        cvc: "CVC"
      },
      paypalSubmit: "Continuar con PayPal",
      cardSubmit: "Pagar con tarjeta",
      qpaySubmit: "Preparar QPay",
      applePayNote: "Apple Pay puede activarse más adelante si la pasarela de tarjetas conectada lo permite.",
      deepLink: "Deep link",
      checkoutLink: "Enlace de checkout",
      promoTitle: "Código promocional",
      promoCodeLabel: "Código promocional",
      promoCodePlaceholder: "Introduce un código",
      promoHint: "Si el código es válido, el importe del checkout baja a USD 0.01 en el servidor antes de crear la sesión de pago.",
      promoApplied: "Código aplicado",
      promoOriginalAmount: "Importe original",
      promoDiscountAmount: "Descuento",
      promoFinalAmount: "Importe a pagar",
      localHint: "Esta reserva parece local, por eso se muestra primero QPay.",
      internationalHint: "Esta reserva parece internacional, por eso se muestra primero PayPal.",
      paypalResultTitle: "Checkout de PayPal",
      cardResultTitle: "Resultado del pago con tarjeta",
      qpayResultTitle: "Checkout de QPay",
      paypalSuccess: "El pago con PayPal se completó correctamente.",
      paypalPending: "El checkout de PayPal sigue esperando la confirmación final.",
      paypalCancelled: "El checkout de PayPal se canceló antes de la captura.",
      paypalFailed: "PayPal no pudo confirmar este pago.",
      cardSuccess: "El pago con tarjeta se completó correctamente.",
      cardFailed: "El pago con tarjeta devolvió un estado fallido.",
      qpayPrepared: "Se preparó el flujo de QPay.",
      paypalOpenCheckout: "Abrir checkout de PayPal",
      paypalRedirectMissing: "PayPal no devolvió un enlace de checkout para esta reserva.",
      paypalPanelNote:
        "PayPal crea un paso de aprobación alojado y luego devuelve al viajero a MongolWay. La sesión de pago se actualiza en el servidor cuando el viajero regresa.",
      qpayPanelNote:
        "La opción QPay crea primero una sesión lista para QR y deep link. La confirmación real por callback puede añadirse después en la capa del gateway.",
      paypalPanelPlaceholder:
        "Este panel mostrará el estado de aprobación de PayPal, el enlace de checkout y el estado final de captura cuando el viajero regrese.",
      cardPanelPlaceholder:
        "Este panel mostrará el resultado del pago con tarjeta, la referencia de la sesión y futuras notas sobre Apple Pay.",
      qpayPanelPlaceholder:
        "Este panel mostrará más adelante el QR de QPay, el deep link y el estado de confirmación basado en callback.",
      errorMessage: "No se pudo preparar el pago."
    },
    contact: {
      pageLabel: "Contacto",
      sendMessage: "Enviar mensaje",
      fields: {
        phone: "Teléfono",
        email: "Correo electrónico",
        office: "Ubicación de la oficina"
      }
    },
    faq: {
      pageLabel: "FAQ"
    },
    auth: {
      pageLabel: "Iniciar sesión",
      title: "Accede a tu cuenta de MongolWay",
      body:
        "Las cuentas de viajeros pueden gestionar detalles de reservas, mientras que el acceso admin solo está disponible para usuarios autorizados.",
      providersTitle: "Arquitectura de acceso",
      providersBody: "Continúa con correo y contraseña o con cualquier proveedor de identidad ya configurado.",
      continueWithGoogle: "Continuar con Google",
      orContinueWithEmail: "O continuar con correo",
      signInTab: "Iniciar sesión",
      registerTab: "Crear cuenta",
      signInTitle: "Bienvenido de nuevo",
      signInBody: "Usa tu correo y contraseña para entrar en el área correspondiente a tu rol.",
      registerTitle: "Crear una cuenta de viajero",
      registerBody: "El registro público crea una cuenta normal de viajero. El acceso admin se gestiona por separado.",
      submitSignIn: "Iniciar sesión",
      submitRegister: "Crear cuenta",
      successMessage: "Sesión iniciada correctamente.",
      errorMessage: "No se pudo continuar.",
      oauthErrorMessage: "No se pudo completar esta opción de acceso. Inténtalo otra vez o usa correo y contraseña.",
      oauthUnavailableMessage: "Esta opción de acceso todavía no está disponible. Termina la configuración del proveedor y vuelve a intentarlo.",
      fields: {
        fullName: "Nombre completo",
        email: "Correo electrónico",
        phone: "Teléfono",
        nationality: "Nacionalidad",
        password: "Contraseña"
      }
    },
    account: {
      pageLabel: "Cuenta",
      title: "Tus reservas y perfil",
      body: "Revisa tus datos de viajero, reservas recientes y estado de pago en un solo lugar.",
      profileTitle: "Perfil",
      bookingsTitle: "Reservas",
      noBookings: "Todavía no hay reservas. Cuando envíes una, aparecerá aquí.",
      bookAnother: "Reservar otro viaje",
      managePayment: "Abrir página de pago"
    },
    footer: {
      contactTitle: "Contacto",
      languageTitle: "English / Монгол / 日本語 / 한국어 / Español",
      socialTitle: "Redes"
    },
    admin: {
      pageLabel: "Panel de administración",
      pageBody:
        "Gestiona tours de muestra, contenido multilingüe, datos de contacto, reservas y estados de pago desde un solo lugar.",
      toursTitle: "Gestionar tours",
      bookingsTitle: "Gestionar reservas",
      leadsTitle: "Correos captados",
      leadsBody: "Los correos recogidos desde la página de inicio aparecen aquí para poder dar seguimiento después.",
      leadsEmpty: "Todavía no hay correos captados.",
      siteTitle: "Contenido del sitio y datos de contacto",
      contactTitle: "Información de contacto",
      contentTitle: "Contenido de inicio y sobre nosotros",
      guidesHint: "Edita los nombres de los guías separados por comas."
    },
    notFound: {
      title: "Página no encontrada",
      body: "La página que buscas no está disponible en esta versión de MongolWay."
    }
  }
};
