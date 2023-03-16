# Bash script to ingest data
# This involves scraping the data from the web and then cleaning up and putting in Weaviate.
# Error if any command fails
set -e
source .env
echo Downloading docs...
# wget -q -r -A.html https://pgccsf.com/getmedia/c544a939-6152-425e-80f8-f33827159a8a/PGCC_Golf_Handbook_04_1.aspx
wget -q -r -A.html "${FILE_URL}"
