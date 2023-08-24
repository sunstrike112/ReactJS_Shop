import tinycolor from 'tinycolor2'

export const Colors = {
  primary: '#1B3893',
  secondary: '#19BCFE',

  // color for background
  bg_primary: '#6C5FD2',
  bg_secondary: '#ffa2c0',
  bg_success: '#46bcaa',
  bg_success_light: '#ccf3e3',
  bg_info: '#4d69fa',
  bg_warning: '#ffcf52',
  bg_danger: '#f35421',
  bg_light: '#e7eef8',
  bg_dark: '#1f2128',
  bg_blue_white: 'linear-gradient(180deg, rgba(250, 251, 253, 0.546028) 0.05%, #FEFEFF 84.64%, #FFFFFF 100%)',
  bg_block: '#FAF9F7',
  bg_block_header: '#E5E3E3',
  bg_error: '#fff2f0',
  bg_error_light: '#f2dede',
  bg_hight_light: '#19191f',
  bg_dark_transparent: '#090a0c80',
  bg_light_transparent: '#ffffff80',
  bg_primary_dark: '#1d1f27',
  bg_primary_light: '#f1f1f1',
  bg_danger_strong: '#F33A27',
  bg_input: '#f8f9fa',
  // color for border
  bd_error: '#ffccc7',
  bd_error_light: '#ebccd1',
  bd_success: '#00C271',
  bd_divider: 'rgba(0, 0, 0, .06)',

  // color for text
  text_primary: '#323232',
  text_secondary: '#BEBEBE',
  text_hight_light: '#e7eef8',
  text_error: '#a94442',
  text_placeholder: '#bfbfbf',
  text_blue: '#3498db',
  text_disabled: '#BFBFBF',

  // social btn color
  fb_color: '#09519B',
  google_color: '#F14436',

  blue: '#1890ff',
  blueHight: '#106BB4',
  blueLow: '#3498db',
  blueDark: '#34495e',
  green: '#07CF84',
  green_strong: '#52c41a',
  red: '#f5222d',
  orange: '#e74c3c',
  orangeLow: '#F0AD4E',
  yellow: '#F5CF50',
  yellow_light: '#F3E926',
  error: '#D85B46',
  error_ant: '#ff4d4f',
  white: '#FFFFFF',
  grey: '#bdc3c7',
  greyHight: '#777777',
  greyLow: '#D6DBDF',
  greyMid: '#ECF0F1',
  grey_light: '#e4e7ea',
  grey_white: '#FAFAFA',
  greyHigh: '#777',
  transparent: 'transparent',
  purple: '#d3dafe',
  black: '#000000'
}

export const alpha = (color, value) => tinycolor(color).setAlpha(value).toRgbString()

export default Colors
