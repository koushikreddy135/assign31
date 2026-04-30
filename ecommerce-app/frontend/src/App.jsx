import { useState } from 'react';
import Customers  from './components/Customers';
import Categories from './components/Categories';
import Products   from './components/Products';
import Orders     from './components/Orders';

const tabs = ['Customers', 'Categories', 'Products', 'Orders'];

export default function App() {
  const [active, setActive] = useState('Customers');

  return (
    <div style={{ fontFamily:'sans-serif', maxWidth:950, margin:'0 auto', padding:20 }}>
      <h1>🛒 E-Commerce MongoDB Relations</h1>
      <div style={{ display:'flex', gap:10, marginBottom:20 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActive(t)}
            style={{ padding:'8px 18px',
                     background: active===t ? '#4f46e5' : '#e5e7eb',
                     color: active===t ? 'white' : 'black',
                     border:'none', borderRadius:6,
                     cursor:'pointer', fontWeight:600 }}>
            {t}
          </button>
        ))}
      </div>
      {active === 'Customers'  && <Customers />}
      {active === 'Categories' && <Categories />}
      {active === 'Products'   && <Products />}
      {active === 'Orders'     && <Orders />}
    </div>
  );
}