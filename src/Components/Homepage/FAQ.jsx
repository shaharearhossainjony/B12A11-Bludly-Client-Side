import { MessageCircleQuestion } from "lucide-react";

const FAQ = () => {
  const faqs = [
    { q: "How often can I donate blood?", a: "A healthy donor can donate blood every 3 to 4 months." },
    { q: "Is it safe to donate blood?", a: "Yes, blood donation is completely safe. We follow all WHO protocols." },
    { q: "What should I eat before donating?", a: "Eat a healthy meal and drink plenty of water. Avoid fatty foods." },
  ];

  return (
    <section className="py-24 px-4 bg-base-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-xl">
            <MessageCircleQuestion />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-base-content tracking-tighter uppercase">Common Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="collapse collapse-plus bg-base-200 dark:bg-zinc-900 rounded-3xl border border-base-300 dark:border-white/5">
              <input type="radio" name="faq-accordion" defaultChecked={i === 0} /> 
              <div className="collapse-title text-xl font-bold p-6">{faq.q}</div>
              <div className="collapse-content px-6 pb-6 text-base-content/60 font-medium">{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;