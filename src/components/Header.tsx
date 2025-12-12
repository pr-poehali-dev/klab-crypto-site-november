import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onLogout: () => void;
}

const Header = ({ currentPage, setCurrentPage, onLogout }: HeaderProps) => {
  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'wallet', label: 'Кошелек', icon: 'Wallet' },
    { id: 'trading', label: 'Торговля', icon: 'TrendingUp' },
    { id: 'profile', label: 'Профиль', icon: 'User' },
    { id: 'support', label: 'Поддержка', icon: 'MessageCircle' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="text-3xl">💎</div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              KLAB
            </h1>
          </div>

          <nav className="hidden md:flex gap-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? 'default' : 'ghost'}
                onClick={() => setCurrentPage(item.id)}
                className="gap-2"
              >
                <Icon name={item.icon as any} size={18} />
                {item.label}
              </Button>
            ))}
          </nav>

          <Button variant="outline" onClick={onLogout} className="gap-2">
            <Icon name="LogOut" size={18} />
            Выход
          </Button>
        </div>

        <nav className="md:hidden flex overflow-x-auto pb-2 gap-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={currentPage === item.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentPage(item.id)}
              className="gap-2 whitespace-nowrap"
            >
              <Icon name={item.icon as any} size={16} />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;