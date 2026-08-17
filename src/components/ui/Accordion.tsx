"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-lineCafe py-5">
      <button aria-expanded={open} className="flex w-full items-center justify-between gap-4 text-left" onClick={() => setOpen((v) => !v)}>
        <span className="text-lg font-semibold text-blackCafe">{question}</span>
        <ChevronDown className={cn("h-5 w-5 transition-transform duration-300", open && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }} className="overflow-hidden">
            <p className="max-w-3xl pt-4 leading-7 text-blackCafe/65">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
