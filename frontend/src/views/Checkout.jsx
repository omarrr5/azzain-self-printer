import React from 'react';
import '../assets/css/checkout.css';
import grab from '../assets/grab-logo.svg';
import tng from '../assets/tng.png';
import duit from '../assets/duit-now.png';
import BackgroundAnimation from '../components/BackgroundAnimation';

function Checkout() {
  return (
    <div className="checkout-container">
      <BackgroundAnimation className="background-animation" />
      <div className="iphone">
        <header className="header">
          <h1>Checkout</h1>
        </header>
        <form className="form">
          <fieldset>
            <legend>Payment Method</legend>
            <div className="form__radios">
              <div className="form__radio">
                <label htmlFor="grab">
                  <img src={grab} alt="Grab" />
                  Grab
                </label>
                <input checked id="grab" name="payment-method" type="radio" />
              </div>
              <div className="form__radio">
                <label htmlFor="tng">
                  <img src={tng} alt="tng" />
                  TNG
                </label>
                <input id="tng" name="payment-method" type="radio" />
              </div>
              <div className="form__radio">
                <label htmlFor="duit">
                  <img src={duit} alt="duit now" />
                  Duit Now
                </label>
                <input id="duit" name="payment-method" type="radio" />
              </div>
            </div>
          </fieldset>

          <div>
            <h2>Printing Bill</h2>
            <table>
              <tbody>
                <tr>
                  <td align="left">B/W(0.15) X (5) pages</td>
                  <td align="right"><span>0.75</span></td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td align='left'>Total</td>
                  <td align="right"><span>RM 0.75</span></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div>
            <button className="pay-button button--full" type="submit">
              <svg className="icon">
                <use xlinkHref="#icon-shopping-bag" />
              </svg>
              Pay Now
            </button>

            <svg>
              <symbol id="icon-shopping-bag" viewBox="0 0 24 24">
                <path d="M20 7h-4v-3c0-2.209-1.791-4-4-4s-4 1.791-4 4v3h-4l-2 17h20l-2-17zm-11-3c0-1.654 1.346-3 3-3s3 1.346 3 3v3h-6v-3zm-4.751 18l1.529-13h2.222v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h6v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h2.222l1.529 13h-15.502z" />
              </symbol>
            </svg>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
