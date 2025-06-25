import SearchForm from '../components/SearchForm';

export default function Home() {
  return (
    <div className="row justify-content-center align-items-center my-5">
      <div className="col-md-8">
        <div className="card shadow">
          <div className="card-body">
            <h1 id="home-title" className="card-title text-center mb-4 afacad-font text-blue">Neutral Net</h1>
            <p className="text-center mb-4">Search for news articles and analyze them for bias using this AI-powered tool.</p>
            <SearchForm />
            <div className="card bg-light">
              <div className="card-body">
                <h5 className="card-title">How it works</h5>
                <p>This system uses a fine-tuned BERT model to analyze news articles for bias.
                  Each article receives a bias score from 0 to 100:</p>
                <ul>
                  <li><strong>0.0 - 20.0:</strong> Very low bias (Mostly factual)</li>
                  <li><strong>20.0 - 40.0:</strong> Low bias</li>
                  <li><strong>40.0 - 60.0:</strong> Moderate bias</li>
                  <li><strong>60.0 - 80.0:</strong> High bias</li>
                  <li><strong>80.0 - 100.0:</strong> Very high bias (Likely propaganda)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
