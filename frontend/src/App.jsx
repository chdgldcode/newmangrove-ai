// frontend/src/App.jsx (no Tailwind, clean CSS + connected to backend)

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/assess', form);
      setResult(res.data);
    } catch (error) {
      console.error('Error contacting backend:', error);
    }
  };

  const handleReset = () => {
    setForm({ crownCover: '', regeneration: '', height: '', disturbance: 'none' });
    setResult(null);
  };

  return (
    <div className="container">
      <h1 className="title">🌿 Mangrove Ecosystem Health Assessment</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="number"
          name="crownCover"
          placeholder="Crown Cover (%)"
          value={form.crownCover}
          onChange={handleChange}
          min="0" max="100" required
        />
        <input
          type="number"
          name="regeneration"
          placeholder="Regeneration Rate (seedlings/m²)"
          value={form.regeneration}
          onChange={handleChange}
          min="0" step="0.1" required
        />
        <input
          type="number"
          name="height"
          placeholder="Average Tree Height (m)"
          value={form.height}
          onChange={handleChange}
          min="0" step="0.1" required
        />
        <select
          name="disturbance"
          value={form.disturbance}
          onChange={handleChange} required
        >
          <option value="none">No Disturbance</option>
          <option value="slight">Slight</option>
          <option value="moderate">Moderate</option>
          <option value="heavy">Heavy</option>
        </select>

        <div className="btn-group">
          <button type="submit">Assess</button>
          <button type="button" onClick={handleReset}>Clear</button>
        </div>
      </form>

      {result && (
        <div className="result">
          <p><strong>Condition:</strong> {result.condition}</p>
          <p><strong>Health Score:</strong> {result.percentage}%</p>
          <p><strong>Comment:</strong> {result.comment}</p>
        </div>
      )}
    </div>
  );
};

export default App;
