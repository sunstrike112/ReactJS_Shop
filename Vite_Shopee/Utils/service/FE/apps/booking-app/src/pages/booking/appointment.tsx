import React from 'react';

import { BookingContent, AppointmentStep } from '@ss-fe-fw/booking/organisms';

export function Index() {
  return (
    <BookingContent currentStep={3}>
      <AppointmentStep/>
    </BookingContent>
  );
}

export default Index;
