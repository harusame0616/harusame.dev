import {
  ArticleSyncUsecase,
  MicroCmsArticleGateway,
  SupabaseArticleRepository,
} from "article";
import { createClient as createSupabaseClient } from "npm:@supabase/supabase-js";
import { createClient as createMicroCMSClient } from "npm:microcms-js-sdk";
import { getConfig } from "./get-config.ts";

export async function handler(req: Request) {
  const config = getConfig();

  if (
    req.headers.get("Authorization") !== `Bearer ${config.auth.secret}` &&
    req.headers.get("X-secret") !== config.auth.secret
  ) {
    return new Response(null, { status: 401 });
  }

  const articleSyncUsecase = new ArticleSyncUsecase(
    new MicroCmsArticleGateway(
      createMicroCMSClient({
        serviceDomain: config.microCMS.serviceDomain,
        apiKey: config.microCMS.apiKey,
      }),
    ),
    new SupabaseArticleRepository(
      createSupabaseClient(config.supabase.url, config.supabase.serviceRoleKey),
    ),
  );

  const result = await articleSyncUsecase.execute();

  return result.success
    ? new Response()
    : Response.json(result, { status: 500 });
}
