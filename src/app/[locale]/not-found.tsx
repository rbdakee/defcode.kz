import Link from "next/link";
import { Container } from "@/components/ui";

/* Обёрнут в main макетом, поэтому здесь только содержимое. */
export default function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center py-20">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <p className="font-mono text-sm tracking-widest text-muted">404</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl">
            Страница не найдена
          </h1>
          <p className="mt-3 text-base text-pretty text-muted">
            Ссылка устарела или в адресе опечатка.
          </p>
          <Link
            href="/ru"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-brand px-6 text-base font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            На главную
          </Link>
        </div>
      </Container>
    </div>
  );
}
