import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ProfileProps {
  transactions: any[];
}

const Profile = ({ transactions }: ProfileProps) => {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'buy': return 'ShoppingCart';
      case 'sell': return 'DollarSign';
      case 'send': return 'Send';
      case 'receive': return 'Download';
      default: return 'Activity';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'buy': return 'bg-secondary/20 text-secondary';
      case 'sell': return 'bg-destructive/20 text-destructive';
      case 'send': return 'bg-primary/20 text-primary';
      case 'receive': return 'bg-accent/20 text-accent';
      default: return 'bg-muted';
    }
  };

  const getTransactionLabel = (type: string) => {
    switch (type) {
      case 'buy': return 'Покупка';
      case 'sell': return 'Продажа';
      case 'send': return 'Отправка';
      case 'receive': return 'Получение';
      default: return 'Операция';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-2">👤 Профиль</h2>
        <p className="text-muted-foreground">Ваша активность и история операций</p>
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/10 to-card border-primary/30 text-center">
        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-5xl">🎅</span>
        </div>
        <h3 className="text-2xl font-bold mb-2">Санта-Трейдер</h3>
        <p className="text-muted-foreground mb-4">Участник с декабря 2025</p>
        <div className="flex justify-center gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{transactions.length}</p>
            <p className="text-sm text-muted-foreground">Операций</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-secondary">⭐⭐⭐</p>
            <p className="text-sm text-muted-foreground">Рейтинг</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card/50 backdrop-blur">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="History" size={24} className="text-primary" />
          <h3 className="text-xl font-bold">История операций</h3>
        </div>

        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">📭</span>
            <p className="text-muted-foreground">Нет операций</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getTransactionColor(tx.type)}`}>
                    <Icon name={getTransactionIcon(tx.type) as any} size={20} />
                  </div>
                  <div>
                    <p className="font-semibold">{getTransactionLabel(tx.type)}</p>
                    <p className="text-sm text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">
                    {tx.type === 'sell' || tx.type === 'send' ? '-' : '+'}{tx.amount} KLAB
                  </p>
                  {tx.price && (
                    <p className="text-sm text-muted-foreground">
                      @ ${tx.price}
                    </p>
                  )}
                  {tx.to && (
                    <p className="text-xs text-muted-foreground">
                      → {tx.to}
                    </p>
                  )}
                  {tx.from && (
                    <p className="text-xs text-muted-foreground">
                      ← {tx.from}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Profile;
