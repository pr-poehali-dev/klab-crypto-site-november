import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Wallet from '@/components/Wallet';
import Trading from '@/components/Trading';
import Profile from '@/components/Profile';
import Support from '@/components/Support';
import Auth from '@/components/Auth';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [balance, setBalance] = useState(1000);
  const [klabAmount, setKlabAmount] = useState(500);
  const [transactions, setTransactions] = useState<any[]>([
    { id: 1, type: 'buy', amount: 100, price: 2.5, date: '2025-12-07 14:30' },
    { id: 2, type: 'receive', amount: 50, from: '0xABC...123', date: '2025-12-06 10:15' },
  ]);

  const handleLogin = (username: string, password: string) => {
    if (username && password) {
      setIsAuthenticated(true);
      setCurrentPage('home');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  const addTransaction = (transaction: any) => {
    setTransactions([{ ...transaction, id: Date.now(), date: new Date().toLocaleString('ru-RU') }, ...transactions]);
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#1A1F2C] to-[#0a0e1a]">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' && <Hero klabAmount={klabAmount} balance={balance} />}
        {currentPage === 'wallet' && (
          <Wallet 
            balance={balance} 
            klabAmount={klabAmount}
            setBalance={setBalance}
            setKlabAmount={setKlabAmount}
            addTransaction={addTransaction}
          />
        )}
        {currentPage === 'trading' && (
          <Trading 
            balance={balance}
            klabAmount={klabAmount}
            setBalance={setBalance}
            setKlabAmount={setKlabAmount}
            addTransaction={addTransaction}
          />
        )}
        {currentPage === 'profile' && <Profile transactions={transactions} />}
        {currentPage === 'support' && <Support />}
      </main>
    </div>
  );
};

export default Index;