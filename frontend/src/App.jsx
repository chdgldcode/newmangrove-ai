import { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [form, setForm] = useState({
    crownCover: '',
    regeneration: '',
    height: '',
    disturbance: 'none'
  });
  const [result, setResult] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all numeric inputs are zero
    if (parseFloat(form.crownCover) === 0 && 
        parseFloat(form.regeneration) === 0 && 
        parseFloat(form.height) === 0) {
      setShowErrorModal(true);
      return;
    }
    
    try {
      const res = await axios.post('http://localhost:4000/assess', form);
      setResult(res.data);
    } catch (error) {
      console.error('Error contacting backend:', error);
      setShowErrorModal(true);
    }
  };

  const handleReset = () => {
    setForm({ crownCover: '', regeneration: '', height: '', disturbance: 'none' });
    setResult(null);
  };

  const closeModal = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="container">
      <h1 className="title">Mangrove Ecosystem Health Assessment</h1>
      
      {/* Error Modal */}
      {showErrorModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Invalid Input</h3>
              <button onClick={closeModal} className="modal-close">&times;</button>
            </div>
            <div className="modal-body">
              <p>All values cannot be zero. Please provide at least one non-zero value.</p>
            </div>
            <div className="modal-footer">
              <button onClick={closeModal} className="primary-btn">OK</button>
            </div>
          </div>
        </div>
      )}
      
      <div className="content-wrapper">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label className="input-label">Crown Cover (%)</label>
            <input
              type="number"
              name="crownCover"
              value={form.crownCover}
              onChange={handleChange}
              min="0" max="100" required
              className="input-field"
            />
          </div>
          
          <div className="form-group">
            <label className="input-label">Regeneration Rate (seedlings/m²)</label>
            <input
              type="number"
              name="regeneration"
              value={form.regeneration}
              onChange={handleChange}
              min="0" step="0.1" required
              className="input-field"
            />
          </div>
          
          <div className="form-group">
            <label className="input-label">Average Tree Height (m)</label>
            <input
              type="number"
              name="height"
              value={form.height}
              onChange={handleChange}
              min="0" step="0.1" required
              className="input-field"
            />
          </div>
          
          <div className="form-group">
            <label className="input-label">Disturbance Level</label>
            <select
              name="disturbance"
              value={form.disturbance}
              onChange={handleChange} required
              className="dropdown-field"
            >
              <option value="none">No Disturbance</option>
              <option value="slight">Slight</option>
              <option value="moderate">Moderate</option>
              <option value="heavy">Heavy</option>
            </select>
          </div>

          <div className="btn-group">
            <button type="submit" className="primary-btn">Assess</button>
            <button type="button" onClick={handleReset} className="secondary-btn">Clear</button>
          </div>
        </form>

        {result && (
          <div className="result">
            <h3>Assessment Results</h3>
            <div className="input-values">
              <h4>Input Values:</h4>
              <div className="result-item">
                <span className="result-label">Crown Cover:</span>
                <span className="result-value">{form.crownCover}%</span>
              </div>
              <div className="result-item">
                <span className="result-label">Regeneration:</span>
                <span className="result-value">{form.regeneration} seedlings/m²</span>
              </div>
              <div className="result-item">
                <span className="result-label">Tree Height:</span>
                <span className="result-value">{form.height}m</span>
              </div>
              <div className="result-item">
                <span className="result-label">Disturbance:</span>
                <span className="result-value">
                  {form.disturbance === 'none' ? 'No Disturbance' : 
                   form.disturbance === 'slight' ? 'Slight' :
                   form.disturbance === 'moderate' ? 'Moderate' : 'Heavy'}
                </span>
              </div>
            </div>
            <div className="assessment-results">
              <h4>Overall Health:</h4>
              <div className="pie-chart-container">
                <div 
                  className="pie-chart" 
                  style={{ '--percentage': `${result.percentage}%` }}
                ></div>
                <div className="pie-chart-center">
                  {result.percentage}%
                </div>
              </div>
              <div className="result-item">
                <span className="result-label">Condition:</span>
                <span className="result-value">{result.condition}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Remarks:</span>
                <span className="result-value">{result.comment}</span>
              </div>
              <div className="result-item">
                <span className="result-label">THIS IS BASE ON TECHNICAL BULLETIN 2015: GUIDELINES ON THE ASSESSMENT OF COASTAL AND MARINE ECOSYSTEM</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;