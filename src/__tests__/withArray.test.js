import React from 'react';
import { toClass } from 'recompose';

import { mount } from 'enzyme';

import { withArray } from '..';

const ComponentClass = toClass(p => <div />);
const Component = withArray('testArray', ({ initial = [] }) => initial )(ComponentClass);


describe('withArray', () => {

    test('The set method is generated', () => {

        expect.assertions(1);
        const wrapper = mount(<Component />);
        expect(wrapper.find(ComponentClass).prop('setTestArray')).toBeInstanceOf(Function);
    });

    test('The add method is generated', () => {

        expect.assertions(1);
        const wrapper = mount(<Component />);
        expect(wrapper.find(ComponentClass).prop('addToTestArray')).toBeInstanceOf(Function);
    });

    test('The array is assigned as a prop', () => {

        expect.assertions(1);
        const wrapper = mount(<Component />);
        expect(wrapper.find(ComponentClass).prop('testArray')).toBeInstanceOf(Array);
    });

    test('An optional initial array is beeing assigned correctly', () => {

        const initial = [1, 2, 3];

        expect.assertions(1);
        const wrapper = mount(<Component initial={initial} />);
        expect(wrapper.find(ComponentClass).prop('testArray')).toEqual(initial);
    });

    test('addTo adds one value into an existing array', () => {

        expect.assertions(1);
        const initial = [ 1, 2, 3 ];
        const newValue = 2;

        const wrapper = mount(<Component initial={initial} />)
        
        wrapper.find(ComponentClass).prop('addToTestArray')(newValue);
        wrapper.update();

        expect(wrapper.find(ComponentClass).prop('testArray')).toEqual([...initial, newValue])
    });

    test('addTo adds multiple values into an existing array', () => {

        const initial = [ 1, 2, 3 ];
        const newValue = [ 4, 5 ];

        const wrapper = mount(<Component initial={initial} />)
        
        wrapper.find(ComponentClass).prop('addToTestArray')(newValue);

        wrapper.update();

        expect(wrapper.find(ComponentClass).prop('testArray')).toEqual([...initial, ...newValue])
    });

    test('set sets a new array', () => {

        const initial = [ 1, 2, 3 ];
        const newValue = [ 4, 5 ];

        const wrapper = mount(<Component initial={initial} />)    
        wrapper.find(ComponentClass).prop('setTestArray')(newValue);

        wrapper.update();

        expect(wrapper.find(ComponentClass).prop('testArray')).toEqual(newValue)
    });

});