import { Archive } from "@/components/archive";
import { DocumentHead } from "@/components/shared/seo";
import type { BoardNote } from "@/data/board";
import { getBoardNotes } from "@/lib/board";
import { Container } from "@/styles/layout";

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
      <Container className="content board-archive">
        <Archive notes={notes} />
      </Container>
    </>
  );
};

export async function getStaticProps() {
  const notes = await getBoardNotes();
  return { props: { notes } };
}

export default ArchivePage;
