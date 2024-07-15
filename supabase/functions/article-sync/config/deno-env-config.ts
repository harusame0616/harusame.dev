import { Config } from "../config.ts";

export class DenoEnvConfig implements Config {
  supabaseUrl: string;

  serviceRoleKey: string;

  serviceDomain: string;

  apiKey: string;

  secret: string;

  constructor(denoEnv: Deno.Env) {
    const secret = denoEnv.get("ARTICLE_SYNC_SECRET");
    const supabaseUrl = denoEnv.get("SUPABASE_URL");
    const serviceRoleKey = denoEnv.get("SUPABASE_SERVICE_ROLE_KEY");
    const serviceDomain = denoEnv.get("MICROCMS_SERVICE_DOMAIN");
    const apiKey = denoEnv.get("MICROCMS_API_KEY");

    if (
      !supabaseUrl ||
      !serviceRoleKey ||
      !serviceDomain ||
      !apiKey ||
      !secret
    ) {
      const env = {
        secret: !!secret,
        supabaseUrl: !!supabaseUrl,
        serviceRoleKey: !!serviceRoleKey,
        serviceDomain: !!serviceDomain,
        apiKey: !!apiKey,
      };
      throw new Error(
        `Deno Environment variables not set. ${JSON.stringify(env)}`,
      );
    }

    this.secret = secret;
    this.supabaseUrl = supabaseUrl;
    this.serviceRoleKey = serviceRoleKey;
    this.serviceDomain = serviceDomain;
    this.apiKey = apiKey;
  }

  get supabase(): { url: string; serviceRoleKey: string } {
    return {
      url: this.supabaseUrl,
      serviceRoleKey: this.serviceRoleKey,
    };
  }

  get microCMS(): { serviceDomain: string; apiKey: string } {
    return {
      serviceDomain: this.serviceDomain,
      apiKey: this.apiKey,
    };
  }

  get auth(): { secret: string } {
    return {
      secret: this.secret,
    };
  }
}
