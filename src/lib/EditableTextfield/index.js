import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import { Input } from '@collab-ui/react';

/**
 * @category controls
 * @component editable-textfield
 * @variations collab-ui-react
 */

class EditableTextfield extends React.PureComponent {
  static displayName = 'EditableTextfield';

  state = {
    isEditing: false,
    inputText: this.props.inputText,
  };

  componentDidUpdate = () => {
    if (this.state.isEditing && this.editText) {
      this.editText.focus();
    }
  }

  handleDoneEditing = value => {
    const { handleDoneEditing } = this.props;

    this.setState({
      isEditing: false,
      inputText: value,
    });

    if (handleDoneEditing) {
      handleDoneEditing(value);
    }
  }

  handleClick = () => {
    const { disabled } = this.props;

    if(disabled) {
      return;
    } else {
      this.setState({
        isEditing: true,
      });
    }
  }

  handleKey = e => {
    const { disabled } = this.props;

    e.stopPropagation();
    e.preventDefault();

    if(disabled) {
      return;
    } else {
      this.setState({
        isEditing: true
      });
    }
  }

  handleDoneKeyDown = e => {
    if (e.keyCode === 27) {
      this.setState({
        isEditing: false,
      });
    } else if (e.keyCode === 13) {
      this.handleDoneEditing(e.target.value);
    }
  }

  render() {
    const { className, ...props } = this.props;
    const { isEditing, inputText } = this.state;

    const otherProps = omit({...props}, [
      'disabled',
      'handleDoneEditing',
      'inputText',
    ]);


    return(
      <div>
        {isEditing &&
          <Input
            className={
              'cui-editable-textfield' +
              ' cui-editable-textfield__editing' +
              `${className && ` ${className}` || ''}`
            }
            inputRef={(input) => { this.editText = input; }}
            defaultValue={inputText}
            onDoneEditing={this.handleDoneEditing}
            onKeyDown={this.handleDoneKeyDown}
            {...otherProps}
          />
        }
        {!isEditing &&
          <span
            role='button'
            tabIndex={0}
            className={
              'cui-editable-textfield' +
              ' cui-editable-textfield__span' +
              `${className && ` ${className}` || ''}`
            }
            onClick={this.handleClick}
            onKeyPress={this.handleKey}
          >
            {inputText}
          </span>
        }
      </div>
    );
  }
}

EditableTextfield.propTypes = {
  /**
   * css class names
   */
  className: PropTypes.string,
  /**
   * optional disable
   */
  disabled: PropTypes.bool,
  /**
   * optional function for blur
   */
  handleDoneEditing: PropTypes.func,
  /**
   * text to be shown
   */
  inputText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

EditableTextfield.defaultProps = {
  className: '',
  disabled: false,
  handleDoneEditing: null,
  inputText: '',
};

export default EditableTextfield;

/**
* @name Default EditableTextfield
* @description default
*
* @category controls
* @component editable-textfield
* @section default
*
* @js

export default class PlaygroundComponent extends React.Component {
  valueChange = (value) => {
    newValue = value;
  }

  render() {
    return (
      <div>
        <div className="docui-example docui-example--spacing" style={{padding: '16px'}}>
          <EditableTextfield inputText='Hello World' handleDoneEditing={(value) => console.log(value)}/>
        </div>
        <div className='cui--dark docs-example--dark' style={{padding: '16px'}}>
          <EditableTextfield inputText='Hello Dark World'/>
        </div>
    </div>
    );
  }
}

**/
