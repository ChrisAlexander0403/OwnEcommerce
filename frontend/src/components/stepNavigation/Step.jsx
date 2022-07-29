import React from 'react';
import { StepBlock } from './StepNavigationStyles';

const Step = (props) => {
  return (
    <StepBlock className={`step-block ${props.selected && "selected"}`} selected={props.selected}>
        <div className="circle-wrapper" onClick={() => props.updateStep(props.index + 1)}>
            <div className="circle">{props.index + 1}</div>
        </div>
        {/* <span>{props.label}</span> */}
    </StepBlock>
  );
}

export default Step;