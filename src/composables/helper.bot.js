import fuzzysort from "fuzzysort";

const link = document.createElement("a");
link.href = "https://texnopbazaar/offerta";
link.target = "_blank";

const knowledgeBase = [
  {
    keywords: [
      "shikoyat",
      "sotuvchi ustidan shikoyat",
      "sotuvchi bilan muammo",
      "sotuvchi aldagan",
      "sotuvchi yomon gapirdi",
      "sotuvchi bilan gaplashmoqchiman",
      "kim bilan bog‘lanish mumkin",
      "admin kerak",
      "yordam kerak",
      "operator kerak",
      "admin bilan bog‘lanaman",
      "sotuvchi haqida yozmoqchiman",
    ],
    answer: `Sotuvchi ustidan shikoyat berish uchun iltimos, operator bilan bog‘laning. <a href="tel:+998910118353" target="_blank" rel="noopener noreferrer" style="color:#007bff;">Operatorga bog'lanish</a>`,
  },
  {
    keywords: [
      "qaytarish",
      "qaytarsa",
      "qaytarib berish",
      "qaytarib bo‘ladimi",
      "mahsulotni qaytarish",
      "tovarni qaytarish",
      "qaytaraman",
      "qaytarvoman",
      "qaytarsam",
      "orqaga qaytarish",
      "qaytarish mumkinmi",
      "qaytarib bo‘ladimi",
      "qaytib berish",
      "qaytarish kerak",
      "tovar yaramaydi",
      "xato keldi",
      "boshqasiga almashtirish",
      "pulni qaytarish",
      "qaytarib yuborish",
    ],
    answer:
      "Ha albatta, mahsulotni qaytarib yuborishingiz uchun sotuvchi yoki platforma adminlari bilan gaplashgan holda qaytarib yuborishingiz mumkin. Bog'lanishni istasangiz 'bog'lanish' deb yozib qoldiring",
  },
  {
    keywords: [
      "yetkazib",
      "dostavka",
      "olib kelish",
      "eltib berish",
      "kuryer",
      "qachon",
      "keladi",
      "necha kunda keladi",
      "buyurtma kelishi",
      "qachon keladi",
      "buyurtmam qayerda",
      "hali kelmadi",
      "necha kunda olib kelishadi",
      "kuryer qachon",
      "dostavka narxi",
      "yetkazish muddati",
      "keldi deb yozilgan",
      "kelmayapti",
      "manzilimga olib kelish",
    ],
    answer:
      "Mahsulotni buyurtma qilganingizda 24 soat ichida sotuvchi tomonidan tasdiqlanadi. Tasdiqlangandan 48 soat ichida sotuvchi tomonidan kirg'izgan manzilingizga yetkazib beriladi. Agarda tasdiqlanmayotgan bo'lsa yoki tasdiqlangandan keyin 48 soat ichida kelmagan bolsa Yordam markazimizga qo'ng'iroq qilib mahsulotingiz holatini aniqlashingiz mumkin. Yordam markazi: +998 91 554 56 65",
  },
  {
    keywords: [
      "qanday to‘lov",
      "to‘lov qilish",
      "pulini qanday to‘layman",
      "naqd to‘lov",
      "plastik karta",
      "karta orqali",
      "click",
      "payme",
      "uzum",
      "terminal",
      "tolov",
      "usuli",
      "hisobdan to‘lov",
      "naqd pul",
      "karta bilan to‘lov",
      "online to‘lash",
      "click orqali",
      "payme orqali",
      "uzum orqali",
      "plastik bilan",
      "kartadan o‘tkazsam bo‘ladimi",
      "tolov qilish kerak",
      "tolov qanday",
    ],
    answer:
      "To'lov turi sotuvchi mahsulotni belgilangan manzilga yetkazganidan keyin. Mahsulotni qo'lingizga olganingizdan keyn naqd to'lov turida to'lanadi",
  },
  {
    keywords: [
      "qanday to‘lov",
      "to‘lov qilish",
      "pulini qanday to‘layman",
      "naqd to‘lov",
      "plastik karta",
      "kartadanam",
      "karta orqali",
      "tolov",
      "usuli",
      "hisobdan to‘lov",
    ],
    answer:
      "Ha albatta, tolovni kartadan online tarzda o'tkazsangiz ham bo'ladi sotuvchi mahsulotni yetkazib berganidan keyin sotuvchining karta raqamiga aytilgan narxni tashlab berishingiz mumkin.",
  },
  {
    keywords: [
      "kafolat",
      "garantiya",
      "servis",
      "ta’mirlash",
      "nosoz",
      "brak",
      "yomon",
      "holati",
      "ishlamayapti",
      "ishlamay qoldi",
      "brak chiqqan",
      "servis markazi",
      "qanday kafolat bor",
      "ta'mirlash kerak",
      "ishlamaydi",
      "nosoz keldi",
      "yomon chiqdi",
      "garantiya muddati",
      "ishlamay qolgan",
      "buzilib keldi",
    ],
    answer:
      "Agarda mahsulot aytilgan holatidan yomon yokida buziq holatda kelgan bo'lsa qaytarib yuborib pulingizni olishingiz mumkin.",
  },
  {
    keywords: [
      "operator",
      "murojaat",
      "murojat",
      "boglanish",
      "gaplashmoqchman",
      "bog‘lanish",
      "aloqa",
      "raqam",
      "telefon",
      "manzil",
      "qayerdasiz",
      "admin bilan gaplashaman",
      "aloqa qilish",
      "operator raqami",
      "bog‘lanmoqchiman",
      "telefon nomer",
      "kontakt",
      "qanday bog‘lanaman",
      "admin raqam",
      "yordam kerak",
      "qo‘ng‘iroq raqam",
    ],
    answer:
      "Platforma operatori bilan bog'lanish uchun: +998 91 --- -- --, Sotuvchi bilan bog'lanishni hohlasangiz mahsulot haqida ma'lumot olish sahifasida sotuvchi telegram chatlari va aloqa uchun no'merlari ko'rsatilgan. Agarda admin bilan bog'lanishni istasangiz avval operator bilan bog'lanishingiz kerak operatorning ozi sizni admin bilan bog'laydi",
  },
  {
    keywords: [
      "qoidalar",
      "haqida",
      "qoida",
      "oqisam",
      "maxfiylik",
      "siyosati",
      "shartlar",
      "foydalanish",
      "offerta",
      "qonuniy",
      "ruxsat",
      "ruxsatsiz",
      "qonun qoidalar",
      "foydalanish shartlari",
      "qoidalarni o‘qish",
      "offerta haqida",
      "maxfiylik siyosati",
      "qonun asosida",
      "ruxsat etilganmi",
      "platforma qoidalari",
      "sayt shartlari",
      "oferta",
      "shartnoma",
      "foydalanish tartibi",
    ],
    answer: `TexnoBazaar online savdo platformasining to'liq qonun qoidalari bilan tanishib chiqish uchun pdf faylni yuklab oling. <a href="/documents/TexnoBazaar_Qoidalari.pdf" 
   download="TexnoBazaar_Qoidalari.pdf" 
   target="_blank" 
   style="color:#007bff;">Yuklab olish</a>`,
  },

  {
    keywords: [
      "sotib olgan edim",
      "tasdiqlamayapti",
      "tasdiqlanmayapti",
      "tasdiqlanmayapt",
      "tasdiqlanmadi",
      "kelmayapti",
      "muddat",
      "otib",
      "ketdi",
      "bermayapti",
      "javob",
      "olib",
      "kelib",
      "buyurtmam tasdiqlanmayapti",
      "kelishi kechikyapti",
      "hali tasdiqlanmadi",
      "muddat o‘tib ketdi",
      "tasdiqlamayapti",
      "javob yo‘q",
      "tasdiqlashni kutyapman",
      "tasdiqlanmagan",
      "kutyapman",
      "buyurtmam chiqmayapti",
      "sotuvchi tasdiqlamayapti",
      "sotuvchi tasdiqlamagan",
    ],
    answer:
      "Agarda sotuvchi sizning mahsulotingizni tasdiqlamayotgan bo'lsa yoki tasdiqlangandan keyin buyurtmangiz belgilangan 2 kun ichida kelmagan bo'lsa soutvchi bilan bog'lanib ko'ring va mahsulot statusini aniqlang. Agarda sotuvchi bilan bog'lana olmayatgan bo'lsangiz admin bilan bog'lanib ko'ring bog'lanish uchun 'bog'lanish' sozini yozib qoldiring",
  },
  {
    keywords: [
      "sotvolish",
      "sotvomoqchiman",
      "sotvolaman",
      "zakaz berish",
      "buyurtma",
      "olmoqchiman",
      "olmoqchi",
      "qayerdan",
      "olaman",
      "olsa",
      "sotib olmoqchiman",
      "zakaz qilsam",
      "buyurtma beray",
      "olmoqchi edim",
      "sotib ololmadim",
      "olish",
      "buyurtma qilish",
      "zakaz qilish",
      "olay",
      "buyurtma bermoqchiman",
      "olib bermoqchi",
      "olish kerak",
      "zakaz bermoqchiman",
    ],
    answer:
      "Mahsulotlarni savatchaga qo'shib keyin joylashuvingizni kiritgan holda mahsulotni sotib olishingiz mumkin. Mahsulotni sotuvchi kirg'izgan manzilingizga yetkazib beradi.",
  },
  {
    keywords: [
      "sotish",
      "sotuvchi bo‘laman",
      "do‘kon ochmoqchiman",
      "seller bo‘lish",
      "platformada sotish",
      "mahsulot joylash",
      "seller bo‘lish uchun",
      "tovar joylamoqchiman",
      "sotuvchilik",
      "seller sifatida",
    ],
    answer: `Agarda sotuvchi bo'lishni istasangiz platforma admini bilan bog'laning. 
    <a href="https://t.me/y_bahodirovich" target="_blank" rel="noopener noreferrer" style="color:#007bff;">Telegram orqali bog'lanish</a>`,
  },
  {
    keywords: [
      "admin",
      "adminga",
      "admin raqami",
      "admin kerak",
      "admin bilan aloqa",
      "admin yordam",
      "admin yozing",
      "operator orqali admin",
      "admin kim",
      "admin topish",
    ],
    answer: `Agarda admin bilan bog'lanmoqchi bo'lsangiz avval operator bilan bog'lanib shikoyatingizni aytib va admin bilan bog'lanishli sabab bo'lsa operatorning ozi admin bilan sizni bog'laydi  <a href="tel:+998910118353" target="_blank" rel="noopener noreferrer" style="color:#007bff;">Operatorga bog'lanish</a>`,
  },
  {
    keywords: [
      "yoqmadi",
      "mahsulot yoqmadi",
      "shikoyat qilmoqchiman",
      "mahsulot yaramaydi",
      "sayt yomon",
      "kamchilik bor",
      "yoqmadi",
      "tovar sifatsiz",
      "shikoyat yuborish",
      "noroziman",
      "feedback",
      "fikr qoldirish",
    ],
    answer: `Sizga mahsulot yoqmagan bo'lsa yoki online saytimizning kamchiliklari bo'lsa albatta shikoyat qilishingiz mumkin sizning fikringiz bizga muhim. Shikoyat qilishni istasangiz quyidagi havola orqali telegram botimizga kirib o'z xabaringizni yozib qoldiring albatta sizga bog'lanamiz.   <a href="https://t.me/savdo_x_bot" target="_blank" style="color:#007bff;">Havolani ochish</a>`,
  },
  {
    keywords: [
      "versiya",
      "saytning",
      "versiyasi",
      "sayt versiyasi",
      "qaysi versiya",
      "yangilanish",
      "update",
      "sayt yangilanishi",
      "platforma versiyasi",
    ],
    answer: "Saytning hozirgi versiyasi 2.2.6",
  },
];

export function generateSmartReply(text) {
  const q = text.toLowerCase();
  const words = q.split(/\s+/);

  let bestMatch = null;
  let bestScore = -Infinity;

  for (const item of knowledgeBase) {
    let totalScore = 0;
    let matchCount = 0;

    for (const keyword of item.keywords) {
      for (const word of words) {
        const result = fuzzysort.single(keyword, word);
        if (result) {
          totalScore += result.score;
          matchCount++;
        }
      }
    }

    const averageScore = matchCount > 0 ? totalScore / matchCount : -Infinity;

    if (averageScore > bestScore) {
      bestScore = averageScore;
      bestMatch = item;
    }
  }

  if (bestMatch && bestScore > -200) {
    return bestMatch.answer;
  }

  return "Assalomu alaykum hurmatli foydalanuvchi. Sizga qanday yordam bera olaman?";
}
