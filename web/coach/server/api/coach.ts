
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import {
    ChatPromptTemplate,
    MessagesPlaceholder,
  } from "@langchain/core/prompts";
import { z } from "zod";


const stringArray = z.string().array();
const questionsStructure = z.object({
  questions: stringArray
});



export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    const { questions } = await readBody(event)
    console.log(questions);
    console.log(config.openAiCoachApiKey);

    const model = new ChatOpenAI({ 
        model: "gpt-4",
        apiKey: config.openAiCoachApiKey 
     });

     // const problem = 'What can I do to earn more money?'
     const currentQuestion = questions.pop();  // get the last question
     // TODO: consider including the history as part of teh context

    //  const contextualizeQSystemPrompt = `Given a chat history and the latest user question
    //     which might reference context in the chat history, formulate a standalone question
    //     which can be understood without the chat history. Do NOT answer the question,
    //     just reformulate it if needed and otherwise return it as is.`;

    //     const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
    //     ["system", contextualizeQSystemPrompt],
    //     new MessagesPlaceholder("chat_history"),
    //     ].concat(questions.flatMap(question => ([ ["system", question.text], ["human", question.answer]]))));
     

    const messages = [
        new SystemMessage(`Come up with a 3 strong and specific questions that could help to understand the root problem of the client, and how to coach him to improve on that, try to identify limiting believes in what the client says, 
            Try to be as especific as posible to his problem, and before reflect on the consequences of the problem for the client in an empathic maner. Given the answer that he provided to this question: ${currentQuestion.text}`),
        new HumanMessage(currentQuestion.answer),
    ];

    const structuredLlm = model.withStructuredOutput(questionsStructure);
    

    // const contextualizeQChain = contextualizeQPrompt
    // .pipe(structuredLlm)


    const response = await structuredLlm.invoke(messages);

    console.log(response);

    return {
        response: response
    }
})