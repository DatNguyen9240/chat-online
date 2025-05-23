import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { MessageSquare, Users } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export const useNavigation = () => {
  const pathname = usePathname();
  const count = useQuery(api.requests.count);
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
        count: count,
      },
    ],
    [pathname, count]
  );
  return paths;
};
