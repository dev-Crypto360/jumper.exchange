import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Logo, NavbarButtons, NavbarTabs } from 'src/components';
import { useAccounts } from 'src/hooks';
import { useSettingsStore } from 'src/stores';
import { NavbarContainer as Container } from '.';

interface NavbarProps {
  hideNavbarTabs?: boolean;
}

export const Navbar = ({ hideNavbarTabs }: NavbarProps) => {
  const theme = useTheme();
  const { account } = useAccounts();
  const [onWelcomeScreenClosed] = useSettingsStore((state) => [
    state.onWelcomeScreenClosed,
  ]);

  const handleClick = () => {
    onWelcomeScreenClosed(false);
  };

  return (
    <Container>
      <Link to="/" onClick={handleClick}>
        <Logo isConnected={!!account?.address} theme={theme} />
      </Link>
      {!hideNavbarTabs ? <NavbarTabs /> : null}
      <NavbarButtons />
    </Container>
  );
};
