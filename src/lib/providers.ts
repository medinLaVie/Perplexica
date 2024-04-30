import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { OllamaEmbeddings } from '@langchain/community/embeddings/ollama';
import { getOllamaApiEndpoint, getOpenaiApiKey } from '../config';

export const getAvailableProviders = async () => {
  const openAIApiKey = getOpenaiApiKey();
  const ollamaEndpoint = getOllamaApiEndpoint();
  console.log('openAIApiKey: ', openAIApiKey);
  console.log('ollamaEndpoint: ', ollamaEndpoint);

  const models = {};

  if (openAIApiKey) {
    try {
      models['openai'] = {
        'gpt-3.5-turbo': new ChatOpenAI({
          openAIApiKey,
          modelName: 'gpt-3.5-turbo',
          temperature: 0.7,
        }),
        'gpt-4': new ChatOpenAI({
          openAIApiKey,
          modelName: 'gpt-4',
          temperature: 0.7,
        }),
        embeddings: new OpenAIEmbeddings({
          openAIApiKey,
          modelName: 'text-embedding-3-large',
        }),
      };
    } catch (err) {
      console.log(`Error loading OpenAI models: ${err}`);
    }
  }

  if (ollamaEndpoint) {
    try {
      console.log('Loading Ollama models...' + `${ollamaEndpoint}/api/tags`);


      const response = await fetch(`${ollamaEndpoint}/api/tags`);


      if (!response.ok) {
        throw new Error(
          `HTTP Error loading Ollama models: ${response.statusText}`,
        );
      }

      const { models: ollamaModels } = (await response.json()) as any;

      models['ollama'] = ollamaModels.reduce((acc, model) => {
        acc[model.model] = new ChatOllama({
          baseUrl: ollamaEndpoint,
          model: model.model,
          temperature: 0.7,
        });
        return acc;
      }, {});

      if (Object.keys(models['ollama']).length > 0) {
        models['ollama']['embeddings'] = new OllamaEmbeddings({
          baseUrl: ollamaEndpoint,
          model: models['ollama'][Object.keys(models['ollama'])[0]].model,
        });
      }
    } catch (err) {
      console.log(`Error loading Ollama models: ${err}`);
    }
  }

  return models;
};
