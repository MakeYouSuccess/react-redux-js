import OAuthInfo from 'esri/identity/OAuthInfo';
import IdentityManager from 'esri/identity/IdentityManager';
import Portal from 'esri/portal/Portal';

import { APP_ID } from '../constants';

import { GET_IDENTITY, SIGN_IN, SIGN_OUT, GET_USER_WEBSCENES } from '../reducer/user/actions';


const info = new OAuthInfo({ appId: APP_ID, popup: false });
const portal = new Portal({ authMode: 'immediate' });

IdentityManager.registerOAuthInfos([info]); 


const arcgisMiddleWare = store => next => action => {
  switch (action.type) {

    case GET_IDENTITY:
      return IdentityManager.checkSignInStatus(info.portalUrl + "/sharing")
        .then(() => portal.load())
        .then(() => {
          next({ 
            ...action,
            username: portal.user.username,
            fullname: portal.user.fullName,
            email: portal.user.email,
            thumbnailurl: portal.user.thumbnailUrl
          });

          store.dispatch({
            type: GET_USER_WEBSCENES
          });
        });


    case SIGN_IN:
      IdentityManager.getCredential(info.portalUrl + "/sharing");
      return next(action);


    case SIGN_OUT:
      IdentityManager.destroyCredentials();
      return window.location.reload();
      return next(action);


    case GET_USER_WEBSCENES:
      return portal.queryItems({
        query: "owner:" + portal.user.username + " AND type: Web Scene",
        sortField: "modified",
        sortOrder: "desc",
        num: 15
      })
        .then(({ results }) => next({ ...action, websceneItems: results}));


    default:
      return next(action);
  }
}


export default arcgisMiddleWare;
