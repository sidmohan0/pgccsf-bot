"""Load html from files, clean up, split, ingest into Weaviate."""
from pathlib import Path
from langchain.document_loaders import ReadTheDocsLoader

if __name__ == "__main__":
    loader = ReadTheDocsLoader("https://pgccsf.com/getmedia/c544a939-6152-425e-80f8-f33827159a8a/PGCC_Golf_Handbook_04_1.aspx")
    raw_documents = loader.load()
    dir_path = Path("ingested_data")
    dir_path.mkdir(parents=True, exist_ok=True)
    for i, doc in enumerate(raw_documents):
        path = dir_path / f"{i}.json"
        with open(path, "w") as f:
            f.write(doc.json())
