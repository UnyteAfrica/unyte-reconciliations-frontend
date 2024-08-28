import { PageContent } from "@/components/shared/page-content";
import { DevicesTable } from "@/components/tables/devices-table";
import { DeviceTableEntry } from "@/types/types";

const deviceTableEntries: DeviceTableEntry[] = [
  {
    policyNo: "123jkf5402",
    policyType: "Screen Only",
    device: {
      name: "Galaxy S22",
      model: "Samsung",
      imei: "1029347349267642752",
    },
  },
  {
    policyNo: "123jkf5402",
    policyType: "Screen Only",
    device: {
      name: "iPhone 15",
      model: "iPhone",
      imei: "1029347349267642752",
    },
  },
  {
    policyNo: "123jkf5402",
    policyType: "Screen and Camera",
    device: {
      name: "Galaxy S22",
      model: "Samsung",
      imei: "1029347349267642752",
    },
  },
  {
    policyNo: "123jkf5402",
    policyType: "Screen Only",
    device: {
      name: "Galaxy S22",
      model: "Samsung",
      imei: "1029347349267642752",
    },
  },
  {
    policyNo: "123jkf5402",
    policyType: "All Parts",
    device: {
      name: "Phantom 6",
      model: "Tecno",
      imei: "1029347349267642752",
    },
  },
  {
    policyNo: "123jkf5402",
    policyType: "Screen Only",
    device: {
      name: "iPhone SE",
      model: "iPhone",
      imei: "1029347349267642752",
    },
  },
  {
    policyNo: "123jkf5402",
    policyType: "All Parts",
    device: {
      name: "Galaxy S22",
      model: "Samsung",
      imei: "1029347349267642752",
    },
  },
  {
    policyNo: "123jkf5402",
    policyType: "Screen Only",
    device: {
      name: "Galaxy S24 Ultra",
      model: "Samsung",
      imei: "1029347349267642752",
    },
  },
  {
    policyNo: "123jkf5402",
    policyType: "All Parts",
    device: {
      name: "Pixel 8 Pro",
      model: "Google Pixel",
      imei: "1029347349267642752",
    },
  },
  {
    policyNo: "123jkf5402",
    policyType: "Screen Only",
    device: {
      name: "Pixel 8a",
      model: "Google Pixel",
      imei: "1029347349267642752",
    },
  },
];

export const Devices = () => {
  return (
    <PageContent
      title="Devices"
      pageTable={<DevicesTable deviceTableEntries={deviceTableEntries} />}
    />
  );
};
