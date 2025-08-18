import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../api';
import Toast from '../utils/Toast';

function PaymentModal({ show, onClose, pgDetails, onPaymentSuccess }) {
  const [loading, setLoading] = useState(false);
  const [paymentOrder, setPaymentOrder] = useState(null);

  useEffect(() => {
    if (show && pgDetails) {
      createPaymentOrder();
    }
  }, [show, pgDetails]);

  const createPaymentOrder = async () => {
    try {
      setLoading(true);
      const response = await api.post('/api/payment/create-order', {
        pgId: pgDetails.id,
        currency: 'INR'
        // amount is not needed - backend will use PG's rent amount
      });
      
      setPaymentOrder(response.data);
      initializeRazorpay(response.data);
    } catch (error) {
      console.error('Error creating payment order:', error);
      Toast.error('Failed to create payment order: ' + (error.response?.data?.message || error.message));
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const initializeRazorpay = (orderData) => {
    const options = {
      key: orderData.keyId,
      amount: orderData.amount * 100, // Convert to paise
      currency: orderData.currency,
      name: 'PGVaale',
      description: orderData.description,
      order_id: orderData.orderId,
      prefill: {
        name: orderData.prefillName || '',
        email: orderData.prefillEmail || '',
        contact: orderData.prefillContact || ''
      },
      theme: {
        color: '#6366F1'
      },
      handler: function (response) {
        handlePaymentSuccess(response);
      },
      modal: {
        ondismiss: function () {
          onClose();
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePaymentSuccess = async (response) => {
    try {
      setLoading(true);
      
      // Verify payment with backend
      const verificationResponse = await api.post('/api/payment/verify', {
        razorpayOrderId: response.razorpay_order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpaySignature: response.razorpay_signature
      });

      if (verificationResponse.data.success) {
        Toast.success('Payment successful! PG has been booked.');
        onPaymentSuccess();
        onClose();
      } else {
        Toast.error('Payment verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      Toast.error('Payment verification failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (!show || !pgDetails) return null;

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-header border-0 bg-transparent">
            <h5 className="modal-title fw-bold" style={{ color: '#4F46E5' }}>
              <i className="fas fa-credit-card me-2"></i>Complete Payment
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              disabled={loading}
            ></button>
          </div>
          
          <div className="modal-body p-4">
            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Setting up payment...</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-4">
                  <i className="fas fa-home text-primary" style={{ fontSize: '3rem' }}></i>
                </div>
                
                <h6 className="fw-bold mb-3" style={{ color: '#2C3E50' }}>
                  PG #{pgDetails.id} - {pgDetails.region}
                </h6>
                
                <div className="card border-0 shadow-sm rounded-3 mb-4" style={{ background: '#f8fafc' }}>
                  <div className="card-body p-3">
                    <div className="row text-center">
                      <div className="col-6">
                        <small className="text-muted d-block">Monthly Rent</small>
                        <span className="fw-bold text-primary">₹{pgDetails.rent}/month</span>
                      </div>
                      <div className="col-6">
                        <small className="text-muted d-block">Booking Fee</small>
                        <span className="fw-bold text-success">₹{pgDetails.rent}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted mb-0">
                  Click "Proceed to Payment" to complete your PG booking. The booking fee is equal to one month's rent (₹{pgDetails.rent}).
                </p>
              </div>
            )}
          </div>
          
          <div className="modal-footer border-0">
            <button
              type="button"
              className="btn btn-outline-secondary rounded-3 px-4"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            {!loading && paymentOrder && (
              <button
                type="button"
                className="btn btn-primary rounded-3 px-4"
                onClick={() => initializeRazorpay(paymentOrder)}
                style={{ 
                  background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)', 
                  border: 'none' 
                }}
              >
                <i className="fas fa-credit-card me-2"></i>Proceed to Payment
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>
    </div>
  );
}

PaymentModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  pgDetails: PropTypes.object,
  onPaymentSuccess: PropTypes.func.isRequired
};

export default PaymentModal; 