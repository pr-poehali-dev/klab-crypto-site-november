import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface AuthProps {
  onLogin: (username: string, password: string) => void;
}

const Auth = ({ onLogin }: AuthProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      toast.error('Заполните все поля');
      return;
    }
    onLogin(username, password);
    toast.success('Добро пожаловать!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-[#0a0e1a] via-[#1A1F2C] to-[#0a0e1a]">
      <Card className="w-full max-w-md p-8 bg-card/95 backdrop-blur-md border-primary/30 glow-gold animate-scale-in">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">💎</div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            KLAB TOKEN
          </h1>
          <p className="text-muted-foreground">Цифровая валюта будущего</p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="username">Имя пользователя</Label>
            <Input
              id="username"
              placeholder="Введите имя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <div>
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <Button onClick={handleLogin} className="w-full" size="lg">
            <Icon name="LogIn" size={20} className="mr-2" />
            Войти
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <p>Для демо используйте любые данные</p>
          </div>
        </div>

        <div className="mt-8 p-4 bg-secondary/10 rounded-lg border border-secondary/30">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Shield" size={18} className="text-secondary" />
            <h3 className="font-semibold text-sm">Безопасность</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Защита данных, двухфакторная аутентификация, шифрование транзакций
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Auth;