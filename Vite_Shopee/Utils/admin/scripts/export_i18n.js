/* eslint-disable import/no-dynamic-require */
const ExcelJS = require('exceljs')
const flatten = require('flat')

const { modules } = require('./constants')

const resources = modules.reduce((prev, module) => {
  const subResources = module.subModules.reduce(
    (result, subModule) => Object.assign(result, {
      [subModule]: {
        en: flatten(require(`../src/I18n/translate/en/${subModule}.json`)),
        jp: flatten(require(`../src/I18n/translate/jp/${subModule}.json`)),
        vi: flatten(require(`../src/I18n/translate/vi/${subModule}.json`))
      }
    }),
    {}
  )
  return Object.assign(prev, subResources)
}, {})

const workbook = new ExcelJS.Workbook()
workbook.creator = 'Nineh Nguyễn'

modules.forEach((module) => {
  const ws = workbook.addWorksheet(module.name)
  ws.columns = [
    {
      header: 'Module',
      key: 'module',
      width: 20,
      style: { alignment: { vertical: 'middle', horizontal: 'center' } }
    },
    { header: 'Keyword', key: 'keyword', width: 50 },
    { header: 'Screen', key: 'screen', width: 20 },
    { header: 'Case', key: 'case', width: 50 },
    { header: 'VietNam', key: 'vi', width: 50 },
    { header: 'Japanese', key: 'jp', width: 50 },
    { header: 'English', key: 'en', width: 50 },
    { header: 'Note', key: 'note', width: 50 }
  ]

  ws.getRow(1).getCell('module').font = {
    color: { argb: 'FFFFFFFF' },
    bold: true
  }
  ws.getRow(1).getCell('keyword').font = {
    color: { argb: 'FFFFFFFF' },
    bold: true
  }
  ws.getRow(1).getCell('screen').font = {
    color: { argb: 'FFFFFFFF' },
    bold: true
  }
  ws.getRow(1).getCell('case').font = {
    color: { argb: 'FFFFFFFF' },
    bold: true
  }
  ws.getRow(1).getCell('vi').font = { color: { argb: 'FFFFFFFF' }, bold: true }
  ws.getRow(1).getCell('jp').font = { color: { argb: 'FFFFFFFF' }, bold: true }
  ws.getRow(1).getCell('en').font = { color: { argb: 'FFFFFFFF' }, bold: true }
  ws.getRow(1).getCell('note').font = {
    color: { argb: 'FFFFFFFF' },
    bold: true
  }

  ws.getRow(1).getCell('module').fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '3c78d8' }
  }
  ws.getRow(1).getCell('keyword').fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '3c78d8' }
  }
  ws.getRow(1).getCell('screen').fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '3c78d8' }
  }
  ws.getRow(1).getCell('case').fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '3c78d8' }
  }
  ws.getRow(1).getCell('vi').fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '3c78d8' }
  }
  ws.getRow(1).getCell('jp').fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '3c78d8' }
  }
  ws.getRow(1).getCell('en').fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '3c78d8' }
  }
  ws.getRow(1).getCell('note').fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '3c78d8' }
  }

  ws.getRow(1).getCell('keyword').alignment = {
    vertical: 'middle',
    horizontal: 'center'
  }
  ws.getRow(1).getCell('screen').alignment = {
    vertical: 'middle',
    horizontal: 'center'
  }
  ws.getRow(1).getCell('case').alignment = {
    vertical: 'middle',
    horizontal: 'center'
  }
  ws.getRow(1).getCell('vi').alignment = {
    vertical: 'middle',
    horizontal: 'center'
  }
  ws.getRow(1).getCell('jp').alignment = {
    vertical: 'middle',
    horizontal: 'center'
  }
  ws.getRow(1).getCell('en').alignment = {
    vertical: 'middle',
    horizontal: 'center'
  }
  ws.getRow(1).getCell('note').alignment = {
    vertical: 'middle',
    horizontal: 'center'
  }

  module.subModules.forEach((subModule) => {
    Object.keys(resources[subModule].vi).forEach((key) => {
      ws.addRow({
        module: subModule,
        keyword: key,
        case: '',
        vi: resources[subModule].vi[key],
        jp: resources[subModule].jp[key],
        en: resources[subModule].en[key],
        note: ''
      })
    })
  })
})

workbook.xlsx.writeFile('Nissoken Elearning Messages.xlsx')
