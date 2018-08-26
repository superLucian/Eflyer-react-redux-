import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Section extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    collapsible: PropTypes.bool,
    defaultCollapsed: PropTypes.bool
  };

  static defaultProps = {
    collapsible: true,
    defaultCollapsed: true
  }

  constructor(...args) {
    super(...args);

    this.state = {
      collapsed: this.props.defaultCollapsed
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const { title, collapsible, defaultCollapsed, className, ...props } = this.props;
    const { collapsed } = this.state;
    let _className = 'section';
    if (collapsible) {
      _className += ' collapsible';
      _className += collapsed ? ' collapsed' : ' expanded';
    }

    return (
      <div {...props} className={_className + ' ' + (className || '')}>
        <div className="title clearfix" onClick={this.toggle}>
          {title}
          {
            collapsible ?
              <i className={'fa ' + (collapsed ? 'fa-plus' : 'fa-minus')}/>
              : null
          }
        </div>
        <div className="content">
          <div className="content-inner">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
