export interface Config {
  get supabase(): {
    url: string;
    serviceRoleKey: string;
  };

  get slack(): {
    url: URL;
  };

  get auth(): {
    secret: string;
  };

  get host(): {
    articlesUrl: URL;
  };
}
