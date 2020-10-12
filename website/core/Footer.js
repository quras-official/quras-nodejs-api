/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')

class Footer extends React.Component {
  vDocs = this.props.language == 'ja'? '文書' : 'Docs'
  vGettingStarted = this.props.language == 'ja'? '開始' : 'Getting Started'
  vGuide = this.props.language == 'ja'? 'ガイド' : 'Guides'
  vApiReference = this.props.language == 'ja'? 'API参考文書' : 'API Reference'
  vUserShowcase = this.props.language == 'ja'? 'ユーザーショーケース' : 'User Showcase'
  docUrl (doc, language) {
    const baseUrl = this.props.config.baseUrl
    return baseUrl + 'docs/' + (language ? language + '/' : '') + doc
  }

  pageUrl (doc, language) {
    const baseUrl = this.props.config.baseUrl
    return baseUrl + (language ? language + '/' : '') + doc
  }

  render () {
    const currentYear = new Date().getFullYear()
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width='400'
              />
            )}
          </a>
          <div>
            <h5>{this.vDocs}</h5>
            <a href={this.docUrl('installation.html', this.props.language)}>
              {this.vGettingStarted}
            </a>
            <a href={this.docUrl('basic_sendasset.html', this.props.language)}>
              {this.vGuide}
            </a>
            <a href={this.docUrl('api-index.html', this.props.language)}>
              {this.vApiReference}
            </a>
          </div>
          <div>
            <h5>Community</h5>
            <a href={this.pageUrl('users.html', this.props.language)}>
              {this.vUserShowcase}
            </a>
            {/*
            <a
              href="https://quras.stack.exchange/"
              target="_blank">
              Stack Overflow
            </a>
            <a href="https://www.reddit.com/r/QURAS/" target="_blank">QURAS Reddit</a>
             */}
          </div>
          <div>
            <h5>More</h5>
            <a href="https://quras.io/" target="_blank" >QURAS</a>
            <a href="https://bitbucket.org/qurasblockchain/quras-js" target="_blank" >BitBucket</a>
            {/* 
            <a
              className="github-button"
              href={this.props.config.repoUrl}
              data-icon="octicon-star"
              data-count-href="/quras-js/src"
              data-show-count={true}
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub">
              Star
            </a>
            */}
          </div>
        </section>

        <a
          href="https://quras.io/team.html"
          target="_blank"
          className="fbOpenSource">
          <img
            src={this.props.config.baseUrl + 'img/coz_med.png'}
            alt="Quras Dev"
            width="150"
            height="150"
          />
        </a>
        <section className="copyright">
          Copyright &copy; {currentYear} Quras Dev
        </section>
      </footer>
    )
  }
}

module.exports = Footer
