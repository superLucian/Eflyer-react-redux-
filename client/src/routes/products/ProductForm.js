import React, { Component } from 'react';
import { connect } from 'react-redux';
import UiValidate from 'components/forms/UIValidate';
import { uiChangeProductForm } from 'actions/products';
import { addProductToFlyer, updateFlyerProduct } from 'actions/flyerProducts';
import { showNotification } from 'actions/notifications';

class ProductForm extends Component {

  constructor(...args) {
    super(...args);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onFieldChange(e) {
    const field = $(e.currentTarget).data('field');
    const value = field === 'featured' ? e.currentTarget.checked : e.currentTarget.value;
    this.props.dispatch(uiChangeProductForm({ [field]: value }));
  }

  onSubmit(e) {
    const {dispatch, autosave, form, formAction, flyerProducts} = this.props;
    const $form = $('#product-form-form');
    if ($form.valid()) {
      if (formAction === 'ADD') {
        const flyerProductsCount = Object.keys(flyerProducts).length;
        dispatch(addProductToFlyer(autosave.id, {...form, position: flyerProductsCount + 1}))
          .then(() => {
            dispatch(showNotification('Product added to the flyer.'));
          }).catch(() => {
            dispatch(showNotification('Failed to add a product to the flyer.', 'fail'));
          });
      }
      if (formAction === 'EDIT') {
        dispatch(updateFlyerProduct(form.id, form))
          .then(() => {
            dispatch(showNotification('Flyer product edited.'));
          }).catch(() => {
            dispatch(showNotification('Failed to edit the flyer product.', 'fail'));
          });
      }
    }
  }

  render() {
    const {form, formAction} = this.props;

    return (
      <div id="product-form">
        <UiValidate>
          <form id="product-form-form">
            <div className="image_details">
              <div className="image">
                {
                  form.image ? <img src={form.image}/> : null
                }
              </div>

              <div className="details">
                <div className="name_partnum">
                  <div className="name form-group">
                    <input className="form-control" id="name" name="name" placeholder="PRODUCT NAME" title="PRODUCT NAME"
                           value={form.name || ''} data-field="name" onChange={this.onFieldChange}
                           data-validate-input="" data-required="" data-message-required=""/>
                  </div>
                  <div className="partnum form-group">
                    <input className="form-control" id="partNum" name="partNum" placeholder="PART NUMBER" title="PART NUMBER"
                           value={form.partNum || ''} data-field="partNum" onChange={this.onFieldChange}
                           data-validate-input="" data-required="" data-message-required=""/>
                  </div>
                </div>

                <div className="desc_price_featured">
                  <div className="description form-group">
                    <textarea className="form-control" id="description" name="description" placeholder="DESCRIPTION" title="DESCRIPTION"
                              value={form.description || ''} data-field="description" onChange={this.onFieldChange}
                              data-validate-input="" data-required="" data-message-required=""/>
                  </div>
                  <div className="price_featured">
                    <div className="price form-group">
                      <input type="number" className="form-control" id="price" name="price" placeholder="PRICE" title="PRICE"
                             value={form.price || ''} data-field="price" onChange={this.onFieldChange}
                             data-validate-input="" data-required="" data-message-required=""/>
                    </div>
                    <div className="featured form-group">
                      <label htmlFor="featured">FEATURED</label>
                      <input type="checkbox" id="featured" name="featured" title="FEATURED"
                             checked={form.featured || false} data-field="featured" onChange={this.onFieldChange}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="note_action">
              <div className="note form-group">
                <input className="form-control" id="specialNote" name="specialNote" placeholder="SPECIAL NOTE ABOUT THIS PRODUCT"
                       title="SPECIAL NOTES" value={form.specialNote || ''} data-field="specialNote" onChange={this.onFieldChange}/>
              </div>
              <div className="action">
                <button type="button" className="btn" onClick={this.onSubmit} disabled={!formAction}>
                  {formAction === 'ADD' ? 'ADD TO LIST' : (formAction === 'EDIT' ? 'SAVE' : '')}
                </button>
              </div>
            </div>
          </form>
        </UiValidate>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  autosave: _.get(state, 'flyers.autosave'),
  form: _.get(state, 'products.form'),
  formAction: _.get(state, 'products.formAction'),
  flyerProducts: _.get(state, 'flyerProducts.pool')
});

export default connect(mapStateToProps)(ProductForm);
