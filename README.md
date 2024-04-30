# 🚀 Perplexica - An AI-powered search engine 🔎 <!-- omit in toc -->

![preview](.assets/perplexica-screenshot.png)

## Table of Contents <!-- omit in toc -->

- [Overview](#overview)
- [Preview](#preview)
- [Features](#features)
- [Installation](#installation)
  - [Getting Started with Docker (Recommended)](#getting-started-with-docker-recommended)
  - [Non-Docker Installation](#non-docker-installation)
- [Upcoming Features](#upcoming-features)
- [Support Us](#support-us)
- [Contribution](#contribution)
- [Help and Support](#help-and-support)

---
Mengke Notes;
1. Install Docker
```bash
# list running dockers
docker ps

# pull docker image from docker hub
docker pull hello-world
docker run hello-world

# build docker image
docker build -t my-image .

# run a container w a specific port mapping
docker run -d -p 8080:80 my-image

# view container logs
docker logs container_id

# check docker configurations (ie. port, firewall)
docker inspect container_id

# stop/remove container logs
docker stop container_id #stop container
docker rm container_id # remove stopped container

# restart docker command
docker restart container_id [container...]

# stop the running docker compose services
docker-compose down
docker-compose down -v #  removes all volumes associated with the containers, including the node_modules volume. This ensures that any updates to your package.json file are reflected.

# make changes to docker-compose.yaml and start the docker services
docker-compose up -d


# hot reload docker and nextjs config
# https://jameschambers.co.uk/nextjs-hot-reload-docker-development
docker-compose up -d --build

# access docker terminal
docker exec -it container_id /bin/bash

# show docker images and tags
docker images
docker run -p 8000:8000 perplexica-perplexica-backend:latest

# run container detached mode - run in background and don't block the terminal
docker run -d -p 8000:8000 perplexica-perplexica-backend:latest

# docker build image
docker build -f app.dockerfile -t frontend:latest .

# remove unused docker iamges
docker image prune
docker image prune -a
docker image

```

1. Run Ollama on docker as required
```bash
[API_ENDPOINTS]
SEARXNG = "http://localhost:32768" # SearxNG API URL
OLLAMA = "" # Ollama API URL - http://host.docker.internal:11434
```
1. open http://127.0.0.1:3002/ since updated docker-compose.yaml
```bash
  perplexica-frontend:
    build:
      context: .
      dockerfile: app.dockerfile
      args:
        - NEXT_PUBLIC_API_URL=http://127.0.0.1:3001/api
        - NEXT_PUBLIC_WS_URL=ws://127.0.0.1:3001
    depends_on:
      - perplexica-backend
    expose:
      - 3002
    ports:
    # exposes port 3002 and maps it to port 3002 on the container.
      - 3002:3000
    networks:
      - perplexica-network
```








---

## Overview

Perplexica is an open-source AI-powered searching tool or an AI-powered search engine that goes deep into the internet to find answers. Inspired by Perplexity AI, it's an open-source option that not just searches the web but understands your questions. It uses advanced machine learning algorithms like similarity searching and embeddings to refine results and provides clear answers with sources cited.

Using SearxNG to stay current and fully open source, Perplexica ensures you always get the most up-to-date information without compromising your privacy.

## Preview

![video-preview](.assets/perplexica-preview.gif)

## Features

- **Local LLMs**: You can make use local LLMs such as Llama3 and Mixtral using Ollama.
- **Two Main Modes:**
  - **Copilot Mode:** (In development) Boosts search by generating different queries to find more relevant internet sources. Like normal search instead of just using the context by SearxNG, it visits the top matches and tries to find relevant sources to the user's query directly from the page.
  - **Normal Mode:** Processes your query and performs a web search.
- **Focus Modes:** Special modes to better answer specific types of questions. Perplexica currently has 6 focus modes:
  - **All Mode:** Searches the entire web to find the best results.
  - **Writing Assistant Mode:** Helpful for writing tasks that does not require searching the web.
  - **Academic Search Mode:** Finds articles and papers, ideal for academic research.
  - **YouTube Search Mode:** Finds YouTube videos based on the search query.
  - **Wolfram Alpha Search Mode:** Answers queries that need calculations or data analysis using Wolfram Alpha.
  - **Reddit Search Mode:** Searches Reddit for discussions and opinions related to the query.
- **Current Information:** Some search tools might give you outdated info because they use data from crawling bots and convert them into embeddings and store them in a index. Unlike them, Perplexica uses SearxNG, a metasearch engine to get the results and rerank and get the most relevent source out of it, ensuring you always get the latest information without the overhead of daily data updates.

It has many more features like image and video search. Some of the planned features are mentioned in [upcoming features](#upcoming-features).

## Installation

There are mainly 2 ways of installing Perplexica - With Docker, Without Docker. Using Docker is highly recommended.

### Getting Started with Docker (Recommended)

1. Ensure Docker is installed and running on your system.
2. Clone the Perplexica repository:

   ```bash
   git clone https://github.com/ItzCrazyKns/Perplexica.git
   ```

3. After cloning, navigate to the directory containing the project files.

4. Rename the `sample.config.toml` file to `config.toml`. For Docker setups, you need only fill in the following fields:

   - `CHAT_MODEL`: The name of the LLM to use. Like `llama3:latest` (using Ollama), `gpt-3.5-turbo` (using OpenAI), etc.
   - `CHAT_MODEL_PROVIDER`: The chat model provider, either `openai` or `ollama`. Depending upon which provider you use you would have to fill in the following fields:

     - `OPENAI`: Your OpenAI API key. **You only need to fill this if you wish to use OpenAI's models**.
     - `OLLAMA`: Your Ollama API URL. You should enter it as `http://host.docker.internal:PORT_NUMBER`. If you installed Ollama on port 11434, use `http://host.docker.internal:11434`. For other ports, adjust accordingly. **You need to fill this if you wish to use Ollama's models instead of OpenAI's**.

       **Note**: You can change these and use different models after running Perplexica as well from the settings page.

   - `SIMILARITY_MEASURE`: The similarity measure to use (This is filled by default; you can leave it as is if you are unsure about it.)

5. Ensure you are in the directory containing the `docker-compose.yaml` file and execute:

   ```bash
   docker compose up -d
   ```

6. Wait a few minutes for the setup to complete. You can access Perplexica at http://localhost:3000 in your web browser.

**Note**: After the containers are built, you can start Perplexica directly from Docker without having to open a terminal.

### Non-Docker Installation

For setups without Docker:

1. Follow the initial steps to clone the repository and rename the `sample.config.toml` file to `config.toml` in the root directory. You will need to fill in all the fields in this file.
2. Additionally, rename the `.env.example` file to `.env` in the `ui` folder and complete all fields.
3. The non-Docker setup requires manual configuration of both the backend and frontend.

**Note**: Using Docker is recommended as it simplifies the setup process, especially for managing environment variables and dependencies.

## Upcoming Features

- [ ] Finalizing Copilot Mode
- [x] Add settings page
- [x] Adding support for local LLMs
- [ ] Adding Discover and History Saving features
- [x] Introducing various Focus Modes

## Support Us

If you find Perplexica useful, consider giving us a star on GitHub. This helps more people discover Perplexica and supports the development of new features. Your support is appreciated.

## Contribution

Perplexica is built on the idea that AI and large language models should be easy for everyone to use. If you find bugs or have ideas, please share them in via GitHub Issues. For more information on contributing to Perplexica you can read the [CONTRIBUTING.md](CONTRIBUTING.md) file to learn more about Perplexica and how you can contribute to it.

## Help and Support

If you have any questions or feedback, please feel free to reach out to us. You can create an issue on GitHub or join our Discord server. There, you can connect with other users, share your experiences and reviews, and receive more personalized help. [Click here](https://discord.gg/EFwsmQDgAu) to join the Discord server. To discuss matters outside of regular support, feel free to contact me on Discord at `itzcrazykns`.

Thank you for exploring Perplexica, the AI-powered search engine designed to enhance your search experience. We are constantly working to improve Perplexica and expand its capabilities. We value your feedback and contributions which help us make Perplexica even better. Don't forget to check back for updates and new features!
