import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchForm() {
  const [query, setQuery] = useState('');
  const [numResults, setNumResults] = useState(10);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, num_results: numResults })
      });

      const data = await res.json();
      setLoading(false);
      navigate('/results', { state: { results: data, query } });

    } catch (err) {
      console.error('Error fetching results:', err);
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingModal />}

        <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-3">
                <label htmlFor="query" className="form-label">Search Query</label>
                <input
                    type="text"
                    className="form-control form-control-lg"
                    id="query"
                    required
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="num_results" className="form-label">Number of Results</label>
                <select
                    className="form-select"
                    id="num_results"
                    value={numResults}
                    onChange={e => setNumResults(Number(e.target.value))}
                >
                    {[10, 20, 30, 40, 50].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary btn-lg">Search</button>
        </div>
      </form>
    </>
  );
}

function LoadingModal() {
  return (
    <div
      className="modal fade show d-block"
      id="loading-modal"
      tabIndex={-1}
      style={{ background: 'rgba(0, 0, 0, 0.6)' }}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content text-center bg-dark text-light p-4">
          <div className="modal-body">
            <div className="d-flex flex-column align-items-center">
              <div className="spinner-border text-primary" role="status"></div>
              <h4 className="my-2">Sit tight!</h4>
              <p>
                Neutral Net utilizes a powerful AI and may take a few moments to finish analyzing your results...
              </p>
              <a href="/" className="btn btn-danger mt-3">
                Cancel
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default SearchForm;
