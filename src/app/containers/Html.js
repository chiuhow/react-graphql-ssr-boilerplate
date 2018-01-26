import React, { Component } from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import config from 'config';
import moment from 'moment';

class Html extends Component {
  render() {
    const { content, helmet, store, state, bundles } = this.props;


    const scripts = bundles.map(bundle => <script src={`${config.get('siteUrl')}${bundle.file}`} />);

    return (
      <html lang="en-US">
        <head>
          <title />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href={`${config.get('siteUrl')}style.css`} />
          <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
          <script src="https://apis.google.com/js/api:client.js" />
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
          <script dangerouslySetInnerHTML={{ __html: `window.INITIAL_STATE=${serialize(store.getState())};` }} />
          <script dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
          }}
          />
          <script type="text/javascript" src={`${config.get('siteUrl')}bundle.js?${moment.now()}`} />
          {scripts}
          <script>window.main();</script>
        </body>
      </html>
    );
  }
}

Html.propTypes =
{
  store: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,

};

export default Html;
