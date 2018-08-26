/* eslint-disable max-len */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LeftPanel, Accordion, Section } from 'components/left-panel';
import { loadSuppliers } from 'actions/suppliers';
import { searchProducts, cancelSearchProducts, uiSelectProductToAdd } from 'actions/products';

class ProductsLeftPanel extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
      supplier: '',
      partNum: '',
      searchCounter: 0
    };

    this.onSupplierChange = this.onSupplierChange.bind(this);
    this.onPartNumberChange = this.onPartNumberChange.bind(this);
    this.search = this.search.bind(this);
    this.onProductClick = this.onProductClick.bind(this);
  }

  componentWillMount() {
    const {dispatch, suppliers} = this.props;
    suppliers || dispatch(loadSuppliers());
  }

  onSupplierChange(e) {
    this.setState({supplier: e.currentTarget.value}, this.search);
  }

  onPartNumberChange(e) {
    this.setState({partNum: e.currentTarget.value}, this.search);
  }

  onProductClick(e) {
    const { dispatch, searchProductsApi } = this.props;
    const partNum = $(e.currentTarget).data('partnum');
    const product = _.find(searchProductsApi.response, { partNum });
    dispatch(uiSelectProductToAdd(product));
  }

  search() {
    const counterSave = this.state.searchCounter + 1;

    this.setState({searchCounter: counterSave});

    if (this.state.supplier || this.state.partNum.length > 1) {
      setTimeout(() => {
        if (counterSave === this.state.searchCounter) {
          this.props.dispatch(cancelSearchProducts());
          this.props.dispatch(searchProducts(this.state.supplier, this.state.partNum));
        }
      }, consts.PRODUCTS_SEARCH_DELAY);
    }
  }

  render() {
    const {suppliers, searchProductsApi} = this.props;
    const {supplier, partNum} = this.state;
    const products = searchProductsApi.response;

    return (
      <LeftPanel>
        <Accordion>
          <Section title="PRODUCT SEARCH" id="product-search" collapsible={false} defaultCollapsed={false}>
            <form id="product-search-form">
              <div className="form-group">
                <select id="suppliers" name="suppliers" className="form-control" value={supplier} onChange={this.onSupplierChange}>
                  <option value="">SUPPLIER NAME</option>
                  {
                    (suppliers || []).map(_supplier => <option value={_supplier.id} key={_supplier.id}>{_supplier.name}</option>)
                  }
                </select>
              </div>
              <div className="form-group">
                <input className="form-control" id="partNum" name="partNum" placeholder="PART NUMBER" title="PART NUMBER" value={partNum} onChange={this.onPartNumberChange}/>
              </div>
            </form>
            <div className="results-title">RESULTS</div>
            <div className="results">
              {
                searchProductsApi.status === consts.API_LOADED_SUCCESS && Array.isArray(products) && products.length ?
                  products.map(product =>
                    <div className="product" key={product.partNum} data-partnum={product.partNum} onClick={this.onProductClick}>
                      <img src={utils.getProductImageUrl(product)}/>
                      <div className="details">
                        <div className="name">{_.get(product, 'name.prodName')}</div>
                        <div className="partnum-price">
                          <div className="partnum">{product.partNum}</div>
                          <div className="price">{utils.currency(product.price.msrp)}</div>
                        </div>
                      </div>
                    </div>
                  )
                  : null
              }
              {
                searchProductsApi.status === consts.API_LOADED_SUCCESS && Array.isArray(products) && products.length === 0 ?
                  <div className="zero-products">
                    Nothing matched your search criteria.
                  </div>
                  : null
              }
              {
                searchProductsApi.status === consts.API_LOADED_ERROR ?
                  <div className="alert alert-danger">Problem occurred. Please try again.</div>
                  : null
              }
            </div>
          </Section>
        </Accordion>
      </LeftPanel>
    );
  }
}

const mapStateToProps = (state) => ({
  suppliers: _.get(state, 'suppliers.suppliers'),
  searchProductsApi: _.get(state, 'products.searchProductsApi')
});

export default connect(mapStateToProps)(ProductsLeftPanel);
