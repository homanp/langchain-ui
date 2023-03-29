import CsvUpload from "@/components/documents/csv-upload";

const DOCUMENT_LOADERS = [
  {
    id: "csv",
    type: "csv",
    label: "CSV",
    description: "Load csv files into your chat apps",
    component: CsvUpload,
  },
];

export const useDocuments = () => {
  return { options: DOCUMENT_LOADERS };
};
