import { CollectionIndex } from "../components/CollectionIndex";
import { PageMeta } from "../components/PageMeta";

export default function Photography() {
  return (
    <>
      <PageMeta title="Photography — Satya Prakash Sahoo" path="/photography" />
      <CollectionIndex
        type="photography"
        title="Photography"
        description="People, places, movement and details."
      />
    </>
  );
}
