import React from 'react';

import { BookingContent, VehicleStep } from '@ss-fe-fw/booking/organisms';

export function Index() {
  return (
    <BookingContent currentStep={1}>
      <VehicleStep/>
    </BookingContent>
  );
}

export default Index;
