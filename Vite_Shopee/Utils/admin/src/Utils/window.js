import { MEDIA_WIDTHS } from 'Themes'

const MobileDevice = (width) => width > MEDIA_WIDTHS.upToUnderExtraSmall && width <= MEDIA_WIDTHS.upToExtraSmall
const TabletDevice = (width) => width > MEDIA_WIDTHS.upToExtraSmall && width <= MEDIA_WIDTHS.upToSmall
const LaptopDeice = (width) => width > MEDIA_WIDTHS.upToSmall && width <= MEDIA_WIDTHS.upToMedium
const DesktopDevice = (width) => width > MEDIA_WIDTHS.upToMedium && width <= MEDIA_WIDTHS.upToLarge
const ExtraDesktopDevice = (width) => width > MEDIA_WIDTHS.upToLarge

export const verifyWindowSize = {
  MobileDevice,
  TabletDevice,
  LaptopDeice,
  DesktopDevice,
  ExtraDesktopDevice
}
