<!-- Change Laguage -->
import React from 'react';
import i18n from '..'i18n';

const LanguageSwitcher = () => {
  function handleLanguageChange(event) {
    i18n.changeLanguage(event.target.value);
  }

  return (
    <select onChange={handleLanguageChange}>
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  );
}
