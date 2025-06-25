import { useLocation, useNavigate } from 'react-router-dom';
import ResultCard from '../components/ResultCard';
import type { Result } from '../types';
import { useEffect } from 'react';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results as Result[];
  const query = location.state?.query;

  useEffect(() => {
    if (!results || !query) {
      navigate('/'); // redirect back if accessed directly
    }
  }, [results, query, navigate]);

  if (!results || !query) return null;

  return (
    <div className="mt-5">
      <h1 className="mb-4">Search Results for "{query}"</h1>
      <p>Found {results.length} articles sorted by bias score (lowest first)</p>
      <a href="/" className="btn btn-outline-primary mb-4">New Search</a>

      <div className="row">
        {results.map((result, idx) => (
          <div className="col-md-6" key={idx}>
            <ResultCard result={result} />
          </div>
        ))}
      </div>
    </div>
  );
}
