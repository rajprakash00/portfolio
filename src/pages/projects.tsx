import { AccessionLedger, SpecimenSheets } from "@/components/projects";
import { PageHero } from "@/components/shared/PageHero";
import { DocumentHead } from "@/components/shared/seo";

const LEDE =
  "Systems I built and what they proved. Most are in bloom, one is still growing, a couple are pressed. Every number names its source.";

const Projects = () => {
  return (
    <>
      <DocumentHead
        title="Projects"
        description="Systems I built and what they proved: an accession ledger of every project, then specimen sheets with field measurements that name their source."
      />
      <PageHero title="Projects" lede={LEDE} />
      <AccessionLedger />
      <SpecimenSheets />
    </>
  );
};

export default Projects;
