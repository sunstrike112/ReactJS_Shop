import { atom } from 'recoil';
import { persistAtom } from './recoil-persist';

export const bookingStepState = atom({
  key: 'bookingStep',
  default: 1,
});

export const bookingVehicleState = atom({
  key: 'bookingVehicleState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const bookingVehicleManualState = atom({
  key: 'bookingVehicleManualState',
  default: false,
});

export const bookingServicesState = atom({
  key: 'bookingServicesState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const bookingAppointmentState = atom({
  key: 'bookingAppointmentState',
  default: null,
  effects_UNSTABLE: [persistAtom]
});
