import { CollectionIndex } from "../components/CollectionIndex";
import { PageMeta } from "../components/PageMeta";
import { site } from "../content/site";

export default function Films() {
  return (
    <>
      <PageMeta title="Films — Satya Prakash Sahoo" path="/films" />
      <CollectionIndex type="film" title="Films" description={site.bioSecondary} />
    </>
  );
}
