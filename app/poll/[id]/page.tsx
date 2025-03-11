import CommentsSection from "@/components/comment-section";
import ResultsSection from "@/components/result-section";
import ShareSection from "@/components/share-section";
import VotingSection from "@/components/voting-section";
import { getPollBySlug } from "@/lib/actions";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PollPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const res = await getPollBySlug(id);

  if (!res.data) {
    return notFound();
  }

  const poll = res.data;

  // Calculate if poll is expired
  const now = new Date();
  const createdAt = poll.createdAt ? new Date(poll.createdAt) : new Date();
  const expiryTime = new Date(
    createdAt.getTime() + Number(poll.expiresAt) * 1000,
  );
  const isExpired = expiryTime.getTime() <= now.getTime();

  // Format time left for initial render
  let timeLeft = "Expired";
  if (!isExpired) {
    const diffMs = expiryTime.getTime() - now.getTime();
    const diffSecs = Math.floor(diffMs / 1000) % 60;
    const diffMins = Math.floor(diffMs / (1000 * 60)) % 60;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours > 0) {
      timeLeft = `${diffHours} hour${diffHours > 1 ? "s" : ""} ${diffMins} minute${diffMins > 1 ? "s" : ""}`;
    } else if (diffMins > 0) {
      timeLeft = `${diffMins} minute${diffMins > 1 ? "s" : ""} ${diffSecs} second${diffSecs > 1 ? "s" : ""}`;
    } else {
      timeLeft = `${diffSecs} second${diffSecs > 1 ? "s" : ""}`;
    }
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <div className="mb-6">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </div>

      <div className="mb-8 space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">{poll.question}</h1>
        <div className="text-muted-foreground flex items-center text-sm">
          <Clock className="mr-2 h-4 w-4" />
          {isExpired ? "This poll has expired" : `Expires in ${timeLeft}`}
        </div>
      </div>

      <VotingSection poll={poll} isExpired={isExpired} />

      <ResultsSection poll={poll} isExpired={isExpired} />

      <ShareSection />

      <CommentsSection poll={poll} />
    </div>
  );
}
