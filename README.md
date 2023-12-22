# Google Scraper

## Table of content

- [Table of content](#table-of-content)
- [Introduction](#introduction)
- [Preview](#preview)
- [Setup, build and Run](#setup--build-and-run)
  - [Database](#database)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Backend APIs](#backend-apis)
  - [User and Authentication](#user-and-authentication)
    - [Sign up](#sign-up)
    - [Sign in](#sign-in)
    - [Get signed-in user information](#get-signed-in-user-information)
  - [Search results](#search-results)
    - [Scrape single keyword](#scrape-single-keyword)
    - [Fetch scraped search results](#fetch-scraped-search-results)
    - [Fetch list of all keywords](#fetch-list-of-all-keywords)
    - [Fetch search result by keywords](#fetch-search-result-by-keywords)
    - [Fetch HTML by search result ID](#fetch-html-by-search-result-id)
    - [Upload CSV of keywords](#upload-csv-of-keywords)
  - [Scraping Scheduler](#scraping-scheduler)
    - [Restart Scraping Scheduler](#restart-scraping-scheduler)
- [Solutions](#solutions)
  - [Scraping Google's page](#scraping-google-s-page)
  - [Avoiding spam detection](#avoiding-spam-detection)

## Introduction

- The goal of this project is to find a way to scrape interesting information from Google's search result page. This includes:
  - The total results count.
  - The number of links on the first page.
  - The number of AdWords in the first page.
- Tech stack:
  - Database: PostgreSQL
  - Backend: Node, TypeScript, DrizzleORM, Axios, Bcrypt and more.
  - Frontend: TypeScript, React, Axios, SASS, Tailwind, Material UI and more.

## Preview

Demo video [👉 here](https://drive.google.com/file/d/1B0h_3sg_O17NylAiZeV9hNfR8maoRQCl/view?usp=sharing)
![image](https://github.com/CuteTN/google-scraper/assets/52530644/a70c8286-674d-4bfd-8800-e119f5cfa74b)
![image](https://github.com/CuteTN/google-scraper/assets/52530644/c8783a45-124a-4a01-99ee-a2d340cf4df1)
![image](https://github.com/CuteTN/google-scraper/assets/52530644/366d3f91-0645-4aed-9697-2bf698f18db3)

## Setup, build and Run

### Database

- Creating database

```sql
create database google_scraper;
```

- Creating tables (this script can be found in `create-db.postgres`):

```sql
create table if not exists app_user (
  id varchar(45) not null primary key,
  username varchar(100) not null,
  hashed_password varchar(100) not null
);

create table if not exists app_search_result (
  id varchar(45) not null primary key,
  keyword varchar(200) not null,
  adwords_count smallint,
  links_count smallint,
  results_count bigint,
  html varchar,
  pending boolean not null default true
);
```

### Backend

- Change to `server` directory

```bash
cd server/
```

- Install dependencies:

```bash
npm install
```

- Build to JavaScript (this will output to `server/dist` folder):

```bash
npm run build
```

- Run (port 5000):

```bash
npm start
```

- Run with watch mode (port 5000):

```bash
npm run dev
```

### Frontend

- Change to `client` directory

```bash
cd client/
```

- Install dependencies:

```bash
npm install
```

- Run (port 3000):

```bash
npm start
```

## Backend APIs

General notes:

- If an API requires authorization, the header field `Authorization` must be included in the form `bearer {token}` (without the braces). In case this header field is missing or invalid, the server will response with status code `401`.
- If any unexpected and uncaught error occurs, no specific errors will be responded to client to avoid sensitive data leaking, instead, only status code `500` would be sent.

### User and Authentication

#### Sign up

- Path: `[POST] /v1/users/sign-up`
- Authorization: not required.
- Request body: `JSON`

```json
{
  "username": string,
  "password": string
}
```

#### Sign in

- Path: `[POST] /v1/users/sign-in`
- Authorization: not required.
- Request body: `JSON`

```json
{
  "username": string,
  "password": string
}
```

#### Get signed-in user information

- Path: `[GET] /v1/users/my-info`
- Authorization: required.

### Search results

#### Scrape single keyword

- Path: `[POST] /v1/search-results/scrape-single`
- Authorization: required.
- Request body: `JSON`

```json
{
  "keyword": string,
}
```

#### Fetch scraped search results

- Path: `[POST] /v1/search-results/search`
- Authorization: required.
- Request body: `JSON`

```json
{
  "text"?: string (default ""),
  "page"?: number (default 0),
  "limit"?: number (default 10),
}
```

#### Fetch list of all keywords

- Path: `[GET] /v1/search-results/all-keywords`
- Authorization: required.

#### Fetch search result by keywords

- Path: `[GET] /v1/search-results/info/:keyword`
- Authorization: required.

#### Fetch HTML by search result ID

- Path: `[GET] /v1/search-results/html/:searchResultId`
- Authorization: required.

#### Upload CSV of keywords

- Path: `[POST] /v1/search-results/upload-csv`
- Authorization: required.
- Request body: `FormData`

```json
{
  "file": File
}
```

- Note: the content in each cell is limited in alphanumerics, spaces, plus, hyphen, comma. Invalid keywords will be ignored without reporting errors. The delimiter of the CSV file must be comma.

### Scraping Scheduler

#### Restart Scraping Scheduler

- Path: `[POST] /v1/scraping-scheduler/restart`
- Authorization: required.

## Solutions

### Scraping Google's page

- Refer to [this file](https://github.com/CuteTN/google-scraper/blob/main/server/src/services/google-scraper.service.ts) for full implementation.
- The keyword is first broken down into google's `q` query, by splitting it by spaces and joining by a plus sign. This is going to be include in request to the URL: `https://www.google.com/search` to retrieve its HTML. In addition, `User-Agent` header field must be set the same as the ones sent from Browser. Finally, include the `hl=en` query to force the search result to be in English. All of this setup is required for consistent scraping logic, as Google will response differently without any of the steps.
- **Links count**: Count all `<a>` tags in the DOM.
- **Results count**: Find the `<div>` with `id="result-stats"`, in its inner HTML, find the **first digit** and grab until the next space character.
- **AdWords count**: Count all `<div>` that has the field `data-text-ad`.
- All of the strategy above is completely based on observation on different search result pages, thus not proven.

### Avoiding spam detection

- Refer to [this file](https://github.com/CuteTN/google-scraper/blob/main/server/src/services/google-scraping-scheduler.service.ts) for full implementation.
- **Randomized time interval method** is chosen. Proxy rotation was considered, however, it's unreliable to have a list of fixed proxy IPs, but fetching a new list of proxies can be counted as using a third-party.
- All of the keywords extracted from the CSV will be saved to DB as `Pending` state. This list is also be appended to a queue of pending keywords to scrape (hereby referred as "The Queue"). The keywords in the Queue is processed in sequential order. If there's a failure while scraping data, this can be due to Google's blocking or from invalid data, the keyword would be added at the end of the Queue. The concept **fail streak** is also introduced to keep track of the number of failed scraping attempts in a row. If the fail streak is too high, the scheduler will automatically terminate itself to avoid IP ban or broken data. This can be restarted manually by using the restart scraping scheduler API.
- To ensure the randomness of the delay time, 3 layers of heuristic calculation have been created (invented by myself, thus not proven).
  - Layer #1 - **Fail streak time**: it's obvious that we need to increase the delay time after getting blocked by google. The amount of delay time should grow exponentially, while it's must also be unpredictably and not too fast, which can lead to impractical delay time. Therefore, the **Fibonacci sequence** was chosen on those criteria. The formula is `failStreakTime = fibonacci[failStreak] * constant`.
  - Layer #2 - **Randomized time**: Instead of using the naive `Math.random()`, it's better to use the average of 2 random numbers. This is done to ensure the randomized time not varying too much, as a consequence of [normal distribution](https://en.wikipedia.org/wiki/Normal_distribution). Thus ensures more consistent delay time.
  - Layer #3 - **Cycled time**: The `Math.random` function is known to rely on a weak pseudo-random number generator. Therefore, this layer is added to make it even more unpredictable. The formula is just having the powers of a constant, under the modulo of another constant (and this should be a prime).
- The delay time is then defined as the sum of these 3 values. From experiment run, it is expected to wait for 20s-25s on average for each keyword (if not getting blocked), which can be slow for huge data. However, all of the constants can be fine-tuned to gain faster time at the cost of more chance of getting detected as spam.
