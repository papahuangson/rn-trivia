import * as React from 'react';
import renderer from 'react-test-renderer';
import TabOneScreen from '../TabOneScreen';

let tree;
it(`renders correctly`, () => {
  tree = renderer.create(<TabOneScreen />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('should have a button on load', () => {
  const button = tree.findWhere(t => t.prop('testID') === 'startGameButton');
})