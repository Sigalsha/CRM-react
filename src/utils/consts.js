export const clientsHeaders = {
  name: "name",
  sureName: "name",
  country: "country",
  firstContact: "firstContact",
  emailType: "emailType",
  sold: "sold",
  owner: "owner",
};

export const emailTypes = ["A", "B", "C", "D", "No Type"];

export const isSold = ["Sold", "Not sold"];

export const badges = [
  {
    id: 1,
    name: "newClients",
    icon: "faUsers",
    header: "New Clients",
    description: "new clients joined this month",
  },
  {
    id: 2,
    name: "emailsSent",
    icon: "faEnvelope",
    header: "Emails Sent",
    description: "",
  },
  {
    id: 3,
    name: "targetClients",
    icon: "faUserPlus",
    header: "Target Clients",
    description: "clients without acquisition",
  },
  {
    id: 4,
    name: "hottestCountry",
    icon: "faGlobeAmericas",
    header: "Hottest Country",
    description: "",
  },
];
