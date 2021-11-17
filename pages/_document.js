import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const defaultColorMode = process.env.NEXT_PUBLIC_DEFAULT_COLOR_MODE;

    return (
      <Html className={`${defaultColorMode === 'dark' ? 'dark' : ''} dark:bg-gray-900`.trim()}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
