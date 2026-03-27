import React, { useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  faqs: FAQItem[]
  className?: string
}

export default function FAQSection({ title = "常見問題 FAQ", faqs, className = "" }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set([faqs[0]?.id]))

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <section className={`max-w-4xl mx-auto my-10 ${className}`} id="faq">
      <h2 className="font-bold mb-4 text-center text-[var(--color-heading)]">{title}</h2>
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="custom-accordion">
            {faqs.map((faq, index) => {
              const isOpen = openItems.has(faq.id)
              return (
                <div key={faq.id} className="faq-item mb-3">
                  <button
                    className={`faq-question w-full text-left p-3 font-semibold flex items-center justify-between ${
                      isOpen ? 'faq-active' : ''
                    }`}
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <span className="mr-3">{faq.question}</span>
                    {isOpen ? (
                      <BiChevronUp className="faq-icon" style={{ fontSize: '1.2rem', flexShrink: 0 }} />
                    ) : (
                      <BiChevronDown className="faq-icon" style={{ fontSize: '1.2rem', flexShrink: 0 }} />
                    )}
                  </button>
                  <div
                    id={`faq-answer-${faq.id}`}
                    className={`faq-answer ${isOpen ? 'faq-open' : ''}`}
                    aria-labelledby={`faq-question-${faq.id}`}
                  >
                    <div className="faq-content p-3">
                      <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style jsx>{`.custom-accordion{}.faq-item{border-radius:0.75rem;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);transition:all 0.2s ease}.faq-question{background-color:var(--color-card-bg,#ffffff);border:1px solid var(--color-border);border-radius:0.75rem;color:var(--color-body);transition:all 0.2s ease;cursor:pointer;outline:none}.faq-question:hover{background-color:var(--color-card-bg,#ffffff);border-color:#0d6efd;color:var(--color-body)}.faq-question.faq-active{background-color:var(--color-card-bg,#ffffff);border-color:#0d6efd;color:var(--color-body);border-bottom-left-radius:0;border-bottom-right-radius:0}.faq-icon{color:var(--color-body);transition:transform 0.2s ease}.faq-answer{max-height:0;overflow:hidden;transition:max-height 0.3s ease;background-color:var(--color-card-bg,#ffffff);border:1px solid var(--color-border);border-top:none;border-radius:0 0 0.75rem 0.75rem;margin-top:-1px}.faq-answer.faq-open{max-height:500px}.faq-content{color:var(--color-body)}`}</style>
    </section>
  )
}