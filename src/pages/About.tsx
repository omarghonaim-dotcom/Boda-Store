import ScrollReveal from "../components/ScrollReveal";

export default function About() {
  return (
    <ScrollReveal>
      <div className="bg-gray-50 min-h-screen py-20 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              عن بوده ستور
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              متجر بوسترات جديد بدأ من شغف بسيط بالفن والتصميم. نؤمن أن الجدران
              يجب أن تحكي قصصاً — وأن كل مساحة تستحق لمسة شخصية.
            </p>
          </div>

          {/* Story */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
                القصة
              </h2>
              <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
                <p className="mb-6">
                  بدأت "بودة ستور" كفكرة بسيطة: أريد بوسترات عالية الجودة تعكس اهتماماتي —
                  من الأنمي والألعاب، للسيارات والتحفيز — بأسعار معقولة وجودة
                  تدوم.
                </p>
                <p className="mb-6">
                  لم أجد ما أبحث عنه في السوق المحلي، فقررت إنشاؤه بنفسي. بدأت
                  بتصاميم قليلة، وطابعة جيدة، والتزام بالجودة في كل تفصيل — من
                  اختيار الورق والأحبار، للتغليف والشحن.
                </p>
                <p className="mb-6">
                  اليوم، المتجر ينمو بخطوات ثابتة. كل طلب يُجهز يدوياً، وكل
                  بوستر يُفحص قبل الشحن. لا فريق كبير، لا مستودعات ضخمة — فقط
                  اهتمام حقيقي بالمنتج وبالعميل.
                </p>
                <p className="font-medium">
                  شكراً لوجودك هنا منذ البداية. دعمكم يعني كل شيء.
                </p>
              </div>
            </div>
          </section>

          {/* Values - simplified */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
              ما نؤمن به
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "جودة قبل كل شيء",
                  desc: "ورق ممتاز، أحبار أرشيفية، وفحص يدوي لكل بوستر قبل الشحن.",
                },
                {
                  title: "صدق مع العملاء",
                  desc: "أسعار واضحة، بلا رسوم مخفية، وسياسة إرجاع سهلة خلال 30 يوم.",
                },
                {
                  title: "دعم المبدعين",
                  desc: "نعمل مع فنانين مرخصين ونحترم حقوق الملكية الفكرية.",
                },
                {
                  title: "تغليف بعناية",
                  desc: "كل طلب يُغلف وكأنه هدية — لأن فتح الطرد جزء من التجربة.",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Personal note */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl p-8 md:p-12 text-center text-white">
              <p className="text-lg md:text-xl mb-6 leading-relaxed">
                "هذا المتجر بدأ من حلم شخص واحد. كل طلب تصلكم، كل تصميم تختارونه،
                يدفع الحلم للأمام. شكراً لكونكم جزءاً من الرحلة."
              </p>
              <p className="font-medium">— مؤسس بودة ستور</p>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center">
            <a
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors"
            >
              تصفح المجموعة
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}