// Định nghĩa cấu trúc route
export interface RouteConfig {
  path: string;
  children?: RouteConfig[];
  isDynamic?: boolean;
}
