import { Link } from 'react-router-dom';
import { ReactComponent as LogoDark } from 'src/assets/images/logos/dark-logo.svg';
import { styled } from '@mui/material';
import logo from '../../../../assets/images/sumagologo.png';
const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      {/* <LogoDark height={70} /> */}
      <img src={logo} alt="logo" style={{ width: '11rem', marginTop: '2.5rem' }} />
    </LinkStyled>
  );
};

export default Logo;
