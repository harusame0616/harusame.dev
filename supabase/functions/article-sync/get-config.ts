import { Config } from "./config.ts";
import { DenoEnvConfig } from "./config/deno-env-config.ts";

export function getConfig(): Config {
    return new DenoEnvConfig(Deno.env);
}
