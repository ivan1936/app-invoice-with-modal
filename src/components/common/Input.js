import React, { useReducer, useEffect, Fragment } from 'react';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      };
    default:
      return state;
  }
};

const Input = props => {
  
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue.toString() : '',
    isValid: props.initiallyValid,
    touched: false
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = e => {
    let text = e.target.value
    let isValid = true;

    if (props.required && text.trim().length === 0) {
      isValid = false;
    }    
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <Fragment>
      <div>
        <p style={props.colorLabel}>{props.label}</p>
        <input style={props.style}
          value={inputState.value}
          onChange={textChangeHandler}
          onBlur={lostFocusHandler}
        />
    </div>
      <div>
      {!inputState.isValid && inputState.touched && (
        <div>
          <p>{props.errorText}</p>
        </div>
      )}
    </div>
    </Fragment>    
  );
};

export default Input;