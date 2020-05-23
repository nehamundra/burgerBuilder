import {Burgerbuilder} from './Burgerbuilder';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import React from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter:new Adapter()});

describe('Burgerbuilder',()=>{
    let wrapper;

    beforeEach(()=>{
        wrapper=shallow(<Burgerbuilder initIngredients={()=>{}}/>);
    })

    it('should render buildcontrols on receiving ingredients',()=>{
        wrapper.setProps({ingredients:{salad:1}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })

})
