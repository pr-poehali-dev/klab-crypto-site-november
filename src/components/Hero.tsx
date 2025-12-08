import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

interface HeroProps {
  klabAmount: number;
  balance: number;
}

const Hero = ({ klabAmount, balance }: HeroProps) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [currentPrice, setCurrentPrice] = useState(2.45);

  useEffect(() => {
    const data = [];
    let price = 2.0;
    for (let i = 0; i < 30; i++) {
      price += (Math.random() - 0.48) * 0.2;
      data.push({
        time: `${i}д`,
        price: parseFloat(price.toFixed(2)),
      });
    }
    setChartData(data);
    setCurrentPrice(data[data.length - 1].price);
  }, []);

  const priceChange = ((currentPrice - 2.0) / 2.0 * 100).toFixed(2);
  const isPositive = parseFloat(priceChange) > 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-4 py-8">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-scale-in">
          🎅 KLAB TOKEN 🎄
        </h1>
        <p className="text-xl text-muted-foreground">
          Новогодняя криптовалюта для всех! ❄️
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-primary/30 hover-scale">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-muted-foreground">Текущая цена</h3>
            <span className="text-3xl">💰</span>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold text-primary">${currentPrice}</p>
            <p className={`text-sm ${isPositive ? 'text-secondary' : 'text-destructive'}`}>
              {isPositive ? '↑' : '↓'} {Math.abs(parseFloat(priceChange))}% за 30 дней
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-secondary/30 hover-scale">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-muted-foreground">Мои KLAB</h3>
            <span className="text-3xl">🎁</span>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold text-secondary">{klabAmount}</p>
            <p className="text-sm text-muted-foreground">
              ≈ ${(klabAmount * currentPrice).toFixed(2)} USD
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-accent/30 hover-scale">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-muted-foreground">Баланс USD</h3>
            <span className="text-3xl">💵</span>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold text-accent">${balance}</p>
            <p className="text-sm text-muted-foreground">
              Доступно для покупки
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-primary/20">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          📈 График цены KLAB
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis 
              dataKey="time" 
              stroke="#8E9196"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#8E9196"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1A1F2C', 
                border: '1px solid #FFD700',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#FFD700" 
              strokeWidth={3}
              dot={{ fill: '#FFD700', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Hero;
