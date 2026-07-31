"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Показывает содержимое, когда оно доезжает до экрана.
 *
 * Атрибут переключается напрямую через ref, без состояния: React не
 * перерисовывает дерево, а браузеру достаётся только смена CSS-класса.
 * Наблюдатель отключается после первого срабатывания — секция не должна
 * заново «моргать» при скролле вверх. Если IntersectionObserver почему-то
 * недоступен, содержимое показывается сразу: лучше без анимации,
 * чем невидимая страница.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.setAttribute("data-shown", "true");

    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        show();
        io.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      data-shown="false"
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
