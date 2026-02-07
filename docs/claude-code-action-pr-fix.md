# Claude Code Action で PR を作成できるようにする修正手順

## 問題の概要
Issue #143 で Claude Code Action を使った実装は成功したが、PR の作成に失敗した。
原因は .github/workflows/claude.yml の permissions 設定が read のみで、write 権限がなかったため。

## 解決策

### 1. ワークフローファイルの修正

`.github/workflows/claude.yml` の permissions セクションを以下のように変更してください:

#### 変更前 (21-26行目)
```yaml
permissions:
  contents: read
  pull-requests: read
  issues: read
  id-token: write
  actions: read # Required for Claude to read CI results on PRs
```

#### 変更後
```yaml
permissions:
  contents: write        # コミットとブランチ作成に必要
  pull-requests: write   # PR 作成に必要
  issues: write          # Issue へのコメントに必要
  id-token: write
  actions: read          # Required for Claude to read CI results on PRs
```

### 2. 変更が必要な理由

- **contents: write** - ブランチへのコミットとプッシュに必要
- **pull-requests: write** - PR の作成と更新に必要
- **issues: write** - Issue へのコメント投稿に必要

### 3. セキュリティについて

この権限変更は Claude Code Action の公式ドキュメントで推奨されている設定です。
Claude は以下のような設計により安全性を確保しています:

- 直接 PR を作成せず、ブランチにプッシュして PR 作成リンクを提供
- ブランチ保護ルールが引き続き適用される
- ユーザーが PR 作成前に変更内容を確認できる

### 4. 参考資料

- [Claude Code Action 公式ドキュメント](https://github.com/anthropics/claude-code-action)
- [FAQ - Why doesn't Claude create PRs directly?](https://github.com/anthropics/claude-code-action/blob/main/docs/faq.md)

## 修正後の動作

この変更後、Claude Code Action は:
1. Issue や PR のコメントで @claude とメンションされたタスクを実行
2. 変更をブランチにプッシュ
3. PR 作成用の事前入力済みリンクを提供
4. ユーザーがリンクをクリックして PR を作成

---

作成日: 2026-02-07
関連 Issue: #143, #146
