import type { BlogClient, Post, Tag } from "./blog-client";

const posts = [
	{
		id: "1f2a3b4c-5d6e-7f8g-9h0i-1j2k3l4m5n6o",
		title: "デザインテスト",
		content: `<p></p><h1 id="h9dd626a8de">heading-1</h1><h2 id="h941c65e5b2">heading-2</h2><h3 id="h7e50af461a">heading-3</h3><h4 id="hb697cc1ebb">heading-4</h4><h5 id="hcf2538f556">heading-5</h5><p>bold<br>italic<br>underline<br>strike<br><code>code</code></p><p>left</p><p style="text-align: center">center</p><p style="text-align: right">right</p><hr><blockquote><p>cite</p></blockquote><pre><code>export class MockBlogClient implements BlogClient {
        async getAllPost(): Promise&lt;Post[]&gt; {
                return posts;
        }

        async getPost(postId: string): Promise&lt;Post&gt; {
                const post = posts.find((post) =&gt; post.id === postId);
                if (!post) {
                        throw new Error(\`Post not found: \${postId}\`);
                }
1
                return post;
        }

        async getAllTags(): Promise&lt;Tag[]&gt; {
                return Array.from(
                        new Map(
                                posts.flatMap((post) =&gt; post.tags).map((tag) =&gt; [tag.id, tag]),
                        ).values(),
                );
        }
}</code></pre><table><tbody><tr><th colspan="1" rowspan="1"><p>header1</p></th><th colspan="1" rowspan="1"><p>header2</p></th></tr><tr><td colspan="1" rowspan="1"><p>cell1</p></td><td colspan="1" rowspan="1"><p>cell2</p></td></tr></tbody></table><ul><li>ordered list item</li></ul><p></p><ol><li>unorderd list item</li></ol><p><a href="https://example.com">link</a></p><p></p>`,
		category: {
			id: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
			name: "テック",
		},
		publishedAt: new Date("2000-01-01T00:00:00.000Z"),
		tags: [
			{
				id: "z9y8x7w6-v5u4-t3s2-r1q0-p9o8n7m6l5k4",
				name: "フロントエンド",
			},
			{
				id: "j3i2h1g0-f9e8-d7c6-b5a4-k3l2m1n0o9p8",
				name: "React",
			},
			{
				id: "q1w2e3r4-t5y6-u7i8-o9p0-a1s2d3f4g5h6",
				name: "Svelte",
			},
		],
	},
	{
		id: "2g3h4i5j-6k7l-8m9n-0o1p-2q3r4s5t6u7v",
		title: "クラウドサービスの活用法",
		content:
			"クラウドサービスの活用法について紹介します。AWS, Google Cloud, Azureなどがありますが、プロジェクトに最適なサービスの選び方や、コスト削減のテクニックについても詳しく解説します。",
		category: {
			id: "b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7",
			name: "テック",
		},
		publishedAt: new Date("2000-01-02T00:00:00.000Z"),
		tags: [
			{
				id: "m5n6o7p8-q9r0-s1t2-u3v4-w5x6y7z8a9b0",
				name: "クラウド",
			},
			{
				id: "c4d5e6f7-g8h9-i0j1-k2l3-m4n5o6p7q8r9",
				name: "AWS",
			},
			{
				id: "u7v8w9x0-y1z2-a3b4-c5d6-e7f8g9h0i1j2",
				name: "コスト削減",
			},
		],
	},
	{
		id: "3i4j5k6l-7m8n-9o0p-1q2r-3s4t5u6v7w8x",
		title: "Pythonで始めるデータ分析",
		content:
			"Pythonでのデータ分析入門について説明します。データ分析にはPandasやNumPyなどのライブラリが不可欠です。これらの基本的な使い方から、実際のデータセットを使った分析方法までを紹介します。",
		category: {
			id: "c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8",
			name: "テック",
		},
		publishedAt: new Date("2000-01-03T00:00:00.000Z"),
		tags: [
			{
				id: "f6g7h8i9-j0k1-l2m3-n4o5-p6q7r8s9t0u1",
				name: "Python",
			},
			{
				id: "v8w9x0y1-z2a3-b4c5-d6e7-f8g9h0i1j2k3",
				name: "データ分析",
			},
			{
				id: "l4m5n6o7-p8q9-r0s1-t2u3-v4w5x6y7z8a9",
				name: "Pandas",
			},
		],
	},
	{
		id: "4k5l6m7n-8o9p-0q1r-2s3t-4u5v6w7x8y9z",
		title: "ブロックチェーンの基礎",
		content:
			"ブロックチェーン技術の基礎について解説します。ブロックチェーンは仮想通貨だけでなく、さまざまな分野で応用されています。そのメカニズムや利点、そして現在の応用例について紹介します。",
		category: {
			id: "d4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9",
			name: "テック",
		},
		publishedAt: new Date("2000-01-04T00:00:00.000Z"),
		tags: [
			{
				id: "g8h9i0j1-k2l3-m4n5-o6p7-q8r9s0t1u2v3",
				name: "ブロックチェーン",
			},
			{
				id: "w9x0y1z2-a3b4-c5d6-e7f8-g9h0i1j2k3l4",
				name: "仮想通貨",
			},
			{
				id: "m6n7o8p9-q0r1-s2t3-u4v5-w6x7y8z9a0b1",
				name: "応用例",
			},
		],
	},
	{
		id: "5m6n7o8p-9q0r-1s2t-3u4v-5w6x7y8z9a0b",
		title: "DevOpsのベストプラクティス",
		content:
			"DevOps文化の導入におけるベストプラクティスを解説します。自動化、連携、コミュニケーションの重要性に加えて、成功事例をもとに、効果的なDevOps戦略をどのように立てるかを紹介します。",
		category: {
			id: "e5f6g7h8-i9j0-k1l2-m3n4-o5p6q7r8s9t0",
			name: "テック",
		},
		publishedAt: new Date("2000-01-05T00:00:00.000Z"),
		tags: [
			{
				id: "n7o8p9q0-r1s2-t3u4-v5w6-x7y8z9a0b1c2",
				name: "DevOps",
			},
			{
				id: "d6e7f8g9-h0i1-j2k3-l4m5-n6o7p8q9r0s1",
				name: "自動化",
			},
			{
				id: "u5v6w7x8-y9z0-a1b2-c3d4-e5f6g7h8i9j0",
				name: "成功事例",
			},
		],
	},
	{
		id: "6o7p8q9r-0s1t-2u3v-4w5x-6y7z8a9b0c1d",
		title: "マイクロサービスの設計原則",
		content:
			"マイクロサービスアーキテクチャの設計原則について詳しく解説します。サービスの独立性、スケーラビリティ、管理の容易さなど、マイクロサービスを成功させるためのキーポイントを紹介します。",
		category: {
			id: "f6g7h8i9-j0k1-l2m3-n4o5-p6q7r8s9t0u1",
			name: "テック",
		},
		publishedAt: new Date("2000-01-06T00:00:00.000Z"),
		tags: [
			{
				id: "o8p9q0r1-s2t3-u4v5-w6x7-y8z9a0b1c2d3",
				name: "マイクロサービス",
			},
			{
				id: "g8h9i0j1-k2l3-m4n5-o6p7-q8r9s0t1u2v3",
				name: "アーキテクチャ",
			},
			{
				id: "w9x0y1z2-a3b4-c5d6-e7f8-g9h0i1j2k3l4",
				name: "スケーラビリティ",
			},
		],
	},
	{
		id: "7p8q9r0s-1t2u-3v4w-5x6y-7z8a9b0c1d2e",
		title: "AIと機械学習の最新トレンド",
		content:
			"AIと機械学習の分野での最新トレンドについて紹介します。深層学習の進化、自然言語処理の最新技術、AIの倫理問題など、今知っておくべき重要なポイントを解説します。",
		category: {
			id: "g7h8i9j0-k1l2-m3n4-o5p6-q7r8s9t0u1v2",
			name: "テック",
		},
		publishedAt: new Date("2000-01-07T00:00:00.000Z"),
		tags: [
			{
				id: "p9q0r1s2-t3u4-v5w6-x7y8-z9a0b1c2d3e4",
				name: "AI",
			},
			{
				id: "h9i0j1k2-l3m4-n5o6-p7q8-r9s0t1u2v3w4",
				name: "機械学習",
			},
			{
				id: "x8y9z0a1-b2c3-d4e5-f6g7-h8i9j0k1l2m3",
				name: "深層学習",
			},
		],
	},
	{
		id: "0p8q9r0s-1t2u-3v4w-5x6y-7z8a9b0c1d20",
		title: "article1",
		content: "article1",
		category: {
			id: "g7h8i9j0-k1l2-m3n4-o5p6-q7r8s9t0u1v2",
			name: "テック",
		},
		publishedAt: new Date("2000-01-08T00:00:00.000Z"),
		tags: [{ id: "p9q0r1s2-t3u4-v5w6-x7y8-z9a0b1c2d3s4", name: "ARTICLE" }],
	},
	{
		id: "0p8q9r0s-1t2u-3v4w-5x6y-7z8a9b0c1d21",
		title: "article2",
		content: "article2",
		category: {
			id: "g7h8i9j0-k1l2-m3n4-o5p6-q7r8s9t0u1v2",
			name: "テック",
		},
		publishedAt: new Date("2000-01-08T00:00:00.000Z"),
		tags: [{ id: "p9q0r1s2-t3u4-v5w6-x7y8-z9a0b1c2d3s4", name: "ARTICLE" }],
	},
	{
		id: "0p8q9r0s-1t2u-3v4w-5x6y-7z8a9b0c1d22",
		title: "article3",
		content: "article3",
		category: {
			id: "g7h8i9j0-k1l2-m3n4-o5p6-q7r8s9t0u1v2",
			name: "テック",
		},
		publishedAt: new Date("2000-01-08T00:00:00.000Z"),
		tags: [{ id: "p9q0r1s2-t3u4-v5w6-x7y8-z9a0b1c2d3s4", name: "ARTICLE" }],
	},
	{
		id: "0p8q9r0s-1t2u-3v4w-5x6y-7z8a9b0c1d23",
		title: "article4",
		content: "article4",
		category: {
			id: "g7h8i9j0-k1l2-m3n4-o5p6-q7r8s9t0u1v2",
			name: "テック",
		},
		publishedAt: new Date("2000-01-08T00:00:00.000Z"),
		tags: [{ id: "p9q0r1s2-t3u4-v5w6-x7y8-z9a0b1c2d3s4", name: "ARTICLE" }],
	},
	{
		id: "0p8q9r0s-1t2u-3v4w-5x6y-7z8a9b0c1d24",
		title: "article5",
		content: "article5",
		category: {
			id: "g7h8i9j0-k1l2-m3n4-o5p6-q7r8s9t0u1v2",
			name: "テック",
		},
		publishedAt: new Date("2000-01-08T00:00:00.000Z"),
		tags: [{ id: "p9q0r1s2-t3u4-v5w6-x7y8-z9a0b1c2d3s4", name: "ARTICLE" }],
	},
	{
		id: "0p8q9r0s-1t2u-3v4w-5x6y-7z8a9b0c1d25",
		title: "article6",
		content: "article6",
		category: {
			id: "g7h8i9j0-k1l2-m3n4-o5p6-q7r8s9t0u1v2",
			name: "テック",
		},
		publishedAt: new Date("2000-01-08T00:00:00.000Z"),
		tags: [{ id: "p9q0r1s2-t3u4-v5w6-x7y8-z9a0b1c2d3s4", name: "ARTICLE" }],
	},
];

export class MockBlogClient implements BlogClient {
	async getAllPost(): Promise<Post[]> {
		return posts;
	}

	async getPost(postId: string): Promise<Post> {
		const post = posts.find((post) => post.id === postId);
		if (!post) {
			throw new Error(`Post not found: ${postId}`);
		}

		return post;
	}

	async getAllTags(): Promise<Tag[]> {
		return Array.from(
			new Map(
				posts.flatMap((post) => post.tags).map((tag) => [tag.id, tag]),
			).values(),
		);
	}
}
