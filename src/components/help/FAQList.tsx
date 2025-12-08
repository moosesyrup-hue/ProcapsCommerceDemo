import { motion, AnimatePresence } from 'motion/react';
import { FAQ } from '../../data/helpCenterFAQs';
import FAQItem from './FAQItem';

interface FAQListProps {
  faqs: FAQ[];
  expandedFAQ: number | null;
  onToggleFAQ: (index: number) => void;
  selectedTopic: string;
}

export default function FAQList({ faqs, expandedFAQ, onToggleFAQ, selectedTopic }: FAQListProps) {
  return (
    <div className="space-y-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTopic}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isExpanded={expandedFAQ === index}
              onToggle={() => onToggleFAQ(index)}
              showDivider={index < faqs.length - 1}
              index={index}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
