import type { Request } from "express";

export function getSSRContextData(request: Request): SSRContext {
  const url = request.originalUrl;
  return {
    url,
  };
}
