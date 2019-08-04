import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'
import enUS from './enUS'
import zhCN from './zhCN'

addLocaleData([...en, ...zh])

export const messages: { [key: string]: any } = {
  'en-US': enUS,
  'zh-CN': zhCN,
}
