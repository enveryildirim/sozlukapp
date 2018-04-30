import LocalizedStrings from 'react-native-localization';

// CommonJS syntax
// let LocalizedStrings  = require ('react-native-localization');

const strings = new LocalizedStrings({
 'en-US': {
  success: 'Success',
  fail: 'Fail',
  name: 'Name',
  description: 'Description',
  mainLanguage: 'Main Language',
  targetLanguage: 'Target Language'
 },
 en: {
  success: 'Success',
  fail: 'Fail',
  name: 'Name',
  description: 'Description',
  mainLanguage: 'Main Language',
  targetLanguage: 'Target Language'
 },
 tr: {
   success: 'Success',
   fail: 'Fail',
   name: 'İsim',
   description: 'Açıklama',
   mainLanguage: 'Ana Dil',
   targetLanguage: 'Hedef Dil'
 }
});
export default strings;
