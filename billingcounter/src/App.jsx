import React, { useState } from 'react';
import './App.css';

function App() {
  const counters = [
    { id: 1, name: 'C1' },
    { id: 2, name: 'C2' },
    { id: 3, name: 'C3' },
    { id: 4, name: 'C4' },
    { id: 5, name: 'C5' },
  ];

  const initialCustomers = [
    { items: 5 },
    { items: 3 },
    { items: 7 },
    { items: 4 },
    { items: 2 },
  ];
  const waitingCustomers = [
    { items: 3 },
    { items: 1 },
    { items: 3 },
    { items: 4 },
    { items: 1 },
  ];

  const [customers, setCustomers] = useState(initialCustomers);
  const [waitCustomers, setWaitCustomers] = useState(waitingCustomers);

  const handleStartBilling = () => {
    const interval = setInterval(() => {
      setCustomers(prevCustomers => {
        const updatedCustomers = prevCustomers.map(customer => {
          if (customer.items > 1) {
            return { items: customer.items - 1 };
          } else {
            return null;
          }
        }).filter(Boolean);
        return updatedCustomers;
      });

      if (waitCustomers.length > 0) {
        const minWaitingItems = Math.min(...waitCustomers.map(customer => customer.items));
        const minWaitingIndex = waitCustomers.findIndex(customer => customer.items === minWaitingItems);

        if (minWaitingIndex !== -1) {
          const movedCustomer = waitCustomers.splice(minWaitingIndex, 1)[0];
          setWaitCustomers([...waitCustomers]);
          setCustomers(prevCustomers => {
            const leastItems = Math.min(...prevCustomers.map(customer => customer.items));
            const leastItemsIndex = prevCustomers.findIndex(customer => customer.items === leastItems);
            const newCustomers = [...prevCustomers];
            newCustomers.splice(leastItemsIndex + 1, 0, movedCustomer);
            return newCustomers;
          });
        }
      }

      if (customers.length === 0 && waitCustomers.length === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  return (
    <>
      <header>Billing counter</header>
      <div className='flex justify-evenly'>
        <div className='flex gap-9'>
          {counters.map((counter, index) => (
            <div key={counter.id} className='flex flex-col items-center'>
              <div className='border border-black rounded-full text-slate-100 text-2xl bg-black p-5'>
                {counter.name}
              </div>
              {customers[index] && (
                <div
                  className='w-0 h-0 relative
                  border-l-[35px] border-l-transparent
                  border-b-[60px] border-b-black-500
                  border-r-[35px] border-r-transparent
                  justify-center items-center'
                >
                  <span className='absolute top-6'>{customers[index]?.items}</span>
                </div>
              )}
              {/* waitingCustomers should here first */}
              
              
            </div>
          ))}
          <button
            className='border border-blue-600 h-max bg-blue-500 text-white p-3 cursor-pointer'
            onClick={handleStartBilling}
          >
            Start Billing
          </button>
        </div>
        <div>
          <header>Waiting customers with their items</header>
          <div className='flex flex-row gap-7'>
            {waitCustomers.map((customer, index) => (
              <div key={index} className=''>
                {customer.items > 0 && (
                  <div className='relative w-0 h-0 
                    border-l-[35px] border-l-transparent
                    border-b-[60px] border-b-black-500
                    border-r-[35px] border-r-transparent
                    justify-center items-center'>
                    <span className='absolute top-6'>{customer.items}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
