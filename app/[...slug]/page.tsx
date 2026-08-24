import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Storefront from '../storefront';
import {SITE_NAME,SITE_URL} from '../site';

type PageSeo={view:string;title:string;description:string;index?:boolean};
type ArticleSeo=PageSeo&{datePublished:string;image:string;section:string};

const routeMetadata:Record<string,PageSeo>={
 'shop':{view:'shop',title:'Shop Jewelry Online Philippines | Ursula',description:'Shop sculptural rings, earrings, necklaces, and bracelets in recycled silver, gold vermeil, and 14k gold, with insured delivery across the Philippines.'},
 'new':{view:'new',title:'New Jewelry Arrivals Philippines | Ursula',description:'Discover Ursula’s newest sculptural jewelry, from recycled-silver rings to gold-vermeil earrings and necklaces, made in small batches and delivered nationwide.'},
 'rings':{view:'rings',title:'Sculptural Rings Philippines | Ursula Jewelry',description:'Shop sculptural rings in recycled sterling silver, 18k gold vermeil, and solid 14k gold, with considered sizing and insured Philippine delivery.'},
 'earrings':{view:'earrings',title:'Sculptural Earrings Philippines | Ursula Jewelry',description:'Explore lightweight hoops, studs, and sculptural drop earrings in recycled silver, gold vermeil, and solid gold, delivered throughout the Philippines.'},
 'necklaces':{view:'necklaces',title:'Sculptural Necklaces Philippines | Ursula',description:'Discover sculptural pendants, chains, and collars in recycled silver and gold vermeil, thoughtfully made and securely delivered across the Philippines.'},
 'bracelets':{view:'bracelets',title:'Sculptural Bracelets Philippines | Ursula',description:'Shop sculptural cuffs and chain bracelets in recycled silver, gold vermeil, pearls, and considered stones, with insured delivery across the Philippines.'},
 'collections':{view:'collections',title:'Jewelry Collections Philippines | Ursula',description:'Explore Ursula jewelry collections shaped in Manila, featuring sculptural forms, hand-finished surfaces, responsible materials, and nationwide delivery.'},
 'collections/impression':{view:'impression',title:'The Impression Jewelry Collection | Ursula',description:'Discover the Impression Collection, a study in softness, pressure, and permanence expressed through sculptural rings, earrings, necklaces, and bracelets.'},
 'fine-jewelry':{view:'fine-jewelry',title:'Fine Jewelry Philippines | Ursula Jewelry',description:'Explore Ursula fine jewelry in solid 14k gold and lab-grown diamonds, designed with low-profile settings for meaningful, comfortable everyday wear.'},
 'gift-cards':{view:'gift-cards',title:'Jewelry Gift Cards Philippines | Ursula',description:'Give an Ursula jewelry gift card for birthdays, anniversaries, milestones, or considered everyday gestures, with personal guidance available nationwide.'},
 'story':{view:'story',title:'About Ursula Jewelry | Designed in Manila',description:'Meet Ursula, an independent Manila jewelry studio creating intimate, gender-inclusive objects through sculptural form, patient finishing, and responsible materials.'},
 'craftsmanship':{view:'craftsmanship',title:'Jewelry Craftsmanship in Manila | Ursula',description:'See how Ursula jewelry moves through specialist hands, from carving and casting to stone setting, polishing, hand finishing, and careful quality inspection.'},
 'materials':{view:'materials',title:'Responsible Jewelry Materials | Ursula',description:'Learn about Ursula’s recycled precious metals, gold vermeil, solid 14k gold, lab-grown diamonds, considered stones, and practical care recommendations.'},
 'journal':{view:'journal',title:'Jewelry Journal Philippines | Ursula',description:'Read practical Philippine jewelry guides on personal style, thoughtful gifting, precious materials, layering, silver care, and the rituals of everyday wear.'},
 'appointments':{view:'appointments',title:'Virtual Jewelry Styling Philippines | Ursula',description:'Book a complimentary virtual styling session with Ursula for ring sizing, jewelry layering, meaningful gifts, personal recommendations, and product guidance.'},
 'personalization':{view:'personalization',title:'Personalized Jewelry Philippines | Ursula',description:'Personalize selected Ursula jewelry with initials, meaningful dates, private words, or considered stones, with a digital preview before production begins.'},
 'care':{view:'care',title:'Jewelry Care Guide for the Philippines | Ursula',description:'Learn how to care for silver, gold vermeil, solid gold, pearls, and gemstones in the Philippines’ warm, humid climate and preserve each piece for years.'},
 'repairs':{view:'repairs',title:'Jewelry Repairs and Warranty | Ursula Philippines',description:'Request an Ursula jewelry repair, photo assessment, or warranty review, with transparent quotations and secure nationwide return arrangements.'},
 'shipping':{view:'shipping',title:'Jewelry Shipping and Returns Philippines | Ursula',description:'Review Ursula’s insured Philippine delivery times, complimentary shipping threshold, tracking, return window, and guidance for provincial addresses.'},
 'faq':{view:'faq',title:'Jewelry FAQ Philippines | Ursula',description:'Find clear answers about Ursula jewelry sizing, materials, hypoallergenic wear, personalization, Philippine delivery, returns, repairs, and warranty coverage.'},
 'contact':{view:'contact',title:'Contact Ursula Jewelry Philippines',description:'Contact Ursula client care for product advice, ring sizing, gifts, orders, Philippine delivery, returns, repairs, appointments, or personalization guidance.'},
 'wishlist':{view:'wishlist',title:'Saved Jewelry | Ursula',description:'Review jewelry saved on this device.',index:false},
 'search':{view:'search',title:'Search Ursula Jewelry',description:'Search Ursula jewelry and client services.',index:false},
 'account':{view:'account',title:'Your Ursula Account',description:'Access Ursula order tracking and saved details.',index:false},
 'account/sign-in':{view:'sign-in',title:'Sign In to Ursula',description:'Sign in to your Ursula account.',index:false},
 'checkout':{view:'checkout',title:'Secure Checkout | Ursula',description:'Complete your Ursula jewelry order securely.',index:false}
};

const journalMetadata:Record<string,ArticleSeo>={
 'journal/imperfect-stack':{view:'imperfect-stack',title:'How to Layer Jewelry: The Imperfect Stack | Ursula',description:'Learn how to layer necklaces, rings, metals, and textures into a comfortable jewelry stack that feels collected, balanced, and personal.',datePublished:'2026-08-18',image:'/products/necklace-04.jpg',section:'Style notes'},
 'journal/silver-after-dark':{view:'silver-after-dark',title:'How to Style and Care for Silver Jewelry | Ursula',description:'Learn how to style silver jewelry after dark and protect its finish from humidity, fragrance, perspiration, and tarnish in the Philippines.',datePublished:'2026-08-11',image:'/products/necklace-03.jpg',section:'Material stories'},
 'journal/gift-with-language':{view:'gift-with-language',title:'How to Choose Jewelry as a Meaningful Gift | Ursula',description:'Choose a meaningful jewelry gift with practical guidance on personal style, sizing, materials, engraving, presentation, and everyday wear.',datePublished:'2026-08-04',image:'/products/ring-04.jpg',section:'Gift guide'}
};

function resolvePage(slug:string[]){const path=slug.join('/');const page=journalMetadata[path]||routeMetadata[path];if(!page)notFound();return {path,page};}

export async function generateMetadata({params}:{params:Promise<{slug:string[]}>}):Promise<Metadata>{
 const {slug}=await params;
 const {path,page}=resolvePage(slug);
 const url=SITE_URL+'/'+path;
 const article='datePublished' in page?page as ArticleSeo:null;
 const image=article?.image||'/og.png';
 return {title:{absolute:page.title},description:page.description,alternates:{canonical:url},robots:page.index===false?{index:false,follow:false,noarchive:true}:{index:true,follow:true},openGraph:{title:page.title,description:page.description,url,type:article?'article':'website',siteName:SITE_NAME,locale:'en_PH',images:[image]},twitter:{card:'summary_large_image',title:page.title,description:page.description,images:[image]}};
}

export default async function Route({params}:{params:Promise<{slug:string[]}>}){
 const {slug}=await params;
 const {path,page}=resolvePage(slug);
 const article='datePublished' in page?page as ArticleSeo:null;
 if(!article)return <Storefront view={page.view}/>;
 const url=SITE_URL+'/'+path;
 const data={'@context':'https://schema.org','@graph':[{'@type':'BlogPosting','@id':url+'#article',headline:article.title,description:article.description,datePublished:article.datePublished,dateModified:article.datePublished,articleSection:article.section,image:SITE_URL+article.image,mainEntityOfPage:url,inLanguage:'en-PH',author:{'@type':'Organization',name:'Ursula Studio',url:SITE_URL+'/'},publisher:{'@type':'Organization',name:SITE_NAME,url:SITE_URL+'/' }},{'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:SITE_URL+'/'},{'@type':'ListItem',position:2,name:'Journal',item:SITE_URL+'/journal'},{'@type':'ListItem',position:3,name:article.title,item:url}]}]};
 return <><Storefront view={page.view}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data)}}/></>;
}
