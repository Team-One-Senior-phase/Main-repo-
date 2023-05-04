import React,{useState} from 'react';

const Payement = () => {
    const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  }
    return (
        <form className="bg-white p-4 rounded-lg">
      <label htmlFor="name">Name on card:</label>
      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

      <label htmlFor="cardNumber">Card number:</label>
      <input type="text" id="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />

      <label htmlFor="expDate">Expiration date:</label>
      <input type="text" id="expDate" value={expDate} onChange={(e) => setExpDate(e.target.value)} />

      <label htmlFor="cvv">CVV:</label>
      <input type="text" id="cvv" value={cvv} onChange={(e) => setCvv(e.target.value)} />

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
        Submit
      </button>
    </form>
    )
}

export default Payement;