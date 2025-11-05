export const sideBarMenuItems = [
  { name: "Dashboard", image: "/images/dashboard.svg", link: "/admin" },
  {
    name: "Users & Partners",
    image: "/images/agent_management.svg",
    subItems: [
      {
        name: "Add Agent",
        image: "/images/add-user-svgrepo-com.svg",
        link: "/addagent",
      },
      { name: "Add Class", image: "", link: "/addclass" },
      { name: "Agent List", image: "", link: "/agentlist" },
      { name: "Agent Class List", image: "", link: "/classlist" },
      { name: "Agent Deposit Request List", image: "", link: "/depreqlist" },
    ],
  },
  {
    name: "Inventory Hub",
    image: "/images/airport_management.svg",
    link: "/admin",
    subItems: [
      { name: "Flight Booking List", image: "", link: "/flightbookinglist" },
      { name: "Add B2C Flight Markup", image: "", link: "/addb2cflightmarkup" },
    ],
  },
  {
    name: "Integrations",
    image: "/images/api_management.svg",
    link: "/admin",
    subItems: [{ name: "Supplier List", image: "", link: "/supplierlist" }],
  },
  {
    name: "Finance & Payments",
    image: "/images/flight_management.svg",
    link: "/admin",
  },
  {
    name: "Content Management",
    image: "/images/hotel_management.svg",
    link: "/admin",
    subItems: [
      { name: "Add Blog Category", image: "", link: "/addblogcategory" },
      { name: "Add Blog ", image: "", link: "/addblog" },
    ],
  },
  {
    name: "Marketing & Support",
    image: "/images/blog_management.svg",
    link: "/admin",
    subItems: [{ name: "Add New Customer", image: "", link: "/addnewcustomer" }],
  },
  {
    name: "System Settings",
    image: "/images/currency_management.svg",
    link: "/systemsettings",
  },
];

export const flightBookTableHeader = [
  {
    field: "id",
    headerName: "Booking ID",
  },
  { field: "name", headerName: "Name" },
  {
    field: "flight_no",
    headerName: "Flight No.",
  },
  { field: "from", headerName: "From" },
  { field: "to", headerName: "To" },
  {
    field: "departure",
    headerName: "Departure",
  },
  {
    field: "arrival",
    headerName: "Arrival",
  },
  {
    field: "status",
    headerName: "Status",
  },
  {
    field: "actions",
    headerName: "",
  },
];
export const hotelBookTableHeader = [
  { field: "name", headerName: "Hotel Name" },
  {
    field: "rating",
    headerName: "Rating",
  },
  { field: "location", headerName: "Location" },
  {
    field: "price",
    headerName: "Price / Night",
  },
  {
    field: "amenities",
    headerName: "Amenities",
  },
  {
    field: "review",
    headerName: "Review",
  },
  {
    field: "distance",
    headerName: "Distance From Airport",
  },
  {
    field: "status",
    headerName: "Status",
  },
];

export const agentListTableHeader = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "agency",
    headerName: "Agency",
  },
  {
    field: "agent",
    headerName: "Agent",
  },
  {
    field: "balance",
    headerName: "Balance",
  },
  {
    field: "credit",
    headerName: "Credit",
  },
  {
    field: "status",
    headerName: "Status",
  },
  {
    field: "action",
    headerName: "Action",
  },
];

export const agentDepositReqListHeader = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "entryDate",
    headerName: "Entry Date",
  },
  {
    field: "agentId",
    headerName: "Agent ID",
  },
  {
    field: "transDate",
    headerName: "Transaction Date",
  },
  {
    field: "depAmt ",
    headerName: "Deposit Amount",
  },
  {
    field: "accNo",
    headerName: "Account Number",
  },
  {
    field: "bank",
    headerName: "Bank Name",
  },
  {
    field: "depType",
    headerName: "Deposit type",
  },
  {
    field: "action",
    headerName: "Action",
  },
];

export const SupplierListTableHeader = [
  {
    field: "id",
    headerName: "ID",
  },
  { field: "fullName", headerName: "Supplier Full Name" },
  { field: "shortName", headerName: "Short Name" },
  {
    field: "module",
    headerName: "Module",
  },
  {
    field: "status",
    headerName: "Status",
  },
  {
    field: "index",
    headerName: "Index",
  },
  {
    field: "action",
    headerName: "Action",
  },
];

export const flightBookingListHeader = [
  {
    field: "basic",
    headerName: "Basic",
  },
  {
    field: "journeyDate",
    headerName: "Journey Date",
  },
  {
    field: "segment",
    headerName: "Segment",
  },
  {
    field: "pnr",
    headerName: "PNR",
  },
  {
    field: "booking",
    headerName: "Booking",
  },
  {
    field: "fare",
    headerName: "Fare",
  },
  {
    field: "action",
    headerName: "Action",
  },
];
