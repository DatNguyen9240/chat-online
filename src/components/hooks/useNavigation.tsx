import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { MessageSquare, Users } from "lucide-react";

export const useNavigation = () => {
  const pathname = usePathname();
  const paths = useMemo(
    () => [
      {
        name: "Conservations",
        href: "/conservations",
        active:
          pathname === "/conservations" ||
          pathname.startsWith("/conservations"),
        icon: MessageSquare,
      },
      {
        name: "Friends",
        href: "/friends",
        active: pathname === "/friends" || pathname.startsWith("/friends"),
        icon: Users,
      },
    ],
    [pathname]
  );
  return paths;
};
