import InviteLink from './invitation-link-modal';

const Header: React.FC = () => {
  return (
    <nav className="flex items-center justify-between bg-rose-950">
      <a href="/home" className="ml-12">
        <p className="text-rose-100 text-xl">Call Me Maybe</p>
      </a>
      <div className="actionsContainer mr-12">
        <InviteLink />
      </div>
    </nav>
  );
};

export default Header;
