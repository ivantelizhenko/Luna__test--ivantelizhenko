import styled from 'styled-components';

const StyledFooter = styled.footer`
  padding: 2.4rem 6.4rem;
  margin-top: auto;
  width: 100%;
  background-color: #6c584c;
  color: #fff;

  display: flex;
  justify-content: center;
  box-shadow: 0 -5px 20px rgba(0 0 0 / 0.5);
`;

const Link = styled.a`
  color: inherit;
  border-bottom: 1px solid transparent;
  font-weight: 600;

  &:hover {
    border-bottom-color: currentColor;
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <Link href="https://github.com/ivantelizhenko" target="_blank">
        Git hub
      </Link>
    </StyledFooter>
  );
}

export default Footer;
