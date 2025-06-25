import type {ReactNode} from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
      <div className="parchment-background">
          <nav className="bg-gradient-blue bg-dark navbar navbar-expand-lg navbar-dark fixed-top afacad-font">
              <div className="container">
                  <a className="navbar-brand" href="/">Neutral Net</a>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                          data-bs-target="#navbarNav">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                      <ul className="navbar-nav">
                          <li className="nav-item">
                              <a className="nav-link" href="/">Home</a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link" href="#" data-bs-toggle="modal"
                                 data-bs-target="#aboutModal">About</a>
                          </li>
                      </ul>
                  </div>
              </div>
          </nav>

          <div className="modal fade" id="aboutModal">
              <div className="modal-dialog">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title">About Neutral Net</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal"
                                  aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                          <p>Neutral Net was designed and developed by Clayton Durepos,
                              for the COS398 Ethics and Social Impacts of Computing course at the University of Southern
                              Maine.</p>
                          <p>This application utilizes SerpAPI to retrieve a number of Google search results, then
                              analyzes
                              and scores each search result, using a fine-tuned BERT model, for bias.</p>
                          <p>Higher scores indicate more biased content, while lower scores indicate more factual
                              content.</p>
                          <p>This tool is designed to help eradicate the spread of misinformation.</p>
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>
                  </div>
              </div>
          </div>

          <main className="container my-5 pt-3">{children}</main>

          <footer className="text-center text-dark py-3 mb-3 afacad-font">
              <div className="container">
                  <p className="mb-0">© 2025 Neutral Net | Powered by BERT & SerpAPI</p>
              </div>
          </footer>
      </div>
  );
}

export default Layout;
