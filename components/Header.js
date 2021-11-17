import Link from 'next/link';

const Header = () => {
  const name = process.env.NEXT_PUBLIC_NAME;
  const content = process.env.NEXT_PUBLIC_DESCRIPTION;

  return (
    <>
      <Link href="/">
        <a>
          <h1 className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-1">
            {name}
          </h1>
        </a>
      </Link>

      <p className="mb-3 text-gray-600 text-xl dark:text-gray-300">{content}</p>
    </>
  );
};

export default Header;
