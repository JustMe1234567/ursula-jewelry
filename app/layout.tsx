import type {Metadata,Viewport} from 'next';
import './globals.css';
import './redesign.css';
import './catalog-hero.css';
import {SITE_DESCRIPTION,SITE_NAME,SITE_URL,SOCIAL_IMAGE} from './site';
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#151719'};
export const metadata:Metadata={metadataBase:new URL(SITE_URL),applicationName:SITE_NAME,title:{default:'Ursula Jewelry Philippines | Sculptural Jewelry',template:'%s | Ursula Jewelry'},description:SITE_DESCRIPTION,keywords:['jewelry Philippines','demi-fine jewelry Philippines','rings Philippines','gold vermeil jewelry','recycled silver jewelry','gender inclusive jewelry','Manila jewelry'],alternates:{canonical:SITE_URL+'/'},openGraph:{type:'website',url:SITE_URL+'/',locale:'en_PH',siteName:SITE_NAME,title:'Ursula Jewelry Philippines | Jewelry Shaped by Instinct',description:SITE_DESCRIPTION,images:[SOCIAL_IMAGE]},twitter:{card:'summary_large_image',title:'Ursula Jewelry Philippines',description:SITE_DESCRIPTION,images:['/og.png']},robots:{index:true,follow:true},icons:{icon:[{url:'/favicon.svg',type:'image/svg+xml'}],shortcut:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-PH"><body>{children}</body></html>}
