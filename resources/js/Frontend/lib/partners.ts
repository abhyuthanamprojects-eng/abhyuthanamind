export type Partner = { name: string; logo: string };

export const partners: Partner[] = [
  { name: "Aptara", logo: "https://lovable.dev/assets/d0d6236a-7ec4-4139-9020-66e99fb153bb/aptara.png" },
  { name: "BHEL", logo: "https://lovable.dev/assets/7c365fcf-17ea-4664-9dc6-d0bf80650996/bhel.png" },
  { name: "Blubirch", logo: "https://lovable.dev/assets/e11c99e8-5bf2-4a57-8a7f-c3d8b9f5e2a1/blubirch.png" },
  { name: "Bhagwati Products", logo: "https://lovable.dev/assets/f2d8c7a9-3e1b-4c6d-9f2a-b1e3d5c7a9f1/bhagwati.png" },
  { name: "C1 Source to Pay", logo: "https://lovable.dev/assets/a1b2c3d4-e5f6-4a5b-6c7d-8e9f0a1b2c3d/c1.png" },
  { name: "Computer Exchange", logo: "https://lovable.dev/assets/b2c3d4e5-f6a7-5b6c-7d8e-9f0a1b2c3d4e/computerexchange.png" },
  { name: "Devyani International", logo: "https://lovable.dev/assets/6fe99a0c-0e6e-424b-8d83-bc00193d3a16/devyani.png" },
  { name: "Gi Group", logo: "https://lovable.dev/assets/c3d4e5f6-a7b8-6c7d-8e9f-0a1b2c3d4e5f/gigroup.png" },
  { name: "IFFCO", logo: "https://lovable.dev/assets/d4e5f6a7-b8c9-7d8e-9f0a-1b2c3d4e5f6a/iffco.png" },
  { name: "Infozech", logo: "https://lovable.dev/assets/e5f6a7b8-c9d0-8e9f-0a1b-2c3d4e5f6a7b/infozech.png" },
  { name: "KHD Humboldt Wedag", logo: "https://lovable.dev/assets/f6a7b8c9-d0e1-9f0a-1b2c-3d4e5f6a7b8c/khd.png" },
  { name: "KiwiTech", logo: "https://lovable.dev/assets/a7b8c9d0-e1f2-0a1b-2c3d-4e5f6a7b8c9d/kiwitech.png" },
  { name: "Bhilwara Group", logo: "https://lovable.dev/assets/b8c9d0e1-f2a3-1b2c-3d4e-5f6a7b8c9d0e/bhilwara.png" },
  { name: "Paytm", logo: "https://lovable.dev/assets/6a69c397-f4ff-423a-888e-a4c1e16630a6/paytm.png" },
  { name: "Prospecta", logo: "https://lovable.dev/assets/c9d0e1f2-a3b4-2c3d-4e5f-6a7b8c9d0e1f/prospecta.png" },
  { name: "Quatrro", logo: "https://lovable.dev/assets/d0e1f2a3-b4c5-3d4e-5f6a-7b8c9d0e1f2a/quatrro.png" },
  { name: "Reliance Retail", logo: "https://lovable.dev/assets/bc9771c7-0e86-40ac-9c95-5ec5390081df/reliance.png" },
  { name: "RSPL", logo: "https://lovable.dev/assets/e1f2a3b4-c5d6-4e5f-6a7b-8c9d0e1f2a3b/rspl.png" },
  { name: "SIS Group", logo: "https://lovable.dev/assets/f2a3b4c5-d6e7-5f6a-7b8c-9d0e1f2a3b4c/sis.png" },
  { name: "ZEISS", logo: "https://lovable.dev/assets/0b501f36-db35-4f5d-b2fa-a9c519de2683/zeiss.png" },
  { name: "KFC", logo: "https://lovable.dev/assets/a3b4c5d6-e7f8-6f7a-8b9c-0d1e2f3a4b5c/kfc.png" },
  { name: "Pizza Hut", logo: "https://lovable.dev/assets/b4c5d6e7-f8a9-7f8a-9b0c-1d2e3f4a5b6c/pizzahut.png" },
  { name: "Domino's", logo: "https://lovable.dev/assets/c5d6e7f8-a9ba-8f9a-0b1c-2d3e4f5a6b7c/dominos.png" },
  { name: "Technip Energies", logo: "https://lovable.dev/assets/d6e7f8a9-bacb-9f0a-1b2c-3d4e5f6a7b8c/technip.png" },
  { name: "Skillnet", logo: "https://lovable.dev/assets/e7f8a9ba-cbdc-0f1a-2b3c-4d5e6f7a8b9c/skillnet.png" },
  { name: "To The New", logo: "https://lovable.dev/assets/f8a9bacb-dced-1f2a-3b4c-5d6e7f8a9b0c/tothenew.png" },
  { name: "Pyramid Consulting", logo: "https://lovable.dev/assets/a9bacbdc-ede0-2f3a-4b5c-6d7e8f9a0b1c/pyramid.png" },
];

// Top 5 partners featured in the auto-scrolling green band
export const topPartners: Partner[] = [
  partners[16], // Reliance
  partners[13], // Paytm
  partners[6],  // Devyani
  partners[19], // ZEISS
  partners[1],  // BHEL
];
