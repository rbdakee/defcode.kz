import { ImageResponse } from "next/og";
import { getDict } from "@/i18n";
import { isLocale, locales } from "@/i18n/config";
import { company } from "@/content/company";

/**
 * Картинка для превью ссылки в мессенджерах и соцсетях.
 *
 * Без неё ссылка на сайт разворачивается серым прямоугольником —
 * это видит каждый, кому её отправили. Рисуем на лету из тех же токенов
 * бренда: отдельный файл пришлось бы перерисовывать на три языка руками.
 *
 * ImageResponse умеет только флексбокс и часть CSS — гридов и теней тут
 * намеренно нет, они молча не отрисуются.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Defcode";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDict(isLocale(locale) ? locale : "ru");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: 80,
        }}
      >
        {/* Знак логотипа: прямоугольник и закрывающая скобка. */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "#653BD1",
              color: "#ffffff",
              fontSize: 38,
              fontWeight: 700,
            }}
          >
            {"}"}
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#0E0E31" }}>
            {company.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 62,
              lineHeight: 1.15,
              fontWeight: 700,
              color: "#0E0E31",
              letterSpacing: -1,
              /* \n в словаре — ручной перенос: satori сам по ширине
                 не переносит так, как нужно для двух ровных строк. */
              whiteSpace: "pre-line",
            }}
          >
            {dict.pages.og.title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 30,
              lineHeight: 1.4,
              color: "#5C5C78",
            }}
          >
            {dict.pages.og.sub}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", width: 120, height: 8, borderRadius: 4, background: "#653BD1" }} />
          <div style={{ display: "flex", fontSize: 26, color: "#5C5C78" }}>
            {company.domain}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
