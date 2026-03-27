export function getUiCopy(language) {
  const copy = {
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
        payment: "Payment",
        office: "Address",
        accountArea: "Account area",
        recommended: "Recommended"
      },
      home: {
        featuredJourneys: "Featured journeys",
        whyTitle: "Thoughtful routes, modern presentation, and room for local detail",
        whyBody:
          "The layout and content are designed to feel open, contemporary, and grounded in Mongolia without overstating the brand."
      },
      about: {
        pageLabel: "About MongolWay",
        guidesTitle: "People connected to each journey",
        guidesBody: "Guide names remain easy to change from the admin dashboard."
      },
      tours: {
        pageLabel: "Tours",
        body: "Browse the first three sample journeys and move directly into booking.",
        gallery: "Gallery"
      },
      booking: {
        pageLabel: "Booking",
        formTitle: "Plan your booking",
        formBody: "Choose a departure, number of people, and traveler details before confirming.",
        signedInHint: "Signed in details can be used as the starting point for your booking.",
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
          "Choose the payment path that fits the traveler context. Card checkout is primary for international guests, while QPay remains ready for local QR and deep-link flows.",
        reference: "Reference",
        methodsTitle: "Available methods",
        cardFields: {
          cardholderName: "Cardholder name",
          cardNumber: "Card number",
          expiryMonth: "Expiry month",
          expiryYear: "Expiry year",
          cvc: "CVC"
        },
        cardSubmit: "Pay by card",
        qpaySubmit: "Prepare QPay",
        applePayNote: "Apple Pay can be enabled later if the connected card gateway supports it.",
        deepLink: "Deep link",
        localHint: "This booking looks local, so QPay is shown first.",
        internationalHint: "This booking looks international, so card payment is shown first.",
        cardResultTitle: "Card checkout result",
        qpayResultTitle: "QPay checkout"
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
        providersBody: "Password sign-in is active now, and the structure is ready for Google later.",
        signInTab: "Sign in",
        registerTab: "Create account",
        signInTitle: "Welcome back",
        signInBody: "Use your email and password to continue to the right area for your role.",
        registerTitle: "Create a traveler account",
        registerBody: "Public registration creates a regular traveler account. Admin access is managed separately.",
        submitSignIn: "Sign in",
        submitRegister: "Create account",
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
        languageTitle: "English / Монгол",
        socialTitle: "Social"
      },
      admin: {
        pageLabel: "Admin Dashboard",
        toursTitle: "Manage tours",
        bookingsTitle: "Manage bookings",
        siteTitle: "Site content and contact details",
        contactTitle: "Contact information",
        contentTitle: "Bilingual homepage and about copy",
        guidesHint: "Edit guide names as a comma-separated list."
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
        payment: "Төлбөр",
        office: "Хаяг",
        accountArea: "Бүртгэлийн хэсэг",
        recommended: "Санал болгосон"
      },
      home: {
        featuredJourneys: "Онцлох аяллууд",
        whyTitle: "Бодлоготой маршрут, орчин үеийн төрх, орон нутгийн мэдрэмж",
        whyBody:
          "Загвар ба агуулга нь Монголын өнгө аясыг хэтрүүлэхгүйгээр орон зайтай, цэгцтэй, орчин үеийн байхаар бүтээгдсэн."
      },
      about: {
        pageLabel: "MongolWay-ийн тухай",
        guidesTitle: "Аялал бүртэй холбоотой хүмүүс",
        guidesBody: "Хөтөчийн нэрсийг админ хэсгээс хялбар өөрчилж болно."
      },
      tours: {
        pageLabel: "Аяллууд",
        body: "Эхний гурван жишиг аяллыг үзээд шууд захиалгад орно уу.",
        gallery: "Зургийн сан"
      },
      booking: {
        pageLabel: "Захиалга",
        formTitle: "Захиалгаа төлөвлөх",
        formBody: "Огноо, хүний тоо, аялагчийн мэдээллээ оруулаад захиалгаа баталгаажуулна.",
        signedInHint: "Нэвтэрсэн хэрэглэгчийн мэдээллийг захиалгын эхлэл болгож ашиглаж болно.",
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
          "Аялагчийн нөхцөлд тохирох төлбөрийн замыг сонгоно. Гадаад зочдод картаар төлөх нь үндсэн, харин дотоод хэрэглэгчдэд QPay-ийн QR болон deep link урсгал бэлэн байна.",
        reference: "Лавлагаа",
        methodsTitle: "Боломжит аргууд",
        cardFields: {
          cardholderName: "Карт эзэмшигчийн нэр",
          cardNumber: "Картын дугаар",
          expiryMonth: "Дуусах сар",
          expiryYear: "Дуусах жил",
          cvc: "CVC"
        },
        cardSubmit: "Картаар төлөх",
        qpaySubmit: "QPay бэлтгэх",
        applePayNote: "Холбогдсон картын gateway дэмжвэл дараа нь Apple Pay нэмэх боломжтой.",
        deepLink: "Deep link",
        localHint: "Энэ захиалга дотоод хэрэглэгчтэй төстэй тул QPay-г эхэнд харуулж байна.",
        internationalHint: "Энэ захиалга гадаад аялагчтай төстэй тул картаар төлөх аргыг эхэнд харуулж байна.",
        cardResultTitle: "Картын checkout үр дүн",
        qpayResultTitle: "QPay checkout"
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
        providersBody: "Одоогоор нууц үгтэй нэвтрэлт идэвхтэй, Google-ийн бүтэц дараа нэмэхэд бэлэн.",
        signInTab: "Нэвтрэх",
        registerTab: "Бүртгэл үүсгэх",
        signInTitle: "Эргэн тавтай морил",
        signInBody: "Имэйл болон нууц үгээрээ нэвтэрч өөрийн эрхэд тохирсон хэсэг рүү орно.",
        registerTitle: "Аялагчийн бүртгэл үүсгэх",
        registerBody: "Нээлттэй бүртгэлээр энгийн аялагчийн бүртгэл үүснэ. Админ эрхийг тусад нь удирдана.",
        submitSignIn: "Нэвтрэх",
        submitRegister: "Бүртгэл үүсгэх",
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
        languageTitle: "English / Монгол",
        socialTitle: "Сошиал"
      },
      admin: {
        pageLabel: "Админ самбар",
        toursTitle: "Аяллуудыг удирдах",
        bookingsTitle: "Захиалгуудыг удирдах",
        siteTitle: "Сайтын агуулга ба холбоо барих мэдээлэл",
        contactTitle: "Холбоо барих мэдээлэл",
        contentTitle: "Хоёр хэл дээрх нүүр ба тухай агуулга",
        guidesHint: "Хөтөчийн нэрсийг таслалаар тусгаарлан засна."
      }
    }
  };

  return copy[language] || copy.en;
}
