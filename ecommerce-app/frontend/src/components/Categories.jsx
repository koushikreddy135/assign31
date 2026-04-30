import { useEffect, useState } from 'react';
import axios from 'axios';
const API = 'http://localhost:5000/api';

export default function Categories() {
  const [cats, setCats] = useState([]);
  const [name, setName] = useState('');

  const load = () => axios.get(`${API}/categories`).then(r => setCats(r.data));
  useEffect(() => { load(); }, []);

  const submit = async () => { await axios.post(`${API}/categories`, { name }); setName(''); load(); };
  const del = async (id) => { await axios.delete(`${API}/categories/${id}`); load(); };

  return (
    <div>
      <h2>Categories</h2>
      <p style={{ color:'#6b7280' }}>📌 One Category → Many Products (One-to-Many)</p>
      <div style={{ display:'flex', gap:8, marginBottom:16 }}>
        <input placeholder="Category name" value={name}
          onChange={e => setName(e.target.value)}
          style={{ padding:8, border:'1px solid #d1d5db', borderRadius:6, flex:1 }} />
        <button onClick={submit}
          style={{ padding:'8px 16px', background:'#4f46e5', color:'white', border:'none', borderRadius:6, cursor:'pointer' }}>
          Add
        </button>
      </div>
      <table width="100%" style={{ borderCollapse:'collapse' }}>
        <thead>
          <tr style={{ background:'#f3f4f6' }}>
            {['Name','_id (used as category_id in Products)',''].map(h => (
              <th key={h} style={{ padding:8, textAlign:'left', fontSize:13 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cats.map(c => (
            <tr key={c._id} style={{ borderBottom:'1px solid #e5e7eb' }}>
              <td style={{ padding:8 }}>{c.name}</td>
              <td style={{ padding:8, fontFamily:'monospace', fontSize:12, color:'#6b7280' }}>{c._id}</td>
              <td style={{ padding:8 }}>
                <button onClick={() => del(c._id)}
                  style={{ padding:'4px 10px', background:'#ef4444', color:'white', border:'none', borderRadius:4, cursor:'pointer' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}