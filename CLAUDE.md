# Claude Code Instructions

- 日本語で回答すること
- Bash ツールを使ってコマンドを実行する際は、コマンド文字列に改行を含めないこと
  - permissions の allow ワイルドカード(`*`)は改行文字にマッチしないため、改行が含まれると許可パターンから漏れて実行が拒否される
  - 行継続（`\` + 改行）だけでなく、引数の値に含まれる改行文字も対象
  - `gh issue create` や `gh pr create` など body が長くなるコマンドは `--body-file` を使うこと
    - OK: `gh issue create --title "タイトル" --body-file ./temp/issue-body.md`
    - NG: `gh issue create --title "タイトル" --body "1行目\n2行目"` （body 内の改行で拒否される）

## フォルダ構成

- temp: 一時的なファイルを保存するフォルダ。gitignore に追加されている。 コーディングエージェントで自由に使用可能
