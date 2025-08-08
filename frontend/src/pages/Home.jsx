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
          <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
            <h1 className="display-4 fw-bold mb-3" style={{ color: '#2C3E50' }}>
              Welcome to <span className="text-primary">PGVaale</span>
            </h1>
            <p className="lead mb-4" style={{ color: '#374151' }}>
              Your one-stop platform for finding, booking, and managing PG rooms, tiffin, and maid services. Hassle-free, trusted, and tailored for you.
            </p>
            <a href="/register" className="btn btn-lg btn-primary shadow px-5 py-2 me-2 mb-2">
              Get Started
            </a>
            <a href="/pgrooms" className="btn btn-lg btn-outline-primary shadow px-5 py-2 mb-2">
              Browse PGs
            </a>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="https://content.jdmagicbox.com/v2/comp/delhi/e3/011pxx11.xx11.160928133111.h2e3/catalogue/vardhman-pg-karol-bagh-delhi-paying-guest-accommodations-for-women-rww7ofmbr9.jpg"
              alt="PGVaale Hero"
              className="img-fluid rounded-4 shadow-lg border border-3 border-primary"
              style={{ maxHeight: 350, objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-5">
        <div className="row text-center mb-5">
          <div className="col">
            <h2 className="fw-bold mb-3" style={{ color: '#2C3E50' }}>What We Offer</h2>
            <p className="text-muted mb-0">All-in-one platform for students, working professionals, and service providers.</p>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow border-0 rounded-4">
              <img
                src="https://images.jdmagicbox.com/v2/comp/gandhinagar-gujarat/y5/9999pxx79.xx79.240709183614.t3y5/catalogue/divine-girls-pg-gandhinagar-gujarat-hostels-for-women-3ce2e1886k.jpg"
                alt="PG Rooms"
                className="card-img-top rounded-top-4"
                style={{ height: 200, objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title fw-bold">Find PG Rooms</h5>
                <p className="card-text text-muted">
                  Discover verified PG accommodations with detailed amenities, photos, and real reviews. Book instantly and move in with confidence.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow border-0 rounded-4">
              <img
                src="https://mumbaidabbawala.in/wp-content/uploads/2020/01/IMG_20181209_200729_442.jpg"
                alt="Tiffin Service"
                className="card-img-top rounded-top-4"
                style={{ height: 200, objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title fw-bold">Tiffin Services</h5>
                <p className="card-text text-muted">
                  Home-cooked, hygienic, and affordable meals delivered to your doorstep. Choose from a variety of tiffin providers in your area.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow border-0 rounded-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzo08bmdaJj7CgcmgUtbrJ3RFJVDmmUxyA1Q&s"
                alt="Maid Service"
                className="card-img-top rounded-top-4"
                style={{ height: 200, objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title fw-bold">Maid Services</h5>
                <p className="card-text text-muted">
                  Book trusted and background-verified maids for cleaning, cooking, and more. Flexible timings and transparent pricing.
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
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8_JfGe7WLc0fQ6zjEkWF4-hXYVz6MgM2LAg&s" alt="Mumbai" className="d-block w-100 rounded-top-4" style={{height: 250, objectFit: 'cover'}} />
                  <div className="d-flex flex-column align-items-center p-4 bg-white">
                    <h3 className="fw-bold mb-2">Mumbai</h3>
                    <p className="text-muted">The city of dreams, now with PGVaale!</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSZWXAGTx8WF97NTFGwenw2GrPkHlKjQcC8g&s" alt="Hyderabad" className="d-block w-100 rounded-top-4" style={{height: 250, objectFit: 'cover'}} />
                  <div className="d-flex flex-column align-items-center p-4 bg-white">
                    <h3 className="fw-bold mb-2">Hyderabad</h3>
                    <p className="text-muted">Find your perfect stay in the City of Pearls.</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80" alt="Pune" className="d-block w-100 rounded-top-4" style={{height: 250, objectFit: 'cover'}} />
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
                  <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUTExMVFhUXFRcVGBcYFRcYFxUVFxYWFxcYGBUYHSggHRolGxgXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAJUBUQMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAECBAUGB//EAEgQAAEDAgMEBwMIBwcDBQAAAAEAAhEDIQQSMQVBUWEGEyIycYGRobHRFCNCUmKSwfAVM1NygtLxBxYkorLC4TSD4hdDk7PT/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAKhEBAQACAQMEAAUFAQAAAAAAAAECESESMUEDBBNRFFJhkaEjQmJxgSL/2gAMAwEAAhEDEQA/APQHvZMSh1NngiRCzaVQg+HFaVLGkCY9F6lxuPZ50svdSfgHbkB+GcBN1rVMWHXbY8FWqYgmxV45ZeSsig2iSD2oPDd6pYTG1GWkEcD+BRy0FAqYbgr4vFT/AKa9HabXth8232VunSY5u4jiuaZhn34b9NEZwq0j2ScvGPessvSn9tXM75jVrMZPDnKrYtgIGXy4oFHGsP6z2ArRZiaAAE/5T71N3j9nuVjda4WuIRaFaTotrNSeyxDuUQs92HcDYW57vBVM5e8HTpKiIuCJCs064Pe1VNzHTyVilQWeWvJwex0Mpw0ypswyt06KxuUjWY2mpNnUKwKXgk1gCsNaFhcm0gbaal1SmXJi9SYdRqHlKNmTp7CtlRaay+k+1jhWMeGufnqMYGtbmeTd5a1o1Lmtc3kSOa2cPJa0ublcQC5szlJFxO+DaUWjSTSjBQDVJSYoUmobSpApGnKRKH1gSL0BIqJKi6qEJ1RAO9yEXqNR6A5yqQrR+tTCuqjnqIcq6U9TQFdSFZUGuUwl0ntc65RNRV5TyjQ2m56ESmcUJxTkK0TMkhJKtJ25hgaTO9XaD5bAueCarst7dBKIzZ5BDpv6LuyzxvlxzGwCtQPBKi0HUlb7cKHtEwUB+AA015qJ60vC76dnKjSoNIvPiptphg0lD2riuqpy6RmOUQCYJ0uNFdoPpVWh7LgiRdTfU50cx42zxTI0Vjrg8ZXC6OKXKAmfh2jencpSkrHq4I94BNQYJvrzWvk4KNSmHai6r5S6VSiGaQIVuoCGy1VK1FwNhZWqBMQbqcvtUBouJ1C1cPTESqlNiu0HQsc61wgjaSmKRCkHBFY5Y21tJAJKWc8VYyqFSklsB9YhuqJyEMhVIm1LOptcoNYnDSnotsrpMR/hwHAOGIpVJMdlrSc7oOvZJb/FO5bjai4XpS+a9gX6N70ZIa8kD+IN++eC6jY9WaFPtF3ZiTrbd5aeSWtntqiqkaqq51Co9LpPqX210zq6zW1uKLKOkdS2aik1ypB4Rqb0rDlFlM4KYTtakYfVFCfTV2oIQXBEo0pFgUYVh4UYVyp0g1qIkApBARhMVjYbaubG1KYYe6G5jA/Vl5m94Jc7juPFa7kSFbpF7kBzkR5QXFXIm02cp1GCkmlrhqhVpt4BVnYpIPKzmNXcoPTZGiq7TxgpNzOGpgXsSrNMrk9rbbFfsOo1QGvkAscHd2IcL759iZdxauNbVjPcA2tAB8iruEqNaABusL6DguebUpxanUJ5McPaUXDuBs1zg+O64EEjlp7ETKy7FxlmnQV653BVKtR7ty0sJh3OpscdS0E+KK2hC6Pkxk4Y9FZlOo42V+lRKKWDeFMGyzyy32XjjruA+ihgIj3koYSh6grKKI0KbaoATPqjxU7qtRIFEY5V2vUg9TYqVeY5FzLOa9EbVU3FW06jFBrUusU2pkk1iy8ZtYAxTAP2jp5cfH3qe28UWtDAbu1/d/509Vgl4bqRykhvpPl6oCT8O1xLjqSXE8zvgK5ga3VjKBLZJ1uJ4FVPlI+sPX1vISZiAdCCeAcCeW9KCuhpNzDM0yPzYoopWWPsrG5Hie6bH8D+ea6hsJ3KlMYy/ksm1lYOGsruVShTcqqRmsw1+KtUsPyVkNTlK09A1KY3KMhELEKoAEjQfVQH1kz5Q6jVciai6smFRBLFJq01Ge6OwqvtHaApDdmOk8OJRmhcx0hc01ou85RDWkWjeZNtUWHETtNjXFw7xJM8zqtrYu0xWzN+k288Rp6/Fcy2oQP+nd95h9pKnhMfUpGadAy4gEZmS4TopmzrsnNVaqYU3VDEwRbThysqz3LWYsrT9akgpKtFtpBgRcoVfKOKLTbzWelbEzgFo3uMDxgn8PaFzG3cGMz6svDhViA92UgsLrtB4hWNtumvTlk9WQ4EPLSZgwYtqFW2jjHPLgGGHPzC0kWLbxbepNg4GvWNZ9DEMLHthwylwkZhYwYIIIMq3tGsylkFTMc5IAIkzmdBnUWLR5LT2uM+JFUCAKIpkSJkOmbblBzWihVYQ7tGmRfMJZUBtw3nySUudGKlQPcCXZA0SHCTeS0tdpFyZW/UqBYmAxbabXvJENpU9+8SIMcyB5rWZVa5oc24IkHiFU0V2g94UcymY4KJATJFPKYJyEAiQFEvAT5UxPJMG61SD1CZTAJ6LY4cnQmogS0e0wpVawY0ucYaNSsTpI+zACQ6cwOXNEc4sb7j70DaePFWgxofBzDrALOgB2gOknL4TySoVdo7QdVqExH0WtzQ4t8OOpvxQW1HDtZSAbZWU5IsDf8AomohgBFmXiQ0ucREzaTGok3sdEqtJhLSKr7PDu6QTFiDYWiLclms1Ko4GSK/DuCIkkW89YUnYq/aD+HapEjzhUKGzGtcHmrVtmmXOIMtcNI5+xXXCzcpc12Zm46A3EkbwUjPTxf1XA8gf9hj2Lttj7RbVZ9pvZeN4I3+BXFOYeqol4D80NLiBIdlm99/KIR8BUdRxADMxOV8scdAW6gibSG2M7kG73rEzqyrYermY0nUgEgbjFwpVIS0NjjEJjXVQhSRo9rHXob0EhSbUKNDYrtFAUN5Sa5Ea1AVq1CUP5OroBCYi6qZVNkVfkxLSA4tJEAiJB4ibLgcOJcWFjgDmJeSLkHJfmTMALvcbjhSdSa4HtuizSYAGpI0vB8AVxtLD5rni6Jk6uLgQPS6e9jWmB0qxT6Dg2gGsLi57nBoLjewE6CZW7sbBtc6nUcwZyKYNt5Mm2kyAg7T2T1nbJAgBusTckmTp4K5QrXGUtkEQA8GYk6ao2VnDpBVDi4Aglpg35fGR5IVWmVS2CD1tTssGeXmGwZkWnhc2W0+jK1mf2zuLMyp1e+Tc0k+uF0sinUce9M8pVltVw0uYsJ15SrYoVN4nxhOKcG7Vp1ysumxyG1dpVXPcCxzCIBsSdPrNFx4cVSoNpgS59bMReAWide6F0O06Tetf5f6QsvbD3UqealSdVcCOyCbgnWYPuXNl3bY9kMNtHI4gZ3iLAsMiCbZgIi39ZVobVH0mFt7TYeEkcUZtFp7URbQ38lJ+Ga5scfMeinS9qzq5ZMtLWO7JLXWg7j487Lsdidqg0kg6gGPojT2LimYZrs4Y6Q12RwBkTAN2nfcLo+idOo1jgXAsDjDcpkOhp706cklcN11EJNoN4JSpgouzmgzhmpjQARS5IQjkcKlZlrKk6RfcqmN6X4enUdTLKhLXZSQGxIJGpda+kxKC7pDhqzS2m9zXOlt26WNwRI4xfcrxyk7oywt7LlR3IqbSp4TtNAaQ4gCZ1O6bJ8UXMaXOytA3l0DgLlbSyxlZZTsYmxlQU2OefoidCb7tOaxKe1n2+dpknkLehR3bRc5pBdTggg24iPrKLnFzGsit0hYXHMQDOhzHy7qi3blEfSG/fHP6UeKi/qRZ7hIjQRp+fYoto4YknMPUrLdaag527QG8feZ8VAbfoTOZv3m8PFAxVGjAynxg6epTUqdHM4EjLNr6aWj1/Nkt0aHrdIaMxmH3vwaChP6QUngDeCDo/cR9hSr0sNElzfFJ5w7hDXMJJGsHfojdHC61xFNoyhwygEEwCRb1Q6e1AZOUkxBcG6gGwLjY+SalhmQQ4sINr3iPqybBDGGpMAaatiHNsYMEgm4Oo0BGkoNfwW2JeGkOGYxpvNgOzbWAtKrVeOIWZsWnTFamWPc+GublPay5Wy10m+Y5nSSTOUcF07yDu9Vv6WWpzGPqSbZrMZU11Cc7UPBWKtAfZHhzKgMMyN2vuK1/wDF8M95TyVLGSrVKu2NVh7W2pQw7g1we5xEgACIJgSXc1UwvSim9wYGOGYgA2OpsYtZZ2YXsudcm3VmsBdT+UrDx1RmXKXEExcEgiDKsUcY12l93gp6JbpXXdbanylOMSFmnFjgVMYxnP0VfDfovl/Vk9LMWXVGMaZOUmCeyNZJ8vdzWQMfUJPV08zQYLgRGYASBJEgKxtjBh1V7y8lpE3AFh9G1zCnhabcgI0IBFtxvpuWNmrprLwyqjjUcTVpVnbgOzA73B3KPTmo4mkzKclGq08RF4gaF0HzWljHZWuytBfByy6AXQcoPATCFs5z3Um9a0CpHaANhcxvMWhLRbE2BisSKrWtp6tIl5bAGt4cTaNF11WoRuWNsGmDWj7BPuXSfJwOKqWROrWf1/I+hSV/qgkjrg6KG16Rpg8lSbUR2PV9FiLnK5PadDENrv8AnWuFrmmA4jKImLToPJQOHqO7z2n/ALbSPatHax+dfr9H/S1c7t/CutUaX8IFRzB423rPJWLSqUav0ajRb9mISYK7fpMcPDKp4GmQxsnVoNyXRI4lWHG2qSlHrW05lhbmdJIgyYi536Dcp0OkWWWtrQ0GT2W6wNbE7lToYyo6oWyC1rspJaQZGtxaLFWX0xLwLEtFx4uSNa/vUN+JaP4W+P1VF3Scnu13P/cazjB1aNLrLNMRme0OLg3Rs6sbMngr+zqYEZey05rRBmW/Eo3T4GPSkDvYnLr3msm38PBOOlbRrigBfczcYO7isvFMucwzBtRwAiSQWNNz5nVSNJpDTlOUZ4ZlEyS0pbGgarNnvqGq54Li7MXZj3nPJmBYS6U+FpYFhzUSXOFwGuLjYGNbaIxosNNxawtuzMMve7YIHMzKns6A5uUFoLocCNR1dQiCN8ge1G6Y2G23Tpm1V1M2BBDQb3g24qw7pOx/Y+UZw62WKZmd0ZbyqWLok1HCexNN0RJmHA3PgELCU6ZeA1jmkGxgac400Rs1vF4KmCwdWLuy9kRci0x+brP/AEY0AS5wJiJd/wA8VtYs9pn73Bcd0s2/XwrmhnVkFgJzNJM9rgRbsqtbKV0+BwrWCIk2nNHE7z5qQw1OXOLWg6yQIt+dUbAyQCTchp96w+m2McygWt+k4jyH59QEiUtq9KaFM5adIPI3wAJ9J93gqeF6Z083zmHEGxLbkeRufVce5yruxbQYvwUr09hw4o1aYqU8rm7iB6iOPIqe08vVnO2RLbAAk3HA2v7lw39nu04rGkD2agNvtsaXA/dDh6cF6HtMTTI5j3hUi92FU2NSGbMYlxIEm0nQX0sFYwmzaTHsGQOLnvhxuO5O86fFNtatUZUgOEEPN2g6EwPBaGEH6okzd24DWm1HSNhYjEtw7iQ0tsDLGDS4ufWykduZbl9UCAe0LXtq7iVLaOIAcGEd5pi4vGsCZMWnxQzTLoB7vVMOUXMgnTyi3JG9dhr7P/eBhIArONx9W5vEDjqnpbVOs1svGDEkxERHmgYU0nnsahzTaCIzDXhoVYbn6hhzdqaZJ3GajQ7szGhIT6qNRTxOLw1VwL5e8WEgTYmw9ChU6uCBBa0AgggiLESQfYVbolmfKO8CJ0kXEyNycdXmyQM3C08dNefglunwVXa9GSXPMxMkNnSfddO3aEd0VImCQCIga2F0LFZJynvFo4SezqGxca+iu0Q7LUvcOcBugAQLDVEt2VVH7dYD2qjhHEAHSbiOF0v0sHd17zcjsjeNbtUK76bcvWHtODSZgTYaTr4I1KmWvAHcIcYiDPZi/mU+vL7Lpn0BQ2r1kR1jzMSRAG6+5GGEqmfnS0DQNANuZKq1M4ojIYM7gCcupjmtXCu7I1NhrE+fNLvTvYKnh3iZquPk34JqlF26qeVm/BC23h81N1gTaM1xJMbr71T6M4QCn1mVoc/6oIEXjvSUy8Nro1gX/KAXV6hAaTAhswR2SReL+xdq5cz0cHzx/cPvaumcUqeNQgpJSkkbDaCjMlctX6dYRpgZnAauAAaPUz5QjYTpvhXnK8Ppz9Zoy7uBJi+sLs6o49Le0H/Ov5Zf9IVPaFEvaBu33ghBxuCw7iXtyBrjIIMNPhB8Vm4nZVEiWuN5+nug7p4x6rmyvLoxnDdouAaBNgInwTveDvBWXhdmYcGzp3dp0z5KzU2ZSBsI5gke5SoPCtyvfP0nFwOupOvO6O13bfuhrbebvZ8FTqYUgw2s4HhmDuehlAOEqk1PnTOVs2GkuiR6pGF0ibnwLwO04ilAbrILDb0Wj0aBFCi3QiiJB1BGUGQhUsA4D9b42b8ESngqk2rO8gz2mEbGkNqsDqOIbqfnABqSTSbYDzVTY1OMCKZBDuqrAtOsndHE/irWG2dUJM1XWc4g5WcddEapgyDLq0c8rfgjY0zuhtE0sKWvBYeumHax2L3jggdBcO6myHNLSa7nAEQSOpcJjhb2Lb+ROdcVi4eDD+CG3Z78w+ef6N4HfHNGz0sVngVXAkD9X/uXPdGaBp4nFPc0ta4uLSQYI611x+d61PkD875qujs7ma5R9nmn+QPBB652oMdn+VGwvYraFEuZFRtnTefxCyNq7Kw9e9SqwmAB2ZiJ3gjiVt46kSWQY7cG02P4rJqY+myQ/F0WujRxpAxJGhvFijkNfZz2lsNcHZYFt2pHsXO9OaQ6sG8lx5j/AIXQ7ObY9oGYMiNZcDp4LF6ZMmkOMmPQlMeXmlSg49kanfeL/n2Ks7ZTwTobi40MDctupVyWlgmIluvtTY3E9W4g5dTowmwJF7wpUXQrBObjaN7E1JAnTq3EAnxAXq21XDqzJi4uRzHBeedF6v8Ai6F2Q4PNhE9ioLeQ969C2mXdWcpgyL2O8TbwVTsnLuzMQ6k92Y12jWB1YdAOokhHpY2kC0daHQToDPdA0A5Khjscyk8tfiqbLmA51JpgEt0I4gjyVzAS51Nwqh7SXGQGwR1Yc3tNH2p8wlujg+LqtfUY5oJDWVATBAEgRqJ3K5hYzN/cb71S2zh3HMWvLezoIjfxaUqGEqZW/Ov7o+qf9qNjTI6F4N1MVS9haHOplpNg4S6446j1XQ0z8y3hLP8A7GquzBPA/WuFydGbz+6mp4Spk/XVJniI7x+yi0aU9m4VzcZWqFpDXAZXEWddmh8vYojBP/SBq9Wchae1HZ/Vxr4rTGDqftnz/D/KoupRY4h0/wAGv3eSexpnbQwrzjaVQMJY2lBdFgctSxPmPVbbNKni73IHyN37Z/8Al/lQaeDqdqaz9dxA+iPspbDH6RYN9Sphi1jnBtyQJyiWG/p7F0NQy8eDve1AbhXwJqu/y/yqDsE8R86/Xi0f7UbB6M9UI3iPWytU6zBYubMfWA9iyMHhCWgvqPLb2nKNTwAlaNDZtEA9hp5lsn1KAJiKlNwjO28GzhMgyN/JDwQbTYGF7IFh2hp4krLxeEwZzQGZnA5SMsB26Y5whYbA4VgmoKZcXO0IiJ7NjbRGxp12wcVTbVlz2AFpA7QA3byeSH0g6d4ag09WTUfJEQQ0EAGSTFrjT+vO7WqMw+HOIw4Y1zS2HhotLg03A3gkW4rzivjGvfNwL2B3aWmfbMItS73/ANU6/wCypejv/wBE685+b/ae0JKNjZn4io49kaQOyI5bt/4qVPB1LfONJiw7X4tjei7M6PYmo53YqU8rS7NldeIMNI1JB4rSobIrP7LadcwN9NzW+pi9+KMurwi8cPQuj1EOwdBrhPzbZB4qFbBjMQ0Wkk+umqt7EpmlQpU3AjIwN1kyBfQn3lTa0OJgg3veYMzdX4X5RdhqbYcW72jQTJgC55orzfyQdqRkAc2Yq0SPHrGD11UqtU6hrj5jnxTKKJb/AIl5k/q2Wk2kuvGk2CNR79Sd7W+kv3pP1nq3ZuPZ+KjSeQ53Zf3W7m/a3yg1ttBo/qVOgwNJjeOJ4oYrN+qfVv8AMpdcJkg8Poj8UjOyg2DbUk6xvVPb1LJQfUZ2XsbLTAdBng6Z3jzKOzHU7g2IJFy0XnxUMY5tYdTB7U27PaGpETwRoA9H6eeiHvu8ueCYDbB5As3lHjC0RTY3tBoETpJ8bBU9nM6puTK6JcfogXM8ddVbbWBMAXJjVs+9I1MVKJc55i8Duv4AcPzKKKFI3a1pvYx8VV6QYR78NUZTy9YergAjVlRrjJIAmyMcS4PDMgiGXmwkCRadDKJT00a+rP3vgvMem9AHE/8Ab9vWVJ969HqPcS3sixnvHX0WNWLKuI6tzQSWVBmBMTSdTluhjvnxhMRtbOPYHnu+2/4rG6XsmnbiRodHCD7CtPHYlzKYcMrfnKYOaYLS9od2jpYn0Wft3q67Q1tamO1IOYEHduM8UyeZdIsSWVGhuWHAA2B+rpPiU+3MU9ld7WhpBM3aDeSNT4BdBjeiBzF7K9NxJbFMNv3mAkXOkExG7kpv2A2pUBLg5xph2UMeGsIJzS5pMnMIiN8jilOavxtW6JhzsTg3WkMqudbQRVbYDQyR7V6XjnjJv3bvALgtgsp0qmFq9bmGQtIyODoe0EuJ3xHtXX7Vx46vsGTN7kQ3jputr4pxFeff2mUSa7IBnI6wF/19c6BdxsOKdGgXTAYzQEn/AKeiNFVo4oPp9fXbl+eLWSSCW1KgZTloGmZ4bPATotgumBLJE/TJgRGkTuCR68MzaeLD8RSDT2HU62YFkZi0Ny3I3SdDvWpRoAsaS0HstF/ALI210ioUHCmYcXZgchHzZ3AzvM6cigY/phSo06YYM73NBgmIAzAl0T9U/mJnriXRtwzPqN9EqdEFmXKCJNv4p0XmfSbpU7EdV1eZgLe4DcuJkn92MuvA6b5dGtv1KdUBzuyHwWB0iHGDaTJ3g8olTfU/Y3pFOjTfo1phxabNsQYIssHEVHtxnV54pAtBZlbljqi67onVF2rtAsoONINl9R5EXlolzjaLwJvuny4/F7bLu06c8AyCJJAEEnwhTn6nTxorlp6ecKyAMrY8AoNYBmAAHs3LjMD0sqMp5YzukGXB5AsJnz5qzhOllQ1AHUwWuIAygg8JvqeSU9xh2T1x0zaDYHZb6KPUtFwAPRO6tGuUfxj4KDsROkHweD62W61ENa6gARu08HfELVZqfzxWbh3HI0Fvk4wfMRqjsxZEy0bhGYyfYi8CD1MK0iA2JG431F9VXw+BaHCZdaxLpsR4wrFKvI0aLW7WbhMpzXbmmRAHKPWUBk9NQG4GrZoE09dB84xeZHaAA1bccAPQar03pUXVsJVp0w0vIblAe2ZD2u+lA0B3ryV+wsUCc1CpO/syPUWU5Y7pdMW/ljvrs9HfBJUv0Pif2FX7h+CZT0F0vR8N0po02gNFGByqn2xJusTbG1+txLKwqtYGgNhoqNIEuJiWkXzewcFQZs+iCWlz3cIBsOHNFfsqm6zW1AQdQ1xAk6XFxG+/iueZXernWfEu9tiv0kpuv1haYDJayDAMxPjvhYmFrta6p88SHkmQyHAkkz3tboA6PYg/RGu90e5WcN0brh2Z3VnlLr+MCyn5JOev+S3PsariWlrgKzyMoaOzMQ6Qe9rukQtDBdJqjKZYagcREONIEgAREF/h6eKg3YpMZmUx4OefwRqexALZGeeYzy8FN9z/AJF1RSr7aeaoqdc4ENLYFJoF5ns5o4emqhjtrOqUshrvjOHyaYkkDSc8xvWs3YrN7Wfd/wCVJuw2zMM+5/yo/Ez7o6o5yptyq2s176mbsOpm2rb7gdb68grNLbFBsS6sb5iJgTuF3d3keC3nbEpkQ4A/wt+CEOjGHmct/E+6VU95jPs+uOdqYum+sKgfUBu49gGTrYF8cd3qtbD7eDXB0NIB7uQNLgADJOcxv0Giuf3aww3R4E/FDf0Xw5Fy/wAcwlP8bL5v7CZxab01oBwmm+INs4AvGgGt41ki6lQ6eU4PzZEiAS4cY0VFvRjDi8v3/SG8eCG/oxhjPeE/b/8AFH4zG+av5Y18N0vpkZixxO8h354exBHTOmLdUQJt2rgc53n4KlT6O4cGQ06R37e5WGbEoRemPvH4rO+6n6/wPlWndNqQE9W7wzD8As9/TOk12YYe9759ZMn6PEexWHbEw5/9ofed8VA9H8N+y/zv+KJ7yed/wXyhVemtOoMjqBLTqDUgW0vHFYWJxbCXOpl7Wu7UAgxMmxIB9V0L9gYcgjJHgUOn0ew7RAa4+Lk/xeNnkfKyti7abRf1gbUedAXVA1oB1MBpOg3mbrT/AL3UmNGWiBDQBFQ/yi5MnzU3bBoG2QgciVCn0dw7R3CfFxRPdY/qPlYuKxtCq/reqqNMWaHNOmUCOzpY6z+Bs0OlYo1A/qnWkAZgAQY3gagj0K0n7DoHc4D98+qb9B4beyYtqToqnupeORPUloQ6dUSMvybsAiGmpmiNLuEmDxUanTprnDLQg5m3FTUSJHd0I81ZbsbDggdUywMGI1EXAN/Eys3G7OwwkZG5naECx/P4rT5Z+qr6jH21gjhqrKefM3L1kns6l0gTPAD+qo4yqXimQYmG631v5aL0fGYWnVjO1jrR2gSY1iNOB8ljbT6O0nTU6wMysIgMgRuFzwkajVY+n7rHjq7lM44itIPM6EcJ+E+xaGzMSO6AS3Umd5OWAYk/RtrdVMRW7LmuAkwQYzEcROgm176blDCtMtcNZgaaxJ84XZZuNLzHo3R3pCyhhrtJh747WsuLjAif6rnA1tSoahBa0kkNaSIM6g+20LT/ALO8Q7ratNriDkGbQy5pAJk6rexnRtri5wJBJJJB1J1sZA9FGUyyx1svjtnDEYcJr1UGNxN54wYiUXCY7CsIIpBuW4MCQeRJmQpYno5UHdfpa7QfaCL+XBZ1bZVdu4OF9HRb+KFy322X3f3R8eUbdfH0azgXOJc3u3IjedIt/RPRNINLWOJadQHu48Z5/FcrWpVB3mPAjXK6PXQ+HNDpVrmHXk2ERbwPsjkpy9P1PzVNjrqNV7QWBxDRAaGlwAaAI32Vhm1qwmXTMmcvPQlceK1Qd1zoiQBvHhZSGNqAZRmE3Mbvx18DdEnqztkNX7dedqVp3GBc7vIXQnbTrtjIacaXDtJ3X8SuRdink3dO+J1vuA8D6IjcTUEARx0N/En86p/1fzDV+3Ws2pVzAugRoRmImL2lGq7bcLZm85BmfCVyXy8Oibwdbk2mfx9FE4gucMpIkZcsCQb6b80e9LfrecqWq6j9K1/rM/8Aid/MksPLU4n2fFOp+T1Pz0v+t+VAv5JJLkZJCryT9Ykkg0g5RNRJJKg3WJFxSSTMgny80kkGiWc0xCZJBUgE5CZJIHaU2ZJJALrSmNUpJJAN1UpusTJJkcvTF5ifH2JJKsYrGdj9YYm2qp4qk7c+Iki07vFOkujHjs1xnGTFr0apIb1sbjDdeG+0I1aiQ27s3lCSSu29mW7W3surmEXHem+sRx5JtrsHUuF5LHEGdIBMQLXiPNOksLxnwqPO8ThWsqFusOA8oadNOKjmLco3yCDEG4FvafVMkvYdLsf7LjNSsTd2QXn7d/Ur0DNPokkpvetcOxpvEfmwUMgO5JJOKUsSxoe1mUGQTPhyVTGbKpP7zRrrAn72qSSrHnexjzbKy8b0eo/Rlu+xO/XUkD0XNY2nkqOA3S6TwsItyOoSSRcMb4Z+rhJOFKriCHNaI7VyeZdGiLTxBIIk2k8dCUklhqMFqi3PrGpGmsF3Dw9qhRqbwALkehypJLO96SXyl/13eo+CSSSgP//Z" alt="Kolkata" className="d-block w-100 rounded-top-4" style={{height: 250, objectFit: 'cover'}} />
                  <div className="d-flex flex-column align-items-center p-4 bg-white">
                    <h3 className="fw-bold mb-2">Kolkata</h3>
                    <p className="text-muted">City of Joy, now easier to live in!</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqyD5JBRmAVLoQYrgi4SkVS6IDwVKx5gwOMQ&s" alt="More regions soon" className="d-block w-100 rounded-top-4" style={{height: 250, objectFit: 'cover'}} />
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