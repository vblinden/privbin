import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import formatDistance from 'date-fns/formatDistance';
import Editor from '@monaco-editor/react';
const CryptoJS = require('crypto-js');

export default function Home() {
  const name = process.env.NEXT_PUBLIC_NAME;

  const [content, setContent] = useState('');
  const [expiration, setExpiration] = useState('never');
  const [exposure, setExposure] = useState('public');
  const [language, setLanguage] = useState('javascript');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [publicPastes, setPublicPastes] = useState([]);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      content: password ? CryptoJS.AES.encrypt(content, password).toString() : content,
      expiration: expiration,
      exposure: exposure,
      password: !!password,
      language: language,
    };

    const response = await fetch('/api/set', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    Router.push(`/${(await response.json()).id}`);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/public');
      const json = await response.json();

      // console.log(json.entries);

      setPublicPastes(json.entries);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>{name}</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <div className="container mx-auto text-center py-10 px-4 dark:bg-gray-900">
        <Header />

        <form onSubmit={(e) => onSubmit(e)} className="text-left">
          <label className="block mb-3">
            <span className="text-gray-700 font-bold dark:text-gray-300">Contents</span>
            <Editor
              height="40vh"
              theme={darkMode ? 'vs-dark' : 'light'}
              defaultLanguage="javascript"
              defaultValue={content}
              language={language}
              options={{ minimap: { enabled: false } }}
              className="border rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring dark:border-gray-700"
              onChange={(value, event) => setContent(value)}
            />
          </label>

          <label className="block mb-3">
            <span className="text-gray-700 font-bold dark:text-gray-300">Syntax highlighting</span>
            <select
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              onChange={(e) => setLanguage(e.target.value)}
              defaultValue={language}
            >
              <option value="abap">ABAP</option>
              <option value="aes">AES</option>
              <option value="apex">Apex</option>
              <option value="azcli">Azcli</option>
              <option value="bat">Bat</option>
              <option value="bicep">Bicep</option>
              <option value="c">C</option>
              <option value="cameligo">Cameligo</option>
              <option value="clojure">Clojure</option>
              <option value="coffeescript">Coffeescript</option>
              <option value="cpp">Cpp</option>
              <option value="csharp">Csharp</option>
              <option value="csp">csp</option>
              <option value="css">CSS</option>
              <option value="dart">Dart</option>
              <option value="dockerfile">Dockerfile</option>
              <option value="ecl">Ccl</option>
              <option value="elixir">Elixir</option>
              <option value="flow9">Flow9</option>
              <option value="fsharp">Fsharp</option>
              <option value="go">Go</option>
              <option value="graphql">GraphQL</option>
              <option value="handlebars">Handlebars</option>
              <option value="hcl">Hcl</option>
              <option value="html">HTML</option>
              <option value="ini">Ini</option>
              <option value="java">Java</option>
              <option value="javascript">JavaScript</option>
              <option value="json">JSON</option>
              <option value="julia">Julia</option>
              <option value="kotlin">Kotlin</option>
              <option value="less">LESS</option>
              <option value="lexon">Lexon</option>
              <option value="liquid">Liquid</option>
              <option value="lua">Lua</option>
              <option value="m3">M3</option>
              <option value="markdown">Markdown</option>
              <option value="mips">Mips</option>
              <option value="msdax">Msdax</option>
              <option value="mysql">MySQL</option>
              <option value="objective">Objective-C</option>
              <option value="pascal">Pascal</option>
              <option value="pascaligo">Pascaligo</option>
              <option value="perl">Perl</option>
              <option value="pgsql">Pgsql</option>
              <option value="php">PHP</option>
              <option value="pla">Pla</option>
              <option value="plaintext">Plaintext</option>
              <option value="postiats">Postiats</option>
              <option value="powerquery">Powerquery</option>
              <option value="powershell">Powershell</option>
              <option value="proto">Proto</option>
              <option value="pug">Pug</option>
              <option value="python">Python</option>
              <option value="qsharp">Qsharp</option>
              <option value="r">R</option>
              <option value="razor">Razor</option>
              <option value="redis">Redis</option>
              <option value="redshift">Redshift</option>
              <option value="restructuredtext">Restructuredtext</option>
              <option value="ruby">Ruby</option>
              <option value="rust">Rust</option>
              <option value="sb">Sb</option>
              <option value="scala">Scala</option>
              <option value="scheme">Scheme</option>
              <option value="scss">SCSS</option>
              <option value="shell">Shell</option>
              <option value="sol">Sol</option>
              <option value="sparql">Sparql</option>
              <option value="sql">Sql</option>
              <option value="st">St</option>
              <option value="swift">Swift</option>
              <option value="systemverilog">Systemverilog</option>
              <option value="tcl">Tcl</option>
              <option value="twig">Twig</option>
              <option value="typescript">TypeScript</option>
              <option value="vb">VB</option>
              <option value="verilog">Verilog</option>
              <option value="xml">XML</option>
              <option value="yaml">YAML</option>
            </select>
          </label>

          <label className="block mb-3">
            <span className="text-gray-700 font-bold dark:text-gray-300">Expiration</span>
            <select
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              onChange={(e) => setExpiration(e.target.value)}
            >
              <option value="never">Never</option>
              {/* <option value="burn">Burn after read</option> */}
              <option value="600">10 minutes</option>
              <option value="3600">1 hour</option>
              <option value="86400">1 day</option>
              <option value="604800">1 week</option>
              <option value="1209600">2 weeks</option>
              <option value="2419200">1 month</option>
              <option value="14515200">6 months</option>
              <option value="29030400">1 year</option>
            </select>
          </label>

          <label className="block mb-3">
            <span className="text-gray-700 font-bold dark:text-gray-300">Exposure</span>
            <select
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              onChange={(e) => setExposure(e.target.value)}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </label>

          <label className="block mb-3">
            <span className="text-gray-700 font-bold dark:text-gray-300">
              Password <span className="font-normal text-gray-300">(optional)</span>
            </span>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            />
          </label>

          <button
            type="submit"
            className="p-1 px-5 bg-gray-800 text-gray-100 rounded-lg text-md hover:bg-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-500"
          >
            Create new paste
          </button>
        </form>

        <h2 className="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-1 mt-10">
          Public pastes
        </h2>

        <div className="text-left">
          {publicPastes.length === 0 && (
            <p className="text-gray-400 mt-5 text-center font-bold">No public pastes can be found.</p>
          )}
          {publicPastes.map((values, index) => {
            return (
              <Link href={`/${values.public_id}`} key={index}>
                <a className="my-5 border-gray-400 border rounded-lg py-2 px-3 grid grid-cols-3 md:gap-4 md:grid-cols-4 gap-1 text-left md:text-right">
                  <span className="overflow-scroll col-span-3 text-left dark:text-gray-300">
                    {values.content.length > 50 ? values.content.substring(0, 50 - 3) + '...' : values.content}
                  </span>
                  <span className="text-gray-400 col-span-3 md:col-auto">
                    {formatDistance(values.created_at, new Date(), { addSuffix: true })}
                  </span>
                </a>
              </Link>
            );
          })}
        </div>

        <Footer />
      </div>
    </>
  );
}
