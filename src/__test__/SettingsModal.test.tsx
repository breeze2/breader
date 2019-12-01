import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import Immutable from 'immutable'
import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { IntlProvider, WrappedComponentProps } from 'react-intl'
import { Provider as ReduxProvider } from 'react-redux'
import {
  ISettingFeedListProps,
  ISettingFeedListState,
  SettingFeedListComponent,
} from '../components/SettingFeedList'
import SettingsModal, {
  ISettingsModalProps,
  ISettingsModalState,
  SettingsModalComponent,
} from '../components/SettingsModal'
import store from '../redux'
import { IFeed } from '../schemas'
import { domNode, feed, intlProviderProps } from './MockData'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('SettingsModal Testing', () => {
  jest.useFakeTimers()
  const mockProps: ISettingsModalProps = {
    asyncDeleteFeeds: jest.fn(),
    feeds: Immutable.List<IFeed>([feed]),
    feedsMap: Immutable.Map<IFeed>({ [feed._id]: feed }),
    language: 'en-US',
    onClose: jest.fn(),
    onLanguageChange: jest.fn(),
    setLanguage: jest.fn(),
    visible: true,
  }

  it('dom testing', () => {
    const wrapper = Enzyme.mount(
      <ReduxProvider store={store}>
        <IntlProvider {...intlProviderProps}>
          <SettingsModal {...mockProps} />
        </IntlProvider>
      </ReduxProvider>,
      {
        attachTo: domNode,
      }
    )
    wrapper.update()
    const modal = wrapper.find(SettingsModalComponent) as Enzyme.ReactWrapper<
      ISettingsModalProps & WrappedComponentProps,
      ISettingsModalState,
      SettingsModalComponent
    >
    const feedList = modal.find(
      SettingFeedListComponent
    ) as Enzyme.ReactWrapper<
      ISettingFeedListProps & WrappedComponentProps,
      ISettingFeedListState,
      SettingFeedListComponent
    >
    const event: any = {}
    feedList.instance().handleScrollStart()
    wrapper.find('.ant-btn-danger').simulate('click')
    modal.instance().handleCancel(event)
    modal.instance().handleOk(event)
    modal.instance().handleLanguageChange('zh-CN')
    modal.instance().handleDeleteFeed(feed._id, 0)
    expect(feedList.find(Scrollbars).find('li.setting-feed-item')).toHaveLength(
      1
    )
    expect(mockProps.asyncDeleteFeeds).toBeCalledTimes(1)
    expect(mockProps.setLanguage).toBeCalledTimes(1)
    expect(mockProps.onLanguageChange).toBeCalledTimes(1)
    expect(mockProps.onClose).toBeCalledTimes(2)
  })

  it('snapshot testing', () => {
    const component = Enzyme.mount(
      <IntlProvider {...intlProviderProps}>
        <SettingsModal {...mockProps} />
      </IntlProvider>
    )
    const tree = EnzymeToJson(component)
    expect(tree).toMatchSnapshot()
  })
})
