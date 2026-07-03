import aptara from "@/Frontend/assets/partners/aptara.png.asset.json";
import bhel from "@/Frontend/assets/partners/bhel.png.asset.json";
import blubirch from "@/Frontend/assets/partners/blubirch.png.asset.json";
import bhagwati from "@/Frontend/assets/partners/bhagwati.png.asset.json";
import c1 from "@/Frontend/assets/partners/c1.png.asset.json";
import computerexchange from "@/Frontend/assets/partners/computerexchange.png.asset.json";
import devyani from "@/Frontend/assets/partners/devyani.png.asset.json";
import gigroup from "@/Frontend/assets/partners/gigroup.png.asset.json";
import iffco from "@/Frontend/assets/partners/iffco.png.asset.json";
import infozech from "@/Frontend/assets/partners/infozech.png.asset.json";
import khd from "@/Frontend/assets/partners/khd.png.asset.json";
import kiwitech from "@/Frontend/assets/partners/kiwitech.png.asset.json";
import bhilwara from "@/Frontend/assets/partners/bhilwara.png.asset.json";
import paytm from "@/Frontend/assets/partners/paytm.png.asset.json";
import prospecta from "@/Frontend/assets/partners/prospecta.png.asset.json";
import quatrro from "@/Frontend/assets/partners/quatrro.png.asset.json";
import reliance from "@/Frontend/assets/partners/reliance.png.asset.json";
import rspl from "@/Frontend/assets/partners/rspl.png.asset.json";
import sis from "@/Frontend/assets/partners/sis.png.asset.json";
import zeiss from "@/Frontend/assets/partners/zeiss.png.asset.json";
import kfc from "@/Frontend/assets/partners/kfc.png.asset.json";
import pizzahut from "@/Frontend/assets/partners/pizzahut.png.asset.json";
import dominos from "@/Frontend/assets/partners/dominos.png.asset.json";
import technip from "@/Frontend/assets/partners/technip.png.asset.json";
import skillnet from "@/Frontend/assets/partners/skillnet.png.asset.json";
import tothenew from "@/Frontend/assets/partners/tothenew.png.asset.json";
import pyramid from "@/Frontend/assets/partners/pyramid.png.asset.json";

export type Partner = { name: string; logo: string };

export const partners: Partner[] = [
  { name: "Aptara", logo: aptara.url },
  { name: "BHEL", logo: bhel.url },
  { name: "Blubirch", logo: blubirch.url },
  { name: "Bhagwati Products", logo: bhagwati.url },
  { name: "C1 Source to Pay", logo: c1.url },
  { name: "Computer Exchange", logo: computerexchange.url },
  { name: "Devyani International", logo: devyani.url },
  { name: "Gi Group", logo: gigroup.url },
  { name: "IFFCO", logo: iffco.url },
  { name: "Infozech", logo: infozech.url },
  { name: "KHD Humboldt Wedag", logo: khd.url },
  { name: "KiwiTech", logo: kiwitech.url },
  { name: "Bhilwara Group", logo: bhilwara.url },
  { name: "Paytm", logo: paytm.url },
  { name: "Prospecta", logo: prospecta.url },
  { name: "Quatrro", logo: quatrro.url },
  { name: "Reliance Retail", logo: reliance.url },
  { name: "RSPL", logo: rspl.url },
  { name: "SIS Group", logo: sis.url },
  { name: "ZEISS", logo: zeiss.url },
  { name: "KFC", logo: kfc.url },
  { name: "Pizza Hut", logo: pizzahut.url },
  { name: "Domino's", logo: dominos.url },
  { name: "Technip Energies", logo: technip.url },
  { name: "Skillnet", logo: skillnet.url },
  { name: "To The New", logo: tothenew.url },
  { name: "Pyramid Consulting", logo: pyramid.url },
];

// Top 5 partners featured in the auto-scrolling green band
export const topPartners: Partner[] = [
  partners[16], // Reliance
  partners[13], // Paytm
  partners[6],  // Devyani
  partners[19], // ZEISS
  partners[1],  // BHEL
];
