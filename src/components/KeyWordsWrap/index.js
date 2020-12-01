import React, {Component} from 'react';

import styles from './index.module.less';

class KeyWordsWrap extends Component {
  componentDidMount() {

  }


  render() {
    return (
      <div className={styles.KeyWordsWrap} style={this.props.style}>
        {this.props.children}
      </div>
    )
  }
}

export default KeyWordsWrap;
