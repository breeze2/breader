import { IntlProvider } from 'react-intl'
import { messages } from '../locales'

export const intlProviderProps: IntlProvider.Props = {
    locale: 'en-US',
    messages: messages['en-US'],
}
