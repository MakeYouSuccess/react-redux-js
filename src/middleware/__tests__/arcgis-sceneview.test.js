import sceneviewMiddelware from '../arcgis-sceneview';
import SceneView from 'esri/views/SceneView'; // eslint-disable-line
import WebScene from 'esri/WebScene'; // eslint-disable-line

import { INIT_SCENE_VIEW, LOAD_WEB_SCENE } from '../../reducer/webscene/actions';
import { SELECTION_SET, SELECTION_RESET } from '../../reducer/selection/actions';
import { SET_ENVIRONMENT } from '../../reducer/environment/actions';

import { registerClickEvent } from '../arcgis-sceneview/interaction';
import { updateHighlights } from '../arcgis-sceneview/highlights';

/**
 * Mocks
 */
jest.mock('esri/config', () => ({ request: { corsEnabledServers: [] } }), { virtual: true });


jest.mock('esri/views/SceneView', () => {
  const MockSceneView = jest.fn();
  MockSceneView.prototype.watch = jest.fn();
  MockSceneView.prototype.on = jest.fn();
  MockSceneView.highlight = jest.fn();
  MockSceneView.prototype.whenLayerView = jest.fn(() => Promise.resolve({
    highlight: MockSceneView.highlight,
  }));
  return MockSceneView;
}, { virtual: true });


jest.mock('esri/WebScene', () => {
  const MockWebScene = jest.fn();
  MockWebScene.prototype.then = callback => callback();
  MockWebScene.prototype.layers = {
    items: [{
      popupEnabled: true,
    }],
  };
  MockWebScene.prototype.portalItem = {
    title: 'WebScene title',
  };
  MockWebScene.prototype.initialViewProperties = {
    environment: {
      lighting: {
        displayUTCOffset: -1,
        date: new Date(Date.UTC(2017, 1, 1, 12)),
        directShadowsEnabled: true,
      },
    },
  };
  return MockWebScene;
}, { virtual: true });


jest.mock('../arcgis-sceneview/interaction', () => ({
  registerClickEvent: jest.fn(),
}), { virtual: true });


jest.mock('../arcgis-sceneview/highlights', () => ({
  updateHighlights: jest.fn(),
}), { virtual: true });


/**
 * Middleware stuff
 */
const create = () => {
  const store = {
    getState: jest.fn(() => ({
      selection: [{
        layer: 'foo',
        OID: 3,
      }],
    })),
    dispatch: jest.fn(),
  };
  const next = jest.fn();
  const invoke = action => sceneviewMiddelware(store)(next)(action);
  return { store, next, invoke };
};


/**
 * Tests
 */
describe('async actions', () => {


  it('passes through non-function action', () => {
    const { next, invoke } = create();
    const action = { type: 'TEST' };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });


  it('initializes a new SceneView on INIT_SCENE_VIEW and registers event listeners', () => {
    const { next, invoke } = create();
    const action = {
      type: INIT_SCENE_VIEW,
      container: 'ref',
    };
    invoke(action);
    expect(SceneView).toHaveBeenCalledWith({ container: 'ref' });
    expect(registerClickEvent).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(action);
  });


  it('initializes a new WebScene on LOAD_WEB_SCENE and dispatches actions', () => {
    const { next, invoke, store } = create();
    const action = {
      type: LOAD_WEB_SCENE,
      id: 'abc1234',
    };
    expect.hasAssertions();
    invoke(action)
      .then(() => {
        expect(next).toHaveBeenCalledWith(Object.assign({
          ...action,
          name: 'WebScene title',
        }));
        expect(store.dispatch).toHaveBeenCalledWith({
          type: SET_ENVIRONMENT,
          UTCOffset: -1,
          date: new Date(Date.UTC(2017, 1, 1, 11)),
          shadows: true,
        });
      });
    expect(store.dispatch).toHaveBeenCalledWith({ type: SELECTION_RESET });
    expect(WebScene).toHaveBeenCalledWith({ portalItem: { id: 'abc1234' } });
  });


  it('updates highlights on SELECTION_SET', () => {
    const { next, invoke } = create();
    const action = {
      type: SELECTION_SET,
      layer: 'foo',
      OID: 3,
    };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
    expect(updateHighlights).toHaveBeenCalledWith({
      map: {},
    }, [{
      layer: 'foo',
      OID: 3,
    }]);
  });
});
