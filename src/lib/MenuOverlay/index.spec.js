import React from 'react';
import { shallow, mount } from 'enzyme';
import {
  Menu,
  MenuOverlay,
  MenuItem,
  MenuContent
} from '@collab-ui/react';

describe('tests for <MenuOverlay />', () => {
  it('should render a MenuOverlay', () => {
    const wrapper = shallow(
      <MenuOverlay menuTrigger={<div>Trigger</div>}>
        <Menu>
          <MenuItem label="one"/>
        </Menu>
      </MenuOverlay>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should apply className to MenuOverlay', () => {
    const wrapper = mount(
      <MenuOverlay className="test" menuTrigger={<div>Trigger</div>}/>
    );
    expect(wrapper.find('.cui-menu-overlay-wrapper').hasClass('test')).toEqual(true);
  });

  it('should open the menu on Click of button', () => {
    const wrapper = mount(
      <MenuOverlay menuTrigger={<div className="trigger">Trigger</div>}>
        <MenuContent>test</MenuContent>
        <Menu>
          <MenuItem label="one"/>
        </Menu>
      </MenuOverlay>
    );
    wrapper.find('.trigger').simulate('click');
    expect(wrapper.find('.cui-menu').length).toEqual(1);
    expect(wrapper.find('.cui-menu-content').length).toEqual(1);
  });

  it('should toggle the menu on click of menuTrigger', () => {
    const wrapper = mount(
      <MenuOverlay menuTrigger={<div className="trigger">Trigger</div>}>
        <MenuContent>test</MenuContent>
        <Menu>
          <MenuItem label="one"/>
        </Menu>
      </MenuOverlay>
    );
    wrapper.find('.trigger').simulate('click');
    expect(wrapper.find('.cui-menu').length).toEqual(1);
    expect(wrapper.find('.cui-menu-content').length).toEqual(1);
    wrapper.find('.trigger').simulate('click');
    expect(wrapper.find('.cui-menu').length).toEqual(0);
    expect(wrapper.find('.cui-menu-content').length).toEqual(0);
  });

  it('when keepMenuOpen is set to true on MenuItem the MenuOverlay should not close', () => {
    const wrapper = mount(
      <MenuOverlay menuTrigger={<div className="trigger">Trigger</div>}>
        <MenuContent>test</MenuContent>
        <Menu>
          <MenuItem label="one" keepMenuOpen/>
        </Menu>
      </MenuOverlay>
    );
    wrapper.find('.trigger').simulate('click');
    expect(wrapper.find('.cui-menu').length).toEqual(1);
    expect(wrapper.find('.cui-menu-content').length).toEqual(1);

    wrapper.find('.cui-list-item').simulate('click');

    expect(wrapper.find('.cui-menu').length).toEqual(1);
    expect(wrapper.find('.cui-menu-content').length).toEqual(1);
  });


  it('by default should close the MenuOverlay when an leaf MenuItem is clicked', () => {
    const wrapper = mount(
      <MenuOverlay menuTrigger={<div className="trigger">Trigger</div>}>
        <MenuContent>test</MenuContent>
        <Menu>
          <MenuItem label="one"/>
        </Menu>
      </MenuOverlay>
    );
    wrapper.find('.trigger').simulate('click');
    expect(wrapper.find('.cui-menu').length).toEqual(1);
    expect(wrapper.find('.cui-menu-content').length).toEqual(1);
    wrapper.find('.cui-list-item').simulate('click');

    expect(wrapper.find('.cui-menu').length).toEqual(0);
    expect(wrapper.find('.cui-menu-content').length).toEqual(0);
  });

  it('callback should be called when an menuItem is selected', () => {
    let selectedIndex;
    const onSelectFn = (e, index) => selectedIndex = index;
    const onClickFn = jest.fn();
    const wrapper = mount(
      <MenuOverlay
        onSelect={onSelectFn}
        menuTrigger={<div className="trigger">Trigger</div>}
      >
        <MenuContent>test</MenuContent>
        <Menu>
          <MenuItem onClick={onClickFn} label="one" keepMenuOpen/>
        </Menu>
      </MenuOverlay>
    );
    //Open the menu
    wrapper.find('.trigger').simulate('click');

    // select the menuItem
    wrapper.find('.cui-list-item').simulate('click');
    expect(selectedIndex).toEqual([0]);
    expect(onClickFn).toHaveBeenCalled();

    // hit enter
    wrapper.find('.cui-list-item').simulate('keyDown', { which: 13 });
    expect(selectedIndex).toEqual([0]);
    expect(onClickFn).toHaveBeenCalled();
  });

  it('should throw error when MenuOverlay contains invalid elements', () => {
    try{
      mount(
        <MenuOverlay menuTrigger={<div className="trigger">Trigger</div>}>
          <div>test</div>
          <Menu>
            <MenuItem label="one"/>
          </Menu>
        </MenuOverlay>
      );
    } catch(e) {
      expect(e.message).toEqual('MenuOverlay should only contain Menu or MenuContent as children');
    }

    try{
      mount(
          <MenuOverlay menuTrigger={<div className="trigger">Trigger</div>}>
            <MenuContent>test</MenuContent>
            <div>test</div>
          </MenuOverlay>
      );
    } catch(e) {
      expect(e.message).toEqual('MenuOverlay should only contain Menu or MenuContent as children');
    }
  });
});
