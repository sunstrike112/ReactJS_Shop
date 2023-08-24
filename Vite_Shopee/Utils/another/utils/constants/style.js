const COLORS = {
  blue_primary: '#1B2759',
  prime_shade_1: '#3A4576',
  prime_shade_2: '#586392',
  prime_shade_3: '#7782AF',
  prime_shade_4: '#8691BD',
  prime_shade_5: '#95A0CB',
  prime_shade_6: '#A5AFDA',
  prime_shade_7: '#B4BEE8',
  prime_shade_8: '#E3E8FF',
  primary_25: '#DFEDFD',
  primary_400: '#4192F2',
  primary_800: '#0D2C6B',
  primary_900: '#0A458B',
  white: 'white',
  master: '#4472C4',
  business: '#DDEBF7',
  info: '#00B0F0',
  waring_200: '#FFE4CB',
  waring_400: '#FDA351',
  waring_700: '#ED7403',
  danger_300: '#F07078',
  neutral_19: '#CCFFFF45',
  neutral_250: '#F3F3F3',
  neutral_300: '#C3C3C3',
  neutral_500: '#ABABAB',
  neutral_700: '#3C3C3C',
  pink_shade_1: '#BC6492',
  pink_shade_2: '#D17CA3',
  bg: '#F2F5FF',
  noConcern: 'linear-gradient(315deg, #069181 0.49%, #00F0D3 99.9%)',
  lowUrgent: 'linear-gradient(135deg, #FAE100 0%, #EE9D00 99.42%)',
  highUrgent: 'linear-gradient(135deg, #FF919E 0%, #D10019 99.42%)',
  disable: '0.05',
  success_200: '#F1FFE0',
  success_800: '#0D8B38',

  brand_1: `linear-gradient(135deg, #A93BBA 0%, #203AAA 100%)`,
  brand_2: '#203AAA',
  blue_radio: '#00B0F0',
  red_alert: '#CD1520',
  red_card: '#FF0000',
  red_danger: '#E81A26',
  violet_primary: '#A93BBA',
  master_primary: '#203AAA',
  black_primary: '#141414',
  black_second: '#000000',
  gray_primary: '#505050',
  gray_800: '#8B8B8B',
  gray_700: '#646464',
  gray_600: '#9CA0A8',
  gray_500: '#ABABAB',
  gray_400: '#E7E7E7',
  gray_300: '#F3F3F3',
  gray_200: '#FFF8F2',
  gray_100: 'rgba(171, 171, 171, 0.4)',
  white_primary: '#F5F5F7',
  green_100: '#F9FFF2',
  green_enable: '#2CEC6D',
  gray_disable: 'rgba(156, 160, 168, 1)',
  bg_opacity: 'rgba(0, 0, 0, 0.48)',
};

const BOX_SHADOW = {
  primary_account: '0px 1.00586px 2.01172px rgba(0, 0, 0, 0.25)',
  active_status: '5px 5px 8px -1px rgba(0,0,0,0.75)',
};

const BORDERS = {
  radius_0: '0',
  // radius_0_top: '16px 16px 0 0',
  // radius_2_top: '12px 12px 0 0',
  // radius_2_bottom: '0 0 12px 12px ',
  // radius_1: '8px',
  // radius_2: '12px',
  // radius_3: '24px',
  radius_0_top: '0',
  radius_2_top: '0',
  radius_2_bottom: '0',
  radius_1: '0px',
  radius_2: '0px',
  radius_3: '0px',
  radius_50: '50%',
  border_1: (color) => `1px solid ${color}`,
  border_2: (color) => `2px solid ${color}`,
  border_dashed_2: (color) => `2px dashed ${color}`,
  border_3: (color) => `3px solid ${color}`,
};

const FONTS = {
  fs_0: 14,
  fw_0: 400,
  fstyle_reg: 'regular',
  fstyle_med: 'medium',
  fstyle_bold: 'bold',
  fstyle_normal: 'normal',
};

const WIDTH = {
  w_160: '160px',
  wBody: 'calc(100% - 248px)',
  wrapper_width_60: '60%',
  modal_width_6: '6xl',
};

const HEIGHT = {
  hBody: '100%',
  hTabs: 'calc(100vh - 215px)',
  h100: '100%',
};

const MARGIN = {
  m_16: '16px',
};

export { COLORS, BORDERS, FONTS, WIDTH, HEIGHT, MARGIN, BOX_SHADOW };
