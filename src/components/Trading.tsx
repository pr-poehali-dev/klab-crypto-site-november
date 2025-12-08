import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface TradingProps {
  balance: number;
  klabAmount: number;
  setBalance: (value: number) => void;
  setKlabAmount: (value: number) => void;
  addTransaction: (transaction: any) => void;
}

const Trading = ({ balance, klabAmount, setBalance, setKlabAmount, addTransaction }: TradingProps) => {
  const [buyAmount, setBuyAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const currentPrice = 2.45;

  const handleBuy = () => {
    const amount = parseFloat(buyAmount);
    if (!amount || amount <= 0) {
      toast.error('Введите корректное количество');
      return;
    }

    const totalCost = amount * currentPrice;
    if (totalCost > balance) {
      toast.error('Недостаточно USD на балансе');
      return;
    }

    setBalance(balance - totalCost);
    setKlabAmount(klabAmount + amount);
    addTransaction({
      type: 'buy',
      amount,
      price: currentPrice,
    });
    toast.success(`Куплено ${amount} KLAB за $${totalCost.toFixed(2)}`);
    setBuyAmount('');
  };

  const handleSell = () => {
    const amount = parseFloat(sellAmount);
    if (!amount || amount <= 0) {
      toast.error('Введите корректное количество');
      return;
    }

    if (amount > klabAmount) {
      toast.error('Недостаточно KLAB на балансе');
      return;
    }

    const totalRevenue = amount * currentPrice;
    setBalance(balance + totalRevenue);
    setKlabAmount(klabAmount - amount);
    addTransaction({
      type: 'sell',
      amount,
      price: currentPrice,
    });
    toast.success(`Продано ${amount} KLAB за $${totalRevenue.toFixed(2)}`);
    setSellAmount('');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-2">📊 Торговля KLAB</h2>
        <p className="text-muted-foreground">Покупайте и продавайте KLAB токены</p>
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/5 to-card border-primary/20">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">Текущая цена</p>
          <p className="text-5xl font-bold text-primary">${currentPrice}</p>
          <p className="text-sm text-secondary">↑ +5.2% за 24ч</p>
        </div>
      </Card>

      <Card className="p-6 bg-card/50 backdrop-blur">
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy" className="gap-2">
              <Icon name="TrendingUp" size={18} />
              Купить
            </TabsTrigger>
            <TabsTrigger value="sell" className="gap-2">
              <Icon name="TrendingDown" size={18} />
              Продать
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-4 mt-6">
            <div className="grid grid-cols-2 gap-4 p-4 bg-secondary/10 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Доступно USD</p>
                <p className="text-xl font-bold text-secondary">${balance}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Цена KLAB</p>
                <p className="text-xl font-bold text-primary">${currentPrice}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="buy-amount">Количество KLAB</Label>
              <Input
                id="buy-amount"
                type="number"
                placeholder="0"
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
              />
              {buyAmount && (
                <p className="text-sm text-muted-foreground">
                  Итого: ${(parseFloat(buyAmount) * currentPrice).toFixed(2)} USD
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBuyAmount((balance / currentPrice * 0.25).toFixed(2))}
              >
                25%
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBuyAmount((balance / currentPrice * 0.5).toFixed(2))}
              >
                50%
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBuyAmount((balance / currentPrice * 0.75).toFixed(2))}
              >
                75%
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBuyAmount((balance / currentPrice).toFixed(2))}
              >
                Макс
              </Button>
            </div>

            <Button onClick={handleBuy} className="w-full" size="lg">
              <Icon name="ShoppingCart" size={20} className="mr-2" />
              Купить KLAB
            </Button>
          </TabsContent>

          <TabsContent value="sell" className="space-y-4 mt-6">
            <div className="grid grid-cols-2 gap-4 p-4 bg-destructive/10 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Доступно KLAB</p>
                <p className="text-xl font-bold text-secondary">{klabAmount}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Цена KLAB</p>
                <p className="text-xl font-bold text-primary">${currentPrice}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sell-amount">Количество KLAB</Label>
              <Input
                id="sell-amount"
                type="number"
                placeholder="0"
                value={sellAmount}
                onChange={(e) => setSellAmount(e.target.value)}
              />
              {sellAmount && (
                <p className="text-sm text-muted-foreground">
                  Получите: ${(parseFloat(sellAmount) * currentPrice).toFixed(2)} USD
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSellAmount((klabAmount * 0.25).toFixed(2))}
              >
                25%
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSellAmount((klabAmount * 0.5).toFixed(2))}
              >
                50%
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSellAmount((klabAmount * 0.75).toFixed(2))}
              >
                75%
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSellAmount(klabAmount.toString())}
              >
                Макс
              </Button>
            </div>

            <Button onClick={handleSell} className="w-full" size="lg" variant="destructive">
              <Icon name="DollarSign" size={20} className="mr-2" />
              Продать KLAB
            </Button>
          </TabsContent>
        </Tabs>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-accent/10 to-card border-accent/30">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🎁</span>
          <div>
            <h3 className="text-lg font-bold">Новогодняя акция!</h3>
            <p className="text-sm text-muted-foreground">Бонус +10% при покупке от 100 KLAB</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Trading;
