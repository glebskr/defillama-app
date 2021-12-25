import Head from 'next/head'
import { useMemo } from 'react'
import { chainIconUrl, tokenIconUrl } from 'utils'

interface SEOProps {
  cardName?: string
  chain?: string
  token?: string
  tvl?: string
  volumeChange?: string
  logo?: string
  nftPage?: boolean
}

const SEO = ({ cardName, chain, token, tvl, volumeChange, logo, nftPage = false }: SEOProps) => {
  const windowURL = typeof window !== 'undefined' && window.location.href ? window.location.href : ''

  const cardURL = useMemo(() => {
    let cardSrc = new URL(`https://og-llama.vercel.app/`)

    // If text is default, the image will only have the logo in the center, without any tvl numbers, chain or token name etc
    let text: string = cardName ? (cardName === 'All' ? 'Overall' : cardName) : 'default'

    cardSrc.pathname = `${encodeURIComponent(text)}.png`

    cardSrc.searchParams.append('theme', 'dark')

    tvl && cardSrc.searchParams.append('tvl', tvl)

    volumeChange && cardSrc.searchParams.append('volumeChange', volumeChange)

    cardSrc.searchParams.append('footerURL', encodeURIComponent(windowURL))

    // First url in images should always be the logo of defillama
    let images = nftPage
      ? [`https://raw.githubusercontent.com/DefiLlama/defillama-press-kit/master/SVG/defillama-nft.svg`]
      : [`https://raw.githubusercontent.com/DefiLlama/defillama-press-kit/master/SVG/defillama.svg`]

    // chain and token props are used to get logo, if the logo url isn't available in the data of that page
    if (logo) {
      images = [...images, logo]
    } else if (chain && chain !== 'All') {
      images = [...images, `https://defillama.com${chainIconUrl(chain)}`]
    } else {
      if (token && token !== 'All') {
        images = [...images, `https://defillama.com${tokenIconUrl(token)}`]
      }
    }

    for (let image of images) {
      cardSrc.searchParams.append('images', image)
    }

    return cardSrc.toString()
  }, [cardName, chain, token, tvl, volumeChange, logo, nftPage, windowURL])

  return (
    <Head>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@DefiLlama" />
      <meta property="og:site_name" content="DefiLlama" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="DefiLlama" />
      <meta property="og:url" content={windowURL} />
      <meta
        name="description"
        content="DefiLlama is a DeFi TVL aggregator. It is committed to providing accurate data without ads or sponsored content, as well as transparency."
      />
      <meta
        property="og:description"
        content="DefiLlama is a DeFi TVL aggregator. It is committed to providing accurate data without ads or sponsored content, as well as transparency."
      />
      <meta property="og:image" content={cardURL} />
    </Head>
  )
}

export default SEO
