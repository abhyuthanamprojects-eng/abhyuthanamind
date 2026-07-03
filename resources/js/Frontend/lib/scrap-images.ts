import splitAc from "@/Frontend/assets/scrap/split-ac.jpg";
import windowAc from "@/Frontend/assets/scrap/window-ac.jpg";
import splitAc1Ton from "@/Frontend/assets/scrap/split-ac-1ton.jpg";
import ac2Ton from "@/Frontend/assets/scrap/ac-2ton.jpg";
import washingFront from "@/Frontend/assets/scrap/washing-machine-front.jpg";
import washingTop from "@/Frontend/assets/scrap/washing-machine-top.jpg";
import washingSemi from "@/Frontend/assets/scrap/washing-machine-semi.jpg";
import fridgeSingle from "@/Frontend/assets/scrap/fridge-single.jpg";
import fridgeDouble from "@/Frontend/assets/scrap/fridge-double.jpg";
import geyser from "@/Frontend/assets/scrap/geyser.jpg";
import roPurifier from "@/Frontend/assets/scrap/ro-purifier.jpg";
import laptop from "@/Frontend/assets/scrap/laptop.jpg";
import cpu from "@/Frontend/assets/scrap/cpu.jpg";
import crtMonitor from "@/Frontend/assets/scrap/crt-monitor.jpg";
import lcdMonitor from "@/Frontend/assets/scrap/lcd-monitor.jpg";
import ledMonitor from "@/Frontend/assets/scrap/led-monitor.jpg";
import androidPhone from "@/Frontend/assets/scrap/android-phone.jpg";
import keypadPhone from "@/Frontend/assets/scrap/keypad-phone.jpg";
import mobileCharger from "@/Frontend/assets/scrap/mobile-charger.jpg";
import laptopCharger from "@/Frontend/assets/scrap/laptop-charger.jpg";
import copper from "@/Frontend/assets/scrap/copper.jpg";
import aluminium from "@/Frontend/assets/scrap/aluminium.jpg";
import ironCooler from "@/Frontend/assets/scrap/iron-cooler.jpg";
import plasticCooler from "@/Frontend/assets/scrap/plastic-cooler.jpg";
import upsInverter from "@/Frontend/assets/scrap/ups-inverter.jpg";
import ledTv from "@/Frontend/assets/scrap/led-tv.jpg";
import ceilingFan from "@/Frontend/assets/scrap/ceiling-fan.jpg";
import exhaustFan from "@/Frontend/assets/scrap/exhaust-fan.jpg";
import ledBulb from "@/Frontend/assets/scrap/led-bulb.jpg";
import tubelight from "@/Frontend/assets/scrap/tubelight.jpg";
import desktopWorkstation from "@/Frontend/assets/scrap/desktop-workstation.jpg";
import printerScanner from "@/Frontend/assets/scrap/printer-scanner.jpg";
import serverRack from "@/Frontend/assets/scrap/server-rack.jpg";
import networkRouter from "@/Frontend/assets/scrap/network-router.jpg";
import upsBattery from "@/Frontend/assets/scrap/ups-battery.jpg";
import leadAcidBattery from "@/Frontend/assets/scrap/lead-acid-battery.jpg";
import lithiumBattery from "@/Frontend/assets/scrap/lithium-battery.jpg";
import copperCable from "@/Frontend/assets/scrap/copper-cable.jpg";
import mixedCables from "@/Frontend/assets/scrap/mixed-cables.jpg";
import mixedEwaste from "@/Frontend/assets/scrap/mixed-ewaste.jpg";
import plasticScrap from "@/Frontend/assets/scrap/plastic-scrap.jpg";
import pcb from "@/Frontend/assets/scrap/pcb.jpg";
import steelScrap from "@/Frontend/assets/scrap/steel-scrap.jpg";

const map: Record<string, string> = {
  "Split AC 1.5 Ton (Indoor + Outdoor)": splitAc,
  "Window AC 1.5 Ton": windowAc,
  "Split AC 1 Ton (Indoor + Outdoor)": splitAc1Ton,
  "AC 2 Ton (Copper Coil)": ac2Ton,
  "Front Load Washing Machine": washingFront,
  "Top Load Washing Machine": washingTop,
  "Semi Automatic Washing Machine": washingSemi,
  "Single Door Fridge": fridgeSingle,
  "Double Door Fridge": fridgeDouble,
  "Geyser": geyser,
  "RO Purifier": roPurifier,
  "Scrap Laptop": laptop,
  "Computer CPU": cpu,
  "CRT Monitor": crtMonitor,
  "LCD Monitor": lcdMonitor,
  "LED Monitor": ledMonitor,
  "Mobile Phone (Android)": androidPhone,
  "Mobile Phone (Keypad)": keypadPhone,
  "Mobile Charger": mobileCharger,
  "Laptop Charger": laptopCharger,
  "Copper": copper,
  "Aluminium": aluminium,
  "Iron Cooler": ironCooler,
  "Plastic Cooler": plasticCooler,
  "UPS / Inverter (Copper Coil)": upsInverter,
  "UPS / Inverter (Aluminium Coil)": upsInverter,
  "LED TV": ledTv,
  "LCD TV": ledTv,
  "Ceiling Fan (Copper winding)": ceilingFan,
  "Ceiling Fan (Aluminium winding)": ceilingFan,
  "Exhaust Fan": exhaustFan,
  "LED Bulb": ledBulb,
  "Tubelight": tubelight,
  "Desktop Workstation": desktopWorkstation,
  "Printer / Scanner": printerScanner,
  "Server (Rack Unit)": serverRack,
  "Network Switch / Router": networkRouter,
  "UPS Battery Backup": upsBattery,
  "Lead Acid Battery": leadAcidBattery,
  "Lithium-ion Battery Pack": lithiumBattery,
  "Copper Cable / Wiring": copperCable,
  "Mixed Cables": mixedCables,
  "Mixed E-Waste": mixedEwaste,
  "Plastic Scrap": plasticScrap,
  "PCB / Circuit Boards": pcb,
  "Steel Scrap": steelScrap,
};

export const scrapFallbackImage = mixedEwaste;
export function scrapItemImage(name: string): string | undefined {
  return map[name];
}
