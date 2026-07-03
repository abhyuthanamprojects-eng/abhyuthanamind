export type Partner = { name: string; logo: string };

export const partners: Partner[] = [
  { name: "Aptara", logo: "/partners/aptara.png" },
  { name: "BHEL", logo: "/partners/bhel.png" },
  { name: "Blubirch", logo: "/partners/blubirch.png" },
  { name: "Bhagwati Products", logo: "/partners/bhagwati.png" },
  { name: "C1 Source to Pay", logo: "/partners/c1.png" },
  { name: "Computer Exchange", logo: "/partners/computerexchange.png" },
  { name: "Devyani International", logo: "/partners/devyani.png" },
  { name: "Gi Group", logo: "/partners/gigroup.png" },
  { name: "IFFCO", logo: "/partners/iffco.png" },
  { name: "Infozech", logo: "/partners/infozech.png" },
  { name: "KHD Humboldt Wedag", logo: "/partners/khd.png" },
  { name: "KiwiTech", logo: "/partners/kiwitech.png" },
  { name: "Bhilwara Group", logo: "/partners/bhilwara.png" },
  { name: "Paytm", logo: "/partners/paytm.png" },
  { name: "Prospecta", logo: "/partners/prospecta.png" },
  { name: "Quatrro", logo: "/partners/quatrro.png" },
  { name: "Reliance Retail", logo: "/partners/reliance.png" },
  { name: "RSPL", logo: "/partners/rspl.png" },
  { name: "SIS Group", logo: "/partners/sis.png" },
  { name: "ZEISS", logo: "/partners/zeiss.png" },
  { name: "KFC", logo: "/partners/kfc.png" },
  { name: "Pizza Hut", logo: "/partners/pizzahut.png" },
  { name: "Domino's", logo: "/partners/dominos.png" },
  { name: "Technip Energies", logo: "/partners/technip.png" },
  { name: "Skillnet", logo: "/partners/skillnet.png" },
  { name: "To The New", logo: "/partners/tothenew.png" },
  { name: "Pyramid Consulting", logo: "/partners/pyramid.png" },
];

// Top 5 partners featured in the auto-scrolling green band
export const topPartners: Partner[] = [
  partners[16], // Reliance
  partners[13], // Paytm
  partners[6],  // Devyani
  partners[19], // ZEISS
  partners[1],  // BHEL
];
