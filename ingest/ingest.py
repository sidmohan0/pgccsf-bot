"""Load html from files, clean up, split, ingest into Weaviate."""
from pathlib import Path
# from langchain.document_loaders import ReadTheDocsLoader
import os
from unstructured.partition.pdf import partition_pdf


if __name__ == "__main__":
    # loader = ReadTheDocsLoader()
    # raw_documents = loader.load()
    raw_documents = partition_pdf(os.environ.get('FILE_URL'))
    dir_path = Path("ingested_data")
    dir_path.mkdir(parents=True, exist_ok=True)
    for i, doc in enumerate(raw_documents):
        path = dir_path / f"{i}.json"
        with open(path, "w") as f:
            f.write(doc.json())
