/* eslint-disable camelcase */
const ExcelJS = require('exceljs')
const { unflatten } = require('flat')
const fs = require('fs')
const path = require('path')

const enPath = path.resolve(__dirname, '../src/I18n/translate/en')
const jpPath = path.resolve(__dirname, '../src/I18n/translate/jp')
const viPath = path.resolve(__dirname, '../src/I18n/translate/vi')

const { modules } = require('./constants')

const resources = modules.reduce((prev, module) => {
  const subResources = module.subModules.reduce(
    (result, subModule) => Object.assign(result, {
      [subModule]: {
        en: {},
        jp: {},
        vi: {}
      }
    }),
    {}
  )
  return Object.assign(prev, subResources)
}, {})

const workbook = new ExcelJS.Workbook()
workbook.xlsx
  .readFile('Nissoken Elearning Messages.xlsx')
  .then((wb) => {
    modules.forEach((module) => {
      const wsCommon = wb.getWorksheet(module.name)
      wsCommon.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          const subModule = resources[row.getCell(1).value]
          subModule.en = Object.assign(subModule.en, {
            [row.getCell(2).value]: row.getCell(7).value
          })
          subModule.jp = Object.assign(subModule.jp, {
            [row.getCell(2).value]: row.getCell(6).value
          })
          subModule.vi = Object.assign(subModule.vi, {
            [row.getCell(2).value]: row.getCell(5).value
          })
        }
      })
    })
    try {
      Object.keys(resources).forEach((key) => {
        const subModule = unflatten(resources[key])
        fs.writeFileSync(
          `${enPath}/${key}.json`,
          JSON.stringify(subModule.en, null, 4)
        )
        fs.writeFileSync(
          `${jpPath}/${key}.json`,
          JSON.stringify(subModule.jp),
          null,
          4
        )
        fs.writeFileSync(
          `${viPath}/${key}.json`,
          JSON.stringify(subModule.vi),
          null,
          4
        )
      })
    } catch (err) {
      console.error(err)
    }
  })
  .catch((err) => console.log(err))
