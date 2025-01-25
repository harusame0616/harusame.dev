export interface Config {
	get supabase(): {
		url: string;
		serviceRoleKey: string;
	};

	get microCMS(): {
		serviceDomain: string;
		apiKey: string;
	};

	get auth(): {
		secret: string;
	};
}
