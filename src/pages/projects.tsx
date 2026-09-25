import { SpecimenSheets } from "@/components/projects";
import { PageHero } from "@/components/shared/PageHero";
import { DocumentHead } from "@/components/shared/seo";

const LEDE =
  "Systems I built and what they proved. Most are in bloom, one is still growing. Every number names its source.";

const Projects = () => {
  return (
    <>
      <DocumentHead
        title="Projects"
        description="Systems I built and what they proved: specimen sheets with field measurements that name their source."
      />
      <PageHero title="Projects" lede={LEDE} />
      <SpecimenSheets />
    </>
  );
};

export default Projects;
