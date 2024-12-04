import { useAds } from '~/contexts/AdContext'

type AdProps = {
  zoneId?: string
  width?: string | number
  height?: number | string
}

const AdmodAdsBaner = ({ zoneId = '3', width = '100%', height = 'auto' }: AdProps) => {
  const { isAdLoaded } = useAds()

  return (
    <div className='ad-container' style={{ width, height }}>
      {isAdLoaded && (
        <ins
          data-revive-zoneid={zoneId}
          data-revive-id='e7712942583e9a85ea37ea67d219291c'
          data-revive-seq='1'
          style={{
            textDecoration: 'none',
            width,
            height,
            display: 'inline-block'
          }}
        >
          <a
            href='https://ads.intergreat.com/www/delivery/cl.php?bannerid=168&zoneid=3&sig=c674f0240c51b8533ca9f77a2c35bcd9c608c8be8e509eb1e3b917240f19ce9b&oadest=https%3A%2F%2Fieltsonlinetests.com%2Flive-lessons%2Ftrien-lam-du-hoc-truc-tuyen-lon-nhat-toan-quoc-2025%3Futm_source%3Dwebsiteiot%26utm_medium%3Dbanner300-600%26utm_campaign%3Dfair230224%26utm_term%3Dduhoc%26utm_content%3Dgt_031224_trang.h'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='https://ads.intergreat.com/www/images/607d8b549cd38ec691a23d25b6857102.png'
              width={typeof width === 'number' ? width : 300}
              height={typeof height === 'number' ? height : 600}
              alt=''
              title=''
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </a>
          <div id='beacon_25363017ee' style={{ position: 'absolute', left: 0, top: 0, visibility: 'hidden' }}>
            <img
              src='https://ads.intergreat.com/www/delivery/lg.php?bannerid=168&campaignid=81&zoneid=3&loc=https%3A%2F%2Fieltsonlinetests.com%2F&referer=https%3A%2F%2Fieltsonlinetests.com%2F&cb=25363017ee'
              width='0'
              height='0'
              alt=''
              style={{ width: 0, height: 0 }}
            />
          </div>
        </ins>
      )}
    </div>
  )
}
export default AdmodAdsBaner
