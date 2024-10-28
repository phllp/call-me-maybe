import Button from './generic/button';
import { MessageCirclePlus } from 'lucide-react';

const Header: React.FC = () => {
  const handleInvite = () => {
    console.log('Invite');
  };

  return (
    <nav className="flex items-center justify-between bg-rose-950">
      <a href="/home" className="ml-12">
        <p className="text-rose-100 text-xl">Call Me Maybe</p>
      </a>
      <div className="actionsContainer mr-12">
        <Button
          onClick={handleInvite}
          name="Invite"
          icon={<MessageCirclePlus />}
        />
      </div>
    </nav>
  );
};

export default Header;
