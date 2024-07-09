import { SupabaseArticleRepository } from "@features/article/infrastructures/supabase-article-repository";
import { SlackNotificationGateway } from "@features/comment/infrastructures/slack-notification-gateway";
import { CommentNotificationUsecase } from "@features/comment/usecases/comment-notification-usecase";
import { createClient } from "npm:@supabase/supabase-js@^2.44.1";
import { getConfig } from "./get-config.ts";

export async function handler(req: Request) {
    const config = getConfig();

    if (req.headers.get("Authorization") !== `Bearer ${config.auth.secret}`) {
        console.error("headers", req.headers.get("Authorization"));
        console.error("secret", config.auth.secret);
        return new Response(null, { status: 401 });
    }

    const commentNotification = new CommentNotificationUsecase(
        new SlackNotificationGateway(
            new URL(config.slack.url),
        ),
        new SupabaseArticleRepository(
            createClient(
                config.supabase.url,
                config.supabase.serviceRoleKey,
            ),
        ),
        config.host.articlesUrl,
    );

    const { name, text, article_id: articleId } = (await req.json()).record;

    const result = await commentNotification.execute(articleId, name, text);

    return result.success
        ? new Response()
        : Response.json(result, { status: 500 });
}
