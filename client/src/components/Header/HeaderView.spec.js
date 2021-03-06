/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import { HeaderView } from './HeaderView';

const setup = () => {
  const props = {
    getChangeChannel: jest.fn(),
    channel: { currentChannel: 'mychannel' },
    channelList: {
      channels: ['mychannel'],
      status: 200
    },
    classes: {
      margin: 'Connect-HeaderView--margin-1',
    padding: 'Connect-HeaderView--padding-2'
    },
    getNotification: jest.fn(),
    notification: {}
  }

  const wrapper = shallow(<HeaderView {...props} />)

  return{
    props,
    wrapper
  }
}

describe('HeaderView', () => {
  test('HeaderView component should render', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });

  test('toggle changes the state of isOpen', () => {
    const { wrapper } = setup();
    expect(wrapper.state('isOpen')).toBe(false)
    wrapper.instance().toggle();
    expect(wrapper.state('isOpen')).toBe(true)
    wrapper.instance().toggle();
    expect(wrapper.state('isOpen')).toBe(false)
  })

  test('handleData sets notification', () => {
    const { wrapper, props } = setup();
    const notification = '{"title":"Block 12 Added","type":"block","message":"Block 12 established with 3 tx","time":"2018-05-30T21:15:09.000Z","txcount":3,"datahash":"07ff8fa88e8c8412daa15ae0ecec80b47293a452165d00213ec08811c9fd88e7"}'
    expect(wrapper.state('notifyCount')).toBe(0)
    wrapper.instance().handleData(notification)
    expect(wrapper.state('notifications').length).toBe(1);
    expect(wrapper.state('notifyCount')).toBe(1)
  })

  test('handleChange sets selectedOption and calls changeChannel', () => {
    const { wrapper, props } = setup();
    const selectedOption = { value: 'newChannel' }
    wrapper.instance().handleChange(selectedOption);
    expect(wrapper.state('selectedOption')).toBe('newChannel')
    expect(props.getChangeChannel).toHaveBeenCalled()
  })

  test('handleOpen sets modalOpen to true', () => {
    const { wrapper } = setup();
    expect(wrapper.state('modalOpen')).toBe(false);
    wrapper.instance().handleOpen()
    expect(wrapper.state('modalOpen')).toBe(true);
  })

  test('handleClose sets modalClose to false', () => {
    const { wrapper } = setup();
    expect(wrapper.state('modalOpen')).toBe(false);
    wrapper.setState({ modalopen: true })
    wrapper.instance().handleClose()
    expect(wrapper.state('modalOpen')).toBe(false);
  })

  test('handleDrawOpen sets the corresponding state to true', () => {
    const { wrapper } = setup();
    wrapper.instance().handleDrawOpen()
    expect(wrapper.state('notifyDrawer')).toBe(false);
    expect(wrapper.state('adminDrawer')).toBe(false);
    let drawer = 'notifyDrawer';
    wrapper.instance().handleDrawOpen(drawer);
    expect(wrapper.state('notifyDrawer')).toBe(true);
    drawer = 'adminDrawer';
    wrapper.instance().handleDrawOpen(drawer);
    expect(wrapper.state('adminDrawer')).toBe(true);
  })

  test('handleDrawClose sets the corresponding state to false', () => {
    const { wrapper } = setup();
    wrapper.instance().handleDrawClose()
    expect(wrapper.state('notifyDrawer')).toBe(false);
    expect(wrapper.state('adminDrawer')).toBe(false);
    let drawer = 'notifyDrawer';
    wrapper.setState({ notifyDrawer: true });
    wrapper.instance().handleDrawClose(drawer);
    expect(wrapper.state('notifyDrawer')).toBe(false);
    drawer = 'adminDrawer';
    wrapper.setState({ adminDrawer: true })
    wrapper.instance().handleDrawClose(drawer);
    expect(wrapper.state('adminDrawer')).toBe(false);
  })

  test('click on bell should set state notifyDrawer to true', () => {
    const { wrapper } = setup();
    wrapper.find('.bell').simulate('click')
    expect(wrapper.state('notifyDrawer')).toBe(true);
  })

  test('click on cog should set state adminDrawer to true', () => {
    const { wrapper } = setup();
    wrapper.find('.cog').simulate('click')
    expect(wrapper.state('adminDrawer')).toBe(true);
  })

  test('notifyDrawer onClose sets state to false', () => {
    const { wrapper } = setup();
    const instance = wrapper.instance()
    const spy = jest.spyOn(instance, 'handleDrawClose');
    wrapper.setState({ notifyDrawer: true });
    wrapper.find('WithStyles(Drawer)').at(0).simulate('close')
    expect(wrapper.state('notifyDrawer')).toBe(false);
    expect(spy).toHaveBeenCalledTimes(1);
  })

  test('adminDrawer onClose sets state to false', () => {
    const { wrapper } = setup();
    const instance = wrapper.instance()
    const spy = jest.spyOn(instance, 'handleDrawClose');
    wrapper.setState({ adminDrawer: true });
    wrapper.find('WithStyles(Drawer)').at(1).simulate('close')
    expect(wrapper.state('adminDrawer')).toBe(false);
    expect(spy).toHaveBeenCalledTimes(1);
  })
})
