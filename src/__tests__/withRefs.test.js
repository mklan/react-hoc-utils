import React from 'react';
import { toClass } from 'recompose';
import { mount } from 'enzyme';

import { withRefs } from '..';

const ComponentClass = toClass(({ refs, refName, id }) => <div id={id} ref={r => refs.set(refName, r)} />);

const Component = withRefs(ComponentClass);

describe('withRefs', () => {

    test('A jsx element is referable via refs prop', () => {

        expect.assertions(1);

        const id = 'randomId';
        const refName = 'randomRefName';

        const wrapper = mount(<Component refName={refName} id={id} />);
        expect(wrapper.find(ComponentClass).prop('refs')[refName].id).toEqual(id);
    });

});