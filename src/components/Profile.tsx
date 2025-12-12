import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface ProfileProps {
  transactions: any[];
  userLevel: number;
  totalTrades: number;
}

const Profile = ({ transactions, userLevel, totalTrades }: ProfileProps) => {
  const levels = [
    { level: 1, name: 'Новичок', icon: '🌱', minTrades: 0, color: 'text-gray-400' },
    { level: 2, name: 'Ученик', icon: '📚', minTrades: 5, color: 'text-blue-400' },
    { level: 3, name: 'Трейдер', icon: '💼', minTrades: 10, color: 'text-green-400' },
    { level: 4, name: 'Опытный', icon: '⚡', minTrades: 15, color: 'text-yellow-400' },
    { level: 5, name: 'Профи', icon: '🎯', minTrades: 20, color: 'text-orange-400' },
    { level: 6, name: 'Эксперт', icon: '🏆', minTrades: 25, color: 'text-red-400' },
    { level: 7, name: 'Магистр', icon: '👑', minTrades: 30, color: 'text-purple-400' },
    { level: 8, name: 'Миллионер', icon: '💎', minTrades: 35, color: 'text-cyan-400' },
    { level: 9, name: 'Магнат', icon: '🚀', minTrades: 40, color: 'text-pink-400' },
    { level: 10, name: 'Легенда', icon: '⭐', minTrades: 45, color: 'text-amber-400' },
  ];

  const currentLevelData = levels.find(l => l.level === userLevel) || levels[3];
  const nextLevelData = levels.find(l => l.level === userLevel + 1);
  
  const tradesForNextLevel = nextLevelData ? nextLevelData.minTrades - totalTrades : 0;
  const progressPercent = nextLevelData 
    ? ((totalTrades - currentLevelData.minTrades) / (nextLevelData.minTrades - currentLevelData.minTrades)) * 100 
    : 100;

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
        <p className="text-muted-foreground">Ваша активность и прогресс</p>
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/10 to-card border-primary/30">
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-5xl">{currentLevelData.icon}</span>
          </div>
          <h3 className={`text-3xl font-bold mb-2 ${currentLevelData.color}`}>
            {currentLevelData.name}
          </h3>
          <Badge variant="outline" className="text-lg px-4 py-1">
            Уровень {userLevel}
          </Badge>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Прогресс до следующего уровня</span>
              {nextLevelData ? (
                <span className="font-semibold">
                  {totalTrades} / {nextLevelData.minTrades} сделок
                </span>
              ) : (
                <span className="font-semibold text-primary">Максимальный уровень!</span>
              )}
            </div>
            <Progress value={progressPercent} className="h-3" />
            {nextLevelData && (
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Осталось {tradesForNextLevel} {tradesForNextLevel === 1 ? 'сделка' : 'сделок'} до уровня "{nextLevelData.name}" {nextLevelData.icon}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{totalTrades}</p>
              <p className="text-sm text-muted-foreground">Торговых сделок</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-secondary">{transactions.length}</p>
              <p className="text-sm text-muted-foreground">Всего операций</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card/50 backdrop-blur">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="Award" size={24} className="text-primary" />
          <h3 className="text-xl font-bold">Все уровни и звания</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {levels.map((level) => (
            <div
              key={level.level}
              className={`p-3 rounded-lg text-center transition-all ${
                level.level <= userLevel
                  ? 'bg-primary/20 border-2 border-primary/50'
                  : 'bg-muted/20 border border-muted opacity-50'
              }`}
            >
              <div className="text-3xl mb-1">{level.icon}</div>
              <p className={`font-semibold text-sm ${level.level <= userLevel ? level.color : 'text-muted-foreground'}`}>
                {level.name}
              </p>
              <p className="text-xs text-muted-foreground">Ур. {level.level}</p>
            </div>
          ))}
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
