import tinycolor from 'tinycolor2'

export const Colors = {
  primary: '#0027B5',
  secondary: '#19BCFE',
  thirsdary: '#373473',
  foursdary: '#05154E',

  // color for border
  bd_yellow: '#FEE58F',

  // color for background
  bg_primary: '#F7FBFF',
  bg_header: '#FFFFFF',
  bg_examination: '#071239',
  bg_course_status: '#FAF9F7',
  bg_course_list: '#F4F9FF',
  bg_disable_lesson: '#FAF9F7',
  bg_notify_box: '#FFF8E4',
  bg_notification: 'rgba(241, 241, 241, 0.5)',
  bg_status_pending: 'rgba(255, 169, 40, 0.1)',
  bg_status_resubmitted: 'rgba(243, 58, 39, 0.1)',
  bg_status_waiting_release: 'rgba(20, 128, 255, 0.1)',
  bg_blue_white: 'linear-gradient(180deg, rgba(250, 251, 253, 0.546028) 0.05%, #FEFEFF 84.64%, #FFFFFF 100%)',
  bg_shadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  bg_shadow_survey: 'rgba(5, 21, 78, 0.25)',
  bg_border: '#d9d9d9',
  bg_yellow_white: 'rgb(255, 255, 200)',
  bg_yellow_white_low: '#FFFBE6',
  bg_cyan_white: 'rgb(205, 236, 255)',
  bg_scroll_bar: '#f1f1f1',
  bg_mark_new: '#F5222D',
  bg_mark_new_footer: '#820014',
  bg_divider: '#D9D9D9',
  // color for text
  text_primary: '#1A1A1A',
  text_secondary: '#838383',
  text_thirsdary: '#1480FF',
  text_placeholder: '#D3D3D3',
  text_hight_light: '#2B55EF',
  text_tab_color: '#D3D3D3',
  text_danger: '#F33A27',
  text_active_green: '#00C271',
  text_error: '#F33A27',

  // btn color
  primary_btn: '#00C271',
  secondary_btn: '#FFA928',
  fb_color: '#09519B',
  google_color: '#F14436',

  // progress
  progress_success: '#07CF84',
  progress: '#FFA928',

  // other colors
  black: '#1A1A1A',
  blue: '#4472C4',
  green: '#00C271',
  red: 'red',
  green_light: 'rgba(7, 207, 132, 0.1)',
  primary_light: 'rgba(0, 39, 181, 0.05)',
  yellow: '#FFA928',
  yellow_light: '#F3E926',
  yellow_blur: 'rgba(255, 169, 40, 0.1)',
  error: '#F33A27',
  error_light: 'rgba(231, 76, 60, 0.1)',
  white: '#FFFFFF',
  white_blue: '#FAF9F7',
  grey: '#838383',
  grey_light: '#1F1F1F',
  grey_blur: '#F1F1F1',
  grey_mid: '#F5F5F8',
  grey_disable: '#cccccc',
  white_disable: '#f5f5f5',
  transparent: 'transparent',

  success: '#07CF84',
  pending_color: '#FFA928',
  submitted: 'rgba(255, 169, 40, 0.1)',

  // test colors
  bg_answer_color: 'rgba(0, 39, 181, 0.05)',
  border_answer_color: '#0027B5',

  bg_correct_color: 'rgba(7, 207, 132, 0.1)',
  border_correct_color: '#07CF84',

  bg_wrong_color: 'rgba(231, 76, 60, 0.1)',
  border_wrong_color: '#F33A27',

  // talk board
  talk_primary: '#00C271',
  talk_background: '#FFE7EC',
  talk_hover: '#07cf841a',
  check_complete_bg: '#DCF3FF',
  check_complete_border: '#4395FF'

}

export const alpha = (color, value) => tinycolor(color).setAlpha(value).toRgbString()

export default Colors
