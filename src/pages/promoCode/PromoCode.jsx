import React, { useState } from 'react';
import './PromoCode.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const PromoCode = ({ url }) => {
  const [data, setData] = useState({
    promocode: '',
    amount: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/promo`, data);
      if (response.data.success) {
        toast.success(response.data.message);
        setData({ promocode: '', amount: '' });
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Error adding promo code");
    }
  };

  return (
    <div className="promo-container">
      <form className="promo-form" onSubmit={onSubmitHandler}>
        <input
          type="text"
          name="promocode"
          placeholder="Enter Promocode"
          value={data.promocode}
          onChange={onChangeHandler}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Enter Amount"
          value={data.amount}
          onChange={onChangeHandler}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PromoCode;
