import { Board } from "@/components/board";
import { DocumentHead } from "@/components/shared/seo";
import type { BoardNote } from "@/data/board";
import { getBoardNotes } from "@/lib/board";

interface BoardPageProps {
  notes: BoardNote[];
}

const BoardPage = ({ notes }: BoardPageProps) => {
  return (
    <>
      <DocumentHead
        title="Pinned"
        description="Field notes, kept lines, and reminders to myself, filed by season."
      />
      <Board notes={notes} />
    </>
  );
};

export async function getStaticProps() {
  const notes = await getBoardNotes();
  return { props: { notes } };
}

export default BoardPage;
