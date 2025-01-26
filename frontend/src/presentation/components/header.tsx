import NewSession from './new-session-modal';

const Header: React.FC = () => {
  return (
    <nav className="flex items-center justify-between bg-rose-950">
      <a href="/" className="ml-12">
        <p className="text-rose-100 text-xl">Call Me Maybe</p>
      </a>
      <div className="actionsContainer mr-12 flex gap-4">
        <NewSession />
      </div>
    </nav>
  );
};

export default Header;
