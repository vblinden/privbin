import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Editor from '@monaco-editor/react';
const CryptoJS = require('crypto-js');

export default function Home() {
  const router = useRouter();
  const { id } = router.query;

  const [originalContent, setOriginalContent] = useState('');
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState('');
  const [hasPassword, setHasPassword] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const rawUrl = `/${id}/raw`;

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (!id) return;

      const response = await fetch(`/api/${id}`);

      if (!response.ok) {
        return setError("The paste you are looking for can't be found.");
      }

      const json = await response.json();

      setContent(json.content);
      setHasPassword(json.hasPassword);
      setLanguage(json.language);
      setOriginalContent(json.content);
    })();
  }, [id]);

  const decrypt = (password) => {
    if (!password) {
      return setContent(originalContent);
    }

    try {
      const bytes = CryptoJS.AES.decrypt(originalContent, password);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      if (!decrypted) throw Error("Can't decrypt content with wrong password.");

      setContent(decrypted);
    } catch {
      setContent('Wrong password!');
    }
  };

  return (
    <>
      <Head>
        <title>Privbin</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <div className="container mx-auto text-center py-10 px-4">
        <Header />

        <div className="text-left">
          {error && <div className="block bg-red-500 text-white py-2 px-3 mb-3 rounded-md">{error}</div>}

          {hasPassword && (
            <label className="block mb-3">
              <span className="text-gray-700 font-bold dark:text-gray-300">Password</span>
              <input
                type="password"
                onChange={(e) => decrypt(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              />
            </label>
          )}

          <label className="block mb-3">
            <span className="text-gray-700 font-bold dark:text-gray-300">Contents</span> (
            <a href={rawUrl} className="text-gray-400 font-bold dark:text-gray-300 hover:text-gray-600">
              raw
            </a>
            )
            <Editor
              height="40vh"
              theme={darkMode ? 'vs-dark' : 'light'}
              language={language}
              value={content}
              options={{ minimap: { enabled: false }, readOnly: true }}
              className="border rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring dark:border-gray-700"
            />
          </label>
        </div>

        <Footer />
      </div>
    </>
  );
}
