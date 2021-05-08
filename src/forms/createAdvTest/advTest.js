import React from 'react';
import './advTest.module.scss';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
export default class AdvancedMath extends React.Component {
  constructor(props) {
    super(props);
    this.position = React.createRef();
  }
  state = {
    cursorPosition: 0
  };

  checkPosition = (e) => {
    this.setState({
      cursorPosition: this.position.current.selectionStart
    }) 
  };

  btnSymbol = () => {
    const symbols = [
      '\u002B',
      '\u2212',
      '\u00D7',
      '\u00F7',
      '\u221A',
      '\u0025',
      '\u003E',
      '\u003C',
      '\u0B75',
      'x\u207F'
    ];
    let btn = symbols.map((field, i) => {
      return (
        <button
          key={i}
          className="adv_btn"
          onClick={(e) => {
            e.preventDefault();
            this.props.store.AdvancedMath.Form.map((fieldVal) => {
              console.log(fieldVal.value.length)
              this.props.store.AdvancedMath.change((this.position.current.value += field));
            });
          }}
        >
          {field}
        </button>
      );
    });

    return btn;
  };
  textArea = () => {
    const store = this.props.store.AdvancedMath;
    let textarea = store.Form.map((field) => {
      return (
        <label key={field.name} className="advanceArea">
          <div className="advanceArea_label">
            <p> {field.label} </p>
          </div>
          <textarea
            ref={this.position}
            aria-hidden="true"
            className="advanceArea_area"
            type={field.type}
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => store.change(e.target.value)}
            onBlur={(e) => this.checkPosition()}
            onPointerLeave={(e) => this.checkPosition()}
          ></textarea>
          <div
            className="advanceArea_view"
            dangerouslySetInnerHTML={{ __html: field.value }}
          ></div>
        </label>
      );
    });

    return textarea;
  };

  answerField = () => {
    const store = this.props.store.AdvancedMath;
    let formFields = store.FormAnswer.map((field) => {
      return (
        <label key={field.name} className="advancedInput">
          <div className="advancedInput_label">
            <p className="errorMessage">
              {field.valid === null || field.valid ? '' : field.errorMessage}
            </p>
            <p> {field.label} </p>
          </div>

          <input
            className="advancedInput_input"
            type={field.type}
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => store.changeInput(e.target.value)}
          ></input>
        </label>
      );
    });
    return formFields;
  };

  render() {
    /*let b = "<div>LALA</div>";
    <div dangerouslySetInnerHTML={{ __html: b }} />*/

    return (
      <React.Fragment>
        {this.textArea()}
        <div className="adv_btnfield">{this.btnSymbol()}</div>
        {this.answerField()}
      </React.Fragment>
    );
  }
}

/*
<textarea
            className="advanceArea_area"
            type={field.type}
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => store.change(e.target.value)}
          ></textarea>
*/
