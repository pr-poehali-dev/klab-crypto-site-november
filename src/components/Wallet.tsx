import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface WalletProps {
  balance: number;
  klabAmount: number;
  setBalance: (value: number) => void;
  setKlabAmount: (value: number) => void;
  addTransaction: (transaction: any) => void;
}

const Wallet = ({ balance, klabAmount, setBalance, setKlabAmount, addTransaction }: WalletProps) => {
  const [sendAmount, setSendAmount] = useState('');
  const [sendAddress, setSendAddress] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [newBalance, setNewBalance] = useState(balance.toString());
  const [newKlab, setNewKlab] = useState(klabAmount.toString());

  const handleSend = () => {
    const amount = parseFloat(sendAmount);
    if (!sendAddress || !amount || amount <= 0) {
      toast.error('Заполните все поля корректно');
      return;
    }
    if (amount > klabAmount) {
      toast.error('Недостаточно KLAB на балансе');
      return;
    }

    setKlabAmount(klabAmount - amount);
    addTransaction({
      type: 'send',
      amount,
      to: sendAddress,
    });
    toast.success(`Отправлено ${amount} KLAB`);
    setSendAmount('');
    setSendAddress('');
  };

  const handleSaveBalances = () => {
    const newBalanceNum = parseFloat(newBalance);
    const newKlabNum = parseFloat(newKlab);

    if (isNaN(newBalanceNum) || isNaN(newKlabNum) || newBalanceNum < 0 || newKlabNum < 0) {
      toast.error('Введите корректные значения');
      return;
    }

    setBalance(newBalanceNum);
    setKlabAmount(newKlabNum);
    setEditMode(false);
    toast.success('Балансы обновлены! 🎉');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-2">🎁 Мой кошелек</h2>
        <p className="text-muted-foreground">Управляйте своими активами KLAB</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-card border-primary/30 glow-gold">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Баланс KLAB</h3>
            <span className="text-3xl">🪙</span>
          </div>
          {editMode ? (
            <Input
              type="number"
              value={newKlab}
              onChange={(e) => setNewKlab(e.target.value)}
              className="text-2xl font-bold mb-2"
            />
          ) : (
            <p className="text-4xl font-bold text-primary mb-2">{klabAmount}</p>
          )}
          <p className="text-sm text-muted-foreground">
            ≈ ${(klabAmount * 7500).toLocaleString()} USD
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-secondary/10 to-card border-secondary/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Баланс USD</h3>
            <span className="text-3xl">💵</span>
          </div>
          {editMode ? (
            <Input
              type="number"
              value={newBalance}
              onChange={(e) => setNewBalance(e.target.value)}
              className="text-2xl font-bold mb-2"
            />
          ) : (
            <p className="text-4xl font-bold text-secondary mb-2">${balance}</p>
          )}
          <p className="text-sm text-muted-foreground">Доступно для торговли</p>
        </Card>
      </div>

      <Card className="p-6 bg-card/50 backdrop-blur">
        {editMode ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Edit" size={24} className="text-primary" />
              <h3 className="text-xl font-bold">Редактировать балансы</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Измените балансы на любые значения
            </p>
            <div className="flex gap-3">
              <Button onClick={handleSaveBalances} className="flex-1">
                <Icon name="Check" size={18} className="mr-2" />
                Сохранить
              </Button>
              <Button variant="outline" onClick={() => setEditMode(false)} className="flex-1">
                <Icon name="X" size={18} className="mr-2" />
                Отмена
              </Button>
            </div>
          </div>
        ) : (
          <Button onClick={() => setEditMode(true)} className="w-full" variant="outline">
            <Icon name="Edit" size={18} className="mr-2" />
            Изменить баланс вручную
          </Button>
        )}
      </Card>

      <Card className="p-6 bg-card/50 backdrop-blur">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="Send" size={24} className="text-primary" />
          <h3 className="text-xl font-bold">Отправить KLAB</h3>
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="address">Адрес получателя</Label>
            <Input
              id="address"
              placeholder="0x..."
              value={sendAddress}
              onChange={(e) => setSendAddress(e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="amount">Количество KLAB</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0"
              value={sendAmount}
              onChange={(e) => setSendAmount(e.target.value)}
              className="mt-2"
            />
          </div>
          <Button onClick={handleSend} className="w-full">
            <Icon name="Send" size={18} className="mr-2" />
            Отправить
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Wallet;