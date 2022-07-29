import React, { useState } from 'react';
import StepNavigation from '../components/stepNavigation/StepNavigation';
import { CheckoutStyles } from '../styles/CheckoutStyles';

const labelArray = ['Dirección de envío', 'Método de pago', 'Confirmar pedido'];

const Checkout = () => {

    const [currentStep, setCurrentStep] = useState(1);

    const updateStep = (step) => {
        setCurrentStep(step);
    }

    return (
        <CheckoutStyles>
            <StepNavigation 
                labelArray={labelArray}
                currentStep={currentStep}
                updateStep={updateStep}
            ></StepNavigation>
            <p>{labelArray[currentStep - 1]}</p>
        </CheckoutStyles>
    );
}

export default Checkout;