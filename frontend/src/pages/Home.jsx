import React from 'react';


function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
      paddingTop: 0,
    }}>

      {/* Hero Section */}
      <section className="container py-5">
        <div className="row align-items-center">
          {/* Text Column */}
          <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
            <h1 className="fw-bold mb-3" style={{ color: '#2C3E50' }}>
              <span style={{ fontSize: '2rem', fontWeight: 'normal' }}>Welcome to</span>{' '}
              <span className="text-primary" style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                PGVaale
              </span>
            </h1>
            <p className="lead mb-4" style={{ color: '#374151' }}>
              Your one-stop platform for finding, booking, and managing PG rooms, tiffin, and maid
              services. Hassle-free, trusted, and tailored for you.
            </p>
         <a
          href="/register"
          className="btn btn-md btn-primary shadow px-4 py-2 me-2 mb-2"
          >
          Get Started
         </a>
         <a
          href="/pgrooms"
          className="btn btn-md btn-outline-primary shadow px-4 py-2 mb-2"
          >
          Browse PGs
        </a>

          </div>

          {/* Carousel Column (replacing static image) */}
          <div className="col-md-6 text-center">
            <div
              id="heroPGCarousel"
              className="carousel slide rounded-4 shadow-lg border border-3 border-primary"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="https://www.addressofchoice.com/aoc_assets/blog/1567247428_Staying_in_a_PG_Accommodation_in_Bangalore_of_Boys_and_Girls.jpg"
                    className="d-block w-100 rounded-4"
                    style={{ height: 350, objectFit: 'cover' }}
                    alt="PG 1"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="data:image/jpeg;base64,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"
                    className="d-block w-100 rounded-4"
                    style={{ height: 350, objectFit: 'cover' }}
                    alt="PG 2"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="data:image/jpeg;base64,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"
                    className="d-block w-100 rounded-4"
                    style={{ height: 350, objectFit: 'cover' }}
                    alt="PG 3"
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#heroPGCarousel"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#heroPGCarousel"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
<section className="container pt-5 pb-3">   {/* Reduced bottom padding */}
  <div className="row text-center mb-5">
    <div className="col">
      <h2 className="fw-bold mb-3" style={{ color: '#2C3E50' }}>What We Offer</h2>
      <p className="text-muted mb-0">
        All-in-one platform for students, working professionals, and service providers.
      </p>
    </div>
  </div>

  <div className="row g-4">
    {/* Main Big Card - PG Rooms */}
    <div className="col-md-8">
      <div className="card h-100 shadow border-0 rounded-4">
        <img
          src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80"
          alt="PG Rooms"
          className="card-img-top rounded-top-4"
          style={{ height: 450, objectFit: 'cover' }}
        />
        <div className="card-body">
          <h4 className="card-title fw-bold">Find PG Rooms</h4>
          <p className="card-text text-muted fs-5">
            Discover verified PG accommodations with detailed amenities, photos, and real reviews.
            Book instantly and move in with confidence.
          </p>
        </div>
      </div>
    </div>

    {/* Two stacked smaller cards - Tiffin + Maid */}
    <div className="col-md-4 d-flex flex-column gap-4">
      {/* Tiffin Service */}
      <div className="card shadow border-0 rounded-4 flex-fill">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
          alt="Tiffin Service"
          className="card-img-top rounded-top-4"
          style={{ height: 180, objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title fw-bold">Tiffin Services</h5>
          <p className="card-text text-muted">
            Home-cooked, hygienic, and affordable meals delivered to your doorstep.
            Choose from a variety of tiffin providers in your area.
          </p>
        </div>
      </div>

      {/* Maid Service */}
      <div className="card shadow border-0 rounded-4 flex-fill">
        <img
          src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
          alt="Maid Service"
          className="card-img-top rounded-top-4"
          style={{ height: 180, objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title fw-bold">Maid Services</h5>
          <p className="card-text text-muted">
            Book trusted and background-verified maids for cleaning, cooking, and more.
            Flexible timings and transparent pricing.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Regions Carousel Section */}
      <section className="container py-5">
        <div className="row text-center mb-4">
          <div className="col">
            <h2 className="fw-bold mb-3" style={{ color: '#2C3E50' }}>We are available in</h2>
            <p className="text-muted mb-0">Expanding across major cities</p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div id="regionsCarousel" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner rounded-4 shadow">
                <div className="carousel-item active">
                  <img src="data:image/jpeg;base64,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" alt="Mumbai" className="d-block w-100 rounded-top-4" style={{height: 250, objectFit: 'cover'}} />
                  <div className="d-flex flex-column align-items-center p-4 bg-white">
                    <h3 className="fw-bold mb-2">Mumbai</h3>
                    <p className="text-muted">The city of dreams, now with PGVaale!</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="https://assets-news.housing.com/news/wp-content/uploads/2021/06/10190922/All-you-need-to-know-about-the-Regional-Ring-Road-in-Hyderabad-FB-1200x700-compressed.jpg" alt="Hyderabad" className="d-block w-100 rounded-top-4" style={{height: 250, objectFit: 'cover'}} />
                  <div className="d-flex flex-column align-items-center p-4 bg-white">
                    <h3 className="fw-bold mb-2">Hyderabad</h3>
                    <p className="text-muted">Find your perfect stay in the City of Pearls.</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="data:image/jpeg;base64,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" alt="Pune" className="d-block w-100 rounded-top-4" style={{height: 250, objectFit: 'cover'}} />
                  <div className="d-flex flex-column align-items-center p-4 bg-white">
                    <h3 className="fw-bold mb-2">Pune</h3>
                    <p className="text-muted">Student city, working hub, and now PGVaale ready!</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=800&q=80" alt="Delhi" className="d-block w-100 rounded-top-4" style={{height: 250, objectFit: 'cover'}} />
                  <div className="d-flex flex-column align-items-center p-4 bg-white">
                    <h3 className="fw-bold mb-2">Delhi</h3>
                    <p className="text-muted">Capital comfort with PGVaale services.</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNeNqCdNHVGo3gnDNt9_LT3ng2NNY5YRg3kg&s" alt="Kolkata" className="d-block w-100 rounded-top-4" style={{height: 250, objectFit: 'cover'}} />
                  <div className="d-flex flex-column align-items-center p-4 bg-white">
                    <h3 className="fw-bold mb-2">Kolkata</h3>
                    <p className="text-muted">City of Joy, now easier to live in!</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="https://www.scobserver.in/wp-content/uploads/2021/07/Court-Data-Images-3.png" alt="More regions soon" className="d-block w-100 rounded-top-4" style={{height: 250, objectFit: 'cover'}} />
                  <div className="d-flex flex-column align-items-center p-4 bg-white">
                    <h3 className="fw-bold mb-2">More regions coming soon!</h3>
                    <p className="text-muted">Stay tuned as we expand to more cities across India.</p>
                  </div>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#regionsCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#regionsCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Website Review Carousel Section */}
      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div id="reviewCarousel" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner rounded-4 shadow">
                <div className="carousel-item active">
                  <div className="card shadow border-0 rounded-4 p-4">
                    <div className="d-flex align-items-center mb-3">
                      <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="rounded-circle me-3" style={{ width: 60, height: 60, objectFit: 'cover' }} />
                      <div>
                        <h5 className="mb-0 fw-bold">Rahul Sharma</h5>
                        <div style={{ color: '#FFD700', fontSize: '1.2rem' }}>★★★★★</div>
                      </div>
                    </div>
                    <p className="mb-0 text-muted">
                      "PGVaale made my move to Pune so much easier! The booking process was smooth, and the reviews helped me pick the best PG. Highly recommended!"
                    </p>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="card shadow border-0 rounded-4 p-4">
                    <div className="d-flex align-items-center mb-3">
                      <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="rounded-circle me-3" style={{ width: 60, height: 60, objectFit: 'cover' }} />
                      <div>
                        <h5 className="mb-0 fw-bold">Priya Verma</h5>
                        <div style={{ color: '#FFD700', fontSize: '1.2rem' }}>★★★★☆</div>
                      </div>
                    </div>
                    <p className="mb-0 text-muted">
                      "Great platform for finding tiffin and maid services. The interface is user-friendly and support is quick!"
                    </p>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="card shadow border-0 rounded-4 p-4">
                    <div className="d-flex align-items-center mb-3">
                      <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="User" className="rounded-circle me-3" style={{ width: 60, height: 60, objectFit: 'cover' }} />
                      <div>
                        <h5 className="mb-0 fw-bold">Amit Singh</h5>
                        <div style={{ color: '#FFD700', fontSize: '1.2rem' }}>★★★★★</div>
                      </div>
                    </div>
                    <p className="mb-0 text-muted">
                      "I found a PG in Hyderabad within a day. The reviews and photos were genuine. Will use again!"
                    </p>
                  </div>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#reviewCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#reviewCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="container py-5">
        <div className="row align-items-center bg-primary rounded-4 shadow-lg p-5">
          <div className="col-md-8 text-white">
            <h3 className="fw-bold mb-2">Ready to find your next home or service?</h3>
            <p className="mb-0">Join PGVaale today and experience a seamless, modern way to live and thrive.</p>
          </div>
          <div className="col-md-4 text-md-end text-center mt-4 mt-md-0">
            <a href="/register" className="btn btn-lg btn-light text-primary fw-bold px-5 py-2 shadow">
              Sign Up Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;