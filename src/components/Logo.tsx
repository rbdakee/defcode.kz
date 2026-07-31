import Image from "next/image";

/**
 * Логотип. Исходники — PNG из /brand: у них был залит фон,
 * поэтому в /public/brand лежат обработанные версии с прозрачностью.
 * Светлая — тёмные буквы для светлого фона, тёмная — белые для тёмного.
 */
export default function Logo({
  variant = "light",
  className = "h-7 w-auto",
  priority = false,
}: {
  variant?: "light" | "dark";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={variant === "dark" ? "/brand/logo-h-dark.png" : "/brand/logo-h-light.png"}
      alt="Defcode"
      width={1924}
      height={307}
      priority={priority}
      className={className}
      sizes="200px"
    />
  );
}
