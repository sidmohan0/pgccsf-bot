import { OpenAI } from "langchain/llms";
import { LLMChain, ChatVectorDBQAChain, loadQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores";
import { PromptTemplate } from "langchain/prompts";

const CONDENSE_PROMPT = PromptTemplate.fromTemplate(`Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`);

const QA_PROMPT = PromptTemplate.fromTemplate(
  `
  You are an AI assistant trained to answer any questions about the official handbook of the Presidio Golf & Concordia Club. this is the handbook https://pgccsf.com/getmedia/c544a939-6152-425e-80f8-f33827159a8a/PGCC_Golf_Handbook_04_1.aspx.io.
  You are given the following extracted parts of a long document and a question. Provide a conversational answer with a quote and page numbered citation to the specific sentence.
  If you don't know the answer, just say "Hmm, I'm not sure." Don't try to make up an answer. Provide a link to the document only after the first response. Add a direct quote from the handbook to support your reasoning. 
  Here is a sample question/answer:
  Question: "When does the O'Shaughnessy Cup usually take place?
  Answer: "According to the PGCCSF guidebook on Page 7, the O'Shaughnessy Cup typically takes place on the 4th Saturday in March, though that is subject to change bu the Golf Committee.
  
  Question: {question}
  =========
  {context}
  =========
  Answer in Markdown:`);

export const makeChain = (vectorstore: HNSWLib, onTokenStream?: (token: string) => void) => {
  const questionGenerator = new LLMChain({
    llm: new OpenAI({ temperature: 0 }),
    prompt: CONDENSE_PROMPT,
  });
  const docChain = loadQAChain(
    new OpenAI({
      temperature: 0,
      streaming: Boolean(onTokenStream),
      callbackManager: {
        handleNewToken: onTokenStream,
      }
    }),
    { prompt: QA_PROMPT },
  );

  return new ChatVectorDBQAChain({
    vectorstore,
    combineDocumentsChain: docChain,
    questionGeneratorChain: questionGenerator,
  });
}

