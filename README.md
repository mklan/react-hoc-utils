# react-hoc-utils

A steady growing collection of useful higher-order components for React.

## Install

```bash
npm install --save react-hoc-utils
```

## Higher-order components

### `withArray()`

```js
withArray(
  arrayName: string,
  initialArray: any | Array<any> | (props: Object) => ( any | Array<any> )
): HigherOrderComponent
```

Passes three additional props to the base component: An array holding the current state, a function to add values to the array and a function to set the complete state of the array:

```js
import { withArray } from 'react-hoc-utils';

const TodosView = ({ shoppingList, addToShoppingList, setShoppingList }) =>
    <div>
        { /* List */ }
        <ul> { shoppingList.map(item => <li>{item}</li>) } </ul>
        { /* Add item */ }
        <button onClick={() => addToShoppingList('milk')} >Add milk</button>
        { /* Add multiple items at once */ }
        <button onClick={() => addToShoppingList(['butter', 'avocado'])}>
            Add butter + avocado
        </button>
        { /* Override the array */ }
        <button onClick={() => setShoppingList([])} >Clear</button>
    </div>

const enhance = withArray('shoppingList', ['toilet paper'])
const Todos = enhance(TodosView);

```

### `withRefs()`

```js
withRefs: HigherOrderComponent
```

Passes an additional prop to the base component named refs. Refs has a set method to assign references. 
To retrieve the reference the dot notation is utilized:

```js
import { compose, withHandlers } from 'recompose';
import { withRefs } from 'react-hoc-utils';

const View = ({ refs, handleClick }) =>
    <div ref={r => refs.set('myElement', r)} onClick={handleClick} />

const Component = compose(
    withRefs,
    withHandlers({
        handleClick: ({ refs }) => () => {
            // access the dom element
            console.log(refs.myElement)
        }
    })
)(View);

```

## Tests

```bash
npm test
```