import '../styles/globals.css';

function Privbin({ Component, pageProps }) {
  return (
    <div className="dark:bg-gray-900">
      <Component {...pageProps} />
    </div>
  );
}

export default Privbin;
