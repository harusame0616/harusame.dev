import { Config } from "../config.ts";

export class DenoEnvConfig implements Config {
    secret: string;
    slackNotificationUrl: URL;
    articlesUrl: URL;
    serviceRoleKey: string;
    supabaseUrl: string;

    constructor(denoEnv: Deno.Env) {
        const secret = denoEnv.get("COMMENT_NOTIFICATION_SECRET");
        const slackNotificationUrl = denoEnv.get(
            "SLACK_COMMENT_NOTIFICATION_URL",
        );
        const articlesUrl = denoEnv.get("ARTICLES_URL");
        const serviceRoleKey = denoEnv.get("SUPABASE_SERVICE_ROLE_KEY");
        const supabaseUrl = denoEnv.get("SUPABASE_URL");

        if (
            !slackNotificationUrl || !secret || !articlesUrl ||
            !serviceRoleKey || !supabaseUrl
        ) {
            const env = {
                secret: !!secret,
                slackNotificationUrl: !!slackNotificationUrl,
                articlesUrl: !!articlesUrl,
                serviceRoleKey: !!serviceRoleKey,
                supabaseUrl: !!supabaseUrl,
            };
            throw new Error(
                `Deno Environment variables not set. ${JSON.stringify(env)}`,
            );
        }
        this.secret = secret;
        this.slackNotificationUrl = new URL(slackNotificationUrl);
        this.articlesUrl = new URL(articlesUrl);
        this.supabaseUrl = supabaseUrl;
        this.serviceRoleKey = serviceRoleKey;
    }
    get slack(): { url: URL } {
        return {
            url: this.slackNotificationUrl,
        };
    }

    get auth(): { secret: string } {
        return {
            secret: this.secret,
        };
    }

    get host(): { articlesUrl: URL } {
        return {
            articlesUrl: this.articlesUrl,
        };
    }

    get supabase(): { url: string; serviceRoleKey: string } {
        return {
            url: this.supabaseUrl,
            serviceRoleKey: this.serviceRoleKey,
        };
    }
}
