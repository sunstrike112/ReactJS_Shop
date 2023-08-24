// Import from antd
import { Row, Col } from 'antd';
import { ProgressStep } from './progress-step.organism';

import { useState } from 'react';

/* eslint-disable-next-line */
export interface ProgressBarProps {
  activeStep: number;
  style?: any;
  children?: any;
}

export function ProgressBar(props: ProgressBarProps) {
  const [names, setNames] = useState(['Vehicle', 'Services', 'Appointment', 'Contact & Book']);
  const [steps, setSteps] = useState(4);
  const [activeStep, setActiveStep] = useState(props.activeStep);

  const stepSpan = 24 / steps;

  return (
    <>
      <Row style={props.style}>
        {[...Array(steps)].map((x, i) => {
          return (
            <Col span={stepSpan}>
              <ProgressStep step={i+1} stepName={names[i]} active={i+1 === activeStep}/>
            </Col>
          );
        })}
      </Row>
      <style jsx global>{`
        
      `}</style>
    </>
  );
}

export default ProgressBar;