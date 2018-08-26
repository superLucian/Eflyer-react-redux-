import React, { Component } from 'react';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import 'react-simple-dropdown/styles/Dropdown.css';

export default class ImageDropdown extends Component {

  static defaultProps = {
    idField: 'title',
    urlField: 'thumbnail',
    className: ''
  };

  render() {
    const {idField, urlField, options, selected, onSelect, className, ...props} = this.props;

    return (
      <Dropdown className={'image-dropdown ' + className} {...props}>
        <DropdownTrigger>
          Cover
        </DropdownTrigger>
        <DropdownContent>
          Hello
        </DropdownContent>
      </Dropdown>
    );
  }
}
