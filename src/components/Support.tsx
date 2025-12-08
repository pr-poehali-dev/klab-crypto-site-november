import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { useState } from 'react';

const Support = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (!email || !message) {
      toast.error('Заполните все поля');
      return;
    }
    toast.success('Сообщение отправлено! Мы ответим в течение 24 часов 🎅');
    setMessage('');
    setEmail('');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-2">💬 Поддержка</h2>
        <p className="text-muted-foreground">Мы всегда готовы помочь!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-card border-primary/30 hover-scale">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
              <Icon name="MessageCircle" size={32} className="text-primary" />
            </div>
            <h3 className="text-xl font-bold">Онлайн-чат</h3>
            <p className="text-muted-foreground">Средний ответ: 5 минут</p>
            <Button className="w-full">
              <Icon name="MessageSquare" size={18} className="mr-2" />
              Открыть чат
            </Button>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-secondary/10 to-card border-secondary/30 hover-scale">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto">
              <Icon name="Mail" size={32} className="text-secondary" />
            </div>
            <h3 className="text-xl font-bold">Email поддержка</h3>
            <p className="text-muted-foreground">support@klab.crypto</p>
            <Button variant="outline" className="w-full">
              <Icon name="Send" size={18} className="mr-2" />
              Написать письмо
            </Button>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-card/50 backdrop-blur">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="HelpCircle" size={24} className="text-primary" />
          <h3 className="text-xl font-bold">Отправить сообщение</h3>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="message">Сообщение</Label>
            <Textarea
              id="message"
              placeholder="Опишите вашу проблему или вопрос..."
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2"
            />
          </div>

          <Button onClick={handleSubmit} className="w-full" size="lg">
            <Icon name="Send" size={20} className="mr-2" />
            Отправить
          </Button>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-accent/10 to-card border-accent/30">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Icon name="BookOpen" size={24} />
          Частые вопросы
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-semibold mb-2">❓ Как купить KLAB токены?</h4>
            <p className="text-sm text-muted-foreground">
              Перейдите в раздел "Торговля", выберите вкладку "Купить", введите количество и нажмите кнопку покупки.
            </p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-semibold mb-2">❓ Как отправить токены другому пользователю?</h4>
            <p className="text-sm text-muted-foreground">
              В разделе "Кошелек" заполните адрес получателя и количество токенов, затем нажмите "Отправить".
            </p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-semibold mb-2">❓ Безопасна ли платформа?</h4>
            <p className="text-sm text-muted-foreground">
              Да! Мы используем современные методы шифрования и двухфакторную аутентификацию для защиты ваших средств.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Support;
