import { combineReducers } from 'redux';
import ActionTypes from '../actions';
import { createCancellableApiReducer } from '../helpers/utils';

/**
 * Reducer to searchProducts API status, created using generator
 */
const searchProductsApi = createCancellableApiReducer([
  ActionTypes.SEARCH_PRODUCTS_REQUEST,
  ActionTypes.SEARCH_PRODUCTS_SUCCESS,
  ActionTypes.SEARCH_PRODUCTS_FAILURE,
  ActionTypes.SEARCH_PRODUCTS_CANCEL,
], true);

/**
 * Reducer to store product add/edit form data
 */
export const form = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.UI_PRODUCT_FORM_CHANGE:
      return { ...state, ...action.change };
    case ActionTypes.UI_SELECT_PRODUCT_TO_ADD:
      return {
        partNum: action.product.partNum,
        image: utils.getProductImageUrl(action.product),
        name: action.product.name.prodName,
        description: action.product.description.description,
        price: action.product.price.msrp,
        featured: false,
        specialNote: '',
        position: action.position
      };
    case ActionTypes.UI_SELECT_PRODUCT_TO_EDIT:
      return _.cloneDeep(action.flyerProduct);
    case ActionTypes.LOAD_FLYER_SUCCESS: case ActionTypes.CREATE_FLYER_SUCCESS: case ActionTypes.SUBMIT_FLYER_SUCCESS:
    case ActionTypes.ADD_PRODUCT_TO_FLYER_SUCCESS:
      return {};
    default:
      return state;
  }
};

/**
 * Reducer to know whether product is being added or edited via the form
 */
export const formAction = (state = '', action) => {
  switch (action.type) {
    case ActionTypes.UI_SELECT_PRODUCT_TO_ADD:
      return 'ADD';
    case ActionTypes.UI_SELECT_PRODUCT_TO_EDIT:
      return 'EDIT';
    default:
      return state;
  }
};

export default {
  products: combineReducers({
    searchProductsApi,
    form,
    formAction
  })
};
