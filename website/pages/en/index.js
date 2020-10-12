/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * Copyright (c) 2019-present, Quras Dev.
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')

const CompLibrary = require('../../core/CompLibrary.js')
const MarkdownBlock = CompLibrary.MarkdownBlock /* Used to read markdown */
const Container = CompLibrary.Container
const GridBlock = CompLibrary.GridBlock

const translate = require('../../server/translate.js').translate

const siteConfig = require(process.cwd() + '/siteConfig.js')

function imgUrl (img) {
  return siteConfig.baseUrl + 'img/' + img
}

function docUrl (doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc
}

function pageUrl (page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page
}

class Button extends React.Component {
  render () {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    )
  }
}

Button.defaultProps = {
  target: '_self'
}

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
)

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src} />
  </div>
)

const ProjectTitle = props => (
  <h2 className="projectTitle">
    {siteConfig.title}
    <small><translate>Javascript SDK for Quras blockchain</translate></small>
  </h2>
)

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
)

class HomeSplash extends React.Component {
  render () {
    let language = this.props.language || ''
    return (
      <SplashContainer>
        <Logo img_src={imgUrl('logo4.png')} />
        <div className="inner">
          <ProjectTitle />
          <PromoSection>
            <Button href={docUrl('installation.html', language)}><translate>Get Started</translate></Button>
            <Button href={docUrl('basic_sendasset.html', language)}><translate>Tutorial</translate></Button>
            <Button href={docUrl('api-index.html', language)}><translate>API</translate></Button>
          </PromoSection>
        </div>
      </SplashContainer>
    )
  }
}

const Block = props => (
  <Container
    padding={['bottom', 'top']}
    id={props.id}
    background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
)

const Features = props => (
  <Block layout="fourColumn">
    {[
      {
        content: <translate>Key generation, manipulation and encryption</translate>,
        image: imgUrl('logo1.png'),
        imageAlign: 'top',
        title: <translate>Wallet</translate>
      },
      {
        content: <translate>Transaction creation, serialization and signing.</translate>,
        image: imgUrl('logo2.png'),
        imageAlign: 'top',
        title: <translate>Transactions</translate>
      },
      {
        content: <translate>Various API integration required for light wallet support</translate>,
        image: imgUrl('logo3.png'),
        imageAlign: 'top',
        title: <translate>Integration</translate>
      }
    ]}
  </Block>
)

const LearnHow = props => (
  <Block background="light">
    {[
      {
        content: <translate>The SDK is made with both beginners and experts in mind. Start off with playing with the high level semantic API. Once you are comfortable, dive in deep and code your own custom tools with the modules provided.</translate>,
        image: imgUrl('logo1.png'),
        imageAlign: 'right',
        title: <translate>Made for everyone</translate>
      }
    ]}
  </Block>
)

const TryOut = props => (
  <Block id="try">
    {[
      {
        content: <translate>Get your feet wet with our simple quickstart or follow one of our tutorials!</translate>,
        image: imgUrl('quras_code.png'),
        imageAlign: 'left',
        title: <translate>Try it Out</translate>
      }
    ]}
  </Block>
)

const Description = props => (
  <Block background="dark">
    {[
      {
        content: <translate>We are open source and MIT-licensed, meaning anyone can use this library for free without reprecussions! This project is developed and maintained under the QURAS Dev Team.</translate>,
        image: imgUrl('coz_med.png'),
        imageAlign: 'right',
        title: <translate>Open source</translate>
      }
    ]}
  </Block>
)

const Showcase = props => {
  if ((siteConfig.users || []).length === 0) {
    return null
  }
  const showcase = siteConfig.users
    .filter(user => {
      return user.pinned
    })
    .map((user, i) => {
      return (
        <a href={user.infoLink} key={i}>
          <img src={user.image} title={user.caption} />
        </a>
      )
    })

  return (
    <div className="productShowcaseSection paddingBottom">
      <h2><translate>Who's Using This?</translate></h2>
      <p><translate>This project is used by all these people</translate></p>
      <div className="logos">{showcase}</div>
      <div className="more-users">
        <a className="button" href={pageUrl('users.html', props.language)}>
          <translate>More quras.js Users</translate>
        </a>
      </div>
    </div>
  )
}

class Index extends React.Component {
  render () {
    let language = this.props.language || ''

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <Features />
          <LearnHow />
          <TryOut />
          <Description />
          <Showcase language={language} />
        </div>
      </div>
    )
  }
}

module.exports = Index
