[![GitHub forks](https://img.shields.io/github/forks/IanGelfand/financeapp?style=for-the-badge)](https://github.com/IanGelfand/financeapp/network)
[![GitHub stars](https://img.shields.io/github/stars/IanGelfand/financeapp?style=for-the-badge)](https://github.com/IanGelfand/financeapp/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/IanGelfand/financeapp?style=for-the-badge)](https://github.com/IanGelfand/financeapp/issues)
<!-- ![LinkedIn](https://www.linkedin.com/in/gelfandian/) -->

<!-- PROJECT LOGO -->
<br />
<p align="center">
   <img src="https://github.com/IanGelfand/financeapp/blob/master/public/0b8908b63510393bc2c4c3346785b69c.png" alt="Logo">
  <p align="center">
    <a href="https://iangelfand-profinance.herokuapp.com">View Demo</a>
    ·
    <a href="https://github.com/IanGelfand/financeapp/issues">Report Bug</a>
    ·
    <a href="https://github.com/IanGelfand/financeapp/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Profinance][screenshot]](https://example.com)

### Built With

* [Plaid](https://plaid.com)
* [React](https://reactjs.org)
* [Redux](https://redux.js.org)
* [Express](https://expressjs.com)
* [Mongoose](https://mongoosejs.com)
* [Nodejs](https://nodejs.org/en/)




<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

[Plaid](https://plaid.com)

 You will need to create an account with [Plaid](https://plaid.com) to generate your api keys.
 
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/IanGelfand/financeapp.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a .env file in the root and enter
   ```sh
   PLAID_CLIENT_ID=YourPlaidClientId
   PLAID_SECRET=YourPlaidSecretKey
   PLAID_ENV=sandbox
   DB=YourMongoDB
   ```
4. Open two terminal windows
    ```sh
    npm run start-server
    ```
    ```sh
    npm run build-client-watch
    ```
 5. Head over to `localhost:3000`
 6. When logging into plaid
    ```sh
    username: user_good
    password: pass_good
    ```

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a list of proposed features (and known issues).


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
