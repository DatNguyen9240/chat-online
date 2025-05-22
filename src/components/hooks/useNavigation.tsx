import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { MessageSquare, Users } from "lucide-react";

export const useNavigation = () => {
  const pathname = usePathname();
  const paths = useMemo(
    () => [
      {
        name: "Conversations",
        href: "/conversations",
        active:
          pathname === "/conversations" ||
          pathname.startsWith("/conversations"),
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
