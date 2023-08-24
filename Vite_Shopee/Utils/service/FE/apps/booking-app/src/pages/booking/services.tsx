import React from 'react';

import { BookingContent, ServicesStep } from '@ss-fe-fw/booking/organisms';

export function Index() {
  return (
    <BookingContent currentStep={2}>
      <ServicesStep/>
    </BookingContent>
  );
}

export default Index;
