window.dojoConfig = {
  async: true,
  deps: ['app/main'],
  packages: [{
    name: 'react',
    location: `${location.origin}/node_modules/react/dist/`,
    main: 'react',
  }, {
    name: 'react-dom',
    location: `${location.origin}/node_modules/react-dom/dist/`,
    main: 'react-dom',
  }, {
    name: 'prop-types',
    location: `${location.origin}/node_modules/prop-types/`,
    main: 'prop-types',
  }, {
    name: 'redux',
    location: `${location.origin}/node_modules/redux/dist/`,
    main: 'redux',
  }, {
    name: 'react-redux',
    location: `${location.origin}/node_modules/react-redux/dist/`,
    main: 'react-redux',
  }, {
    name: 'redux-thunk',
    location: `${location.origin}/node_modules/redux-thunk/dist/`,
    main: 'redux-thunk',
  }, {
    name: 'enzyme',
    location: `${location.origin}/node_modules/enzyme/build/`,
    main: 'index',
  }, {
    name: 'app',
    location: `${location.origin}/dist`,
    main: 'main',
  }],
};
