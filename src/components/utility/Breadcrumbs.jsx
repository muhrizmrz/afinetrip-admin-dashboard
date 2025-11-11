import { Link, useLocation } from "react-router-dom";
import { sideBarMenuItems } from "./MenuItems";

export default function Breadcrumbs() {
  const location = useLocation();

  let crumbs = [{ name: "Dashboard", link: "/admin" }];

  for (const item of sideBarMenuItems) {
    if (item.link === location.pathname) {
      crumbs = [{ name: item.name, link: item.link }];
      break;
    }
    if (item.subItems) {
      const sub = item.subItems.find((s) => s.link === location.pathname);
      if (sub) {
        crumbs = [
          { name: item.name, link: item.link || "/admin" },
          { name: sub.name, link: sub.link },
        ];
        break;
      }
    }
  }

  return (
    <nav className="text-xs mb-3">
      {crumbs.map((crumb, index) => (
        <span key={index}>
          {index > 0 && <span className="  mx-1 cursor-pointer">&gt;</span>}
          <Link
            to={crumb.link}
            className={`text-xs  ${
              index === crumbs.length - 1
                ? "text-[#15144e]"
                : "hover:text-[#2a2965]"
            }`}
          >
            {crumb.name}
          </Link>
        </span>
      ))}
    </nav>
  );
}
