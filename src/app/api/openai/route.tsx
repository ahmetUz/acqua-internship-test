import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userInput, todo, done } = body;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'I will provide you with three pieces of information: A list of tasks to do(todo list). A list of completed tasks(done list). A user input(input) containing text. Your mission is as follows: Analyze the text in the user input. Determine if the user wants to move an item from the todo list to the done list. Determine if the user wants to move an item from the done list back to the todo list. Determine if the user wants to add a new item to the todo or done list. Return the updated todo and done lists after making the necessary changes. Here is an example of the input structure you will receive: {     "todo": ["task 1", ...,     "done": ["task 2", ...],     "input": "The user input" } And here is an example of the output structure I expect from you: `{     "todo": ["task 1", ...,     "done": ["task 2", ...], }` Make sure to understand the user\'s intent from the provided input text and update the lists accordingly.',
        },
        {
          role: 'user',
          content: `{"todo": ${JSON.stringify(todo)}, "done": ${JSON.stringify(
            done,
          )}, "input": "${userInput}"}`,
        },
      ],
      temperature: 0,
      max_tokens: 150,
      top_p: 1,
      presence_penalty: 0,
      frequency_penalty: 0,
    });
    return NextResponse.json(response);
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.error();
  }
}
