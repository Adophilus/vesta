import { useEffect, useState } from "react";
import { type Doc, initJuno, setDoc } from "@junobuild/core-peer";

// added comment

type Record = {
  hello: string;
};

export default function App() {
  const [record, setRecord] = useState<Doc<Record> | undefined>(undefined);

  useEffect(() => {
    (async () =>
      await initJuno({
        satelliteId: "pdurl-fqaaa-aaaal-adlga-cai",
      }))();
  }, []);

  const insert = async () => {
    const doc = await setDoc({
      collection: "demo",
      doc: {
        key: `my-key-${new Date().getTime()}`,
        data: {
          hello: "world",
        },
      },
    });

    setRecord(doc);
  };

  return (
    <>
      <button onClick={insert}>Insert a document</button>
      {record !== undefined && <span>Key: {record.key}</span>}
    </>
  );
}
