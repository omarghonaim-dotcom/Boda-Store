import ScrollReveal from "../components/ScrollReveal";

export default function Services() {
  const services = [
    {
      title: "تصميم بوسترات مخصصة",
      description:
        "اعمل مع فريق التصميم لإنشاء بوستر فريد يعكس رؤيتك. من الفكرة إلى الطباعة النهائية، نهتم بكل التفاصيل.",
      icon: "🎨",
    },
    {
      title: "طباعة متميزة",
      description:
        "طباعة عالية الجودة على ورق ماتي أو لامع أو كانفاس ممتاز. ألوان زاهية، تفاصيل حادة، وأحبار أرشيفية تدوم لعقود.",
      icon: "🖨️",
    },
    {
      title: "خيارات التعرية",
      description:
        "اختر من إطارات متنوعة — سوداء عصرية، خشب كلاسيكي، أو نمط صالات العرض — جاهزة للتعليق. متاح تمرير احترافي وزجاج واقي من الأشعة فوق البنفسجية.",
      icon: "🖼️",
    },
    {
      title: "شحن حول انحاء مصر",
      description:
        "تغليف آمن مع تتبع التوصيل لبابك. خيارات سريعة للهدايا في اللحظة الأخيرة.",
      icon: "📦",
    },
    {
      title: "تغليف هدايا",
      description:
        "تغليف هدايا جميل مع رسائل مخصصة. مثالي لأعياد الميلاد، الذكرى السنوية، أو إسعاد محبي الثقافة الشعبية.",
      icon: "🎁",
    },
    {
      title: "إرجاع سهل",
      description:
        "غير راضٍ؟ أرجع خلال 30 يوماً لاسترداد كامل أو استبدال. بدون أسئلة — نريدك أن تحب بوسترك.",
      icon: "🔄",
    },
  ];

  return (
    <ScrollReveal>
      <div className="bg-gray-50 min-h-screen py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              خدماتنا
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              كل ما تحتاجه لإحياء جدرانك — من التصاميم المخصصة للطباعة المتميزة والتعرية.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 bg-white rounded-2xl p-8 md:p-12 border border-gray-100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6">
              تحتاج شيئاً مخصصاً؟
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              لديك فكرة محددة؟ طلبات بالجملة لفعالية أو مكتب؟ فريقنا جاهز للمساعدة في تحقيق رؤيتك.
            </p>
            <div className="text-center">
              <a
                href="mailto:hello@bodastore.com"
                className="inline-flex items-center gap-2 px-8 py-3 bg-orange-400 text-gray-900 font-semibold rounded-xl hover:bg-gray-900 hover:text-white transition-colors"
              >
                تواصل معنا
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
      </div>
    </ScrollReveal>
  );
}