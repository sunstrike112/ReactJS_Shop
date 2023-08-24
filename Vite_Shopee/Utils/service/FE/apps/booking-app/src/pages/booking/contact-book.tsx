import React from 'react';

import { BookingContent, ContactBookStep } from '@ss-fe-fw/booking/organisms';

export function Index() {
  return (
    <BookingContent currentStep={4}>
      <ContactBookStep/>
    </BookingContent>
  );
}

export default Index;
