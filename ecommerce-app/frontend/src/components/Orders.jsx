import { useEffect, useState } from 'react';
import axios from 'axios';
const API = 'http://localhost:5000/api';

export default function Orders() {
  const [orders, setOrders]       = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts]   = useState([]);
  const [custId, setCustId]       = useState('');
  const [items, setItems]         = useState([{ product_id:'', quantity:1, unit_price:'' }]);

  const load = async () => {
    const [o, c, p] = await Promise.all([
      axios.get(`${API}/orders`),
      axios.get(`${API}/customers`),
      axios.get(`${API}/products`)
    ]);
    setOrders(o.data); setCustomers(c.data); setProducts(p.data);
  };
  useEffect(() => { load(); }, []);

  const addItem = () => setItems([...items, { product_id:'', quantity:1, unit_price:'' }]);
  const updateItem = (i, field, val) => {
    const updated = [...items];
    updated[i][field] = val;
    setItems(updated);
  };

  const submit = async () => {
    await axios.post(`${API}/orders`, { customer_id: custId, status:'pending', items });
    setCustId('');
    setItems([{ product_id:'', quantity:1, unit_price:'' }]);
    load();
  };
  const del = async (id) => { await axios.delete(`${API}/orders/${id}`); load(); };

  return (
    <div>
      <h2>Orders</h2>
      <p style={{ color:'#6b7280' }}>
        📌 <strong>Many-to-Many:</strong> Orders ↔ Products via <code>order_items</code> junction collection
        using <code>order_id</code> + <code>product_id</code> reference keys
      </p>

      <div style={{ background:'#f9fafb', padding:16, borderRadius:8, marginBottom:20 }}>
        <div style={{ marginBottom:10 }}>
          <label style={{ fontWeight:600 }}>Customer: </label>
          <select value={custId} onChange={e => setCustId(e.target.value)}
            style={{ padding:8, border:'1px solid #d1d5db', borderRadius:6, marginLeft:8 }}>
            <option value="">Select Customer</option>
            {customers.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>

        <label style={{ fontWeight:600 }}>Order Items (Many-to-Many):</label>
        {items.map((item, i) => (
          <div key={i} style={{ display:'flex', gap:8, marginTop:8 }}>
            <select value={item.product_id}
              onChange={e => updateItem(i,'product_id',e.target.value)}
              style={{ padding:8, border:'1px solid #d1d5db', borderRadius:6, flex:2 }}>
              <option value="">Select Product</option>
              {products.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
            </select>
            <input type="number" placeholder="Qty" value={item.quantity}
              onChange={e => updateItem(i,'quantity',e.target.value)}
              style={{ padding:8, border:'1px solid #d1d5db', borderRadius:6, width:70 }} />
            <input type="number" placeholder="Price" value={item.unit_price}
              onChange={e => updateItem(i,'unit_price',e.target.value)}
              style={{ padding:8, border:'1px solid #d1d5db', borderRadius:6, width:100 }} />
          </div>
        ))}
        <div style={{ marginTop:10, display:'flex', gap:8 }}>
          <button onClick={addItem}
            style={{ padding:'6px 14px', background:'#e5e7eb', border:'none', borderRadius:6, cursor:'pointer' }}>
            + Add Item
          </button>
          <button onClick={submit}
            style={{ padding:'6px 14px', background:'#4f46e5', color:'white', border:'none', borderRadius:6, cursor:'pointer' }}>
            Place Order
          </button>
        </div>
      </div>

      {orders.map(o => (
        <div key={o._id} style={{ border:'1px solid #e5e7eb', borderRadius:8, padding:16, marginBottom:12 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <strong>Customer:</strong> {o.customer_id?.name} &nbsp;
              <span style={{ background:'#dcfce7', color:'#166534', padding:'2px 8px', borderRadius:12, fontSize:13 }}>
                {o.status}
              </span>
            </div>
            <button onClick={() => del(o._id)}
              style={{ padding:'4px 10px', background:'#ef4444', color:'white', border:'none', borderRadius:4, cursor:'pointer' }}>
              Delete
            </button>
          </div>
          <div style={{ fontSize:12, color:'#6b7280', marginTop:4 }}>
            <code>order_id: {o._id}</code> | <code>customer_id (ref): {o.customer_id?._id}</code>
          </div>
          <table width="100%" style={{ marginTop:10, borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:'#f3f4f6' }}>
                {['Product','Qty','Unit Price','product_id (ref key)','order_id (ref key)'].map(h => (
                  <th key={h} style={{ padding:6, textAlign:'left', fontSize:12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {o.items?.map(item => (
                <tr key={item._id} style={{ borderBottom:'1px solid #e5e7eb' }}>
                  <td style={{ padding:6 }}>{item.product_id?.name}</td>
                  <td style={{ padding:6 }}>{item.quantity}</td>
                  <td style={{ padding:6 }}>₹{item.unit_price}</td>
                  <td style={{ padding:6, fontFamily:'monospace', fontSize:11, color:'#6b7280' }}>{item.product_id?._id}</td>
                  <td style={{ padding:6, fontFamily:'monospace', fontSize:11, color:'#6b7280' }}>{item.order_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}