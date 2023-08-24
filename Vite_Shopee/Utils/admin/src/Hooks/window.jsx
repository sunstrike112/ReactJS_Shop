import { useState, useEffect, useMemo } from 'react'
import { MEDIA_WIDTHS } from 'Themes'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height
  }
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobileDevice = useMemo(() => windowDimensions.width > MEDIA_WIDTHS.upToUnderExtraSmall
    && windowDimensions.width <= MEDIA_WIDTHS.upToExtraSmall, [windowDimensions])

  const isTabletDevice = useMemo(() => windowDimensions.width > MEDIA_WIDTHS.upToExtraSmall
  && windowDimensions.width <= MEDIA_WIDTHS.upToSmall, [windowDimensions])

  const isLaptopDeice = useMemo(() => windowDimensions.width > MEDIA_WIDTHS.upToSmall
  && windowDimensions.width <= MEDIA_WIDTHS.upToMedium, [windowDimensions])

  const isDesktopDevice = useMemo(() => windowDimensions.width > MEDIA_WIDTHS.upToMedium
  && windowDimensions.width <= MEDIA_WIDTHS.upToLarge, [windowDimensions])

  const isExtraDesktopDevice = useMemo(() => windowDimensions.width > MEDIA_WIDTHS.upToLarge, [windowDimensions])

  return { windowDimensions, isMobileDevice, isTabletDevice, isLaptopDeice, isDesktopDevice, isExtraDesktopDevice }
}
