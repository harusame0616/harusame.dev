# Claude Code Instructions

- 日本語で回答すること
- Bash ツールを使ってコマンドを実行する際は改行せず、１ライナーで実行すること
  - permissions のワイルドカードから漏れてしまうため
  - NG な例: `gh pr create \` で改行して複数行にする
  - OK な例: `gh pr create --head ... --base ... --title "..." --body "..."` のように１行で実行
