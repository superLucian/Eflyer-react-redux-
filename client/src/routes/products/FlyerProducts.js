import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadFlyerProducts, deleteFlyerProduct } from 'actions/flyerProducts';
import { uiSelectProductToEdit } from 'actions/products';
import { showNotification } from 'actions/notifications';

class FlyerProducts extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
      confirmRemoveModalVisible: false
    };

    this.onEditClick = this.onEditClick.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
  }

  componentWillMount() {
    const {dispatch, autosave, flyerProducts} = this.props;
    flyerProducts || dispatch(loadFlyerProducts(autosave.id));
  }

  onEditClick(e) {
    const {dispatch, flyerProducts} = this.props;
    const id = $(e.currentTarget).data('id');
    dispatch(uiSelectProductToEdit(flyerProducts[id]));
  }

  onRemoveClick(e) {
    if (window.confirm('Are you sure to remove this product from the flyer?')) {
      const {dispatch} = this.props;
      const id = $(e.currentTarget).data('id');
      dispatch(deleteFlyerProduct(id))
      .then(() => {
        dispatch(showNotification('Product removed from the flyer.'));
      }).catch(() => {
        dispatch(showNotification('Failed to remove a product from the flyer.', 'fail'));
      });
    }
  }

  render() {
    const {list} = this.props;

    return (
      <div id="flyer-products">
        <h3 className="title">PRODUCTS IN FLYER</h3>
        <div className="list">
          {
            list.map(fp =>
              <div className="product" key={fp.id}>
                <div className="image">
                  <img src={fp.image}/>
                </div>
                <div className="details">
                  <div className="name">{fp.name}</div>
                  <div className="partnum-price">
                    <div className="partnum">{fp.partNum}</div>
                    <div className="price">{utils.currency(fp.price)}</div>
                    <div className="featured">{fp.featured ? 'FEATURED' : ''}</div>
                  </div>
                  <div className="description">
                    {fp.description.substr(0, 60) + (fp.description && fp.description.length > 60 ? '...' : '')}
                  </div>
                </div>
                <div className="actions">
                  <button type="button" className="btn edit" data-id={fp.id} onClick={this.onEditClick}>
                    EDIT <i className="fa fa-pencil"/>
                  </button>
                  <button type="button" className="btn remove" data-id={fp.id} onClick={this.onRemoveClick}>
                    REMOVE <i className="fa fa-close"/>
                  </button>
                </div>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const flyerProducts = _.get(state, 'flyerProducts.pool');
  const list = _.orderBy(_.values(flyerProducts), 'position');
  return {
    autosave: _.get(state, 'flyers.autosave'),
    flyerProducts,
    list
  };
};

export default connect(mapStateToProps)(FlyerProducts);
