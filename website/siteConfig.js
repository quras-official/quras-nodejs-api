/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * Copyright (c) 2018-2019, Quras Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'Quras Light Wallet',
    image: 'http://13.230.62.42/quras/img/wallet_icon.png',
    infoLink: 'http://13.230.62.42/quras-light-wallet.html',
    pinned: true
  }
]

const siteConfig = {
  title: '' /* title for your website */,
  tagline: 'Javascript SDK for Quras blockchain',
  url: 'http://13.230.62.42' /* your website url */,
  baseUrl: '/quras-js/' /* base url for your project */,
  projectName: 'quras-js',
  headerLinks: [
    { doc: 'installation', label: 'Docs' },
    { doc: 'api-index', label: 'API' },
    { doc: 'whitepaper/wp-introduction', label: 'TechnicalPaper'},
    { doc: 'changelog-latest', label: 'Changelog' },
    { page: 'help', label: 'Help' },
    { languages: true }
  ],
  users,
  /* path to images for header/footer */
  headerIcon: 'img/logo5.png', 
  footerIcon: 'img/logo5.png',
  favicon: 'img/favicon.png',
  /* colors for website */
  colors: {
    primaryColor: '#212146',
    secondaryColor: '#2b2b5e'
  },
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' dotFund, Quras Dev',
  organizationName: 'QurasDev', // or set an env variable ORGANIZATION_NAME
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'dracula'
  },
  onPageNav: 'separate',
  scripts: ['https://buttons.github.io/buttons.js'],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://bitbucket.org/qurasblockchain'
}

module.exports = siteConfig
