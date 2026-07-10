import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <h1 className="display-5 fw-bold">OctoFit Tracker</h1>
              <p className="lead text-muted mt-3">
                A modern multi-tier fitness application with a React frontend,
                an Express API, and MongoDB-backed data services.
              </p>
              <div className="d-flex gap-3 mt-4">
                <span className="badge bg-primary">React 19</span>
                <span className="badge bg-success">Express</span>
                <span className="badge bg-info text-dark">MongoDB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
