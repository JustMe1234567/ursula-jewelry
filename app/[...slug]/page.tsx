import type {Metadata} from 'next';
import Storefront from '../storefront';

const journalMetadata:Record<string,{title:string;description:string}>={
 'imperfect-stack':{title:'How to Layer Jewelry: The Imperfect Stack | Ursula Journal',description:'Learn how to layer necklaces, rings, metals, and textures into a comfortable jewelry stack that feels personal rather than over-styled.'},
 'silver-after-dark':{title:'How to Style and Care for Silver Jewelry | Ursula Journal',description:'A practical guide to styling silver jewelry after dark and caring for it in the warm, humid climate of the Philippines.'},
 'gift-with-language':{title:'How to Choose Jewelry as a Meaningful Gift | Ursula Journal',description:'Choose jewelry gifts with confidence using practical guidance on personal style, sizing, materials, engraving, and presentation.'}
};

export async function generateMetadata({params}:{params:Promise<{slug:string[]}>}):Promise<Metadata>{
 const {slug}=await params;
 const view=slug[slug.length-1];
 const article=journalMetadata[view];
 if(article)return {title:article.title,description:article.description,openGraph:{title:article.title,description:article.description,type:'article'},twitter:{card:'summary',title:article.title,description:article.description}};
 const name=slug.map(x=>x.replaceAll('-',' ')).join(' · ');
 const title=`${name.replace(/\b\w/g,c=>c.toUpperCase())} | Ursula Jewelry Philippines`;
 return {title,description:`Explore ${name} from Ursula: sculptural, gender-inclusive jewelry and thoughtful client services with nationwide delivery in the Philippines.`,openGraph:{title,description:'Jewelry shaped by instinct. Designed in Manila, delivered nationwide.',type:'website'},twitter:{card:'summary_large_image',title,description:'Sculptural jewelry, thoughtfully made.'}};
}
export default async function Route({params}:{params:Promise<{slug:string[]}>}){const {slug}=await params;return <Storefront view={slug[slug.length-1]}/>}
