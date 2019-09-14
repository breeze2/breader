import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { IntlProvider, WrappedComponentProps } from 'react-intl'
import SettingFeedList, {
  ISettingFeedListProps,
  ISettingFeedListState,
  SettingFeedListComponent,
} from '../components/SettingFeedList'
import { domNode, feed, intlProviderProps } from './MockData'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('SettingFeedList Testing', () => {
  jest.useFakeTimers()
  const mockProps: ISettingFeedListProps = {
    feeds: [feed],
    onDeleteFeed: jest.fn(),
  }

  it('dom testing', () => {
    const wrapper = Enzyme.mount(
      <IntlProvider {...intlProviderProps}>
        <SettingFeedList {...mockProps} />
      </IntlProvider>,
      { attachTo: domNode }
    )
    wrapper.update()
    // const sbar = wrapper.find(Scrollbars) as Enzyme.ReactWrapper<ScrollbarProps, {}, Scrollbars>
    // sbar.instance().scrollToTop()
    const feedList = wrapper.find(
      SettingFeedListComponent
    ) as Enzyme.ReactWrapper<
      ISettingFeedListProps & WrappedComponentProps,
      ISettingFeedListState,
      SettingFeedListComponent
    >
    feedList.instance().handleScrollStart()
    wrapper.find('.ant-btn-danger').simulate('click')
    expect(mockProps.onDeleteFeed).toBeCalledTimes(1)
    expect(wrapper.find(Scrollbars).find('li.setting-feed-item')).toHaveLength(
      1
    )
  })

  it('snapshot testing', () => {
    const component = Enzyme.mount(
      <IntlProvider {...intlProviderProps}>
        <SettingFeedList {...mockProps} />
      </IntlProvider>
    )
    const tree = EnzymeToJson(component)
    expect(tree).toMatchSnapshot()
  })
})
