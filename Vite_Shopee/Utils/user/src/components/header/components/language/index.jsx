/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { TextPrimary, Image, ClickAble } from '../../../index'
import i18next from '../../../../i18n'
import { STORAGE, setLocalStorage, getLocalStorage } from '../../../../utils'

import { CARETUP, INACTIVE_GLOBAL, GLOBAL } from '../../../../assets'
import { LANGUAGE } from '../../constant'

import { useOnClickOutside } from '../../../../hooks'
import { LanguageBox } from './styled'

const Language = () => {
  const { t } = useTranslation()
  const [isLanguage, setIsLanguage] = useState(false)
  const [language, setLanguage] = useState('jp')
  const languageEl = useRef()

  const changeLanguage = async (lang) => {
    await i18next.changeLanguage(lang)
    setIsLanguage(false)
    setLanguage(lang)
    setLocalStorage(STORAGE.LANGUAGE, lang)
  }

  useEffect(() => {
    const lang = getLocalStorage(STORAGE.LANGUAGE)
    if (lang !== language) { setLanguage(lang) }
  }, [])

  useOnClickOutside(languageEl, () => setIsLanguage(false))

  return (
    <LanguageBox ref={languageEl} onClick={() => setIsLanguage(!isLanguage)}>
      <ClickAble className="clickable">
        <Image src={isLanguage ? GLOBAL : INACTIVE_GLOBAL} alt="global_img" />
        <TextPrimary style={{ padding: '0px 15px 0px 4px' }} fontWeight="fw_500">
          {t('common.header.lang')}
        </TextPrimary>
        <Image
          className="cursor-pointer"
          style={{ transform: isLanguage ? 'rotate(180deg)' : '' }}
          src={CARETUP}
          alt="global_img"
        />
        {isLanguage && (
          <div className="language-box">
            {LANGUAGE.map((languageitem) => (
              <div
                style={{ background: language === languageitem.value ? 'rgba(7, 207, 132, 0.1)' : '' }}
                key={languageitem.name}
                aria-hidden="true"
                onClick={() => changeLanguage(languageitem.value)}
                className="d-flex cursor-pointer"
              >
                <Image width={16} alt="lang_img" src={languageitem.src} />
                <TextPrimary fontWeight="fw_500">{languageitem.name}</TextPrimary>
              </div>
            ))}
          </div>
        )}
      </ClickAble>
    </LanguageBox>
  )
}

export default Language
