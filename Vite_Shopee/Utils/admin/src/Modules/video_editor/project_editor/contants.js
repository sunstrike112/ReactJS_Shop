import MSMINCHO from 'Assets/fonts/mincho/msmincho.ttf'
import MEIRYOB from 'Assets/fonts/meiryo/meiryob.ttf'
import GOTHICBI from 'Assets/fonts/gothic/msgothic.ttf'
import ARIALBI from 'Assets/fonts/arial/arialbi.ttf'
import YUGOTHIC from 'Assets/fonts/yu-gothic/yugothic.ttf'

const FONTS = {
  'MS Gothic': {
    url: GOTHICBI,
    options: {
      'font-weight': 'bold',
      'font-style': 'italic'
    }
  },
  'Meiryo': {
    url: MEIRYOB,
    options: {
      'font-weight': 'bold'
    }
  },
  'MS Mincho': {
    url: MSMINCHO,
    options: {
    }
  },
  'Yu Gothic': {
    url: YUGOTHIC,
    options: {
    }
  },
  'Arial': {
    url: ARIALBI,
    options: {
      'font-weight': 'bold',
      'font-style': 'italic'
    }
  }
}

export { FONTS }
