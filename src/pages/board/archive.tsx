import { Archive } from "@/components/archive";
import { DocumentHead } from "@/components/shared/seo";
import type { BoardNote } from "@/data/board";
import { getBoardNotes } from "@/lib/board";

interface ArchivePageProps {
  notes: BoardNote[];
}

const ArchivePage = ({ notes }: ArchivePageProps) => {
  return (
    <>
      <DocumentHead
        title="The wall"
        description="Every note I've pinned, newest first."
      />
      <div className="content board-archive">
        <Archive notes={notes} />
      </div>
    </>
  );
};

export async function getStaticProps() {
  const notes = await getBoardNotes();
  return { props: { notes } };
}

export default ArchivePage;
