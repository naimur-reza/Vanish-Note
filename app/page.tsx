import Button from "@/components/ui/button";
import { ArrowRight, Clock, Lock, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">VanishVote</span>
          </div>
          <nav className="flex items-center gap-4">{/* <ThemeToggle /> */}</nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Create anonymous polls that{" "}
              <span className="text-primary">disappear</span> after a set time
            </h1>
            <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
              No login required. Share with a unique link. Results vanish when
              time&apos;s up.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/create">
                <Button size="lg" className="gap-2">
                  Create a Poll <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center gap-2 rounded-lg border p-6 text-center shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Timed Expiry</h3>
              <p className="text-muted-foreground">
                Polls automatically disappear after 1 hour, 12 hours, or 24
                hours.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border p-6 text-center shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Private & Anonymous</h3>
              <p className="text-muted-foreground">
                No login required. Polls are only accessible via unique links.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border p-6 text-center shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Instant Feedback</h3>
              <p className="text-muted-foreground">
                See results in real-time or hide them until the poll ends.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} VanishVote. All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
