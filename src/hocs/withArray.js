import PropTypes from 'prop-types';
import { withState, withHandlers, compose, setPropTypes } from 'recompose';

// HELPER
const capitalize = s => s[0].toUpperCase() + s.slice(1);

export const withArray = (arrayName, initialArray = []) => compose(
  withState(arrayName, `set${capitalize(arrayName)}`, initialArray),
  withHandlers({
    [`addTo${capitalize(arrayName)}`]: (props) => (entries) => {
      const oldEntries = props[arrayName];
      const set = props[`set${capitalize(arrayName)}`];

      set([...oldEntries, ...Array.isArray(entries) ? entries : [entries]]);
    },
  }),
  setPropTypes({
    [arrayName]: PropTypes.array
  })
);