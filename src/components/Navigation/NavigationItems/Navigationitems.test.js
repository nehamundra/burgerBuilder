import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import NavigationItems from './NavigationItems'
import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'

configure({adapter:new Adapter()});

describe('<NavigationItems/>',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper=shallow(<NavigationItems/>)
    })
    it('should render 2 navigation elements if not authenticated',()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render 3 navigation elements if authenticated',()=>{
        wrapper.setProps({isAuth:true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render 3 navigation elements if authenticated',()=>{
        wrapper.setProps({isAuth:true})
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
    });
});