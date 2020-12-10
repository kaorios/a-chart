import Head from 'next/head'

export const siteTitle = 'A chart'
export const description = 'かんたんに円グラフを作るウェブサービス'

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content={description}
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
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
