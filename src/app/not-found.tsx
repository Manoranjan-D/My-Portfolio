import { Container } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center pt-32">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <p className="font-mono text-sm text-electric-400">404</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-mist-50 md:text-5xl">
            This page wandered off.
          </h1>
          <p className="mt-4 text-mist-300">
            The link may be broken, or the page may have moved. Let&apos;s get you back to solid ground.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button href="/" variant="accent">
              <ArrowLeft size={15} /> Back home
            </Button>
            <Button href="/work" variant="outline">
              View work
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
