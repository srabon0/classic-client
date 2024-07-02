import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TSidebarItem = {
  key: string;
  label: ReactNode;
  children?: TSidebarItem[];
};

export type TSidebarItems = {
  name?: string;
  path?: string;
  element?: ReactNode;
  children?: TSidebarItems[] | undefined;
};

export const sidebarItemsGenerator = (
  items: TSidebarItems[],
  role: string
): TSidebarItem[] => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    const hasValidChildren = item.children && item.children.length > 0;

    if (item.path && item.name) {
      const newItem: TSidebarItem = {
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      };

      // If the item has valid children, add them as nested items
      if (hasValidChildren) {
        newItem.children = item.children
          .filter((child) => child.name && child.path) // Ensure child has name and path
          .map((child) => ({
            key: child.name!,
            label: (
              <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
            ),
          }));
      }

      acc.push(newItem);
    }

    return acc;
  }, []);

  return sidebarItems;
};
