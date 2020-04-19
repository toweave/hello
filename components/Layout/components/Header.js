import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle} title="Home">Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle} title="About">About</a>
    </Link>
    <Link href="/link">
      <a style={linkStyle} title="About">Link</a>
    </Link>
  </div>
);

export default Header;
