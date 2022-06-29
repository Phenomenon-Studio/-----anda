## Introduction

The repository shows a small part of the project/code structure.  The code cannot be installed and used for project security purposes.
The code is of a demonstration nature and is not relevant to the project. 

The stack and project description is described below.


## Used

1. Framework [Next.js](https://nextjs.org)
2. Style [CSS Modules](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet)
3. Blockchain [MetaMask](https://metamask.io), [Web3](https://web3js.readthedocs.io/en/v1.7.4), [Pancake](https://pancakeswap.finance)
4. Linting [Stylelint](https://stylelint.io), [ESLint](https://eslint.org)
5. CI [Husky](https://typicode.github.io/husky/#), [Commit Lint](https://commitlint.js.org/#)
6. DX [Prettier](https://prettier.io)


## Project description

In terms of the current project, a custom design of the Landing page using Next.js for Front-end was developed. The design was complicated with animations that were done by using framer motion. The Admin panel with multi-languages was developed on Laravel.
The pancake.finance API was integrated for Swap, Stake, LP and Farming functionality. Metamask serves as a Login and allows user make operations in Binance Smart Chain Network with BEP-20 and ERC-72 protocols. The Smart contracts for the custom token and for operations with it were developed.
The Graph from the Pancake platform wasn’t allowed to parse thus we integrated Proxy server with Redis cashing.
