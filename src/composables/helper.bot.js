import fuzzysort from "fuzzysort";

const link = document.createElement("a");
link.href = "https://texnopbazaar/offerta";
link.target = "_blank";

const knowledgeBase = [
  {
    keywords: ["sotish", "sotuvchi"],
    answer: `Agarda sotuvchi bo'lishni istasangiz platforma admini bilan bog'laning. 
    <a href="https://t.me/y_bahodirovich" target="_blank" rel="noopener noreferrer" style="color:#007bff;">Telegram orqali bog'lanish</a>`,
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
    ],
    answer:
      "Mahsulotlarni savatchaga qo'shib keyin joylashuvingizni kiritgan holda mahsulotni sotib olishingiz mumkin. Mahsulotni sotuvchi kirg'izgan manzilingizga yetkazib beradi.",
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
    ],
    answer:
      "To'lov turi sotuvchi mahsulotni belgilangan manzilga yetkazganidan keyin. Mahsulotni qo'lingizga olganingizdan keyn naqd to'lov turida to'lanadi",
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
    ],
    answer:
      "Platforma operatori bilan bog'lanish uchun: +998 91 --- -- --, Sotuvchi bilan bog'lanishni hohlasangiz mahsulot haqida ma'lumot olish sahifasida sotuvchi telegram chatlari va aloqa uchun no'merlari ko'rsatilgan.",
  },

  {
    keywords: [
      "qoidalar",
      "sayt",
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
    ],
    answer: `TexnoBazaar online savdo platformasining to'liq qonun qoidalari bilan tanishib chiqish uchun pdf faylni yuklab oling. <a href="/documents/TexnoBazaar_Qoidalari.pdf" 
   download="TexnoBazaar_Qoidalari.pdf" 
   target="_blank" 
   style="color:#007bff;">Yuklab olish</a>`,
  },

  {
    keywords: [
      "tasdiqlamayapti",
      "tasdiqlanmayapti",
      "tasdiqlanmayapt",
      "tasdiqlanmadi",
      "sotuvchi",
      "kelmayapti",
      "muddat",
      "otib",
      "ketdi"
    ],
    answer:
      "Agarda sotuvchi sizning mahsulotingizni tasdiqlamayotgan bo'lsa yoki tasdiqlangandan keyin buyurtmangiz belgilangan 2 kun ichida kelmagan bo'lsa soutvchi bilan bog'lanib ko'ring va mahsulot statusini aniqlang. Agarda sotuvchi bilan bog'lana olmayatgan bo'lsangiz admin bilan bog'lanib ko'ring bog'lanish uchun 'bog'lanish' sozini yozib qoldiring",
  },

  {
    keywords: ["shikoyat", "yoqmadi"],
    answer: `Sizga mahsulot yoqmagan bo'lsa yoki online saytimizning kamchiliklari bo'lsa albatta shikoyat qilishingiz mumkin sizning fikringiz bizga muhim. Shikoyat qilishni istasangiz quyidagi havola orqali telegram botimizga kirib o'z xabaringizni yozib qoldiring albatta sizga bog'lanamiz.   <a href="https://t.me/savdo_x_bot" target="_blank" style="color:#007bff;">Havolani ochish</a>`,
  },
  {
    keywords: ["versiya"],
    answer: "Saytning hozirgi versiyasi 2.2.5"
  }
];

export function generateMockReply(text) {
  const q = text.toLowerCase();
  const words = q.split(/\s+/);

  for (const item of knowledgeBase) {
    let matchFound = false;

    for (const keyword of item.keywords) {
      for (const word of words) {
        const result = fuzzysort.single(keyword, word);
        if (result && result.score > -100) {
          matchFound = true;
          break;
        }
      }
      if (matchFound) break;
    }

    if (matchFound) return item.answer;
  }

  return "Assalomu alaykum hurmatli foydalanuvchi. Sizga qanday yordam bera olaman ?";
}
