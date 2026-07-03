import aptara from "@/Frontend/assets/partners/aptara.png";
import bhel from "@/Frontend/assets/partners/bhel.png";
import blubirch from "@/Frontend/assets/partners/blubirch.png";
import bhagwati from "@/Frontend/assets/partners/bhagwati.png";
import c1 from "@/Frontend/assets/partners/c1.png";
import computerexchange from "@/Frontend/assets/partners/computerexchange.png";
import devyani from "@/Frontend/assets/partners/devyani.png";
import gigroup from "@/Frontend/assets/partners/gigroup.png";
import iffco from "@/Frontend/assets/partners/iffco.png";
import infozech from "@/Frontend/assets/partners/infozech.png";
import khd from "@/Frontend/assets/partners/khd.png";
import kiwitech from "@/Frontend/assets/partners/kiwitech.png";
import bhilwara from "@/Frontend/assets/partners/bhilwara.png";
import paytm from "@/Frontend/assets/partners/paytm.png";
import prospecta from "@/Frontend/assets/partners/prospecta.png";
import quatrro from "@/Frontend/assets/partners/quatrro.png";
import reliance from "@/Frontend/assets/partners/reliance.png";
import rspl from "@/Frontend/assets/partners/rspl.png";
import sis from "@/Frontend/assets/partners/sis.png";
import zeiss from "@/Frontend/assets/partners/zeiss.png";
import kfc from "@/Frontend/assets/partners/kfc.png";
import pizzahut from "@/Frontend/assets/partners/pizzahut.png";
import dominos from "@/Frontend/assets/partners/dominos.png";
import technip from "@/Frontend/assets/partners/technip.png";
import skillnet from "@/Frontend/assets/partners/skillnet.png";
import tothenew from "@/Frontend/assets/partners/tothenew.png";
import pyramid from "@/Frontend/assets/partners/pyramid.png";

export type Partner = { name: string; logo: string };

export const partners: Partner[] = [
  { name: "Aptara", logo: aptara },
  { name: "BHEL", logo: bhel },
  { name: "Blubirch", logo: blubirch },
  { name: "Bhagwati Products", logo: bhagwati },
  { name: "C1 Source to Pay", logo: c1 },
  { name: "Computer Exchange", logo: computerexchange },
  { name: "Devyani International", logo: devyani },
  { name: "Gi Group", logo: gigroup },
  { name: "IFFCO", logo: iffco },
  { name: "Infozech", logo: infozech },
  { name: "KHD Humboldt Wedag", logo: khd },
  { name: "KiwiTech", logo: kiwitech },
  { name: "Bhilwara Group", logo: bhilwara },
  { name: "Paytm", logo: paytm },
  { name: "Prospecta", logo: prospecta },
  { name: "Quatrro", logo: quatrro },
  { name: "Reliance Retail", logo: reliance },
  { name: "RSPL", logo: rspl },
  { name: "SIS Group", logo: sis },
  { name: "ZEISS", logo: zeiss },
  { name: "KFC", logo: kfc },
  { name: "Pizza Hut", logo: pizzahut },
  { name: "Domino's", logo: dominos },
  { name: "Technip Energies", logo: technip },
  { name: "Skillnet", logo: skillnet },
  { name: "To The New", logo: tothenew },
  { name: "Pyramid Consulting", logo: pyramid },
];

// Top 5 partners featured in the auto-scrolling green band
export const topPartners: Partner[] = [
  partners[16], // Reliance
  partners[13], // Paytm
  partners[6],  // Devyani
  partners[19], // ZEISS
  partners[1],  // BHEL
];
