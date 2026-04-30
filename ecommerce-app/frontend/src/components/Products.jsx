import { useEffect, useState } from 'react';
import axios from 'axios';
const API = 'http://localhost:5000/api';

export default function Products() {
  const [products, setProducts]     = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name:'', price:'', stock:'', category_id:'' });

  const load = async () => {
    const [p, c] = await Promise.all([
      axios.get(`${API}/products`), axios.get(`${API}/categories`)
    ]);
    setProducts(p.data); setCategories(c.data);
  };
  useEffect(() => { load(); }, []);

  const submit = async () => { await axios.post(`${API}/products`, form); load(); };
  const del = async (id) => { await axios.delete(`${API}/products/${id}`); load(); };

  return (
    <div>
      <h2>Products</h2>
      <p style={{ color:'#6b7280' }}>📌 Many Products → One Category via <code>category_id</code> (One-to-Many)</p>
      <div style={{ display:'flex', gap:8, marginBottom:16, flexWrap:'wrap' }}>
        {['name','price','stock'].map(f => (
          <input key={f} placeholder={f} value={form[f]}
            onChange={e => setForm({...form,[f]:e.target.value})}
            style={{ padding:8, border:'1px solid #d1d5db', borderRadius:6 }} />
        ))}
        <select value={form.category_id}
          onChange={e => setForm({...form, category_id: e.target.value})}
          style={{ padding:8, border:'1px solid #d1d5db', borderRadius:6 }}>
          <option value="">Select Category</option>
          {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <button onClick={submit}
          style={{ padding:'8px 16px', background:'#4f46e5', color:'white', border:'none', borderRadius:6, cursor:'pointer' }}>
          Add
        </button>
      </div>
      <table width="100%" style={{ borderCollapse:'collapse' }}>
        <thead>
          <tr style={{ background:'#f3f4f6' }}>
            {['Name','Price','Stock','Category (populated)','category_id (ref key)',''].map(h => (
              <th key={h} style={{ padding:8, textAlign:'left', fontSize:13 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id} style={{ borderBottom:'1px solid #e5e7eb' }}>
              <td style={{ padding:8 }}>{p.name}</td>
              <td style={{ padding:8 }}>₹{p.price}</td>
              <td style={{ padding:8 }}>{p.stock}</td>
              <td style={{ padding:8 }}>
                <span style={{ background:'#dbeafe', color:'#1d4ed8', padding:'2px 8px', borderRadius:12, fontSize:13 }}>
                  {p.category_id?.name}
                </span>
              </td>
              <td style={{ padding:8, fontFamily:'monospace', fontSize:12, color:'#6b7280' }}>{p.category_id?._id}</td>
              <td style={{ padding:8 }}>
                <button onClick={() => del(p._id)}
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