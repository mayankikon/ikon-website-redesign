"use client";

import { useId, useState } from "react";
import { Icon } from "./IconSprite";

export type AccordionItem = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: AccordionItem[];
  /** When true, only one panel may be open. Default true. */
  single?: boolean;
};

export function Accordion({ items, single = true }: AccordionProps) {
  const baseId = useId();
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  function isOpen(index: number) {
    return openIndexes.includes(index);
  }

  function handleToggle(index: number) {
    setOpenIndexes((current) => {
      const alreadyOpen = current.includes(index);
      if (alreadyOpen) {
        return current.filter((value) => value !== index);
      }
      if (single) {
        return [index];
      }
      return [...current, index];
    });
  }

  return (
    <div className="faq-list" data-accordion>
      {items.map((item, index) => {
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        const open = isOpen(index);
        return (
          <div className={`faq-item${open ? " is-open" : ""}`} key={item.question}>
            <button
              type="button"
              id={buttonId}
              className="faq-trigger"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => handleToggle(index)}
            >
              <span className="faq-question">{item.question}</span>
              <span className="faq-icon" aria-hidden="true">
                <Icon name="plus" className="icon faq-icon-plus" />
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="faq-panel"
              aria-hidden={!open}
              {...(!open ? { inert: true as const } : {})}
            >
              <div className="faq-panel-inner">
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
