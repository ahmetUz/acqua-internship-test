import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import prompts from './prompts.json';

interface UserIntent {
  removeTask: boolean; // user wnt to add or remove task
  moveLocation: boolean; // user wnt to move task(s) location
  addTask: boolean; // user wnt to add task(s)
}

async function detectUserIntent(openai: OpenAI, userInput: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: prompts.detectIntent.prompt,
      },
      {
        role: 'user',
        content: `user input = ${userInput}`,
      },
    ],
    temperature: 0,
    max_tokens: 500,
    top_p: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
  });
  if (response.choices[0].message.content) {
    return JSON.parse(response.choices[0].message.content);
  }
  return null;
}

function getPrompt(userIntent: UserIntent) {
  let prompt: string = '';

  if (userIntent.removeTask) prompt = prompts.removeTask.prompt;
  else if (userIntent.moveLocation) prompt = prompts.moveLocation.prompt;
  else if (userIntent.addTask) prompt = prompts.addTask.prompt;
  return prompt;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userInput, todo, done } = body;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const userIntent: UserIntent = await detectUserIntent(openai, userInput);
    const prompt: string = getPrompt(userIntent);

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: prompt,
        },
        {
          role: 'user',
          content: `{"todo": ${JSON.stringify(todo)}, "done": ${JSON.stringify(
            done,
          )}, "input": "${userInput}"}`,
        },
      ],
      temperature: 0,
      max_tokens: 1500,
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
