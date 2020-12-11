import Head from 'next/head'

export const siteTitle = 'A chart - Easily create a chart'
export const description = 'かんたんに無料で円グラフを作成できるウェブサービス。グラフメーカー。項目と値を入力するだけで、自動で円グラフが作成されます。'

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://a-chart.vercel.app/ogp.png" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header>
        <div>
          <nav className="border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-12">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="text-sm font-black uppercase">A Chart</div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {children}
          </div>
        </div>
      </main>
      <footer className="border-t mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-4 text-gray-500 text-sm">
          <span>A CHART is created by </span>
          <a href="https://twitter.com/kao_risan" rel="noopener" className="text-blue-500">Kaorisan</a>
          <span>.</span>
        </div>
      </footer>
    </div>
  )
}
