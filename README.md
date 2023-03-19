This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

I have added the handbook for the [Presidio Golf & Concordia Club] (https://pgccsf.com/getmedia/c544a939-6152-425e-80f8-f33827159a8a/PGCC_Golf_Handbook_04_1.aspx)


## Getting Started

take a look at .env.example for what I put in as variables.  ultimately working towards making this a self-serve lookup tool that is updated with latest club rules/regulations and NCGA. Accuracy issues abound.  


```bash
cp .env.example .env
```

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v16 or higher i used v19.16.0)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
- `wget` (on macOS, you can install this with `brew install wget`)

Next, we'll need to load our data source.

### Data Ingestion

Data ingestion happens in two steps.

First, you should run

```bash
sh download.sh
```

This will download our data source (in this case the Langchain docs ).

Next, install dependencies and run the ingestion script:

```bash
yarn && yarn ingest
```

This will parse the data, split text, create embeddings, store them in a vectorstore, and
then save it to the `data/` directory.

We save it to a directory because we only want to run the (expensive) data ingestion process once.

The Next.js server relies on the presence of the `data/` directory. Please
make sure to run this before moving on to the next step.

### Running the Server

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Deploying the server

The production version of this repo is hosted on
[fly](https://chat-langchainjs.fly.dev/). To deploy your own server on Fly, you
can use the provided `fly.toml` and `Dockerfile` as a starting point.

## Inspirations


- [ChatLangChain](https://github.com/hwchase17/chat-langchain) - for the backend and data ingestion logic
- [LangChain Chat NextJS](https://github.com/zahidkhawaja/langchain-chat-nextjs) - for the frontend.
