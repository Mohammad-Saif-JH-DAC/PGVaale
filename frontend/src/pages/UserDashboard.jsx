import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import api from '../api';
import './UserDashboard.css';
import Toast from '../utils/Toast';



import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaRupeeSign, FaMapMarkerAlt, FaCheckCircle, FaImages, FaUser } from 'react-icons/fa';
import UserProfile from '../components/UserProfile';

const MyBookedPGs = ({ bookedPGs }) => {
  // This component is not used, but if needed, define defaultIcon here.
}

// Dashboard Home Component
const DashboardHome = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Debug: Check if token exists
      const token = sessionStorage.getItem('token');
      console.log('Token exists:', !!token);
      
      // Fetch user profile to get real name
      let userName = 'Guest';
      if (token) {
        try {
          const profileResponse = await api.get('/api/user/profile');
          setUserProfile(profileResponse.data);
          userName = profileResponse.data.name || 'User';
        } catch (profileError) {
          console.warn('Could not fetch user profile, using default name');
          userName = 'User';
        }
      }
      
      // Try to get user-specific data, fallback to general data if 403
      let response;
      try {
        response = await api.get('/api/user/pgs');
      } catch (userError) {
        if (userError.response?.status === 403) {
          console.warn('User-specific endpoint not accessible, using general endpoint');
          // Fallback to general PG data that works
          response = await api.get('/api/pg/all');
        } else {
          throw userError;
        }
      }
      
      setDashboardData({
        userName: userName,
        data: response.data
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      Toast.error('Error loading dashboard data: ' + (error.response?.data || error.message));
      
      // Handle 403 specifically
      if (error.response?.status === 403) {
        console.error('403 Forbidden - User not authorized or token invalid');
        Toast.error('You are not authorized to view this data. Please log in.');
        // Set fallback data for logged-in users
        setDashboardData({
          userName: 'User',
          data: []
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
        paddingTop: '2rem',
        paddingBottom: '2rem'
      }}>
        <div className="container">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold mb-3" style={{ color: '#2C3E50' }}>
            👋 Welcome, <span className="text-primary">{dashboardData?.userName || 'User'}</span>!
          </h1>
          <p className="lead text-muted mb-4">
            Your personal dashboard for managing PG rooms, tiffin services, and maid bookings
          </p>
        </div>

        {/* Quick Actions Card */}
        <div className="card border-0 shadow-lg rounded-4 mb-5" style={{ 
          background: 'rgba(255, 255, 255, 0.9)', 
          backdropFilter: 'blur(10px)' 
        }}>
          <div className="card-header border-0 bg-transparent">
            <h5 className="fw-bold mb-0" style={{ color: '#2C3E50' }}>
              <i className="fas fa-rocket text-primary me-2"></i>Quick Actions
            </h5>
          </div>
          <div className="card-body p-4">
            <div className="row g-3">
              <div className="col-md-3 mb-3">
                <a href="/pgrooms" className="btn btn-outline-primary w-100 rounded-3 shadow-sm" style={{ 
                  borderColor: '#6366F1', 
                  color: '#6366F1',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#6366F1';
                  e.target.style.transform = 'translateY(0)';
                }}>
                  <i className="fas fa-home me-2"></i>Browse PG Rooms
                </a>
              </div>
              <div className="col-md-3 mb-3">
                <a href="/user-dashboard/tiffins" className="btn btn-outline-warning w-100 rounded-3 shadow-sm" style={{ 
                  borderColor: '#F59E0B', 
                  color: '#F59E0B',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#F59E0B';
                  e.target.style.transform = 'translateY(0)';
                }}>
                  <i className="fas fa-utensils me-2"></i>Order Tiffin
                </a>
              </div>
              <div className="col-md-3 mb-3">
                <a href="/maid-hiring" className="btn btn-outline-success w-100 rounded-3 shadow-sm" style={{ 
                  borderColor: '#10B981', 
                  color: '#10B981',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#10B981';
                  e.target.style.transform = 'translateY(0)';
                }}>
                  <i className="fas fa-broom me-2"></i>Hire Maid Service
                </a>
              </div>
              <div className="col-md-3 mb-3">
                <a href="/user-dashboard/bookings" className="btn btn-outline-info w-100 rounded-3 shadow-sm" style={{ 
                  borderColor: '#06B6D4', 
                  color: '#06B6D4',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#06B6D4';
                  e.target.style.transform = 'translateY(0)';
                }}>
                  <i className="fas fa-clipboard-list me-2"></i>My Bookings
                </a>
              </div>
            </div>
            
            <div className="row g-3 mt-2">
              <div className="col-md-6 mb-3">
                <a href="/user-dashboard/profile" className="btn btn-outline-secondary w-100 rounded-3 shadow-sm" style={{ 
                  borderColor: '#6B7280', 
                  color: '#6B7280',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#6B7280';
                  e.target.style.transform = 'translateY(0)';
                }}>
                  <i className="fas fa-user me-2"></i>Manage Profile
                </a>
              </div>
              <div className="col-md-6 mb-3">
                <a href="/user-dashboard/feedback" className="btn btn-outline-info w-100 rounded-3 shadow-sm" style={{ 
                  borderColor: '#06B6D4', 
                  color: '#06B6D4',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#06B6D4';
                  e.target.style.transform = 'translateY(0)';
                }}>
                  <i className="fas fa-star me-2"></i>Give Feedback
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// PG Interests Component (User's Booked PGs)
const PGInterests = () => {
  const [bookedPGs, setBookedPGs] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const fetchBookedPGs = async () => {
    try {
      const response = await api.get('/api/pg/user/booked');
      setBookedPGs(response.data);
    } catch (error) {
      //console.error('Error fetching PG interests:', error);
      Toast.error('Error loading PG interests: ' + (error.response?.data || error.message));
      console.error('Error fetching booked PGs:', error);
      if (error.response?.status === 401) {
        sessionStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        setBookedPGs([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookedPGs();
  }, []);

  const getImageUrl = (imgPath) => {
    if (!imgPath || typeof imgPath !== 'string') return '/placeholder.png';
    const trimmed = imgPath.trim();
    if (trimmed === '') return '/placeholder.png';
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    if (trimmed.startsWith('/')) return `${window.location.origin.replace('3000', '8080')}${trimmed}`;
    return `https://${trimmed}`;
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">
        <FaCheckCircle className="text-success me-2" /> My Booked PGs
      </h2>

      {bookedPGs.length > 0 ? (
        <div className="row g-4">
          {bookedPGs.map((pg) => (
            <div className="col-12" key={pg.id}>
              <div className="card shadow-sm h-100 border-primary">
                <div className="card-header bg-primary text-white d-flex justify-content-between">
                  <span>
                    <FaMapMarkerAlt /> #{pg.id} - {pg.region}
                  </span>
                  <span>
                    <FaUser /> {pg.owner?.name || 'N/A'}
                  </span>
                </div>

                <div className="card-body">
                  {/* Images */}
                  {pg.imagePaths?.length > 0 ? (
                    <div className="d-flex flex-wrap justify-content-start gap-2 mb-3">
                      {pg.imagePaths.map((imgPath, index) => (
                        <img
                          key={index}
                          src={getImageUrl(imgPath)}
                          alt={`pg-img-${index}`}
                          style={{
                            width: '100px',
                            height: '80px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder.png';
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted">
                      <FaImages className="me-1" /> No images available
                    </p>
                  )}

                  {/* Map */}
                  {pg.latitude && pg.longitude && (
                    <MapContainer
                      center={[pg.latitude, pg.longitude]}
                      zoom={13}
                      scrollWheelZoom={false}
                      style={{ height: '250px', borderRadius: '10px' }}
                    >
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <Marker position={[pg.latitude, pg.longitude]} icon={defaultIcon}>
                        <Popup>PG #{pg.id} - {pg.region}</Popup>
                      </Marker>
                    </MapContainer>
                  )}

                  {/* PG Details */}
                  <ul className="list-group list-group-flush mt-3">
                    <li className="list-group-item">
                      <FaRupeeSign className="me-2" />
                      Rent: ₹{pg.rent || 'N/A'}
                    </li>
                    <li className="list-group-item">
                      Amenities: <span className="text-muted">{pg.amenities || 'N/A'}</span>
                    </li>
                    <li className="list-group-item">
                      General Preference: <span className="text-muted">{pg.generalPreference || 'N/A'}</span>
                    </li>
                    <li className="list-group-item">
                      Nearby Resources: <span className="text-muted">{pg.nearbyResources || 'N/A'}</span>
                    </li>
                    <li className="list-group-item">
                      Availability: <span className="text-muted">{pg.availability || 'N/A'}</span>
                    </li>
                    <li className="list-group-item">
                      Coordinates: <span className="text-muted">{pg.latitude}, {pg.longitude}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="badge bg-success">
                        <FaCheckCircle className="me-1" /> Booked
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center shadow-sm p-4">
          <div className="card-body">
            <div style={{ fontSize: '4rem' }}>😴</div>
            <h5 className="text-muted mt-3">No Booked PGs Yet</h5>
            <p className="text-muted">Start browsing and find a PG that suits you.</p>
            <a href="/pgrooms" className="btn btn-outline-primary mt-2">
              Browse PG Rooms
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

// Tiffin Services Component
const TiffinServices = () => {
  const [tiffinProviders, setTiffinProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    region: '',
    category: ''
  });
  const [bookingStatus, setBookingStatus] = useState({});
  const [selectedTiffin, setSelectedTiffin] = useState(null);
  const [showTiffinModal, setShowTiffinModal] = useState(false);

  // Fetch tiffin providers
  const fetchTiffinProviders = async (filterParams = filters) => {
    try {
      setLoading(true);
      let url = '/api/tiffin/all';
      const queryParams = [];

      if (filterParams.region) queryParams.push(`region=${encodeURIComponent(filterParams.region)}`);
      if (filterParams.category) queryParams.push(`category=${encodeURIComponent(filterParams.category)}`);

      if (queryParams.length > 0) {
        url += '?' + queryParams.join('&');
      }

      const res = await api.get(url);
      setTiffinProviders(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Error fetching tiffin providers:', error);
      setTiffinProviders([]);
      Toast.error('Failed to load tiffin providers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load tiffin providers on mount
  useEffect(() => {
    fetchTiffinProviders();
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    fetchTiffinProviders(updatedFilters);
  };

  // Handle booking
  const handleBookTiffin = async (providerId) => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      Toast.error('Please log in to book tiffin services.');
      return;
    }

    try {
      await api.post(`/api/tiffin/book/${providerId}`);
      setBookingStatus(prev => ({ ...prev, [providerId]: 'booked' }));
      Toast.success('Tiffin service booked successfully!');
    } catch (error) {
      console.error('Error booking tiffin:', error);
      Toast.error('Failed to book tiffin service. Please try again.');
    }
  };

  // Handle request click (for modal)
  const handleRequestClick = (tiffin) => {
    setSelectedTiffin(tiffin);
    setShowTiffinModal(true);
  };

  // Handle request submit (for modal)
  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/user/tiffins/${selectedTiffin.id}/request`);
      Toast.info(`Request sent to ${selectedTiffin.name}!`);
      setShowTiffinModal(false);
      setSelectedTiffin(null);
      Toast.success('Request sent successfully!');
    } catch (error) {
      Toast.error('Error sending request: ' + error.response?.data);
    }
  };

  // Default error message when no providers are available
  const NoProvidersMessage = () => (
    <div className="text-center py-5">
      <div className="card shadow border-0 rounded-4 p-5">
        <div className="mb-4">
          <i className="fas fa-utensils text-muted" style={{ fontSize: '4rem' }}></i>
        </div>
        <h3 className="text-muted mb-3">No Tiffin Providers Available</h3>
        <p className="text-muted mb-4">
          {filters.region || filters.category 
            ? 'No tiffin providers match your current filters. Try adjusting your search criteria.'
            : 'Currently no tiffin providers are available in your area. Please check back later or contact us for assistance.'
          }
        </p>
        {(filters.region || filters.category) && (
          <button 
            className="btn btn-primary"
            onClick={() => {
              setFilters({ region: '', category: '' });
              fetchTiffinProviders({ region: '', category: '' });
            }}
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading tiffin providers...</p>
      </div>
    );
  }

  return (
    <>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
        paddingTop: '2rem',
        paddingBottom: '2rem'
      }}>
        <div className="container">
          {/* Header Section */}
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h1 className="display-6 fw-bold mb-3" style={{ color: '#2C3E50' }}>
                <i className="fas fa-utensils me-3" style={{ color: '#4F46E5' }}></i>
                Hire Tiffin Services
              </h1>
              <p className="lead text-muted">
                Find and book reliable tiffin services for delicious home-cooked meals
              </p>
            </div>
          </div>

          {/* Filters Section */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card shadow border-0 rounded-4 p-4">
                <h5 className="mb-3 fw-bold">Filter Tiffin Providers</h5>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Region</label>
                    <select
                      className="form-select"
                      name="region"
                      value={filters.region}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Regions</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Pune">Pune</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Kolkata">Kolkata</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Food Category</label>
                    <select
                      className="form-select"
                      name="category"
                      value={filters.category}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Categories</option>
                      <option value="Veg">Vegetarian</option>
                      <option value="Non-Veg">Non-Vegetarian</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* No Providers Message */}
          {!loading && tiffinProviders.length === 0 && <NoProvidersMessage />}

          {/* Tiffin Providers Grid */}
          {!loading && tiffinProviders.length > 0 && (
            <div className="row g-4">
              {tiffinProviders.map((provider) => (
                <div key={provider.id} className="col-md-6 col-lg-4">
                  <div className="card h-100 shadow border-0 rounded-4">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <div className="flex-shrink-0">
                          <img
                            src={provider.profileImage || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=150&q=80"}
                            alt={provider.name}
                            className="rounded-circle"
                            style={{ width: 60, height: 60, objectFit: 'cover' }}
                          />
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h5 className="card-title mb-1 fw-bold">{provider.name}</h5>
                          <p className="text-muted mb-0 small">
                            <i className="fas fa-map-marker-alt me-1"></i>
                            {provider.region}
                          </p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <span className="badge bg-primary me-2">{provider.cuisine}</span>
                        <span className="badge bg-success me-2">{provider.mealType}</span>
                        {provider.isVegetarian && (
                          <span className="badge bg-success">Vegetarian</span>
                        )}
                      </div>

                      <p className="card-text text-muted small mb-3">
                        {provider.description || 'Delicious home-cooked meals delivered to your doorstep.'}
                      </p>

                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <span className="fw-bold text-primary">₹{provider.pricePerMeal || 50}</span>
                          <span className="text-muted small">/meal</span>
                        </div>
                        <div className="text-warning">
                          {provider.rating && provider.rating > 0 ? (
                            <>
                              <i className="fas fa-star"></i>
                              <span className="ms-1">{provider.rating.toFixed(1)}</span>
                              <span className="text-muted small ms-1">({Math.round(provider.rating)}/5)</span>
                            </>
                          ) : (
                            <>
                              <i className="fas fa-star text-muted"></i>
                              <span className="ms-1 text-muted">No ratings yet</span>
                            </>
                          )}
                        </div>
                      </div>

                      <button
                        className={`btn w-100 ${
                          bookingStatus[provider.id] === 'booked' 
                            ? 'btn-success' 
                            : 'btn-primary'
                        }`}
                        onClick={() => handleBookTiffin(provider.id)}
                        disabled={bookingStatus[provider.id] === 'booked'}
                      >
                        {bookingStatus[provider.id] === 'booked' 
                          ? 'Booked ✓' 
                          : 'Book Tiffin Service'
                        }
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Additional Information */}
          {!loading && tiffinProviders.length > 0 && (
            <div className="row mt-5">
              <div className="col-12">
                <div className="card shadow border-0 rounded-4 p-4">
                  <h5 className="fw-bold mb-3">Why Choose Our Tiffin Services?</h5>
                  <div className="row g-3">
                    <div className="col-md-3">
                      <div className="text-center">
                        <i className="fas fa-shield-alt text-primary mb-2" style={{ fontSize: '2rem' }}></i>
                        <h6 className="fw-bold">Hygienic</h6>
                        <p className="text-muted small">All providers follow strict hygiene standards</p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="text-center">
                        <i className="fas fa-clock text-primary mb-2" style={{ fontSize: '2rem' }}></i>
                        <h6 className="fw-bold">Timely Delivery</h6>
                        <p className="text-muted small">Fresh meals delivered on schedule</p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="text-center">
                        <i className="fas fa-heart text-primary mb-2" style={{ fontSize: '2rem' }}></i>
                        <h6 className="fw-bold">Home-Cooked</h6>
                        <p className="text-muted small">Authentic home-style cooking</p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="text-center">
                        <i className="fas fa-wallet text-primary mb-2" style={{ fontSize: '2rem' }}></i>
                        <h6 className="fw-bold">Affordable</h6>
                        <p className="text-muted small">Budget-friendly meal options</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tiffin Request Modal */}
      {showTiffinModal && selectedTiffin && (
        <div className="modal fade show" style={{display: 'block'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Request Tiffin Service from {selectedTiffin.name}</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowTiffinModal(false)}
                ></button>
              </div>
              <form onSubmit={handleRequestSubmit}>
                <div className="modal-body">
                  <div className="alert alert-info">
                    <strong>Provider Details:</strong><br/>
                    <strong>Name:</strong> {selectedTiffin.name}<br/>
                    <strong>Food Category:</strong> {selectedTiffin.foodCategory}<br/>
                    <strong>Price per Meal:</strong> ₹{selectedTiffin.price}<br/>
                    <strong>Region:</strong> {selectedTiffin.region}
                  </div>
                  <p className="text-muted">
                    By sending this request, you're asking the tiffin provider to accept you as a customer. 
                    They will review your request and either accept or reject it.
                  </p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowTiffinModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-warning">
                    Send Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Backdrop */}
      {showTiffinModal && (
        <div className="modal-backdrop fade show"></div>
      )}
    </>
  );
};

// Missing Components - Placeholder implementations
const TiffinRequests = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center mb-4">Tiffin Requests</h2>
            <div className="alert alert-info">
              <i className="fas fa-info-circle me-2"></i>
              Tiffin requests feature is coming soon!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MaidServices = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center mb-4">Maid Services</h2>
            <div className="alert alert-info">
              <i className="fas fa-info-circle me-2"></i>
              Maid services feature is coming soon!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyBookings = () => {
  const [bookings, setBookings] = useState({
    maidRequests: [],
    tiffinRequests: [],
    pgInterests: []
  });
  const [bookedPGs, setBookedPGs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchBookings();
    fetchBookedPGs();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/user/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      Toast.error('Error loading bookings: ' + (error.response?.data || error.message));
      if (error.response?.status === 401) {
        sessionStorage.removeItem('token');
        window.location.href = '/login';
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchBookedPGs = async () => {
    try {
      const response = await api.get('/api/pg/user/booked');
      setBookedPGs(response.data);
    } catch (error) {
      console.error('Error fetching booked PGs:', error);
      if (error.response?.status === 401) {
        sessionStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        setBookedPGs([]);
      }
    }
  };

  const getImageUrl = (imgPath) => {
    if (!imgPath || typeof imgPath !== 'string') return '/placeholder.png';
    const trimmed = imgPath.trim();
    if (trimmed === '') return '/placeholder.png';
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    if (trimmed.startsWith('/')) return `${window.location.origin.replace('3000', '8080')}${trimmed}`;
    return `https://${trimmed}`;
  };

  const defaultIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'PENDING':
      case 'REQUESTED':
        return 'bg-warning';
      case 'ACCEPTED':
        return 'bg-success';
      case 'REJECTED':
        return 'bg-danger';
      case 'CANCELLED':
        return 'bg-secondary';
      case 'COMPLETED':
        return 'bg-primary';
      default:
        return 'bg-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING':
      case 'REQUESTED':
        return '⏳';
      case 'ACCEPTED':
        return '✅';
      case 'REJECTED':
        return '❌';
      case 'CANCELLED':
        return '🚫';
      case 'COMPLETED':
        return '🎉';
      default:
        return '❓';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCancelRequest = async (requestId, type) => {
    try {
      if (type === 'maid') {
        await api.delete(`/api/user/maid-requests/${requestId}`);
      } else if (type === 'tiffin') {
        await api.delete(`/api/user/requests/${requestId}`);
      }
      Toast.success('Request cancelled successfully!');
      fetchBookings(); // Refresh the list
    } catch (error) {
      console.error('Error cancelling request:', error);
      Toast.error('Failed to cancel request. Please try again.');
    }
  };

  const getFilteredBookings = () => {
    switch (activeTab) {
      case 'maid':
        return { ...bookings, tiffinRequests: [], pgInterests: [] };
      case 'tiffin':
        return { ...bookings, maidRequests: [], pgInterests: [] };
      case 'pg':
        return { ...bookings, maidRequests: [], tiffinRequests: [] };
      default:
        return bookings;
    }
  };

  const filteredBookings = getFilteredBookings();
  const totalBookings = (filteredBookings.maidRequests?.length || 0) + 
                       (filteredBookings.tiffinRequests?.length || 0) + 
                       (bookedPGs?.length || 0);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
        paddingTop: '2rem',
        paddingBottom: '2rem'
      }}>
        <div className="container">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading your bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold mb-3" style={{ color: '#2C3E50' }}>
            <i className="fas fa-clipboard-list text-primary me-3"></i>
            My Bookings
          </h1>
          <p className="lead text-muted mb-4">
            Track all your service requests and bookings in one place
          </p>
        </div>

        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-3 mb-3">
            <div className="card border-0 shadow-sm rounded-4 text-center">
              <div className="card-body">
                <div className="text-primary mb-2">
                  <i className="fas fa-clipboard-list" style={{ fontSize: '2rem' }}></i>
                </div>
                <h4 className="fw-bold mb-1">{totalBookings}</h4>
                <p className="text-muted mb-0 small">Total Bookings</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card border-0 shadow-sm rounded-4 text-center">
              <div className="card-body">
                <div className="text-warning mb-2">
                  <i className="fas fa-user-tie" style={{ fontSize: '2rem' }}></i>
                </div>
                <h4 className="fw-bold mb-1">{bookings.maidRequests?.length || 0}</h4>
                <p className="text-muted mb-0 small">Maid Requests</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card border-0 shadow-sm rounded-4 text-center">
              <div className="card-body">
                <div className="text-success mb-2">
                  <i className="fas fa-utensils" style={{ fontSize: '2rem' }}></i>
                </div>
                <h4 className="fw-bold mb-1">{bookings.tiffinRequests?.length || 0}</h4>
                <p className="text-muted mb-0 small">Tiffin Requests</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card border-0 shadow-sm rounded-4 text-center">
              <div className="card-body">
                <div className="text-info mb-2">
                  <i className="fas fa-home" style={{ fontSize: '2rem' }}></i>
                </div>
                <h4 className="fw-bold mb-1">{bookedPGs?.length || 0}</h4>
                <p className="text-muted mb-0 small">Booked PGs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-3">
                <div className="d-flex flex-wrap gap-2">
                  <button
                    className={`btn ${activeTab === 'all' ? 'btn-primary' : 'btn-outline-primary'} rounded-3`}
                    onClick={() => setActiveTab('all')}
                  >
                    <i className="fas fa-list me-2"></i>All Bookings
                  </button>
                  <button
                    className={`btn ${activeTab === 'maid' ? 'btn-warning' : 'btn-outline-warning'} rounded-3`}
                    onClick={() => setActiveTab('maid')}
                  >
                    <i className="fas fa-user-tie me-2"></i>Maid Services
                  </button>
                  <button
                    className={`btn ${activeTab === 'tiffin' ? 'btn-success' : 'btn-outline-success'} rounded-3`}
                    onClick={() => setActiveTab('tiffin')}
                  >
                    <i className="fas fa-utensils me-2"></i>Tiffin Services
                  </button>
                  <button
                    className={`btn ${activeTab === 'pg' ? 'btn-info' : 'btn-outline-info'} rounded-3`}
                    onClick={() => setActiveTab('pg')}
                  >
                    <i className="fas fa-home me-2"></i>Booked PGs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Content */}
        {totalBookings === 0 ? (
          <div className="text-center py-5">
            <div className="card shadow border-0 rounded-4 p-5">
              <div className="mb-4">
                <i className="fas fa-clipboard-list text-muted" style={{ fontSize: '4rem' }}></i>
              </div>
              <h3 className="text-muted mb-3">No Bookings Yet</h3>
              <p className="text-muted mb-4">
                You haven't made any service requests yet. Start exploring our services!
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <a href="/maid-hiring" className="btn btn-warning rounded-3">
                  <i className="fas fa-user-tie me-2"></i>Hire Maid
                </a>
                <a href="/user-dashboard/tiffins" className="btn btn-success rounded-3">
                  <i className="fas fa-utensils me-2"></i>Order Tiffin
                </a>
                <a href="/pgrooms" className="btn btn-info rounded-3">
                  <i className="fas fa-home me-2"></i>Browse PGs
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {/* Maid Requests */}
            {filteredBookings.maidRequests && filteredBookings.maidRequests.length > 0 && (
              <div className="col-12">
                <div className="card border-0 shadow-sm rounded-4">
                  <div className="card-header bg-warning bg-opacity-10 border-0">
                    <h5 className="mb-0 fw-bold text-warning">
                      <i className="fas fa-user-tie me-2"></i>Maid Service Requests
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Maid Name</th>
                            <th>Request Date</th>
                            <th>Service Period</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredBookings.maidRequests.map((request) => (
                            <tr key={request.id}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div>
                                    <div className="fw-semibold">{request.maid?.name || 'N/A'}</div>
                                    <small className="text-muted">{request.maid?.mobileNumber || 'N/A'}</small>
                                  </div>
                                </div>
                              </td>
                              <td>{formatDate(request.assignedDateTime)}</td>
                              <td>
                                {request.startDate && request.endDate ? (
                                  <div>
                                    <div><strong>From:</strong> {new Date(request.startDate).toLocaleDateString()}</div>
                                    <div><strong>To:</strong> {new Date(request.endDate).toLocaleDateString()}</div>
                                    {request.timeSlot && <div><strong>Time:</strong> {request.timeSlot}</div>}
                                  </div>
                                ) : (
                                  'N/A'
                                )}
                              </td>
                              <td>
                                <small className="text-muted">
                                  {request.userAddress || 'No address provided'}
                                </small>
                              </td>
                              <td>
                                <span className={`badge ${getStatusBadgeClass(request.status)}`}>
                                  {getStatusIcon(request.status)} {request.status}
                                </span>
                              </td>
                              <td>
                                {request.status === 'PENDING' && (
                                  <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleCancelRequest(request.id, 'maid')}
                                    title="Cancel Request"
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tiffin Requests */}
            {filteredBookings.tiffinRequests && filteredBookings.tiffinRequests.length > 0 && (
              <div className="col-12">
                <div className="card border-0 shadow-sm rounded-4">
                  <div className="card-header bg-success bg-opacity-10 border-0">
                    <h5 className="mb-0 fw-bold text-success">
                      <i className="fas fa-utensils me-2"></i>Tiffin Service Requests
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Provider Name</th>
                            <th>Request Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredBookings.tiffinRequests.map((request) => (
                            <tr key={request.id}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div>
                                    <div className="fw-semibold">{request.tiffinName || 'N/A'}</div>
                                    <small className="text-muted">{request.tiffin?.region || 'N/A'}</small>
                                  </div>
                                </div>
                              </td>
                              <td>{formatDate(request.assignedDateTime)}</td>
                              <td>
                                <span className={`badge ${getStatusBadgeClass(request.status)}`}>
                                  {getStatusIcon(request.status)} {request.status}
                                </span>
                              </td>
                              <td>
                                {request.status === 'PENDING' && (
                                  <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleCancelRequest(request.id, 'tiffin')}
                                    title="Cancel Request"
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PG Interests */}
            {activeTab === 'pg' && (
              <div className="col-12">
                {bookedPGs && bookedPGs.length > 0 ? (
                  <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-header bg-info bg-opacity-10 border-0">
                      <h5 className="mb-0 fw-bold text-info">
                        <i className="fas fa-home me-2"></i>Booked PG Rooms
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="row g-4">
                        {bookedPGs.map((pg) => (
                          <div className="col-12" key={pg.id}>
                            <div className="card shadow-sm h-100 border-primary">
                              <div className="card-header bg-primary text-white d-flex justify-content-between">
                                <span>
                                  <FaMapMarkerAlt /> #{pg.id} - {pg.region}
                                </span>
                                <span>
                                  <FaUser /> {pg.owner?.name || 'N/A'}
                                </span>
                              </div>

                              <div className="card-body">
                                {/* Images */}
                                {pg.imagePaths?.length > 0 ? (
                                  <div className="d-flex flex-wrap justify-content-start gap-2 mb-3">
                                    {pg.imagePaths.map((imgPath, index) => (
                                      <img
                                        key={index}
                                        src={getImageUrl(imgPath)}
                                        alt={`pg-img-${index}`}
                                        style={{
                                          width: '100px',
                                          height: '80px',
                                          objectFit: 'cover',
                                          borderRadius: '8px',
                                        }}
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src = '/placeholder.png';
                                        }}
                                      />
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-muted">
                                    <FaImages className="me-1" /> No images available
                                  </p>
                                )}

                                {/* Map */}
                                {pg.latitude && pg.longitude && (
                                  <MapContainer
                                    center={[pg.latitude, pg.longitude]}
                                    zoom={13}
                                    scrollWheelZoom={false}
                                    style={{ height: '250px', borderRadius: '10px' }}
                                  >
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <Marker position={[pg.latitude, pg.longitude]} icon={defaultIcon}>
                                      <Popup>PG #{pg.id} - {pg.region}</Popup>
                                    </Marker>
                                  </MapContainer>
                                )}

                                {/* PG Details */}
                                <ul className="list-group list-group-flush mt-3">
                                  <li className="list-group-item">
                                    <FaRupeeSign className="me-2" />
                                    Rent: ₹{pg.rent || 'N/A'}
                                  </li>
                                  <li className="list-group-item">
                                    Amenities: <span className="text-muted">{pg.amenities || 'N/A'}</span>
                                  </li>
                                  <li className="list-group-item">
                                    General Preference: <span className="text-muted">{pg.generalPreference || 'N/A'}</span>
                                  </li>
                                  <li className="list-group-item">
                                    Nearby Resources: <span className="text-muted">{pg.nearbyResources || 'N/A'}</span>
                                  </li>
                                  <li className="list-group-item">
                                    Availability: <span className="text-muted">{pg.availability || 'N/A'}</span>
                                  </li>
                                  <li className="list-group-item">
                                    Coordinates: <span className="text-muted">{pg.latitude}, {pg.longitude}</span>
                                  </li>
                                  <li className="list-group-item">
                                    <span className="badge bg-success">
                                      <FaCheckCircle className="me-1" /> Booked
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-header bg-info bg-opacity-10 border-0">
                      <h5 className="mb-0 fw-bold text-info">
                        <i className="fas fa-home me-2"></i>Booked PG Rooms
                      </h5>
                    </div>
                    <div className="card-body text-center py-5">
                      <div style={{ fontSize: '4rem' }}>😴</div>
                      <h5 className="text-muted mt-3">No Booked PGs Yet</h5>
                      <p className="text-muted mb-4">Start browsing and find a PG that suits you.</p>
                      <a href="/pgrooms" className="btn btn-outline-info mt-2">
                        Browse PG Rooms
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}


          </div>
        )}

        {/* Refresh Button */}
        {totalBookings > 0 && (
          <div className="text-center mt-4">
            <button
              className="btn btn-outline-primary rounded-3"
              onClick={() => {
                fetchBookings();
                fetchBookedPGs();
              }}
              disabled={loading}
            >
              <i className="fas fa-sync-alt me-2"></i>
              {loading ? 'Refreshing...' : 'Refresh Bookings'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ActiveMaidServices = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center mb-4">Active Maid Services</h2>
            <div className="alert alert-info">
              <i className="fas fa-info-circle me-2"></i>
              Active maid services feature is coming soon!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userFeedback, setUserFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackType, setFeedbackType] = useState('web'); // 'web', 'maid', 'tiffin'
  const [selectedMaid, setSelectedMaid] = useState('');
  const [selectedTiffin, setSelectedTiffin] = useState('');
  const [maids, setMaids] = useState([]);
  const [tiffins, setTiffins] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(false);

  // Check if user is authenticated
  const token = sessionStorage.getItem('token');
  const isAuthenticated = !!token;

  const emojiMap = {
    1: { icon: '😠', label: 'Very Bad' },
    2: { icon: '😞', label: 'Bad' },
    3: { icon: '😐', label: 'Okay' },
    4: { icon: '🙂', label: 'Good' },
    5: { icon: '😄', label: 'Excellent' },
  };

  const handleClick = (value) => setRating(value);
  const handleHover = (value) => setHover(value);
  const handleLeave = () => setHover(0);

  // Fetch available maids and tiffins
  const fetchOptions = async () => {
    if (!isAuthenticated) return;
    
    setLoadingOptions(true);
    try {
      // Fetch maids
      const maidsResponse = await api.get('/api/user/maids');
      setMaids(maidsResponse.data || []);
      
      // Fetch tiffins
      const tiffinsResponse = await api.get('/api/user/tiffins');
      setTiffins(tiffinsResponse.data || []);
    } catch (error) {
      console.error('Error fetching options:', error);
    } finally {
      setLoadingOptions(false);
    }
  };

  // Fetch user's previous feedback
  const fetchUserFeedback = async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    try {
      const [webFeedback, maidFeedback, tiffinFeedback] = await Promise.all([
        api.get('/api/feedback-web/user').catch(() => ({ data: [] })),
        api.get('/api/user/feedback').catch(() => ({ data: [] })),
        api.get('/api/user/tiffin-feedback').catch(() => ({ data: [] }))
      ]);

      const allFeedback = [
        ...(webFeedback.data || []).map(f => ({ ...f, type: 'web' })),
        ...(maidFeedback.data || []).map(f => ({ ...f, type: 'maid' })),
        ...(tiffinFeedback.data || []).map(f => ({ ...f, type: 'tiffin' }))
      ];

      setUserFeedback(allFeedback);
    } catch (error) {
      console.error('Error fetching user feedback:', error);
      setUserFeedback([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserFeedback();
    fetchOptions();
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      Toast.error('Please log in to submit feedback.');
      return;
    }

    if (rating === 0) {
      Toast.error('Please select a rating.');
      return;
    }

    if (!feedback.trim()) {
      Toast.error('Please provide feedback.');
      return;
    }

    // Validate service selection for maid and tiffin feedback
    if (feedbackType === 'maid' && !selectedMaid) {
      Toast.error('Please select a maid.');
      return;
    }

    if (feedbackType === 'tiffin' && !selectedTiffin) {
      Toast.error('Please select a tiffin service.');
      return;
    }

    setSubmitting(true);

    try {
      let response;
      
      switch (feedbackType) {
        case 'maid':
          response = await api.post('/api/user/feedback', {
            maidId: selectedMaid,
            rating,
            feedback: feedback.trim()
          });
          break;
        case 'tiffin':
          response = await api.post('/api/user/tiffin-feedback', {
            tiffinId: selectedTiffin,
            rating,
            feedback: feedback.trim()
          });
          break;
        default: // web
          response = await api.post('/api/feedback-web', {
            rating,
            feedback: feedback.trim()
          });
          break;
      }

      if (response.status === 200 || response.status === 201) {
        Toast.success('Thank you for your feedback!');
        setSubmitted(true);
        setRating(0);
        setFeedback('');
        setSelectedMaid('');
        setSelectedTiffin('');
        // Refresh the feedback list
        fetchUserFeedback();
      } else {
        Toast.error('Failed to submit feedback. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setRating(0);
    setFeedback('');
    setSelectedMaid('');
    setSelectedTiffin('');
    setFeedbackType('web');
  };

  const getFeedbackTypeLabel = (type) => {
    switch (type) {
      case 'maid': return 'Maid Service';
      case 'tiffin': return 'Tiffin Service';
      default: return 'General Feedback';
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
        paddingTop: '2rem',
        paddingBottom: '2rem'
      }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card border-0 shadow-lg rounded-4 text-center">
                <div className="card-body p-5">
                  <div className="mb-4">
                    <i className="fas fa-lock text-warning" style={{fontSize: '4rem'}}></i>
                  </div>
                  <h3 className="fw-bold mb-3" style={{ color: '#2C3E50' }}>Login Required</h3>
                  <p className="text-muted mb-4">
                    Please log in to submit feedback and help us improve our services.
                  </p>
                  <button 
                    className="btn btn-primary rounded-3 px-4"
                    style={{ background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)', border: 'none' }}
                    onClick={() => window.location.href = '/login'}
                  >
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Go to Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold mb-3" style={{ color: '#2C3E50' }}>
            <i className="fas fa-star text-primary me-3"></i>
            Feedback & Reviews
          </h1>
          <p className="lead text-muted mb-4">
            Share your experience and help us improve our services
          </p>
        </div>

        <div className="row">
          {/* Feedback Form */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg rounded-4 mb-4">
              <div className="card-header border-0 bg-transparent">
                <h5 className="fw-bold mb-0" style={{ color: '#2C3E50' }}>
                  <i className="fas fa-comment-dots text-primary me-2"></i>
                  Submit Your Feedback
                </h5>
              </div>
              <div className="card-body p-4">
                {submitted ? (
                  <div className="text-center">
                    <div className="mb-3">
                      <i className="fas fa-check-circle text-success" style={{fontSize: '4rem'}}></i>
                    </div>
                    <h4 className="fw-bold mb-3" style={{ color: '#2C3E50' }}>Thank You!</h4>
                    <p className="text-muted mb-4">
                      Your feedback has been submitted successfully. We appreciate your input!
                    </p>
                    <button 
                      className="btn btn-primary rounded-3 px-4"
                      style={{ background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)', border: 'none' }}
                      onClick={resetForm}
                    >
                      <i className="fas fa-plus me-2"></i>
                      Submit Another Feedback
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {/* Feedback Type Selection */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold" style={{ color: '#374151' }}>
                        <i className="fas fa-tag text-primary me-2"></i>
                        Select Feedback Type
                      </label>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="feedbackType"
                              id="webFeedback"
                              value="web"
                              checked={feedbackType === 'web'}
                              onChange={(e) => setFeedbackType(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="webFeedback">
                              <i className="fas fa-globe text-primary me-2"></i>
                              General Feedback
                            </label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="feedbackType"
                              id="maidFeedback"
                              value="maid"
                              checked={feedbackType === 'maid'}
                              onChange={(e) => setFeedbackType(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="maidFeedback">
                              <i className="fas fa-user-tie text-primary me-2"></i>
                              Maid Service
                            </label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="feedbackType"
                              id="tiffinFeedback"
                              value="tiffin"
                              checked={feedbackType === 'tiffin'}
                              onChange={(e) => setFeedbackType(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="tiffinFeedback">
                              <i className="fas fa-utensils text-primary me-2"></i>
                              Tiffin Service
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Service Selection for Maid and Tiffin */}
                    {feedbackType === 'maid' && (
                      <div className="mb-4">
                        <label className="form-label fw-semibold" style={{ color: '#374151' }}>
                          <i className="fas fa-user-tie text-primary me-2"></i>
                          Select Maid
                        </label>
                        {loadingOptions ? (
                          <div className="text-center">
                            <div className="spinner-border spinner-border-sm text-primary" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                            <span className="ms-2">Loading maids...</span>
                          </div>
                        ) : (
                          <select
                            className="form-select rounded-3 shadow-sm"
                            value={selectedMaid}
                            onChange={(e) => setSelectedMaid(e.target.value)}
                            required
                            style={{ background: '#f8fafc', border: '1px solid #e5e7eb' }}
                          >
                            <option value="">Select a maid...</option>
                            {maids.map((maid) => (
                              <option key={maid.id} value={maid.id}>
                                {maid.name} - {maid.specialization}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    )}

                    {feedbackType === 'tiffin' && (
                      <div className="mb-4">
                        <label className="form-label fw-semibold" style={{ color: '#374151' }}>
                          <i className="fas fa-utensils text-primary me-2"></i>
                          Select Tiffin Service
                        </label>
                        {loadingOptions ? (
                          <div className="text-center">
                            <div className="spinner-border spinner-border-sm text-primary" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                            <span className="ms-2">Loading tiffin services...</span>
                          </div>
                        ) : (
                          <select
                            className="form-select rounded-3 shadow-sm"
                            value={selectedTiffin}
                            onChange={(e) => setSelectedTiffin(e.target.value)}
                            required
                            style={{ background: '#f8fafc', border: '1px solid #e5e7eb' }}
                          >
                            <option value="">Select a tiffin service...</option>
                            {tiffins.map((tiffin) => (
                              <option key={tiffin.id} value={tiffin.id}>
                                {tiffin.name} - {tiffin.category}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    )}

                    <div className="mb-4 text-center">
                      <label className="form-label fw-semibold mb-3" style={{ color: '#374151' }}>
                        How would you rate your experience with {getFeedbackTypeLabel(feedbackType)}?
                      </label>
                      <div className="mb-3">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            type="button"
                            key={value}
                            className="btn btn-link p-0 mx-2"
                            style={{
                              fontSize: '2.5rem',
                              opacity: (hover || rating) === value ? 1 : 0.5,
                              transform: (hover || rating) === value ? 'scale(1.2)' : 'scale(1)',
                              transition: 'transform 0.2s',
                              textShadow: (hover || rating) === value ? '0 2px 8px #6366F1' : 'none',
                            }}
                            onClick={() => handleClick(value)}
                            onMouseEnter={() => handleHover(value)}
                            onMouseLeave={handleLeave}
                            title={emojiMap[value].label}
                          >
                            {emojiMap[value].icon}
                          </button>
                        ))}
                      </div>
                      {hover !== 0 || rating !== 0 ? (
                        <div className="fw-semibold" style={{ fontSize: '1.1em', color: '#6366F1' }}>
                          {(hover ? emojiMap[hover] : emojiMap[rating]).label}
                        </div>
                      ) : (
                        <div style={{ fontSize: '0.9em', color: '#888' }}>Click an emoji to rate</div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold" style={{ color: '#374151' }}>
                        Tell us more about your experience:
                      </label>
                      <textarea
                        className="form-control rounded-3 shadow-sm"
                        rows={4}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Share your thoughts, suggestions, or any issues you've encountered..."
                        required
                        style={{ background: '#f8fafc', border: '1px solid #e5e7eb' }}
                      />
                    </div>

                    <div className="text-center">
                      <button 
                        type="submit" 
                        className="btn btn-primary rounded-3 px-5"
                        disabled={submitting || rating === 0 || !feedback.trim()}
                        style={{ 
                          background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)', 
                          border: 'none',
                          opacity: (submitting || rating === 0 || !feedback.trim()) ? 0.6 : 1
                        }}
                      >
                        {submitting ? (
                          <>
                            <i className="fas fa-spinner fa-spin me-2"></i>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-paper-plane me-2"></i>
                            Submit Feedback
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Previous Feedback */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-lg rounded-4">
              <div className="card-header border-0 bg-transparent">
                <h5 className="fw-bold mb-0" style={{ color: '#2C3E50' }}>
                  <i className="fas fa-history text-primary me-2"></i>
                  Your Previous Feedback
                </h5>
              </div>
              <div className="card-body p-4">
                {loading ? (
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : userFeedback.length > 0 ? (
                  <div className="space-y-3">
                    {userFeedback.map((item, index) => (
                      <div key={index} className="border-bottom pb-3 mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div className="d-flex align-items-center">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="me-1">
                                {i < item.rating ? '⭐' : '☆'}
                              </span>
                            ))}
                          </div>
                          <small className="text-muted">
                            {new Date(item.createdAt || Date.now()).toLocaleDateString()}
                          </small>
                        </div>
                        <div className="mb-2">
                          <span className={`badge ${item.type === 'maid' ? 'bg-primary' : item.type === 'tiffin' ? 'bg-success' : 'bg-secondary'} me-2`}>
                            {getFeedbackTypeLabel(item.type)}
                          </span>
                          {item.type === 'maid' && item.maid && (
                            <small className="text-muted">
                              <i className="fas fa-user-tie me-1"></i>
                              {item.maid.name}
                            </small>
                          )}
                          {item.type === 'tiffin' && item.tiffin && (
                            <small className="text-muted">
                              <i className="fas fa-utensils me-1"></i>
                              {item.tiffin.name}
                            </small>
                          )}
                        </div>
                        <p className="mb-0 text-muted small">{item.feedback}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted">
                    <i className="fas fa-comment-slash mb-2" style={{fontSize: '2rem'}}></i>
                    <p className="mb-0">No previous feedback submitted yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main UserDashboard Component
function UserDashboard() {
  return (
    <div className="user-dashboard">
      <Routes>
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/pgs" element={<PGInterests />} />
        <Route path="/tiffins" element={<TiffinServices />} />
        <Route path="/tiffins/requests" element={<TiffinRequests />} />

        <Route path="/maids" element={<MaidServices />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/active-services" element={<ActiveMaidServices />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/" element={<DashboardHome />} />
      </Routes>
    </div>
  );
}

export default UserDashboard; 