/* eslint-disable max-len */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { LeftPanel, Accordion, Section } from 'components/left-panel';
import UiValidate from 'components/forms/UIValidate';
import { loadDesignOptions } from 'actions/options';
import { loadCompany } from 'actions/company';
import { uiChangeFlyer } from 'actions/flyers';

class DesignLeftPanel extends Component {

  constructor(...args) {
    super(...args);
    this.onThemeSelect = this.onThemeSelect.bind(this);
    this.onFrontCoverSelect = this.onFrontCoverSelect.bind(this);
    this.onInsideCoverSelect = this.onInsideCoverSelect.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  componentWillMount() {
    const {dispatch, designOptions, companyInfo} = this.props;
    designOptions || dispatch(loadDesignOptions());
    companyInfo || dispatch(loadCompany());
  }

  onThemeSelect(e) {
    const theme = $(e.currentTarget).data('id');
    const {dispatch, form} = this.props;
    if (form.theme !== theme) {
      dispatch(uiChangeFlyer({theme}));
    }
  }

  onFrontCoverSelect(e) {
    const frontCover = $(e.currentTarget).data('id');
    const {dispatch, form, designOptions, companyInfo} = this.props;
    if (form.frontCover !== frontCover) {
      const frontCovers = _.get(designOptions, 'frontCovers', []);
      const coverObj = _.find(frontCovers, {title: frontCover});
      dispatch(uiChangeFlyer({
        frontCover,
        companyLogo: consts.COMPANY_LOGO_LOCATION.replace('{{COLOR_CODE}}', _.capitalize(coverObj.logoColorCode)) + _.get(companyInfo, 'MemberLogo.large' + coverObj.logoColorCode.toUpperCase(), '')
      }));
    }
  }

  onInsideCoverSelect(e) {
    const insideCover = $(e.currentTarget).data('id');
    const {dispatch, form} = this.props;
    if (form.insideCover !== insideCover) {
      dispatch(uiChangeFlyer({insideCover}));
    }
  }

  onFieldChange(e) {
    const field = $(e.currentTarget).data('field');
    this.props.dispatch(uiChangeFlyer({ [field]: e.currentTarget.value }));
  }

  render() {
    const { designOptions, form } = this.props;

    const themes = _.get(designOptions, 'themes', []);
    const selectedTheme = form.theme;

    const frontCovers = _.get(designOptions, 'frontCovers', []);
    const selectedFrontCover = form.frontCover;
    const selectedFrontCoverIndex = _.findIndex(frontCovers, {title: selectedFrontCover});

    const insideCovers = _.get(designOptions, 'insideCovers', []);
    const selectedInsideCover = form.insideCover;
    const selectedInsideCoverIndex = _.findIndex(insideCovers, {title: selectedInsideCover});

    const companyName = form.companyName || '';
    const companyPhone = form.companyPhone || '';
    const companyWebsite = form.companyWebsite || '';
    const companyAddressStreet = form.companyAddressStreet || '';
    const companyAddressCity = form.companyAddressCity || '';
    const companyAddressState = form.companyAddressState || '';
    const companyAddressZip = form.companyAddressZip || '';
    const companyAddressCountry = form.companyAddressCountry || '';
    const companyDescription = form.companyDescription || '';

    const flyerName = form.flyerName || '';

    return (
      <LeftPanel>
        <Accordion>
          <Section title="COLOR" id="color" collapsible={true} defaultCollapsed={false}>
            {
              themes.map(theme =>
                <div className={'theme-selector' + (theme.title === selectedTheme ? ' selected' : '')}
                     style={{background: theme.color}}
                     data-id={theme.title} onClick={this.onThemeSelect}
                     key={theme.title}/>
              )
            }
          </Section>

          <Section title="COVERS" id="covers" collapsible={true} defaultCollapsed={true}>
            <div className="padding-left-right-30 margin-bottom-20">
              <div className="subtitle text-center">FRONT</div>
              {
                frontCovers.length ?
                  <Slider arrows={true} autoplay={false} centerMode={true} centerPadding="0px" draggable={false} focusOnSelect={false}
                          initialSlide={selectedFrontCoverIndex} infinite={true} slidesToShow={3} slidesToScroll={1}>
                    {
                      frontCovers.map((cover) =>
                        <div key={cover.title} title={cover.title} className={cover.title === selectedFrontCover ? 'selected' : ''}>
                          <img src={utils.localImg(cover.thumbnail)} data-id={cover.title} onClick={this.onFrontCoverSelect}/>
                        </div>
                      )
                    }
                  </Slider>
                  : null
              }
            </div>
            <div className="padding-left-right-30">
              <div className="subtitle text-center">INSIDE</div>
              {
                insideCovers.length ?
                  <Slider arrows={true} autoplay={false} centerMode={true} centerPadding="0px" draggable={false} focusOnSelect={false}
                          initialSlide={selectedInsideCoverIndex} infinite={true} slidesToShow={3} slidesToScroll={1}>
                    {
                      insideCovers.map((cover) =>
                        <div key={cover.title} title={cover.title} className={cover.title === selectedInsideCover ? 'selected' : ''}>
                          <img src={utils.localImg(cover.thumbnail)} data-id={cover.title} onClick={this.onInsideCoverSelect}/>
                        </div>
                      )
                    }
                  </Slider>
                  : null
              }
            </div>
          </Section>

          <UiValidate>
            <form id="contact-info-form">
              <Section title="COMPANY INFO" collapsible={true} defaultCollapsed={true}>
                <div className="form-group">
                  <input className="form-control" id="companyName" name="companyName" placeholder="Company Name" title="Company Name"
                         value={companyName} data-field="companyName" onChange={this.onFieldChange}
                         data-validate-input="" data-required="" data-message-required=""/>
                </div>
                <div className="form-group">
                  <input className="form-control" id="companyPhone" name="companyPhone" placeholder="Company Phone" title="Company Phone"
                         value={companyPhone} data-field="companyPhone" onChange={this.onFieldChange}
                         data-validate-input="" data-required="" data-message-required=""/>
                </div>
                <div className="form-group">
                  <input className="form-control" id="companyWebsite" name="companyWebsite" placeholder="Company Website" title="Company Website"
                         value={companyWebsite} data-field="companyWebsite" onChange={this.onFieldChange}
                         data-validate-input="" data-required="" data-message-required=""/>
                </div>

                <div>
                  <label className="subtitle" htmlFor="companyAddressStreet">MAILING ADDRESS</label>
                  <div className="form-group">
                    <input className="form-control" id="companyAddressStreet" name="companyAddressStreet" placeholder="Street" title="Street"
                           value={companyAddressStreet} data-field="companyAddressStreet" onChange={this.onFieldChange}
                           data-validate-input="" data-required="" data-message-required=""/>
                  </div>
                  <div className="form-group">
                    <input className="form-control" id="companyAddressCity" name="companyAddressCity" placeholder="City" title="City"
                           value={companyAddressCity} data-field="companyAddressCity" onChange={this.onFieldChange}
                           data-validate-input="" data-required="" data-message-required=""/>
                  </div>
                  <div className="form-group">
                    <input className="form-control" id="companyAddressState" name="companyAddressState" placeholder="State/Province" title="State/Province"
                           value={companyAddressState} data-field="companyAddressState" onChange={this.onFieldChange}
                           data-validate-input="" data-required="" data-message-required=""/>
                  </div>
                  <div className="form-group">
                    <input className="form-control" id="companyAddressZip" name="companyAddressZip" placeholder="Zip Code" title="Zip Code"
                           value={companyAddressZip} data-field="companyAddressZip" onChange={this.onFieldChange}
                           data-validate-input="" data-required="" data-message-required=""/>
                  </div>
                  <div className="form-group">
                    <select className="form-control" id="companyAddressCountry" name="companyAddressCountry" title="Country"
                            value={companyAddressCountry} data-field="companyAddressCountry" onChange={this.onFieldChange}
                            data-validate-input="" data-required="" data-message-required="">
                      <option value="">-- Select Country --</option>
                      {
                        Object.keys(consts.COUNTRIES).map(countryCode => <option value={countryCode} key={countryCode}>{consts.COUNTRIES[countryCode]}</option>)
                      }
                    </select>
                  </div>
                </div>
              </Section>

              <Section title="ABOUT US" collapsible={true} defaultCollapsed={true}>
                <div className="form-group">
                  <textarea className="form-control" rows="5" id="companyDescription" name="companyDescription" placeholder="About Us" title="About Us"
                            value={companyDescription} data-field="companyDescription" onChange={this.onFieldChange}
                            data-validate-input="" data-required="" data-message-required=""/>
                </div>
              </Section>

              <Section title="FLYER NAME" collapsible={true} defaultCollapsed={true}>
                <div className="form-group">
                  <input className="form-control" id="flyerName" name="flyerName" placeholder="Flyer Name" title="Flyer Name"
                         value={flyerName} data-field="flyerName" onChange={this.onFieldChange}
                         data-validate-input="" data-required="" data-message-required=""/>
                </div>
              </Section>
            </form>
          </UiValidate>
        </Accordion>
      </LeftPanel>
    );
  }
}

const mapStateToProps = (state) => ({
  designOptions: _.get(state, 'options.designOptions'),
  companyInfo: _.get(state, 'company.info'),
  form: _.get(state, 'flyers.form'),
});

export default connect(mapStateToProps)(DesignLeftPanel);
