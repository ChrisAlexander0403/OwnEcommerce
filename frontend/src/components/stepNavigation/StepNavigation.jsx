import React from 'react';
import Step from './Step';
import { StepWrapper } from './StepNavigationStyles';

const StepNavigation = (props) => {

  return (
    <StepWrapper>
      {props.labelArray.map((item, index) => {
        return (
          <Step 
            key={index} 
            index={index}
            label={item} 
            selected={props.currentStep === index + 1}
            updateStep={props.updateStep}
          />
        )
      })}
    </StepWrapper>
  );
}

export default StepNavigation;