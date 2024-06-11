
![fotor-ai-202406072314](https://github.com/ICardosoRamos/ww_financial_control/pwa/images/logo_ww_financial_control.png)

# Wealth-Wise Financial Control

A group-based financial control project, for the ones who wants to shares its financial records with someone.
## Intro

My name is Irwyng and this is a simple financial controller helpful app. I hope u enjoy it!

In 2023 i had an idea to start some money saving, with the goal of getting some passive rentability. Then i started to download every finance controller app that i encountered in the app store, and each one has its differences, of course, and each one had its pros and cons, but for me the main dislike was that I couldn't share my income and expenses with anyone, like, I wanted to somehow be able to share my records in a kind of group or connection, so that others people, as in a family group, could interact, modify and register their own records, as if the money were one for all.

As I couldn't find any that could do this, at least not for free (and don't get me wrong, I bet there must be an app somewhere that does this and possibly does it perfectly, I'm just too lazy to go to the meeting him), I decided to make my own, both to be able to use it in production (one day) and to show it in my portfolio here on GitHub!
## Running Locally

Cloning project(with SSH)

```bash
  git clone git@github.com:ICardosoRamos/ww_financial_control.git
```

Get into the project's home directory

```bash
  cd ww_financial_control/
```

Start the server(backend)

```bash
  docker compose up --build
```
or
```bash
  docker-compose up --build
```

Start the server(frontend)

```bash
  cd pwa/ && npm install && npx expo start
```


## Stack

**Front-end:** React-Native, Expo, Native-Base

**Back-end:** Python, Django, Postgresql, PG-Admin


<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge" height="30" alt="typescript logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/React%20Native-61DAFB?logo=react&logoColor=black&style=for-the-badge" height="30" alt="react native logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white&style=for-the-badge" height="30" alt="html5 logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white&style=for-the-badge" height="30" alt="css3 logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white&style=for-the-badge" height="30" alt="python logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/Android-3DDC84?logo=android&logoColor=black&style=for-the-badge" height="30" alt="android logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/Apple-000000?logo=apple&logoColor=white&style=for-the-badge" height="30" alt="apple logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=for-the-badge" height="30" alt="docker logo"  />
  <img width="12" />
  <img src="https://img.shields.io/badge/Django-092E20?logo=django&logoColor=white&style=for-the-badge" height="30" alt="django logo"  />
</div>

